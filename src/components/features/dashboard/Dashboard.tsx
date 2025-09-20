'use client'

import { useQuery } from '@tanstack/react-query'
import { StatsCard } from './StatsCard'
import { HealthStatus } from './HealthStatus'
import { RecentActivity } from './RecentActivity'
import { QuickActions } from './QuickActions'
import { MetricsChart } from './MetricsChart'
import { cmsService } from '@/lib/cms-service'

export function Dashboard() {
  const { data: health, isLoading: healthLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => cmsService.getHealthStatus(),
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => cmsService.getMetricsInfo(),
    refetchInterval: 10000, // Refetch every 10 seconds
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Chaos CMS dashboard. Monitor your system and manage content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={metrics?.requests_total || 0}
          change="+12%"
          changeType="positive"
          icon="📊"
        />
        <StatsCard
          title="Response Time"
          value={`${metrics?.response_time_avg_ms || 0}ms`}
          change="-5%"
          changeType="positive"
          icon="⚡"
        />
        <StatsCard
          title="Error Rate"
          value={`${((metrics?.error_rate || 0) * 100).toFixed(1)}%`}
          change="+2%"
          changeType="negative"
          icon="⚠️"
        />
        <StatsCard
          title="Active Connections"
          value={metrics?.active_connections || 0}
          change="+8%"
          changeType="positive"
          icon="🔗"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Health Status */}
        <div className="lg:col-span-1">
          <HealthStatus health={health} loading={healthLoading} />
        </div>

        {/* Metrics Chart */}
        <div className="lg:col-span-1">
          <MetricsChart metrics={metrics} loading={metricsLoading} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
