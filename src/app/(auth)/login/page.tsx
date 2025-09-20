import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to Chaos CMS
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your content management system
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
