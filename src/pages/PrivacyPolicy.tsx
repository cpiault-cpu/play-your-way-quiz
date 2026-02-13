import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Database, Clock, UserCheck, Lock, Cookie, Heart } from "lucide-react";
import { Language } from "@/data/quizData";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const [language] = useState<Language>("fr");

  const sections = [
    {
      icon: Database,
      title: language === "fr" ? "Données collectées" : "Data Collected",
      content: language === "fr" 
        ? "E-mails, réponses aux quiz, niveaux atteints, données techniques (adresse IP, navigateur, appareil utilisé)."
        : "Emails, quiz answers, levels achieved, technical data (IP address, browser, device used)."
    },
    {
      icon: Shield,
      title: language === "fr" ? "Finalité" : "Purpose",
      content: language === "fr"
        ? "Personnalisation des quiz, sauvegarde des progrès, analyses anonymes pour améliorer l'expérience utilisateur."
        : "Quiz personalization, progress saving, anonymous analytics to improve user experience."
    },
    {
      icon: UserCheck,
      title: language === "fr" ? "Gérer mes données" : "Manage my data",
      content: language === "fr"
        ? <>Vos données (email, scores) serviront uniquement à :<br/>• Gérer votre participation au quiz.<br/>• Vous envoyer vos réductions ou codes promo.<br/>• Améliorer l'expérience utilisateur (statistiques anonymes).<br/><br/>Elles ne seront jamais cédées à des tiers et seront supprimées après 3 mois.<br/><br/>Vous pouvez accéder, modifier ou demander la suppression de vos données en nous contactant à : <a href="mailto:c.piault@peita.fr" className="text-primary underline hover:opacity-70">c.piault@peita.fr</a></>
        : <>Your data (email, scores) will only be used to:<br/>• Manage your quiz participation.<br/>• Send you your discounts or promo codes.<br/>• Improve the user experience (anonymous statistics).<br/><br/>They will never be shared with third parties and will be deleted after 3 months.<br/><br/>You can access, modify or request deletion of your data by contacting us at: <a href="mailto:c.piault@peita.fr" className="text-primary underline hover:opacity-70">c.piault@peita.fr</a></>
    },
    {
      icon: Clock,
      title: language === "fr" ? "Durée de conservation" : "Retention Period",
      content: language === "fr"
        ? "Les données personnelles (emails, scores) sont automatiquement supprimées 3 mois après leur collecte. Les données anonymisées peuvent être conservées plus longtemps à des fins statistiques."
        : "Personal data (emails, scores) is automatically deleted 3 months after collection. Anonymized data may be kept longer for statistical purposes."
    },
    {
      icon: Lock,
      title: language === "fr" ? "Sécurité" : "Security",
      content: language === "fr"
        ? "Les données sont stockées en Union Européenne (Supabase/O2Switch) avec chiffrement des e-mails et transmission sécurisée (HTTPS)."
        : "Data is stored in the European Union (Supabase/O2Switch) with email encryption and secure transmission (HTTPS)."
    },
    {
      icon: Cookie,
      title: language === "fr" ? "Cookies" : "Cookies",
      content: language === "fr"
        ? "Nous utilisons des cookies pour enregistrer vos préférences (comme le consentement RGPD) et effectuer des analyses anonymes de l'utilisation du site."
        : "We use cookies to save your preferences (such as GDPR consent) and perform anonymous site usage analytics."
    },
    {
      icon: Heart,
      title: language === "fr" ? "Avertissement médical" : "Medical Disclaimer",
      content: language === "fr"
        ? "Les conseils et informations fournis sur ce site ne remplacent pas un avis médical professionnel. Consultez toujours un professionnel de santé pour toute question médicale."
        : "The advice and information provided on this site does not replace professional medical advice. Always consult a healthcare professional for any medical questions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient py-8 px-4 relative overflow-hidden">
        <div className="hero-shapes">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="text-white/90 hover:text-white hover:bg-white/10 mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "fr" ? "Retour" : "Back"}
            </Button>
          </Link>
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
          </motion.h1>
          <motion.p 
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {language === "fr" 
              ? "Comment nous protégeons vos données personnelles"
              : "How we protect your personal data"
            }
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {section.title}
                  </h2>
                  <p 
                    className="text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last updated */}
        <motion.p 
          className="text-center text-muted-foreground mt-10 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {language === "fr" 
            ? "Dernière mise à jour : Février 2026"
            : "Last updated: February 2026"
          }
        </motion.p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
