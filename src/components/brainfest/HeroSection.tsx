import { motion } from "framer-motion";
import { Language } from "@/data/quizData";

type CategoryId = "micronutrition" | "biology" | "plants" | "memory-music" | "memory-cards";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const heroTexts = {
  fr: [
    {
      text: "Une bonne alimentation joue un rôle primordial dans le soutien d'un cerveau qui fonctionne bien. Une alimentation anti-inflammatoire, riche en oméga-3."
    },
    {
      text: "L'esprit aussi a besoin d'être nourri : apprendre, exercer sa mémoire et s'ouvrir à de nouvelles idées tout au long de la vie entretient la vivacité et la curiosité et le plaisir."
    },
    {
      text: "C'est pourquoi nous avons créé cette série de quiz, conçue pour entraîner le cerveau en s'amusant, et partager des connaissances sur le merveilleux fonctionnement du vivant."
    },
    {
      text: "Et parce que les récompenses font toujours plaisir, la réussite des quiz vous permet de gagner des avantages sur nos produits et sur une sélection d'autres produits divers sélectionnés pour leur qualité parfaite."
    }
  ],
  en: [
    {
      text: "Good nutrition plays a key role in supporting a healthy brain. An anti-inflammatory diet, rich in omega-3s."
    },
    {
      text: "The mind also needs to be nourished: learning, exercising memory and opening up to new ideas throughout life maintains vitality, curiosity and joy."
    },
    {
      text: "That's why we created this series of quizzes, designed to train the brain while having fun, and share knowledge about the beautiful workings of life."
    },
    {
      text: "And because rewards are always a pleasure, completing the quizzes allows you to earn benefits on our products and on a selection of other products chosen for their perfect quality."
    }
  ]
};

const savoirCategories: Category[] = [
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "biology", name: { fr: "Biologie", en: "Biology" }, emoji: "🧬" },
  { id: "plants", name: { fr: "Plantes médicinales", en: "Medicinal Plants" }, emoji: "🌿" },
];

const entrainerCategories: Category[] = [
  { id: "memory-music", name: { fr: "Musique", en: "Music" }, emoji: "🎵" },
  { id: "memory-cards", name: { fr: "Cartes", en: "Cards" }, emoji: "🃏" },
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
                  <p className="text-base sm:text-base text-foreground leading-relaxed">
                    {item.text}
                  </p>
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

        {/* Category buttons - Two sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Left section - SAVOIR */}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-bold text-lg sm:text-xl mb-3 tracking-wide">
              {language === "fr" ? "SAVOIR" : "LEARN"}
            </h3>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {savoirCategories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`category-pill w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold backdrop-blur-sm ${
                    selectedCategory === cat.id 
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" 
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.name[language]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right section - S'ENTRAINER */}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-bold text-lg sm:text-xl mb-3 tracking-wide">
              {language === "fr" ? "S'ENTRAÎNER" : "PRACTICE"}
            </h3>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {entrainerCategories.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`category-pill w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold backdrop-blur-sm ${
                    selectedCategory === cat.id 
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" 
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <span className="mr-1.5">{cat.emoji}</span>
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
