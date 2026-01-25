import { motion } from "framer-motion";
import { Trophy, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultsCard = ({ score, total, onRestart }: ResultsCardProps) => {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 💪";
    return "Better Luck Next Time! 🍀";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="quiz-card rounded-2xl p-8 md:p-12 border border-border text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
      >
        <Trophy className="w-12 h-12 text-primary-foreground" />
      </motion.div>

      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
        {getMessage()}
      </h2>

      <p className="text-muted-foreground text-lg mb-8">
        You've completed the quiz
      </p>

      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Star
              className={`w-8 h-8 ${
                i < score
                  ? "text-primary fill-primary"
                  : "text-muted-foreground"
              }`}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-muted rounded-xl p-6 mb-8"
      >
        <div className="text-5xl font-display font-bold text-foreground mb-2">
          {score}/{total}
        </div>
        <div className="text-muted-foreground">
          {percentage}% Correct
        </div>
      </motion.div>

      <Button
        onClick={onRestart}
        size="lg"
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity btn-glow font-semibold text-lg px-8"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Play Again
      </Button>
    </motion.div>
  );
};

export default ResultsCard;
