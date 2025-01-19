import AbstractApp from '@/components/AbstractApp'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next JS Starter',
  description: 'Official Next JS Starter by The Maker Studio.',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AbstractApp>
          {children}
        </AbstractApp>
      </body>
    </html>
  );
}
