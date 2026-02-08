import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Language } from "@/data/quizData";
import FishIcon from "./icons/FishIcon";

interface SardinesQuizCardProps {
  language: Language;
  completedLevels: number[];
  onSelectLevel: (level: 1 | 2 | 3 | 4) => void;
}

const SardinesQuizCard = ({ language, completedLevels, onSelectLevel }: SardinesQuizCardProps) => {
  const levels = [
    { 
      level: 1 as const, 
      label: { fr: "Fondations", en: "Foundations" },
      color: "#A8E6CF"
    },
    { 
      level: 2 as const, 
      label: { fr: "Conservation", en: "Conservation" },
      color: "#FFD3B6"
    },
    { 
      level: 3 as const, 
      label: { fr: "Maîtrise", en: "Mastery" },
      color: "#B5EAD7"
    },
    { 
      level: 4 as const, 
      label: { fr: "Expert", en: "Expert" },
      color: "#D4B5E8"
    }
  ];

  const isLevelUnlocked = (level: number) => {
    if (level === 1) return true;
    return completedLevels.includes(level - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="card-green-bg rounded-2xl shadow-xl overflow-hidden"
      style={{ borderRadius: '12px' }}
    >
      {/* Header with fish icon */}
      <div className="bg-gradient-to-r from-[#A8E6CF] via-[#B5EAD7] to-[#D4B5E8] p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <FishIcon className="w-12 h-12" color="#4A6741" />
          <h3 className="text-2xl font-bold text-gray-800">
            {language === "fr" ? "Petites Sardines" : "Little Sardines"}
          </h3>
          <FishIcon className="w-12 h-12 transform scale-x-[-1]" color="#4A6741" />
        </div>
        <p className="text-gray-700 text-sm">
          {language === "fr" 
            ? "Découvrez les secrets nutritionnels de ce petit poisson extraordinaire"
            : "Discover the nutritional secrets of this extraordinary little fish"
          }
        </p>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-border/30">
        <p className="text-gray-600 text-sm leading-relaxed text-center">
          {language === "fr"
            ? "🐟 Plongez dans l'univers de la sardine ! De la saison de pêche à la conservation, en passant par les oméga-3 et les protéines, devenez expert de ce trésor nutritionnel."
            : "🐟 Dive into the world of sardines! From fishing season to conservation, through omega-3s and proteins, become an expert on this nutritional treasure."
          }
        </p>
      </div>

      {/* Levels grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {levels.map((levelData, index) => {
          const isUnlocked = isLevelUnlocked(levelData.level);
          const isCompleted = completedLevels.includes(levelData.level);

          return (
            <motion.button
              key={levelData.level}
              onClick={() => isUnlocked && onSelectLevel(levelData.level)}
              disabled={!isUnlocked}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${isUnlocked 
                  ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' 
                  : 'cursor-not-allowed opacity-50'
                }
                ${isCompleted 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-white'
                }
              `}
              style={{
                borderColor: isCompleted ? '#22c55e' : isUnlocked ? levelData.color : '#e5e7eb'
              }}
              whileHover={isUnlocked ? { scale: 1.02 } : {}}
              whileTap={isUnlocked ? { scale: 0.98 } : {}}
            >
              {/* Level badge */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2 mx-auto"
                style={{ backgroundColor: levelData.color }}
              >
                {levelData.level}
              </div>
              
              <span className="text-sm font-medium text-gray-800 block">
                {levelData.label[language]}
              </span>

              {isCompleted && (
                <span className="absolute top-2 right-2 text-green-500 text-lg">✓</span>
              )}

              {!isUnlocked && (
                <span className="absolute top-2 right-2 text-gray-400 text-lg">🔒</span>
              )}

              {isUnlocked && !isCompleted && (
                <ChevronRight className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>{completedLevels.length}/4</span>
          <div className="flex-1 max-w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#A8E6CF] to-[#D4B5E8] transition-all duration-500"
              style={{ width: `${(completedLevels.length / 4) * 100}%` }}
            />
          </div>
          <span>{language === "fr" ? "niveaux" : "levels"}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SardinesQuizCard;
