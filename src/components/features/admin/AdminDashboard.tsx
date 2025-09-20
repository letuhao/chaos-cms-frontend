'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Shield, Users, Settings, BarChart3, AlertTriangle } from 'lucide-react'
import { cmsService } from '@/lib/cms-service'

export function AdminDashboard() {
  const { data: adminInfo, isLoading: adminLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: () => cmsService.getAdminInfo(),
  })

  const adminFeatures = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-green-500',
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed analytics and generate reports',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-purple-500',
    },
    {
      title: 'Security Center',
      description: 'Monitor security events and manage access',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your CMS system and user accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            View Alerts
          </Button>
        </div>
      </div>

      {/* Admin Info Card */}
      {adminInfo && (
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">Status</h4>
                <p className="text-sm text-gray-600">{adminInfo.status}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Features</h4>
                <p className="text-sm text-gray-600">{adminInfo.features?.length || 0} available</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Message</h4>
                <p className="text-sm text-gray-600">{adminInfo.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminFeatures.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${feature.color} text-white`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // In a real app, you'd use Next.js router here
                  console.log(`Navigate to ${feature.href}`)
                }}
              >
                Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <p className="text-xs text-blue-600 mt-1">+5% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23%</div>
            <p className="text-xs text-green-600 mt-1">-2% from last hour</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
