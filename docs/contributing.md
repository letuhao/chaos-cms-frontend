# Contributing Guidelines

## 🤝 How to Contribute

Thank you for your interest in contributing to the Chaos CMS Frontend! This document provides guidelines and best practices for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Documentation](#documentation)

## 📜 Code of Conduct

### **Our Pledge**

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, sexual orientation

### **Expected Behavior**

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### **Unacceptable Behavior**

- Harassment, trolling, or inappropriate comments
- Personal attacks or political discussions
- Public or private harassment
- Publishing others' private information without permission
- Any conduct inappropriate in a professional setting

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### **Fork and Clone**

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/chaos-cms-frontend.git
   cd chaos-cms-frontend
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/chaos-world/chaos-cms-frontend.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔄 Development Workflow

### **Branch Naming Convention**

Use descriptive branch names that indicate the type of change:

```bash
# Feature branches
feature/user-authentication
feature/content-editor
feature/dashboard-widgets

# Bug fix branches
fix/login-validation-error
fix/mobile-responsive-issue
fix/performance-optimization

# Hotfix branches
hotfix/security-vulnerability
hotfix/critical-bug

# Documentation branches
docs/api-documentation
docs/component-library
docs/deployment-guide
```

### **Commit Message Format**

Follow the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### **Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

#### **Examples**
```bash
feat(auth): add two-factor authentication
fix(ui): resolve button hover state issue
docs(api): update authentication endpoints
test(components): add unit tests for Button component
refactor(utils): optimize date formatting functions
```

### **Development Process**

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run type-check
   npm run lint
   npm run test
   npm run test:e2e
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to GitHub and create a PR
   - Fill out the PR template
   - Request review from maintainers

## 📝 Coding Standards

### **TypeScript Guidelines**

#### **Type Definitions**
```typescript
// Use interfaces for object shapes
interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

// Use type aliases for unions and primitives
type Status = 'loading' | 'success' | 'error'
type EventHandler = (event: Event) => void

// Use enums for constants
enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}
```

#### **Component Props**
```typescript
// Use interface for component props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

// Use React.FC with generic type
const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  disabled = false,
  children,
  onClick,
}) => {
  // Component implementation
}
```

#### **Hooks**
```typescript
// Custom hooks should start with 'use'
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
```

### **React Best Practices**

#### **Component Structure**
```typescript
// 1. Imports
import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  onAction: () => void
}

// 3. Component
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 4. Hooks
  const router = useRouter()
  
  // 5. Event handlers
  const handleClick = () => {
    onAction()
  }
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Action</Button>
    </div>
  )
}

// 7. Export
export { Component }
```

#### **State Management**
```typescript
// Use useState for local state
const [isLoading, setIsLoading] = useState(false)

// Use useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState)

// Use custom hooks for shared logic
const { data, loading, error } = useApiData('/api/users')
```

### **Styling Guidelines**

#### **Tailwind CSS**
```typescript
// Use Tailwind classes for styling
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button variant="primary" size="sm">Action</Button>
</div>

// Use clsx for conditional classes
import { clsx } from 'clsx'

<button
  className={clsx(
    'px-4 py-2 rounded-md font-medium transition-colors',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
      'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
      'opacity-50 cursor-not-allowed': disabled,
    }
  )}
>
  Button
</button>
```

#### **CSS Modules (if needed)**
```css
/* Component.module.css */
.container {
  @apply flex items-center justify-between p-4 bg-white rounded-lg shadow-md;
}

.title {
  @apply text-xl font-semibold text-gray-900;
}

.button {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

.buttonPrimary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.buttonSecondary {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}
```

### **File Organization**

#### **Component Files**
```
src/components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── forms/                 # Form components
│   ├── LoginForm.tsx
│   ├── LoginForm.test.tsx
│   └── index.ts
└── features/              # Feature components
    ├── auth/
    │   ├── LoginForm.tsx
    │   ├── RegisterForm.tsx
    │   ├── LoginForm.test.tsx
    │   └── index.ts
    └── content/
        ├── ContentEditor.tsx
        ├── ContentList.tsx
        └── index.ts
```

#### **File Naming**
- Use PascalCase for component files: `Button.tsx`
- Use camelCase for utility files: `formatDate.ts`
- Use kebab-case for page files: `user-profile.tsx`
- Use descriptive names: `UserProfileCard.tsx` not `Card.tsx`

## 🧪 Testing Guidelines

### **Unit Testing**

#### **Component Testing**
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@/test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### **Hook Testing**
```typescript
// useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('returns stored value when available', () => {
    localStorage.setItem('test', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('stored')
  })

  it('updates stored value when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'))
  })
})
```

### **Integration Testing**

#### **API Integration**
```typescript
// api.test.ts
import { apiClient } from '@/lib/api-client'
import { server } from '@/test-utils/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('API Client', () => {
  it('fetches user data successfully', async () => {
    const mockUser = { id: '1', username: 'testuser' }
    
    server.use(
      rest.get('/api/users/1', (req, res, ctx) => {
        return res(ctx.json(mockUser))
      })
    )
    
    const user = await apiClient.get('/api/users/1')
    expect(user).toEqual(mockUser)
  })
})
```

### **E2E Testing**

#### **Playwright Tests**
```typescript
// auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid="username-input"]', 'testuser')
    await page.fill('[data-testid="password-input"]', 'password')
    await page.click('[data-testid="login-button"]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
  })

  test('user sees error for invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('[data-testid="username-input"]', 'invalid')
    await page.fill('[data-testid="password-input"]', 'invalid')
    await page.click('[data-testid="login-button"]')
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials')
  })
})
```

### **Testing Best Practices**

1. **Write tests first (TDD)**
2. **Test behavior, not implementation**
3. **Use descriptive test names**
4. **Keep tests simple and focused**
5. **Mock external dependencies**
6. **Test edge cases and error conditions**
7. **Maintain test coverage above 80%**

## 📋 Pull Request Process

### **Before Submitting**

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all tests**
   ```bash
   npm run type-check
   npm run lint
   npm run test
   npm run test:e2e
   ```

3. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update component stories

### **PR Template**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Related Issues
Closes #123
```

### **Review Process**

1. **Automated checks must pass**
2. **At least one maintainer review required**
3. **Address all review comments**
4. **Update PR if requested**
5. **Squash commits before merging**

## 🐛 Issue Reporting

### **Bug Reports**

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]

## Additional Context
Any other context about the problem
```

### **Feature Requests**

Use the feature request template:

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Alternatives
Any alternative solutions considered?

## Additional Context
Any other context about the feature request
```

## 📚 Documentation

### **Code Documentation**

#### **JSDoc Comments**
```typescript
/**
 * A reusable button component with multiple variants
 * @param variant - The visual style variant
 * @param size - The size of the button
 * @param disabled - Whether the button is disabled
 * @param children - The button content
 * @param onClick - Click handler function
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}
```

#### **README Updates**
- Keep README up to date
- Add new features to feature list
- Update installation instructions
- Add new environment variables

### **Component Documentation**

#### **Storybook Stories**
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}
```

## 🎯 Performance Guidelines

### **Code Splitting**
```typescript
// Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false,
})
```

### **Memoization**
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component implementation
})

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  onAction(id)
}, [id, onAction])
```

### **Bundle Optimization**
```typescript
// Use tree shaking friendly imports
import { Button } from '@/components/ui/Button'
// Instead of
import { Button } from '@/components/ui'

// Use dynamic imports for routes
const AdminPage = dynamic(() => import('./AdminPage'))
```

## 🔒 Security Guidelines

### **Input Validation**
```typescript
// Always validate user input
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

### **XSS Prevention**
```typescript
// Use dangerouslySetInnerHTML only when necessary
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

// Prefer JSX for user content
<div>{userContent}</div>
```

### **CSRF Protection**
```typescript
// Include CSRF tokens in forms
<form>
  <input type="hidden" name="csrfToken" value={csrfToken} />
  {/* Form fields */}
</form>
```

## 📞 Getting Help

### **Community Channels**
- GitHub Discussions
- Discord Server
- Stack Overflow (tag: chaos-cms)

### **Maintainers**
- @maintainer1 - Lead Developer
- @maintainer2 - UI/UX Lead
- @maintainer3 - DevOps Lead

### **Resources**
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Thank you for contributing to the Chaos CMS Frontend! Together, we can build an amazing content management system!** 🎉
