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
      className="quiz-card w-full max-w-full min-w-0 rounded-2xl p-6 sm:p-6 h-full flex flex-col min-h-[45vh] md:min-h-0"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {getIcon()}
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 md:mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-xs font-bold px-4 py-2 md:px-3 md:py-1.5 rounded-full text-white`}>
          {t.level} {quiz.level}
        </span>
        <span className="text-sm md:text-sm text-muted-foreground font-medium">
          {quiz.discount} {t.discount}
        </span>
      </div>

      <h3 className="text-xl md:text-xl font-bold text-foreground mb-3 md:mb-2 pr-14 leading-snug break-words">
        {quiz.title[language]}
      </h3>
      {quiz.description && (
        <p className="text-base md:text-sm text-muted-foreground mb-6 md:mb-5 flex-grow leading-relaxed">
          {quiz.description[language]}
        </p>
      )}
      {!quiz.description && (
        <div className="flex-grow" />
      )}

      <Button
        onClick={() => onPlay(quiz.id)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-base md:text-base py-4 md:py-3 rounded-xl"
      >
        <Play className="w-5 h-5 md:w-4 md:h-4 mr-2 flex-shrink-0" />
        <span className="truncate min-w-0">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default QuizCard;