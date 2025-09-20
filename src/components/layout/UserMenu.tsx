'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { User, Settings, LogOut, Shield } from 'lucide-react'

interface UserMenuProps {
  user: {
    id: string
    username: string
    role: string
  }
  onSignOut: () => void
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleProfile = () => {
    router.push('/profile')
    setIsOpen(false)
  }

  const handleSettings = () => {
    router.push('/settings')
    setIsOpen(false)
  }

  const handleAdmin = () => {
    router.push('/admin')
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block">{user.username}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
            
            <button
              onClick={handleProfile}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </button>
            
            <button
              onClick={handleSettings}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </button>
            
            {user.role === 'admin' && (
              <button
                onClick={handleAdmin}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Shield className="mr-3 h-4 w-4" />
                Admin Panel
              </button>
            )}
            
            <div className="border-t border-gray-100">
              <button
                onClick={onSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
