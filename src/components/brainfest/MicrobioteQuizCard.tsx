import { motion } from "framer-motion";
import { Bug, ChevronRight, Sparkles } from "lucide-react";
import { Language } from "@/data/quizData";

interface MicrobioteQuizCardProps {
  level: number;
  language: Language;
  onPlay: (level: number) => void;
  isCompleted?: boolean;
}

const MicrobioteQuizCard = ({ level, language, onPlay, isCompleted }: MicrobioteQuizCardProps) => {
  const getLevelConfig = () => {
    switch (level) {
      case 1: return { title: { fr: "Carte d'identité", en: "ID Card" }, emoji: "🌱", color: "#7FB3A3" };
      case 2: return { title: { fr: "Guerre des bactéries", en: "Bacteria War" }, emoji: "⚔️", color: "#E8A87C" };
      case 3: return { title: { fr: "Dysbiose alimentaire", en: "Dietary Dysbiosis" }, emoji: "🔥", color: "#D17B7B" };
      case 4: return { title: { fr: "Axe intestin-cerveau", en: "Gut-Brain Axis" }, emoji: "🧠", color: "#8B5CF6" };
      default: return { title: { fr: "Niveau", en: "Level" }, emoji: "🌱", color: "#7FB3A3" };
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
      {isCompleted && (
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {language === "fr" ? "Validé" : "Completed"}
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.color}20` }}
          >
            <Bug className="w-6 h-6" style={{ color: config.color }} />
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

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            📖 16s {language === "fr" ? "lecture" : "reading"}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            ⏱ 10s {language === "fr" ? "réponse" : "answer"}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/70 text-muted-foreground">
            🔄 {language === "fr" ? "Adaptatif" : "Adaptive"}
          </span>
        </div>

        <button
          className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ backgroundColor: "#4A6741" }}
        >
          {language === "fr" ? "Explorer" : "Explore"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default MicrobioteQuizCard;
