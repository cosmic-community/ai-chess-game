import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Chess Game | Play Against Cosmic AI',
  description: 'Play chess against an AI-powered opponent using Cosmic AI for intelligent move generation. Test your chess skills in this interactive web-based chess game.',
  openGraph: {
    title: 'AI Chess Game | Play Against Cosmic AI',
    description: 'Play chess against an AI-powered opponent using Cosmic AI for intelligent move generation',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/84e179f0-a0a6-11f0-8c2f-71055d67fae4-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Chess Game',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chess Game | Play Against Cosmic AI',
    description: 'Play chess against an AI-powered opponent using Cosmic AI for intelligent move generation',
    images: ['https://imgix.cosmicjs.com/84e179f0-a0a6-11f0-8c2f-71055d67fae4-image.png'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>♟️</text></svg>',
  },
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