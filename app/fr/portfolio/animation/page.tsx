"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";

export default function AnimationPageFr() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main className="pt-16 bg-zinc-900 overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Link
            href="/fr/portfolio"
            className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>

          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Animation</h1>
            <p className="text-base text-zinc-300 mb-8 leading-relaxed">
              Une courte animation dessinée à la main — illustrée image par image dans
              Procreate sur iPad, puis compositée et animée dans After Effects.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Client</p>
                <p className="text-zinc-200">Projet personnel</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Année</p>
                <p className="text-zinc-200">2023</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Rôle</p>
                <p className="text-zinc-200">2D Animation</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Format</p>
                <p className="text-zinc-200">Animation verticale</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3">Outils</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Procreate</span>
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">After Effects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ──────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="w-[300px] md:w-[360px] rounded-[36px] overflow-hidden border-2 border-zinc-700 shadow-2xl bg-zinc-950 ring-1 ring-white/5">
            <video
              ref={videoRef}
              src="/images/Portfolio/Animation/Composition_1.mp4"
              controls
              playsInline
              preload="auto"
              className="w-full h-auto block"
              onLoadedData={() => {
                const v = videoRef.current;
                if (v) v.currentTime = 0.001;
              }}
            />
          </div>
        </div>
      </section>

      {/* ── RETOUR ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-20">
        <Link
          href="/fr/portfolio"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>
      </div>

    </main>
  );
}
