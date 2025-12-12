"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import LinkedInEmbed from "@/components/linkedin-embed"

// Types pour les actualités
type ArticleActualite = {
  id: string;
  titre: string;
  date: string; // format 'YYYY-MM-DD'
  type: 'article' | 'linkedin';
  contenu?: React.ReactNode;
  urlPostLinkedIn?: string;
  images?: string[];
};

export default function PageActualites() {
  const [indicesImagesActives, setIndicesImagesActives] = useState<Record<string, number>>({});
  
  // Récupérer l'index d'image actif pour un article spécifique
  const getIndiceImageActive = (idArticle: string) => {
    return indicesImagesActives[idArticle] || 0;
  };

  // Naviguer vers l'image suivante pour un article spécifique
  const imageSuivante = (idArticle: string, nombreImages: number) => {
    setIndicesImagesActives(prev => ({
      ...prev,
      [idArticle]: (prev[idArticle] + 1) % nombreImages || 0
    }));
  };

  // Naviguer vers l'image précédente pour un article spécifique
  const imagePrecedente = (idArticle: string, nombreImages: number) => {
    setIndicesImagesActives(prev => ({
      ...prev,
      [idArticle]: (prev[idArticle] - 1 + nombreImages) % nombreImages || 0
    }));
  };

  // Données des actualités - triées de la plus récente à la plus ancienne
  const articles: ArticleActualite[] = [
    {
      id: 'post-linkedin-7332025138500014080',
      titre: 'Jury de Projets de Fin d\'Études',
      date: '2025-06-04',
      type: 'linkedin',
      urlPostLinkedIn: 'urn:li:activity:7332025138500014080'
    },
    {
      id: 'recyc-arnaval',
      titre: 'Bourse jeunes Lyon 2030',
      date: '2024-05-15',
      type: 'article',
      images: [
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530116.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530549.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530370.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274529986.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530145.jpg",
      ],
      contenu: (
        <div className="text-zinc-300 space-y-4">
          <p>
            <span className="font-medium text-emerald-300">Recyc'arnaval</span> est un petit carnet d'activités pour les enfants imaginé par{" "}
            <a href="https://www.linkedin.com/in/anna-belon/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Anna Belon</a>,{" "}
            <a href="https://www.linkedin.com/in/chlo%C3%A9-mondou-78a182213/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Chloé Mondou</a>,{" "}
            <a href="https://www.linkedin.com/in/putri-zaharapro/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Putri Zahara</a> et{" "}
            <a href="https://www.linkedin.com/in/emma-gueirouard/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Emma Gueirouard</a>.
          </p>
          
          <p>
            Il est né grâce à la Bourse jeunes Lyon 2030 que nous avons obtenue en janvier 2024 ! Le concept de notre projet était d'imaginer des tutoriels de costumes à partir de déchets recyclables (comme du carton, des bouchons de bouteilles…).
          </p>
          
          <p>
            Nous avons énormément appris, que ce soit dans la création des costumes mais également sur la conception du carnet. Nous remercions toutes les personnes qui nous ont suivi et aidé à mener ce projet jusqu'au bout.
          </p>
          
          <p>
            Les carnets sont fraîchement sortis de chez l'imprimeur et d'ores et déjà distribués auprès des centres de loisirs pour que les enfants puissent en profiter !
          </p>
          
          <p>
            Nous avons hâte de découvrir leurs premières créations !
          </p>
        </div>
      )
    },
  ];

  // Trier les articles par date, du plus récent au plus ancien
  const articlesTries = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Formater la date pour l'affichage
  const formaterDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-emerald-400 mb-12">
        Actualités
      </h1>

      <div className="max-w-4xl mx-auto space-y-16">
        {articlesTries.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-zinc-700 hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-400">
                  {article.titre}
                </h2>
                <div className="flex items-center text-zinc-400 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {formaterDate(article.date)}
                </div>
              </div>
              
              {article.type === 'article' && article.images && article.images.length > 0 && (
                <div className="mb-8">
                  <div className="relative aspect-video mb-8 rounded-xl overflow-hidden border-2 border-zinc-700 shadow-lg group">
                    <div className="relative h-full">
                      <Image
                        src={article.images[getIndiceImageActive(article.id)]}
                        alt={`${article.titre} image ${getIndiceImageActive(article.id) + 1}`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    
                    {article.images.length > 1 && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => imagePrecedente(article.id, article.images!.length)}
                          className="h-10 w-10 rounded-full bg-black/60 flex items-center justify-center text-white ml-4 hover:bg-emerald-500 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={() => imageSuivante(article.id, article.images!.length)}
                          className="h-10 w-10 rounded-full bg-black/60 flex items-center justify-center text-white mr-4 hover:bg-emerald-500 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}
                    
                    {article.images.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {article.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setIndicesImagesActives(prev => ({ ...prev, [article.id]: idx }))}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all", 
                              idx === getIndiceImageActive(article.id)
                                ? "bg-emerald-400 scale-110 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
                                : "bg-white/60 hover:bg-white"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {article.contenu}
                </div>
              )}
              
              {article.type === 'linkedin' && article.urlPostLinkedIn && (
                <div className="flex justify-center my-6">
                  <div className="w-full max-w-3xl">
                    <LinkedInEmbed postUrl={article.urlPostLinkedIn} width={800} height={850} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {articlesTries.length === 0 && (
          <div className="text-center mt-16">
            <div className="inline-block rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors p-4 border border-emerald-500/30">
              <p className="text-zinc-300">
                Aucune actualité disponible pour le moment.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {articlesTries.length > 0 && (
        <div className="text-center mt-16">
          <div className="inline-block rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors p-4 border border-emerald-500/30">
            <p className="text-zinc-300">
              Plus d'actualités à venir prochainement...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
