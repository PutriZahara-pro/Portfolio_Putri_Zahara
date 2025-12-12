"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import Script from "next/script";

interface ContactFormProps {
  lang?: "en" | "fr";
}

export default function ContactForm({ lang = "en" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Détecter l'environnement de développement une seule fois
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

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
      submitting: "Sending...",
      formSubject: "New message from portfolio",
      success: "Your message has been sent successfully!",
      error: "Failed to send message. Please try again.",
      captchaRequired: "Please validate the captcha before sending the message."
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
      submitting: "Envoi en cours...",
      formSubject: "Nouveau message du portfolio",
      success: "Votre message a été envoyé avec succès !",
      error: "Échec de l'envoi du message. Veuillez réessayer.",
      captchaRequired: "Veuillez valider le captcha avant d'envoyer le message."
    },
  };

  const t = texts[lang];

  // Function to handle turnstile validation callback
  const handleTurnstileCallback = (token: string) => {
    setTurnstileToken(token);
  };

  // Initialize Turnstile once the script is loaded
  useEffect(() => {
    if (!turnstileLoaded || !window.turnstile) return;

    const turnstileId = "cf-turnstile";
    const turnstileElement = document.getElementById(turnstileId);

    if (turnstileElement) {
      try {
        window.turnstile.render(`#${turnstileId}`, {
          sitekey: "0x4AAAAAABadkJg2mUhPpxoj", // Clé de site Turnstile
          callback: handleTurnstileCallback,
          "refresh-expired": "auto",
          appearance: "always"
        });
      } catch (error) {
        console.error("Erreur lors du chargement de Turnstile:", error);
        
        // En environnement de développement, on peut simuler un succès
        if (isDevelopment) {
          setTurnstileToken("dev-environment-token");
        }
      }
    }
  }, [turnstileLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification du honeypot - si rempli, c'est un bot
    const formData = new FormData(formRef.current!);
    const honeypotValue = formData.get('website') as string;
    
    if (honeypotValue) {
      console.log("Bot détecté par honeypot");
      // Simuler une soumission réussie pour ne pas alerter le bot
      setFormStatus({ success: true, message: t.success });
      return;
    }
    
    // Vérification du captcha Turnstile (sauf en développement)
    if (!turnstileToken && !isDevelopment) {
      setFormStatus({
        success: false,
        message: t.captchaRequired
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const formData = new FormData(formRef.current!);
      // Ajout du token Turnstile s'il est disponible
      if (turnstileToken) {
        formData.append("cf-turnstile-response", turnstileToken);
      }

      // Envoi du formulaire via FormSubmit.co
      const response = await fetch("https://formsubmit.co/putrizahara972015@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormStatus({ success: true, message: t.success });
        formRef.current?.reset();
        
        // Reset Turnstile after successful submission
        if (window.turnstile) {
          window.turnstile.reset();
        }
        
        setTurnstileToken(null);
      } else {
        setFormStatus({ success: false, message: t.error });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setFormStatus({ success: false, message: t.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => setTurnstileLoaded(true)}
      />
      
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900/90 p-8 rounded-3xl border border-zinc-700/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-500/20 p-2 rounded-full">
            <Mail className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold">{t.title}</h2>
        </div>
        
        {formStatus && (
          <div className={`p-4 mb-6 rounded-xl ${formStatus.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {formStatus.message}
          </div>
        )}
        
        <form 
          ref={formRef}
          className="space-y-6" 
          action="https://formsubmit.co/putrizahara972015@gmail.com" 
          method="POST"
          onSubmit={handleSubmit}
        >
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
          
          {/* Cloudflare Turnstile Widget */}
          <div id="cf-turnstile" className="flex justify-center my-4"></div>
          
          {/* Honeypot - Champ invisible pour les humains, mais visible pour les bots */}
          <div className="absolute top-0 left-0 h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Ne pas remplir ce champ si vous êtes humain:
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          
          <input type="hidden" name="_next" value="https://putrizahara.com/contact/" />
          <input type="hidden" name="_subject" value={t.formSubject} />
          <input type="hidden" name="_captcha" value="false" />
          
          <Button 
            type="submit" 
            disabled={isSubmitting || (!turnstileToken && !isDevelopment)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full py-6 font-medium text-base disabled:opacity-70"
          >
            {isSubmitting ? t.submitting : t.send}
          </Button>
        </form>
      </div>
    </>
  );
}

// Ajouter cette déclaration pour TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (selector: string, options: any) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
