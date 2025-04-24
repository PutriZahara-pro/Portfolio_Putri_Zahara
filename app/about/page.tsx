import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* About Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-xl text-zinc-300 mb-8">
                I'm Putri Zahara, a concept artist with a passion for creating immersive worlds and compelling
                narratives.
              </p>
              <div className="space-y-4 text-zinc-300">
                <p>
                  With over 5 years of experience in the industry, I've had the privilege of working on various projects
                  ranging from indie games to major studio productions. My work focuses on environmental design,
                  character concepts, and world-building.
                </p>
                <p>
                  I believe that great concept art is not just about creating beautiful images, but about telling
                  stories and building worlds that captivate and inspire. Each piece I create is carefully crafted to
                  convey emotion, atmosphere, and narrative.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-zinc-900/30 rounded-full blur-3xl opacity-40 transform scale-90"></div>
              <div className="relative h-[600px] w-[500px] rounded-3xl overflow-hidden bg-zinc-800/50 backdrop-blur-sm border border-emerald-500/20 p-5 shadow-lg shadow-emerald-500/10">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-800/80 to-transparent z-10"></div>
                <img
                  src="/images/putri-zahara-portrait.png"
                  alt="Putri Zahara portrait"
                  className="object-cover h-full w-full object-top rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Environment Design</h3>
              <p className="text-zinc-300">
                Creating immersive and atmospheric environments that tell stories and establish mood. Specializing in
                natural landscapes, post-apocalyptic settings, and fantasy realms.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Character Design</h3>
              <p className="text-zinc-300">
                Designing unique and memorable characters with distinct personalities and visual identities. From rough
                sketches to final polished concepts.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Visual Development</h3>
              <p className="text-zinc-300">
                Developing visual language and style guides for projects. Creating mood boards, color scripts, and key
                art to establish the visual direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Software */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Tools & Software</h2>

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
