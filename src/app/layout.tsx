import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from './providers/theme-provider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Instagram } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Renomeie Contratos',
  description: 'Utilize o site para gerar um padrão específico de nomes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ptbr">
      <body className={cn('bg-slate-100 dark:bg-slate-950', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <footer className="flex w-full items-center justify-center py-5 text-slate-300 text-xs">
            <Link
              className="flex items-center gap-1"
              href={'/https://www.instagram.com/kaesyo_/'}
            >
              <Instagram size={10} />
              kaesyo_
            </Link>
          </footer>
        </ThemeProvider>
        <Toaster position="top-left" />
      </body>
    </html>
  )
}
