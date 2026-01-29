import { motion } from "framer-motion";
import { useRef } from "react";
import { Language } from "@/data/quizData";

type CategoryId = "micronutrition" | "biology" | "plants" | "memory";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const heroTexts = {
  fr: [
    {
      emoji: "🧠",
      text: "Une mémoire en bonne santé se construit grâce à l'alliance d'une alimentation adaptée et d'un entraînement mental régulier. Une nutrition anti-inflammatoire, riche en oméga-3, joue un rôle capital dans le bon fonctionnement du cerveau."
    },
    {
      emoji: "💡",
      text: "Il est tout aussi essentiel de rester intellectuellement actif : apprendre, solliciter sa mémoire et explorer de nouvelles idées tout au long de la vie permet de préserver vivacité et curiosité."
    },
    {
      emoji: "🎮",
      text: "C'est dans cet esprit que nous avons créé cette série de quiz, conçue pour entraîner le cerveau de façon stimulante et fun."
    }
  ],
  en: [
    {
      emoji: "🧠",
      text: "A healthy memory is shaped by both nutrition and mental exercise. An anti-inflammatory diet rich in omega-3s plays a key role in supporting brain health."
    },
    {
      emoji: "💡",
      text: "Just as important is staying mentally active — learning, challenging your memory, and exploring new ideas throughout life helps keep the mind sharp and curious."
    },
    {
      emoji: "🎮",
      text: "That's why we created this series of quizzes, designed to train your brain in a playful and engaging way."
    }
  ]
};

const categories: Category[] = [
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "biology", name: { fr: "Biologie", en: "Biology" }, emoji: "🧬" },
  { id: "plants", name: { fr: "Plantes médicinales", en: "Medicinal Plants" }, emoji: "🌿" },
  { id: "memory", name: { fr: "Mémoire", en: "Memory" }, emoji: "🎵" },
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
      {/* Animated background shapes */}
      <div className="hero-shapes">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>

      {/* Decorative leaf pattern - subtle */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="leafPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M10 2 Q15 10 10 18 Q5 10 10 2" fill="currentColor" className="text-white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        {/* Top bar with language toggle */}
        <div className="flex flex-col items-end mb-6 md:mb-8">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onToggleLanguage}
            className="category-pill flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20"
            aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span className="text-lg">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="font-medium">{language === "fr" ? "EN" : "FR"}</span>
          </motion.button>
          
          {/* Logo below flag - visible only on mobile */}
          <motion.a 
            href="https://www.peita.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden mt-4 floating-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="/images/peita-logo-transparent.png" 
              alt="PEITA Logo" 
              className="h-14 w-auto drop-shadow-xl"
            />
          </motion.a>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-start mb-8 md:mb-10">
          {/* Left column - Title and tagline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-left w-full"
          >
            <h1 className="display-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
              {language === "fr" ? "Testez vos connaissances et votre mémoire" : "Test your knowledge and memory"}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30"
            >
              <p className="text-lg sm:text-xl font-semibold text-accent">
                {language === "fr" ? "Apprenez. Jouez. Gagnez." : "Learn. Play. Win."}
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Logo only on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden md:flex justify-end w-full"
          >
            <a 
              href="https://www.peita.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="floating-logo"
            >
              <img 
                src="/images/peita-logo-transparent.png" 
                alt="PEITA Logo" 
                className="h-20 lg:h-24 w-auto drop-shadow-xl"
              />
            </a>
          </motion.div>
        </div>

        {/* Horizontal scrolling text cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide -mx-4 sm:mx-0">
            {heroTexts[language].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex-shrink-0 w-[85vw] sm:w-[45%] md:w-[32%] first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0 snap-center"
              >
                <div className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                    <p className="text-base sm:text-base text-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll indicator dots for mobile */}
          <div className="flex justify-center gap-2 mt-3 md:hidden">
            {heroTexts[language].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/40"
              />
            ))}
          </div>
        </motion.div>

        {/* Warning message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="text-lg">⚠️</span>
            <p className="text-sm sm:text-base text-white/70 italic">
              {language === "fr" 
                ? "Attention, vous ne pouvez faire chaque quiz qu'une seule fois avec votre adresse mail."
                : "Warning, you can only take each quiz once with your email address."
              }
            </p>
          </div>
        </motion.div>

        {/* Category buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-pill px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold backdrop-blur-sm ${
                selectedCategory === cat.id 
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" 
                  : "bg-white/10 text-white border border-white/20"
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.name[language]}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;