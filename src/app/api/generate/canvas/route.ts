import { NextRequest, NextResponse } from 'next/server'

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'DeepSeek API key not configured' },
      { status: 500 }
    )
  }

  const { signalTitle, signalDescription } = await request.json()

  if (!signalTitle) {
    return NextResponse.json(
      { success: false, error: 'signalTitle is required' },
      { status: 400 }
    )
  }

  const prompt = `你是一个资深的商业分析师和连续创业者，擅长为初创项目生成完整的商业模型画布。

请为以下创意信号生成完整的商业分析：

=== 创意信息 ===
标题：${signalTitle}
描述：${signalDescription || '无'}

=== 输出内容 ===

请输出严格的 JSON 格式，包含以下字段：
{
  "valueProposition": "一句话定位（产品提供什么独特价值）",
  "customerSegments": [
    "目标用户群体1",
    "目标用户群体2"
  ],
  "revenueStreams": [
    "收入来源1",
    "收入来源2"
  ],
  "keyPartners": [
    "合作伙伴1",
    "合作伙伴2"
  ],
  "keyActivities": [
    "关键活动1",
    "关键活动2"
  ],
  "keyResources": [
    "关键资源1",
    "关键资源2"
  ],
  "channels": [
    "渠道1",
    "渠道2"
  ],
  "customerRelationships": [
    "客户关系策略1",
    "客户关系策略2"
  ],
  "costStructure": [
    "成本项1",
    "成本项2"
  ],
  "competitiveAnalysis": [
    {
      "competitor": "竞争对手名称",
      "strengths": "竞争对手优势",
      "weaknesses": "竞争对手劣势",
      "opportunity": "竞争机会"
    }
  ],
  "swot": {
    "strengths": ["优势1", "优势2"],
    "weaknesses": ["劣势1", "劣势2"],
    "opportunities": ["机会1", "机会2"],
    "threats": ["威胁1", "威胁2"]
  },
  "actionPlan": [
    "Day 1-7: 第一阶段行动",
    "Day 8-14: 第二阶段行动"
  ],
  "summary": "商业分析总结"
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
          { role: 'system', content: '你是一个专业的商业分析师，擅长为初创项目生成完整的商业模型画布。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 2500,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || '{}'

    let result
    try {
      result = JSON.parse(content)
    } catch {
      result = {
        valueProposition: signalTitle,
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
        summary: 'AI 解析失败，使用默认模板',
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Canvas generation failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate business canvas',
        data: {
          valueProposition: signalTitle,
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
        },
      },
      { status: 500 }
    )
  }
}