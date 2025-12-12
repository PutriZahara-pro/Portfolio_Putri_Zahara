"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  // Ordre spécifique demandé
  '/images/Portfolio/The_Ethians_Redeemed/carte_monde.jpg', // 1. carte du monde
  '/images/Portfolio/The_Ethians_Redeemed/Concept_village_demetrius.jpg', // 2. concept art village de demetrius
  '/images/Portfolio/The_Ethians_Redeemed/camp_du_travail_keyframe.jpg', // 3. design d'environnement du camp de travail
  '/images/Portfolio/The_Ethians_Redeemed/set_design_camp_travail.jpg', // 4. design de décor du camp de travail
  '/images/Portfolio/The_Ethians_Redeemed/planche_props_slave.jpg', // 5. designs des accessoires des esclaves
  '/images/Portfolio/The_Ethians_Redeemed/procesuce_creation_camp_de_travaill.jpg', // 6. processus de création du camp de travail
  '/images/Portfolio/The_Ethians_Redeemed/Carte_3D_camp_de_travaille.jpg', // 7. carte 3D du camp de travail
  '/images/Portfolio/The_Ethians_Redeemed/key_frame_base_camp.jpg', // 8. concept d'environnement du camp de base
  '/images/Portfolio/The_Ethians_Redeemed/dug_out_house.jpg', // 9. design de la maison creusée
  '/images/Portfolio/The_Ethians_Redeemed/set_design_dug_out_house.jpg', // 10. design de décor de la maison creusée
  '/images/Portfolio/The_Ethians_Redeemed/planche_props_forest.jpg', // 11. designs des accessoires de la forêt
  '/images/Portfolio/The_Ethians_Redeemed/gate_capital_yirie.png', // 12. art d'environnement de la porte de la capitale Yirie
  '/images/Portfolio/The_Ethians_Redeemed/Concept_ville_yirie.jpg', // 13. concept art de la ville de Yirie
  '/images/Portfolio/The_Ethians_Redeemed/set_design_yirie.jpg', // 14. design de décor du château de Yirie
  '/images/Portfolio/The_Ethians_Redeemed/design_dome_yirie.jpg', // 15. design du bâtiment principal de Yirie
  '/images/Portfolio/The_Ethians_Redeemed/design_yirie_banner.jpg', // 16. design de la bannière et de la porte principale de Yirie
  '/images/Portfolio/The_Ethians_Redeemed/planche_recherche_yirie.jpg', // 17. croquis de recherche pour l'environnement de Yirie
  '/images/Portfolio/The_Ethians_Redeemed/Concept_chateau_de_ether.jpg', // 18. concept art du château d'Ether
  '/images/Portfolio/The_Ethians_Redeemed/planche_set_design_ether.jpg', // 19. concept artistique du monde d'Ether
  '/images/Portfolio/The_Ethians_Redeemed/Props_ether.jpg', // 20. accessoires du royaume d'Ether
  '/images/Portfolio/The_Ethians_Redeemed/plnche_recherche_ether.jpg', // 21. croquis de recherche pour le royaume d'Ether
  '/images/Portfolio/The_Ethians_Redeemed/Concept_chateau_de_vulkan.jpg', // 22. concept art final du château de Vulkan
  '/images/Portfolio/The_Ethians_Redeemed/planche_castle_vulkan.jpg', // 23. concept du château de Vulkan
  '/images/Portfolio/The_Ethians_Redeemed/Props_vulcan.jpg', // 24. accessoires du château de Vulkan
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_recherche_vulkan.jpg', // 25. croquis de recherche pour l'environnement de Vulkan
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_dimi_new.jpg', // 26. design du personnage Demetrius
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement.jpg', // 27. designs de vêtements pour tous les personnages
  '/images/Portfolio/The_Ethians_Redeemed/processuce_creation_demetrius.jpg', // 28. processus de création de Demetrius
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_haikal_new.jpg', // 29. design du personnage Haikal
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_haikal.jpg', // 30. designs de vêtements pour Haikal
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_ellis_new.jpg', // 31. design du personnage Ellis
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_elis.jpg', // 32. designs de vêtements pour Ellis
  '/images/Portfolio/The_Ethians_Redeemed/recherche_ellis.jpg', // 33. croquis de recherche pour le personnage d'Ellis
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_milo_new.jpg', // 34. design du personnage Milo
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_milo.jpg', // 35. designs de vêtements pour Milo
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_hades_new.jpg', // 36. design du personnage Hades
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_hades.jpg', // 37. designs de vêtements pour Hades
  '/images/Portfolio/The_Ethians_Redeemed/concept_UIX_jeux.jpg', // 38. concepts d'interface utilisateur pour le jeu
  '/images/Portfolio/The_Ethians_Redeemed/ui_icons.jpg' // 39. icônes et éléments d'interface du jeu
].map((src, index) => {
  const descriptions = [
    // Descriptions suivant l'ordre demandé
    'Carte du monde de l\'univers The Ethians Redeemed', // 1
    'Concept art du village de Demetrius', // 2
    'Design d\'environnement du camp de travail', // 3
    'Design de décor du camp de travail', // 4
    'Designs des accessoires des esclaves', // 5
    'Processus de création de l\'environnement du camp de travail', // 6
    'Carte 3D du camp de travail', // 7
    'Concept d\'environnement du camp de base de Demetrius', // 8
    'Design de la maison creusée', // 9
    'Design de décor de la maison creusée', // 10
    'Designs des accessoires de la forêt', // 11
    'Art d\'environnement de la porte de la capitale Yirie', // 12
    'Concept art de la ville de Yirie', // 13
    'Design de décor du château de Yirie', // 14
    'Design du bâtiment principal de Yirie', // 15
    'Design de la bannière et de la porte principale de Yirie', // 16
    'Croquis de recherche pour l\'environnement de Yirie', // 17
    'Concept art du château d\'Ether', // 18
    'Concept artistique du monde d\'Ether', // 19
    'Accessoires du royaume d\'Ether', // 20
    'Croquis de recherche pour le royaume d\'Ether', // 21
    'Concept art final du château de Vulkan', // 22
    'Concept du château de Vulkan', // 23
    'Accessoires du château de Vulkan', // 24
    'Croquis de recherche pour l\'environnement de Vulkan', // 25
    'Design du personnage Demetrius', // 26
    'Designs de vêtements pour tous les personnages', // 27
    'Processus de création du personnage de Demetrius et de son environnement', // 28
    'Design du personnage Haikal', // 29
    'Designs de vêtements pour Haikal', // 30
    'Design du personnage Ellis', // 31
    'Designs de vêtements pour Ellis', // 32
    'Croquis de recherche pour le personnage d\'Ellis', // 33
    'Design du personnage Milo', // 34
    'Designs de vêtements pour Milo', // 35
    'Design du personnage Hades', // 36
    'Designs de vêtements pour Hades', // 37
    'Concepts d\'interface utilisateur pour le jeu', // 38
    'Icônes et éléments d\'interface du jeu' // 39
  ];
  return {
    src,
    alt: descriptions[index],
    description: descriptions[index]
  };
});

export default function EthianRedemPageFr() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const lightboxImages = images.map(image => ({
    src: image.src,
    alt: image.alt
  }))

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <main className="pt-16 bg-zinc-900">
      {/* En-tête du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Ethians Redeemed</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Un projet de concept art pour un RPG néo-médiéval où l'esclave Demetrius se soulève et combat contre un empire cruel.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Projet de fin d'année</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2024-2025</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Concept Artist & Game Designer</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Designs de personnages, concepts d'environnements, interface utilisateur</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-zinc-400 mb-1">OUTILS</h3>
              <p className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Photoshop</span>
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Blender</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie du projet */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {images.map((image, index) => (
              <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div
                  className="overflow-hidden"
                >
                  <ZoomableImage 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full object-cover h-[300px]" 
                    onClick={() => openLightbox(index)}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{image.alt}</h2>
                  <p className="text-zinc-300 mb-4">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description du projet */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos de ce projet</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                <em>Note: Le jeu présenté ici n'est pas représentatif du design visuel et systémique final, mais sert à illustrer le point de vue et l'intrigue.</em>
              </p>
              <p>
                The Ethians Redeemed est un RPG narratif se déroulant dans un monde dystopique néo-médiéval où l'Empire Yirie règne d'une main de fer.
                Le jeu suit Demetrius, un esclave qui se soulève pour combattre l'empire oppressif qui a dévasté sa patrie.
              </p>
              <p>
                Le concept art présente divers environnements, notamment des camps de travail, l'imposante capitale de Yirie, le camp de base caché de Demetrius, 
                ainsi que des designs de personnages qui reflètent la dure réalité de ce monde. Le style visuel mêle esthétique médiévale et éléments dystopiques
                pour créer une atmosphère unique.
              </p>
              <p>
                Mon rôle dans ce projet était de développer l'identité visuelle globale, comprenant les concepts d'environnements, les designs de personnages, 
                et les éléments architecturaux qui racontent l'histoire de l'oppression et de la résistance. Chaque lieu et personnage a été conçu
                pour véhiculer des éléments narratifs spécifiques et une résonance émotionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ImageLightbox
        images={lightboxImages}
        initialSlide={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  )
}
