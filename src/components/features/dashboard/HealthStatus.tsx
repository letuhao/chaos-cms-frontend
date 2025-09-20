import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'

interface HealthStatusProps {
  health?: {
    status: string
    timestamp: string
    version: string
    services: {
      database: { status: string; response_time_ms?: number }
      cache: { status: string; response_time_ms?: number }
      storage: { status: string; response_time_ms?: number }
    }
  }
  loading: boolean
}

export function HealthStatus({ health, loading }: HealthStatusProps) {
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(health?.status || 'unknown')}
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Status</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(health?.status || 'unknown')}`}>
            {health?.status || 'Unknown'}
          </span>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Services</h4>
          {health?.services && Object.entries(health.services).map(([service, status]) => (
            <div key={service} className="flex items-center justify-between">
              <span className="text-sm capitalize">{service}</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status)}`}>
                  {status.status}
                </span>
                {status.response_time_ms && (
                  <span className="text-xs text-gray-500">
                    {status.response_time_ms}ms
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {health?.timestamp && (
          <div className="text-xs text-gray-500 pt-2 border-t">
            Last updated: {new Date(health.timestamp).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
