import { getSupabaseAdmin, invalidateDbConnection } from './supabase';
import { callDeepSeek, safeParseJson } from './ai/deepseek';
import { SCORING_SYSTEM_PROMPT, buildScoringPrompt } from './ai/prompts';

export interface ScoreResult {
  noveltyScore: number;
  businessScore: number;
  localScore: number;
  finalScore: number;
  summary: string;
  keyPoints: string[];
  model: string;
  version: string;
}

export interface ScoringInput {
  title: string;
  description: string;
  url?: string;
  tags?: string[];
  source: string;
  hotScore?: number;
}

const SCORING_FALLBACK: ScoreResult = {
  noveltyScore: 50,
  businessScore: 50,
  localScore: 50,
  finalScore: 50,
  summary: '评分解析失败',
  keyPoints: [],
  model: 'deepseek-fallback',
  version: '2.0',
};

export async function scoreWithDeepSeek(input: ScoringInput): Promise<ScoreResult | null> {
  const result = await callDeepSeek({
    systemPrompt: SCORING_SYSTEM_PROMPT,
    userPrompt: buildScoringPrompt(input),
    temperature: 0.4,
    maxTokens: 1500,
  });

  if (!result.success) {
    console.error('[Scoring] DeepSeek API failed:', result.error, { retried: result.retried });
    return null;
  }

  const { data: parsed, wasRepaired } = safeParseJson<ScoreResult>(result.content, SCORING_FALLBACK);
  if (wasRepaired) {
    console.warn('[Scoring] JSON was repaired for scoring output');
  }

  parsed.model = 'deepseek';
  parsed.version = '2.0';

  // 记录 token 使用量
  if (result.usage.totalTokens > 0) {
    console.log(`[Scoring] Token usage: ${result.usage.totalTokens} (prompt: ${result.usage.promptTokens}, completion: ${result.usage.completionTokens})`);
  }

  return parsed;
}

export async function scoreSignal(input: ScoringInput): Promise<ScoreResult> {
  const heuristicScore = calculateHeuristicScore(input);

  try {
    const deepseekResult = await scoreWithDeepSeek(input);
    if (deepseekResult) {
      return deepseekResult;
    }
  } catch (error) {
    console.error('DeepSeek failed, using heuristic:', error);
  }

  return heuristicScore;
}

function calculateHeuristicScore(input: ScoringInput): ScoreResult {
  const title = input.title.toLowerCase();
  const desc = (input.description || '').toLowerCase();
  const hotScore = input.hotScore || 0;

  let noveltyBase = 50;
  let businessBase = 50;
  let localBase = 50;

  const noveltyKeywords = ['ai', 'gpt', 'agent', 'automation', 'nocode', 'new', 'first', 'innovative', 'revolutionary', 'unique'];
  for (const kw of noveltyKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      noveltyBase += 5;
    }
  }

  const businessKeywords = ['saas', 'subscription', 'paid', 'pro', 'enterprise', 'business', 'revenue', 'pricing', 'premium', 'startup'];
  for (const kw of businessKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      businessBase += 5;
    }
  }

  const localKeywords = ['china', 'chinese', 'wechat', 'weixin', 'ali', 'tencent', 'bytedance', 'douyin', 'xiaohongshu'];
  for (const kw of localKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      localBase += 10;
    }
  }

  if (input.source === 'producthunt') {
    noveltyBase += 5;
    businessBase += 5;
    localBase -= 5;
  } else if (input.source === 'hackernews') {
    noveltyBase += 3;
    businessBase += 2;
    localBase -= 3;
  }

  const hotBonus = hotScore * 0.1;
  noveltyBase += hotBonus;
  businessBase += hotBonus * 0.5;

  const noveltyScore = Math.min(100, Math.max(0, Math.round(noveltyBase)));
  const businessScore = Math.min(100, Math.max(0, Math.round(businessBase)));
  const localScore = Math.min(100, Math.max(0, Math.round(localBase)));
  const finalScore = Math.round(noveltyScore * 0.3 + businessScore * 0.35 + localScore * 0.35);

  return {
    noveltyScore,
    businessScore,
    localScore,
    finalScore,
    summary: `基于关键词启发式评分：新颖度 ${noveltyScore}，商业潜力 ${businessScore}，本地化潜力 ${localScore}`,
    keyPoints: [
      `热度指数: ${hotScore}/100`,
      `来源: ${input.source}`,
      `标签数: ${input.tags?.length || 0}`,
    ],
    model: 'heuristic',
    version: '1.0',
  };
}

export async function batchScoreUnscoredSignals(limit: number = 50): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    console.warn('[Scoring] Database unavailable, skipping batch score');
    return 0;
  }

  try {
    const { data: signals, error } = await supabaseAdmin
      .from('Signal')
      .select('id, title, description, url, tags, source, hotScore')
      .in('status', ['PENDING', 'SCREENED'])
      .is('finalScore', null)
      .order('fetchedAt', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[Scoring] Failed to fetch unscored signals:', error);
      return 0;
    }

    if (!signals || signals.length === 0) {
      return 0;
    }

    let scoredCount = 0;

    for (const signal of signals) {
      try {
        const result = await scoreSignal({
          title: signal.title,
          description: signal.description || '',
          url: signal.url || undefined,
          tags: signal.tags || [],
          source: signal.source,
          hotScore: signal.hotScore || 0,
        });

        const { error: updateError } = await supabaseAdmin
          .from('Signal')
          .update({
            noveltyScore: result.noveltyScore,
            businessScore: result.businessScore,
            localScore: result.localScore,
            finalScore: result.finalScore,
            scoreVersion: `${result.model}-${result.version}`,
            status: 'SCORED',
          })
          .eq('id', signal.id);

        if (updateError) {
          console.error(`[Scoring] Failed to update signal ${signal.id}:`, updateError);
        } else {
          scoredCount++;
        }
      } catch (err) {
        console.error(`[Scoring] Failed to score signal ${signal.id}:`, err);
      }
    }

    return scoredCount;
  } catch (error) {
    console.error('[Scoring] Batch scoring failed:', error);
    invalidateDbConnection();
    return 0;
  }
}