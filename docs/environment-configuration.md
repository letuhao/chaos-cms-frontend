# Environment Configuration Guide

This guide explains how to configure the Chaos CMS Frontend environment variables for different deployment scenarios.

## 📋 **Overview**

The CMS frontend uses a centralized configuration system that eliminates hardcoded service paths and makes the application easily configurable for different environments.

## 🔧 **Configuration System**

### Centralized Config (`src/lib/config.ts`)
All environment variables are managed through a centralized configuration file that provides:
- Type-safe configuration access
- Default fallback values
- Environment validation
- Service discovery

### Environment Files
- `.env.local` - Local development (not committed to git)
- `env.local` - Example configuration file
- `env.example` - Template for new environments

## 🌍 **Environment Variables**

### Required Variables
```bash
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Core API
NEXT_PUBLIC_API_URL=http://localhost:8083
```

### Optional Variables (with defaults)
```bash
# Additional Services
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_CHAOS_BACKEND_URL=http://localhost:8081

# Monitoring
NEXT_PUBLIC_PROMETHEUS_URL=http://localhost:9091
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001

# Health Check Endpoints
NEXT_PUBLIC_API_GATEWAY_HEALTH_URL=http://localhost:8080/health
NEXT_PUBLIC_CHAOS_BACKEND_HEALTH_URL=http://localhost:8081/health
NEXT_PUBLIC_CMS_SERVICE_HEALTH_URL=http://localhost:8083/health
NEXT_PUBLIC_PROMETHEUS_HEALTH_URL=http://localhost:9091/-/healthy
NEXT_PUBLIC_GRAFANA_HEALTH_URL=http://localhost:3001/api/health
```

## 🚀 **Quick Setup**

### 1. Copy Environment File
```bash
cp env.local .env.local
```

### 2. Update Configuration
Edit `.env.local` with your service URLs:
```bash
# Update these URLs to match your setup
NEXT_PUBLIC_API_URL=http://your-cms-service:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://your-gateway:8080
NEXT_PUBLIC_CHAOS_BACKEND_URL=http://your-backend:8081
```

### 3. Validate Configuration
```bash
npm run validate-env
```

## 🏗️ **Deployment Scenarios**

### Development
```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_CHAOS_BACKEND_URL=http://localhost:8081
NEXT_PUBLIC_PROMETHEUS_URL=http://localhost:9091
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
```

### Staging
```bash
# .env.staging
NEXTAUTH_URL=https://cms-staging.your-domain.com
NEXTAUTH_SECRET=staging-secret-key
NEXT_PUBLIC_API_URL=https://api-staging.your-domain.com
NEXT_PUBLIC_API_GATEWAY_URL=https://gateway-staging.your-domain.com
NEXT_PUBLIC_CHAOS_BACKEND_URL=https://backend-staging.your-domain.com
NEXT_PUBLIC_PROMETHEUS_URL=https://prometheus-staging.your-domain.com
NEXT_PUBLIC_GRAFANA_URL=https://grafana-staging.your-domain.com
```

### Production
```bash
# .env.production
NEXTAUTH_URL=https://cms.your-domain.com
NEXTAUTH_SECRET=production-secret-key-very-long-and-secure
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_API_GATEWAY_URL=https://gateway.your-domain.com
NEXT_PUBLIC_CHAOS_BACKEND_URL=https://backend.your-domain.com
NEXT_PUBLIC_PROMETHEUS_URL=https://prometheus.your-domain.com
NEXT_PUBLIC_GRAFANA_URL=https://grafana.your-domain.com
```

## 🔍 **Configuration Usage**

### In Components
```typescript
import { config } from '@/lib/config'

// Access configuration
const apiUrl = config.api.cms
const grafanaUrl = config.monitoring.grafana
const allServices = getAllServices()
```

### Service Health Checks
```typescript
import { getHealthUrl, getAllServices } from '@/lib/config'

// Get health URL for a specific service
const healthUrl = getHealthUrl('apiGateway')

// Get all services
const services = getAllServices()
```

### Environment Validation
```typescript
import { validateConfig } from '@/lib/config'

const { isValid, errors } = validateConfig()
if (!isValid) {
  console.error('Configuration errors:', errors)
}
```

## 🛠️ **Development Tools**

### Environment Validation Script
```bash
# Validate all environment variables
npm run validate-env

# Check service connectivity
node scripts/validate-env.js
```

### Configuration Testing
```typescript
// Test configuration in your code
import { config, validateConfig } from '@/lib/config'

// Validate on startup
const { isValid, errors } = validateConfig()
if (!isValid) {
  throw new Error(`Configuration invalid: ${errors.join(', ')}`)
}
```

## 🔐 **Security Considerations**

### Environment Variables
- **Never commit** `.env.local` to version control
- **Use strong secrets** for production
- **Rotate secrets** regularly
- **Use different secrets** for each environment

### URL Validation
- All URLs are validated for proper format
- HTTPS is recommended for production
- CORS is configured for frontend access

### Service Discovery
- Services are discovered through environment variables
- Health check endpoints are configurable
- Fallback URLs are provided for development

## 📊 **Monitoring Integration**

### Service Health Monitoring
The monitoring dashboard automatically discovers services through environment variables:

```typescript
// Services are automatically configured from environment
const services = getAllServices()
// Returns: API Gateway, Chaos Backend, CMS Service, Prometheus, Grafana
```

### Health Check Endpoints
Each service has a configurable health check endpoint:
- **API Gateway**: `/health`
- **Chaos Backend**: `/health`
- **CMS Service**: `/health`
- **Prometheus**: `/-/healthy`
- **Grafana**: `/api/health`

## 🚨 **Troubleshooting**

### Common Issues

#### Services Not Appearing in Monitoring
```bash
# Check if environment variables are set
npm run validate-env

# Verify service URLs
echo $NEXT_PUBLIC_API_URL
echo $NEXT_PUBLIC_API_GATEWAY_URL
```

#### Configuration Not Loading
```bash
# Check if .env.local exists
ls -la .env.local

# Copy from example if missing
cp env.local .env.local
```

#### Service Connectivity Issues
```bash
# Test individual services
curl $NEXT_PUBLIC_API_URL/health
curl $NEXT_PUBLIC_API_GATEWAY_URL/health
```

### Debug Mode
Enable debug logging in development:
```bash
# .env.local
DEBUG=true
```

## 📚 **Best Practices**

### 1. Environment Separation
- Use different environment files for different stages
- Never use production secrets in development
- Use environment-specific URLs

### 2. Configuration Management
- Use the centralized config system
- Validate configuration on startup
- Provide meaningful error messages

### 3. Service Discovery
- Configure all services through environment variables
- Use consistent naming conventions
- Provide fallback values for development

### 4. Security
- Use strong, unique secrets
- Rotate secrets regularly
- Monitor for configuration changes

## 🔄 **Migration Guide**

### From Hardcoded URLs
If you have hardcoded URLs in your code:

1. **Replace direct environment access**:
   ```typescript
   // Before
   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083'
   
   // After
   import { config } from '@/lib/config'
   const apiUrl = config.api.cms
   ```

2. **Use service discovery**:
   ```typescript
   // Before
   const services = [
     { name: 'API Gateway', url: 'http://localhost:8080' }
   ]
   
   // After
   import { getAllServices } from '@/lib/config'
   const services = getAllServices()
   ```

3. **Validate configuration**:
   ```typescript
   // Add validation on startup
   import { validateConfig } from '@/lib/config'
   const { isValid, errors } = validateConfig()
   ```

## 📞 **Support**

For configuration issues:
1. Run `npm run validate-env` to check your setup
2. Review the troubleshooting section above
3. Check the service logs for connectivity issues
4. Verify all environment variables are properly set
