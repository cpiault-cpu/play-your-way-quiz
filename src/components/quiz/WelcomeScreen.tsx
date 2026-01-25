import { motion } from "framer-motion";
import { Play, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

const WelcomeScreen = ({ onStart, totalQuestions }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow"
      >
        <Brain className="w-14 h-14 text-primary-foreground" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4"
      >
        Quiz Time
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-muted-foreground mb-8 max-w-md mx-auto"
      >
        Test your knowledge with {totalQuestions} challenging questions. Ready to begin?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity btn-glow font-semibold text-lg px-8 py-6"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Quiz
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 flex justify-center gap-8 text-muted-foreground"
      >
        <div className="text-center">
          <div className="text-3xl font-display font-bold text-foreground">{totalQuestions}</div>
          <div className="text-sm">Questions</div>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <div className="text-3xl font-display font-bold text-foreground">∞</div>
          <div className="text-sm">Attempts</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
