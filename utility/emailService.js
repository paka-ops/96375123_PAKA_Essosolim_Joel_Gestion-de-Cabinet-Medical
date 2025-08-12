const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP avec Gmail et identifiants depuis variables d'environnement
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // adresse email expéditrice
    pass: process.env.EMAIL_PASS  // mot de passe ou token d'application
  }
});

// Fonction asynchrone pour envoyer un email de rappel
// Arguments : destinataire (to), sujet (subject), contenu texte (text)
module.exports.sendReminder = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // expéditeur
    to,                           // destinataire
    subject,                      // sujet du mail
    text                         // corps du mail en texte brut
  });
};
