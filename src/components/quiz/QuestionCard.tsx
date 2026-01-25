import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/data/quizData";
import OptionButton from "./OptionButton";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
}

const QuestionCard = ({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
}: QuestionCardProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="quiz-card rounded-2xl p-8 border border-border"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswer === index}
              isCorrect={isAnswered ? index === question.correctAnswer : null}
              isDisabled={isAnswered}
              onClick={() => onSelectAnswer(index)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;
