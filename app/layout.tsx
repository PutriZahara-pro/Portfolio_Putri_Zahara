import React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import EnhancedNavbar from "@/components/enhanced-navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/hooks/use-language"
import EasterEgg from "@/components/easter-egg"
import ContentProtection from "@/components/content-protection"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script 
          data-goatcounter="https://22082000.goatcounter.com/count"
          async 
          src="//gc.zgo.at/count.js"
        />
      </head>
      <body 
        className={`${inter.className} bg-zinc-900 text-zinc-100`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <EnhancedNavbar />
          {children}
          <Footer />
          <EasterEgg />
          <ContentProtection 
            messages={{
              rightClick: "Le clic droit est désactivé pour protéger les œuvres de l'artiste.",
              copy: "La copie n'est pas autorisée sur ce portfolio artistique.",
              cut: "Le contenu de ce portfolio est protégé par l'artiste.",
              selectAll: "La sélection complète est désactivée sur ce portfolio.",
              saveImage: "Les œuvres de Putri Zahara sont protégées."
            }}
          />
          {/* Script de protection anti-hotlinking */}
          <Script 
            src="/js/hotlink-protection.js"
            strategy="afterInteractive"
          />
        </LanguageProvider>
      </body>
    </html>
  )
}
