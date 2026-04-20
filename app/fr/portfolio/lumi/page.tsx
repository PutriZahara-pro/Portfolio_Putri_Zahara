"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LumiPageFr() {
  return (
    <main className="bg-[#120a06] overflow-x-hidden">
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translate(0%, 0%); }
          50%  { transform: scale(1.12) translate(-1.5%, -1%); }
          100% { transform: scale(1.06) translate(1%, 1%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0);   opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(10px); opacity: 1;   }
        }
        .anim-ken    { animation: kenBurns 22s ease-in-out infinite alternate; }
        .anim-up-1   { animation: fadeUp 0.9s ease both; animation-delay: 0.1s; }
        .anim-up-2   { animation: fadeUp 0.9s ease both; animation-delay: 0.25s; }
        .anim-up-3   { animation: fadeUp 0.9s ease both; animation-delay: 0.45s; }
        .anim-up-4   { animation: fadeUp 0.9s ease both; animation-delay: 0.6s; }
        .anim-fade   { animation: fadeIn 1.2s ease both; animation-delay: 0.7s; }
        .anim-scroll   { animation: scrollBounce 2s ease-in-out infinite; animation-delay: 1.4s; }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
        .anim-marquee  { animation: marqueeRight 15s linear infinite; }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-16">

        <div className="absolute inset-0 overflow-hidden">
          <div className="anim-ken absolute inset-[-8%] w-[116%] h-[116%]">
            <Image
              src="/images/Portfolio/lumi/Desktop-2.webp"
              alt="Lumi brand design"
              fill
              className="object-cover"
              style={{ objectPosition: "center top" }}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-[#120a06]/70 to-[#120a06]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120a06]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pb-16">
          <div className="anim-up-1">
            <Link
              href="/fr/portfolio"
              className="inline-flex items-center gap-2 text-[#E8C9A0]/60 hover:text-[#E8C9A0] transition-colors text-sm mb-12"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au portfolio
            </Link>
          </div>

          <p className="anim-up-2 text-[#C4614A] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            Brand &amp; Product Design
          </p>

          <h1 className="anim-up-3 text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tight text-[#F5EDD8] mb-6">
            LUMI
          </h1>

          <p className="anim-up-4 text-[#E8C9A0]/70 text-lg max-w-xl leading-relaxed">
            Une marque de Taiyaki imaginaire — entièrement reconstruite. Recherche
            typographique, système de couleurs et maquette produit complète.
            D'un concept de 2023 à une identité affinée en 2026.
          </p>
        </div>

        {/* Indicateur de scroll */}
        <div className="anim-scroll absolute bottom-8 left-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[#E8C9A0]/50 text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1 L9 22" stroke="#E8C9A0" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round"/>
            <path d="M2 16 L9 23 L16 16" stroke="#E8C9A0" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </section>

      {/* ── METADATA STRIP ────────────────────────────────────── */}
      <section className="anim-fade border-t border-[#C4614A]/20 bg-[#1a0d07]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C4614A]/15">
            {[
              { label: "Client",     value: "Projet personnel"       },
              { label: "Année",      value: "2023 → 2026"            },
              { label: "Rôle",       value: "Brand Designer"         },
              { label: "Livrables",  value: "Identité · Maquette"    },
            ].map(({ label, value }) => (
              <div key={label} className="py-6 px-6 first:pl-0 last:pr-0">
                <p className="text-[#C4614A]/60 uppercase tracking-widest text-[10px] mb-1">{label}</p>
                <p className="text-[#F5EDD8] text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ───────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-[#C4614A] text-xs uppercase tracking-[0.2em] font-semibold mb-4">Le Projet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5EDD8] mb-6 leading-tight">
              Une marque née<br />d'un amour du Taiyaki
            </h2>
            <p className="text-[#E8C9A0]/60 leading-relaxed mb-4">
              Lumi a débuté comme une exploration personnelle en 2023 — une marque fictive de Taiyaki
              qui nécessitait une identité visuelle complète. Trois ans plus tard, le design a été
              entièrement reconstruit : typographie plus affûtée, palette de couleurs plus raffinée,
              et une maquette d'emballage prête pour un vrai rayon.
            </p>
            <p className="text-[#E8C9A0]/60 leading-relaxed">
              Le logotype utilise <span className="text-[#F5EDD8] font-medium">Grandstander</span> — une
              typographie arrondie et vivante qui équilibre la chaleur d'une marque alimentaire avec
              l'énergie d'une identité moderne. La palette s'inspire de la pâte cuite, de la pâte de
              haricots rouges et des surfaces en bois chaud.
            </p>
          </div>

          {/* Palette */}
          <div>
            <p className="text-[#C4614A]/60 uppercase tracking-widest text-[10px] mb-6">Palette de couleurs</p>
            <div className="space-y-3">
              {[
                { hex: "#C4614A", name: "Terracotta Taiyaki", role: "Primaire"   },
                { hex: "#8B3A2A", name: "Pâte de haricot",    role: "Accent sombre" },
                { hex: "#6B7C3A", name: "Olive Matcha",       role: "Secondaire" },
                { hex: "#D4A024", name: "Or Sésame",          role: "Highlight"  },
                { hex: "#F5EDD8", name: "Crème Pâte",         role: "Fond"       },
              ].map(({ hex, name, role }) => (
                <div key={hex} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 border border-white/10"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[#F5EDD8] text-sm font-medium">{name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#E8C9A0]/40 text-xs">{role}</span>
                      <span className="text-[#E8C9A0]/30 font-mono text-xs">{hex}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND BOARD ───────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#C4614A]/15">
            <Image
              src="/images/Portfolio/lumi/Desktop-2.webp"
              alt="Lumi — Identité de marque & emballage"
              width={2880}
              height={7566}
              className="w-full h-auto"
            />
            {/* titre.png flottant centré sur la photo taiyaki — 0%→26% */}
            <div
              className="absolute inset-x-0 flex items-center justify-center pointer-events-none"
              style={{ top: '1%', bottom: '74%' }}
            >
              <div style={{ width: '48%' }}>
                <Image
                  src="/images/Portfolio/lumi/titre.webp"
                  width={546}
                  height={435}
                  className="w-full h-auto"
                  alt="Lumi — Traditional Japanese fish-shaped cake"
                />
              </div>
            </div>

            {/* Bandeau défilant dans la case blanche — 58.2% à 70.4% */}
            <div
              className="absolute inset-x-0 overflow-hidden"
              style={{ top: '58.2%', bottom: '29.6%' }}
            >
              <div
                className="anim-marquee flex h-full"
                style={{ width: '200%' }}
              >
                {[
                  { bg: "/images/Portfolio/lumi/Rectangle 18.png", logo: "/images/Portfolio/lumi/lumi!.png",   alt: "Lumi terracotta" },
                  { bg: "/images/Portfolio/lumi/Rectangle 19.png", logo: "/images/Portfolio/lumi/lumi!-1.png", alt: "Lumi olive"      },
                  { bg: "/images/Portfolio/lumi/Rectangle 20.png", logo: "/images/Portfolio/lumi/lumi!-2.png", alt: "Lumi jaune"      },
                  { bg: "/images/Portfolio/lumi/Rectangle 18.png", logo: "/images/Portfolio/lumi/lumi!.png",   alt: "Lumi terracotta dup" },
                  { bg: "/images/Portfolio/lumi/Rectangle 19.png", logo: "/images/Portfolio/lumi/lumi!-1.png", alt: "Lumi olive dup"      },
                  { bg: "/images/Portfolio/lumi/Rectangle 20.png", logo: "/images/Portfolio/lumi/lumi!-2.png", alt: "Lumi jaune dup"       },
                ].map(({ bg, logo, alt }, i) => (
                  <div
                    key={i}
                    className="relative flex-none h-full flex items-center justify-center"
                    style={{ width: '16.6667%', padding: '3%' }}
                  >
                    <Image src={bg} fill className="object-cover" alt="" />
                    <div className="relative z-10 w-5/6">
                      <Image src={logo} width={400} height={200} className="w-full h-auto" alt={alt} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-[#E8C9A0]/30 text-xs mt-4 tracking-widest uppercase">
            Brand board — Typographie · Couleurs · Maquette d'emballage
          </p>
        </div>
      </section>

      {/* ── OUTILS ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#C4614A]/15">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#C4614A]/60 uppercase tracking-widest text-xs">Outils utilisés</p>
          <div className="flex gap-3 flex-wrap justify-center">
            {["Figma", "Photoshop", "Illustrator"].map((tool) => (
              <span
                key={tool}
                className="px-5 py-2 rounded-full border border-[#C4614A]/30 text-[#E8C9A0]/70 text-sm hover:border-[#C4614A] hover:text-[#F5EDD8] transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETOUR ────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-20">
        <Link
          href="/fr/portfolio"
          className="inline-flex items-center gap-2 text-[#C4614A]/60 hover:text-[#C4614A] transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au portfolio
        </Link>
      </div>

    </main>
  );
}
