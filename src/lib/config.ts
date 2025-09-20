/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */

export const config = {
  // Authentication
  auth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'chaos-cms-secret-key-2025-development-only',
  },

  // API Endpoints
  api: {
    cms: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083',
    gateway: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080',
    chaosBackend: process.env.NEXT_PUBLIC_CHAOS_BACKEND_URL || 'http://localhost:8081',
  },

  // Monitoring
  monitoring: {
    prometheus: process.env.NEXT_PUBLIC_PROMETHEUS_URL || 'http://localhost:9091',
    grafana: process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3001',
  },

  // Health Check Endpoints
  health: {
    apiGateway: process.env.NEXT_PUBLIC_API_GATEWAY_HEALTH_URL || 'http://localhost:8080/health',
    chaosBackend: process.env.NEXT_PUBLIC_CHAOS_BACKEND_HEALTH_URL || 'http://localhost:8081/health',
    cmsService: process.env.NEXT_PUBLIC_CMS_SERVICE_HEALTH_URL || 'http://localhost:8083/health',
    prometheus: process.env.NEXT_PUBLIC_PROMETHEUS_HEALTH_URL || 'http://localhost:9091/-/healthy',
    grafana: process.env.NEXT_PUBLIC_GRAFANA_HEALTH_URL || 'http://localhost:3001/api/health',
  },

  // Service Configuration
  services: {
    apiGateway: {
      name: 'API Gateway',
      url: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8080',
      healthUrl: process.env.NEXT_PUBLIC_API_GATEWAY_HEALTH_URL || 'http://localhost:8080/health',
    },
    chaosBackend: {
      name: 'Chaos Backend',
      url: process.env.NEXT_PUBLIC_CHAOS_BACKEND_URL || 'http://localhost:8081',
      healthUrl: process.env.NEXT_PUBLIC_CHAOS_BACKEND_HEALTH_URL || 'http://localhost:8081/health',
    },
    cmsService: {
      name: 'CMS Service',
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083',
      healthUrl: process.env.NEXT_PUBLIC_CMS_SERVICE_HEALTH_URL || 'http://localhost:8083/health',
    },
    prometheus: {
      name: 'Prometheus',
      url: process.env.NEXT_PUBLIC_PROMETHEUS_URL || 'http://localhost:9091',
      healthUrl: process.env.NEXT_PUBLIC_PROMETHEUS_HEALTH_URL || 'http://localhost:9091/-/healthy',
    },
    grafana: {
      name: 'Grafana',
      url: process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3001',
      healthUrl: process.env.NEXT_PUBLIC_GRAFANA_HEALTH_URL || 'http://localhost:3001/api/health',
    },
  },

  // Development
  dev: {
    debug: process.env.DEBUG === 'true',
    analyze: process.env.ANALYZE === 'true',
  },

  // External Services
  external: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    gaId: process.env.NEXT_PUBLIC_GA_ID,
  },
} as const

// Type definitions for better TypeScript support
export type Config = typeof config
export type ServiceConfig = typeof config.services[keyof typeof config.services]

// Helper functions
export const getServiceUrl = (serviceName: keyof typeof config.services): string => {
  return config.services[serviceName].url
}

export const getHealthUrl = (serviceName: keyof typeof config.services): string => {
  return config.services[serviceName].healthUrl
}

export const getAllServices = (): ServiceConfig[] => {
  return Object.values(config.services)
}

// Validation function
export const validateConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Check required environment variables
  if (!process.env.NEXTAUTH_SECRET) {
    errors.push('NEXTAUTH_SECRET is required')
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    errors.push('NEXT_PUBLIC_API_URL is required')
  }

  // Check URL format
  const urlPattern = /^https?:\/\/.+/i
  const urlsToCheck = [
    { name: 'NEXTAUTH_URL', value: config.auth.url },
    { name: 'NEXT_PUBLIC_API_URL', value: config.api.cms },
    { name: 'NEXT_PUBLIC_API_GATEWAY_URL', value: config.api.gateway },
    { name: 'NEXT_PUBLIC_CHAOS_BACKEND_URL', value: config.api.chaosBackend },
    { name: 'NEXT_PUBLIC_PROMETHEUS_URL', value: config.monitoring.prometheus },
    { name: 'NEXT_PUBLIC_GRAFANA_URL', value: config.monitoring.grafana },
  ]

  urlsToCheck.forEach(({ name, value }) => {
    if (value && !urlPattern.test(value)) {
      errors.push(`${name} must be a valid URL: ${value}`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Environment Configuration:', {
    auth: { url: config.auth.url },
    api: config.api,
    monitoring: config.monitoring,
    services: Object.keys(config.services),
  })
}
