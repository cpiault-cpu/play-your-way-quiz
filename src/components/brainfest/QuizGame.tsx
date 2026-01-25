import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, ArrowLeft, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Quiz, Language, translations } from "@/data/quizData";
import { toast } from "sonner";

interface QuizGameProps {
  quiz: Quiz;
  language: Language;
  onBack: () => void;
}

type GameState = "email" | "playing" | "results";

const QuizGame = ({ quiz, language, onBack }: QuizGameProps) => {
  const t = translations[language];
  const [gameState, setGameState] = useState<GameState>("email");
  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const discountCode = `BRAINFEST${quiz.id.replace('.', '')}-${quiz.discount.replace('%', '')}`;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleStartQuiz = () => {
    if (!validateEmail(email)) {
      toast.error(t.invalidEmail);
      return;
    }
    setGameState("playing");
  };

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    toast.success(t.codeCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage === 100) return t.perfectScore;
    if (percentage >= 80) return t.goodScore;
    if (percentage >= 60) return t.mediumScore;
    return t.lowScore;
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return "bg-card border-border hover:border-primary/50 hover:bg-muted/50";
    }
    if (index === currentQuestion.correctAnswer) {
      return "bg-success/20 border-success";
    }
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return "bg-destructive/20 border-destructive";
    }
    return "bg-card border-border opacity-50";
  };

  return (
    <div className="min-h-screen forest-bg">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-foreground hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToQuizzes}
        </Button>

        <AnimatePresence mode="wait">
          {gameState === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="quiz-card rounded-xl p-8 border border-border"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {quiz.title[language]}
              </h2>
              <p className="text-muted-foreground mb-8">{t.enterEmail}</p>

              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted border-border text-foreground"
                />
                <Button
                  onClick={handleStartQuiz}
                  className="w-full btn-primary-custom text-primary-foreground font-medium"
                >
                  {t.startQuiz}
                </Button>
              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="quiz-card rounded-xl p-4 border border-border">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{t.question} {currentQuestionIndex + 1} {t.of} {quiz.questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="quiz-card rounded-xl p-8 border border-border"
              >
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-8">
                  {currentQuestion.question[language]}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options[language].map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={!isAnswered ? { scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-4 text-left ${getOptionClass(index)}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                        isAnswered && index === currentQuestion.correctAnswer
                          ? "bg-success text-success-foreground"
                          : isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-foreground"
                      }`}>
                        {isAnswered && index === currentQuestion.correctAnswer ? (
                          <Check className="w-4 h-4" />
                        ) : isAnswered && index === selectedAnswer ? (
                          <X className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span className="text-foreground">{option}</span>
                    </motion.button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-between items-center"
                  >
                    <span className={`text-sm font-medium ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "text-success"
                        : "text-destructive"
                    }`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.incorrect}
                    </span>
                    <Button
                      onClick={handleNext}
                      className="btn-primary-custom text-primary-foreground"
                    >
                      {isLastQuestion ? t.seeResults : t.next}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {gameState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="quiz-card rounded-xl p-8 border border-border text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                {t.congratulations}
              </h2>
              <p className="text-xl text-muted-foreground mb-2">{getScoreMessage()}</p>
              <p className="text-lg text-foreground mb-8">
                {t.score}: <span className="font-bold text-primary">{score}/{quiz.questions.length}</span>
              </p>

              {score >= Math.ceil(quiz.questions.length * 0.6) && (
                <div className="bg-muted rounded-lg p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">{t.discountCode}</p>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-lg font-mono font-bold text-primary bg-background px-4 py-2 rounded">
                      {discountCode}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCode}
                      className="border-border"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={onBack}
                className="btn-primary-custom text-primary-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToQuizzes}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizGame;
