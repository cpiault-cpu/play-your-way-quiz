import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { useRef, useState, useEffect } from "react";
import wellnessHero from "@/assets/wellness-hero.png";

type CategoryId = "micronutrition" | "micronutrition2" | "vitamind-light" | "plants" | "memory-music" | "memory-cards" | "sardines" | "carre-cognitif";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  emoji: string;
}

const heroTexts = {
  fr: [
    "Une alimentation anti-inflammatoire riche en oméga-3 nourrit votre cerveau et protège votre vitalité. Cette notion est dans l'ADN Chez Maison Peita.",
    "Stimuler sa mémoire, apprendre, jouer… autant de rituels qui entretiennent la vivacité d'esprit et le plaisir de comprendre.",
    "Nous partageons avec vous nos connaissances en naturopathie et micronutrition pour cultiver votre bien-être au quotidien.",
    "De nouveaux contenus et exercices vous attendent régulièrement. Prenez soin de vous, restez curieux."
  ],
  en: [
    "An anti-inflammatory, omega-3-rich diet nourishes your brain and protects your vitality. This principle is at the core of Maison Peita's DNA.",
    "Stimulating your memory, learning, and playing—these rituals keep your mind sharp and the joy of understanding alive.",
    "We share our expertise in naturopathy and micronutrition to help you cultivate daily well-being.",
    "New content and exercises await you regularly. Take care of yourself, and stay curious."
  ]
};

const savoirCategories: Category[] = [
  { id: "sardines", name: { fr: "Sardines, Sardines, Mais pourquoi ?", en: "Sardines, Sardines, But why?" }, emoji: "🐟" },
  { id: "micronutrition", name: { fr: "Micronutrition 1", en: "Micronutrition 1" }, emoji: "💊" },
  { id: "micronutrition2", name: { fr: "VitD ça dépend", en: "VitD it depends" }, emoji: "☀️" },
  { id: "vitamind-light", name: { fr: "VitD-Que la lumière soit", en: "VitD-Let there be light" }, emoji: "🌅" },
  { id: "plants", name: { fr: "Plantes santé", en: "Health Plants" }, emoji: "🌿" },
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

  return (
    <>
      {/* Partie haute - fond #B6BDB0 */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#B6BDB0' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-6">
          {/* Top bar with language toggle and logo */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
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
            
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-[#B6BDB0] shadow-sm"
              style={{ borderRadius: '12px', color: '#000000' }}
              aria-label={language === "fr" ? "Switch to English" : "Passer en Français"}
            >
              <span className="text-lg">{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
              <span className="font-semibold text-sm">{language === "fr" ? "EN" : "FR"}</span>
            </motion.button>
          </div>

          {/* Content block with wellness positioning */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-4 md:p-6 border border-[#B6BDB0]"
            style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            {/* Wellness-oriented header */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={wellnessHero} 
                  alt="Bien-être et nature" 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover flex-shrink-0"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                />
                <div>
                  <h1 
                    className="font-bold leading-tight"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#2D3B2E', fontSize: '22px' }}
                  >
                    {language === "fr" ? "Votre pause bien-être cérébral" : "Your brain wellness break"}
                  </h1>
                  <p
                    className="mt-1 font-medium"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#5A6B5C', fontSize: '16px' }}
                  >
                    {language === "fr" ? "Mémoire · Vitalité · Prévention" : "Memory · Vitality · Prevention"}
                  </p>
                </div>
              </div>
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
                      className="relative flex-shrink-0 w-[calc(100%-16px)] md:w-[24%] p-4 pb-7 bg-[#f7f6f3] border border-[#e0ddd6] snap-start"
                      style={{ 
                        borderRadius: '12px',
                        fontFamily: 'Montserrat, sans-serif', 
                        color: '#2D3B2E',
                        fontSize: '16px',
                        lineHeight: 1.6
                      }}
                    >
                      {text}
                      {!isLastBlock && (
                        <span 
                          className="absolute bottom-2 right-3 text-[#87917E] md:hidden"
                          style={{ fontSize: '16px' }}
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

      {/* Partie basse - fond #87917E */}
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: '#87917E',
          borderTop: '1px solid #7A8278'
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-3 md:gap-6"
          >
            {/* APPRENDRE Section */}
            <div className="flex flex-col items-start w-full gap-1.5 md:gap-0">
              <h3 
                className="text-sm md:text-lg tracking-wide mb-1 md:mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
              >
                <span className="text-base md:text-xl">🌱</span>
                {language === "fr" ? "CULTIVEZ VOS SAVOIRS" : "CULTIVATE YOUR KNOWLEDGE"}
              </h3>
              <div 
                ref={savoirScrollRef}
                className="flex md:grid md:grid-cols-3 gap-2.5 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {savoirCategories.map((cat) => {
                  const needsWrap = cat.id === 'plants' || cat.id === 'vitamind-light' || cat.id === 'sardines' || cat.id === 'micronutrition2';
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: isSelected ? 1.03 : 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectCategory(cat.id)}
                      className={`flex-shrink-0 ${needsWrap ? 'w-[48%]' : 'w-[45%]'} min-h-[52px] md:h-auto md:w-full border flex items-center justify-center gap-2 md:gap-2.5 px-3 md:px-4 py-2.5 md:py-3.5`}
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 600, 
                        fontSize: needsWrap ? '11px' : '14px', 
                        color: '#1a2b1c',
                        backgroundColor: isSelected ? '#d5e6dd' : '#FFFFFF',
                        borderColor: isSelected ? '#b8d4c4' : '#E0E0E0',
                        borderRadius: '14px',
                        boxShadow: isSelected ? '0 4px 14px rgba(213, 230, 221, 0.6)' : '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span className="text-xl md:text-2xl flex-shrink-0">{cat.emoji}</span>
                      <span 
                        className={needsWrap ? "text-center leading-tight" : "whitespace-nowrap"}
                        style={needsWrap ? { lineHeight: '1.3' } : undefined}
                      >
                        {cat.name[language]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* JOUER Section */}
            <div className="flex flex-col items-start w-full gap-1.5 md:gap-0">
              <h3 
                className="text-sm md:text-lg tracking-wide mb-1 md:mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF' }}
              >
                <span className="text-base md:text-xl">🧠</span>
                {language === "fr" ? "ENTRAÎNEZ VOTRE MÉMOIRE" : "TRAIN YOUR MEMORY"}
              </h3>
              <div 
                ref={entrainerScrollRef}
                className="flex md:grid md:grid-cols-3 gap-2.5 md:gap-4 w-full overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {entrainerCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: isSelected ? 1.03 : 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectCategory(cat.id)}
                      className="flex-shrink-0 w-[45%] min-h-[52px] md:h-auto md:w-full border flex items-center justify-center gap-2 md:gap-2.5 px-3 md:px-4 py-2.5 md:py-3.5"
                      style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontWeight: 600, 
                        fontSize: '14px', 
                        color: '#1a2b1c',
                        backgroundColor: isSelected ? '#d5e6dd' : '#FFFFFF',
                        borderColor: isSelected ? '#b8d4c4' : '#E0E0E0',
                        borderRadius: '14px',
                        boxShadow: isSelected ? '0 4px 14px rgba(213, 230, 221, 0.6)' : '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.25s ease'
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
