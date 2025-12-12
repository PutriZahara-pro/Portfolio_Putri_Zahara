"use client";

import { useState } from "react";
import Image from "next/image";

export default function BookPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const bookImages = [
    { src: "/images/Book/couverture.jpg", alt: "Book Cover" },
    { src: "/images/Book/page1.jpg", alt: "Page 1" },
    { src: "/images/Book/page2.jpg", alt: "Page 2" },
    { src: "/images/Book/page3.jpg", alt: "Page 3" },
    { src: "/images/Book/page4.jpg", alt: "Page 4" },
    { src: "/images/Book/page5.jpg", alt: "Page 5" },
    { src: "/images/Book/page6.jpg", alt: "Page 6" },
    { src: "/images/Book/page7.jpg", alt: "Page 7" },
    { src: "/images/Book/page8.jpg", alt: "Page 8" },
    { src: "/images/Book/page9.jpg", alt: "Page 9" },
    { src: "/images/Book/pagedossynopsis.jpg", alt: "Back Cover with Synopsis" },
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? bookImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === bookImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Children's Book Project</h1>
      
      <div className="mb-8">
        <p className="mb-4">
          In an enchanted kingdom, a curse plunges the realm into laziness after the birth of a princess.
          Years later, a prince sets out in search of rare honey with his companion.
          Their quest leads them to a strange castle where an unexpected event triggers magical revelations.
        </p>
        
        <p className="mb-4">
          This project was initially a group assignment, but due to complications, I had to create all illustrations
          and craft the book myself within a week in 2024.
        </p>
        
        <p className="mb-4">
          I sourced professional-grade paper and tools to create this pop-up book, and due to time constraints,
          I had to handle the printing myself.
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
              />
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={toggleFullscreen}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main gallery */}
        <div className="relative w-full h-[500px] bg-gray-100">
          <div className="relative w-full h-full">
            <Image
              src={bookImages[currentImageIndex].src}
              alt={bookImages[currentImageIndex].alt}
              fill
              className="object-contain cursor-pointer"
              onClick={toggleFullscreen}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handlePrevImage}
          >
            &#10094;
          </button>
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handleNextImage}
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
