import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";

type CategoryId = "micronutrition" | "micronutrition2" | "plants" | "memory-music" | "memory-cards" | "sardines" | "carre-cognitif";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const heroTexts = {
  fr: "Une alimentation anti-inflammatoire riche en oméga-3 est au cœur de l'ADN de Maison Peita. L'esprit a aussi besoin de se nourrir : apprendre, stimuler sa mémoire et jouer renforcent la vivacité et le plaisir d'apprendre. Formés en naturopathie et micronutrition, nous vous proposons des jeux d'entraînement du cerveau et des connaissances sur le vivant.",
  en: "An anti-inflammatory diet rich in omega-3 is at the heart of Maison Peita's DNA. The mind also needs nourishment: learning, stimulating memory and playing enhance vitality and the joy of learning. Trained in naturopathy and micronutrition, we offer brain-training games and knowledge about life."
};

const savoirCategories: Category[] = [
  { id: "sardines", name: { fr: "Sardines", en: "Sardines" }, emoji: "🐟" },
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "micronutrition2", name: { fr: "Vitamine D", en: "Vitamin D" }, emoji: "☀️" },
  { id: "plants", name: { fr: "Plantes", en: "Plants" }, emoji: "🌿" },
];

const entrainerCategories: Category[] = [
  { id: "carre-cognitif", name: { fr: "Puzzle", en: "Puzzle" }, emoji: "🧩" },
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
  const savoirScrollRef = useRef<HTMLDivElement>(null);
  const entrainerScrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Partie haute compacte - fond #B6BDB0 */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#B6BDB0' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-6">
          {/* Top bar with language toggle and logo */}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            {/* Logo */}
            <motion.a 
              href="https://www.peita.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="floating-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="/images/peita-logo-transparent.png" 
                alt="PEITA Logo" 
                className="h-10 md:h-14 w-auto drop-shadow-lg"
              />
            </motion.a>
            
            {/* Language toggle */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-[#B6BDB0] shadow-sm"
              style={{ borderRadius: '10px', color: '#000000' }}
              aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
            >
              <span className="text-base">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
              <span className="font-medium text-xs">{language === "fr" ? "EN" : "FR"}</span>
            </motion.button>
          </div>

          {/* Compact content block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-3 md:p-4 border border-[#B6BDB0] mb-2"
            style={{ borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
          >
            {/* Title and tagline on same line */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 
                className="text-base md:text-xl font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#000000', lineHeight: 1.3 }}
              >
                {language === "fr" ? "Testez vos connaissances et votre mémoire" : "Test your knowledge and memory"}
              </h1>
              <span 
                className="inline-flex items-center px-2 py-0.5 bg-[#87917E] text-white text-xs font-medium"
                style={{ borderRadius: '8px' }}
              >
                {language === "fr" ? "Apprenez. Jouez. Gagnez." : "Learn. Play. Win."}
              </span>
            </div>
            
            {/* Condensed description */}
            <p 
              className="text-xs md:text-sm leading-snug"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#333333' }}
            >
              {heroTexts[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partie basse - fond #87917E avec bordure de séparation */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: '#87917E',
          borderTop: '1px solid #7A8278'
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-6">
          {/* Category buttons - Two sections */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-3 md:gap-6"
          >
            {/* SAVOIR Section */}
            <div className="flex flex-col items-start w-full gap-2 md:gap-0">
              <div className="flex items-center justify-between w-full mb-2 md:mb-4">
                <h3 
                  className="text-base md:text-lg tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
                >
                  {language === "fr" ? "APPRENDRE" : "LEARN"}
                </h3>
                <ScrollIndicator scrollRef={savoirScrollRef} />
              </div>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={savoirScrollRef}
                className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {savoirCategories.map((cat, index) => {
                  const isPlantes = cat.id === 'plants';
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: isSelected ? 1.05 : 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectCategory(cat.id)}
                        className="flex-shrink-0 w-[45%] h-[50px] md:h-auto md:w-full border flex items-center justify-center gap-2 md:gap-2.5 px-2 md:px-3 py-2 md:py-3"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 500, 
                        fontSize: isPlantes ? '12px' : '13px', 
                        color: isSelected ? '#2E5A3A' : '#000000',
                        backgroundColor: isSelected ? '#7BC5A0' : '#FFFFFF',
                        borderColor: isSelected ? '#6AB58F' : '#E0E0E0',
                        borderRadius: '12px',
                        boxShadow: isSelected ? '0 4px 12px rgba(123, 197, 160, 0.4)' : '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                        <span className="text-xl md:text-2xl flex-shrink-0">{cat.emoji}</span>
                      <span 
                        className={isPlantes ? "text-center leading-tight" : "whitespace-nowrap"}
                        style={isPlantes ? { lineHeight: '1.2' } : undefined}
                      >
                        {cat.name[language]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* S'ENTRAINER Section */}
            <div className="flex flex-col items-start w-full gap-2 md:gap-0">
              <div className="flex items-center justify-between w-full mb-2 md:mb-4">
                <h3 
                  className="text-base md:text-lg tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
                >
                  {language === "fr" ? "JOUER" : "PLAY"}
                </h3>
                <ScrollIndicator scrollRef={entrainerScrollRef} />
              </div>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={entrainerScrollRef}
                className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {entrainerCategories.map((cat, index) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: isSelected ? 1.05 : 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectCategory(cat.id)}
                      className="flex-shrink-0 w-[45%] h-[50px] md:h-auto md:w-full border flex items-center justify-center gap-2 md:gap-2.5 px-2 md:px-3 py-2 md:py-3"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 500, 
                        fontSize: '13px', 
                        color: isSelected ? '#2E5A3A' : '#000000',
                        backgroundColor: isSelected ? '#7BC5A0' : '#FFFFFF',
                        borderColor: isSelected ? '#6AB58F' : '#E0E0E0',
                        borderRadius: '12px',
                        boxShadow: isSelected ? '0 4px 12px rgba(123, 197, 160, 0.4)' : '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span className="text-xl md:text-2xl flex-shrink-0">{cat.emoji}</span>
                      <span className="whitespace-nowrap">{cat.name[language]}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
