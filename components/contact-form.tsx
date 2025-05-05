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
      error: "Failed to send message. Please try again."
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
      error: "Échec de l'envoi du message. Veuillez réessayer."
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
          "refresh-expired": "auto"
        });
      } catch (error) {
        console.error("Erreur lors du chargement de Turnstile:", error);
        // En cas d'erreur, on simule un token pour permettre le développement
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
          setTurnstileToken("dev-environment-token");
        }
      }
    }
  }, [turnstileLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // En développement, on bypasse la vérification du token Turnstile
    const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (!turnstileToken && !isDevelopment) {
      setFormStatus({
        success: false,
        message: lang === "fr" 
          ? "Veuillez valider le captcha avant d'envoyer le message."
          : "Please validate the captcha before sending the message."
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const formData = new FormData(formRef.current!);
      // S'assurer que le token n'est jamais null avant de l'ajouter
      if (turnstileToken) {
        formData.append("cf-turnstile-response", turnstileToken);
      } else if (isDevelopment) {
        // En développement, ajouter un token factice
        formData.append("cf-turnstile-response", "dev-environment-token");
      }
      formData.append("lang", lang);

      // Utiliser notre nouvel API endpoint au lieu de FormSubmit.co
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({ success: true, message: result.message || t.success });
        formRef.current?.reset();
        // Reset Turnstile after successful submission
        window.turnstile.reset();
      } else {
        setFormStatus({ 
          success: false, 
          message: result.message || t.error 
        });
      }
    } catch (error) {
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
          
          <div id="cf-turnstile" className="flex justify-center my-4"></div>
          
          <input type="hidden" name="_subject" value={t.formSubject} />
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !turnstileToken}
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
