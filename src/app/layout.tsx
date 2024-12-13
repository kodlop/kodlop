import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Kodlop',
    default: 'Kodlop - Working developer studio based on internet',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>
          {children}
        </RootLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
