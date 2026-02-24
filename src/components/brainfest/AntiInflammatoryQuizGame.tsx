import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Check, AlertCircle, Flame, ChevronRight, Loader2 } from "lucide-react";
import ShareButton from "@/components/brainfest/ShareButton";
import { getQuizByType } from "@/data/quizRegistry";
import { Language } from "@/data/quizData";
import { 
  antiInflammatoryLevels, 
  antiInflammatoryUiTexts as uiTexts,
  AntiInflammatoryQuestion
} from "@/data/antiInflammatoryQuizData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { useQuizEmail } from "@/hooks/useQuizEmail";
import EmailConsentCheckbox from "@/components/brainfest/EmailConsentCheckbox";

interface AntiInflammatoryQuizGameProps {
  level: number;
  language: Language;
  onBack: () => void;
  onLevelComplete?: (level: number) => void;
}

type GamePhase = "email" | "intro" | "reading" | "quiz" | "feedback" | "results" | "final";

const ANSWER_TIME = 10;

const AntiInflammatoryQuizGame = ({ level, language, onBack, onLevelComplete }: AntiInflammatoryQuizGameProps) => {
  const { email, setEmail, saveEmail, hasStoredEmail } = useQuizEmail("anti-inflammatory");
  const [phase, setPhase] = useState<GamePhase>(() => hasStoredEmail ? "intro" : "email");
  const [currentVersion, setCurrentVersion] = useState<"A" | "B">("A");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [associationAnswers, setAssociationAnswers] = useState<Record<string, string>>({});
  const [readingTimeLeft, setReadingTimeLeft] = useState(16);
  const [answerTimeLeft, setAnswerTimeLeft] = useState(ANSWER_TIME);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const { saveAttempt, isChecking } = useQuizAttempt();
  const quizId = `anti-inflammatory-${level}`;

  const levelData = antiInflammatoryLevels.find(l => l.level === level);
  const currentVersionData = levelData?.versions[currentVersion];
  const questions = currentVersionData?.questions || [];
  const textLines = currentVersionData?.text[language] || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Reset on level change
  useEffect(() => {
    setPhase(hasStoredEmail ? "intro" : "email");
    setCurrentVersion("A");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setAssociationAnswers({});
    setReadingTimeLeft(levelData?.readingTime || 16);
    setAnswerTimeLeft(ANSWER_TIME);
    setShowFeedback(false);
    setIsCorrect(false);
    setHasErrors(false);
  }, [level, hasStoredEmail]);

  // Reading timer
  useEffect(() => {
    if (phase !== "reading") return;
    if (readingTimeLeft <= 0) { setPhase("quiz"); return; }
    const timer = setInterval(() => setReadingTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, readingTimeLeft]);

  // Answer timer
  useEffect(() => {
    if (phase !== "quiz" || showFeedback) return;
    if (answerTimeLeft <= 0) {
      handleValidate(true);
      return;
    }
    const timer = setInterval(() => setAnswerTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, answerTimeLeft, showFeedback]);

  // Reset answer timer when question changes
  useEffect(() => {
    setAnswerTimeLeft(ANSWER_TIME);
  }, [currentQuestionIndex, currentVersion]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedEmail = (formData.get("email") as string || "").trim();
    if (!validateEmail(submittedEmail)) {
      toast.error(language === "fr" ? "Veuillez entrer une adresse email valide" : "Please enter a valid email address");
      return;
    }
    saveEmail(submittedEmail);
    try { await saveAttempt(submittedEmail, quizId); } catch {}
    setPhase("intro");
  };

  const handleStartReading = () => {
    setPhase("reading");
    setReadingTimeLeft(levelData?.readingTime || 16);
  };

  const handleToggleMulti = (index: number) => {
    if (showFeedback) return;
    setSelectedMulti(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const handleAssociationSelect = (left: string, right: string) => {
    if (showFeedback) return;
    setAssociationAnswers(prev => ({ ...prev, [left]: right }));
  };

  const handleValidate = useCallback((timedOut = false) => {
    if (!currentQuestion) return;

    let correct = false;

    if (currentQuestion.type === "single") {
      if (timedOut) { correct = false; }
      else { correct = selectedAnswer === currentQuestion.correctIndex; }
    } else if (currentQuestion.type === "multi") {
      const correctSet = new Set(currentQuestion.correctIndices || []);
      const selectedSet = new Set(selectedMulti);
      correct = correctSet.size === selectedSet.size && [...correctSet].every(i => selectedSet.has(i));
    } else if (currentQuestion.type === "association") {
      const pairs = currentQuestion.associations?.pairs || [];
      correct = pairs.every(p => associationAnswers[p.left] === p.right);
    }

    setIsCorrect(correct);
    if (!correct) setHasErrors(true);
    setShowFeedback(true);
  }, [currentQuestion, selectedAnswer, selectedMulti, associationAnswers]);

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setAssociationAnswers({});

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of questions for this version
      if (hasErrors && currentVersion === "A") {
        // Go to corrective version B
        setPhase("results");
      } else if (hasErrors && currentVersion === "B") {
        // Still errors on B, retry B
        setPhase("results");
      } else {
        // Perfect - check if final level
        if (level === 6) {
          setPhase("final");
        } else {
          setPhase("results");
        }
      }
    }
  };

  const handleRetry = () => {
    setCurrentVersion(prev => prev === "A" ? "B" : "B");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSelectedMulti([]);
    setAssociationAnswers({});
    setShowFeedback(false);
    setIsCorrect(false);
    setHasErrors(false);
    setPhase("reading");
    setReadingTimeLeft(levelData?.readingTime || 16);
  };

  const handleNextLevel = () => {
    if (onLevelComplete) onLevelComplete(level);
  };

  const getLevelColor = () => {
    const colors = ["#7FB3A3", "#E8C87C", "#E8A87C", "#D4944C", "#D17B7B", "#B45858"];
    return colors[Math.min(level - 1, colors.length - 1)];
  };

  const getLevelEmoji = () => {
    const emojis = ["🟢", "🟡", "🟠", "🔶", "🔴", "🏆"];
    return emojis[Math.min(level - 1, emojis.length - 1)];
  };

  // Render association question
  const renderAssociationQuestion = (q: AntiInflammatoryQuestion) => {
    const pairs = q.associations?.pairs || [];
    const rightOptions = pairs.map(p => p.right);

    return (
      <div className="space-y-4">
        {pairs.map((pair) => (
          <div key={pair.left} className="flex items-center gap-3">
            <span className="text-3xl">{pair.left}</span>
            <span className="text-muted-foreground">→</span>
            <div className="flex gap-2 flex-wrap">
              {rightOptions.map((opt) => {
                const isSelected = associationAnswers[pair.left] === opt;
                const isCorrectAnswer = showFeedback && pair.right === opt;
                const isWrong = showFeedback && isSelected && pair.right !== opt;

                return (
                  <button
                    key={opt}
                    onClick={() => handleAssociationSelect(pair.left, opt)}
                    disabled={showFeedback}
                    className={`px-4 py-2 rounded-xl border-2 font-medium transition-all text-sm ${
                      isCorrectAnswer ? "border-green-500 bg-green-50 text-green-700" :
                      isWrong ? "border-red-500 bg-red-50 text-red-700" :
                      isSelected ? "border-primary bg-primary/10 text-foreground" :
                      "border-gray-200 bg-gray-50 hover:bg-gray-100 text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render multi-select question
  const renderMultiQuestion = (q: AntiInflammatoryQuestion) => {
    const options = q.multiOptions?.[language] || [];
    const correctIndices = q.correctIndices || [];

    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-2">{uiTexts.selectAll[language]}</p>
        {options.map((option, index) => {
          const isSelected = selectedMulti.includes(index);
          const isCorrectItem = correctIndices.includes(index);
          const isWrong = showFeedback && isSelected && !isCorrectItem;
          const isCorrectShown = showFeedback && isCorrectItem;

          return (
            <motion.button
              key={index}
              onClick={() => handleToggleMulti(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                isCorrectShown ? "border-green-500 bg-green-50 text-green-700" :
                isWrong ? "border-red-500 bg-red-50 text-red-700" :
                isSelected ? "border-primary bg-primary/10" :
                "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? "bg-primary border-primary" : "border-gray-300"
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-medium">{option}</span>
                {showFeedback && isCorrectItem && <Check className="w-5 h-5 ml-auto text-green-600" />}
                {showFeedback && isWrong && <AlertCircle className="w-5 h-5 ml-auto text-red-600" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  // Render single choice question
  const renderSingleQuestion = (q: AntiInflammatoryQuestion) => {
    const options = q.options?.[language] || [];

    return (
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectItem = index === q.correctIndex;

          let bgColor = "bg-gray-50 hover:bg-gray-100";
          let borderColor = "border-gray-200";
          let textColor = "text-foreground";

          if (showFeedback) {
            if (isCorrectItem) { bgColor = "bg-green-50"; borderColor = "border-green-500"; textColor = "text-green-700"; }
            else if (isSelected) { bgColor = "bg-red-50"; borderColor = "border-red-500"; textColor = "text-red-700"; }
          } else if (isSelected) { bgColor = "bg-primary/10"; borderColor = "border-primary"; }

          return (
            <motion.button
              key={index}
              onClick={() => { if (!showFeedback) setSelectedAnswer(index); }}
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
                {showFeedback && isCorrectItem && <Check className="w-5 h-5 ml-auto text-green-600" />}
                {showFeedback && isSelected && !isCorrectItem && <AlertCircle className="w-5 h-5 ml-auto text-red-600" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const canValidate = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "single") return selectedAnswer !== null;
    if (currentQuestion.type === "multi") return selectedMulti.length > 0;
    if (currentQuestion.type === "association") {
      const pairs = currentQuestion.associations?.pairs || [];
      return pairs.every(p => associationAnswers[p.left]);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{uiTexts.back[language]}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLevelEmoji()}</span>
            <h1 className="text-lg font-bold text-foreground">
              {language === "fr" ? "Anti-Inflammatoire" : "Anti-Inflammatory"} - {levelData?.title[language]}
            </h1>
          </div>
          <ShareButton url="/#anti-inflammatory" title={language === "fr" ? "Anti-Inflammatoire" : "Anti-Inflammatory"} />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {/* EMAIL PHASE */}
          {phase === "email" && (
            <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${getLevelColor()}20` }}>
                <Flame className="w-10 h-10" style={{ color: getLevelColor() }} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === "fr" ? "Alimentation Anti-Inflammatoire" : "Anti-Inflammatory Diet"}
              </h2>
              <p className="text-sm text-muted-foreground mb-1">{language === "fr" ? "Version Expert" : "Expert Version"}</p>
              <p className="text-muted-foreground mb-8 max-w-md">
                {language === "fr" ? "Entrez votre adresse email pour commencer" : "Enter your email to start"}
              </p>
              <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
                <Input name="email" type="email" placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                  defaultValue={email} className="text-center" autoComplete="email" inputMode="email" required
                  onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} />
                <EmailConsentCheckbox language={language} />
                <Button type="submit" disabled={isChecking}
                  className="w-full px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                  style={{ backgroundColor: "#4A6741" }}>
                  {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{uiTexts.start[language]}<ChevronRight className="w-5 h-5 ml-2" /></>}
                </Button>
              </form>
            </motion.div>
          )}

          {/* INTRO PHASE */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${getLevelColor()}20` }}>
                <Flame className="w-10 h-10" style={{ color: getLevelColor() }} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{levelData?.title[language]}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                {currentVersion === "B" ? (language === "fr" ? "🔄 Niveau correctif" : "🔄 Corrective level") : `${uiTexts.levelProgress[language]} ${level}/6`}
              </p>
              <p className="text-muted-foreground mb-8 max-w-md">
                {language === "fr" 
                  ? `Vous allez lire un texte pendant ${levelData?.readingTime || 16} secondes. Mémorisez les informations clés, puis répondez aux questions en 10 secondes maximum.`
                  : `You will read a text for ${levelData?.readingTime || 16} seconds. Memorize the key info, then answer questions within 10 seconds.`}
              </p>
              <Button onClick={handleStartReading}
                className="px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                style={{ backgroundColor: "#4A6741" }}>
                {uiTexts.start[language]}<ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* READING PHASE */}
          {phase === "reading" && (
            <motion.div key="reading" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center">
              <div className="w-full mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />{uiTexts.readingTimer[language]}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: readingTimeLeft <= 5 ? "#D17B7B" : getLevelColor() }}>
                    {readingTimeLeft}s
                  </span>
                </div>
                <Progress value={(readingTimeLeft / (levelData?.readingTime || 16)) * 100} className="h-3" />
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full">
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">{uiTexts.readingPhase[language]}</h3>
                <div className="space-y-4">
                  {textLines.map((line, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                      className="text-foreground leading-relaxed text-base sm:text-lg">{line}</motion.p>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                {language === "fr" ? "⚠️ Ce texte disparaîtra dans quelques secondes" : "⚠️ This text will disappear in a few seconds"}
              </p>
            </motion.div>
          )}

          {/* QUIZ PHASE */}
          {phase === "quiz" && currentQuestion && (
            <motion.div key={`quiz-${currentQuestionIndex}-${currentVersion}`}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="flex flex-col">
              {/* Timer */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {uiTexts.questionPhase[language]} {currentQuestionIndex + 1}/{questions.length}
                  </span>
                  <span className={`text-xl font-bold ${answerTimeLeft <= 3 ? "text-red-500" : ""}`}
                    style={{ color: answerTimeLeft <= 3 ? undefined : getLevelColor() }}>
                    {answerTimeLeft}s
                  </span>
                </div>
                <Progress value={(answerTimeLeft / ANSWER_TIME) * 100} className={`h-2 ${answerTimeLeft <= 3 ? '[&>div]:bg-red-500' : ''}`} />
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">{currentQuestion.question[language]}</h3>
                
                {currentQuestion.type === "single" && renderSingleQuestion(currentQuestion)}
                {currentQuestion.type === "multi" && renderMultiQuestion(currentQuestion)}
                {currentQuestion.type === "association" && renderAssociationQuestion(currentQuestion)}

                {/* Feedback */}
                {showFeedback && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <div className={`p-4 rounded-xl mb-4 ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-semibold">{isCorrect ? uiTexts.correct[language] : uiTexts.incorrect[language]}</span>
                      </div>
                      <p className="text-sm">{currentQuestion.explanation[language]}</p>
                    </div>
                    <Button onClick={handleNext} className="w-full py-4 text-white rounded-xl" style={{ backgroundColor: "#4A6741" }}>
                      {language === "fr" ? "Continuer" : "Continue"}
                    </Button>
                  </motion.div>
                )}

                {/* Validate button */}
                {!showFeedback && (
                  <Button onClick={() => handleValidate(false)} disabled={!canValidate()}
                    className="w-full mt-6 py-6 text-lg font-semibold text-white rounded-xl shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: getLevelColor() }}>
                    {uiTexts.validate[language]}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* RESULTS PHASE */}
          {phase === "results" && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg">
                {!hasErrors ? (
                  <>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{uiTexts.perfectLevel[language]}</h2>
                    <p className="text-muted-foreground mb-6">{uiTexts.errorCount0[language]}</p>
                    {level < 6 ? (
                      <Button onClick={handleNextLevel}
                        className="w-full py-4 text-white rounded-xl text-lg font-semibold"
                        style={{ backgroundColor: "#4A6741" }}>
                        {uiTexts.nextLevel[language]}<ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={() => setPhase("final")}
                        className="w-full py-4 text-white rounded-xl text-lg font-semibold"
                        style={{ backgroundColor: "#4A6741" }}>
                        {language === "fr" ? "Voir le résultat final" : "See final result"}
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                      <AlertCircle className="w-10 h-10 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {currentVersion === "A" ? uiTexts.errorCount1[language] : uiTexts.errorCount2[language]}
                    </h2>
                    <p className="text-muted-foreground mb-6">{uiTexts.retryMessage[language]}</p>
                    <Button onClick={handleRetry}
                      className="w-full py-4 text-white rounded-xl text-lg font-semibold"
                      style={{ backgroundColor: getLevelColor() }}>
                      {uiTexts.retry[language]}<ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={onBack} className="w-full mt-3">{uiTexts.back[language]}</Button>
              </div>
            </motion.div>
          )}

          {/* FINAL SCREEN */}
          {phase === "final" && (
            <motion.div key="final" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-lg">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <span className="text-5xl">🧠</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{uiTexts.finalTitle[language]}</h2>
                <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">{uiTexts.finalMessage[language]}</p>

                <Button variant="outline" onClick={onBack} className="w-full">{uiTexts.back[language]}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AntiInflammatoryQuizGame;
