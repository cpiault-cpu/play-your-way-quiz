import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/quizData";
import { micronutritionTranslations, micronutritionQuizzes } from "@/data/micronutritionQuizData";
import MoleculeIcon from "./icons/MoleculeIcon";

interface MicronutritionQuizCardProps {
  levelId: "1.1" | "1.2" | "1.3";
  language: Language;
  onPlay: (levelId: "1.1" | "1.2" | "1.3") => void;
}

const MicronutritionQuizCard = ({ levelId, language, onPlay }: MicronutritionQuizCardProps) => {
  const t = micronutritionTranslations[language];
  const quiz = micronutritionQuizzes.find(q => q.levelId === levelId);
  
  if (!quiz) return null;

  const getLevelBadgeClass = () => {
    switch (levelId) {
      case "1.1":
        return "level-badge-1";
      case "1.2":
        return "level-badge-2";
      case "1.3":
        return "level-badge-3";
      default:
        return "level-badge-1";
    }
  };

  return (
    <motion.div 
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-6 sm:p-6 md:p-7 min-h-[50vh] md:min-h-0 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-xs font-bold px-4 py-2 md:px-3 md:py-1.5 rounded-full text-white`}>
          {t.level} {levelId}
        </span>
      </div>

      <h3 className="text-xl md:text-xl font-bold text-foreground mb-3 md:mb-2 break-words">
        {quiz.title[language]}
      </h3>
      <p className="text-base md:text-sm text-muted-foreground mb-4 leading-relaxed">
        {quiz.subtitle[language]}
      </p>

      {/* Large icon centered below description */}
      <div className="flex-grow flex items-center justify-center py-4">
        <MoleculeIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
      </div>

      <Button
        onClick={() => onPlay(levelId)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-base md:text-base py-4 md:py-3 rounded-xl mt-auto"
      >
        <Play className="w-5 h-5 md:w-4 md:h-4 mr-2 flex-shrink-0" />
        <span className="min-w-0 truncate">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default MicronutritionQuizCard;
