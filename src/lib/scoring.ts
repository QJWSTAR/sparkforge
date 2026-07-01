import { getSupabaseAdmin, invalidateDbConnection } from './supabase'

export interface ScoreResult {
  noveltyScore: number
  businessScore: number
  localScore: number
  finalScore: number
  summary: string
  keyPoints: string[]
  model: string
  version: string
}

export interface ScoringInput {
  title: string
  description: string
  url?: string
  tags?: string[]
  source: string
  hotScore?: number
}

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions'

export async function scoreWithDeepSeek(input: ScoringInput): Promise<ScoreResult | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY

  if (!apiKey) {
    console.warn('DeepSeek API key not configured')
    return null
  }

  const prompt = `你是一个资深的产品分析师和连续创业者，擅长评估海外创意在中国市场的落地潜力。

请对以下创意信号进行深度评估评分（0-100分）。

=== 创意信息 ===
标题：${input.title}
描述：${input.description || '无'}
来源平台：${input.source}
相关链接：${input.url || '无'}
标签：${input.tags?.join(', ') || '无'}
热度指数：${input.hotScore || 0}/100

=== 评分维度 ===

1. 【新颖度 noveltyScore】权重 30%
- 创意是否独特、有差异化
- 解决了什么新的痛点
- 市场上是否已有类似产品
- 技术或模式的创新程度

2. 【商业潜力 businessScore】权重 35%
- 目标用户群体规模
- 付费意愿和支付能力
- 商业模式清晰度
- 获客成本和LTV
- 竞争壁垒和护城河

3. 【本地化潜力 localScore】权重 35%
- 中国市场需求匹配度
- 政策合规风险
- 本土化改造难度
- 文化差异适应性
- 国内竞争格局

=== 输出格式 ===
请输出严格的 JSON 格式：
{
  "noveltyScore": 0-100数字,
  "businessScore": 0-100数字,
  "localScore": 0-100数字,
  "finalScore": 0-100数字(加权平均：novelty*0.3 + business*0.35 + local*0.35),
  "summary": "100字以内的整体评估",
  "keyPoints": [
    "核心优势1",
    "核心优势2",
    "主要风险1",
    "本地化建议"
  ]
}

只输出 JSON，不要任何其他文字或解释。`

  try {
    const response = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的产品分析师，擅长评估创业项目和创意信号。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || '{}'

    let result: ScoreResult
    try {
      result = JSON.parse(content)
    } catch {
      result = {
        noveltyScore: 50,
        businessScore: 50,
        localScore: 50,
        finalScore: 50,
        summary: '评分解析失败',
        keyPoints: [],
        model: 'deepseek-fallback',
        version: '2.0',
      }
    }

    result.model = 'deepseek'
    result.version = '2.0'

    return result
  } catch (error) {
    console.error('DeepSeek scoring failed:', error)
    return null
  }
}

export async function scoreSignal(input: ScoringInput): Promise<ScoreResult> {
  const heuristicScore = calculateHeuristicScore(input)

  // 尝试 DeepSeek
  try {
    const deepseekResult = await scoreWithDeepSeek(input)

    if (deepseekResult) {
      return deepseekResult
    }
  } catch (error) {
    console.error('DeepSeek failed, using heuristic:', error)
  }

  // 使用启发式评分作为后备
  return heuristicScore
}

function calculateHeuristicScore(input: ScoringInput): ScoreResult {
  const title = input.title.toLowerCase()
  const desc = (input.description || '').toLowerCase()
  const hotScore = input.hotScore || 0

  let noveltyBase = 50
  let businessBase = 50
  let localBase = 50

  const noveltyKeywords = ['ai', 'gpt', 'agent', 'automation', 'nocode', 'new', 'first', 'innovative', 'revolutionary', 'unique']
  for (const kw of noveltyKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      noveltyBase += 5
    }
  }

  const businessKeywords = ['saas', 'subscription', 'paid', 'pro', 'enterprise', 'business', 'revenue', 'pricing', 'premium', 'startup']
  for (const kw of businessKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      businessBase += 5
    }
  }

  const localKeywords = ['china', 'chinese', 'wechat', 'weixin', 'ali', 'tencent', 'bytedance', 'douyin', 'xiaohongshu']
  for (const kw of localKeywords) {
    if (title.includes(kw) || desc.includes(kw)) {
      localBase += 10
    }
  }

  if (input.source === 'producthunt') {
    noveltyBase += 5
    businessBase += 5
    localBase -= 5
  } else if (input.source === 'hackernews') {
    noveltyBase += 3
    businessBase += 2
    localBase -= 3
  }

  const hotBonus = hotScore * 0.1
  noveltyBase += hotBonus
  businessBase += hotBonus * 0.5

  const noveltyScore = Math.min(100, Math.max(0, Math.round(noveltyBase)))
  const businessScore = Math.min(100, Math.max(0, Math.round(businessBase)))
  const localScore = Math.min(100, Math.max(0, Math.round(localBase)))
  const finalScore = Math.round(noveltyScore * 0.3 + businessScore * 0.35 + localScore * 0.35)

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
  }
}

export async function batchScoreUnscoredSignals(limit: number = 50): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[Scoring] Database unavailable, skipping batch score')
    return 0
  }

  try {
    const { data: signals, error } = await supabaseAdmin
      .from('Signal')
      .select('id, title, description, url, tags, source, hotScore')
      .in('status', ['PENDING', 'SCREENED'])
      .is('finalScore', null)
      .order('fetchedAt', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('[Scoring] Failed to fetch unscored signals:', error)
      return 0
    }

    if (!signals || signals.length === 0) {
      return 0
    }

    let scoredCount = 0

    for (const signal of signals) {
      try {
        const result = await scoreSignal({
          title: signal.title,
          description: signal.description || '',
          url: signal.url || undefined,
          tags: signal.tags || [],
          source: signal.source,
          hotScore: signal.hotScore || 0,
        })

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
          .eq('id', signal.id)

        if (updateError) {
          console.error(`[Scoring] Failed to update signal ${signal.id}:`, updateError)
        } else {
          scoredCount++
        }
      } catch (err) {
        console.error(`[Scoring] Failed to score signal ${signal.id}:`, err)
      }
    }

    return scoredCount
  } catch (error) {
    console.error('[Scoring] Batch scoring failed:', error)
    invalidateDbConnection()
    return 0
  }
}
