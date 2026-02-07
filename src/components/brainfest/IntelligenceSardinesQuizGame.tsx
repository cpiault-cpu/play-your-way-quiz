import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight, Trophy, Share2, Sparkles } from "lucide-react";
import { Language } from "@/data/quizData";
import { 
  intelligenceSardinesLevels, 
  uiTexts,
  IntelligenceSardinesLevel
} from "@/data/intelligenceSardinesQuizData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { toast } from "sonner";
import FishIcon from "./icons/FishIcon";

interface IntelligenceSardinesQuizGameProps {
  language: Language;
  onBack: () => void;
}

type GamePhase = "email" | "intro" | "reading" | "quiz" | "feedback" | "results" | "final";

const QUIZ_ID = "intelligence-sardines";

const IntelligenceSardinesQuizGame = ({ language, onBack }: IntelligenceSardinesQuizGameProps) => {
  const [phase, setPhase] = useState<GamePhase>("email");
  const [email, setEmail] = useState("");
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [readingTimeLeft, setReadingTimeLeft] = useState(12);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  
  const { checkEmailUsed, saveAttempt, isChecking } = useQuizAttempt();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const levelData = intelligenceSardinesLevels.find(l => l.level === currentLevel) as IntelligenceSardinesLevel;

  // Play validation sound
  const playSound = useCallback(() => {
    try {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = isCorrect ? 800 : 400;
      oscillator.type = "sine";
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch {
      // Audio not supported, ignore
    }
  }, [isCorrect]);

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

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.error(language === "fr" ? "Veuillez entrer une adresse e-mail valide" : "Please enter a valid email address");
      return;
    }

    const emailUsed = await checkEmailUsed(email, QUIZ_ID);
    if (emailUsed) {
      toast.error(language === "fr" 
        ? "Cette adresse e-mail a déjà été utilisée pour ce quiz" 
        : "This email address has already been used for this quiz"
      );
      return;
    }

    try {
      await saveAttempt(email, QUIZ_ID);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error saving attempt:", error);
      }
    }

    setPhase("intro");
  };

  const handleStartLevel = () => {
    setReadingTimeLeft(levelData.readingTime);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setPhase("reading");
  };

  const handleAnswerSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === levelData.question.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      setCompletedLevels(prev => [...prev, currentLevel]);
    }
    
    setPhase("feedback");
    playSound();
  };

  const handleNextLevel = () => {
    if (currentLevel < 5) {
      setCurrentLevel((currentLevel + 1) as 1 | 2 | 3 | 4 | 5);
      setPhase("intro");
    } else {
      setPhase("final");
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setReadingTimeLeft(levelData.readingTime);
    setPhase("reading");
  };

  const handleReplay = () => {
    setCurrentLevel(1);
    setScore(0);
    setCompletedLevels([]);
    setPhase("intro");
  };

  const handleShare = async () => {
    const text = language === "fr"
      ? `J'ai obtenu ${score}/5 au quiz Intelligence Nutritionnelle : Les Sardines ! 🐟 Mon indice de clarté mentale : +${Math.round(score * 3.6)}%`
      : `I scored ${score}/5 on the Nutritional Intelligence: Sardines quiz! 🐟 My mental clarity index: +${Math.round(score * 3.6)}%`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success(language === "fr" ? "Copié dans le presse-papier !" : "Copied to clipboard!");
    }
  };

  const clarityPercentage = Math.round(score * 3.6); // Max 18% at 5/5

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-500" 
      style={{ 
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: phase === "final" ? "#f0f9ff" : `${levelData?.color}20` || "#f0f9ff"
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{uiTexts.back[language]}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <FishIcon className="w-6 h-6" color="#1E90FF" />
            <h1 className="text-lg font-bold text-foreground">
              {uiTexts.quizTitle[language]}
            </h1>
          </div>

          {/* Level indicators */}
          <div className="flex gap-1">
            {intelligenceSardinesLevels.map((level) => (
              <div
                key={level.level}
                className={`w-3 h-3 rounded-full transition-all ${
                  completedLevels.includes(level.level) ? "ring-2 ring-green-500" : ""
                }`}
                style={{ 
                  backgroundColor: level.color,
                  opacity: level.level === currentLevel ? 1 : 0.5
                }}
              />
            ))}
          </div>
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
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "#1E90FF20" }}
              >
                <FishIcon className="w-14 h-14" color="#1E90FF" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {uiTexts.quizTitle[language]}
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md">
                {uiTexts.emailPrompt[language]}
              </p>

              <div className="w-full max-w-sm space-y-4">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background text-foreground border-border"
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
                
                <Button
                  onClick={handleEmailSubmit}
                  disabled={isChecking || !email}
                  className="w-full py-6 text-lg font-semibold text-white rounded-xl"
                  style={{ backgroundColor: "#1E90FF" }}
                >
                  {uiTexts.start[language]}
                  <ChevronRight className="w-5 h-5 ml-2" />
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
                style={{ backgroundColor: `${levelData.color}40` }}
              >
                <span className="text-4xl font-bold" style={{ color: levelData.color === "#8B0000" ? "#8B0000" : levelData.color }}>
                  {currentLevel}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {levelData.title[language]}
              </h2>
              
              <p className="text-muted-foreground mb-8">
                {levelData.subtitle[language]}
              </p>

              <Button
                onClick={handleStartLevel}
                className="px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg"
                style={{ backgroundColor: levelData.color === "#8B0000" ? "#8B0000" : levelData.color }}
              >
                {uiTexts.start[language]}
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
                    {uiTexts.readingTimer[language]}
                  </span>
                  <span 
                    className="text-2xl font-bold" 
                    style={{ color: readingTimeLeft <= 5 ? "#DC2626" : levelData.color }}
                  >
                    {readingTimeLeft}s
                  </span>
                </div>
                <Progress 
                  value={(readingTimeLeft / levelData.readingTime) * 100} 
                  className="h-3"
                />
              </div>

              {/* Reading content */}
              <div 
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full"
                style={{ borderLeft: `4px solid ${levelData.color}` }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                  {uiTexts.readingPhase[language]}
                </h3>
                
                <div className="space-y-4">
                  {levelData.text[language].map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="text-foreground leading-relaxed"
                      style={{ fontSize: '16px' }}
                    >
                      • {line}
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
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col"
            >
              {/* Question */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 
                  className="text-xl font-semibold text-foreground mb-6"
                  style={{ fontSize: '18px' }}
                >
                  {levelData.question.question[language]}
                </h3>

                <div className="space-y-3">
                  {levelData.question.options[language].map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-sm font-bold"
                            style={{ borderColor: isSelected ? levelData.color : "#d1d5db" }}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium text-foreground" style={{ fontSize: '16px' }}>
                            {option}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <Button
                  onClick={handleValidate}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6 py-6 text-lg font-semibold text-white rounded-xl disabled:opacity-50"
                  style={{ backgroundColor: levelData.color === "#8B0000" ? "#8B0000" : levelData.color }}
                >
                  {uiTexts.validate[language]}
                </Button>
              </div>
            </motion.div>
          )}

          {/* FEEDBACK PHASE */}
          {phase === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div 
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full text-center"
                style={{ borderTop: `4px solid ${isCorrect ? "#22C55E" : "#EF4444"}` }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: isCorrect ? "#22C55E20" : "#EF444420" }}
                >
                  <span className="text-3xl">{isCorrect ? "✅" : "❌"}</span>
                </div>

                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: isCorrect ? "#166534" : "#991B1B" }}
                >
                  {isCorrect 
                    ? levelData.question.feedbackCorrect[language]
                    : levelData.question.feedbackIncorrect[language]
                  }
                </p>

                {isCorrect ? (
                  <Button
                    onClick={handleNextLevel}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    {currentLevel < 5 ? uiTexts.next[language] : (language === "fr" ? "Voir mes résultats" : "See my results")}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleRetry}
                    className="w-full py-6 text-lg font-semibold text-white rounded-xl"
                    style={{ backgroundColor: "#EF4444" }}
                  >
                    {uiTexts.retry[language]}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* FINAL RESULTS PHASE */}
          {phase === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              {/* Score */}
              <motion.div 
                className="w-28 h-28 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-blue-400 to-green-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">{score}/5</span>
                </div>
              </motion.div>

              {/* Final message */}
              <p className="text-lg text-center text-foreground mb-6 max-w-md leading-relaxed">
                {uiTexts.finalMessage[language]}
              </p>

              {/* Clarity Gauge */}
              <div className="w-full bg-white rounded-2xl shadow-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    {uiTexts.clarityGauge[language]}
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    +{clarityPercentage}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${clarityPercentage / 18 * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <Button
                  onClick={handleReplay}
                  className="w-full py-5 text-lg font-semibold text-white rounded-xl"
                  style={{ backgroundColor: "#1E90FF" }}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {uiTexts.replay[language]}
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full py-5 text-lg font-semibold rounded-xl"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {uiTexts.share[language]}
                </Button>

                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="w-full py-4 text-muted-foreground"
                >
                  {uiTexts.discover[language]}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default IntelligenceSardinesQuizGame;
