import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
}

export function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <span className="text-2xl">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className={cn(
          'text-xs mt-1',
          changeType === 'positive' && 'text-green-600',
          changeType === 'negative' && 'text-red-600',
          changeType === 'neutral' && 'text-gray-600'
        )}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}
