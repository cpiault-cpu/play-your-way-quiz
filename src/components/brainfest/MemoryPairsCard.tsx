import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/quizData";

interface MemoryPairsCardProps {
  level: 1 | 2 | 3;
  language: Language;
  onPlay: (level: 1 | 2 | 3) => void;
}

const translations = {
  fr: {
    title: "Memory Plantes",
    level: "Niveau",
    discount: "de réduction",
    play: "Jouer",
    level1Desc: "3 parties • 4 paires • 30 sec",
    level2Desc: "3 parties • 6 paires • 30 sec",
    level3Desc: "3 parties • 8 paires • 30 sec",
  },
  en: {
    title: "Plant Memory",
    level: "Level",
    discount: "discount",
    play: "Play",
    level1Desc: "3 games • 4 pairs • 30 sec",
    level2Desc: "3 games • 6 pairs • 30 sec",
    level3Desc: "3 games • 8 pairs • 30 sec",
  },
};

const MemoryPairsCard = ({ level, language, onPlay }: MemoryPairsCardProps) => {
  const t = translations[language];

  const getLevelBadgeClass = () => {
    switch (level) {
      case 1:
        return "level-badge-1";
      case 2:
        return "level-badge-2";
      case 3:
        return "level-badge-3";
      default:
        return "level-badge-1";
    }
  };

  const getDiscount = () => {
    switch (level) {
      case 1: return "5%";
      case 2: return "10%";
      case 3: return "15%";
    }
  };

  const getLevelDesc = () => {
    switch (level) {
      case 1: return t.level1Desc;
      case 2: return t.level2Desc;
      case 3: return t.level3Desc;
    }
  };

  return (
    <motion.div 
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-5 sm:p-6 md:p-7"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Plant Icon */}
      <div className="absolute top-4 right-4">
        <span className="text-4xl sm:text-5xl">🌿</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-xs font-bold px-3 py-1.5 rounded-full text-white`}>
          {t.level} {level}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          {getDiscount()} {t.discount}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 pr-16 break-words">
        {t.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        {getLevelDesc()}
      </p>

      <Button
        onClick={() => onPlay(level)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-sm sm:text-base py-3 rounded-xl"
      >
        <Play className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="min-w-0 truncate">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default MemoryPairsCard;