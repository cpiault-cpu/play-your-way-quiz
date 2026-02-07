import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { uiTexts } from "@/data/intelligenceSardinesQuizData";
import FishIcon from "./icons/FishIcon";

interface IntelligenceSardinesQuizCardProps {
  language: Language;
  onPlay: () => void;
}

const IntelligenceSardinesQuizCard = ({ language, onPlay }: IntelligenceSardinesQuizCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-border/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
    >
      <div className="p-6 flex flex-col items-center text-center">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "#1E90FF20" }}
        >
          <FishIcon className="w-12 h-12" color="#1E90FF" />
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold text-foreground mb-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {uiTexts.quizTitle[language]}
        </h3>

        {/* Description */}
        <p 
          className="text-sm text-muted-foreground mb-6 leading-relaxed"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {language === "fr" 
            ? "5 niveaux pour tester votre intelligence nutritionnelle. Observation, déduction, et pensée systémique."
            : "5 levels to test your nutritional intelligence. Observation, deduction, and systems thinking."
          }
        </p>

        {/* Levels preview */}
        <div className="flex gap-2 mb-6">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#98FB98" }} title="Niveau 1" />
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF7F50" }} title="Niveau 2" />
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#5F9EA0" }} title="Niveau 3" />
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#DDA0DD" }} title="Niveau 4" />
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#8B0000" }} title="Niveau 5" />
        </div>

        {/* Play button */}
        <motion.button
          onClick={onPlay}
          className="w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-3 transition-all"
          style={{ 
            backgroundColor: "#1E90FF",
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px'
          }}
          whileHover={{ scale: 1.02, backgroundColor: "#1873CC" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl">🐟</span>
          {uiTexts.buttonText[language]}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default IntelligenceSardinesQuizCard;
