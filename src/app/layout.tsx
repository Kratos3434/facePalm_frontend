import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'facePalm',
  description: 'facePalm is an ordinary social app for very social people',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="tw-bg-[#F0F2F5]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
