'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Activity, 
  Server, 
  Database, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { config, getAllServices, type ServiceConfig } from '@/lib/config'

interface ServiceStatus {
  name: string
  status: 'healthy' | 'unhealthy' | 'unknown'
  url: string
  responseTime?: number
  lastChecked: string
  uptime?: string
  version?: string
}

interface MetricsData {
  totalRequests: number
  errorRate: number
  averageResponseTime: number
  activeConnections: number
  memoryUsage: number
  cpuUsage: number
}

export function MonitoringDashboard() {
  const [services, setServices] = useState<ServiceStatus[]>(() => {
    return getAllServices().map(service => ({
      name: service.name,
      status: 'unknown' as const,
      url: service.url,
      lastChecked: 'Never'
    }))
  })

  const [metrics, setMetrics] = useState<MetricsData>({
    totalRequests: 0,
    errorRate: 0,
    averageResponseTime: 0,
    activeConnections: 0,
    memoryUsage: 0,
    cpuUsage: 0
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkServiceHealth = async (service: ServiceStatus): Promise<ServiceStatus> => {
    const startTime = Date.now()
    
    // Determine health URL based on service type
    let healthUrl = `${service.url}/health`
    if (service.name === 'Prometheus') {
      healthUrl = `${service.url}/-/healthy`
    } else if (service.name === 'Grafana') {
      healthUrl = `${service.url}/api/health`
    }
    
    try {
      const response = await fetch(healthUrl, {
        method: 'GET',
        mode: 'no-cors', // Use no-cors to avoid CORS errors
        timeout: 5000
      } as any)
      const responseTime = Date.now() - startTime

      // With no-cors mode, we can't read the response body, but we can check if the request succeeded
      // If the request doesn't throw an error, we assume the service is reachable
      return {
        ...service,
        status: 'healthy', // Assume healthy if no error
        responseTime,
        lastChecked: new Date().toLocaleTimeString(),
        uptime: 'Unknown',
        version: 'Unknown'
      }
    } catch (error) {
      // If the request fails, mark as unknown
      console.debug(`Health check failed for ${service.name}:`, error.message)
      return {
        ...service,
        status: 'unknown',
        lastChecked: new Date().toLocaleTimeString()
      }
    }
  }

  const refreshAllServices = async () => {
    setIsRefreshing(true)
    const updatedServices = await Promise.all(
      services.map(service => checkServiceHealth(service))
    )
    setServices(updatedServices)
    setIsRefreshing(false)
  }

  const fetchMetrics = async () => {
    try {
      // Try to fetch metrics from Prometheus, but don't fail if it's not available
      const response = await fetch(`${config.monitoring.prometheus}/api/v1/query?query=up`, {
        method: 'GET',
        mode: 'no-cors', // Use no-cors to avoid CORS errors
        timeout: 5000
      } as any)
      if (response.ok) {
        // With no-cors mode, we can't read the response body
        console.log('Prometheus metrics endpoint is reachable')
      }
    } catch (error) {
      // Silently handle Prometheus connection errors - it might not be running
      console.debug('Prometheus not available:', error.message)
    }
  }

  useEffect(() => {
    refreshAllServices()
    fetchMetrics()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshAllServices()
      fetchMetrics()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'unhealthy':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'unknown':
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50'
      case 'unhealthy':
        return 'text-red-600 bg-red-50'
      case 'unknown':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-yellow-600 bg-yellow-50'
    }
  }

  const healthyServices = services.filter(s => s.status === 'healthy').length
  const totalServices = services.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Microservices Monitoring</h1>
          <p className="text-gray-600 mt-1">
            Real-time monitoring of Chaos World services
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={refreshAllServices}
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button
            onClick={() => window.open(config.monitoring.grafana, '_blank')}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open Grafana</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Services Health</p>
                <p className="text-2xl font-bold text-gray-900">
                  {healthyServices}/{totalServices}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalRequests.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.averageResponseTime}ms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.errorRate.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Services Status</span>
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Services are checked using no-CORS mode to avoid browser restrictions. Services that don't respond will show as "Unknown".
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(service.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.url}</p>
                    {service.responseTime && (
                      <p className="text-xs text-gray-400">
                        Response: {service.responseTime}ms
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}
                  >
                    {service.status}
                  </span>
                  <div className="text-right text-sm text-gray-500">
                    <p>Last checked: {service.lastChecked}</p>
                    {service.uptime && <p>Uptime: {service.uptime}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => window.open(config.monitoring.grafana, '_blank')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>Open Grafana</span>
            </Button>
            <Button
              onClick={() => window.open(config.monitoring.prometheus, '_blank')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span>Open Prometheus</span>
            </Button>
            <Button
              onClick={refreshAllServices}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh All</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
