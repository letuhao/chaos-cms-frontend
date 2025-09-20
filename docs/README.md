# Chaos CMS Frontend Documentation

## 📋 Overview

The Chaos CMS Frontend is a modern, responsive content management system built with Next.js 14, TypeScript, and Tailwind CSS. It provides an intuitive interface for managing content, users, and system monitoring.

## 🚀 Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Modern React with concurrent features

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### State Management
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling with validation

### Authentication & Security
- **NextAuth.js** - Authentication framework
- **JWT** - Token-based authentication
- **Argon2** - Password hashing (backend)

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 🏗️ Project Structure

```
chaos-cms-frontend/
├── docs/                          # Documentation
├── public/                        # Static assets
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth route group
│   │   ├── (dashboard)/         # Dashboard route group
│   │   ├── api/                 # API routes
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   ├── forms/               # Form components
│   │   ├── layout/              # Layout components
│   │   └── features/            # Feature-specific components
│   ├── lib/                     # Utilities and configurations
│   │   ├── auth.ts              # Auth configuration
│   │   ├── api.ts               # API client
│   │   ├── utils.ts             # Utility functions
│   │   └── validations.ts       # Form validations
│   ├── hooks/                   # Custom React hooks
│   ├── stores/                  # Zustand stores
│   ├── types/                   # TypeScript type definitions
│   └── constants/               # Application constants
├── .env.local                   # Environment variables
├── .env.example                 # Environment variables example
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Key Features

### 1. **Authentication System**
- Secure login with JWT tokens
- Role-based access control (Admin, Editor, Viewer)
- Session management with automatic refresh
- Protected routes and middleware

### 2. **Dashboard**
- Real-time system monitoring
- Content overview and statistics
- Quick actions and shortcuts
- Responsive design for all devices

### 3. **Content Management**
- Rich text editor with WYSIWYG
- Media library with upload and organization
- Content scheduling and publishing
- Version control and history

### 4. **User Management**
- User creation and editing
- Role assignment and permissions
- Activity logs and audit trails
- Bulk operations

### 5. **System Monitoring**
- Real-time metrics and health status
- Performance monitoring
- Error tracking and logging
- Alert management

### 6. **Settings & Configuration**
- System configuration
- Theme customization
- Notification preferences
- API key management

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Chaos Backend Service running

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chaos-cms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 Environment Variables

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database (if needed)
DATABASE_URL=your-database-url

# Monitoring
NEXT_PUBLIC_METRICS_URL=http://localhost:9090
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
```

## 📱 Responsive Design

The CMS is fully responsive and optimized for:
- **Desktop** (1200px+) - Full feature set
- **Tablet** (768px - 1199px) - Adapted layout
- **Mobile** (320px - 767px) - Touch-optimized

## 🎨 Theming

The application supports:
- **Light theme** (default)
- **Dark theme** (system preference)
- **Custom themes** (admin configurable)
- **High contrast** (accessibility)

## 🔒 Security Features

- **CSRF Protection** - Built-in CSRF tokens
- **XSS Prevention** - Content sanitization
- **Rate Limiting** - API request throttling
- **Secure Headers** - Security headers middleware
- **Input Validation** - Client and server-side validation

## 📊 Performance

- **Next.js Optimization** - Automatic code splitting
- **Image Optimization** - Next.js Image component
- **Bundle Analysis** - Webpack bundle analyzer
- **Lighthouse Score** - 90+ performance rating
- **Core Web Vitals** - Optimized for Google metrics

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```bash
docker build -t chaos-cms-frontend .
docker run -p 3000:3000 chaos-cms-frontend
```

### Static Export
```bash
npm run build
npm run export
```

## 📚 Additional Documentation

- [API Integration Guide](./api-integration.md)
- [Component Library](./component-library.md)
- [Authentication Setup](./authentication.md)
- [Deployment Guide](./deployment.md)
- [Contributing Guidelines](./contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**Built with ❤️ for Chaos World**
