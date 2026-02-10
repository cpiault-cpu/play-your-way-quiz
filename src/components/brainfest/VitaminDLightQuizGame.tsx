import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Check, AlertCircle, Sunrise, ChevronRight, Loader2, ExternalLink } from "lucide-react";
import { Language } from "@/data/quizData";
import { 
  vitaminDLightLevels, 
  vitaminDLightSuccessMessages, 
  vitaminDLightUiTexts,
  VitaminDLightLevel
} from "@/data/vitaminDLightQuizData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { useQuizEmail } from "@/hooks/useQuizEmail";
import FishIcon from "@/components/brainfest/icons/FishIcon";

interface VitaminDLightQuizGameProps {
  level: 1 | 2 | 3 | 4;
  language: Language;
  onBack: () => void;
  onLevelComplete?: (level: 1 | 2 | 3 | 4) => void;
}

type GamePhase = "email" | "intro" | "reading" | "quiz" | "results";

const READING_TIME = 10;
const ANSWER_TIME = 10;

const VitaminDLightQuizGame = ({ level, language, onBack, onLevelComplete }: VitaminDLightQuizGameProps) => {
  const { email, setEmail, saveEmail, hasStoredEmail } = useQuizEmail("vitamind-light");
  const [phase, setPhase] = useState<GamePhase>(() => hasStoredEmail ? "intro" : "email");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [readingTimeLeft, setReadingTimeLeft] = useState(READING_TIME);
  const [answerTimeLeft, setAnswerTimeLeft] = useState(ANSWER_TIME);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [canSelectAnswer, setCanSelectAnswer] = useState(false);

  const { saveAttempt, isChecking } = useQuizAttempt();
  const quizId = `vitamind-light-${level}`;

  const levelData = vitaminDLightLevels.find(l => l.level === level) as VitaminDLightLevel | undefined;

  // Reset state when level changes - skip email if already provided
  useEffect(() => {
    setPhase(hasStoredEmail ? "intro" : "email");
    setSelectedAnswer(null);
    setReadingTimeLeft(READING_TIME);
    setAnswerTimeLeft(ANSWER_TIME);
    setShowFeedback(false);
    setIsCorrect(false);
    setCanSelectAnswer(false);
  }, [level, hasStoredEmail]);

  // Email validation
  const validateEmail = (emailToValidate: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToValidate);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error(
        language === "fr"
          ? "Veuillez entrer une adresse email valide"
          : "Please enter a valid email address"
      );
      return;
    }

    saveEmail(email);
    try {
      await saveAttempt(email, quizId);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }

    setPhase("intro");
  };

  // Reading timer
  useEffect(() => {
    if (phase !== "reading") return;
    
    if (readingTimeLeft <= 0) {
      setPhase("quiz");
      setAnswerTimeLeft(ANSWER_TIME);
      return;
    }

    const timer = setInterval(() => {
      setReadingTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, readingTimeLeft]);

  // Answer timer - lock answers until timer ends
  useEffect(() => {
    if (phase !== "quiz" || showFeedback) return;
    
    if (answerTimeLeft <= 0) {
      setCanSelectAnswer(true);
      return;
    }

    const timer = setInterval(() => {
      setAnswerTimeLeft(prev => {
        if (prev <= 1) {
          setCanSelectAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, answerTimeLeft, showFeedback]);

  const handleStartReading = () => {
    setPhase("reading");
    setReadingTimeLeft(READING_TIME);
  };

  const handleAnswerSelect = (index: number) => {
    if (!canSelectAnswer || showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null || !levelData) return;

    const correct = selectedAnswer === levelData.question.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      setPhase("results");
    }, 2000);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setCanSelectAnswer(false);
    setPhase("reading");
    setReadingTimeLeft(READING_TIME);
    setAnswerTimeLeft(ANSWER_TIME);
  };

  const handleNextLevel = () => {
    if (onLevelComplete) {
      onLevelComplete(level);
    }
  };

  if (!levelData) {
    return <div>Level not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{vitaminDLightUiTexts.back[language]}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg">{levelData.emoji}</span>
            <h1 className="text-lg font-bold text-foreground">
              {language === "fr" ? "Que la lumière soit" : "Let there be light"} - {levelData.title[language]}
            </h1>
          </div>

          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {/* EMAIL PHASE */}
          {phase === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${levelData.color}20` }}
              >
                <Sunrise className="w-10 h-10" style={{ color: levelData.color }} />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                🧠 {language === "fr" ? "Vitamine D, que la lumière soit" : "Vitamin D, let there be light"}
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md text-sm">
                {language === "fr"
                  ? "Faites la lumière sur les liens (un peu secrets) entre soleil, hormones et vitamine D."
                  : "Shed light on the (somewhat secret) links between sun, hormones and vitamin D."
                }
                <FishIcon className="inline-block w-5 h-5 ml-2 align-middle" color="#4A6741" />
              </p>

              <div className="w-full max-w-sm space-y-4">
                <Input
                  type="email"
                  placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center bg-white text-foreground"
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
                <Button
                  onClick={handleEmailSubmit}
                  disabled={isChecking}
                  className="w-full px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: "#4A6741" }}
                >
                  {isChecking ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {vitaminDLightUiTexts.start[language]}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

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
                style={{ backgroundColor: `${levelData.color}20` }}
              >
                <span className="text-4xl">{levelData.emoji}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {levelData.emoji} Niveau {level} — {levelData.title[language]}
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                {language === "fr" 
                  ? "Vous allez lire un texte pendant 10 secondes. Mémorisez les informations clés, puis répondez à la question en 10 secondes."
                  : "You will read a text for 10 seconds. Memorize the key information, then answer the question in 10 seconds."
                }
              </p>

              <Button
                onClick={handleStartReading}
                className="px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: levelData.color }}
              >
                {vitaminDLightUiTexts.start[language]}
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
                    {vitaminDLightUiTexts.readingTimer[language]}
                  </span>
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: readingTimeLeft <= 5 ? "#F44336" : levelData.color }}
                  >
                    {readingTimeLeft}s
                  </span>
                </div>
                <Progress 
                  value={(readingTimeLeft / READING_TIME) * 100} 
                  className="h-3"
                />
              </div>

              {/* Reading content */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full">
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                  {vitaminDLightUiTexts.readingPhase[language]}
                </h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-foreground leading-relaxed text-base sm:text-lg"
                >
                  {levelData.text[language]}
                </motion.p>
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
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col"
            >
              {/* Answer Timer */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {vitaminDLightUiTexts.answerTimer[language]}
                  </span>
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: answerTimeLeft <= 3 ? "#F44336" : answerTimeLeft <= 5 ? "#FF9800" : "#4CAF50" }}
                  >
                    {answerTimeLeft}s
                  </span>
                </div>
                <Progress 
                  value={(answerTimeLeft / ANSWER_TIME) * 100} 
                  className="h-3"
                />
              </div>

              {/* Question */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {levelData.question.question[language]}
                </h3>

                <div className="space-y-3">
                  {levelData.question.options[language].map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectOption = index === levelData.question.correctIndex;
                    
                    let bgColor = canSelectAnswer ? "bg-gray-50 hover:bg-gray-100" : "bg-gray-100";
                    let borderColor = "border-gray-200";
                    let textColor = "text-foreground";
                    let cursor = canSelectAnswer ? "cursor-pointer" : "cursor-not-allowed";

                    if (showFeedback) {
                      if (isCorrectOption) {
                        bgColor = "bg-green-50";
                        borderColor = "border-green-500";
                        textColor = "text-green-700";
                      } else if (isSelected && !isCorrectOption) {
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
                        disabled={!canSelectAnswer || showFeedback}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgColor} ${borderColor} ${textColor} ${cursor}`}
                        whileHover={canSelectAnswer && !showFeedback ? { scale: 1.02 } : {}}
                        whileTap={canSelectAnswer && !showFeedback ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium">{option}</span>
                          {showFeedback && isCorrectOption && (
                            <Check className="w-5 h-5 ml-auto text-green-600" />
                          )}
                          {showFeedback && isSelected && !isCorrectOption && (
                            <AlertCircle className="w-5 h-5 ml-auto text-red-600" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Wait message or validate button */}
                {!canSelectAnswer && !showFeedback && (
                  <p className="text-center text-muted-foreground mt-6 text-sm italic">
                    {vitaminDLightUiTexts.waitForTimer[language]}
                  </p>
                )}

                {canSelectAnswer && !showFeedback && (
                  <Button
                    onClick={handleValidate}
                    disabled={selectedAnswer === null}
                    className="w-full mt-6 py-6 text-lg font-semibold text-white rounded-xl shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: levelData.color }}
                  >
                    {vitaminDLightUiTexts.validate[language]}
                  </Button>
                )}

                {/* Feedback */}
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                  >
                    <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect 
                        ? levelData.question.feedback.success[language]
                        : levelData.question.feedback.error[language]
                      }
                    </p>
                  </motion.div>
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
                style={{ backgroundColor: isCorrect ? "#4CAF5020" : "#F4433620" }}
              >
                {isCorrect ? (
                  <Check className="w-12 h-12" style={{ color: "#4CAF50" }} />
                ) : (
                  <AlertCircle className="w-12 h-12" style={{ color: "#F44336" }} />
                )}
              </div>

              {/* Message */}
              <div className="text-center mb-8">
                {isCorrect ? (
                  <p className="text-xl font-semibold text-foreground mb-4">
                    {level === 4 
                      ? vitaminDLightSuccessMessages.finalComplete[language] 
                      : vitaminDLightSuccessMessages.levelComplete[language]
                    }
                  </p>
                ) : (
                  <p className="text-lg text-muted-foreground">
                    {vitaminDLightSuccessMessages.tryAgain[language]}
                  </p>
                )}
              </div>

              {/* Correction explanation */}
              {!isCorrect && (
                <div className="w-full bg-white rounded-2xl shadow-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    {vitaminDLightUiTexts.corrections[language]}
                  </h3>
                  
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-sm font-medium text-foreground">
                      ✅ {levelData.question.feedback.correction[language]}
                    </p>
                  </div>
                </div>
              )}

              {/* Scientific Sources */}
              <div className="w-full bg-white rounded-2xl shadow-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  📚 {vitaminDLightUiTexts.scientificSources[language]}
                </h3>
                
                <div className="space-y-3">
                  {levelData.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-blue-700 text-sm">{source.title}</p>
                          <p className="text-xs text-blue-600 mt-1">{source.description[language]}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                {isCorrect ? (
                  level < 4 ? (
                    <Button
                      onClick={handleNextLevel}
                      className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                      style={{ backgroundColor: "#4A6741" }}
                    >
                      {vitaminDLightUiTexts.nextLevel[language]}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={onBack}
                      className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                      style={{ backgroundColor: "#4A6741" }}
                    >
                      {vitaminDLightUiTexts.back[language]}
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={handleRetry}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                    style={{ backgroundColor: "#FF9800" }}
                  >
                    {vitaminDLightUiTexts.retry[language]}
                  </Button>
                )}

                {!isCorrect && (
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="w-full py-4 text-muted-foreground"
                  >
                    {vitaminDLightUiTexts.back[language]}
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

export default VitaminDLightQuizGame;
