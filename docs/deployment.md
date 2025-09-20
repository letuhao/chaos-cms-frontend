# Deployment Guide

## 🚀 Deployment Options

This document outlines various deployment strategies for the Chaos CMS Frontend, from development to production.

## 📋 Prerequisites

### **System Requirements**
- Node.js 18+ 
- npm or yarn
- Git
- Domain name (for production)
- SSL certificate (for production)

### **Environment Setup**
- Backend API running
- Database configured
- Environment variables set

## 🌐 Deployment Platforms

### **1. Vercel (Recommended)**

Vercel is the optimal choice for Next.js applications due to its seamless integration and excellent performance.

#### **Setup Process**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   vercel
   ```

4. **Configure environment variables**
   ```bash
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXT_PUBLIC_API_URL
   vercel env add NEXT_PUBLIC_API_GATEWAY_URL
   ```

#### **Vercel Configuration**

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "env": {
    "NEXTAUTH_URL": "https://your-domain.vercel.app"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/admin",
      "destination": "/admin/dashboard",
      "permanent": false
    }
  ]
}
```

#### **GitHub Integration**

1. **Connect GitHub repository**
2. **Enable automatic deployments**
3. **Configure branch protection**
4. **Set up preview deployments**

### **2. Netlify**

Alternative deployment platform with good Next.js support.

#### **Setup Process**

1. **Install Netlify CLI**
   ```bash
  npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

#### **Netlify Configuration**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/admin"
  to = "/admin/dashboard"
  status = 302

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "origin-when-cross-origin"
```

### **3. Docker Deployment**

For self-hosted or cloud provider deployments.

#### **Dockerfile**

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### **Docker Compose**

```yaml
# docker-compose.yml
version: '3.8'

services:
  cms-frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXTAUTH_URL=https://your-domain.com
      - NEXTAUTH_SECRET=your-secret-key
      - NEXT_PUBLIC_API_URL=https://api.your-domain.com
      - NEXT_PUBLIC_API_GATEWAY_URL=https://gateway.your-domain.com
    depends_on:
      - cms-backend
    restart: unless-stopped

  cms-backend:
    image: chaos-backend:latest
    ports:
      - "8083:8083"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/chaos_cms
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=chaos_cms
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### **4. AWS Deployment**

#### **AWS Amplify**

1. **Connect repository to Amplify**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy**

#### **AWS ECS with Fargate**

```yaml
# task-definition.json
{
  "family": "chaos-cms-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "cms-frontend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/chaos-cms-frontend:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "NEXTAUTH_URL",
          "value": "https://your-domain.com"
        }
      ],
      "secrets": [
        {
          "name": "NEXTAUTH_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:nextauth-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/chaos-cms-frontend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 🔧 Build Configuration

### **Next.js Configuration**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker deployment
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'your-api-domain.com'],
    unoptimized: false, // Enable for static export
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
```

### **Package.json Scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "build:analyze": "ANALYZE=true npm run build",
    "export": "next build && next export",
    "docker:build": "docker build -t chaos-cms-frontend .",
    "docker:run": "docker run -p 3000:3000 chaos-cms-frontend"
  }
}
```

## 🌍 Environment Configuration

### **Development Environment**

```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_METRICS_URL=http://localhost:9090
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
```

### **Staging Environment**

```env
# .env.staging
NEXTAUTH_URL=https://staging-cms.your-domain.com
NEXTAUTH_SECRET=staging-secret-key
NEXT_PUBLIC_API_URL=https://staging-api.your-domain.com
NEXT_PUBLIC_API_GATEWAY_URL=https://staging-gateway.your-domain.com
NEXT_PUBLIC_METRICS_URL=https://staging-metrics.your-domain.com
NEXT_PUBLIC_GRAFANA_URL=https://staging-grafana.your-domain.com
```

### **Production Environment**

```env
# .env.production
NEXTAUTH_URL=https://cms.your-domain.com
NEXTAUTH_SECRET=production-secret-key
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_API_GATEWAY_URL=https://gateway.your-domain.com
NEXT_PUBLIC_METRICS_URL=https://metrics.your-domain.com
NEXT_PUBLIC_GRAFANA_URL=https://grafana.your-domain.com
```

## 🔒 Security Configuration

### **SSL/TLS Setup**

#### **Let's Encrypt (Free)**

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### **Cloudflare SSL**

1. **Add domain to Cloudflare**
2. **Enable SSL/TLS encryption**
3. **Configure SSL mode to "Full (strict)"**
4. **Enable HSTS**

### **Security Headers**

```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Performance Optimization

### **CDN Configuration**

#### **Cloudflare**

1. **Enable Cloudflare for domain**
2. **Configure caching rules**
3. **Enable Brotli compression**
4. **Set up page rules**

#### **AWS CloudFront**

```json
{
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "chaos-cms-frontend",
        "DomainName": "your-domain.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "chaos-cms-frontend",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
  }
}
```

### **Image Optimization**

```typescript
// next.config.js
const nextConfig = {
  images: {
    domains: ['your-api-domain.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### **Bundle Analysis**

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
npm run build:analyze
```

## 🧪 Testing in Production

### **Health Checks**

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database connection
    // Check external API availability
    // Check critical services
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
```

### **Monitoring Setup**

#### **Sentry Error Tracking**

```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})
```

#### **Analytics Integration**

```typescript
// src/lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

## 🚀 CI/CD Pipeline

### **GitHub Actions**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test
      - run: npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

### **Docker Build Pipeline**

```yaml
# .github/workflows/docker.yml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

## 📈 Performance Monitoring

### **Core Web Vitals**

```typescript
// src/lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### **Lighthouse CI**

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://your-domain.com'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

---

**This deployment guide provides comprehensive strategies for deploying the Chaos CMS Frontend to production with security, performance, and reliability in mind!** 🚀
