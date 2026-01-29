import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/data/quizData";
import { healthQuizLevels, healthQuizTranslations } from "@/data/healthQuizData";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { supabase } from "@/integrations/supabase/client";

// Confetti celebration function
const fireConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'],
    });
  }, 250);
};

interface HealthQuizGameProps {
  language: Language;
  level: 1 | 2 | 3;
  onBack: () => void;
}

interface MistakeRecord {
  questionIndex: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

type GameState = "email" | "reading" | "quiz" | "feedback" | "results";

const HealthQuizGame = ({ language, level, onBack }: HealthQuizGameProps) => {
  const t = healthQuizTranslations[language];
  const levelData = healthQuizLevels.find(l => l.level === level)!;
  
  const [gameState, setGameState] = useState<GameState>("email");
  const [email, setEmail] = useState("");
  const [readingTimeLeft, setReadingTimeLeft] = useState(levelData.readingTime);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);

  // Email validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error(t.invalidEmail);
      return;
    }
    
    // Save email to Supabase
    try {
      await supabase.from("signups").insert({
        email: email,
        quiz_id: `health-quiz-${level}`,
        score: null
      });
    } catch (error) {
      console.error("Error saving email:", error);
    }
    
    setGameState("reading");
  };

  // Reading timer
  useEffect(() => {
    if (gameState !== "reading") return;
    
    if (readingTimeLeft <= 0) {
      setGameState("quiz");
      return;
    }

    const timer = setInterval(() => {
      setReadingTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, readingTimeLeft]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === levelData.questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    } else {
      // Record mistake
      const question = levelData.questions[currentQuestion];
      setMistakes(prev => [...prev, {
        questionIndex: currentQuestion,
        question: question.question[language],
        userAnswer: question.options[language][answerIndex],
        correctAnswer: question.options[language][question.correctAnswer]
      }]);
    }
    
    setGameState("feedback");
  };

  const handleNextQuestion = () => {
    if (currentQuestion < levelData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setGameState("quiz");
    } else {
      // Quiz finished
      const isPerfect = score + (isAnswerCorrect ? 1 : 0) === levelData.questions.length;
      if (isPerfect) {
        fireConfetti();
      }
      
      // Update score in database
      supabase.from("signups")
        .update({ score: score + (isAnswerCorrect ? 1 : 0) })
        .eq("email", email)
        .eq("quiz_id", `health-quiz-${level}`)
        .then(() => {});
      
      setGameState("results");
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(levelData.couponCode);
    toast.success(t.couponCopied);
  };

  const handleRestart = () => {
    setGameState("email");
    setEmail("");
    setReadingTimeLeft(levelData.readingTime);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setMistakes([]);
  };

  const isPerfectScore = score === levelData.questions.length;

  // Email input screen
  if (gameState === "email") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
        <div className="p-4">
          <Button variant="ghost" onClick={onBack} className="text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Button>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">❤️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
              <p className="text-gray-600">{t.level} {level}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.enterEmail}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-white text-gray-900 border-gray-300"
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
              </div>
              
              <Button 
                onClick={handleEmailSubmit}
                className="w-full btn-primary-custom"
              >
                {t.start}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Reading phase
  if (gameState === "reading") {
    const progressPercent = (readingTimeLeft / levelData.readingTime) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
        <div className="p-4">
          <Button variant="ghost" onClick={onBack} className="text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Timer */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{t.timeRemaining}</span>
                </div>
                <span className={`text-2xl font-bold ${readingTimeLeft <= 5 ? 'text-red-500' : 'text-primary'}`}>
                  {readingTimeLeft}s
                </span>
              </div>
              <Progress 
                value={progressPercent} 
                className={`h-3 ${readingTimeLeft <= 5 ? '[&>div]:bg-red-500' : ''}`}
              />
            </div>
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
              📖 {t.readText}
            </h2>
            
            {/* Text to memorize */}
            <motion.div 
              className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-base sm:text-lg text-gray-900 leading-relaxed whitespace-pre-line">
                {levelData.text[language]}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz phase
  if (gameState === "quiz" || gameState === "feedback") {
    const question = levelData.questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
        <div className="p-4">
          <Button variant="ghost" onClick={onBack} className="text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {t.question} {currentQuestion + 1} {t.of} {levelData.questions.length}
                </span>
                <span className="text-sm font-bold text-primary">
                  {t.score}: {score}/{currentQuestion + (gameState === "feedback" ? 1 : 0)}
                </span>
              </div>
              <Progress value={((currentQuestion + 1) / levelData.questions.length) * 100} className="h-2" />
            </div>
            
            {/* Question */}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              {question.question[language]}
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {question.options[language].map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
                
                if (gameState === "feedback") {
                  if (index === question.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800";
                  } else if (index === selectedAnswer && !isAnswerCorrect) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-500 opacity-60";
                  }
                } else {
                  buttonClass += "border-gray-200 bg-white text-gray-900 hover:border-primary hover:bg-primary/5 cursor-pointer";
                }
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={gameState === "feedback"}
                    className={buttonClass}
                    whileHover={gameState === "quiz" ? { scale: 1.02 } : {}}
                    whileTap={gameState === "quiz" ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {gameState === "feedback" && index === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                      )}
                      {gameState === "feedback" && index === selectedAnswer && !isAnswerCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Feedback & Next button */}
            <AnimatePresence>
              {gameState === "feedback" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className={`p-4 rounded-xl mb-4 ${isAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <div className="flex items-center gap-2">
                      {isAnswerCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                      <span className="font-semibold">
                        {isAnswerCorrect ? t.correct : t.incorrect}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleNextQuestion}
                    className="w-full btn-primary-custom"
                  >
                    {currentQuestion < levelData.questions.length - 1 ? t.next : t.results}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results phase
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      <div className="p-4">
        <Button variant="ghost" onClick={onBack} className="text-foreground">
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t.back}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Score display */}
          <div className="text-center mb-6">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${isPerfectScore ? 'bg-yellow-100' : 'bg-gray-100'}`}>
              {isPerfectScore ? (
                <Trophy className="w-10 h-10 text-yellow-500" />
              ) : (
                <span className="text-3xl">📊</span>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isPerfectScore ? t.perfect : t.results}
            </h2>
            
            <div className="text-4xl font-bold text-primary mb-2">
              {score} / {levelData.questions.length}
            </div>
          </div>
          
          {/* Coupon for perfect score */}
          {isPerfectScore && (
            <motion.div 
              className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-amber-800 mb-2 text-center">
                🎉 {t.couponTitle}
              </h3>
              <p className="text-amber-700 text-center mb-4">{t.couponText}</p>
              
              <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 border border-amber-200">
                <span className="text-2xl font-mono font-bold text-primary">
                  {levelData.couponCode}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCoupon}
                  className="text-amber-600 hover:text-amber-800"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              
              <p className="text-center text-amber-600 mt-2 text-sm">
                {levelData.discountPercent} {t.discount}
              </p>
            </motion.div>
          )}
          
          {/* Mistakes review - only show if there are mistakes */}
          {mistakes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                {t.yourMistakes}
              </h3>
              
              <div className="space-y-4">
                {mistakes.map((mistake, index) => (
                  <div key={index} className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="font-medium text-gray-900 mb-2">{mistake.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-red-700">
                          <span className="font-medium">{t.yourAnswer}:</span> {mistake.userAnswer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-green-700">
                          <span className="font-medium">{t.correctAnswer}:</span> {mistake.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Shop button */}
          <a
            href="https://www.peita.fr/product-page/8-boites-de-petites-sardines"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mb-4"
          >
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 rounded-xl">
              <ExternalLink className="w-5 h-5 mr-2" />
              {t.visitShop}
            </Button>
          </a>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRestart}
              className="flex-1"
            >
              {t.tryAgain}
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              {t.back}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthQuizGame;
