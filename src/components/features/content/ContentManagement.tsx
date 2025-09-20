'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock content data
  const contentItems = [
    {
      id: 1,
      title: 'Getting Started with Chaos CMS',
      type: 'Article',
      status: 'Published',
      author: 'admin',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: 2,
      title: 'Advanced Configuration Guide',
      type: 'Article',
      status: 'Draft',
      author: 'admin',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19',
    },
    {
      id: 3,
      title: 'Best Practices for Content Management',
      type: 'Article',
      status: 'Published',
      author: 'admin',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
    },
    {
      id: 4,
      title: 'API Documentation',
      type: 'Documentation',
      status: 'Review',
      author: 'admin',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-17',
    },
  ]

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'Review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your content, articles, and documentation
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Content
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Content Items ({filteredContent.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>by {item.author}</span>
                    <span>•</span>
                    <span>Updated {item.updatedAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No content found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
