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
  
  const getDiscountText = () => {
    const discountValue = quiz.discount;
    return language === "fr" ? `gagnez ${discountValue}` : `win ${discountValue}`;
  };

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
    const iconClass = "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28";
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
      className="quiz-card w-full max-w-full min-w-0 p-6 sm:p-6 h-full flex flex-col min-h-[50vh] md:min-h-0"
      style={{ borderRadius: '12px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-sm md:text-xs font-bold px-4 py-2 md:px-3 md:py-1.5 rounded-full text-white`}>
          {t.level} {quiz.level}
        </span>
        <span className="text-sm md:text-sm text-muted-foreground font-medium">
          {getDiscountText()}
        </span>
      </div>

      <h3 className="text-xl md:text-xl font-bold text-foreground mb-3 md:mb-2 leading-snug break-words">
        {quiz.title[language]}
      </h3>
      
      {quiz.description && (
        <p className="text-base md:text-sm text-muted-foreground mb-4 leading-relaxed">
          {quiz.description[language]}
        </p>
      )}

      {/* Large icon centered below description */}
      <div className="flex-grow flex items-center justify-center py-4">
        {getIcon()}
      </div>

      <Button
        onClick={() => onPlay(quiz.id)}
        className="w-full min-w-0 btn-primary-custom text-white font-semibold text-base md:text-base py-4 md:py-3 mt-auto"
        style={{ borderRadius: '12px' }}
      >
        <Play className="w-5 h-5 md:w-4 md:h-4 mr-2 flex-shrink-0" />
        <span className="truncate min-w-0">{t.play}</span>
      </Button>
    </motion.div>
  );
};

export default QuizCard;
