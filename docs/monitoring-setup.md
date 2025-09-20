# Microservices Monitoring Setup Guide

This guide explains how to set up comprehensive monitoring for your Chaos World microservices using Prometheus, Grafana, and the built-in monitoring dashboard.

## 🎯 **Overview**

Your monitoring setup includes:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Data visualization and dashboards
- **CMS Monitoring Dashboard**: Real-time service health monitoring
- **Service Health Checks**: Automated health monitoring

## 📊 **Monitoring Components**

### 1. **Prometheus** (Port 9091)
- **Purpose**: Collects and stores metrics from all services
- **URL**: http://localhost:9091
- **Configuration**: `chaos-backend-service/scripts/prometheus.yml`

### 2. **Grafana** (Port 3001)
- **Purpose**: Visualizes metrics and creates dashboards
- **URL**: http://localhost:3001
- **Default Login**: admin / Ab123456

### 3. **CMS Monitoring Dashboard** (Port 3000)
- **Purpose**: Real-time service health monitoring
- **URL**: http://localhost:3000/monitoring
- **Features**: Service status, response times, quick actions

## 🚀 **Quick Start**

### Start All Services
```bash
# Start backend services
cd chaos-backend-service
python scripts/start_services.py

# Start monitoring services
python scripts/setup_monitoring.py

# Start CMS frontend
cd chaos-cms-frontend
npm run dev
```

### Access Monitoring
1. **CMS Dashboard**: http://localhost:3000/monitoring
2. **Grafana**: http://localhost:3001 (admin/Ab123456)
3. **Prometheus**: http://localhost:9091

## 🔧 **Service Health Monitoring**

### Monitored Services
- **API Gateway** (Port 8080)
- **Chaos Backend** (Port 8081)
- **CMS Service** (Port 8083)
- **Prometheus** (Port 9091)
- **Grafana** (Port 3001)

### Health Check Endpoints
Each service exposes a `/health` endpoint:
- `GET /health` - Basic health status
- `GET /api/v1/health` - Detailed health information
- `GET /api/v1/metrics` - Prometheus metrics

## 📈 **Metrics Collection**

### Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'chaos-backend'
    static_configs:
      - targets: ['localhost:8081']
    metrics_path: '/metrics'
    scrape_interval: 5s

  - job_name: 'cms-service'
    static_configs:
      - targets: ['localhost:8083']
    metrics_path: '/api/v1/metrics'
    scrape_interval: 5s
```

### Key Metrics
- **HTTP Requests**: Total requests, response times, error rates
- **System Resources**: CPU, memory, disk usage
- **Service Health**: Uptime, availability, response times
- **Business Metrics**: User logins, content operations

## 🎨 **Grafana Dashboards**

### Pre-configured Dashboards
1. **Service Overview**: High-level service health
2. **Performance Metrics**: Response times, throughput
3. **Error Tracking**: Error rates, failed requests
4. **Resource Usage**: CPU, memory, disk utilization

### Creating Custom Dashboards
1. Open Grafana: http://localhost:3001
2. Go to "Dashboards" → "New Dashboard"
3. Add panels for specific metrics
4. Use Prometheus as data source

## 🔍 **Troubleshooting**

### Common Issues

#### Services Not Appearing in Monitoring
```bash
# Check if services are running
python scripts/check_services.py

# Check specific service health
curl http://localhost:8080/health
curl http://localhost:8081/health
curl http://localhost:8083/health
```

#### Prometheus Not Collecting Metrics
```bash
# Check Prometheus status
curl http://localhost:9091/api/v1/targets

# Check service metrics endpoints
curl http://localhost:8080/metrics
curl http://localhost:8081/metrics
curl http://localhost:8083/api/v1/metrics
```

#### Grafana Connection Issues
```bash
# Check Grafana status
curl http://localhost:3001/api/health

# Reset Grafana password
python scripts/reset_grafana_password.py
```

### Log Locations
- **Service Logs**: `C:\ChaosWorld\logs\`
- **Prometheus Logs**: `C:\ChaosWorld\monitoring\prometheus\`
- **Grafana Logs**: `C:\ChaosWorld\monitoring\grafana\`

## 📱 **Mobile Monitoring**

The monitoring dashboard is responsive and works on mobile devices:
- **Mobile URL**: http://localhost:3000/monitoring
- **Features**: Touch-friendly interface, real-time updates
- **Notifications**: Browser notifications for service alerts

## 🔐 **Security Considerations**

### Access Control
- **CMS Dashboard**: Requires authentication
- **Grafana**: Admin password protected
- **Prometheus**: No authentication (internal use)

### Network Security
- All services run on localhost
- No external access by default
- CORS configured for frontend access

## 📊 **Performance Optimization**

### Monitoring Performance
- **Refresh Interval**: 30 seconds (configurable)
- **Data Retention**: 15 days (Prometheus)
- **Dashboard Caching**: 5 minutes (Grafana)

### Resource Usage
- **Prometheus**: ~50MB RAM, ~100MB disk
- **Grafana**: ~100MB RAM, ~200MB disk
- **CMS Dashboard**: Minimal overhead

## 🚀 **Advanced Features**

### Alerting (Future)
- Email notifications for service failures
- Slack integration for team alerts
- Custom alert rules and thresholds

### Custom Metrics
- Business-specific metrics
- Custom dashboards
- Integration with external tools

## 📚 **Additional Resources**

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Next.js Monitoring](https://nextjs.org/docs/advanced-features/measuring-performance)

## 🆘 **Support**

If you encounter issues:
1. Check the troubleshooting section above
2. Review service logs in `C:\ChaosWorld\logs\`
3. Verify all services are running with `python scripts/check_services.py`
4. Check the monitoring dashboard for real-time status
