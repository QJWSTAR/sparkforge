import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions'

export async function POST(request: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'DeepSeek API key not configured' },
      { status: 500 }
    )
  }

  // Token 认证
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
  }

  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = user.id

  const { signalTitle, signalDescription, signalId, language, transformPoints, customPrompt } = await request.json()

  if (!signalTitle) {
    return NextResponse.json(
      { success: false, error: 'signalTitle is required' },
      { status: 400 }
    )
  }

  const prompt = `你是一个资深的全栈开发工程师和产品架构师，擅长将创意转化为可执行的技术方案。

请为以下创意信号生成完整的项目复刻方案：

=== 创意信息 ===
标题：${signalTitle}
描述：${signalDescription || '无'}
目标语言：${language}
本地化改造点：${transformPoints?.filter((p: any) => p.checked).map((p: any) => p.label).join(', ') || '无'}
额外要求：${customPrompt || '无'}

=== 输出内容 ===

请输出严格的 JSON 格式，包含以下字段：
{
  "techStack": "推荐的技术栈（如：Next.js + React + TypeScript + TailwindCSS + Supabase）",
  "projectStructure": [
    "src/",
    "  components/",
    "  pages/",
    "  lib/",
    "  styles/"
  ],
  "coreFeatures": [
    {
      "name": "功能模块名称",
      "description": "功能描述",
      "implementation": "关键实现要点"
    }
  ],
  "localizationPlan": [
    "本地化改造措施1",
    "本地化改造措施2"
  ],
  "estimatedTime": "预估开发时间",
  "difficulty": "难度评级（简单/中等/困难）",
  "summary": "项目方案总结"
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
          { role: 'system', content: '你是一个专业的全栈开发工程师，擅长将创意转化为技术方案。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 2000,
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
        techStack: 'Next.js + React + TypeScript',
        projectStructure: ['src/', '  components/', '  pages/', '  lib/'],
        coreFeatures: [
          { name: '核心功能', description: '基于信号生成的核心功能', implementation: '待实现' }
        ],
        localizationPlan: [],
        estimatedTime: '2-4周',
        difficulty: '中等',
        summary: 'AI 解析失败，使用默认方案',
      }
    }

    // 持久化到 ForgeProject 表
    let project = null
    if (supabaseAdmin) {
      try {
        const { data: inserted, error: insertError } = await supabaseAdmin
          .from('ForgeProject')
          .insert({
            id: crypto.randomUUID(),
            userId,
            signalId: signalId || '',
            status: 'COMPLETED',
            outputSummary: result.summary || '',
            result: result,
            targetLanguage: language || 'zh',
            updatedAt: new Date().toISOString(),
          })
          .select()
          .single()
        if (insertError) {
          console.error('Failed to persist forge result (insertError):', insertError)
        } else if (inserted) {
          project = inserted
        }
      } catch (err) {
        console.error('Failed to persist forge result (exception):', err)
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      projectId: project?.id,
    })
  } catch (error) {
    console.error('Forge generation failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate project plan',
        data: {
          techStack: 'Next.js + React + TypeScript',
          projectStructure: ['src/', '  components/', '  pages/', '  lib/'],
          coreFeatures: [
            { name: '核心功能', description: '基于信号生成的核心功能', implementation: '待实现' }
          ],
          localizationPlan: [],
          estimatedTime: '2-4周',
          difficulty: '中等',
          summary: 'AI 服务暂时不可用，使用默认方案',
        },
      },
      { status: 500 }
    )
  }
}