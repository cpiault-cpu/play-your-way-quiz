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
    level1Desc: "3 parties de 4 paires à retrouver en 30 secondes. Découvrez les plantes médicinales !",
    level2Desc: "3 parties de 6 paires à associer en 30 secondes. Testez votre mémoire visuelle !",
    level3Desc: "3 parties de 8 paires à identifier en 30 secondes. Le défi ultime des botanistes !",
  },
  en: {
    title: "Plant Memory",
    level: "Level",
    discount: "discount",
    play: "Play",
    level1Desc: "3 games with 4 pairs to find in 30 seconds. Discover medicinal plants!",
    level2Desc: "3 games with 6 pairs to match in 30 seconds. Test your visual memory!",
    level3Desc: "3 games with 8 pairs to identify in 30 seconds. The ultimate botanist challenge!",
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
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-6 sm:p-6 md:p-7 min-h-[45vh] md:min-h-0 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Plant Icon */}
      <div className="absolute top-4 right-4">
        <span className="text-5xl md:text-5xl">🌿</span>
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

export default MemoryPairsCard;