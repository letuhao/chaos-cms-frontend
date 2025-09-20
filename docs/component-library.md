# Component Library Documentation

## 🧩 Component Architecture

This document outlines the component library for the Chaos CMS Frontend, built with React, TypeScript, and Tailwind CSS.

## 📁 Component Structure

```
src/components/
├── ui/                          # Base UI components
│   ├── Button.tsx              # Button component
│   ├── Input.tsx               # Input component
│   ├── Modal.tsx               # Modal component
│   ├── Card.tsx                # Card component
│   ├── Badge.tsx               # Badge component
│   ├── Spinner.tsx             # Loading spinner
│   ├── Toast.tsx               # Toast notification
│   ├── Table.tsx               # Data table
│   ├── Pagination.tsx          # Pagination component
│   ├── Dropdown.tsx            # Dropdown menu
│   ├── Tabs.tsx                # Tab navigation
│   ├── Accordion.tsx           # Collapsible content
│   ├── Tooltip.tsx             # Tooltip component
│   ├── Progress.tsx             # Progress bar
│   ├── Alert.tsx                # Alert component
│   └── index.ts                # Export all components
├── forms/                       # Form components
│   ├── FormField.tsx           # Form field wrapper
│   ├── TextInput.tsx           # Text input
│   ├── PasswordInput.tsx       # Password input
│   ├── SelectInput.tsx         # Select dropdown
│   ├── CheckboxInput.tsx       # Checkbox input
│   ├── RadioInput.tsx          # Radio input
│   ├── TextAreaInput.tsx       # Textarea input
│   ├── FileInput.tsx           # File upload
│   ├── DateInput.tsx           # Date picker
│   ├── FormValidation.tsx      # Validation wrapper
│   └── index.ts                # Export all forms
├── layout/                      # Layout components
│   ├── Header.tsx              # App header
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── Footer.tsx              # App footer
│   ├── Breadcrumb.tsx          # Breadcrumb navigation
│   ├── Navigation.tsx          # Main navigation
│   ├── UserMenu.tsx            # User dropdown menu
│   ├── Layout.tsx              # Main layout wrapper
│   └── index.ts                # Export all layout
├── features/                    # Feature-specific components
│   ├── content/                # Content management
│   │   ├── ContentEditor.tsx   # Rich text editor
│   │   ├── ContentList.tsx     # Content listing
│   │   ├── ContentCard.tsx     # Content preview card
│   │   ├── MediaLibrary.tsx    # Media management
│   │   ├── ContentForm.tsx     # Content creation form
│   │   └── index.ts
│   ├── users/                  # User management
│   │   ├── UserList.tsx        # User listing
│   │   ├── UserCard.tsx        # User profile card
│   │   ├── UserForm.tsx        # User creation form
│   │   ├── RoleSelector.tsx    # Role selection
│   │   └── index.ts
│   ├── monitoring/             # System monitoring
│   │   ├── HealthStatus.tsx    # Health status display
│   │   ├── MetricsChart.tsx    # Metrics visualization
│   │   ├── SystemStats.tsx     # System statistics
│   │   ├── AlertPanel.tsx      # Alert management
│   │   └── index.ts
│   └── dashboard/              # Dashboard components
│       ├── StatsCard.tsx       # Statistics card
│       ├── ActivityFeed.tsx    # Activity timeline
│       ├── QuickActions.tsx    # Quick action buttons
│       ├── RecentContent.tsx   # Recent content list
│       └── index.ts
└── common/                     # Common components
    ├── Loading.tsx             # Loading states
    ├── ErrorBoundary.tsx       # Error handling
    ├── EmptyState.tsx          # Empty state display
    ├── ConfirmDialog.tsx       # Confirmation dialog
    ├── SearchInput.tsx         # Search functionality
    └── index.ts
```

## 🎨 Design System

### **Color Palette**

```typescript
// src/styles/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',    // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',    // Main secondary
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',    // Main success
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',    // Main warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',    // Main error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
}
```

### **Typography Scale**

```typescript
// src/styles/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
}
```

### **Spacing Scale**

```typescript
// src/styles/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
}
```

## 🧩 Base UI Components

### **Button Component**

```typescript
// src/components/ui/Button.tsx
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

### **Input Component**

```typescript
// src/components/ui/Input.tsx
import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

### **Modal Component**

```typescript
// src/components/ui/Modal.tsx
import React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-white rounded-lg shadow-lg',
          sizeClasses[size]
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="ml-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export { Modal }
```

### **Card Component**

```typescript
// src/components/ui/Card.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      outlined: 'bg-white border-2 border-gray-300',
      elevated: 'bg-white shadow-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## 📝 Form Components

### **FormField Component**

```typescript
// src/components/forms/FormField.tsx
import React from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label?: string
  error?: FieldError
  helperText?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export { FormField }
```

### **TextInput Component**

```typescript
// src/components/forms/TextInput.tsx
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { FormField } from './FormField'

interface TextInputProps {
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'url'
  className?: string
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  helperText,
  required,
  type = 'text',
  className,
}) => {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name] as FieldError | undefined

  return (
    <FormField
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      className={className}
    >
      <Input
        {...register(name, { required: required && 'This field is required' })}
        type={type}
        placeholder={placeholder}
        error={error?.message}
      />
    </FormField>
  )
}

export { TextInput }
```

## 🎯 Feature Components

### **ContentEditor Component**

```typescript
// src/components/features/content/ContentEditor.tsx
import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { cn } from '@/lib/utils'

interface ContentEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  height?: number
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className,
  height = 400,
}) => {
  const editorRef = useRef<any>(null)

  const handleEditorChange = (content: string) => {
    onChange(content)
  }

  return (
    <div className={cn('w-full', className)}>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: Inter, sans-serif; font-size: 14px }',
          placeholder,
        }}
      />
    </div>
  )
}

export { ContentEditor }
```

### **HealthStatus Component**

```typescript
// src/components/features/monitoring/HealthStatus.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { HealthStatus as HealthStatusType } from '@/types/monitoring'

interface HealthStatusProps {
  health: HealthStatusType
  className?: string
}

const HealthStatus: React.FC<HealthStatusProps> = ({ health, className }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'unhealthy':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(health.status)}
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Status</span>
          <Badge className={getStatusColor(health.status)}>
            {health.status}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Services</h4>
          {Object.entries(health.services).map(([service, status]) => (
            <div key={service} className="flex items-center justify-between">
              <span className="text-sm capitalize">{service}</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.status)}
                <Badge className={getStatusColor(status.status)}>
                  {status.status}
                </Badge>
                {status.response_time_ms && (
                  <span className="text-xs text-gray-500">
                    {status.response_time_ms}ms
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500">
          Last updated: {new Date(health.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}

export { HealthStatus }
```

## 🎨 Styling Utilities

### **Utility Functions**

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
```

## 🧪 Component Testing

### **Test Utilities**

```typescript
// src/test-utils.tsx
import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### **Component Test Example**

```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen } from '@/test-utils'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-11')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 📚 Component Documentation

### **Storybook Integration**

```typescript
// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/Button'

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
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}
```

---

**This component library provides a comprehensive foundation for building a modern, accessible, and maintainable CMS frontend!** 🎉
