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
        <div className="flex flex-col items-end mb-4 md:mb-6">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span className="text-base">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="font-medium text-xs sm:text-sm">{language === "fr" ? "EN" : "FR"}</span>
          </button>
          
          {/* Logo below flag - visible only on mobile */}
          <a 
            href="https://www.peita.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden mt-3"
          >
            <img 
              src="/images/peita-logo-transparent.png" 
              alt="PEITA Logo" 
              className="h-12 w-auto drop-shadow-lg opacity-80"
            />
          </a>
        </div>

        {/* Content - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-center mb-6 md:mb-8">
          {/* Left column - Title and text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left w-full"
          >
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-normal text-white mb-3 md:mb-4 tracking-tight leading-tight">
              {language === "fr" ? "Testez vos connaissances et votre mémoire" : "Test your knowledge and memory"}
            </h1>
            

            <p className="text-base sm:text-lg md:text-lg text-amber-400">
              🎁 {language === "fr" 
                ? "Apprendre, Jouez, Gagnez."
                : "Learn, Play, Win."
              }
            </p>
          </motion.div>

          {/* Right column - Logo and info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left md:text-right w-full"
          >
            <a 
              href="https://www.peita.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-block mb-3 md:mb-4"
            >
              <img 
                src="/images/peita-logo-transparent.png" 
                alt="PEITA Logo" 
                className="h-20 lg:h-24 w-auto ml-auto drop-shadow-lg opacity-80"
              />
            </a>
            
            <p className="text-sm sm:text-base md:text-base text-white/90 font-medium leading-relaxed">
              {language === "fr" 
                ? "Une mémoire en pleine forme se cultive à la fois par l'alimentation et dans l'exercice. Une alimentation anti-inflammatoire, riche en oméga-3, est capitale. Apprendre, stimuler sa mémoire et se lancer de nouveaux défis tout au long de la vie est aussi capital pour garder l'esprit vif et curieux. C'est pourquoi nous avons créé cette série de quiz pensés pour entraîner son cerveau avec le sourire."
                : "A healthy memory is cultivated through both nutrition and exercise. An anti-inflammatory diet rich in omega-3s is essential. Learning, stimulating your memory, and taking on new challenges throughout life is also essential to keep your mind sharp and curious. That's why we created this series of quizzes designed to train your brain with a smile."
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
