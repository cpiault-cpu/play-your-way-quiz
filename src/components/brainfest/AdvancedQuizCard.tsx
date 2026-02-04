import { Play, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Language } from "@/data/quizData";
import { getAdvancedQuiz, advancedQuizTranslations } from "@/data/advancedQuizData";
import { useQuizProgress } from "@/hooks/useQuizProgress";
import MoleculeIcon from "./icons/MoleculeIcon";
import PlantIcon from "./icons/PlantIcon";
import BiologyIcon from "./icons/BiologyIcon";

interface AdvancedQuizCardProps {
  category: "biology" | "plants";
  level: 1 | 2 | 3;
  language: Language;
  onPlay: (category: "biology" | "plants", level: 1 | 2 | 3) => void;
}

const AdvancedQuizCard = ({ category, level, language, onPlay }: AdvancedQuizCardProps) => {
  const t = advancedQuizTranslations[language];
  const quiz = getAdvancedQuiz(category, level);
  const { isLevelCompleted, getWrongQuestionIds } = useQuizProgress();
  
  const isCompleted = isLevelCompleted(category, level);
  const hasPreviousErrors = getWrongQuestionIds(category, level - 1).length > 0;

  const getLevelBadgeStyle = () => {
    switch (level) {
      case 1:
        return { backgroundColor: '#7FB3A3' }; // Green
      case 2:
        return { backgroundColor: '#E8A87C' }; // Orange
      case 3:
        return { backgroundColor: '#D17B7B' }; // Coral red
      default:
        return { backgroundColor: '#7FB3A3' };
    }
  };

  const getIcon = () => {
    const iconClass = "w-16 h-16 sm:w-20 sm:h-20";
    switch (category) {
      case 'biology':
        return <BiologyIcon className={iconClass} />;
      case 'plants':
        return <PlantIcon className={iconClass} />;
      default:
        return null;
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case "biology": return language === "fr" ? "Biologie" : "Biology";
      case "plants": return language === "fr" ? "Plantes médicinales" : "Medicinal Plants";
    }
  };

  if (!quiz) return null;

  return (
    <motion.div 
      className="quiz-card w-full max-w-full min-w-0 p-5 sm:p-6 h-full flex flex-col"
      style={{ borderRadius: '12px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
        <span 
          className="text-sm font-bold px-3 py-1.5 rounded-full text-white"
          style={{ ...getLevelBadgeStyle(), fontFamily: 'Montserrat, sans-serif' }}
        >
          {t.level} {level}
        </span>
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs text-success">
            <CheckCircle className="w-3.5 h-3.5" />
            {language === "fr" ? "Réussi" : "Completed"}
          </span>
        )}
        {level > 1 && hasPreviousErrors && (
          <span className="flex items-center gap-1 text-xs text-warning">
            <AlertTriangle className="w-3.5 h-3.5" />
            {language === "fr" ? "Questions pièges" : "Trap questions"}
          </span>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-snug break-words" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {getCategoryTitle()}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {language === "fr" 
          ? `4 questions • 10 secondes par question`
          : `4 questions • 10 seconds per question`
        }
      </p>

      {/* Icon */}
      <div className="flex-grow flex items-center justify-center py-3">
        {getIcon()}
      </div>

      <Button
        onClick={() => onPlay(category, level)}
        className="w-full min-w-0 text-white font-semibold text-base py-3 mt-auto"
        style={{ 
          backgroundColor: '#4A6741', 
          borderRadius: '12px',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Play className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="truncate min-w-0">
          {language === "fr" ? "Jouer" : "Play"}
        </span>
      </Button>
    </motion.div>
  );
};

export default AdvancedQuizCard;
