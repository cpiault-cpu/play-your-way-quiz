import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, Quiz } from "@/data/quizData";
import { healthQuizSeries, HealthQuizSeriesId } from "@/data/healthQuizData";
import HeroSection from "@/components/brainfest/HeroSection";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MusicalMemoryCard from "@/components/brainfest/MusicalMemoryCard";
import MemoryPairsGame from "@/components/brainfest/MemoryPairsGame";
import MemoryPairsCard from "@/components/brainfest/MemoryPairsCard";
import HealthQuizGame from "@/components/brainfest/HealthQuizGame";
import HealthQuizCard from "@/components/brainfest/HealthQuizCard";
import MicronutritionQuizGame from "@/components/brainfest/MicronutritionQuizGame";
import MicronutritionQuizCard from "@/components/brainfest/MicronutritionQuizCard";
import VitaminDQuizGame from "@/components/brainfest/VitaminDQuizGame";
import VitaminDQuizCard from "@/components/brainfest/VitaminDQuizCard";
import PlantsQuizGame from "@/components/brainfest/PlantsQuizGame";
import PlantsQuizCard from "@/components/brainfest/PlantsQuizCard";
import Footer from "@/components/brainfest/Footer";
import GdprBanner from "@/components/brainfest/GdprBanner";

// Category type - updated to match new navigation
type CategoryId = "micronutrition" | "micronutrition2" | "plants" | "memory-music" | "memory-cards" | "health-quiz";

// Map quiz categories to our category IDs
const getCategoryForQuiz = (quiz: Quiz): "micronutrition" | "micronutrition2" | "plants" => {
  const category = quiz.category.en.toLowerCase();
  if (category.includes("micronutrition")) return "micronutrition";
  if (category.includes("plant")) return "plants";
  return "micronutrition";
};

const MICRONUTRITION_PROGRESS_KEY = "micronutrition_progress";
const VITAMIND_PROGRESS_KEY = "vitamind_progress";
const PLANTS_PROGRESS_KEY = "plants_progress";

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [activeMusicalMemoryLevel, setActiveMusicalMemoryLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMemoryPairsLevel, setActiveMemoryPairsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeHealthQuizLevel, setActiveHealthQuizLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeHealthQuizSeries, setActiveHealthQuizSeries] = useState<HealthQuizSeriesId>('nutrition');
  const [activeMicronutritionLevel, setActiveMicronutritionLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeVitaminDLevel, setActiveVitaminDLevel] = useState<1 | 2 | 3 | null>(null);
  const [activePlantsLevel, setActivePlantsLevel] = useState<1 | 2 | 3 | null>(null);
  const [completedMicronutritionLevels, setCompletedMicronutritionLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(MICRONUTRITION_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [completedVitaminDLevels, setCompletedVitaminDLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(VITAMIND_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [completedPlantsLevels, setCompletedPlantsLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(PLANTS_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("memory-music");

  // Save micronutrition progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(MICRONUTRITION_PROGRESS_KEY, JSON.stringify(completedMicronutritionLevels));
  }, [completedMicronutritionLevels]);

  // Save vitamin D progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(VITAMIND_PROGRESS_KEY, JSON.stringify(completedVitaminDLevels));
  }, [completedVitaminDLevels]);

  // Save plants progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PLANTS_PROGRESS_KEY, JSON.stringify(completedPlantsLevels));
  }, [completedPlantsLevels]);

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

  const handlePlayMicronutrition = (level: 1 | 2 | 3) => {
    setActiveMicronutritionLevel(level);
  };

  const handlePlayVitaminD = (level: 1 | 2 | 3) => {
    setActiveVitaminDLevel(level);
  };

  const handlePlayPlants = (level: 1 | 2 | 3) => {
    setActivePlantsLevel(level);
  };

  const handleMicronutritionLevelComplete = (level: 1 | 2 | 3) => {
    setCompletedMicronutritionLevels(prev => [...new Set([...prev, level])]);
    if (level < 3) {
      setActiveMicronutritionLevel((level + 1) as 1 | 2 | 3);
    } else {
      setActiveMicronutritionLevel(null);
    }
  };

  const handleVitaminDLevelComplete = (level: 1 | 2 | 3) => {
    setCompletedVitaminDLevels(prev => [...new Set([...prev, level])]);
    if (level < 3) {
      setActiveVitaminDLevel((level + 1) as 1 | 2 | 3);
    } else {
      setActiveVitaminDLevel(null);
    }
  };

  const handlePlantsLevelComplete = (level: 1 | 2 | 3) => {
    setCompletedPlantsLevels(prev => [...new Set([...prev, level])]);
    if (level < 3) {
      setActivePlantsLevel((level + 1) as 1 | 2 | 3);
    } else {
      setActivePlantsLevel(null);
    }
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
    setActiveMusicalMemoryLevel(null);
    setActiveMemoryPairsLevel(null);
    setActiveHealthQuizLevel(null);
    setActiveMicronutritionLevel(null);
    setActiveVitaminDLevel(null);
    setActivePlantsLevel(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  // Show Micronutrition Quiz Game
  if (activeMicronutritionLevel) {
    return (
      <MicronutritionQuizGame
        level={activeMicronutritionLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleMicronutritionLevelComplete}
      />
    );
  }

  // Show Vitamin D Quiz Game
  if (activeVitaminDLevel) {
    return (
      <VitaminDQuizGame
        level={activeVitaminDLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleVitaminDLevelComplete}
      />
    );
  }

  // Show Plants Quiz Game
  if (activePlantsLevel) {
    return (
      <PlantsQuizGame
        level={activePlantsLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handlePlantsLevelComplete}
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

          {/* Micronutrition 2 (Vitamin D) category */}
          {selectedCategory === "micronutrition2" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  ☀️
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Micronutrition 2 : Vitamine D" : "Micronutrition 2: Vitamin D"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Renforcez votre mémoire active sur la vitamine D : ses rôles, ses sources et ses carences. Un quiz adaptatif qui s'ajuste à votre niveau."
                    : "Strengthen your active memory on vitamin D: its roles, sources and deficiencies. An adaptive quiz that adjusts to your level."
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
                    <VitaminDQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayVitaminD}
                      isCompleted={completedVitaminDLevels.includes(level)}
                    />
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
                    <VitaminDQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayVitaminD}
                      isCompleted={completedVitaminDLevels.includes(level)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Micronutrition category - NEW ADAPTIVE QUIZ */}
          {selectedCategory === "micronutrition" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🧠
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Micronutrition" : "Micronutrition"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Un entraînement cérébral évolutif basé sur la mémorisation active. Lisez, mémorisez, et testez vos connaissances. Si vous n'obtenez pas 4/4, le texte est reformulé pour renforcer votre apprentissage."
                    : "An evolving brain training based on active memorization. Read, memorize, and test your knowledge. If you don't get 4/4, the text is reformulated to reinforce your learning."
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
                    <MicronutritionQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayMicronutrition}
                      isCompleted={completedMicronutritionLevels.includes(level)}
                    />
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
                    <MicronutritionQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayMicronutrition}
                      isCompleted={completedMicronutritionLevels.includes(level)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Plants category - NEW ADAPTIVE QUIZ */}
          {selectedCategory === "plants" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🌿
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Plantes médicinales" : "Medicinal Plants"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Renforcez votre mémoire sur les plantes médicinales, leurs usages traditionnels et leurs principes actifs. Un quiz adaptatif qui s'ajuste à votre niveau."
                    : "Strengthen your memory on medicinal plants, their traditional uses and active ingredients. An adaptive quiz that adjusts to your level."
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
                    <PlantsQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayPlants}
                      isCompleted={completedPlantsLevels.includes(level)}
                    />
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
                    <PlantsQuizCard 
                      level={level as 1 | 2 | 3} 
                      language={language} 
                      onPlay={handlePlayPlants}
                      isCompleted={completedPlantsLevels.includes(level)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer language={language} />
      
      {/* GDPR Banner */}
      <GdprBanner language={language} />
    </div>
  );
};

export default Index;
