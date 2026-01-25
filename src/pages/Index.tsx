import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/data/quizData";
import WelcomeScreen from "@/components/quiz/WelcomeScreen";
import QuestionCard from "@/components/quiz/QuestionCard";
import ProgressBar from "@/components/quiz/ProgressBar";
import ResultsCard from "@/components/quiz/ResultsCard";

type GameState = "welcome" | "playing" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleStart = useCallback(() => {
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }, []);

  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (isAnswered) return;

      setSelectedAnswer(index);
      setIsAnswered(true);

      if (index === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    },
    [isAnswered, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      setGameState("results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isLastQuestion]);

  const handleRestart = useCallback(() => {
    setGameState("welcome");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {gameState === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WelcomeScreen
                onStart={handleStart}
                totalQuestions={quizQuestions.length}
              />
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={quizQuestions.length}
              />

              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onSelectAnswer={handleSelectAnswer}
              />

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-end"
                  >
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity btn-glow font-semibold"
                    >
                      {isLastQuestion ? "See Results" : "Next Question"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsCard
                score={score}
                total={quizQuestions.length}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
