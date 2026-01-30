import { motion } from "framer-motion";
import { Language } from "@/data/quizData";

type CategoryId = "micronutrition" | "biology" | "plants" | "memory-music" | "memory-cards" | "health-quiz";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const savoirCategories: Category[] = [
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "biology", name: { fr: "Biologie", en: "Biology" }, emoji: "🧬" },
  { id: "plants", name: { fr: "Plantes médicinales", en: "Medicinal Plants" }, emoji: "🌿" },
];

const entrainerCategories: Category[] = [
  { id: "memory-music", name: { fr: "Musique", en: "Music" }, emoji: "🎵" },
  { id: "memory-cards", name: { fr: "Cartes", en: "Cards" }, emoji: "🃏" },
  { id: "health-quiz", name: { fr: "Quiz Santé", en: "Health Quiz" }, emoji: "❤️" },
];

interface HeroSectionProps {
  language: Language;
  onToggleLanguage: () => void;
  selectedCategory: CategoryId | null;
  onSelectCategory: (category: CategoryId | null) => void;
}

const HeroSection = ({ language, onToggleLanguage, selectedCategory, onSelectCategory }: HeroSectionProps) => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle organic shapes - Nordic minimalist */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-white/3 blur-2xl" />
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTMwIDMwbTAgMGEyIDIgMCAxIDAgMCAwIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=')]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Top bar with language toggle */}
        <div className="flex justify-end mb-8 md:mb-12">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onToggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/15 hover:bg-white/15 transition-colors"
            aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span className="text-lg">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="font-medium tracking-wide">{language === "fr" ? "EN" : "FR"}</span>
          </motion.button>
        </div>

        {/* Brand and Tagline - Centered, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          {/* Brand name - elegant serif */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight mb-6">
            Source Lab
          </h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {language === "fr" 
              ? "Tout apprendre et comprendre durablement sur les sources d'une bonne santé."
              : "Learn and deeply understand the sources of good health."
            }
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-10 md:mb-14"
        />

        {/* Category buttons - Two columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 gap-6 sm:gap-10 max-w-2xl mx-auto"
        >
          {/* Left section - SAVOIR */}
          <div className="flex flex-col items-center">
            <h3 className="text-white/60 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              {language === "fr" ? "Savoir" : "Learn"}
            </h3>
            <div className="flex flex-col gap-2.5 w-full">
              {savoirCategories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                    selectedCategory === cat.id 
                      ? "bg-white text-foreground shadow-lg" 
                      : "bg-white/10 text-white border border-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.name[language]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right section - S'ENTRAINER */}
          <div className="flex flex-col items-center">
            <h3 className="text-white/60 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              {language === "fr" ? "S'entraîner" : "Practice"}
            </h3>
            <div className="flex flex-col gap-2.5 w-full">
              {entrainerCategories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                    selectedCategory === cat.id 
                      ? "bg-white text-foreground shadow-lg" 
                      : "bg-white/10 text-white border border-white/10 hover:bg-white/15"
                  }`}
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.name[language]}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
