import { Play, Volume2 } from "lucide-react";
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
    level1Desc: "3 exercices • 5 notes",
    level2Desc: "3 exercices • 7 notes",
    level3Desc: "3 exercices • 8 notes",
  },
  en: {
    title: "Musical Memory",
    level: "Level",
    discount: "discount",
    play: "Play",
    level1Desc: "3 exercises • 5 notes",
    level2Desc: "3 exercises • 7 notes",
    level3Desc: "3 exercises • 8 notes",
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
    <div className="quiz-card w-full max-w-full min-w-0 rounded-xl p-4 sm:p-6 md:p-8 border border-border relative overflow-hidden">
      {/* Musical Brain Icon */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <div className="relative">
          <BrainIcon className="molecule-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          <Volume2 className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <span className={`${getLevelBadgeClass()} text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-primary-foreground`}>
          {t.level} {level}
        </span>
        <span className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
          {getDiscount()} {t.discount}
        </span>
      </div>

      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-1 sm:mb-2 pr-14 sm:pr-16 break-words">
        {t.title}
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
        {getLevelDesc()}
      </p>

      <Button
        onClick={() => onPlay(level)}
        className="w-full min-w-0 overflow-hidden btn-primary-custom text-white font-medium hover:opacity-90 transition-opacity text-sm sm:text-base md:text-lg h-12 sm:h-14 md:h-16"
      >
        <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
        <span className="min-w-0 truncate">{t.play}</span>
      </Button>
    </div>
  );
};

export default MusicalMemoryCard;
