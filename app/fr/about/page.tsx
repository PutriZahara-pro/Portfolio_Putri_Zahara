import Image from "next/image"

export default function AboutPageFr() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Section À propos */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos</h1>
              <p className="text-xl text-zinc-300 mb-8">
                Je suis Putri Zahara, artiste conceptuelle passionnée par la création de mondes immersifs et de récits captivants.
              </p>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Avec plus de 5 ans d'expérience dans l'industrie, j'ai eu le privilège de travailler sur divers projets allant des jeux indépendants aux productions de grands studios. Mon travail se concentre sur la conception d'environnements, les concepts de personnages et la création d'univers.
                </p>
                <p>
                  Je crois qu'un excellent concept art ne consiste pas seulement à créer de belles images, mais à raconter des histoires et à construire des mondes qui captivent et inspirent. Chaque pièce que je crée est soigneusement conçue pour transmettre émotion, atmosphère et narration.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-zinc-900/30 rounded-full blur-3xl opacity-40 transform scale-90"></div>
              <div className="relative h-[600px] w-[500px] rounded-3xl overflow-hidden bg-zinc-800/50 backdrop-blur-sm border border-emerald-500/20 p-5 shadow-lg shadow-emerald-500/10">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-800/80 to-transparent z-10"></div>
                <img
                  src="/images/putri-zahara-portrait.png"
                  alt="Portrait de Putri Zahara"
                  className="object-cover h-full w-full object-top rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences & Expertise */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Compétences & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Conception d'environnements</h3>
              <p className="text-zinc-300">
                Création d'environnements immersifs et atmosphériques racontant des histoires et établissant une ambiance. Spécialisée dans les paysages naturels, les décors post-apocalyptiques et les univers fantastiques.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Design de personnages</h3>
              <p className="text-zinc-300">
                Conception de personnages uniques et mémorables avec des personnalités et identités visuelles distinctes. De l'esquisse au concept final.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Développement visuel</h3>
              <p className="text-zinc-300">
                Élaboration de la direction artistique et des guides de style pour les projets. Création de mood boards, scripts de couleurs et illustrations clés pour définir l'orientation visuelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outils & Logiciels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Outils & Logiciels</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="bg-zinc-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">PS</span>
              </div>
              <h3 className="font-medium">Photoshop</h3>
            </div>
            <div>
              <div className="bg-zinc-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">PR</span>
              </div>
              <h3 className="font-medium">Procreate</h3>
            </div>
            <div>
              <div className="bg-zinc-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">AI</span>
              </div>
              <h3 className="font-medium">Illustrator</h3>
            </div>
            <div>
              <div className="bg-zinc-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-400 text-xl font-bold">BL</span>
              </div>
              <h3 className="font-medium">Blender</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
