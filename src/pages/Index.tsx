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
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("memory");

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
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden page-transition">
      {/* Hero Section with categories */}
      <HeroSection 
        language={language} 
        onToggleLanguage={handleToggleLanguage}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Quiz Levels */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Show Memory games section when Memory category is selected */}
          {(selectedCategory === null || selectedCategory === "memory") && (
            <>
              {/* Musical Memory Section */}
              <motion.section 
                className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    🎹
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {language === "fr" ? "Mémoire Musicale" : "Musical Memory"}
                  </h2>
                  <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
                </div>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Ce quiz de reproduction de suites sonores évalue la mémoire auditive séquentielle et la capacité à maintenir une information dans le temps court. La répétition progressive des motifs renforce les mécanismes d'anticipation et d'apprentissage implicite."
                    : "This sound sequence reproduction quiz evaluates sequential auditory memory and the ability to maintain information over a short period. The progressive repetition of patterns reinforces anticipation mechanisms and implicit learning."
                  }
                </p>
                
                {/* Mobile: vertical stack */}
                <div className="md:hidden flex flex-col gap-4 min-w-0">
                  {[1, 2, 3].map((level, index) => (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <MusicalMemoryCard level={level as 1 | 2 | 3} language={language} onPlay={handlePlayMusicalMemory} />
                    </motion.div>
                  ))}
                </div>
                
                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((level, index) => (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <MusicalMemoryCard level={level as 1 | 2 | 3} language={language} onPlay={handlePlayMusicalMemory} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Decorative separator */}
              <div className="section-divider my-10 sm:my-12">
                <span className="text-primary text-3xl">🌿</span>
              </div>

              {/* Memory Pairs Section */}
              <motion.section 
                className="memory-section mb-10 sm:mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 sm:py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    🌿
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {language === "fr" ? "Memory Plantes Médicinales" : "Medicinal Plant Memory"}
                  </h2>
                </div>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Ce quiz de reconnaissance de paires sollicite la mémoire de travail et la mémoire visuelle en mobilisant des processus d'attention soutenue et d'encodage rapide. La contrainte temporelle de 30 secondes favorise l'activation des mécanismes de consolidation et de récupération de l'information."
                    : "This pair recognition quiz engages working memory and visual memory by mobilizing sustained attention and rapid encoding processes. The 30-second time constraint promotes the activation of information consolidation and retrieval mechanisms."
                  }
                </p>
                
                {/* Mobile: vertical stack */}
                <div className="md:hidden flex flex-col gap-4 min-w-0">
                  {[1, 2, 3].map((level, index) => (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <MemoryPairsCard level={level as 1 | 2 | 3} language={language} onPlay={handlePlayMemoryPairs} />
                    </motion.div>
                  ))}
                </div>
                
                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((level, index) => (
                    <motion.div
                      key={level}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <MemoryPairsCard level={level as 1 | 2 | 3} language={language} onPlay={handlePlayMemoryPairs} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </>
          )}

          {/* Quizzes list */}
          {selectedCategory !== "memory" &&
            [1, 2, 3].map((level) => {
              const filteredQuizzes = selectedCategory
                ? quizzes.filter((q) => q.level === level && getCategoryForQuiz(q) === selectedCategory)
                : quizzes.filter((q) => q.level === level);

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