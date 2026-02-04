import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";

type CategoryId = "micronutrition" | "biology" | "plants" | "memory-music" | "memory-cards" | "health-quiz";

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
  { id: "health-quiz", name: { fr: "Quiz Santé", en: "Health Quiz" }, emoji: "❤️" },
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
      {/* Partie haute - fond #B6BDB0 */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#B6BDB0' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">
          {/* Top bar with language toggle */}
          <div className="flex flex-col items-end mb-6 md:mb-8">
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-white border border-[#B6BDB0] shadow-sm"
              style={{ color: '#000000' }}
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
              <h1 
                className="mb-4 md:mb-6"
                style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  fontWeight: 600, 
                  fontSize: '36px', 
                  color: '#000000',
                  lineHeight: 1.2
                }}
              >
                {language === "fr" ? "Testez vos connaissances et votre mémoire" : "Test your knowledge and memory"}
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center px-4 py-2 rounded bg-white border border-[#B6BDB0]"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '18px', color: '#000000' }}>
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

          {/* Text cards - horizontal scroll on both mobile and desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 md:mb-10"
          >
            <div 
              className="flex flex-row gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory -mx-4 sm:mx-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {heroTexts[language].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[45%] lg:w-[32%] first:ml-4 last:mr-4 snap-center"
                >
                  <div 
                    className="h-full bg-white rounded p-5 border border-[#B6BDB0]"
                    style={{ 
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      borderRadius: '4px'
                    }}
                  >
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: '#000000', lineHeight: 1.6 }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Warning message */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center pb-8"
          >
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white border border-[#B6BDB0]"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px' }}
            >
              <span className="text-lg">⚠️</span>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', color: '#000000', fontStyle: 'italic' }}>
                {language === "fr" 
                  ? "Attention, vous ne pouvez faire chaque quiz qu'une seule fois avec votre adresse mail."
                  : "Warning, you can only take each quiz once with your email address."
                }
              </p>
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          {/* Category buttons - Two sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* SAVOIR Section */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-between w-full mb-4">
                <h3 
                  className="tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: '#FFFFFF' }}
                >
                  {language === "fr" ? "SAVOIR" : "LEARN"}
                </h3>
                <ScrollIndicator scrollRef={savoirScrollRef} />
              </div>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={savoirScrollRef}
                className="flex md:grid md:grid-cols-3 gap-4 w-full overflow-x-auto md:overflow-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {savoirCategories.map((cat, index) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex-shrink-0 w-[250px] h-[150px] md:w-full md:h-auto text-left px-5 py-4 bg-white border transition-all flex flex-col justify-center ${
                      selectedCategory === cat.id 
                        ? "border-[#000000] bg-gray-50 ring-2 ring-black/20" 
                        : "border-[#B6BDB0]"
                    }`}
                    style={{ 
                      fontFamily: 'Montserrat, sans-serif', 
                      fontWeight: 500, 
                      fontSize: '16px', 
                      color: '#000000',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}
                  >
                    <span className="text-3xl mb-2">{cat.emoji}</span>
                    <span className="whitespace-normal">{cat.name[language]}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* S'ENTRAINER Section */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-between w-full mb-4">
                <h3 
                  className="tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: '#FFFFFF' }}
                >
                  {language === "fr" ? "S'ENTRAÎNER" : "PRACTICE"}
                </h3>
                <ScrollIndicator scrollRef={entrainerScrollRef} />
              </div>
              {/* Mobile: Horizontal scroll | Desktop: Grid */}
              <div 
                ref={entrainerScrollRef}
                className="flex md:grid md:grid-cols-3 gap-4 w-full overflow-x-auto md:overflow-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {entrainerCategories.map((cat, index) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex-shrink-0 w-[250px] h-[150px] md:w-full md:h-auto text-left px-5 py-4 bg-white border transition-all flex flex-col justify-center ${
                      selectedCategory === cat.id 
                        ? "border-[#000000] bg-gray-50 ring-2 ring-black/20" 
                        : "border-[#B6BDB0]"
                    }`}
                    style={{ 
                      fontFamily: 'Montserrat, sans-serif', 
                      fontWeight: 500, 
                      fontSize: '16px', 
                      color: '#000000',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}
                  >
                    <span className="text-3xl mb-2">{cat.emoji}</span>
                    <span className="whitespace-normal">{cat.name[language]}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
