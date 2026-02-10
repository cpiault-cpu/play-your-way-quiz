import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Language } from "@/data/quizData";
import FishIcon from "./icons/FishIcon";

interface SardinesPromoBubbleProps {
  language: Language;
  onNavigateToSardines: () => void;
}

const PROMO_DISMISSED_KEY = "sardines_promo_dismissed";

const SardinesPromoBubble = ({ language, onNavigateToSardines }: SardinesPromoBubbleProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Always show the promo on every page load/refresh
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible(false);
    onNavigateToSardines();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={handleClick}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 cursor-pointer max-w-[90vw] sm:max-w-md"
        >
          {/* Bubble */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl px-5 py-4 shadow-2xl border-2 border-white/30"
            style={{
              background: "linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FishIcon className="w-10 h-10" color="white" />
                </motion.div>
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base leading-tight">
                  {language === "fr"
                    ? "🎉 Gagnez 15% de réduction sur votre commande en réussissant tous les niveaux de ce questionnaire !"
                    : "🎉 Win 15% off your order by completing all levels of this quiz!"}
                </p>
                <p className="text-cyan-100 text-xs mt-1 font-medium">
                  {language === "fr"
                    ? "Cliquez ici pour jouer →"
                    : "Click here to play →"}
                </p>
              </div>
            </div>

            {/* Arrow pointing down */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "12px solid transparent",
                  borderRight: "12px solid transparent",
                  borderTop: "12px solid #06b6d4",
                }}
              />
            </div>
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ border: "2px solid #22d3ee" }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SardinesPromoBubble;
