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
    level1Desc: "5 notes",
    level2Desc: "7 notes",
    level3Desc: "9 notes",
  },
  en: {
    title: "Musical Memory",
    level: "Level",
    discount: "discount",
    play: "Play",
    level1Desc: "5 notes",
    level2Desc: "7 notes",
    level3Desc: "9 notes",
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
    <div className="quiz-card rounded-xl p-6 md:p-8 border border-border relative overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      {/* Musical Brain Icon */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <BrainIcon className="molecule-icon w-16 h-16 md:w-20 md:h-20" />
          <Volume2 className="absolute -bottom-1 -right-1 w-6 h-6 text-primary" />
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-base font-semibold px-4 py-1.5 rounded-full text-primary-foreground`}>
          {t.level} {level}
        </span>
        <span className="text-base md:text-lg text-muted-foreground font-medium">
          {getDiscount()} {t.discount}
        </span>
      </div>

      <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-2">
        {t.title}
      </h3>
      <p className="text-base md:text-lg text-muted-foreground mb-6">
        {getLevelDesc()}
      </p>

      <Button
        onClick={() => onPlay(level)}
        className="w-full btn-primary-custom text-primary-foreground font-medium hover:opacity-90 transition-opacity text-base md:text-lg py-5 md:py-6"
      >
        <Play className="w-5 h-5 mr-2" />
        {t.play}
      </Button>
    </div>
  );
};

export default MusicalMemoryCard;
