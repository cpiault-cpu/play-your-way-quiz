import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, Quiz } from "@/data/quizData";
import HeroSection from "@/components/brainfest/HeroSection";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MusicalMemoryCard from "@/components/brainfest/MusicalMemoryCard";
import MemoryPairsGame from "@/components/brainfest/MemoryPairsGame";
import MemoryPairsCard from "@/components/brainfest/MemoryPairsCard";
import MicronutritionQuizGame from "@/components/brainfest/MicronutritionQuizGame";
import MicronutritionQuizCard from "@/components/brainfest/MicronutritionQuizCard";
import VitaminDQuizGame from "@/components/brainfest/VitaminDQuizGame";
import VitaminDQuizCard from "@/components/brainfest/VitaminDQuizCard";
import PlantsQuizGame from "@/components/brainfest/PlantsQuizGame";
import PlantsQuizCard from "@/components/brainfest/PlantsQuizCard";
import SardinesQuizGame from "@/components/brainfest/SardinesQuizGame";
import SardinesQuizCard from "@/components/brainfest/SardinesQuizCard";
import Footer from "@/components/brainfest/Footer";
import GdprBanner from "@/components/brainfest/GdprBanner";

// Category type - updated to match new navigation
type CategoryId = "micronutrition" | "micronutrition2" | "plants" | "memory-music" | "memory-cards" | "sardines";

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
const SARDINES_PROGRESS_KEY = "sardines_progress";

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [activeMusicalMemoryLevel, setActiveMusicalMemoryLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMemoryPairsLevel, setActiveMemoryPairsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMicronutritionLevel, setActiveMicronutritionLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeVitaminDLevel, setActiveVitaminDLevel] = useState<1 | 2 | 3 | null>(null);
  const [activePlantsLevel, setActivePlantsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeSardinesLevel, setActiveSardinesLevel] = useState<1 | 2 | 3 | 4 | null>(null);
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
  const [completedSardinesLevels, setCompletedSardinesLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(SARDINES_PROGRESS_KEY);
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

  // Save sardines progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SARDINES_PROGRESS_KEY, JSON.stringify(completedSardinesLevels));
  }, [completedSardinesLevels]);

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


  const handlePlayMicronutrition = (level: 1 | 2 | 3) => {
    setActiveMicronutritionLevel(level);
  };

  const handlePlayVitaminD = (level: 1 | 2 | 3) => {
    setActiveVitaminDLevel(level);
  };

  const handlePlayPlants = (level: 1 | 2 | 3) => {
    setActivePlantsLevel(level);
  };

  const handlePlaySardines = (level: 1 | 2 | 3 | 4) => {
    setActiveSardinesLevel(level);
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

  const handleSardinesLevelComplete = (level: 1 | 2 | 3 | 4) => {
    setCompletedSardinesLevels(prev => [...new Set([...prev, level])]);
    if (level < 4) {
      setActiveSardinesLevel((level + 1) as 1 | 2 | 3 | 4);
    } else {
      setActiveSardinesLevel(null);
    }
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
    setActiveMusicalMemoryLevel(null);
    setActiveMemoryPairsLevel(null);
    setActiveMicronutritionLevel(null);
    setActiveVitaminDLevel(null);
    setActivePlantsLevel(null);
    setActiveSardinesLevel(null);
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

  // Show Sardines Quiz Game
  if (activeSardinesLevel) {
    return (
      <SardinesQuizGame
        level={activeSardinesLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleSardinesLevelComplete}
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
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr" 
                    ? "Écoutez, captez, jouez la suite… Comme le vent qui siffle entre les rochers ou les vagues qui dessinent leur rythme sur le sable, reproduisez ces enchaînements de notes pour réveiller votre oreille musicale. Un exercice malin pour aiguiser votre mémoire et transformer chaque essai en une petite victoire. Prêt à devenir le maestro de votre propre partition ?"
                    : "Let the notes guide you… Like the wind weaving through the dunes or the ocean sketching rhythms on the shore, listen closely and replay these musical sequences. A playful way to sharpen your ear and trust your instincts no sheet music, just pure intuition. Ready to conduct your memory like a hidden symphony?"
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
                <p className="text-sm sm:text-base text-gray-900 leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr" 
                    ? "Retrouvez les paires dissimulées en mobilisant votre mémoire visuelle et votre capacité à garder en tête plusieurs éléments à la fois.\nLe compte à rebours de 30 secondes n'est pas une course… mais une façon naturelle de réveiller votre mémoire."
                    : "Find the hidden pairs by using your visual memory and your ability to keep several elements in mind at once.\nThe 30-second countdown is not a race… but a natural way to awaken your memory."
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
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr" 
                    ? "Un texte, un défi, et c'est parti ! Lisez un petit texte à votre rythme, laissez-le s'imprégner comme des petites sardines dans leur huile d'olive… Puis, vérifiez ce que vous en avez retenu avec quelques questions bien choisies. Si les réponses ne sont pas toutes là, pas de souci : le texte se réinvente, s'enrichit, et revient avec de nouveaux détails pour vous accompagner."
                    : "Read. Soak it in. Test yourself! Take a moment with a short text, let it marinate like sardines in olive oil. Then, check what sticks with a few quick questions. If the answers don't all click, no problem: the text reinvents itself, adds new layers, and comes back to help you sharpen your recall. Because learning, like a well-preserved delicacy, only gets better with time."
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
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr" 
                    ? "Laissez les herbes murmurer. Elles savent des choses que Google ignore encore.\nDécouvrez, mémorisez, puis redécouvrez ces plantes qui soignent et gardent leurs secrets.\n\nAvancez à votre rythme, porté par une brise légère qui s'accorde au souffle des feuilles… et au vôtre."
                    : "Let the herbs whisper. They know things Google still doesn't.\nDiscover, memorize, then rediscover these healing plants that keep their secrets.\n\nMove at your own pace, carried by a gentle breeze that matches the breath of the leaves… and yours."
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

          {/* Sardines Quiz section */}
          {selectedCategory === "sardines" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🐟
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Petites Sardines" : "Little Sardines"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr"
                    ? "🐟 Plongez dans l'univers de la sardine ! De la saison de pêche à la conservation, en passant par les oméga-3 et les protéines, devenez expert de ce trésor nutritionnel.\n\nUn quiz en 4 niveaux pour découvrir tous les secrets de ce petit poisson extraordinaire."
                    : "🐟 Dive into the world of sardines! From fishing season to conservation, through omega-3s and proteins, become an expert on this nutritional treasure.\n\nA 4-level quiz to discover all the secrets of this extraordinary little fish."
                  }
                </p>
              </div>
              
              {/* Sardines Card with 4 levels */}
              <div className="max-w-md mx-auto">
                <SardinesQuizCard 
                  language={language} 
                  completedLevels={completedSardinesLevels}
                  onSelectLevel={handlePlaySardines}
                />
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
