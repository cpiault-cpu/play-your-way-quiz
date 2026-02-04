import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, ArrowLeft, Clock, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Language } from "@/data/quizData";
import { 
  AdvancedQuestion,
  getAdvancedQuiz, 
  advancedQuizTranslations,
  categoryIntros
} from "@/data/advancedQuizData";
import { toast } from "sonner";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { useQuizProgress } from "@/hooks/useQuizProgress";

const TIMER_DURATION = 10; // 10 seconds per question

interface AdvancedQuizGameProps {
  category: "biology" | "micronutrition" | "plants";
  level: 1 | 2 | 3;
  language: Language;
  onBack: () => void;
}

type GameState = "email" | "intro" | "playing" | "results";

interface WrongAnswer {
  questionId: string;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  source?: string;
  isTrap?: boolean;
}

const AdvancedQuizGame = ({ category, level, language, onBack }: AdvancedQuizGameProps) => {
  const t = advancedQuizTranslations[language];
  const quiz = getAdvancedQuiz(category, level);
  const { checkEmailUsed, saveAttempt, isChecking } = useQuizAttempt();
  const { getWrongQuestionIds, saveWrongAnswers, markLevelCompleted, removeWrongQuestion } = useQuizProgress();

  const [gameState, setGameState] = useState<GameState>("email");
  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [gameQuestions, setGameQuestions] = useState<AdvancedQuestion[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const quizId = `advanced-${category}-${level}`;

  // Build questions based on previous wrong answers
  useEffect(() => {
    if (!quiz) return;

    const previousWrongIds = getWrongQuestionIds(category, level);
    const allQuestions = [...quiz.questions];
    
    // For levels 2 and 3, include trap versions of previously wrong questions
    if (level > 1 && previousWrongIds.length > 0) {
      const trapQuestions: AdvancedQuestion[] = [];
      
      // Find questions from previous levels that were wrong
      previousWrongIds.forEach(wrongId => {
        // Find the original question in any level
        for (let l = 1; l < level; l++) {
          const prevQuiz = getAdvancedQuiz(category, l as 1 | 2 | 3);
          if (prevQuiz) {
            const originalQ = prevQuiz.questions.find(q => q.id === wrongId);
            if (originalQ && originalQ.trapVariant) {
              trapQuestions.push({
                ...originalQ,
                id: `${originalQ.id}-trap`,
                question: originalQ.trapVariant.question,
                options: originalQ.trapVariant.options,
                correctAnswer: originalQ.trapVariant.correctAnswer,
                isTrap: true
              });
            }
          }
        }
      });

      // Limit trap questions to 2 and add 2 new questions
      const selectedTraps = trapQuestions.slice(0, 2);
      const regularQuestions = allQuestions.slice(0, 4 - selectedTraps.length);
      
      // Shuffle the combined questions
      const combined = [...selectedTraps, ...regularQuestions];
      for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
      }
      
      setGameQuestions(combined.slice(0, 4));
    } else {
      // Level 1 or no previous wrong answers - use first 4 questions
      setGameQuestions(allQuestions.slice(0, 4));
    }
  }, [quiz, category, level, getWrongQuestionIds]);

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === gameQuestions.length - 1;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleStartQuiz = async () => {
    if (!validateEmail(email)) {
      toast.error(t.invalidEmail);
      return;
    }

    const alreadyUsed = await checkEmailUsed(email, quizId);
    if (alreadyUsed) {
      toast.error(t.alreadyPlayed);
      return;
    }

    try {
      await saveAttempt(email, quizId);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }

    setGameState("intro");
  };

  const handleStartPlaying = () => {
    setGameState("playing");
  };

  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (isAnswered || !currentQuestion) return;

      setSelectedAnswer(index);
      setIsAnswered(true);

      if (index === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
        // If this was a trap question that they got right, remove from wrong list
        if (currentQuestion.isTrap) {
          const originalId = currentQuestion.id.replace('-trap', '');
          removeWrongQuestion(category, originalId);
        }
      } else {
        setWrongAnswers((prev) => [
          ...prev,
          {
            questionId: currentQuestion.id,
            question: currentQuestion.question[language],
            userAnswer: index >= 0 ? currentQuestion.options[language][index] : null,
            correctAnswer: currentQuestion.options[language][currentQuestion.correctAnswer],
            explanation: currentQuestion.explanation[language],
            source: currentQuestion.source?.[language],
            isTrap: currentQuestion.isTrap
          },
        ]);
      }
    },
    [isAnswered, currentQuestion, language, category, removeWrongQuestion]
  );

  const handleNext = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isLastQuestion) {
      // Save wrong answers to localStorage
      const wrongIds = wrongAnswers.map(w => w.questionId.replace('-trap', ''));
      if (wrongIds.length > 0) {
        saveWrongAnswers(category, level, wrongIds);
      }
      
      // If perfect score, mark level as completed
      if (score === gameQuestions.length) {
        markLevelCompleted(category, level);
      }
      
      setGameState("results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(TIMER_DURATION);
    }
  }, [isLastQuestion, wrongAnswers, saveWrongAnswers, markLevelCompleted, category, level, score, gameQuestions.length]);

  const handleTimeOut = useCallback(() => {
    if (!isAnswered && currentQuestion) {
      setIsAnswered(true);
      setSelectedAnswer(-1);
      setWrongAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          question: currentQuestion.question[language],
          userAnswer: null,
          correctAnswer: currentQuestion.options[language][currentQuestion.correctAnswer],
          explanation: currentQuestion.explanation[language],
          source: currentQuestion.source?.[language],
          isTrap: currentQuestion.isTrap
        },
      ]);
    }
  }, [isAnswered, currentQuestion, language]);

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

  const getScoreMessage = () => {
    const percentage = (score / gameQuestions.length) * 100;
    if (percentage === 100) return t.perfectScore;
    if (percentage >= 50) return t.goodScore;
    return t.keepLearning;
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered || !currentQuestion) {
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

  const getCategoryTitle = () => {
    switch (category) {
      case "biology": return language === "fr" ? "Biologie" : "Biology";
      case "micronutrition": return language === "fr" ? "Micronutrition" : "Micronutrition";
      case "plants": return language === "fr" ? "Plantes médicinales" : "Medicinal Plants";
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen forest-bg flex items-center justify-center">
        <p className="text-foreground">{language === "fr" ? "Quiz non trouvé" : "Quiz not found"}</p>
      </div>
    );
  }

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
          {/* Email Screen */}
          {gameState === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="quiz-card rounded-xl p-4 sm:p-6 md:p-8 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="level-badge-1 text-sm font-bold px-3 py-1 rounded-full text-white">
                  {t.level} {level}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {getCategoryTitle()}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {t.enterEmail}
              </p>

              <div className="space-y-3 sm:space-y-4">
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 text-base"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <Button
                  onClick={handleStartQuiz}
                  disabled={isChecking}
                  className="w-full text-white font-medium text-sm sm:text-base py-2.5 sm:py-3"
                  style={{ backgroundColor: '#4A6741', fontFamily: 'Montserrat, sans-serif' }}
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
              </div>
            </motion.div>
          )}

          {/* Intro Screen */}
          {gameState === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="quiz-card rounded-xl p-4 sm:p-6 md:p-8 border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="level-badge-1 text-sm font-bold px-3 py-1 rounded-full text-white">
                  {t.level} {level}
                </span>
                <span className="text-sm text-muted-foreground">{t.questionsCount}</span>
                <span className="text-sm text-muted-foreground">• {t.timePerQuestion}</span>
              </div>
              
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {getCategoryTitle()}
              </h2>

              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 mb-6">
                <p className="text-sm sm:text-base text-foreground leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {quiz.introText[language]}
                </p>
              </div>

              <div className="bg-primary/10 rounded-lg p-3 mb-6">
                <p className="text-sm text-primary flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Clock className="w-4 h-4" />
                  {t.readIntro}
                </p>
              </div>

              <Button
                onClick={handleStartPlaying}
                className="w-full text-white font-medium text-sm sm:text-base py-2.5 sm:py-3"
                style={{ backgroundColor: '#4A6741', fontFamily: 'Montserrat, sans-serif' }}
              >
                {t.startQuiz}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Playing Screen */}
          {gameState === "playing" && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3 sm:space-y-6"
            >
              {/* Progress and Timer */}
              <div className="quiz-card rounded-xl p-3 sm:p-4 border border-border">
                <div className="flex flex-wrap justify-between items-start gap-2 text-xs sm:text-sm text-muted-foreground mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <span className="min-w-0">
                      {t.question} {currentQuestionIndex + 1} {t.of} {gameQuestions.length}
                    </span>
                    {currentQuestion.isTrap && (
                      <span className="flex items-center gap-1 text-warning text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        {t.trapQuestion}
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 sm:gap-2 font-medium ${
                    timeLeft <= 3 ? "text-destructive" : timeLeft <= 6 ? "text-warning" : "text-foreground"
                  }`}>
                    <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${timeLeft <= 3 ? "animate-pulse" : ""}`} />
                    <span className="tabular-nums">{timeLeft}s</span>
                  </div>
                </div>
                {/* Question progress bar */}
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / gameQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {/* Timer progress bar */}
                <div className="h-1 sm:h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      timeLeft <= 3 ? "bg-destructive" : timeLeft <= 6 ? "bg-warning" : "bg-success"
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
                <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
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
                    }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.incorrect}
                    </span>
                    <Button
                      onClick={handleNext}
                      className="text-white w-full sm:w-auto text-sm sm:text-base"
                      style={{ backgroundColor: '#7FB3A3', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {isLastQuestion ? t.seeResults : t.next}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Results Screen */}
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
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center ${
                  score === gameQuestions.length ? "bg-success/20" : "bg-primary/20"
                }`}
              >
                {score === gameQuestions.length ? (
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
                ) : (
                  <span className="text-2xl sm:text-3xl">📊</span>
                )}
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {t.congratulations}
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {getScoreMessage()}
              </p>
              <p className="text-base sm:text-lg text-foreground mb-6 sm:mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {t.score}: <span className="font-bold text-primary">{score}/{gameQuestions.length}</span>
              </p>

              {/* Wrong answers with explanations */}
              {wrongAnswers.length > 0 && (
                <div className="bg-destructive/10 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-left">
                  <h3 className="text-sm sm:text-base font-semibold text-destructive mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.yourMistakes}
                  </h3>
                  <div className="space-y-4">
                    {wrongAnswers.map((wa, idx) => (
                      <div key={idx} className="bg-background rounded-md p-3 border border-destructive/20">
                        <div className="flex items-start gap-2 mb-1">
                          {wa.isTrap && (
                            <span className="flex items-center gap-1 text-warning text-xs shrink-0">
                              <AlertTriangle className="w-3 h-3" />
                            </span>
                          )}
                          <p className="text-xs sm:text-sm font-medium text-foreground" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {wa.question}
                          </p>
                        </div>
                        <p className="text-xs text-destructive" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t.yourAnswer}: {wa.userAnswer || t.timeRanOut}
                        </p>
                        <p className="text-xs text-success mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {t.correctAnswer}: {wa.correctAnswer}
                        </p>
                        <div className="bg-muted/50 rounded p-2 mt-2">
                          <p className="text-xs text-foreground leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {wa.explanation}
                          </p>
                          {wa.source && (
                            <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {wa.source}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {score < gameQuestions.length && (
                  <Button
                    onClick={() => {
                      setGameState("intro");
                      setCurrentQuestionIndex(0);
                      setScore(0);
                      setWrongAnswers([]);
                      setSelectedAnswer(null);
                      setIsAnswered(false);
                    }}
                    className="w-full text-white font-medium text-sm sm:text-base"
                    style={{ backgroundColor: '#E8A87C', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t.retry}
                  </Button>
                )}
                <Button
                  onClick={onBack}
                  className="w-full text-white font-medium text-sm sm:text-base"
                  style={{ backgroundColor: '#4A6741', fontFamily: 'Montserrat, sans-serif' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToQuizzes}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedQuizGame;
