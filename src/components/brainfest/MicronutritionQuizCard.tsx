import { motion } from "framer-motion";
import { Brain, ChevronRight, Sparkles } from "lucide-react";
import { Language } from "@/data/quizData";

interface MicronutritionQuizCardProps {
  level: 1 | 2 | 3;
  language: Language;
  onPlay: (level: 1 | 2 | 3) => void;
  isCompleted?: boolean;
}

const MicronutritionQuizCard = ({ level, language, onPlay, isCompleted }: MicronutritionQuizCardProps) => {
  const getLevelConfig = () => {
    switch (level) {
      case 1:
        return {
          title: { fr: "Fondations", en: "Foundations" },
          description: { 
            fr: "Découvrez les bases essentielles de la micronutrition", 
            en: "Discover the essential basics of micronutrition" 
          },
          emoji: "🟢",
          color: "#7FB3A3",
          bgGradient: "from-emerald-50 to-teal-50"
        };
      case 2:
        return {
          title: { fr: "Consolidation", en: "Consolidation" },
          description: { 
            fr: "Renforcez vos connaissances nutritionnelles", 
            en: "Strengthen your nutritional knowledge" 
          },
          emoji: "🟠",
          color: "#E8A87C",
          bgGradient: "from-orange-50 to-amber-50"
        };
      case 3:
        return {
          title: { fr: "Maîtrise", en: "Mastery" },
          description: { 
            fr: "Atteignez le niveau expert en micronutrition", 
            en: "Reach expert level in micronutrition" 
          },
          emoji: "🔴",
          color: "#D17B7B",
          bgGradient: "from-red-50 to-rose-50"
        };
    }
  };

  const config = getLevelConfig();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-gradient-to-br ${config.bgGradient} rounded-2xl shadow-lg border border-border/30 overflow-hidden cursor-pointer`}
      onClick={() => onPlay(level)}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {language === "fr" ? "Validé" : "Completed"}
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.color}20` }}
          >
            <Brain className="w-6 h-6" style={{ color: config.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{config.emoji}</span>
              <h3 className="font-bold text-foreground">
                {language === "fr" ? `Niveau ${level}` : `Level ${level}`}
              </h3>
            </div>
            <p className="text-sm font-medium" style={{ color: config.color }}>
              {config.title[language]}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {config.description[language]}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            📖 15s {language === "fr" ? "lecture" : "reading"}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            ❓ 4 questions
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            🔄 {language === "fr" ? "Adaptatif" : "Adaptive"}
          </span>
        </div>

        {/* Play button */}
        <button
          className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ backgroundColor: "#4A6741" }}
        >
          {language === "fr" ? "Commencer" : "Start"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default MicronutritionQuizCard;
