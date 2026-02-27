import { useState, useEffect, useRef, useCallback } from "react";
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
import VitaminDLightQuizGame from "@/components/brainfest/VitaminDLightQuizGame";
import VitaminDLightQuizCard from "@/components/brainfest/VitaminDLightQuizCard";
import PlantsQuizGame from "@/components/brainfest/PlantsQuizGame";
import PlantsQuizCard from "@/components/brainfest/PlantsQuizCard";
import SardinesQuizGame from "@/components/brainfest/SardinesQuizGame";
import SardinesQuizCard from "@/components/brainfest/SardinesQuizCard";
import CarreCognitifGame from "@/components/brainfest/CarreCognitifGame";
import CarreCognitifCard from "@/components/brainfest/CarreCognitifCard";
import Footer from "@/components/brainfest/Footer";
import AntiInflammatoryQuizGame from "@/components/brainfest/AntiInflammatoryQuizGame";
import AntiInflammatoryQuizCard from "@/components/brainfest/AntiInflammatoryQuizCard";
import MicrobioteQuizGame from "@/components/brainfest/MicrobioteQuizGame";
import MicrobioteQuizCard from "@/components/brainfest/MicrobioteQuizCard";
import FishIcon from "@/components/brainfest/icons/FishIcon";

// Category type - updated to match new navigation
type CategoryId = "anti-inflammatory" | "micronutrition" | "micronutrition2" | "vitamind-light" | "plants" | "memory-music" | "memory-cards" | "sardines" | "carre-cognitif" | "microbiote";

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
const ANTI_INFLAMMATORY_PROGRESS_KEY = "anti_inflammatory_progress";
const MICROBIOTE_PROGRESS_KEY = "microbiote_progress";
const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [activeMusicalMemoryLevel, setActiveMusicalMemoryLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMemoryPairsLevel, setActiveMemoryPairsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeMicronutritionLevel, setActiveMicronutritionLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeVitaminDLevel, setActiveVitaminDLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeVitaminDLightLevel, setActiveVitaminDLightLevel] = useState<1 | 2 | 3 | 4 | null>(null);
  const [activePlantsLevel, setActivePlantsLevel] = useState<1 | 2 | 3 | null>(null);
  const [activeSardinesLevel, setActiveSardinesLevel] = useState<1 | 2 | 3 | 4 | null>(null);
  const [showCarreCognitif, setShowCarreCognitif] = useState(false);
  const [activeAntiInflammatoryLevel, setActiveAntiInflammatoryLevel] = useState<number | null>(null);
  const [activeMicrobioteLevel, setActiveMicrobioteLevel] = useState<number | null>(null);
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
  const [completedAntiInflammatoryLevels, setCompletedAntiInflammatoryLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(ANTI_INFLAMMATORY_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [completedMicrobioteLevels, setCompletedMicrobioteLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem(MICROBIOTE_PROGRESS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("memory-music");
  const quizContentRef = useRef<HTMLDivElement>(null);

  // Handle hash-based deep linking to categories (e.g. /#anti-inflammatory)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const validCategories: CategoryId[] = ["anti-inflammatory", "micronutrition", "micronutrition2", "vitamind-light", "plants", "memory-music", "memory-cards", "sardines", "carre-cognitif", "microbiote"];
      if (validCategories.includes(hash as CategoryId)) {
        setSelectedCategory(hash as CategoryId);
        setTimeout(() => {
          quizContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  const handleSelectCategory = useCallback((category: CategoryId | null) => {
    setSelectedCategory(category);
    if (category) {
      // Small delay to let the content render before scrolling
      setTimeout(() => {
        quizContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, []);

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

  useEffect(() => {
    localStorage.setItem(ANTI_INFLAMMATORY_PROGRESS_KEY, JSON.stringify(completedAntiInflammatoryLevels));
  }, [completedAntiInflammatoryLevels]);

  useEffect(() => {
    localStorage.setItem(MICROBIOTE_PROGRESS_KEY, JSON.stringify(completedMicrobioteLevels));
  }, [completedMicrobioteLevels]);

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

  const handlePlayMicrobiote = (level: number) => {
    setActiveMicrobioteLevel(level);
  };

  const handleMicrobioteLevelComplete = (level: number) => {
    setCompletedMicrobioteLevels(prev => [...new Set([...prev, level])]);
    if (level < 4) {
      setActiveMicrobioteLevel(level + 1);
    } else {
      setActiveMicrobioteLevel(null);
    }
  };


  const handlePlayMicronutrition = (level: 1 | 2 | 3) => {
    setActiveMicronutritionLevel(level);
  };

  const handlePlayVitaminD = (level: 1 | 2 | 3) => {
    setActiveVitaminDLevel(level);
  };

  const handlePlayVitaminDLight = (level: 1 | 2 | 3 | 4) => {
    setActiveVitaminDLightLevel(level);
  };

  const handlePlayPlants = (level: 1 | 2 | 3) => {
    setActivePlantsLevel(level);
  };

  const handlePlaySardines = (level: 1 | 2 | 3 | 4) => {
    setActiveSardinesLevel(level);
  };

  const handlePlayAntiInflammatory = (level: number) => {
    setActiveAntiInflammatoryLevel(level);
  };

  const handleAntiInflammatoryLevelComplete = (level: number) => {
    setCompletedAntiInflammatoryLevels(prev => [...new Set([...prev, level])]);
    if (level < 6) {
      setActiveAntiInflammatoryLevel(level + 1);
    } else {
      setActiveAntiInflammatoryLevel(null);
    }
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

  const handleVitaminDLightLevelComplete = (level: 1 | 2 | 3 | 4) => {
    if (level < 4) {
      setActiveVitaminDLightLevel((level + 1) as 1 | 2 | 3 | 4);
    } else {
      setActiveVitaminDLightLevel(null);
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
    setActiveVitaminDLightLevel(null);
    setActivePlantsLevel(null);
    setActiveSardinesLevel(null);
    setShowCarreCognitif(false);
    setActiveAntiInflammatoryLevel(null);
    setActiveMicrobioteLevel(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  // Show Microbiote Quiz Game
  if (activeMicrobioteLevel) {
    return (
      <MicrobioteQuizGame
        level={activeMicrobioteLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleMicrobioteLevelComplete}
      />
    );
  }

  // Show Anti-Inflammatory Quiz Game
  if (activeAntiInflammatoryLevel) {
    return (
      <AntiInflammatoryQuizGame
        level={activeAntiInflammatoryLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleAntiInflammatoryLevelComplete}
      />
    );
  }

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

  // Show Vitamin D Light Quiz Game
  if (activeVitaminDLightLevel) {
    return (
      <VitaminDLightQuizGame
        level={activeVitaminDLightLevel}
        language={language}
        onBack={handleBackToHome}
        onLevelComplete={handleVitaminDLightLevelComplete}
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

  // Show Carré Cognitif Game
  if (showCarreCognitif) {
    return (
      <CarreCognitifGame
        language={language}
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
        onSelectCategory={handleSelectCategory}
      />

      {/* Quiz Levels */}
      <main ref={quizContentRef} className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 flex-grow scroll-mt-4">
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
                    ? "Les oméga-3, surtout l'EPA et le DHA, sont des acides gras essentiels qui jouent un rôle clé dans le bon fonctionnement du cerveau.\n Ils favorisent la fluidité des membranes neuronales, ce qui améliore la communication entre les cellules cérébrales et soutient la mémoire à court et long terme. \nDes études montrent qu'un apport suffisant en oméga-3 peut aider à réduire le déclin cognitif lié à l'âge et à améliorer les capacités d'apprentissage. Une alimentation riche en oméga-3 ou une supplémentation adaptée peut donc être un atout pour préserver et optimiser les fonctions mémorielles.\n\nExplorez vos 5 types de mémoire à travers des images, des sons et des défis sensoriels. Découvrez votre profil mémoire dominant !"
                    : "Omega-3s, especially EPA and DHA, are essential fatty acids that play a key role in brain function.\n They promote the fluidity of neuronal membranes, which improves communication between brain cells and supports short and long-term memory. \nStudies show that a sufficient intake of omega-3s can help reduce age-related cognitive decline and improve learning abilities. A diet rich in omega-3s or appropriate supplementation can therefore be an asset to preserve and optimize memory functions.\n\nExplore your 5 types of memory through images, sounds and sensory challenges. Discover your dominant memory profile!"
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
                  {language === "fr" ? "VitD ça dépend" : "VitD it depends"}
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

          {/* Vitamin D Light Quiz - NEW "Que la lumière soit" Quiz */}
          {selectedCategory === "vitamind-light" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🌅
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Vitamine D, que la lumière soit" : "Vitamin D, let there be light"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl">
                  {language === "fr" 
                    ? "Faites la lumière sur les liens (un peu secrets) entre soleil, hormones et vitamine D."
                    : "Shed light on the (somewhat secret) links between sun, hormones and vitamin D."
                  }
                  <FishIcon className="inline-block w-5 h-5 ml-2 align-middle" color="#4A6741" />
                </p>
              </div>
              
              {/* Mobile: vertical stack */}
              <div className="md:hidden flex flex-col gap-4 min-w-0">
                {[1, 2, 3, 4].map((level, index) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <VitaminDLightQuizCard 
                      level={level as 1 | 2 | 3 | 4} 
                      language={language} 
                      onPlay={handlePlayVitaminDLight}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((level, index) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <VitaminDLightQuizCard 
                      level={level as 1 | 2 | 3 | 4} 
                      language={language} 
                      onPlay={handlePlayVitaminDLight}
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
                  {language === "fr" ? "Micronutrition 1" : "Micronutrition 1"}
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
                  {language === "fr" ? "Plantes santé" : "Health Plants"}
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

          {/* Anti-Inflammatory Quiz section */}
          {selectedCategory === "anti-inflammatory" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🔥
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Alimentation Anti-Inflammatoire" : "Anti-Inflammatory Diet"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr" 
                    ? "L'inflammation chronique, c'est comme un feu qui couve. Heureusement, certains aliments agissent comme des pompiers. Voici un test de connaissance en plusieurs niveaux.\nLe parcours s'adapte à vous : chaque niveau tient compte de vos réponses précédentes."
                    : "Chronic inflammation is like a smoldering fire. Fortunately, certain foods act as firefighters. Here is a multi-level knowledge test.\nThe path adapts to you: each level takes your previous answers into account."
                  }
                </p>
              </div>
              
              {/* Mobile: vertical stack */}
              <div className="md:hidden flex flex-col gap-4 min-w-0">
                {[1, 2, 3, 4, 5, 6].map((lvl, index) => (
                  <motion.div key={lvl} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <AntiInflammatoryQuizCard 
                      level={lvl} language={language} onPlay={handlePlayAntiInflammatory}
                      isCompleted={completedAntiInflammatoryLevels.includes(lvl)} />
                  </motion.div>
                ))}
              </div>
              
              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((lvl, index) => (
                  <motion.div key={lvl} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <AntiInflammatoryQuizCard 
                      level={lvl} language={language} onPlay={handlePlayAntiInflammatory}
                      isCompleted={completedAntiInflammatoryLevels.includes(lvl)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Microbiote Quiz section */}
          {selectedCategory === "microbiote" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🦠
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Microbiote : Le Grand Safari Intérieur" : "Microbiota: The Great Inner Safari"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr"
                    ? "🌿 Explorez votre jungle microbienne niveau par niveau !\n\nImaginez une forêt tropicale miniature logée dans vos intestins : 100 000 milliards de locataires y vivent, travaillent et communiquent en secret. Prêt·e à rencontrer vos alliés invisibles ?\n\nBienvenue dans l'aventure microbienne ! Ici, chaque bactérie a son rôle. Certaines fabriquent vos vitamines, d'autres boostent vos défenses, et les plus audacieuses chuchotent même à votre cerveau !"
                    : "🌿 Explore your microbial jungle level by level!\n\nImagine a miniature tropical forest living in your intestines: 100 trillion tenants live, work and communicate in secret. Ready to meet your invisible allies?\n\nWelcome to the microbial adventure! Here, every bacterium has its role. Some make your vitamins, others boost your defenses, and the boldest even whisper to your brain!"
                  }
                </p>
              </div>
              
              {/* Mobile: vertical stack */}
              <div className="md:hidden flex flex-col gap-4 min-w-0">
                {[1, 2, 3, 4].map((lvl, index) => (
                  <motion.div key={lvl} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <MicrobioteQuizCard 
                      level={lvl} language={language} onPlay={handlePlayMicrobiote}
                      isCompleted={completedMicrobioteLevels.includes(lvl)} />
                  </motion.div>
                ))}
              </div>
              
              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((lvl, index) => (
                  <motion.div key={lvl} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <MicrobioteQuizCard 
                      level={lvl} language={language} onPlay={handlePlayMicrobiote}
                      isCompleted={completedMicrobioteLevels.includes(lvl)} />
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
                  {language === "fr" ? "Sardines, Sardines, Mais pourquoi ?" : "Sardines, Sardines, But why?"}
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

          {/* Carré Cognitif section - in JOUER category */}
          {selectedCategory === "carre-cognitif" && (
            <motion.section 
              className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  🧩
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {language === "fr" ? "Le Carré Cognitif" : "The Cognitive Square"}
                </h2>
                <div className="flex-1 h-px bg-border/50 ml-2 hidden sm:block" />
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border/30">
                <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                  {language === "fr"
                    ? "🧩 Un puzzle visuel pour stimuler votre logique et votre déduction.\n\nComplétez la grille en respectant une règle invisible. Mémoire de travail, reconnaissance de motifs, intelligence fluide... Découvrez le pouvoir de votre cerveau !"
                    : "🧩 A visual puzzle to stimulate your logic and deduction.\n\nComplete the grid following an invisible rule. Working memory, pattern recognition, fluid intelligence... Discover the power of your brain!"
                  }
                </p>
              </div>
              
              {/* Carré Cognitif Card */}
              <div className="max-w-md mx-auto">
                <CarreCognitifCard 
                  language={language} 
                  onPlay={() => setShowCarreCognitif(true)}
                />
              </div>
            </motion.section>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer language={language} />
      
      
    </div>
  );
};

export default Index;
