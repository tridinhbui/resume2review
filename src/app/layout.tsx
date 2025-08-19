import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Resume2Path - Professional Career Development Platform',
  description: 'Transform your career with AI-powered resume analysis, skill gap assessment, and personalized learning paths. Trusted by professionals worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-poppins scroll-indicator bg-navy-950 text-white`}>{children}</body>
    </html>
  )
}
