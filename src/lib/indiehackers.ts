import { getSupabaseAdmin, invalidateDbConnection } from './supabase'

export interface RawIHProduct {
  id: string
  title: string
  description: string
  url: string
  author: string
  votesCount: number
  commentsCount: number
  tags: string[]
}

/**
 * 从 Indie Hackers 首页抓取产品列表。
 * Indie Hackers 无公开 API，通过解析 HTML 提取产品卡片。
 * 失败时回退到静态 Demo 数据，保证流水线不中断。
 */
export async function fetchIndieHackers(limit: number = 10): Promise<RawIHProduct[]> {
  try {
    const response = await fetch('https://www.indiehackers.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SparkForge/1.0; +https://sparkforge.ai)',
        'Accept': 'text/html',
      },
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      console.warn(`[Indie Hackers] Page returned ${response.status}, using demo data`)
      return getDemoProducts(limit)
    }

    const html = await response.text()

    // 解析 HTML 中的产品卡片
    // Indie Hackers 产品数据嵌入在 <script> 的 JSON 中或 HTML 结构中
    const products = parseIHProducts(html, limit)
    if (products.length > 0) {
      return products
    }

    console.warn('[Indie Hackers] No products parsed from HTML, using demo data')
    return getDemoProducts(limit)
  } catch (error) {
    console.warn('[Indie Hackers] Failed to fetch:', error)
    return getDemoProducts(limit)
  }
}

function parseIHProducts(html: string, limit: number): RawIHProduct[] {
  const products: RawIHProduct[] = []

  try {
    // 尝试从页面中提取 JSON 数据（Indie Hackers 通常将数据嵌入在 script 标签中）
    const jsonMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[1])
      const posts = data?.props?.pageProps?.posts || data?.props?.pageProps?.products || []

      for (const post of posts.slice(0, limit)) {
        if (!post.id && !post.name) continue
        products.push({
          id: String(post.id || post.name),
          title: post.name || post.title || 'Untitled',
          description: post.tagline || post.description || '',
          url: post.url || `https://www.indiehackers.com/product/${post.slug || post.id}`,
          author: post.makerName || post.user?.name || 'Anonymous',
          votesCount: post.upvotes || post.votesCount || 0,
          commentsCount: post.commentsCount || post.commentCount || 0,
          tags: post.topics || post.categories || [],
        })
      }
      return products
    }
  } catch {
    // JSON 解析失败，尝试 HTML 解析
  }

  // 回退：从 HTML 中正则提取产品卡片
  try {
    const cardRegex = /<a[^>]*href="\/product\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
    let match
    let count = 0

    while ((match = cardRegex.exec(html)) !== null && count < limit) {
      const slug = match[1]
      products.push({
        id: `ih-${slug}`,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        description: '',
        url: `https://www.indiehackers.com/product/${slug}`,
        author: 'Indie Hacker',
        votesCount: 0,
        commentsCount: 0,
        tags: [],
      })
      count++
    }
  } catch {
    // HTML 解析失败
  }

  return products
}

function getDemoProducts(limit: number): RawIHProduct[] {
  const demo: RawIHProduct[] = [
    {
      id: 'ih-demo-001',
      title: 'EmailOctopus - 低成本邮件营销平台',
      description: '面向独立开发者的邮件营销工具，提供免费套餐和按量付费，比 Mailchimp 便宜 5 倍。',
      url: 'https://www.indiehackers.com/product/emailoctopus',
      author: 'Jonathan Bull',
      votesCount: 320,
      commentsCount: 45,
      tags: ['SaaS', 'Email', 'Marketing'],
    },
    {
      id: 'ih-demo-002',
      title: 'Plausible Analytics - 轻量级隐私友好分析',
      description: '开源、轻量级的网站分析工具，无需 Cookie，完全符合 GDPR。月收入 $100K+。',
      url: 'https://www.indiehackers.com/product/plausible-analytics',
      author: 'Uku Taht',
      votesCount: 580,
      commentsCount: 92,
      tags: ['SaaS', 'Analytics', 'Open Source'],
    },
    {
      id: 'ih-demo-003',
      title: 'Bannerbear - 自动化图片和视频生成 API',
      description: '为开发者提供图片和视频自动生成的 API 服务，支持模板化批量生成。MRR $25K。',
      url: 'https://www.indiehackers.com/product/bannerbear',
      author: 'Yong Jun',
      votesCount: 410,
      commentsCount: 67,
      tags: ['API', 'Automation', 'DevTools'],
    },
    {
      id: 'ih-demo-004',
      title: 'Leave Me Alone - 一键退订垃圾邮件',
      description: '扫描邮箱中的订阅邮件，一键批量退订。ARR $120K，完全自举。',
      url: 'https://www.indiehackers.com/product/leave-me-alone',
      author: 'Danielle Johnson',
      votesCount: 280,
      commentsCount: 38,
      tags: ['SaaS', 'Privacy', 'Email'],
    },
    {
      id: 'ih-demo-005',
      title: 'TinySnap - 浏览器截图美化工具',
      description: '一键生成精美的浏览器截图，支持多种背景、阴影和尺寸，适合产品展示。',
      url: 'https://www.indiehackers.com/product/tinysnap',
      author: 'Mike Chen',
      votesCount: 190,
      commentsCount: 23,
      tags: ['DevTools', 'Design', 'SaaS'],
    },
  ]

  return demo.slice(0, limit)
}

export async function saveIHSignals(products: RawIHProduct[]): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[Indie Hackers] Database unavailable, skipping save')
    return 0
  }

  let savedCount = 0

  for (const product of products) {
    try {
      const hotScore = calculateIHHotScore(product.votesCount, product.commentsCount)

      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'indiehackers',
            sourceId: product.id,
            title: product.title,
            description: product.description?.substring(0, 500) || null,
            url: product.url,
            tags: product.tags || [],
            author: product.author || null,
            votesCount: product.votesCount || 0,
            commentsCount: product.commentsCount || 0,
            hotScore,
            status: 'PENDING',
            rawData: product as any,
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`[Indie Hackers] Failed to save product ${product.id}:`, err)
      invalidateDbConnection()
    }
  }

  return savedCount
}

function calculateIHHotScore(votes: number, comments: number): number {
  const score = votes * 0.8 + comments * 0.2
  return Math.min(100, Math.round(score * 0.25))
}