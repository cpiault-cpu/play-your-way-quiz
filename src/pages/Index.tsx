import { useState } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, translations, Quiz } from "@/data/quizData";
import Header from "@/components/brainfest/Header";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MusicalMemoryCard from "@/components/brainfest/MusicalMemoryCard";

// Category definitions
type CategoryId = "micronutrition" | "biology" | "plants" | "memory";

interface Category {
  id: CategoryId;
  name: { fr: string; en: string };
  subcategories?: { id: string; name: { fr: string; en: string } }[];
}

const categories: Category[] = [
  { id: "micronutrition", name: { fr: "Micronutrition", en: "Micronutrition" } },
  { id: "biology", name: { fr: "Biologie", en: "Biology" } },
  { id: "plants", name: { fr: "Plantes médicinales", en: "Medicinal Plants" } },
  { 
    id: "memory", 
    name: { fr: "Mémoire", en: "Memory" },
    subcategories: [
      { id: "music", name: { fr: "Musique", en: "Music" } }
    ]
  },
];

// Map quiz categories to our category IDs
const getCategoryForQuiz = (quiz: Quiz): CategoryId => {
  const category = quiz.category.en.toLowerCase();
  if (category.includes("micronutrition")) return "micronutrition";
  if (category.includes("biology") && !category.includes("music")) return "biology";
  if (category.includes("plant")) return "plants";
  if (category.includes("music")) return "memory";
  return "micronutrition";
};

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [activeMusicalMemoryLevel, setActiveMusicalMemoryLevel] = useState<1 | 2 | 3 | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);

  const t = translations[language];

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const handlePlayQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
  };

  const handlePlayMusicalMemory = (level: 1 | 2 | 3) => {
    setActiveMusicalMemoryLevel(level);
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
    setActiveMusicalMemoryLevel(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  // Show Musical Memory Game
  if (activeMusicalMemoryLevel) {
    return (
      <MusicalMemoryGame
        language={language}
        level={activeMusicalMemoryLevel}
        onBack={handleBackToHome}
      />
    );
  }

  // Show regular Quiz Game
  if (activeQuiz) {
    return (
      <QuizGame
        quiz={activeQuiz}
        language={language}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with background image */}
      <section className="hero-section relative">
        {/* Floating content on hero for mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <a 
            href="https://www.peita.fr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-logo bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl"
          >
            <img 
              src="/images/peita-logo.png" 
              alt="PEITA Logo" 
              className="h-14 md:h-20 object-contain"
            />
          </a>
        </motion.div>
      </section>

      {/* Main content section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-4 py-8 md:py-10"
      >
        {/* Title and intro - larger for visibility */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
            {t.title}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-foreground/80 mb-3">
            {t.subtitle}
          </p>
          <p className="text-sm md:text-lg text-primary font-semibold mb-3">
            🎁 {t.discountInfo}
          </p>
          <p className="text-sm md:text-base text-muted-foreground italic mb-5">
            {t.warning}
          </p>

          <button
            onClick={handleToggleLanguage}
            className="inline-flex items-center gap-2 px-5 py-3 text-2xl md:text-3xl rounded-full bg-primary/10 hover:bg-primary/20 transition-all shadow-md hover:shadow-lg active:scale-95"
            aria-label={t.switchLang}
          >
            {language === "fr" ? "🇬🇧" : "🇫🇷"}
          </button>
        </div>

        {/* Category Navigation - vertical on mobile, horizontal on desktop */}
        <div className="mb-8">
          {/* Mobile: vertical stack */}
          <div className="flex flex-col gap-2 md:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`w-full px-5 py-4 rounded-xl text-lg font-semibold shadow-sm transition-all text-left ${
                  selectedCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.id === "micronutrition" && "💊 "}
                {cat.id === "biology" && "🧬 "}
                {cat.id === "plants" && "🌿 "}
                {cat.id === "memory" && "🎵 "}
                {cat.name[language]}
              </button>
            ))}
          </div>
          
          {/* Desktop: horizontal centered */}
          <div className="hidden md:flex gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-3 rounded-full text-lg font-semibold shadow-sm transition-all ${
                selectedCategory === null 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {language === "fr" ? "✨ Tous" : "✨ All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-full text-lg font-semibold shadow-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.id === "micronutrition" && "💊 "}
                {cat.id === "biology" && "🧬 "}
                {cat.id === "plants" && "🌿 "}
                {cat.id === "memory" && "🎵 "}
                {cat.name[language]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quiz Levels */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Show Musical Memory section when Memory category is selected or when showing all */}
          {(selectedCategory === null || selectedCategory === "memory") && (
            <section className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-5 flex items-center gap-3">
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl md:text-2xl">🎹</span>
                {language === "fr" ? "Mémoire Musicale" : "Musical Memory"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                <MusicalMemoryCard level={1} language={language} onPlay={handlePlayMusicalMemory} />
                <MusicalMemoryCard level={2} language={language} onPlay={handlePlayMusicalMemory} />
                <MusicalMemoryCard level={3} language={language} onPlay={handlePlayMusicalMemory} />
              </div>
            </section>
          )}

          {/* Filter quizzes by category if selected */}
          {[1, 2, 3].map((level) => {
            const filteredQuizzes = selectedCategory 
              ? quizzes.filter(q => q.level === level && getCategoryForQuiz(q) === selectedCategory)
              : quizzes.filter(q => q.level === level);
            
            // Don't show empty level sections
            if (filteredQuizzes.length === 0) return null;
            
            return (
              <LevelSection
                key={level}
                level={level as 1 | 2 | 3}
                quizzes={filteredQuizzes}
                language={language}
                onPlayQuiz={handlePlayQuiz}
              />
            );
          })}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
