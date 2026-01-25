import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isDisabled: boolean;
  onClick: () => void;
}

const optionLabels = ["A", "B", "C", "D"];

const OptionButton = ({
  option,
  index,
  isSelected,
  isCorrect,
  isDisabled,
  onClick,
}: OptionButtonProps) => {
  const getVariant = () => {
    if (isCorrect === null) return "default";
    if (isSelected && isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";
    if (isCorrect) return "correct";
    return "default";
  };

  const variant = getVariant();

  const variants = {
    default: "bg-card border-border hover:border-primary/50 hover:bg-muted/50",
    correct: "bg-success/20 border-success",
    incorrect: "bg-destructive/20 border-destructive animate-shake",
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-300
        flex items-center gap-4 text-left
        ${variants[variant]}
        ${isDisabled && variant === "default" ? "opacity-50" : ""}
        ${!isDisabled ? "cursor-pointer" : "cursor-default"}
      `}
    >
      <span
        className={`
          w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg
          ${variant === "correct" ? "bg-success text-success-foreground" : ""}
          ${variant === "incorrect" ? "bg-destructive text-destructive-foreground" : ""}
          ${variant === "default" ? "bg-muted text-foreground" : ""}
        `}
      >
        {variant === "correct" ? (
          <Check className="w-5 h-5" />
        ) : variant === "incorrect" ? (
          <X className="w-5 h-5" />
        ) : (
          optionLabels[index]
        )}
      </span>
      <span className="font-medium text-foreground">{option}</span>
    </motion.button>
  );
};

export default OptionButton;
