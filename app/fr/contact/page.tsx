import { MapPin, Linkedin, Palette } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPageFr() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Section Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-moi</h1>
            <p className="text-xl text-zinc-300">
              Envie de collaborer ? N'hésitez pas à me contacter pour des collaborations, des commissions ou juste dire bonjour.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire & Infos */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulaire */}
            <ContactForm lang="fr" />

            {/* Infos de contact */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                <p className="text-zinc-300 mb-8">
                  N'hésitez pas à me contacter via l'un des moyens suivants. Je suis toujours ouvert à discuter de nouveaux projets, idées créatives ou opportunités.
                </p>
              
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Localisation</h3>
                      <p className="text-zinc-300">Lyon, France</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Retrouvez-moi en ligne</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://www.linkedin.com/in/putri-zaharapro/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-2xl transition-all"
                  >
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <Linkedin className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://www.artstation.com/putrizahara972015" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-2xl transition-all"
                  >
                    <div className="bg-indigo-500/20 p-2 rounded-full">
                      <Palette className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span>ArtStation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
