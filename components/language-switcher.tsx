"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/"

  // Detect if current locale is French by prefix
  const isFrench = pathname.startsWith("/fr")

  // Compute target path by toggling locale prefix
  let targetPath: string
  if (isFrench) {
    // Remove '/fr' prefix
    targetPath = pathname.replace(/^\/fr/, "") || "/"
  } else {
    // Add '/fr' prefix unless we are at root
    targetPath = pathname === "/" ? "/fr" : `/fr${pathname}`
  }

  const label = isFrench ? "EN" : "FR"

  return (
    <Link href={targetPath} className="uppercase text-sm text-emerald-400 hover:text-emerald-300 font-semibold">
      {label}
    </Link>
  )
}
