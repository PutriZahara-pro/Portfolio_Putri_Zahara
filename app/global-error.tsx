'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-zinc-900 text-zinc-100">
          <h2 className="text-2xl font-bold mb-4">Une erreur critique est survenue</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  )
}
