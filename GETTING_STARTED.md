# Getting Started with Chaos CMS Frontend

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local with your configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:8083
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript type definitions
```

## 🎯 Features Implemented

### ✅ **Authentication System**
- JWT-based authentication with NextAuth.js
- Role-based access control (Admin, Editor, Viewer)
- Secure session management
- Protected routes and middleware

### ✅ **Dashboard**
- Real-time system health monitoring
- Performance metrics and analytics
- Interactive charts and visualizations
- Quick actions and recent activity

### ✅ **Content Management**
- Content listing and search
- Content status management
- CRUD operations for content
- Content type filtering

### ✅ **Admin Panel**
- System administration features
- User management interface
- Security and analytics access
- System configuration

### ✅ **Modern UI/UX**
- Responsive design for all devices
- Dark/light theme support
- Accessible components
- Smooth animations and transitions

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
```

## 🔧 Configuration

### Backend API Integration
The frontend is configured to connect to the Chaos Backend Service:
- **CMS Service**: `http://localhost:8083`
- **API Gateway**: `http://localhost:8080`
- **Metrics**: `http://localhost:9090`

### Environment Variables
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

## 🚀 Next Steps

1. **Start the Backend Services**
   ```bash
   # In the chaos-backend-service directory
   python scripts/start_services.py
   ```

2. **Verify Backend Health**
   ```bash
   curl http://localhost:8083/health
   ```

3. **Test the Frontend**
   - Open http://localhost:3000
   - Login with admin/admin123
   - Explore the dashboard and features

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
npx kill-port 3000
```

**Module Not Found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
npm run type-check
```

**Build Errors**
```bash
rm -rf .next
npm run build
```

## 📚 Documentation

- [Full Documentation](./docs/README.md)
- [API Integration Guide](./docs/api-integration.md)
- [Component Library](./docs/component-library.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

**Happy coding! 🎉**
