import { motion } from "framer-motion";
import { Sunrise, ChevronRight, Sparkles } from "lucide-react";
import { Language } from "@/data/quizData";

interface VitaminDLightQuizCardProps {
  level: 1 | 2 | 3 | 4;
  language: Language;
  onPlay: (level: 1 | 2 | 3 | 4) => void;
  isCompleted?: boolean;
}

const VitaminDLightQuizCard = ({ level, language, onPlay, isCompleted }: VitaminDLightQuizCardProps) => {
  const getLevelConfig = () => {
    switch (level) {
      case 1:
        return {
          title: { fr: "Circadien & lumière", en: "Circadian & Light" },
          description: { 
            fr: "Découvrez les liens entre lumière et hormones", 
            en: "Discover the links between light and hormones" 
          },
          emoji: "🟢",
          color: "#4CAF50"
        };
      case 2:
        return {
          title: { fr: "Cholestérol & Vitamine D", en: "Cholesterol & Vitamin D" },
          description: { 
            fr: "Approfondissez la biochimie de la vitamine D", 
            en: "Deepen your knowledge of vitamin D biochemistry" 
          },
          emoji: "🟠",
          color: "#FF9800"
        };
      case 3:
        return {
          title: { fr: "Cortisol & Thyroïde", en: "Cortisol & Thyroid" },
          description: { 
            fr: "Explorez les interactions entre cortisol et thyroïde", 
            en: "Explore interactions between cortisol and thyroid" 
          },
          emoji: "🔵",
          color: "#2196F3"
        };
      case 4:
        return {
          title: { fr: "Intégration endocrinienne", en: "Endocrine Integration" },
          description: { 
            fr: "Maîtrisez le réseau hormonal complet", 
            en: "Master the complete hormonal network" 
          },
          emoji: "🟣",
          color: "#9C27B0"
        };
    }
  };

  const config = getLevelConfig();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative card-green-bg rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      onClick={() => onPlay(level)}
      style={{ fontFamily: 'Montserrat, sans-serif', borderRadius: '12px' }}
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
            <Sunrise className="w-6 h-6" style={{ color: config.color }} />
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
            ⏱️ 10s {language === "fr" ? "réponse" : "answer"}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            📚 {language === "fr" ? "Source PubMed" : "PubMed Source"}
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

export default VitaminDLightQuizCard;
