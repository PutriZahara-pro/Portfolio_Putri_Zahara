import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Putri Zahara | Concept Artist",
  description: "Portfolio of Putri Zahara, a junior concept artist specializing in environmental and character design",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-zinc-100`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
