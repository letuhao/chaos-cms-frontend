# Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you get the Chaos CMS Frontend up and running quickly.

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - [VS Code recommended](https://code.visualstudio.com/)

## ⚡ Quick Setup

### **1. Clone the Repository**

```bash
# Clone the repository
git clone https://github.com/chaos-world/chaos-cms-frontend.git
cd chaos-cms-frontend

# Install dependencies
npm install
# or
yarn install
```

### **2. Environment Setup**

```bash
# Copy environment file
cp .env.example .env.local

# Edit environment variables
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
```

### **3. Start Development Server**

```bash
# Start the development server
npm run dev
# or
yarn dev
```

### **4. Open in Browser**

```
http://localhost:3000
```

## 🎯 What You'll See

### **Home Page**
- Welcome message
- Navigation menu
- Quick access to features

### **Login Page**
- Username: `admin`
- Password: `admin123`
- Secure authentication

### **Dashboard**
- System overview
- Health status
- Quick actions
- Recent activity

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run E2E tests
npm run test:coverage # Run tests with coverage

# Utilities
npm run clean        # Clean build artifacts
npm run analyze      # Analyze bundle size
```

## 🏗️ Project Structure

```
chaos-cms-frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Dashboard pages
│   │   ├── api/            # API routes
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature components
│   ├── lib/               # Utilities and configs
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # State management
│   ├── types/             # TypeScript types
│   └── constants/         # Application constants
├── public/                # Static assets
├── docs/                  # Documentation
└── tests/                 # Test files
```

## 🎨 Key Features

### **Authentication**
- Secure login with JWT
- Role-based access control
- Session management
- Protected routes

### **Dashboard**
- Real-time system monitoring
- Health status indicators
- Performance metrics
- Quick actions

### **Content Management**
- Rich text editor
- Media library
- Content scheduling
- Version control

### **User Management**
- User creation and editing
- Role assignment
- Activity tracking
- Bulk operations

### **System Monitoring**
- Health checks
- Performance metrics
- Error tracking
- Alert management

## 🔧 Configuration

### **Environment Variables**

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Monitoring
NEXT_PUBLIC_METRICS_URL=http://localhost:9090
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
```

### **Next.js Configuration**

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'your-api-domain.com'],
  },
}

module.exports = nextConfig
```

### **Tailwind Configuration**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

## 🧪 Testing

### **Run Tests**

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### **Test Structure**

```
tests/
├── __mocks__/           # Mock files
├── components/          # Component tests
├── hooks/              # Hook tests
├── pages/              # Page tests
└── utils/              # Utility tests
```

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_API_URL
```

### **Docker**

```bash
# Build Docker image
docker build -t chaos-cms-frontend .

# Run container
docker run -p 3000:3000 chaos-cms-frontend
```

### **Static Export**

```bash
# Build for static export
npm run build
npm run export

# Deploy to any static hosting
```

## 🔍 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### **Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **TypeScript Errors**
```bash
# Check TypeScript
npm run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### **Debug Mode**

```bash
# Enable debug logging
DEBUG=* npm run dev

# Or specific debug
DEBUG=next:* npm run dev
```

## 📚 Next Steps

### **1. Explore the Codebase**
- Check out the component library
- Look at the API integration
- Review the authentication flow

### **2. Read the Documentation**
- [Component Library](./component-library.md)
- [API Integration](./api-integration.md)
- [Authentication Setup](./authentication.md)
- [Deployment Guide](./deployment.md)

### **3. Start Developing**
- Create a new feature branch
- Follow the coding standards
- Write tests for your code
- Submit a pull request

### **4. Join the Community**
- GitHub Discussions
- Discord Server
- Stack Overflow

## 🆘 Need Help?

### **Documentation**
- [Full Documentation](./README.md)
- [API Reference](./api-integration.md)
- [Component Library](./component-library.md)

### **Community**
- GitHub Issues
- Discord Server
- Stack Overflow

### **Support**
- Create an issue on GitHub
- Contact the maintainers
- Check the troubleshooting guide

## 🎉 Congratulations!

You've successfully set up the Chaos CMS Frontend! You're now ready to:

- ✅ Build amazing content management features
- ✅ Create beautiful user interfaces
- ✅ Integrate with the backend API
- ✅ Deploy to production
- ✅ Contribute to the project

**Happy coding!** 🚀

---

**Built with ❤️ for Chaos World**
