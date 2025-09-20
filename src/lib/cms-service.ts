import axios, { AxiosInstance } from 'axios'
import { config } from './config'

class CmsService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: config.api.cms,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        // In a real app, you'd get the token from NextAuth session
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
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
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async getHealthStatus() {
    try {
      const response = await this.client.get('/api/v1/health')
      return response.data.data
    } catch (error) {
      console.error('Failed to get health status:', error)
      throw new Error('Failed to get health status')
    }
  }

  async getMetricsInfo() {
    try {
      const response = await this.client.get('/api/v1/metrics/info')
      return response.data.data
    } catch (error) {
      console.error('Failed to get metrics info:', error)
      throw new Error('Failed to get metrics info')
    }
  }

  async getAdminInfo() {
    try {
      const response = await this.client.get('/api/v1/admin')
      return response.data.data
    } catch (error) {
      console.error('Failed to get admin info:', error)
      throw new Error('Failed to get admin info')
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.client.get('/api/v1/auth/me')
      return response.data.data
    } catch (error) {
      console.error('Failed to get current user:', error)
      throw new Error('Failed to get current user')
    }
  }
}

export const cmsService = new CmsService()
