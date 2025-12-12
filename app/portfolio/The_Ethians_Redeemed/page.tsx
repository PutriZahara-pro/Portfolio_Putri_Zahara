"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  // Ordre spécifique demandé
  '/images/Portfolio/The_Ethians_Redeemed/carte_monde.jpg', // 1. world map
  '/images/Portfolio/The_Ethians_Redeemed/Concept_village_demetrius.jpg', // 2. concept art demetrius village
  '/images/Portfolio/The_Ethians_Redeemed/camp_du_travail_keyframe.jpg', // 3. labor camp environnement design
  '/images/Portfolio/The_Ethians_Redeemed/set_design_camp_travail.jpg', // 4. set design of labor camp
  '/images/Portfolio/The_Ethians_Redeemed/planche_props_slave.jpg', // 5. slaves props design
  '/images/Portfolio/The_Ethians_Redeemed/procesuce_creation_camp_de_travaill.jpg', // 6. creation process of the labor camp
  '/images/Portfolio/The_Ethians_Redeemed/Carte_3D_camp_de_travaille.jpg', // 7. 3d map of the labor camp
  '/images/Portfolio/The_Ethians_Redeemed/key_frame_base_camp.jpg', // 8. environnement concept of demetrius
  '/images/Portfolio/The_Ethians_Redeemed/dug_out_house.jpg', // 9. design of the dug house
  '/images/Portfolio/The_Ethians_Redeemed/set_design_dug_out_house.jpg', // 10. set design of the dug house
  '/images/Portfolio/The_Ethians_Redeemed/planche_props_forest.jpg', // 11. forest props designs
  '/images/Portfolio/The_Ethians_Redeemed/gate_capital_yirie.png', // 12. environnement art of the gate of the yirie capital
  '/images/Portfolio/The_Ethians_Redeemed/Concept_ville_yirie.jpg', // 13. concept art yirie city
  '/images/Portfolio/The_Ethians_Redeemed/set_design_yirie.jpg', // 14. set design of yirie castle
  '/images/Portfolio/The_Ethians_Redeemed/design_dome_yirie.jpg', // 15. the design of the yirie main building
  '/images/Portfolio/The_Ethians_Redeemed/design_yirie_banner.jpg', // 16. design yirie banner and the main gate
  '/images/Portfolio/The_Ethians_Redeemed/planche_recherche_yirie.jpg', // 17. research sketches for yirie environnement
  '/images/Portfolio/The_Ethians_Redeemed/Concept_chateau_de_ether.jpg', // 18. concept art of ether castle
  '/images/Portfolio/The_Ethians_Redeemed/planche_set_design_ether.jpg', // 19. ether world artistic concept
  '/images/Portfolio/The_Ethians_Redeemed/Props_ether.jpg', // 20. props from ether realm
  '/images/Portfolio/The_Ethians_Redeemed/plnche_recherche_ether.jpg', // 21. research sketches for ether realm
  '/images/Portfolio/The_Ethians_Redeemed/Concept_chateau_de_vulkan.jpg', // 22. final concept art of vulkan castle
  '/images/Portfolio/The_Ethians_Redeemed/planche_castle_vulkan.jpg', // 23. concept of vulkan castle
  '/images/Portfolio/The_Ethians_Redeemed/Props_vulcan.jpg', // 24. props from vulkan castle
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_recherche_vulkan.jpg', // 25. research sketch for vulkan environnement
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_dimi_new.jpg', // 26. chara design demetrius
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement.jpg', // 27. clothing design for all charaters
  '/images/Portfolio/The_Ethians_Redeemed/processuce_creation_demetrius.jpg', // 28. creation process of demetrius
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_haikal_new.jpg', // 29. chara design haikal
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_haikal.jpg', // 30. clothing design for haikal
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_ellis_new.jpg', // 31. chara design for ellis
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_elis.jpg', // 32. clothing designs for ellis
  '/images/Portfolio/The_Ethians_Redeemed/recherche_ellis.jpg', // 33. research sketches for ellis characther
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_milo_new.jpg', // 34. characther design milo
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_milo.jpg', // 35. clothing designs for milo
  '/images/Portfolio/The_Ethians_Redeemed/planche_perso_hades_new.jpg', // 36. charc design of hades
  '/images/Portfolio/The_Ethians_Redeemed/planche_de_vetement_hades.jpg', // 37. clothing designs for hades
  '/images/Portfolio/The_Ethians_Redeemed/concept_UIX_jeux.jpg', // 38. user interface concept for the games
  '/images/Portfolio/The_Ethians_Redeemed/ui_icons.jpg' // 39. games icon and ui elements
].map((src, index) => {
  const descriptions = [
    // Descriptions suivant l'ordre demandé
    'World map of The Ethians Redeemed universe', // 1
    'Concept art of Demetrius village', // 2
    'Labor camp environment design', // 3
    'Set design of the labor camp', // 4
    'Slave props designs', // 5
    'Creation process of the labor camp environment', // 6
    '3D map of the labor camp', // 7
    'Environment concept of Demetrius base camp', // 8
    'Design of the dug out house', // 9
    'Set design of the dug out house', // 10
    'Forest props designs', // 11
    'Environment art of the gate of the Yirie capital', // 12
    'Concept art of Yirie city', // 13
    'Set design of Yirie castle', // 14
    'The design of the Yirie main building', // 15
    'Design Yirie banner and the main gate', // 16
    'Research sketches for Yirie environment', // 17
    'Concept art of Ether castle', // 18
    'Ether world artistic concept', // 19
    'Props from the Ether realm', // 20
    'Research sketches for Ether realm', // 21
    'Final concept art of Vulkan castle', // 22
    'Concept of Vulkan castle', // 23
    'Props from Vulkan castle', // 24
    'Research sketches for Vulkan environment', // 25
    'Character design of Demetrius', // 26
    'Clothing designs for all characters', // 27
    'Creation process of Demetrius character and environment', // 28
    'Character design of Haikal', // 29
    'Clothing designs for Haikal', // 30
    'Character design of Ellis', // 31
    'Clothing designs for Ellis', // 32
    'Research sketches for Ellis character', // 33
    'Character design of Milo', // 34
    'Clothing designs for Milo', // 35
    'Character design of Hades', // 36
    'Clothing designs for Hades', // 37
    'User interface concepts for the game', // 38
    'Game icons and UI elements' // 39
  ];
  return {
    src,
    alt: descriptions[index],
    description: descriptions[index]
  };
});

export default function EthianRedemPage() {
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
      {/* Project Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Link href="/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Ethians Redeemed</h1>
            <p className="text-xl text-zinc-300 mb-8">
              A concept art project for video game RPG, neo-medieval where the slave, Demetrius, rises and fights against the cruel empire.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>End-of-year project</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2024-2025</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Concept Artist & Game Designer</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Character Designs, Environment Concepts, UI</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-zinc-400 mb-1">TOOLS</h3>
              <p className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Photoshop</span>
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Blender</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
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

      {/* Project Description */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                <em>Note: The game shown here is not representative of the final visual and systematic design, but serves to illustrate the point of view and storyline.</em>
              </p>
              <p>
                The Ethians Redeemed is a narrative RPG set in a neo-medieval dystopian world where the Yirie Empire rules with an iron fist.
                The game follows Demetrius, a slave who rises up to fight against the oppressive empire that has devastated his homeland.
              </p>
              <p>
                The concept art showcases various environments including labor camps, the imposing Yirie capital, Demetrius's hidden base camp, 
                and character designs that reflect the harsh reality of this world. The visual style blends medieval aesthetics with dystopian elements
                to create a unique atmosphere.
              </p>
              <p>
                My role in this project was to develop the overall visual identity, including environment concepts, character designs, 
                and architectural elements that tell the story of oppression and resistance. Each location and character was designed
                to convey specific narrative elements and emotional resonance.
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
