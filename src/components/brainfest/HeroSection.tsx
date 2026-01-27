import { motion } from "framer-motion";
import { Language } from "@/data/quizData";

type CategoryId = "micronutrition" | "biology" | "plants" | "memory";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

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
    <section className="bg-[#3E5D58] relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        {/* Top bar with language toggle */}
        <div className="flex justify-end mb-4 md:mb-6">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span className="text-base">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="font-medium text-xs sm:text-sm">{language === "fr" ? "EN" : "FR"}</span>
          </button>
        </div>

        {/* Content - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-center mb-6 md:mb-8">
          {/* Left column - Title and text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left w-full"
          >
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight leading-tight">
              {language === "fr" ? "Santé & Bien-être" : "Health & Wellness"}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-xl text-white/90 mb-3 md:mb-4 font-medium leading-relaxed">
              {language === "fr" 
                ? "Testez vos connaissances et votre mémoire."
                : "Test your knowledge and memory."
              }
            </p>

            <p className="text-base sm:text-lg md:text-lg text-amber-400 font-semibold">
              🎁 {language === "fr" 
                ? "Répondez correctement pour débloquer des réductions."
                : "Answer correctly to unlock discounts."
              }
            </p>
          </motion.div>

          {/* Right column - Logo and info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right w-full"
          >
            <a 
              href="https://www.peita.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mb-3 md:mb-4"
            >
              <img 
                src="https://www.peita.fr/wp-content/uploads/2023/09/LOGO-PEITA-SMALL-sans-fond.png" 
                alt="PEITA Logo" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto mx-auto md:ml-auto md:mr-0 drop-shadow-lg opacity-90"
              />
            </a>
            
            <p className="text-base sm:text-lg md:text-lg text-white/90 font-medium leading-relaxed">
              {language === "fr" 
                ? "De nouveaux quiz et produits d'excellence seront proposés régulièrement."
                : "New quizzes and premium products will be offered regularly."
              }
            </p>
          </motion.div>
        </div>

        {/* Warning message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-4 md:mb-6"
        >
          <p className="text-sm sm:text-base md:text-base text-white/70 italic px-2">
            ⚠️ {language === "fr" 
              ? "Attention, vous ne pouvez faire chaque quiz qu'une seule fois avec votre adresse mail."
              : "Warning, you can only take each quiz once with your email address."
            }
          </p>
        </motion.div>

        {/* Category buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3"
        >
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all ${
              selectedCategory === null 
                ? "bg-amber-400 text-[#3E5D58] shadow-lg" 
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            ✨ {language === "fr" ? "Tous" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all ${
                selectedCategory === cat.id 
                  ? "bg-amber-400 text-[#3E5D58] shadow-lg" 
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {cat.emoji} {cat.name[language]}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
