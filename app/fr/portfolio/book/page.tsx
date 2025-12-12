"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function BookPageFr() {
  // Utiliser useEffect pour l'initialisation côté client uniquement
  const [initialized, setInitialized] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bookImages = [
    { src: "/images/Book/couverture.jpg", alt: "Couverture du livre" },
    { src: "/images/Book/page1.jpg", alt: "Page 1" },
    { src: "/images/Book/page2.jpg", alt: "Page 2" },
    { src: "/images/Book/page3.jpg", alt: "Page 3" },
    { src: "/images/Book/page4.jpg", alt: "Page 4" },
    { src: "/images/Book/page5.jpg", alt: "Page 5" },
    { src: "/images/Book/page6.jpg", alt: "Page 6" },
    { src: "/images/Book/page7.jpg", alt: "Page 7" },
    { src: "/images/Book/page8.jpg", alt: "Page 8" },
    { src: "/images/Book/page9.jpg", alt: "Page 9" },
    { src: "/images/Book/pagedossynopsis.jpg", alt: "Dos avec synopsis" },
  ];

  // Initialiser l'état uniquement côté client
  useEffect(() => {
    setInitialized(true);
    setImagesLoaded(new Array(bookImages.length).fill(false));
  }, []);

  // Surveiller la progression du chargement
  useEffect(() => {
    if (imagesLoaded.length > 0 && imagesLoaded[currentImageIndex]) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    if (imagesLoaded.length === bookImages.length && imagesLoaded.every(Boolean)) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, currentImageIndex]);

  // Gestion du chargement des images
  const handleImageLoaded = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handlePrevImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? bookImages.length - 1 : prevIndex - 1;
      if (imagesLoaded[newIndex]) {
        setIsLoading(false);
      }
      return newIndex;
    });
  };

  const handleNextImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex === bookImages.length - 1 ? 0 : prevIndex + 1;
      if (imagesLoaded[newIndex]) {
        setIsLoading(false);
      }
      return newIndex;
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <main className="container mx-auto px-4 pt-32 pb-12" suppressHydrationWarning>
      <h1 className="text-4xl font-bold mb-8">Projet de Livre pour Enfants</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          Dans un royaume enchanté, une malédiction plonge le royaume dans la paresse après la naissance d'une princesse.
          Des années plus tard, un prince part à la recherche de miel rare avec son compagnon.
          Leur quête les mène à un château étrange où un événement inattendu déclenche des révélations magiques.
        </p>
        
        <p className="mb-4">
          C'est un projet de classe initialement en groupe mais suite à des complications, j'ai dû réaliser
          chaque illustration ainsi que la confection du livre, un travail d'une semaine en 2024.
        </p>
        
        <p className="mb-4">
          Le style visuel est inspiré de l'animation populaire <strong>Adventure Time</strong>, avec son design de personnages distinctif
          et son esthétique colorée. Toutes les illustrations ont été créées avec <strong>Procreate</strong> et <strong>Photoshop</strong>.
        </p>
        
        <p className="mb-4">
          Je suis allée chercher chez des professionnels le papier ainsi que les outils pour confectionner
          ce livre pop-up. L'impression a dû être faite par mes soins par manque de temps.
        </p>
      </div>

      <div className="relative">
        {/* Fullscreen overlay */}
        {isFullscreen && (
          <div 
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
              <Image
                src={bookImages[currentImageIndex].src}
                alt={bookImages[currentImageIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                unoptimized={true}
              />
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={toggleFullscreen}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Main gallery */}
        <div className="relative w-full h-[500px] bg-gray-100">
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-2">Chargement en cours...</span>
              </div>
            )}
            <Image
              src={bookImages[currentImageIndex].src}
              alt={bookImages[currentImageIndex].alt}
              fill
              className={`object-contain cursor-pointer ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
              onClick={toggleFullscreen}
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized={true}
              priority={currentImageIndex === 0}
              onLoadingComplete={() => handleImageLoaded(currentImageIndex)}
            />
          </div>
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrevImage}
            disabled={isLoading && !imagesLoaded[(currentImageIndex === 0 ? bookImages.length - 1 : currentImageIndex - 1)]}
          >
            &#10094;
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNextImage}
            disabled={isLoading && !imagesLoaded[(currentImageIndex === bookImages.length - 1 ? 0 : currentImageIndex + 1)]}
          >
            &#10095;
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <p className="text-sm text-gray-600">
            {currentImageIndex + 1} / {bookImages.length}
          </p>
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {bookImages.map((image, index) => (
              <div 
                key={index} 
                className={`relative w-20 h-20 flex-shrink-0 cursor-pointer ${
                  index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
