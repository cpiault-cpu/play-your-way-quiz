import { Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/quizData";
import BrainIcon from "./icons/BrainIcon";

interface MusicalMemoryCardProps {
  level: 1 | 2 | 3;
  language: Language;
  onPlay: (level: 1 | 2 | 3) => void;
}

const translations = {
  fr: {
    title: "Mémoire Musicale",
    level: "Niveau",
    discount: "de réduction",
    play: "Jouer",
    level1Desc: "4 exercices d'une suite de 4 notes à deviner pour gagner. Entraînez votre mémoire auditive !",
    level2Desc: "4 exercices d'une suite de 5 notes à mémoriser. Un défi pour votre oreille musicale !",
    level3Desc: "4 exercices d'une suite de 8 notes à reproduire. Le niveau expert pour les virtuoses !",
  },
  en: {
    title: "Musical Memory",
    level: "Level",
    discount: "discount",
    play: "Play",
    level1Desc: "4 exercises with 4-note sequences to guess. Train your auditory memory!",
    level2Desc: "4 exercises with 5-note sequences to memorize. A challenge for your musical ear!",
    level3Desc: "4 exercises with 8-note sequences to reproduce. Expert level for virtuosos!",
  },
};

const MusicalMemoryCard = ({ level, language, onPlay }: MusicalMemoryCardProps) => {
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
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-6 sm:p-6 md:p-7 min-h-[45vh] md:min-h-0 flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Musical Brain Icon */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <BrainIcon className="molecule-icon w-16 h-16 md:w-16 md:h-16" />
          <Volume2 className="absolute -bottom-1 -right-1 w-6 h-6 md:w-5 md:h-5 text-primary" />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 md:mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-xs font-bold px-4 py-2 md:px-3 md:py-1.5 rounded-full text-white`}>
          {t.level} {level}
        </span>
        <span className="text-sm md:text-sm text-muted-foreground font-medium">
          {getDiscount()} {t.discount}
        </span>
      </div>

      <h3 className="text-xl md:text-xl font-bold text-foreground mb-3 md:mb-1 pr-16 break-words">
        {t.title}
      </h3>
      <p className="text-base md:text-sm text-muted-foreground mb-6 md:mb-5 flex-grow leading-relaxed">
        {getLevelDesc()}
      </p>

      <Button
        onClick={() => onPlay(level)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-base md:text-base py-4 md:py-3 rounded-xl"
      >
        <Play className="w-5 h-5 md:w-4 md:h-4 mr-2 flex-shrink-0" />
        <span className="min-w-0 truncate">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default MusicalMemoryCard;