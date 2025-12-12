import { Metadata } from "next"
import { pagesSEO } from "@/data/seo-content"

export const metadata: Metadata = {
  title: pagesSEO.portfolio.title,
  description: pagesSEO.portfolio.description,
  keywords: pagesSEO.portfolio.keywords.join(", "),
  openGraph: {
    title: pagesSEO.portfolio.openGraph?.title,
    description: pagesSEO.portfolio.openGraph?.description,
    images: [pagesSEO.portfolio.openGraph?.image || ""],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: pagesSEO.portfolio.openGraph?.title,
    description: pagesSEO.portfolio.openGraph?.description,
    images: [pagesSEO.portfolio.openGraph?.image || ""],
  },
  alternates: {
    canonical: "https://putrizahara.com/fr/portfolio",
    languages: {
      'en': "https://putrizahara.com/en/portfolio",
      'fr': "https://putrizahara.com/fr/portfolio",
    },
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
