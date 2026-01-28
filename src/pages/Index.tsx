import { useState } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, Quiz } from "@/data/quizData";
import HeroSection from "@/components/brainfest/HeroSection";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MusicalMemoryCard from "@/components/brainfest/MusicalMemoryCard";
import MemoryPairsGame from "@/components/brainfest/MemoryPairsGame";
import MemoryPairsCard from "@/components/brainfest/MemoryPairsCard";
import Footer from "@/components/brainfest/Footer";

// Category type
type CategoryId = "micronutrition" | "biology" | "plants" | "memory";

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
  const [activeMemoryPairsLevel, setActiveMemoryPairsLevel] = useState<1 | 2 | 3 | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("memory"); // Default to memory category

  

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const handlePlayQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
  };

  const handlePlayMusicalMemory = (level: 1 | 2 | 3) => {
    setActiveMusicalMemoryLevel(level);
  };

  const handlePlayMemoryPairs = (level: 1 | 2 | 3) => {
    setActiveMemoryPairsLevel(level);
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
    setActiveMusicalMemoryLevel(null);
    setActiveMemoryPairsLevel(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  // Show Memory Pairs Game
  if (activeMemoryPairsLevel) {
    return (
      <MemoryPairsGame
        language={language}
        level={activeMemoryPairsLevel}
        onBack={handleBackToHome}
      />
    );
  }

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
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Hero Section with categories */}
      <HeroSection 
        language={language} 
        onToggleLanguage={handleToggleLanguage}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Quiz Levels */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pb-12 sm:pb-16 flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Show Memory games section when Memory category is selected */}
          {(selectedCategory === null || selectedCategory === "memory") && (
            <>
              {/* Musical Memory Section */}
              <section className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg sm:text-xl md:text-2xl flex-shrink-0">🎹</span>
                  <span className="truncate">{language === "fr" ? "Mémoire Musicale" : "Musical Memory"}</span>
                </h2>
                {/* Mobile: vertical stack */}
                <div className="md:hidden flex flex-col gap-4 min-w-0">
                  <MusicalMemoryCard level={1} language={language} onPlay={handlePlayMusicalMemory} />
                  <MusicalMemoryCard level={2} language={language} onPlay={handlePlayMusicalMemory} />
                  <MusicalMemoryCard level={3} language={language} onPlay={handlePlayMusicalMemory} />
                </div>
                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  <MusicalMemoryCard level={1} language={language} onPlay={handlePlayMusicalMemory} />
                  <MusicalMemoryCard level={2} language={language} onPlay={handlePlayMusicalMemory} />
                  <MusicalMemoryCard level={3} language={language} onPlay={handlePlayMusicalMemory} />
                </div>
              </section>

              {/* Visual separator - prominent line */}
              <div className="my-8 sm:my-10 flex items-center gap-4">
                <div className="flex-1 h-1 bg-primary/40 rounded-full"></div>
                <span className="text-primary text-3xl">🌿</span>
                <div className="flex-1 h-1 bg-primary/40 rounded-full"></div>
              </div>

              {/* Memory Pairs Section - with distinct green background */}
              <section className="mb-8 sm:mb-10 bg-primary/10 -mx-3 sm:-mx-4 px-3 sm:px-4 py-6 sm:py-8 rounded-2xl border-2 border-primary/30">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/30 flex items-center justify-center text-lg sm:text-xl md:text-2xl flex-shrink-0">🌿</span>
                  <span className="truncate">{language === "fr" ? "Memory Plantes Médicinales" : "Medicinal Plant Memory"}</span>
                </h2>
                {/* Explanatory text about memory type */}
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                  {language === "fr" 
                    ? "Ce jeu fait travailler votre mémoire visuo-spatiale : la capacité à mémoriser et retrouver la position d'éléments dans l'espace. En associant les plantes médicinales à leur emplacement, vous renforcez également votre mémoire de travail et votre concentration."
                    : "This game exercises your visuo-spatial memory: the ability to memorize and recall the position of elements in space. By associating medicinal plants with their location, you also strengthen your working memory and concentration."
                  }
                </p>
                {/* Mobile: vertical stack */}
                <div className="md:hidden flex flex-col gap-4 min-w-0">
                  <MemoryPairsCard level={1} language={language} onPlay={handlePlayMemoryPairs} />
                  <MemoryPairsCard level={2} language={language} onPlay={handlePlayMemoryPairs} />
                  <MemoryPairsCard level={3} language={language} onPlay={handlePlayMemoryPairs} />
                </div>
                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  <MemoryPairsCard level={1} language={language} onPlay={handlePlayMemoryPairs} />
                  <MemoryPairsCard level={2} language={language} onPlay={handlePlayMemoryPairs} />
                  <MemoryPairsCard level={3} language={language} onPlay={handlePlayMemoryPairs} />
                </div>
              </section>
            </>
          )}

          {/* Quizzes list (hidden when “Mémoire” is selected to avoid duplicating Level 2/3 under the Musical Memory cards) */}
          {selectedCategory !== "memory" &&
            [1, 2, 3].map((level) => {
              const filteredQuizzes = selectedCategory
                ? quizzes.filter((q) => q.level === level && getCategoryForQuiz(q) === selectedCategory)
                : quizzes.filter((q) => q.level === level);

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

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Index;
