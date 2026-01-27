import { motion } from "framer-motion";
import { Language, translations } from "@/data/quizData";

interface HeroSectionProps {
  language: Language;
  onToggleLanguage: () => void;
}

const HeroSection = ({ language, onToggleLanguage }: HeroSectionProps) => {
  const t = translations[language];

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/5 blur-xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 md:w-48 md:h-48 rounded-full bg-white/5 blur-xl" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-4 leading-relaxed">
              {t.subtitle}
            </p>
            <p className="text-base md:text-lg text-white/80 mb-6">
              🎁 {t.discountInfo}
            </p>
            
            {/* Language toggle button */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-3 px-6 py-3 text-lg rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all shadow-lg hover:shadow-xl active:scale-95"
              aria-label={t.switchLang}
            >
              <span className="text-2xl">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
              <span className="font-medium">{language === "fr" ? "English" : "Français"}</span>
            </button>
          </motion.div>

          {/* Right column - About & Logo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-72 lg:w-80"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <a 
                href="https://www.peita.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mb-4"
              >
                <img 
                  src="/images/peita-logo.png" 
                  alt="PEITA Logo" 
                  className="h-12 md:h-14 object-contain mx-auto filter brightness-0 invert"
                />
              </a>
              <h3 className="font-serif text-lg font-semibold text-white mb-2">
                {language === "fr" ? "À propos de PEITA :" : "About PEITA:"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-3">
                {language === "fr" 
                  ? "PEITA est un organisme de formation spécialisé en santé naturelle, micronutrition et bien-être."
                  : "PEITA is a training organization specialized in natural health, micronutrition and wellness."
                }
              </p>
              <a 
                href="https://www.peita.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-white/80 underline underline-offset-2"
              >
                {language === "fr" ? "> En savoir plus sur nous" : "> Learn more about us"}
              </a>
            </div>
            
            {/* Warning text */}
            <p className="text-xs md:text-sm text-white/60 italic mt-4 text-center md:text-left">
              {t.warning}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
