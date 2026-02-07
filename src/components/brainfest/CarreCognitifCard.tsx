import { motion } from "framer-motion";
import { Language } from "@/data/quizData";
import { uiTexts, levelColors } from "@/data/carreCognitifData";

interface CarreCognitifCardProps {
  language: Language;
  onPlay: () => void;
}

const CarreCognitifCard = ({ language, onPlay }: CarreCognitifCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-border/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      style={{ borderRadius: "12px" }}
    >
      <div className="p-6 flex flex-col items-center text-center">
        {/* Icon */}
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: "#1E90FF20", borderRadius: "50%" }}
        >
          <span className="text-4xl">🧠</span>
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold text-foreground mb-2"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {uiTexts.gameTitle[language]}
        </h3>

        {/* Description */}
        <p 
          className="text-sm text-muted-foreground mb-4 leading-relaxed"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {language === "fr" 
            ? "Un puzzle visuel inspiré du sudoku. Complétez la grille en respectant la règle invisible."
            : "A visual puzzle inspired by sudoku. Complete the grid following the invisible rule."
          }
        </p>

        {/* Mini grid preview */}
        <div className="grid grid-cols-4 gap-1 mb-4 p-2 bg-gray-50 rounded-lg" style={{ borderRadius: "8px" }}>
          {["🐟", "🫒", "☀️", "🧠"].map((symbol, i) => (
            <div 
              key={i}
              className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-lg"
              style={{ borderRadius: "4px" }}
            >
              {symbol}
            </div>
          ))}
          {["☀️", "🧠", "🐟", "🫒"].map((symbol, i) => (
            <div 
              key={i + 4}
              className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-lg"
              style={{ borderRadius: "4px" }}
            >
              {symbol}
            </div>
          ))}
          {["🫒", "🐟", "🧠", "?"].map((symbol, i) => (
            <div 
              key={i + 8}
              className={`w-8 h-8 flex items-center justify-center rounded border text-lg ${symbol === "?" ? "bg-blue-50 border-blue-300 text-blue-600 font-bold" : "bg-white border-gray-200"}`}
              style={{ borderRadius: "4px" }}
            >
              {symbol}
            </div>
          ))}
          {["🧠", "☀️", "🫒", "🐟"].map((symbol, i) => (
            <div 
              key={i + 12}
              className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-lg"
              style={{ borderRadius: "4px" }}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* Levels preview */}
        <div className="flex gap-1.5 mb-6">
          {Object.entries(levelColors).slice(0, 5).map(([level, color]) => (
            <span 
              key={level}
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }} 
              title={`Niveau ${level}`} 
            />
          ))}
        </div>

        {/* Play button */}
        <motion.button
          onClick={onPlay}
          className="w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-3 transition-all"
          style={{ 
            backgroundColor: "#1E90FF",
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            borderRadius: '12px'
          }}
          whileHover={{ scale: 1.02, backgroundColor: "#1873CC" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl">🧩</span>
          {uiTexts.buttonText[language]}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CarreCognitifCard;
