"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

interface ContactFormProps {
  lang?: "en" | "fr";
}

export default function ContactForm({ lang = "en" }: ContactFormProps) {
  const texts = {
    en: {
      title: "Send a Message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Your message",
      send: "Send Message",
    },
    fr: {
      title: "Envoyer un message",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      subjectPlaceholder: "Sujet",
      messagePlaceholder: "Votre message",
      send: "Envoyer",
    },
  };

  const t = texts[lang];

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/20 p-2 rounded-full">
          <Mail className="h-5 w-5 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>
      
      <form className="space-y-6" action="https://formsubmit.co/putrizahara972015@gmail.com" method="POST">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t.name}
            </label>
            <Input
              id="name"
              name="name"
              placeholder={t.namePlaceholder}
              required
              className="bg-zinc-700/80 border-zinc-600 focus:border-emerald-500 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {t.email}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t.emailPlaceholder}
              required
              className="bg-zinc-700/80 border-zinc-600 focus:border-emerald-500 rounded-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            {t.subject}
          </label>
          <Input
            id="subject"
            name="subject"
            placeholder={t.subjectPlaceholder}
            required
            className="bg-zinc-700/80 border-zinc-600 focus:border-emerald-500 rounded-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t.message}
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
            rows={6}
            required
            className="bg-zinc-700/80 border-zinc-600 focus:border-emerald-500 rounded-xl"
          />
        </div>
        <input type="hidden" name="_next" value="https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/contact/" />
        <input type="hidden" name="_subject" value="Nouveau message du portfolio" />
        <input type="hidden" name="_captcha" value="false" />
        
        <Button 
          type="submit" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full py-6 font-medium text-base"
        >
          {t.send}
        </Button>
      </form>
    </div>
  );
}
