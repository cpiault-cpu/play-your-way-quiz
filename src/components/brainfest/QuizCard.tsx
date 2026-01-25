import { Play, ExternalLink } from "lucide-react";
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
    switch (quiz.icon) {
      case 'molecule':
        return <MoleculeIcon className="molecule-icon w-16 h-16 absolute top-4 right-4" />;
      case 'plant':
        return <PlantIcon className="molecule-icon w-16 h-16 absolute top-4 right-4" />;
      case 'music':
        return <MusicIcon className="molecule-icon w-16 h-16 absolute top-4 right-4" />;
      case 'biology':
        return <BiologyIcon className="molecule-icon w-16 h-16 absolute top-4 right-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="quiz-card rounded-xl p-6 border border-border relative overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      {getIcon()}
      
      <div className="flex items-center gap-3 mb-4">
        <span className={`${getLevelBadgeClass()} text-xs font-semibold px-3 py-1 rounded-full text-primary-foreground`}>
          {t.level} {quiz.level}
        </span>
        <span className="text-sm text-muted-foreground">
          {quiz.discount} {t.discount}
        </span>
      </div>

      <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
        {quiz.title[language]}
      </h3>

      <div className="space-y-3">
        <Button
          onClick={() => onPlay(quiz.id)}
          className="w-full btn-primary-custom text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4 mr-2" />
          {t.play}
        </Button>

        <Button
          variant="outline"
          className="w-full border-border text-foreground hover:bg-muted"
          asChild
        >
          <a href="https://www.peita.fr/boutique" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t.visitShop}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
