#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates all environment variables and configuration
 */

const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

// Configuration validation
function validateEnvironment() {
  const errors = []
  const warnings = []

  console.log('🔍 Validating Chaos CMS Frontend Environment Configuration...\n')

  // Required environment variables
  const required = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'NEXT_PUBLIC_API_URL',
  ]

  // Optional but recommended
  const recommended = [
    'NEXT_PUBLIC_API_GATEWAY_URL',
    'NEXT_PUBLIC_CHAOS_BACKEND_URL',
    'NEXT_PUBLIC_PROMETHEUS_URL',
    'NEXT_PUBLIC_GRAFANA_URL',
  ]

  // Check required variables
  console.log('📋 Checking required environment variables:')
  required.forEach(key => {
    const value = process.env[key]
    if (!value) {
      errors.push(`❌ ${key} is required but not set`)
    } else {
      console.log(`✅ ${key}: ${value}`)
    }
  })

  // Check recommended variables
  console.log('\n📋 Checking recommended environment variables:')
  recommended.forEach(key => {
    const value = process.env[key]
    if (!value) {
      warnings.push(`⚠️  ${key} is recommended but not set (using default)`)
    } else {
      console.log(`✅ ${key}: ${value}`)
    }
  })

  // Validate URL format
  console.log('\n🌐 Validating URL formats:')
  const urlPattern = /^https?:\/\/.+/i
  const urlVars = [
    'NEXTAUTH_URL',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_API_GATEWAY_URL',
    'NEXT_PUBLIC_CHAOS_BACKEND_URL',
    'NEXT_PUBLIC_PROMETHEUS_URL',
    'NEXT_PUBLIC_GRAFANA_URL',
  ]

  urlVars.forEach(key => {
    const value = process.env[key]
    if (value && !urlPattern.test(value)) {
      errors.push(`❌ ${key} must be a valid URL: ${value}`)
    } else if (value) {
      console.log(`✅ ${key}: Valid URL format`)
    }
  })

  // Check if .env.local exists
  const envLocalPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envLocalPath)) {
    warnings.push('⚠️  .env.local file not found. Copy from env.local.example')
  } else {
    console.log('\n📁 .env.local file found')
  }

  // Display results
  console.log('\n' + '='.repeat(50))
  console.log('📊 VALIDATION RESULTS')
  console.log('='.repeat(50))

  if (errors.length === 0) {
    console.log('✅ All required environment variables are properly configured!')
  } else {
    console.log('❌ Configuration errors found:')
    errors.forEach(error => console.log(`   ${error}`))
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:')
    warnings.forEach(warning => console.log(`   ${warning}`))
  }

  // Service connectivity test
  console.log('\n🔗 Testing service connectivity...')
  testServiceConnectivity()

  return errors.length === 0
}

// Test service connectivity
async function testServiceConnectivity() {
  const services = [
    { name: 'CMS Service', url: process.env.NEXT_PUBLIC_API_URL },
    { name: 'API Gateway', url: process.env.NEXT_PUBLIC_API_GATEWAY_URL },
    { name: 'Chaos Backend', url: process.env.NEXT_PUBLIC_CHAOS_BACKEND_URL },
    { name: 'Prometheus', url: process.env.NEXT_PUBLIC_PROMETHEUS_URL },
    { name: 'Grafana', url: process.env.NEXT_PUBLIC_GRAFANA_URL },
  ]

  for (const service of services) {
    if (service.url) {
      try {
        const response = await fetch(`${service.url}/health`, { 
          method: 'GET',
          timeout: 5000 
        })
        if (response.ok) {
          console.log(`✅ ${service.name}: Accessible`)
        } else {
          console.log(`⚠️  ${service.name}: Responding but not healthy (${response.status})`)
        }
      } catch (error) {
        console.log(`❌ ${service.name}: Not accessible (${error.message})`)
      }
    }
  }
}

// Configuration summary
function showConfigurationSummary() {
  console.log('\n📋 CONFIGURATION SUMMARY')
  console.log('='.repeat(50))
  console.log(`Frontend URL: ${process.env.NEXTAUTH_URL || 'Not set'}`)
  console.log(`CMS API: ${process.env.NEXT_PUBLIC_API_URL || 'Not set'}`)
  console.log(`API Gateway: ${process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'Not set'}`)
  console.log(`Chaos Backend: ${process.env.NEXT_PUBLIC_CHAOS_BACKEND_URL || 'Not set'}`)
  console.log(`Prometheus: ${process.env.NEXT_PUBLIC_PROMETHEUS_URL || 'Not set'}`)
  console.log(`Grafana: ${process.env.NEXT_PUBLIC_GRAFANA_URL || 'Not set'}`)
  console.log('='.repeat(50))
}

// Main execution
async function main() {
  try {
    const isValid = validateEnvironment()
    showConfigurationSummary()
    
    if (isValid) {
      console.log('\n🎉 Environment validation completed successfully!')
      process.exit(0)
    } else {
      console.log('\n💥 Environment validation failed. Please fix the errors above.')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Validation script error:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { validateEnvironment, testServiceConnectivity }
