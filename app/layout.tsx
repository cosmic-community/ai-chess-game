import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Chess Game | Play Against Cosmic AI',
  description: 'Play chess against an AI-powered opponent using Cosmic AI for intelligent move generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </body>
    </html>
  )
}