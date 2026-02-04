import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Check, AlertCircle, Leaf, ChevronRight } from "lucide-react";
import { Language } from "@/data/quizData";
import { 
  plantsLevels, 
  PlantsQuestion, 
  plantsSuccessMessages, 
  plantsUiTexts 
} from "@/data/plantsQuizData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PlantsQuizGameProps {
  level: 1 | 2 | 3;
  language: Language;
  onBack: () => void;
  onLevelComplete?: (level: 1 | 2 | 3) => void;
}

type GamePhase = "intro" | "reading" | "quiz" | "results";

interface AnswerResult {
  question: PlantsQuestion;
  selectedIndex: number;
  isCorrect: boolean;
}

const READING_TIME = 15; // seconds

const PlantsQuizGame = ({ level, language, onBack, onLevelComplete }: PlantsQuizGameProps) => {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [currentVersion, setCurrentVersion] = useState<"A" | "B">("A");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [readingTimeLeft, setReadingTimeLeft] = useState(READING_TIME);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const levelData = plantsLevels.find(l => l.level === level);

  // Reset state when level changes
  useEffect(() => {
    setPhase("intro");
    setCurrentVersion("A");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setReadingTimeLeft(READING_TIME);
    setShowFeedback(false);
    setAttemptCount(0);
  }, [level]);

  const currentVersionData = levelData?.versions[currentVersion];
  const questions = currentVersionData?.questions || [];
  const textLines = currentVersionData?.text[language] || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Reading timer
  useEffect(() => {
    if (phase !== "reading") return;
    
    if (readingTimeLeft <= 0) {
      setPhase("quiz");
      return;
    }

    const timer = setInterval(() => {
      setReadingTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, readingTimeLeft]);

  const handleStartReading = () => {
    setPhase("reading");
    setReadingTimeLeft(READING_TIME);
  };

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    
    setAnswers(prev => [...prev, {
      question: currentQuestion,
      selectedIndex: selectedAnswer,
      isCorrect
    }]);

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setPhase("results");
      }
    }, 1500);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const isPerfect = score === questions.length;
  const wrongAnswers = answers.filter(a => !a.isCorrect);

  const handleRetry = () => {
    // Switch to version B if currently on A, or stay on B
    setCurrentVersion(prev => prev === "A" ? "B" : "A");
    setAttemptCount(prev => prev + 1);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setPhase("reading");
    setReadingTimeLeft(READING_TIME);
  };

  const handleNextLevel = () => {
    if (onLevelComplete) {
      onLevelComplete(level);
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case 1: return "#7FB3A3";
      case 2: return "#E8A87C";
      case 3: return "#D17B7B";
      default: return "#7FB3A3";
    }
  };

  const getLevelEmoji = () => {
    switch (level) {
      case 1: return "🟢";
      case 2: return "🟠";
      case 3: return "🔴";
      default: return "🟢";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{plantsUiTexts.back[language]}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLevelEmoji()}</span>
            <h1 className="text-lg font-bold text-foreground">
              {language === "fr" ? "Plantes médicinales" : "Medicinal Plants"} - {levelData?.title[language]}
            </h1>
          </div>

          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${getLevelColor()}20` }}
              >
                <Leaf className="w-10 h-10" style={{ color: getLevelColor() }} />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {levelData?.title[language]}
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                {language === "fr" 
                  ? "Vous allez lire un texte pendant 15 secondes. Mémorisez les informations clés, puis répondez aux questions."
                  : "You will read a text for 15 seconds. Memorize the key information, then answer the questions."
                }
              </p>

              <Button
                onClick={handleStartReading}
                className="px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: "#4A6741" }}
              >
                {plantsUiTexts.start[language]}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* READING PHASE */}
          {phase === "reading" && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              {/* Timer */}
              <div className="w-full mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {plantsUiTexts.readingTimer[language]}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: readingTimeLeft <= 5 ? "#D17B7B" : getLevelColor() }}>
                    {readingTimeLeft}s
                  </span>
                </div>
                <Progress 
                  value={(readingTimeLeft / READING_TIME) * 100} 
                  className="h-3"
                  style={{ 
                    ['--progress-color' as string]: readingTimeLeft <= 5 ? "#D17B7B" : getLevelColor()
                  }}
                />
              </div>

              {/* Reading content */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full">
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                  {plantsUiTexts.readingPhase[language]}
                </h3>
                
                <div className="space-y-4">
                  {textLines.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-foreground leading-relaxed text-base sm:text-lg"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                {language === "fr" 
                  ? "⚠️ Ce texte disparaîtra dans quelques secondes"
                  : "⚠️ This text will disappear in a few seconds"
                }
              </p>
            </motion.div>
          )}

          {/* QUIZ PHASE */}
          {phase === "quiz" && currentQuestion && (
            <motion.div
              key={`quiz-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {plantsUiTexts.questionPhase[language]} {currentQuestionIndex + 1}/{questions.length}
                  </span>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / questions.length) * 100} 
                  className="h-2"
                />
              </div>

              {/* Question */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {currentQuestion.question[language]}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options[language].map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctIndex;
                    
                    let bgColor = "bg-gray-50 hover:bg-gray-100";
                    let borderColor = "border-gray-200";
                    let textColor = "text-foreground";

                    if (showFeedback) {
                      if (isCorrect) {
                        bgColor = "bg-green-50";
                        borderColor = "border-green-500";
                        textColor = "text-green-700";
                      } else if (isSelected && !isCorrect) {
                        bgColor = "bg-red-50";
                        borderColor = "border-red-500";
                        textColor = "text-red-700";
                      }
                    } else if (isSelected) {
                      bgColor = "bg-primary/10";
                      borderColor = "border-primary";
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgColor} ${borderColor} ${textColor}`}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium">{option}</span>
                          {showFeedback && isCorrect && (
                            <Check className="w-5 h-5 ml-auto text-green-600" />
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <AlertCircle className="w-5 h-5 ml-auto text-red-600" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Validate button */}
                {!showFeedback && (
                  <Button
                    onClick={handleValidate}
                    disabled={selectedAnswer === null}
                    className="w-full mt-6 py-6 text-lg font-semibold text-white rounded-xl shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: "#7FB3A3" }}
                  >
                    {plantsUiTexts.validate[language]}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* RESULTS PHASE */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              {/* Score */}
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ 
                  backgroundColor: isPerfect ? "#7FB3A320" : "#E8A87C20"
                }}
              >
                <span className="text-4xl font-bold" style={{ color: isPerfect ? "#7FB3A3" : "#E8A87C" }}>
                  {score}/{questions.length}
                </span>
              </div>

              {/* Message */}
              <div className="text-center mb-8">
                {isPerfect ? (
                  <>
                    <p className="text-xl font-semibold text-foreground whitespace-pre-line mb-4">
                      {level === 3 ? plantsSuccessMessages.finalComplete[language] : plantsSuccessMessages.levelComplete[language]}
                    </p>
                  </>
                ) : (
                  <p className="text-lg text-muted-foreground">
                    {plantsSuccessMessages.tryAgain[language]}
                  </p>
                )}
              </div>

              {/* Wrong answers explanation */}
              {wrongAnswers.length > 0 && (
                <div className="w-full bg-white rounded-2xl shadow-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    {plantsUiTexts.corrections[language]}
                  </h3>
                  
                  <div className="space-y-4">
                    {wrongAnswers.map((result, index) => (
                      <div key={index} className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <p className="text-sm text-amber-700 mb-2">
                          {result.question.confusionHint[language]}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          ✅ {result.question.explanation[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="w-full space-y-3">
                {isPerfect ? (
                  level < 3 ? (
                    <Button
                      onClick={handleNextLevel}
                      className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                      style={{ backgroundColor: "#4A6741" }}
                    >
                      {plantsUiTexts.nextLevel[language]}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={onBack}
                      className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                      style={{ backgroundColor: "#4A6741" }}
                    >
                      {plantsUiTexts.back[language]}
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={handleRetry}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                    style={{ backgroundColor: "#E8A87C" }}
                  >
                    {plantsUiTexts.retry[language]}
                  </Button>
                )}

                {!isPerfect && (
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="w-full py-4 text-muted-foreground"
                  >
                    {plantsUiTexts.back[language]}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PlantsQuizGame;
