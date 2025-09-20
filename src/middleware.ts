import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard')

    // Check admin access
    if (isAdminRoute && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check dashboard access
    if (isDashboardRoute && !['admin', 'editor', 'viewer'].includes(token?.role || '')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/content/:path*',
    '/users/:path*',
    '/settings/:path*',
  ],
}
