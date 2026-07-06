import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiInternalError } from '@/lib/api/response';
import { callDeepSeek, safeParseJson } from '@/lib/ai/deepseek';
import { CANVAS_SYSTEM_PROMPT, buildCanvasPrompt } from '@/lib/ai/prompts';
import { checkRateLimitAsync, getClientId } from '@/lib/api/rate-limit';
import { addLogEntry } from '@/lib/signals';

const CANVAS_FALLBACK = {
  valueProposition: '',
  customerSegments: ['目标用户群体'],
  revenueStreams: ['订阅收入'],
  keyPartners: [],
  keyActivities: ['产品开发', '市场营销'],
  keyResources: ['技术团队', '资金'],
  channels: ['社交媒体', '内容营销'],
  customerRelationships: ['社区运营'],
  costStructure: ['人力成本', '服务器成本'],
  competitiveAnalysis: [],
  swot: {
    strengths: ['创新的产品理念'],
    weaknesses: ['品牌认知度低'],
    opportunities: ['市场增长潜力大'],
    threats: ['竞争激烈'],
  },
  actionPlan: ['Day 1-7: MVP开发', 'Day 8-14: 用户获取'],
  summary: 'AI 服务暂时不可用，使用默认模板',
};

function validateCanvasOutput(data: Record<string, unknown>): Record<string, unknown> {
  return {
    valueProposition: typeof data.valueProposition === 'string' ? data.valueProposition : CANVAS_FALLBACK.valueProposition,
    customerSegments: Array.isArray(data.customerSegments) ? data.customerSegments : CANVAS_FALLBACK.customerSegments,
    revenueStreams: Array.isArray(data.revenueStreams) ? data.revenueStreams : CANVAS_FALLBACK.revenueStreams,
    keyPartners: Array.isArray(data.keyPartners) ? data.keyPartners : CANVAS_FALLBACK.keyPartners,
    keyActivities: Array.isArray(data.keyActivities) ? data.keyActivities : CANVAS_FALLBACK.keyActivities,
    keyResources: Array.isArray(data.keyResources) ? data.keyResources : CANVAS_FALLBACK.keyResources,
    channels: Array.isArray(data.channels) ? data.channels : CANVAS_FALLBACK.channels,
    customerRelationships: Array.isArray(data.customerRelationships) ? data.customerRelationships : CANVAS_FALLBACK.customerRelationships,
    costStructure: Array.isArray(data.costStructure) ? data.costStructure : CANVAS_FALLBACK.costStructure,
    competitiveAnalysis: Array.isArray(data.competitiveAnalysis) ? data.competitiveAnalysis : CANVAS_FALLBACK.competitiveAnalysis,
    swot: data.swot && typeof data.swot === 'object' ? data.swot : CANVAS_FALLBACK.swot,
    actionPlan: Array.isArray(data.actionPlan) ? data.actionPlan : CANVAS_FALLBACK.actionPlan,
    summary: typeof data.summary === 'string' ? data.summary : CANVAS_FALLBACK.summary,
  };
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientId(request);
  const rateCheck = await checkRateLimitAsync(clientId, 'ai-generate');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  const auth = await verifyAuth(request);
  const userId = auth.success ? auth.user.id : null;

  // Input size limit
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
  if (contentLength > 100 * 1024) {
    return apiError('请求体过大', 413);
  }

  const body = await request.json();
  const { signalTitle, signalDescription, signalId } = body;

  if (!signalTitle) {
    return apiError('缺少信号标题');
  }

  const result = await callDeepSeek({
    systemPrompt: CANVAS_SYSTEM_PROMPT,
    userPrompt: buildCanvasPrompt({ signalTitle, signalDescription }),
    temperature: 0.6,
    maxTokens: 2500,
  });

  if (!result.success) {
    console.error('[Canvas] Generation failed:', result.error, { retried: result.retried });
    return apiInternalError('生成画布失败，请稍后重试');
  }

  const { data: rawParsed, wasRepaired } = safeParseJson<Record<string, unknown>>(result.content, {
    ...CANVAS_FALLBACK,
    valueProposition: signalTitle,
    summary: 'AI 解析失败，使用默认模板',
  });

  if (wasRepaired) {
    console.warn('[Canvas] JSON was repaired');
  }

  if (result.usage.totalTokens > 0) {
    console.log(`[Canvas] Token usage: ${result.usage.totalTokens} (prompt: ${result.usage.promptTokens}, completion: ${result.usage.completionTokens})`);
  }

  const parsed = validateCanvasOutput(rawParsed);

  // 持久化到 CanvasReport 表（仅登录用户）
  if (userId) {
    const supabaseAdmin = await getSupabaseAdmin();
    if (supabaseAdmin) {
      try {
        const { error: insertError } = await supabaseAdmin.from('CanvasReport').insert({
          id: crypto.randomUUID(),
          userId,
          signalId: signalId || '',
          result: parsed,
          status: 'COMPLETED',
          updatedAt: new Date().toISOString(),
        });
        if (insertError) {
          console.error('[Canvas] Failed to persist result:', insertError);
        } else {
          await addLogEntry({
            type: 'CANVAS_GENERATED',
            title: `商业画布生成完成：${signalTitle}`,
            content: (parsed as any).valueProposition || '',
            signalId: signalId || undefined,
            userId,
          });
        }
      } catch (err) {
        console.error('[Canvas] Failed to persist result:', err);
      }
    }
  }

  return apiSuccess(parsed);
}