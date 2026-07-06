import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sparkforge-blush.vercel.app'

  const staticPages = [
    { path: '/', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/radar', priority: 0.9, changeFreq: 'hourly' as const },
    { path: '/forge', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/canvas', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/projects', priority: 0.7, changeFreq: 'daily' as const },
    { path: '/stream', priority: 0.7, changeFreq: 'daily' as const },
    { path: '/login', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/register', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/about', priority: 0.4, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  return staticPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}