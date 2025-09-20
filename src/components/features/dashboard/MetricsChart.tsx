import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'

interface MetricsChartProps {
  metrics?: {
    requests_per_second: number
    response_time_avg_ms: number
    response_time_p95_ms: number
    error_rate: number
  }
  loading: boolean
}

export function MetricsChart({ metrics, loading }: MetricsChartProps) {
  // Mock data for the chart - in a real app, you'd use a charting library
  const chartData = [
    { name: '00:00', requests: 45, responseTime: 120 },
    { name: '04:00', requests: 32, responseTime: 95 },
    { name: '08:00', requests: 78, responseTime: 140 },
    { name: '12:00', requests: 156, responseTime: 180 },
    { name: '16:00', requests: 134, responseTime: 165 },
    { name: '20:00', requests: 89, responseTime: 125 },
  ]

  const maxRequests = Math.max(...chartData.map(d => d.requests))
  const maxResponseTime = Math.max(...chartData.map(d => d.responseTime))

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-gray-400">Loading metrics...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Metrics Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics?.requests_per_second || 0}
            </div>
            <div className="text-sm text-gray-500">Requests/sec</div>
            <div className="flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {metrics?.response_time_avg_ms || 0}ms
            </div>
            <div className="text-sm text-gray-500">Avg Response</div>
            <div className="flex items-center justify-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5%
            </div>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Requests Over Time</h4>
          <div className="flex items-end justify-between h-32 space-x-1">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-200 rounded-t"
                  style={{
                    height: `${(data.requests / maxRequests) * 100}%`,
                    minHeight: '4px',
                  }}
                />
                <div className="text-xs text-gray-500 mt-1">{data.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Chart */}
        <div className="space-y-4 mt-6">
          <h4 className="text-sm font-medium text-gray-700">Response Time</h4>
          <div className="flex items-end justify-between h-32 space-x-1">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-orange-200 rounded-t"
                  style={{
                    height: `${(data.responseTime / maxResponseTime) * 100}%`,
                    minHeight: '4px',
                  }}
                />
                <div className="text-xs text-gray-500 mt-1">{data.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span>Requests</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-200 rounded"></div>
            <span>Response Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
