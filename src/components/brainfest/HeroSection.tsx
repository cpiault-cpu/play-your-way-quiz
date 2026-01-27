import { motion } from "framer-motion";
import { Language, translations } from "@/data/quizData";

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
    <section className="bg-[#1a1a2e] relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Top bar with language toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <span className="text-lg">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
            <span className="font-medium">{language === "fr" ? "EN" : "FR"}</span>
          </button>
        </div>

        {/* Main hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
            {language === "fr" ? "Santé & Bien-être" : "Health & Wellness"}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-4 font-medium">
            {language === "fr" 
              ? "Testez vos connaissances et votre mémoire."
              : "Test your knowledge and memory."
            }
          </p>

          {/* PEITA Logo */}
          <div className="flex justify-center mb-3">
            <a 
              href="https://www.peita.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                src="/images/peita-logo.png" 
                alt="PEITA Logo" 
                className="h-10 md:h-12 object-contain filter brightness-0 invert"
              />
            </a>
          </div>

          {/* Discount info */}
          <p className="text-base md:text-lg text-amber-400 font-semibold mb-8">
            🎁 {language === "fr" 
              ? "Répondez correctement pour débloquer des réductions."
              : "Answer correctly to unlock discounts."
            }
          </p>

          {/* Category buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-4 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all ${
                selectedCategory === null 
                  ? "bg-amber-400 text-[#1a1a2e] shadow-lg" 
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              ✨ {language === "fr" ? "Tous" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all ${
                  selectedCategory === cat.id 
                    ? "bg-amber-400 text-[#1a1a2e] shadow-lg" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {cat.emoji} {cat.name[language]}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
