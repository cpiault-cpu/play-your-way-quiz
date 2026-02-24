import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Language } from "@/data/quizData";
import { getQuizBySlug } from "@/data/quizRegistry";
import ShareButton from "@/components/brainfest/ShareButton";
import GdprBanner from "@/components/brainfest/GdprBanner";

// Game components
import MicrobioteQuizGame from "@/components/brainfest/MicrobioteQuizGame";
import AntiInflammatoryQuizGame from "@/components/brainfest/AntiInflammatoryQuizGame";
import SardinesQuizGame from "@/components/brainfest/SardinesQuizGame";
import MicronutritionQuizGame from "@/components/brainfest/MicronutritionQuizGame";
import VitaminDQuizGame from "@/components/brainfest/VitaminDQuizGame";
import VitaminDLightQuizGame from "@/components/brainfest/VitaminDLightQuizGame";
import PlantsQuizGame from "@/components/brainfest/PlantsQuizGame";
import MusicalMemoryGame from "@/components/brainfest/MusicalMemoryGame";
import MemoryPairsGame from "@/components/brainfest/MemoryPairsGame";
import CarreCognitifGame from "@/components/brainfest/CarreCognitifGame";

const PROGRESS_KEYS: Record<string, string> = {
  microbiote: "microbiote_progress",
  "anti-inflammatory": "anti_inflammatory_progress",
  sardines: "sardines_progress",
  micronutrition: "micronutrition_progress",
  vitamind: "vitamind_progress",
  "vitamind-light": "vitamind_light_progress",
  plants: "plants_progress",
};

const QuizDirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [language] = useState<Language>("fr");
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const entry = slug ? getQuizBySlug(slug) : undefined;

  useEffect(() => {
    if (entry) {
      const key = PROGRESS_KEYS[entry.type];
      if (key) {
        try {
          const saved = localStorage.getItem(key);
          if (saved) setCompletedLevels(JSON.parse(saved));
        } catch { /* */ }
      }
    }
  }, [entry]);

  useEffect(() => {
    if (entry) {
      const key = PROGRESS_KEYS[entry.type];
      if (key && completedLevels.length > 0) {
        localStorage.setItem(key, JSON.stringify(completedLevels));
      }
    }
  }, [completedLevels, entry]);

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <p className="text-xl font-bold mb-4">Quiz introuvable 😕</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ backgroundColor: "#4A6741" }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const handleBack = () => navigate("/");

  const handleLevelComplete = (level: number) => {
    setCompletedLevels((prev) => [...new Set([...prev, level])]);
    if (level < entry.maxLevel) {
      setActiveLevel(level + 1);
    }
  };

  const shareUrl = `/quiz/${entry.slug}`;

  const renderGame = () => {
    switch (entry.type) {
      case "microbiote":
        return (
          <MicrobioteQuizGame
            level={activeLevel}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete}
          />
        );
      case "anti-inflammatory":
        return (
          <AntiInflammatoryQuizGame
            level={activeLevel}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete}
          />
        );
      case "sardines":
        return (
          <SardinesQuizGame
            level={activeLevel as 1 | 2 | 3 | 4}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete as any}
          />
        );
      case "micronutrition":
        return (
          <MicronutritionQuizGame
            level={activeLevel as 1 | 2 | 3}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete as any}
          />
        );
      case "vitamind":
        return (
          <VitaminDQuizGame
            level={activeLevel as 1 | 2 | 3}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete as any}
          />
        );
      case "vitamind-light":
        return (
          <VitaminDLightQuizGame
            level={activeLevel as 1 | 2 | 3 | 4}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete as any}
          />
        );
      case "plants":
        return (
          <PlantsQuizGame
            level={activeLevel as 1 | 2 | 3}
            language={language}
            onBack={handleBack}
            onLevelComplete={handleLevelComplete as any}
          />
        );
      case "memory-music":
        return (
          <MusicalMemoryGame
            level={activeLevel as 1 | 2 | 3}
            language={language}
            onBack={handleBack}
          />
        );
      case "memory-cards":
        return (
          <MemoryPairsGame
            level={activeLevel as 1 | 2 | 3}
            language={language}
            onBack={handleBack}
          />
        );
      case "carre-cognitif":
        return (
          <CarreCognitifGame
            language={language}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Share bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/30 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl flex-shrink-0">{entry.emoji}</span>
            <span
              className="font-bold text-sm truncate"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#2D3B2E" }}
            >
              {entry.title[language]}
            </span>
          </div>
          <ShareButton
            url={shareUrl}
            title={entry.title[language]}
            text={entry.description[language]}
            variant="full"
          />
        </div>
      </div>

      {/* Game */}
      {renderGame()}
    </div>
  );
};

export default QuizDirect;
