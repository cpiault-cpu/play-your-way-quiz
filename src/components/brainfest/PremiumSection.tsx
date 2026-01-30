import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { GraduationCap, Target, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumSectionProps {
  language: Language;
}

const subjects = [
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "biology", name: { fr: "Biologie", en: "Biology" }, emoji: "🧬" },
  { id: "plants", name: { fr: "Plantes médicinales", en: "Medicinal Plants" }, emoji: "🌿" },
];

const PremiumSection = ({ language }: PremiumSectionProps) => {
  const features = language === "fr" ? [
    { icon: Target, text: "50+ exercices par niveau et par matière" },
    { icon: GraduationCap, text: "Progression personnalisée adaptée à votre rythme" },
    { icon: CheckCircle2, text: "Validation continue de vos acquis" },
    { icon: Award, text: "Test final certifiant votre maîtrise" },
  ] : [
    { icon: Target, text: "50+ exercises per level per subject" },
    { icon: GraduationCap, text: "Personalized progression adapted to your pace" },
    { icon: CheckCircle2, text: "Continuous validation of your knowledge" },
    { icon: Award, text: "Final test certifying your mastery" },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            {language === "fr" ? "Programme Maîtrise" : "Mastery Program"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            {language === "fr" 
              ? "Maîtrisez parfaitement chaque matière"
              : "Perfectly master each subject"
            }
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "fr"
              ? "Un programme d'apprentissage complet pour une compréhension durable et approfondie."
              : "A complete learning program for lasting and deep understanding."
            }
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 sm:mb-16"
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">{feature.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Subjects & Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden"
        >
          {/* Program structure */}
          <div className="p-6 sm:p-8 border-b border-border/50">
            <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4">
              {language === "fr" ? "Structure du programme" : "Program structure"}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <p>
                  {language === "fr" 
                    ? "Choisissez une matière et commencez par le Niveau 1"
                    : "Choose a subject and start with Level 1"
                  }
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <p>
                  {language === "fr" 
                    ? "Progressez à travers 50+ exercices avec suivi personnalisé"
                    : "Progress through 50+ exercises with personalized tracking"
                  }
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <p>
                  {language === "fr" 
                    ? "Passez le test final pour valider vos acquis"
                    : "Take the final test to validate your knowledge"
                  }
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0 mt-0.5">✓</span>
                <p>
                  {language === "fr" 
                    ? "Débloquez le niveau suivant et continuez votre apprentissage"
                    : "Unlock the next level and continue your learning"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-6 sm:p-8 bg-muted/30">
            <div className="text-center mb-6">
              <p className="text-muted-foreground text-sm mb-2">
                {language === "fr" ? "Tarif par matière et par niveau" : "Price per subject per level"}
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-4xl sm:text-5xl text-foreground">70</span>
                <span className="text-2xl text-muted-foreground">€</span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                {language === "fr" ? "Accès pendant 3 mois" : "3-month access"}
              </p>
            </div>

            {/* Subject cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {subjects.map((subject) => (
                <div 
                  key={subject.id}
                  className="p-4 rounded-xl bg-card border border-border/50 text-center"
                >
                  <span className="text-2xl mb-2 block">{subject.emoji}</span>
                  <p className="font-medium text-foreground">{subject.name[language]}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === "fr" ? "3 niveaux disponibles" : "3 levels available"}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-xl shadow-md"
              >
                {language === "fr" ? "Commencer mon apprentissage" : "Start my learning"}
              </Button>
              <p className="text-muted-foreground text-xs mt-3">
                {language === "fr" 
                  ? "Inscription gratuite • Paiement sécurisé"
                  : "Free registration • Secure payment"
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumSection;
