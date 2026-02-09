import { motion, AnimatePresence } from "framer-motion";
import { Language } from "@/data/quizData";
import { useRef, useState, useEffect } from "react";

type CategoryId = "micronutrition" | "micronutrition2" | "vitamind-light" | "plants" | "memory-music" | "memory-cards" | "sardines" | "carre-cognitif";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const heroTexts = {
  fr: [
    "Une alimentation anti-inflammatoire riche en oméga-3 est bénéfique pour la santé notamment le cerveau. Chez Maison Peita cette notion est au cœur de notre ADN.",
    "Apprendre, stimuler sa mémoire, jouer… autant d'exercices qui entretiennent la vivacité et le plaisir de comprendre.",
    "C'est pourquoi nous vous proposons ces petits jeux d'entraînement de la mémoire et partageons avec vous nos connaissances en naturopathie et micronutrition pour cultiver vos connaissances et votre curiosité.",
    "Les matières et les jeux seront actualisés régulièrement. Stay tuned..."
  ],
  en: [
    "An anti-inflammatory diet rich in omega-3s is beneficial for health, especially the brain. At Maison Peita, this concept is at the heart of our DNA.",
    "Learning, stimulating memory, playing… all exercises that maintain alertness and the joy of understanding.",
    "That's why we offer these little memory training games and share our knowledge in naturopathy and micronutrition to cultivate your knowledge and curiosity.",
    "Topics and games will be updated regularly. Stay tuned..."
  ]
};

const savoirCategories: Category[] = [
  { id: "sardines", name: { fr: "Sardines", en: "Sardines" }, emoji: "🐟" },
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" }, emoji: "💊" },
  { id: "micronutrition2", name: { fr: "Vitamine D", en: "Vitamin D" }, emoji: "☀️" },
  { id: "vitamind-light", name: { fr: "Lumière", en: "Light" }, emoji: "🌅" },
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
  const introScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollIntro, setCanScrollIntro] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (introScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = introScrollRef.current;
        setCanScrollIntro(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const element = introScrollRef.current;
    if (element) {
      checkScroll();
      element.addEventListener('scroll', checkScroll);
      return () => element.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <>
      {/* Partie haute compacte - fond #B6BDB0 */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#B6BDB0' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-2 md:py-6">
          {/* Top bar with language toggle and logo */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
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
            className="bg-white p-2 md:p-4 border border-[#B6BDB0]"
            style={{ borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
          >
            {/* Title and tagline on same line */}
            <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-3">
              <h1 
                className="font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#000000', lineHeight: 1.3, fontSize: '20px' }}
              >
                {language === "fr" ? "Testez vos connaissances et votre mémoire" : "Test your knowledge and memory"}
              </h1>
              <span 
                className="inline-flex items-center px-2 py-0.5 bg-[#87917E] text-white font-medium"
                style={{ borderRadius: '8px', fontSize: '18px' }}
              >
                {language === "fr" ? "Apprenez. Jouez. Gagnez." : "Learn. Play. Win."}
              </span>
            </div>
            
            {/* Horizontal scroll carousel for intro text */}
            <div className="relative">
              <div 
                ref={introScrollRef}
                className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-2 px-2 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {heroTexts[language].map((text, index) => {
                  const isLastBlock = index === heroTexts[language].length - 1;
                  return (
                    <div 
                      key={index}
                      className="relative flex-shrink-0 w-[calc(100%-16px)] md:w-[24%] p-3 pb-6 bg-[#f5f5f5] border border-[#E0E0E0] snap-start"
                      style={{ 
                        borderRadius: '8px',
                        fontFamily: 'Montserrat, sans-serif', 
                        color: '#333333',
                        fontSize: '16px',
                        lineHeight: 1.5
                      }}
                    >
                      {text}
                      {/* Scroll arrow inside each block - hidden on last block and desktop */}
                      {!isLastBlock && (
                        <span 
                          className="absolute bottom-2 right-3 text-[#87917E] text-sm md:hidden"
                          style={{ fontSize: '14px' }}
                        >
                          →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-2 md:py-6">
          {/* Category buttons - Two sections */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-2 md:gap-6"
          >
            {/* SAVOIR Section */}
            <div className="flex flex-col items-start w-full gap-1 md:gap-0">
              <h3 
                className="text-sm md:text-lg tracking-wide mb-1 md:mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
              >
                {language === "fr" ? "APPRENDRE" : "LEARN"}
              </h3>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={savoirScrollRef}
                className="flex md:grid md:grid-cols-3 gap-2 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
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
                        className="flex-shrink-0 w-[45%] h-[44px] md:h-auto md:w-full border flex items-center justify-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-1.5 md:py-3"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 500, 
                        fontSize: isPlantes ? '12px' : '13px', 
                        color: '#000000',
                        backgroundColor: isSelected ? '#d5e6dd' : '#FFFFFF',
                        borderColor: isSelected ? '#b8d4c4' : '#E0E0E0',
                        borderRadius: '12px',
                        boxShadow: isSelected ? '0 4px 12px rgba(213, 230, 221, 0.5)' : '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                        <span className="text-lg md:text-2xl flex-shrink-0">{cat.emoji}</span>
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
            <div className="flex flex-col items-start w-full gap-1 md:gap-0">
              <h3 
                className="text-sm md:text-lg tracking-wide mb-1 md:mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
              >
                {language === "fr" ? "JOUER" : "PLAY"}
              </h3>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={entrainerScrollRef}
                className="flex md:grid md:grid-cols-3 gap-2 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
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
                      className="flex-shrink-0 w-[45%] h-[44px] md:h-auto md:w-full border flex items-center justify-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-1.5 md:py-3"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 500, 
                        fontSize: '13px', 
                        color: '#000000',
                        backgroundColor: isSelected ? '#d5e6dd' : '#FFFFFF',
                        borderColor: isSelected ? '#b8d4c4' : '#E0E0E0',
                        borderRadius: '12px',
                        boxShadow: isSelected ? '0 4px 12px rgba(213, 230, 221, 0.5)' : '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span className="text-lg md:text-2xl flex-shrink-0">{cat.emoji}</span>
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
