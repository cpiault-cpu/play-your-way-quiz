import { useState } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, Quiz } from "@/data/quizData";
import HeroSection from "@/components/brainfest/HeroSection";
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
      {/* Hero Section with gradient background */}
      <HeroSection language={language} onToggleLanguage={handleToggleLanguage} />

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-4 py-8 md:py-10"
      >
        {/* Category Navigation - vertical on mobile, horizontal on desktop */}
        <div className="max-w-6xl mx-auto mb-8">
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
