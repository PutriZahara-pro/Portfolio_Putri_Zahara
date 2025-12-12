"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur vers un service de reporting
    console.error("Erreur application:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-5 text-center">
      <div className="max-w-2xl w-full p-8 rounded-xl bg-zinc-800/50 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
        <h1 className="text-3xl font-bold mb-4 text-indigo-400">Oups ! Une erreur est survenue</h1>
        
        <p className="mb-6 text-zinc-300">
          Une erreur s'est produite pendant le chargement de cette page.
          Cela peut être dû à un problème temporaire ou à un bug dans l'application.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 mr-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500 transition transform hover:scale-105 focus:ring-2 focus:ring-indigo-400"
          >
            Réessayer
          </button>
          
          <Link 
            href="/"
            className="px-6 py-3 bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 transition transform hover:scale-105 focus:ring-2 focus:ring-zinc-400"
          >
            Retour à l'accueil
          </Link>
        </div>
        
        {error.digest && (
          <p className="mt-6 text-xs text-zinc-500">
            Erreur ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
