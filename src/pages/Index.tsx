import { useState } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, Quiz } from "@/data/quizData";
import { healthQuizSeries, HealthQuizSeriesId } from "@/data/healthQuizData";
import { micronutritionQuizzes } from "@/data/micronutritionQuizData";
import HeroSection from "@/components/brainfest/HeroSection";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MusicalMemoryCard from "@/components/brainfest/MusicalMemoryCard";
import MemoryPairsGame from "@/components/brainfest/MemoryPairsGame";
import MemoryPairsCard from "@/components/brainfest/MemoryPairsCard";
import HealthQuizGame from "@/components/brainfest/HealthQuizGame";
import HealthQuizCard from "@/components/brainfest/HealthQuizCard";
import MicronutritionQuizCard from "@/components/brainfest/MicronutritionQuizCard";
import MicronutritionQuizGame from "@/components/brainfest/MicronutritionQuizGame";
import PremiumSection from "@/components/brainfest/PremiumSection";
import Footer from "@/components/brainfest/Footer";

// Category type - updated to match new navigation
type CategoryId = "micronutrition" | "biology" | "plants" | "memory-music" | "memory-cards" | "health-quiz";

// Map quiz categories to our category IDs
const getCategoryForQuiz = (quiz: Quiz): "micronutrition" | "biology" | "plants" => {
  const category = quiz.category.en.toLowerCase();
  if (category.includes("micronutrition")) return "micronutrition";
  if (category.includes("biology") && !category.includes("music")) return "biology";
  if (category.includes("plant")) return "plants";
  return "micronutrition";
};

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [activeMusicalMemoryLevel, setActiveMusicalMemoryLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMemoryPairsLevel, setActiveMemoryPairsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeHealthQuizLevel, setActiveHealthQuizLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeHealthQuizSeries, setActiveHealthQuizSeries] = useState<HealthQuizSeriesId>('nutrition');
  const [activeMicronutritionLevel, setActiveMicronutritionLevel] = useState<"1.1" | "1.2" | "1.3" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("memory-music");

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

  const handlePlayHealthQuiz = (level: 1 | 2 | 3, seriesId?: HealthQuizSeriesId) => {
    setActiveHealthQuizLevel(level);
    setActiveHealthQuizSeries(seriesId || 'nutrition');
  };

  const handlePlayMicronutritionQuiz = (levelId: "1.1" | "1.2" | "1.3") => {
    setActiveMicronutritionLevel(levelId);
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
    setActiveMusicalMemoryLevel(null);
    setActiveMemoryPairsLevel(null);
    setActiveHealthQuizLevel(null);
    setActiveMicronutritionLevel(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  // Show Micronutrition Quiz Game
  if (activeMicronutritionLevel) {
    return (
      <MicronutritionQuizGame
        levelId={activeMicronutritionLevel}
        language={language}
        onBack={handleBackToHome}
      />
    );
  }

  // Show Health Quiz Game
  if (activeHealthQuizLevel) {
    return (
      <HealthQuizGame
        language={language}
        level={activeHealthQuizLevel}
        seriesId={activeHealthQuizSeries}
        onBack={handleBackToHome}
      />
    );
  }

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
          {/* Show Musical Memory section when memory-music is selected */}
          {selectedCategory === "memory-music" && (
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
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Ce quiz de reproduction de suites sonores évalue la mémoire auditive séquentielle et la capacité à maintenir une information dans le temps court. La répétition progressive des motifs renforce les mécanismes d'anticipation et d'apprentissage implicite."
                    : "This sound sequence reproduction quiz evaluates sequential auditory memory and the ability to maintain information over a short period. The progressive repetition of patterns reinforces anticipation mechanisms and implicit learning."
                  }
                </p>
              </div>
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
          )}

          {/* Show Memory Pairs section when memory-cards is selected */}
          {selectedCategory === "memory-cards" && (
            <motion.section 
              className="memory-section mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 sm:py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🃏
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {language === "fr" ? "Memory Cartes" : "Memory Cards"}
                </h2>
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Ce quiz de reconnaissance de paires sollicite la mémoire de travail et la mémoire visuelle en mobilisant des processus d'attention soutenue et d'encodage rapide. La contrainte temporelle de 30 secondes favorise l'activation des mécanismes de consolidation et de récupération de l'information."
                    : "This pair recognition quiz engages working memory and visual memory by mobilizing sustained attention and rapid encoding processes. The 30-second time constraint promotes the activation of information consolidation and retrieval mechanisms."
                  }
                </p>
              </div>
              
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
          )}

          {/* Show Health Quiz section when health-quiz is selected */}
          {selectedCategory === "health-quiz" && (
            <>
              {/* Series 1: Nutriments essentiels */}
              <motion.section 
                className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    ❤️
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {healthQuizSeries[0].title[language]}
                  </h2>
                  <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
                </div>
                
                {/* Description */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                    {healthQuizSeries[0].description[language]}
                  </p>
                </div>
                
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
                      <HealthQuizCard level={level as 1 | 2 | 3} language={language} seriesId="nutrition" onPlay={handlePlayHealthQuiz} />
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
                      <HealthQuizCard level={level as 1 | 2 | 3} language={language} seriesId="nutrition" onPlay={handlePlayHealthQuiz} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Series 2: Mitochondrie */}
              <motion.section 
                className="mb-10 sm:mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 sm:py-10 bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-100 rounded-none sm:rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-200 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    ⚡
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {healthQuizSeries[1].title[language]}
                  </h2>
                  <div className="flex-1 h-px bg-orange-200 ml-2 hidden sm:block" />
                </div>
                
                {/* Description */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-orange-200">
                  <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                    {healthQuizSeries[1].description[language]}
                  </p>
                </div>
                
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
                      <HealthQuizCard level={level as 1 | 2 | 3} language={language} seriesId="mitochondria" onPlay={handlePlayHealthQuiz} />
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
                      <HealthQuizCard level={level as 1 | 2 | 3} language={language} seriesId="mitochondria" onPlay={handlePlayHealthQuiz} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </>
          )}

          {/* Biology category intro */}
          {selectedCategory === "biology" && (
            <motion.div
              className="mt-8 sm:mt-10 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Rien n'est plus merveilleux que les rouages du vivant, et explorer ce qui se passe sous la surface. Si le sujet vous passionne comme nous, ces quiz vont vous plaire."
                    : "Nothing is more wonderful than the inner workings of life, and exploring what happens beneath the surface. If you're as passionate about this subject as we are, you'll love these quizzes."
                  }
                </p>
              </div>
            </motion.div>
          )}

          {/* Micronutrition category - NEW STRUCTURE */}
          {selectedCategory === "micronutrition" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  💊
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {language === "fr" ? "Micronutrition" : "Micronutrition"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Comment vitamines, minéraux et oligo-éléments influencent chaque fonction du corps. Ces équilibres invisibles qui nous soutiennent chaque jour. Affinez vos connaissances pour avoir des échanges encore plus intéressants quand vous discutez avec votre naturopathe."
                    : "How vitamins, minerals and trace elements influence every function of the body. These invisible balances that support us every day. Sharpen your knowledge to have even more interesting conversations with your naturopath."
                  }
                </p>
              </div>

              {/* Mobile: vertical stack */}
              <div className="md:hidden flex flex-col gap-4 min-w-0">
                {(["1.1", "1.2", "1.3"] as const).map((levelId, index) => (
                  <motion.div
                    key={levelId}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <MicronutritionQuizCard 
                      levelId={levelId} 
                      language={language} 
                      onPlay={handlePlayMicronutritionQuiz} 
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(["1.1", "1.2", "1.3"] as const).map((levelId, index) => (
                  <motion.div
                    key={levelId}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <MicronutritionQuizCard 
                      levelId={levelId} 
                      language={language} 
                      onPlay={handlePlayMicronutritionQuiz} 
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Plants category intro */}
          {selectedCategory === "plants" && (
            <motion.div
              className="mt-8 sm:mt-10 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Les plantes médicinales murmurent depuis toujours leurs secrets à ceux qui savent les écouter."
                    : "Medicinal plants have always whispered their secrets to those who know how to listen."
                  }
                </p>
              </div>
            </motion.div>
          )}

          {/* Quizzes list - for Biology and Plants categories only */}
          {(selectedCategory === "biology" || selectedCategory === "plants") &&
            [1, 2, 3].map((level) => {
              const filteredQuizzes = quizzes.filter((q) => q.level === level && getCategoryForQuiz(q) === selectedCategory);

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

      {/* Premium Section */}
      <PremiumSection language={language} />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Index;
