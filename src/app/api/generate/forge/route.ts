import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiInternalError } from '@/lib/api/response';
import { callDeepSeek, safeParseJson } from '@/lib/ai/deepseek';
import { FORGE_SYSTEM_PROMPT, buildForgePrompt } from '@/lib/ai/prompts';
import { checkRateLimitAsync, getClientId } from '@/lib/api/rate-limit';
import { addLogEntry } from '@/lib/signals';

const FORGE_FALLBACK = {
  techStack: 'Next.js + React + TypeScript',
  projectStructure: ['src/', '  components/', '  pages/', '  lib/'],
  coreFeatures: [{ name: '核心功能', description: '基于信号生成的核心功能', implementation: '待实现' }],
  localizationPlan: [],
  estimatedTime: '2-4周',
  difficulty: '中等',
  summary: 'AI 服务暂时不可用，使用默认方案',
};

function validateForgeOutput(data: Record<string, unknown>): Record<string, unknown> {
  return {
    techStack: typeof data.techStack === 'string' ? data.techStack : FORGE_FALLBACK.techStack,
    projectStructure: Array.isArray(data.projectStructure) ? data.projectStructure : FORGE_FALLBACK.projectStructure,
    coreFeatures: Array.isArray(data.coreFeatures) ? data.coreFeatures : FORGE_FALLBACK.coreFeatures,
    localizationPlan: Array.isArray(data.localizationPlan) ? data.localizationPlan : FORGE_FALLBACK.localizationPlan,
    estimatedTime: typeof data.estimatedTime === 'string' ? data.estimatedTime : FORGE_FALLBACK.estimatedTime,
    difficulty: typeof data.difficulty === 'string' ? data.difficulty : FORGE_FALLBACK.difficulty,
    summary: typeof data.summary === 'string' ? data.summary : FORGE_FALLBACK.summary,
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
    return apiError('请求体过大，请缩短输入内容', 413);
  }

  const body = await request.json();
  const { signalTitle, signalDescription, signalId, language, transformPoints, customPrompt } = body;

  if (!signalTitle) {
    return apiError('缺少信号标题');
  }

  const transformSummary = transformPoints
    ?.filter((p: { checked?: boolean; label?: string }) => p.checked)
    .map((p: { label?: string }) => p.label)
    .join(', ') || '';

  const result = await callDeepSeek({
    systemPrompt: FORGE_SYSTEM_PROMPT,
    userPrompt: buildForgePrompt({
      signalTitle,
      signalDescription,
      language,
      transformPoints: transformSummary,
      customPrompt,
    }),
    temperature: 0.6,
    maxTokens: 2000,
  });

  if (!result.success) {
    console.error('[Forge] Generation failed:', result.error, { retried: result.retried });
    return apiInternalError('生成方案失败，请稍后重试');
  }

  const { data: rawParsed, wasRepaired } = safeParseJson<Record<string, unknown>>(result.content, {
    ...FORGE_FALLBACK,
    summary: 'AI 解析失败，使用默认方案',
  });

  if (wasRepaired) {
    console.warn('[Forge] JSON was repaired');
  }

  if (result.usage.totalTokens > 0) {
    console.log(`[Forge] Token usage: ${result.usage.totalTokens} (prompt: ${result.usage.promptTokens}, completion: ${result.usage.completionTokens})`);
  }

  const parsed = validateForgeOutput(rawParsed);

  let project = null;
  if (userId) {
    const supabaseAdmin = await getSupabaseAdmin();
    if (supabaseAdmin) {
      try {
        const { data: inserted, error: insertError } = await supabaseAdmin
          .from('ForgeProject')
          .insert({
            id: crypto.randomUUID(),
            userId,
            signalId: signalId || '',
            status: 'COMPLETED',
            outputSummary: parsed.summary as string || '',
            result: parsed,
            targetLanguage: language || 'zh',
            updatedAt: new Date().toISOString(),
          })
          .select()
          .single();
        if (insertError) {
          console.error('[Forge] Failed to persist result:', insertError);
        } else if (inserted) {
          project = inserted;
          await addLogEntry({
            type: 'FORGE_COMPLETED',
            title: `复刻方案生成完成：${signalTitle}`,
            content: parsed.summary as string || '',
            signalId: signalId || undefined,
            forgeId: inserted.id,
            userId,
            metadata: { techStack: parsed.techStack },
          });
        }
      } catch (err) {
        console.error('[Forge] Failed to persist result:', err);
      }
    }
  }

  return apiSuccess({ ...parsed, projectId: project?.id });
}