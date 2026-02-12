import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, ArrowLeft, Copy, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Quiz, Language, translations } from "@/data/quizData";
import { toast } from "sonner";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { useQuizEmail } from "@/hooks/useQuizEmail";
const TIMER_DURATION = 30; // seconds per question
interface QuizGameProps {
  quiz: Quiz;
  language: Language;
  onBack: () => void;
}

type GameState = "email" | "playing" | "results";

// Track wrong answers for review at the end
interface WrongAnswer {
  questionIndex: number;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
}

const QuizGame = ({ quiz, language, onBack }: QuizGameProps) => {
  const t = translations[language];
  const { checkEmailUsed, saveAttempt, updateScore, isChecking } = useQuizAttempt();
  const { email, setEmail, saveEmail, hasStoredEmail } = useQuizEmail(`quiz-${quiz.id}`);
  const [gameState, setGameState] = useState<GameState>(() => hasStoredEmail ? "playing" : "email");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const discountCode = `BRAINFEST${quiz.id.replace('.', '')}-${quiz.discount.replace('%', '')}`;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleStartQuiz = async () => {
    if (!validateEmail(email)) {
      toast.error(t.invalidEmail);
      return;
    }

    saveEmail(email);
    // Save the attempt (allow replays with same email)
    try {
      await saveAttempt(email, quiz.id);
    } catch (error) {
      console.error("Error saving attempt:", error);
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
      } else {
        // Track wrong answer for review
        setWrongAnswers((prev) => [
          ...prev,
          {
            questionIndex: currentQuestionIndex,
            question: currentQuestion.question[language],
            userAnswer: index >= 0 ? currentQuestion.options[language][index] : null,
            correctAnswer: currentQuestion.options[language][currentQuestion.correctAnswer],
          },
        ]);
      }
    },
    [isAnswered, currentQuestion, currentQuestionIndex, language]
  );

  const handleNext = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isLastQuestion) {
      setGameState("results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(TIMER_DURATION);
    }
  }, [isLastQuestion]);

  // Handle time out - auto-select wrong answer and track it
  const handleTimeOut = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setSelectedAnswer(-1); // No answer selected
      // Track timeout as wrong answer
      setWrongAnswers((prev) => [
        ...prev,
        {
          questionIndex: currentQuestionIndex,
          question: currentQuestion.question[language],
          userAnswer: null, // Time ran out
          correctAnswer: currentQuestion.options[language][currentQuestion.correctAnswer],
        },
      ]);
    }
  }, [isAnswered, currentQuestion, currentQuestionIndex, language]);

  // Timer effect
  useEffect(() => {
    if (gameState !== "playing" || isAnswered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, isAnswered, currentQuestionIndex, handleTimeOut]);

  // Reset timer when question changes
  useEffect(() => {
    if (gameState === "playing") {
      setTimeLeft(TIMER_DURATION);
    }
  }, [currentQuestionIndex, gameState]);

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
      return "bg-white border-gray-200 hover:border-primary/50 hover:bg-gray-50";
    }
    if (index === currentQuestion.correctAnswer) {
      return "bg-green-50 border-success";
    }
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return "bg-red-50 border-destructive";
    }
    return "bg-white border-gray-200 opacity-50";
  };

  return (
    <div className="min-h-screen forest-bg overflow-x-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 sm:mb-6 text-foreground hover:bg-muted text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 sm:mr-2" />
          {t.backToQuizzes}
        </Button>

        <AnimatePresence mode="wait">
          {gameState === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="quiz-card rounded-xl p-4 sm:p-6 md:p-8 border border-border"
            >
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2 leading-tight">
                {quiz.title[language]}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{t.enterEmail}</p>

              <form onSubmit={(e) => { e.preventDefault(); handleStartQuiz(); }} className="space-y-3 sm:space-y-4">
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 text-base"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
                <Button
                  type="submit"
                  disabled={isChecking}
                  className="w-full btn-primary-custom text-white font-medium text-sm sm:text-base py-2.5 sm:py-3"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === "fr" ? "Vérification..." : "Checking..."}
                    </>
                  ) : (
                    t.startQuiz
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3 sm:space-y-6"
            >
              {/* Progress and Timer */}
              <div className="quiz-card rounded-xl p-3 sm:p-4 border border-border">
                <div className="flex flex-wrap justify-between items-start gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                  <span className="min-w-0">
                    {t.question} {currentQuestionIndex + 1} {t.of} {quiz.questions.length}
                  </span>
                  <div className={`flex items-center gap-1.5 sm:gap-2 font-medium ${
                    timeLeft <= 10 ? "text-destructive" : timeLeft <= 20 ? "text-warning" : "text-foreground"
                  }`}>
                    <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${timeLeft <= 10 ? "animate-pulse" : ""}`} />
                    <span className="tabular-nums">{timeLeft}s</span>
                  </div>
                </div>
                {/* Question progress bar */}
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {/* Timer progress bar */}
                <div className="h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      timeLeft <= 10 ? "bg-destructive" : timeLeft <= 20 ? "bg-warning" : "bg-success"
                    }`}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(timeLeft / TIMER_DURATION) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-4 sm:p-6 md:p-8 border border-border shadow-lg"
              >
                <h3 className="font-serif text-base sm:text-lg md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-snug">
                  {currentQuestion.question[language]}
                </h3>

                <div className="space-y-2 sm:space-y-3">
                  {currentQuestion.options[language].map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={!isAnswered ? { scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full min-w-0 p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 flex items-start sm:items-center gap-2.5 sm:gap-4 text-left ${getOptionClass(index)}`}
                    >
                      <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm flex-shrink-0 ${
                        isAnswered && index === currentQuestion.correctAnswer
                          ? "bg-success text-white"
                          : isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? "bg-destructive text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}>
                        {isAnswered && index === currentQuestion.correctAnswer ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : isAnswered && index === selectedAnswer ? (
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span className="text-sm sm:text-base text-gray-900 leading-snug min-w-0 break-words">{option}</span>
                    </motion.button>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
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
                      className="btn-primary-custom text-white w-full sm:w-auto text-sm sm:text-base"
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
              className="quiz-card rounded-xl p-4 sm:p-6 md:p-8 border border-border text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {t.congratulations}
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground mb-2">{getScoreMessage()}</p>
              <p className="text-base sm:text-lg text-foreground mb-6 sm:mb-8">
                {t.score}: <span className="font-bold text-primary">{score}/{quiz.questions.length}</span>
              </p>

              {/* Show wrong answers review if any */}
              {wrongAnswers.length > 0 && (
                <div className="bg-destructive/10 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-left">
                  <h3 className="text-sm sm:text-base font-semibold text-destructive mb-3">
                    {language === "fr" ? "Vos erreurs :" : "Your mistakes:"}
                  </h3>
                  <div className="space-y-3">
                    {wrongAnswers.map((wa, idx) => (
                      <div key={idx} className="bg-background rounded-md p-3 border border-destructive/20">
                        <p className="text-xs sm:text-sm font-medium text-foreground mb-1">
                          {language === "fr" ? "Question" : "Question"} {wa.questionIndex + 1}: {wa.question}
                        </p>
                        <p className="text-xs text-destructive">
                          {language === "fr" ? "Votre réponse" : "Your answer"}: {wa.userAnswer || (language === "fr" ? "Temps écoulé" : "Time ran out")}
                        </p>
                        <p className="text-xs text-success">
                          {language === "fr" ? "Bonne réponse" : "Correct answer"}: {wa.correctAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shop button */}
              <Button
                className="btn-primary-custom text-white w-full mb-4 text-sm sm:text-base"
                asChild
              >
                <a href="https://www.peita.fr/product-page/8-boites-de-petites-sardines" target="_blank" rel="noopener noreferrer">
                  {language === "fr" ? "Visiter la boutique" : "Visit the shop"}
                </a>
              </Button>

              <Button
                onClick={onBack}
                className="btn-primary-custom text-white w-full sm:w-auto text-sm sm:text-base"
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
