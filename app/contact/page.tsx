import { MapPin, Linkedin, Palette } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Contact Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-zinc-300">
              Interested in working together? Feel free to reach out for collaborations, commissions, or just to say
              hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ContactForm lang="en" />

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-zinc-300 mb-8">
                  Feel free to reach out through any of the following channels. I'm always open to discussing new
                  projects, creative ideas, or opportunities to be part of your vision.
                </p>
              
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-zinc-300">Lyon, France</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Find Me Online</h2>
                
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
