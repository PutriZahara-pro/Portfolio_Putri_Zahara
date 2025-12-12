import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-zinc-100">Page non trouvée</h2>
      <p className="mb-4 text-zinc-300">La page que vous recherchez n&apos;existe pas.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
