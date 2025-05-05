import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration pour l'envoi d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  // Variable définie en dehors du bloc try/catch pour être accessible partout
  let langValue = 'fr'; // Valeur par défaut
  
  try {
    // Récupérer les données du formulaire
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const turnstileToken = formData.get('cf-turnstile-response') as string;
    langValue = formData.get('lang') as string || 'fr'; // Mise à jour de la variable
    
    // Vérifier que tous les champs requis sont présents
    if (!name || !email || !subject || !message || !turnstileToken) {
      return NextResponse.json(
        { 
          success: false, 
          message: langValue === 'fr' 
            ? 'Tous les champs sont requis.' 
            : 'All fields are required.' 
        }, 
        { status: 400 }
      );
    }

    // Vérifier le token Turnstile avec l'API Cloudflare
    const turnstileVerification = await verifyTurnstileToken(turnstileToken);
    
    if (!turnstileVerification.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: langValue === 'fr' 
            ? 'Échec de la validation du captcha. Veuillez réessayer.' 
            : 'Captcha validation failed. Please try again.' 
        }, 
        { status: 400 }
      );
    }

    // Préparer l'email à envoyer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'putrizahara972015@gmail.com', // Remplacez par l'adresse à laquelle vous souhaitez recevoir les emails
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0;">
          <h2 style="color: #10b981;">Nouveau message du portfolio</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Retourner une réponse de succès
    return NextResponse.json({ 
      success: true, 
      message: langValue === 'fr' 
        ? 'Votre message a été envoyé avec succès !' 
        : 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Retourner une réponse d'erreur
    return NextResponse.json(
      { 
        success: false, 
        message: langValue === 'fr'
          ? 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' 
          : 'An error occurred while sending the message. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}

// Fonction pour vérifier le token Turnstile avec l'API Cloudflare
async function verifyTurnstileToken(token: string) {
  // Pour le développement local, on accepte un token factice
  if (token === "dev-environment-token") {
    return { success: true };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not defined in environment variables');
    return { success: false };
  }

  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const data = await response.json();
    return { 
      success: data.success, 
      ...(data.error_codes && { errorCodes: data.error_codes })
    };
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return { success: false };
  }
}
