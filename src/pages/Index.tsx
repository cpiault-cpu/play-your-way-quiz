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
      {/* Hero Section with background image only */}
      <section className="hero-section" />

      {/* Logo and text content below the background image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 py-8 text-center"
      >
        <a href="https://www.peita.fr" target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
          <img 
            src="/images/peita-logo.png" 
            alt="PEITA Logo" 
            className="h-12 md:h-14 object-contain mx-auto"
          />
        </a>

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <span>{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
            {t.title}
          </h1>
          <p className="text-base md:text-xl text-foreground/90 mb-3">
            {t.subtitle}
          </p>
          <p className="text-sm md:text-lg text-foreground/80 mb-3">
            {t.discountInfo}
          </p>
          <p className="text-sm md:text-base text-foreground/70 italic mb-6">
            {t.warning}
          </p>

          <button
            onClick={handleToggleLanguage}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-base md:text-lg rounded-full bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 transition-colors"
          >
            {language === "fr" ? "🇬🇧" : "🇫🇷"} {t.switchLang}
          </button>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {language === "fr" ? "Tous" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat.name[language]}
              {cat.subcategories && (
                <span className="ml-1 text-xs opacity-70">
                  ({cat.subcategories.map(s => s.name[language]).join(", ")})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Levels */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Show Musical Memory section when Memory category is selected or when showing all */}
          {(selectedCategory === null || selectedCategory === "memory") && (
            <section className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {language === "fr" ? "Mémoire Musicale" : "Musical Memory"} 
                <span className="text-sm font-normal text-muted-foreground">(Simon)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
