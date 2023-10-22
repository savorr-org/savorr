"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import LocationHeader from '@/components/locationHeader'
import { usePathname } from 'next/navigation'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
        {
          pathname === '/shopping-list' ? <LocationHeader/> : <></>
        }
        <Navbar />
           <main className='py-10'>{children}</main>
        <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
