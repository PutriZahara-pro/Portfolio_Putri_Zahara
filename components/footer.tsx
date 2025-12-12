import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-emerald-400 mb-4 block">
              Putri Zahara
            </Link>
            <p className="text-zinc-400 mb-6 max-w-md">
              Junior concept artist for games, films, and animation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/putri-zaharapro/" className="text-zinc-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:putrizahara972015@gmail.com" className="text-zinc-400 hover:text-white">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-zinc-400 hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portfolio/ps-apocalypse" className="text-zinc-400 hover:text-white">
                  P.S. Apocalypse
                </Link>
              </li>
              <li>
                <Link href="/portfolio/The_Ethians_Redeemed/" className="text-zinc-400 hover:text-white">
                  The Ethians Redeemed
                </Link>
              </li>
              <li>
                <Link href="/portfolio/other-works" className="text-zinc-400 hover:text-white">
                  Other Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
          <p>&copy; 2022-2025 Putri Zahara. All rights reserved.</p>
          <p className="mt-2">Dev by Dimitri Gonthier</p>
        </div>
      </div>
    </footer>
  )
}
