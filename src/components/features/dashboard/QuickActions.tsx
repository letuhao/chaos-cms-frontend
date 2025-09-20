import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, FileText, Users, Settings, BarChart3 } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      title: 'Create Content',
      description: 'Add new content to your site',
      icon: Plus,
      href: '/content/new',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Manage Users',
      description: 'View and edit user accounts',
      icon: Users,
      href: '/users',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'View Analytics',
      description: 'Check your site performance',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Settings',
      description: 'Configure your CMS',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-500 hover:bg-gray-600',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="ghost"
            className="w-full justify-start h-auto p-4"
            onClick={() => {
              // In a real app, you'd use Next.js router here
              console.log(`Navigate to ${action.href}`)
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md ${action.color} text-white`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
