import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Quiz, Language, translations } from "@/data/quizData";
import MoleculeIcon from "./icons/MoleculeIcon";
import PlantIcon from "./icons/PlantIcon";
import MusicIcon from "./icons/MusicIcon";
import BiologyIcon from "./icons/BiologyIcon";

interface QuizCardProps {
  quiz: Quiz;
  language: Language;
  onPlay: (quizId: string) => void;
}

const QuizCard = ({ quiz, language, onPlay }: QuizCardProps) => {
  const t = translations[language];

  const getLevelBadgeClass = () => {
    switch (quiz.level) {
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

  const getIcon = () => {
    const iconClass = "molecule-icon w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 absolute top-4 right-4";
    switch (quiz.icon) {
      case 'molecule':
        return <MoleculeIcon className={iconClass} />;
      case 'plant':
        return <PlantIcon className={iconClass} />;
      case 'music':
        return <MusicIcon className={iconClass} />;
      case 'biology':
        return <BiologyIcon className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-5 sm:p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {getIcon()}
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-xs font-bold px-3 py-1.5 rounded-full text-white`}>
          {t.level} {quiz.level}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          {quiz.discount} {t.discount}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-5 pr-14 leading-snug break-words">
        {quiz.title[language]}
      </h3>

      <Button
        onClick={() => onPlay(quiz.id)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-sm sm:text-base py-3 rounded-xl"
      >
        <Play className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate min-w-0">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default QuizCard;