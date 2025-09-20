# Chaos CMS Frontend

<div align="center">

![Chaos CMS Frontend](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

**Modern, responsive content management system built with Next.js 14, TypeScript, and Tailwind CSS**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Features](#-features) • [Contributing](#-contributing)

</div>

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# Clone the repository
git clone https://github.com/chaos-world/chaos-cms-frontend.git
cd chaos-cms-frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication
- Role-based access control (Admin, Editor, Viewer)
- Secure session management
- Protected routes and middleware

### 📊 **Dashboard & Monitoring**
- Real-time system health monitoring
- Performance metrics and analytics
- Interactive charts and visualizations
- Alert management system

### 📝 **Content Management**
- Rich text editor with WYSIWYG
- Media library with drag & drop
- Content scheduling and publishing
- Version control and history

### 👥 **User Management**
- User creation and editing
- Role assignment and permissions
- Activity logs and audit trails
- Bulk operations

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/light theme support
- Accessible components (WCAG 2.1 AA)
- Smooth animations and transitions

### ⚡ **Performance**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Bundle splitting and lazy loading

## 🛠️ Technology Stack

### **Core Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Modern React with concurrent features

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible components
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### **State Management**
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **React Hook Form** - Form handling

### **Authentication**
- **NextAuth.js** - Authentication framework
- **JWT** - Token-based authentication

## 📚 Documentation

- [**Quick Start Guide**](./docs/quick-start.md) - Get started in 5 minutes
- [**Technology Recommendation**](./docs/technology-recommendation.md) - Why we chose this stack
- [**API Integration**](./docs/api-integration.md) - Backend API integration
- [**Component Library**](./docs/component-library.md) - UI components documentation
- [**Authentication Setup**](./docs/authentication.md) - Auth system configuration
- [**Deployment Guide**](./docs/deployment.md) - Production deployment
- [**Contributing Guidelines**](./docs/contributing.md) - How to contribute

## 🏗️ Project Structure

```
chaos-cms-frontend/
├── docs/                          # Documentation
├── public/                        # Static assets
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication pages
│   │   ├── (dashboard)/         # Dashboard pages
│   │   ├── api/                 # API routes
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/                  # Base UI components
│   │   ├── forms/               # Form components
│   │   ├── layout/              # Layout components
│   │   └── features/            # Feature components
│   ├── lib/                     # Utilities and configurations
│   ├── hooks/                   # Custom React hooks
│   ├── stores/                  # State management
│   ├── types/                   # TypeScript types
│   └── constants/               # Application constants
├── tests/                       # Test files
├── .env.example                 # Environment variables example
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Available Scripts

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
npm run storybook    # Start Storybook
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# API Endpoints
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080

# Monitoring
NEXT_PUBLIC_METRICS_URL=http://localhost:9090
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests** - Jest + React Testing Library
- **E2E Tests** - Playwright
- **Visual Regression** - Storybook + Chromatic
- **Type Checking** - TypeScript
- **Linting** - ESLint + Prettier

```bash
# Run all tests
npm run test:all

# Run specific test suites
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:coverage # Coverage report
```

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Docker**
```bash
docker build -t chaos-cms-frontend .
docker run -p 3000:3000 chaos-cms-frontend
```

### **Static Export**
```bash
npm run build
npm run export
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/contributing.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Documentation** - Check the [docs](./docs/) folder
- **Issues** - [GitHub Issues](https://github.com/chaos-world/chaos-cms-frontend/issues)
- **Discussions** - [GitHub Discussions](https://github.com/chaos-world/chaos-cms-frontend/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform
- [Headless UI](https://headlessui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

<div align="center">

**Built with ❤️ for Chaos World**

[Website](https://chaos-world.com) • [Documentation](./docs/) • [Contributing](./docs/contributing.md) • [License](./LICENSE)

</div>