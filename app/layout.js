import { Cormorant_Garamond, Karla } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-karla',
  display: 'swap',
})

export const metadata = {
  title: 'Tuli Artisan — Handcrafted by India\'s Finest',
  description: 'Connecting you directly to India\'s finest artisans. Every purchase sustains a centuries-old craft tradition.',
  keywords: 'artisan, handcrafted, Indian crafts, block printing, brass, handloom, ikat',
  openGraph: {
    title: 'Tuli Artisan',
    description: 'Where Craft Becomes Legacy',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  )
}