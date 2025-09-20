# Authentication Setup Guide

## 🔐 Authentication Architecture

This document outlines the authentication system for the Chaos CMS Frontend, including setup, implementation, and security considerations.

## 🏗️ Authentication Flow

### **1. Login Process**
```
User → Login Form → NextAuth.js → Backend API → JWT Token → Session Storage
```

### **2. Session Management**
```
JWT Token → NextAuth.js Session → Protected Routes → API Requests
```

### **3. Logout Process**
```
User → Logout Action → Clear Session → Clear Token → Redirect to Login
```

## 🛠️ Implementation

### **NextAuth.js Configuration**

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

interface User {
  id: string
  username: string
  role: string
  token: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            return null
          }

          const data = await response.json()

          if (data.success && data.data) {
            return {
              id: data.data.user.id,
              username: data.data.user.username,
              role: data.data.user.role,
              token: data.data.token,
            }
          }
        } catch (error) {
          console.error('Authentication error:', error)
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      if (token) {
        session.user.id = token.userId as string
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}
```

### **Session Configuration**

```typescript
// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
    accessToken: string
  }

  interface User extends DefaultUser {
    role: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    accessToken: string
    userId: string
  }
}
```

### **API Client with Authentication**

```typescript
// src/lib/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

class AuthenticatedApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const session = await getSession()
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Redirect to login on unauthorized
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config)
    return response.data
  }
}

export const apiClient = new AuthenticatedApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083'
)
```

## 🎯 Authentication Components

### **Login Form**

```typescript
// src/components/auth/LoginForm.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Loader2, Eye, EyeOff } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid username or password')
      } else if (result?.ok) {
        // Get session to check user role
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/dashboard')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign in to CMS</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Input
                {...register('username')}
                label="Username"
                placeholder="Enter your username"
                error={errors.username?.message}
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export { LoginForm }
```

### **Protected Route Component**

```typescript
// src/components/auth/ProtectedRoute.tsx
'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return fallback || null
  }

  if (requiredRole && session?.user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export { ProtectedRoute }
```

### **User Menu Component**

```typescript
// src/components/layout/UserMenu.tsx
'use client'

import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@/components/ui/Dropdown'
import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
import { User, Settings, LogOut, Shield } from 'lucide-react'

const UserMenu: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const handleProfile = () => {
    router.push('/profile')
    setIsOpen(false)
  }

  const handleSettings = () => {
    router.push('/settings')
    setIsOpen(false)
  }

  const handleAdmin = () => {
    router.push('/admin')
    setIsOpen(false)
  }

  if (!session?.user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push('/login')}
      >
        Sign In
      </Button>
    )
  }

  return (
    <Dropdown open={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {session.user.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownTrigger>
      <DropdownContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{session.user.username}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {session.user.role}
            </p>
          </div>
        </div>
        <DropdownItem onClick={handleProfile}>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownItem>
        <DropdownItem onClick={handleSettings}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownItem>
        {session.user.role === 'admin' && (
          <DropdownItem onClick={handleAdmin}>
            <Shield className="mr-2 h-4 w-4" />
            Admin Panel
          </DropdownItem>
        )}
        <DropdownItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export { UserMenu }
```

## 🔒 Security Middleware

### **Route Protection Middleware**

```typescript
// src/middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard')

    // Redirect to login if no token
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check admin access
    if (isAdminRoute && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check dashboard access
    if (isDashboardRoute && !['admin', 'editor'].includes(token.role)) {
      return NextResponse.redirect(new URL('/', req.url))
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
    '/profile/:path*',
    '/settings/:path*',
  ],
}
```

### **API Route Protection**

```typescript
// src/app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check role if needed
  if (token.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ message: 'Protected data' })
}
```

## 🧪 Authentication Testing

### **Test Utilities**

```typescript
// src/test-utils/auth.ts
import { render, RenderOptions } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockSession = {
  user: {
    id: '1',
    username: 'testuser',
    role: 'admin',
  },
  accessToken: 'mock-token',
  expires: '2024-01-01T00:00:00.000Z',
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={mockSession}>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}

export const renderWithAuth = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })
```

### **Authentication Tests**

```typescript
// src/components/auth/__tests__/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@/test-utils/auth'
import { LoginForm } from '../LoginForm'
import { signIn } from 'next-auth/react'

jest.mock('next-auth/react')
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

describe('LoginForm', () => {
  beforeEach(() => {
    mockSignIn.mockClear()
  })

  it('renders login form', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />)
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    
    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  it('calls signIn with correct credentials', async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null })
    
    render(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' }
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        username: 'testuser',
        password: 'password',
        redirect: false,
      })
    })
  })
})
```

## 🔧 Environment Configuration

### **Environment Variables**

```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
```

### **Production Configuration**

```env
# .env.production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret-key
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_API_GATEWAY_URL=https://gateway.your-domain.com
```

## 🚀 Deployment Considerations

### **Security Headers**

```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### **Session Configuration**

```typescript
// src/lib/auth.ts
export const authOptions: NextAuthOptions = {
  // ... other options
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}
```

---

**This authentication system provides secure, role-based access control for the Chaos CMS Frontend!** 🔐
