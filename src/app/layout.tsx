import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chaos CMS - Content Management System',
  description: 'Modern content management system for Chaos World',
  keywords: ['cms', 'content management', 'chaos world', 'nextjs', 'react'],
  authors: [{ name: 'Chaos World Team' }],
  robots: 'noindex, nofollow', // CMS should not be indexed
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
