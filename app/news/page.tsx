"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import LinkedInEmbed from "@/components/linkedin-embed"

// Types pour les actualités
type NewsArticle = {
  id: string;
  title: string;
  date: string; // format 'YYYY-MM-DD'
  type: 'post' | 'linkedin';
  content?: React.ReactNode;
  linkedinPostUrl?: string;
  images?: string[];
};

export default function NewsPage() {
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
  
  // Récupérer l'index d'image actif pour un article spécifique
  const getActiveImageIndex = (articleId: string) => {
    return activeImageIndices[articleId] || 0;
  };

  // Naviguer vers l'image suivante pour un article spécifique
  const nextImage = (articleId: string, imagesLength: number) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [articleId]: (prev[articleId] + 1) % imagesLength || 0
    }));
  };

  // Naviguer vers l'image précédente pour un article spécifique
  const prevImage = (articleId: string, imagesLength: number) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [articleId]: (prev[articleId] - 1 + imagesLength) % imagesLength || 0
    }));
  };

  // Données des actualités - triées de la plus récente à la plus ancienne
  const newsArticles: NewsArticle[] = [
    {
      id: 'linkedin-post-7332025138500014080',
      title: 'Jury for Final Year Projects',
      date: '2025-06-04',
      type: 'linkedin',
      linkedinPostUrl: 'urn:li:activity:7332025138500014080'
    },
    {
      id: 'recyc-arnaval',
      title: 'Lyon 2030 Youth Grant',
      date: '2024-05-15',
      type: 'post',
      images: [
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530116.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530549.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530370.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274529986.jpg",
        "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/news/Recyc/1744274530145.jpg",
      ],
      content: (
        <div className="text-zinc-300 space-y-4">
          <p>
            <span className="font-medium text-emerald-300">Recyc'arnaval</span> is a small activity booklet for children created by{" "}
            <a href="https://www.linkedin.com/in/anna-belon/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Anna Belon</a>,{" "}
            <a href="https://www.linkedin.com/in/chlo%C3%A9-mondou-78a182213/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Chloé Mondou</a>,{" "}
            <a href="https://www.linkedin.com/in/putri-zaharapro/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Putri Zahara</a>, and{" "}
            <a href="https://www.linkedin.com/in/emma-gueirouard/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline">Emma Gueirouard</a>.
          </p>
          
          <p>
            It was born thanks to the Lyon 2030 Youth Grant that we received in January 2024! The concept of our project was to design costume tutorials using recyclable materials (such as cardboard, bottle caps, etc.).
          </p>
          
          <p>
            We learned a tremendous amount, both in creating the costumes and in designing the booklet. We thank everyone who supported us and helped us see this project through to completion.
          </p>
          
          <p>
            The booklets have just been printed and are already being distributed to recreation centers for children to enjoy!
          </p>
          
          <p>
            We can't wait to discover their first creations!
          </p>
        </div>
      )
    },
  ];

  // Triez les articles par date, du plus récent au plus ancien
  const sortedArticles = [...newsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Formatter la date pour l'affichage
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-emerald-400 mb-12">
        News
      </h1>

      <div className="max-w-4xl mx-auto space-y-16">
        {sortedArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-zinc-700 hover:shadow-emerald-500/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-400">
                  {article.title}
                </h2>
                <div className="flex items-center text-zinc-400 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(article.date)}
                </div>
              </div>
              
              {article.type === 'post' && article.images && article.images.length > 0 && (
                <div className="mb-8">
                  <div className="relative aspect-video mb-8 rounded-xl overflow-hidden border-2 border-zinc-700 shadow-lg group">
                    <div className="relative h-full">
                      <Image
                        src={article.images[getActiveImageIndex(article.id)]}
                        alt={`${article.title} image ${getActiveImageIndex(article.id) + 1}`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    
                    {article.images.length > 1 && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => prevImage(article.id, article.images!.length)}
                          className="h-10 w-10 rounded-full bg-black/60 flex items-center justify-center text-white ml-4 hover:bg-emerald-500 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={() => nextImage(article.id, article.images!.length)}
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
                            onClick={() => setActiveImageIndices(prev => ({ ...prev, [article.id]: idx }))}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full transition-all", 
                              idx === getActiveImageIndex(article.id)
                                ? "bg-emerald-400 scale-110 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
                                : "bg-white/60 hover:bg-white"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {article.content}
                </div>
              )}
              
              {article.type === 'linkedin' && article.linkedinPostUrl && (
                <div className="flex justify-center my-6">
                  <div className="w-full max-w-3xl">
                    <LinkedInEmbed postUrl={article.linkedinPostUrl} width={800} height={850} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {sortedArticles.length === 0 && (
          <div className="text-center mt-16">
            <div className="inline-block rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors p-4 border border-emerald-500/30">
              <p className="text-zinc-300">
                No news articles available yet.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {sortedArticles.length > 0 && (
        <div className="text-center mt-16">
          <div className="inline-block rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors p-4 border border-emerald-500/30">
            <p className="text-zinc-300">
              More news coming soon...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
