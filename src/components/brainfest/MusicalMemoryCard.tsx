import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/quizData";
import MusicNoteIcon from "./icons/MusicNoteIcon";

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

  const getDiscountText = () => {
    const discounts = { 1: "5%", 2: "10%", 3: "15%" };
    const value = discounts[level];
    return language === "fr" ? `gagnez ${value}` : `win ${value}`;
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
      className="quiz-card card-green-bg w-full max-w-full min-w-0 p-6 sm:p-6 md:p-7 min-h-[50vh] md:min-h-0 flex flex-col"
      style={{ borderRadius: '12px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-xs font-bold px-4 py-2 md:px-3 md:py-1.5 rounded-full text-white`}>
          {t.level} {level}
        </span>
        <span className="text-sm md:text-sm text-muted-foreground font-medium">
          {getDiscountText()}
        </span>
      </div>

      <h3 className="text-xl md:text-xl font-bold text-foreground mb-3 md:mb-2 break-words">
        {t.title}
      </h3>
      <p className="text-base md:text-sm text-muted-foreground mb-4 leading-relaxed">
        {getLevelDesc()}
      </p>

      {/* Large icon centered below description */}
      <div className="flex-grow flex items-center justify-center py-4">
        <MusicNoteIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
      </div>

      <Button
        onClick={() => onPlay(level)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-base md:text-base py-4 md:py-3 mt-auto"
        style={{ borderRadius: '12px' }}
      >
        <Play className="w-5 h-5 md:w-4 md:h-4 mr-2 flex-shrink-0" />
        <span className="min-w-0 truncate">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default MusicalMemoryCard;
