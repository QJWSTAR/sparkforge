import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// 需要认证的页面路由
const PROTECTED_ROUTES = ['/profile', '/projects']

// 认证页面（已登录用户不应访问）
const AUTH_ROUTES = ['/login', '/register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 创建 Supabase 客户端用于读取 session
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  try {
    const { data: { session } } = await supabase.auth.getSession()

    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
      pathname === route || pathname.startsWith(route + '/')
    )

    const isAuthRoute = AUTH_ROUTES.some(route => pathname === route)

    // 未登录访问受保护页面 → 重定向到登录
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // 已登录访问认证页面 → 重定向到首页
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch {
    // session 读取失败时不阻断请求，交给页面端处理
  }

  return response
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/projects/:path*',
    '/login',
    '/register',
  ],
}
