import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'

import './globals.css'

import PlayerProvider from '@/contexts/PlayerContext'
import Header from '@/components/Header'
import Player from '@/components/Player'

const inter = Inter({ subsets: ['latin'] })
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'Podcastr',
  description: 'Podcastr é um APP para ouvir diversos podcasts da Rocketseat',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PlayerProvider>
      <html lang="pt">
        <body
          className={`${inter.className} ${lexend.variable} flex bg-pod-gray-50 antialiased`}
        >
          <main className="flex-1">
            <Header />
            {children}
          </main>
          <Player />
        </body>
      </html>
    </PlayerProvider>
  )
}
