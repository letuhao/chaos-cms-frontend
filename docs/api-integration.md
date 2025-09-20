# API Integration Guide

## 🔌 Backend API Integration

This document outlines how the Chaos CMS Frontend integrates with the Chaos Backend Service APIs.

## 🌐 API Endpoints

### **Base URLs**
```typescript
// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083'
const GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080'
const METRICS_URL = process.env.NEXT_PUBLIC_METRICS_URL || 'http://localhost:9090'
```

### **Authentication Endpoints**

#### **POST /api/v1/auth/login**
```typescript
interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  success: boolean
  data: {
    token: string
    user: {
      id: string
      username: string
      role: string
    }
    expires_at: string
  }
  error?: string
  timestamp: string
}
```

#### **GET /api/v1/auth/me**
```typescript
interface UserInfo {
  id: string
  username: string
  role: string
}

interface MeResponse {
  success: boolean
  data: UserInfo
  error?: string
  timestamp: string
}
```

### **Admin Endpoints**

#### **GET /api/v1/admin**
```typescript
interface AdminResponse {
  success: boolean
  data: {
    message: string
    features: string[]
    status: string
  }
  error?: string
  timestamp: string
}
```

### **Monitoring Endpoints**

#### **GET /api/v1/health**
```typescript
interface HealthStatus {
  status: string
  timestamp: string
  version: string
  services: {
    database: ServiceStatus
    cache: ServiceStatus
    storage: ServiceStatus
  }
}

interface ServiceStatus {
  status: string
  response_time_ms?: number
  error?: string
}
```

#### **GET /api/v1/metrics/info**
```typescript
interface MetricsInfo {
  requests_total: number
  requests_per_second: number
  response_time_avg_ms: number
  response_time_p95_ms: number
  error_rate: number
  active_connections: number
}
```

#### **GET /metrics**
```typescript
// Prometheus metrics endpoint
// Returns text/plain format with Prometheus metrics
```

## 🛠️ API Client Implementation

### **Base API Client**

```typescript
// src/lib/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class ApiClient {
  private client: AxiosInstance
  private token: string | null = null

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken()
          // Redirect to login
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
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

// Create API client instances
export const cmsApi = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083')
export const gatewayApi = new ApiClient(process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080')
export const metricsApi = new ApiClient(process.env.NEXT_PUBLIC_METRICS_URL || 'http://localhost:9090')
```

### **Authentication Service**

```typescript
// src/lib/auth-service.ts
import { cmsApi } from './api'
import { LoginRequest, LoginResponse, UserInfo } from '@/types/auth'

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await cmsApi.post<LoginResponse>('/api/v1/auth/login', credentials)
      
      if (response.success && response.data) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.data.token)
        cmsApi.setToken(response.data.token)
      }
      
      return response
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  async getCurrentUser(): Promise<UserInfo> {
    try {
      const response = await cmsApi.get<{ success: boolean; data: UserInfo }>('/api/v1/auth/me')
      return response.data
    } catch (error) {
      throw new Error('Failed to get user info')
    }
  }

  logout() {
    localStorage.removeItem('auth_token')
    cmsApi.clearToken()
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }
}

export const authService = new AuthService()
```

### **CMS Service**

```typescript
// src/lib/cms-service.ts
import { cmsApi } from './api'
import { HealthStatus, MetricsInfo } from '@/types/monitoring'

export class CmsService {
  async getHealthStatus(): Promise<HealthStatus> {
    try {
      const response = await cmsApi.get<{ success: boolean; data: HealthStatus }>('/api/v1/health')
      return response.data
    } catch (error) {
      throw new Error('Failed to get health status')
    }
  }

  async getMetricsInfo(): Promise<MetricsInfo> {
    try {
      const response = await cmsApi.get<{ success: boolean; data: MetricsInfo }>('/api/v1/metrics/info')
      return response.data
    } catch (error) {
      throw new Error('Failed to get metrics info')
    }
  }

  async getAdminInfo(): Promise<any> {
    try {
      const response = await cmsApi.get<{ success: boolean; data: any }>('/api/v1/admin')
      return response.data
    } catch (error) {
      throw new Error('Failed to get admin info')
    }
  }
}

export const cmsService = new CmsService()
```

## 🔄 React Query Integration

### **Query Hooks**

```typescript
// src/hooks/use-auth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/lib/auth-service'
import { LoginRequest } from '@/types/auth'

export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
  })
}
```

```typescript
// src/hooks/use-cms.ts
import { useQuery } from '@tanstack/react-query'
import { cmsService } from '@/lib/cms-service'

export const useHealthStatus = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => cmsService.getHealthStatus(),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export const useMetricsInfo = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: () => cmsService.getMetricsInfo(),
    refetchInterval: 10000, // Refetch every 10 seconds
  })
}

export const useAdminInfo = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: () => cmsService.getAdminInfo(),
  })
}
```

## 🎯 Error Handling

### **Error Types**

```typescript
// src/types/errors.ts
export interface ApiError {
  message: string
  status: number
  code?: string
}

export class ApiException extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiException'
  }
}
```

### **Error Boundary**

```typescript
// src/components/ErrorBoundary.tsx
'use client'

import React from 'react'
import { ApiException } from '@/types/errors'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  </div>
)
```

## 🔐 Authentication Middleware

### **NextAuth.js Configuration**

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authService } from './auth-service'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await authService.login({
            username: credentials.username,
            password: credentials.password
          })

          if (response.success && response.data) {
            return {
              id: response.data.user.id,
              name: response.data.user.username,
              email: response.data.user.username,
              role: response.data.user.role,
              token: response.data.token
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  }
}
```

## 📊 Real-time Updates

### **WebSocket Integration**

```typescript
// src/hooks/use-websocket.ts
import { useEffect, useState } from 'react'

interface UseWebSocketOptions {
  url: string
  onMessage?: (data: any) => void
  onError?: (error: Event) => void
  onOpen?: () => void
  onClose?: () => void
}

export const useWebSocket = (options: UseWebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(options.url)

    ws.onopen = () => {
      setIsConnected(true)
      options.onOpen?.()
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        options.onMessage?.(data)
      } catch (error) {
        console.error('WebSocket message parsing error:', error)
      }
    }

    ws.onerror = (error) => {
      options.onError?.(error)
    }

    ws.onclose = () => {
      setIsConnected(false)
      options.onClose?.()
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [options.url])

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message))
    }
  }

  return { socket, isConnected, sendMessage }
}
```

## 🧪 Testing API Integration

### **Mock API for Testing**

```typescript
// src/lib/__mocks__/api.ts
export const mockCmsApi = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  setToken: jest.fn(),
  clearToken: jest.fn(),
}

export const mockAuthService = {
  login: jest.fn(),
  getCurrentUser: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: jest.fn(),
}

export const mockCmsService = {
  getHealthStatus: jest.fn(),
  getMetricsInfo: jest.fn(),
  getAdminInfo: jest.fn(),
}
```

### **API Integration Tests**

```typescript
// src/__tests__/api-integration.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useHealthStatus } from '@/hooks/use-cms'
import { mockCmsService } from '@/lib/__mocks__/api'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch health status', async () => {
    const mockHealthData = {
      status: 'healthy',
      timestamp: '2023-01-01T00:00:00Z',
      version: '1.0.0',
      services: {
        database: { status: 'healthy' },
        cache: { status: 'healthy' },
        storage: { status: 'healthy' }
      }
    }

    mockCmsService.getHealthStatus.mockResolvedValue(mockHealthData)

    const { result } = renderHook(() => useHealthStatus(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockHealthData)
  })
})
```

## 🚀 Performance Optimization

### **Request Caching**

```typescript
// src/lib/cache.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})
```

### **Request Deduplication**

```typescript
// src/hooks/use-deduplicated-query.ts
import { useQuery } from '@tanstack/react-query'

export const useDeduplicatedQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: any
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
    // Enable request deduplication
    enabled: true,
  })
}
```

---

**This API integration guide provides a comprehensive foundation for connecting the Chaos CMS Frontend with the backend services efficiently and securely!** 🎉
