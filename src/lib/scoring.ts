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
const MIMO_API = 'https://api.mimo.com/v1/chat/completions'

export async function scoreWithMimo(input: ScoringInput): Promise<ScoreResult | null> {
  const apiKey = process.env.MIMO_API_KEY
  
  if (!apiKey) {
    console.warn('MiMo API key not configured')
    return null
  }

  const prompt = `你是一个创意信号分析师。请对以下创意信号进行快速初筛评分（0-100分）。

创意标题：${input.title}
创意描述：${input.description || '无'}
来源：${input.source}
标签：${input.tags?.join(', ') || '无'}

请从以下3个维度评分：
1. 新颖度（noveltyScore）：创意是否新颖、有差异化
2. 商业潜力（businessScore）：是否有明确的商业模式、付费意愿
3. 本地化潜力（localScore）：是否适合中国市场、本地化改造空间

输出 JSON 格式：
{
  "noveltyScore": 数字,
  "businessScore": 数字,
  "localScore": 数字,
  "finalScore": 数字(加权平均),
  "summary": "一句话总结",
  "keyPoints": ["要点1", "要点2", "要点3"]
}

只输出 JSON，不要其他文字。`

  try {
    const response = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的创意信号分析师。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
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
        model: 'mimo-fallback',
        version: '1.0',
      }
    }

    result.model = 'mimo'
    result.version = '1.0'
    
    return result
  } catch (error) {
    console.error('MiMo scoring failed:', error)
    return null
  }
}

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

  try {
    const deepseekResult = await scoreWithDeepSeek(input)
    
    if (deepseekResult) {
      return deepseekResult
    }
  } catch (error) {
    console.error('LLM scoring failed, using heuristic:', error)
  }

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
