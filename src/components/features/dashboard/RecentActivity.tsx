import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Clock, User, FileText, Edit } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'content',
      action: 'Created new article',
      title: 'Getting Started with Chaos CMS',
      user: 'admin',
      time: '2 minutes ago',
      icon: FileText,
    },
    {
      id: 2,
      type: 'user',
      action: 'User logged in',
      title: 'john.doe@example.com',
      user: 'system',
      time: '5 minutes ago',
      icon: User,
    },
    {
      id: 3,
      type: 'content',
      action: 'Updated article',
      title: 'Advanced Configuration Guide',
      user: 'admin',
      time: '1 hour ago',
      icon: Edit,
    },
    {
      id: 4,
      type: 'user',
      action: 'User logged out',
      title: 'jane.smith@example.com',
      user: 'system',
      time: '2 hours ago',
      icon: User,
    },
    {
      id: 5,
      type: 'content',
      action: 'Published article',
      title: 'Best Practices for Content Management',
      user: 'admin',
      time: '3 hours ago',
      icon: FileText,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">
                  by {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
