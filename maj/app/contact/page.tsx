import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Contact Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Me</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Interested in working together? Feel free to reach out for collaborations, commissions, or just to say
            hello.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-zinc-800 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-zinc-700 border-zinc-600 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-zinc-700 border-zinc-600 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    className="bg-zinc-700 border-zinc-600 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={6}
                    className="bg-zinc-700 border-zinc-600 focus:border-emerald-500"
                  />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-zinc-300 mb-8">
                  Feel free to reach out through any of the following channels. I'm always open to discussing new
                  projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-zinc-300">putrizahara972015@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-zinc-300">Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
