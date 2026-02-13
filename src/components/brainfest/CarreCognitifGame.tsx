import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Language } from "@/data/quizData";
import { 
  uiTexts, 
  levelColors, 
  levelConfigs,
  SYMBOLS,
  LEVEL_5_SYMBOLS,
  generateValidGrid,
  createPuzzle,
  isValidPlacement,
  isGridComplete,
  checkSolution,
  LevelConfig
} from "@/data/carreCognitifData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, RotateCcw, Share2, Home } from "lucide-react";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";
import { useQuizEmail } from "@/hooks/useQuizEmail";

interface CarreCognitifGameProps {
  language: Language;
  onBack: () => void;
}

type GamePhase = "email" | "level-select" | "playing" | "memorize" | "reconstruct" | "feedback" | "complete";

const CarreCognitifGame = ({ language, onBack }: CarreCognitifGameProps) => {
  const { email, setEmail, saveEmail, hasStoredEmail } = useQuizEmail("carre-cognitif");
  const [phase, setPhase] = useState<GamePhase>(() => hasStoredEmail ? "level-select" : "email");
  const [emailError, setEmailError] = useState("");
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [solution, setSolution] = useState<string[][]>([]);
  const [originalPuzzle, setOriginalPuzzle] = useState<(string | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [memoryTimer, setMemoryTimer] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastSolveTime, setLastSolveTime] = useState<number | null>(null);
  
  const audioContext = useRef<AudioContext | null>(null);
  const { checkEmailUsed, saveAttempt, updateScore, isChecking } = useQuizAttempt();

  const currentConfig = levelConfigs.find(c => c.level === currentLevel) || levelConfigs[0];

  // Initialize audio context
  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return () => {
      audioContext.current?.close();
    };
  }, []);

  // Play sound
  const playSound = useCallback((frequency: number, duration: number) => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.2, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  }, []);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedEmail = (formData.get("email") as string || "").trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submittedEmail)) {
      setEmailError(language === "fr" ? "Email invalide" : "Invalid email");
      return;
    }

    saveEmail(submittedEmail);
    await saveAttempt(submittedEmail, "carre-cognitif", null);
    setPhase("level-select");
  };

  // Initialize a new level
  const initializeLevel = useCallback((level: number) => {
    const config = levelConfigs.find(c => c.level === level) || levelConfigs[0];
    const symbols = config.gridSize === 5 ? LEVEL_5_SYMBOLS : SYMBOLS;
    
    const fullGrid = generateValidGrid(config.gridSize, symbols);
    
    // Number of empty cells increases with level
    const emptyCells = Math.min(
      3 + (level - 1) * 2, 
      config.gridSize * config.gridSize - config.gridSize
    );
    
    const { puzzle, solution: sol } = createPuzzle(fullGrid, emptyCells);
    
    setGrid(puzzle);
    setOriginalPuzzle(puzzle.map(row => [...row]));
    setSolution(sol);
    setSelectedCell(null);
    setIsCorrect(null);
    setStartTime(Date.now());
    
    if (config.memoryMode) {
      setMemoryTimer(config.memoryTime);
      setPhase("memorize");
      // Show full grid first
      setGrid(sol.map(row => [...row]));
    } else {
      setPhase("playing");
    }
  }, []);

  // Memory mode timer
  useEffect(() => {
    if (phase === "memorize" && memoryTimer > 0) {
      const timer = setTimeout(() => {
        setMemoryTimer(memoryTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "memorize" && memoryTimer === 0) {
      // Switch to reconstruct phase
      setGrid(originalPuzzle.map(row => [...row]));
      setPhase("reconstruct");
    }
  }, [phase, memoryTimer, originalPuzzle]);

  // Handle cell selection
  const handleCellClick = (row: number, col: number) => {
    if (phase !== "playing" && phase !== "reconstruct") return;
    if (originalPuzzle[row][col] !== null) return; // Can't select pre-filled cells
    
    setSelectedCell([row, col]);
    playSound(440, 0.1);
  };

  // Handle symbol selection
  const handleSymbolSelect = (symbol: string) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = symbol;
    setGrid(newGrid);
    setSelectedCell(null);
    playSound(523, 0.1);
  };

  // Validate the grid
  const handleValidate = () => {
    const isComplete = isGridComplete(grid);
    if (!isComplete) {
      playSound(220, 0.3);
      return;
    }

    const correct = checkSolution(grid, solution);
    setIsCorrect(correct);
    
    if (correct) {
      playSound(659, 0.2);
      setTimeout(() => playSound(784, 0.2), 100);
      setTimeout(() => playSound(988, 0.3), 200);
      
      const solveTime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
      setLastSolveTime(solveTime);
      
      if (!bestTime || solveTime < bestTime) {
        setBestTime(solveTime);
      }
      
      setScore(score + currentLevel * 10);
      setCompletedLevels([...completedLevels, currentLevel]);
      
      // Update score in database
      updateScore(email, "carre-cognitif", score + currentLevel * 10);
    } else {
      playSound(220, 0.3);
    }
    
    setPhase("feedback");
  };

  // Handle next level
  const handleNextLevel = () => {
    if (currentLevel < 7) {
      setCurrentLevel(currentLevel + 1);
      initializeLevel(currentLevel + 1);
    } else {
      setPhase("complete");
    }
  };

  // Handle retry
  const handleRetry = () => {
    initializeLevel(currentLevel);
  };

  // Render email input phase
  if (phase === "email") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#F8F8F8" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg" style={{ borderRadius: "12px" }}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <span className="text-5xl mb-4">🧠</span>
                <h1 
                  className="text-2xl font-bold text-center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {uiTexts.gameTitle[language]}
                </h1>
              </div>

              <p 
                className="text-center text-muted-foreground mb-6"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}
              >
                {uiTexts.emailPrompt[language]}
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="votre@email.com"
                    className="mt-1"
                    style={{ borderRadius: "8px" }}
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isChecking || !email}
                  className="w-full"
                  style={{ 
                    backgroundColor: "#1E90FF", 
                    borderRadius: "12px",
                    fontFamily: "Montserrat, sans-serif"
                  }}
                >
                  {isChecking ? "..." : uiTexts.start[language]}
                </Button>
              </form>

                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="w-full mt-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {uiTexts.back[language]}
                </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render level selection
  if (phase === "level-select") {
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-8" style={{ backgroundColor: "#F8F8F8" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 
              className="text-2xl font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {uiTexts.gameTitle[language]}
            </h1>
          </div>

          {/* Best time display */}
          {bestTime && (
            <div 
              className="text-center mb-6 p-3 bg-white rounded-lg shadow-sm"
              style={{ borderRadius: "12px", fontFamily: "Montserrat, sans-serif" }}
            >
              <p className="text-sm text-muted-foreground">
                {language === "fr" ? "Votre meilleur temps :" : "Your best time:"}
              </p>
              <p className="text-xl font-bold text-blue-600">{bestTime}s</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {levelConfigs.slice(0, 5).map((config) => {
              const isCompleted = completedLevels.includes(config.level);
              const isLocked = config.level > 1 && !completedLevels.includes(config.level - 1);
              
              return (
                <motion.button
                  key={config.level}
                  onClick={() => {
                    if (!isLocked) {
                      setCurrentLevel(config.level);
                      initializeLevel(config.level);
                    }
                  }}
                  disabled={isLocked}
                  className={`p-4 rounded-xl flex items-center gap-4 transition-all ${
                    isLocked ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"
                  }`}
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: isCompleted ? `2px solid ${levelColors[config.level as keyof typeof levelColors]}` : "1px solid #E0E0E0"
                  }}
                  whileHover={!isLocked ? { y: -2 } : {}}
                  whileTap={!isLocked ? { scale: 0.98 } : {}}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ 
                      backgroundColor: levelColors[config.level as keyof typeof levelColors],
                      fontFamily: "Montserrat, sans-serif"
                    }}
                  >
                    {isCompleted ? "✓" : config.level}
                  </div>
                  <div className="text-left flex-1">
                    <h3 
                      className="font-semibold"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {uiTexts.levelTitles[config.level as keyof typeof uiTexts.levelTitles][language]}
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {uiTexts.levelSubtitles[config.level as keyof typeof uiTexts.levelSubtitles][language]}
                    </p>
                  </div>
                  {isLocked && <span className="text-2xl">🔒</span>}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // Render memorize phase
  if (phase === "memorize") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#F8F8F8" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {uiTexts.memorize[language]}
          </h2>
          
          <div 
            className="text-4xl font-bold mb-6"
            style={{ color: levelColors[currentLevel as keyof typeof levelColors] }}
          >
            {memoryTimer}s
          </div>

          <div 
            className="inline-grid gap-2 p-4 bg-white rounded-xl shadow-lg"
            style={{ 
              gridTemplateColumns: `repeat(${currentConfig.gridSize}, 1fr)`,
              borderRadius: "12px"
            }}
          >
            {grid.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-lg text-2xl sm:text-3xl"
                  style={{ borderRadius: "8px" }}
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Render playing or reconstruct phase
  if (phase === "playing" || phase === "reconstruct") {
    const symbols = currentConfig.gridSize === 5 ? LEVEL_5_SYMBOLS : SYMBOLS;
    
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-8" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div 
              className="px-4 py-2 rounded-full text-white font-semibold"
              style={{ 
                backgroundColor: levelColors[currentLevel as keyof typeof levelColors],
                fontFamily: "Montserrat, sans-serif"
              }}
            >
              {language === "fr" ? "Niveau" : "Level"} {currentLevel}
            </div>
            <div className="w-10" />
          </div>

          {/* Title */}
          <h2 
            className="text-xl font-bold text-center mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {uiTexts.levelTitles[currentLevel as keyof typeof uiTexts.levelTitles][language]}
          </h2>

          {/* Rule hint */}
          <p 
            className="text-center text-sm text-muted-foreground mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {phase === "reconstruct" 
              ? uiTexts.reconstruct[language]
              : currentConfig.hiddenRule 
                ? uiTexts.hiddenRuleHint[language]
                : uiTexts.rule[language]
            }
          </p>

          {/* Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div 
              className="inline-grid gap-2 p-4 bg-white rounded-xl shadow-lg"
              style={{ 
                gridTemplateColumns: `repeat(${currentConfig.gridSize}, 1fr)`,
                borderRadius: "12px"
              }}
            >
              {grid.map((row, rowIndex) => 
                row.map((cell, colIndex) => {
                  const isEditable = originalPuzzle[rowIndex][colIndex] === null;
                  const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                  
                  return (
                    <motion.button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl transition-all ${
                        isEditable 
                          ? "cursor-pointer hover:bg-blue-50" 
                          : "cursor-default"
                      } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                      style={{ 
                        backgroundColor: isEditable 
                          ? (cell ? "#E8F4FF" : "#F0F0F0") 
                          : "#FFFFFF",
                        borderRadius: "8px",
                        border: isSelected ? "2px solid #1E90FF" : "1px solid #E0E0E0"
                      }}
                      whileTap={isEditable ? { scale: 0.95 } : {}}
                    >
                      {cell || (isEditable ? "" : "")}
                    </motion.button>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Symbol selector */}
          <AnimatePresence>
            {selectedCell && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-6"
              >
                <p 
                  className="text-center text-sm mb-3"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {uiTexts.selectSymbol[language]}
                </p>
                <div className="flex justify-center gap-3">
                  {symbols.map((symbol) => (
                    <motion.button
                      key={symbol}
                      onClick={() => handleSymbolSelect(symbol)}
                      className="w-16 h-16 flex items-center justify-center text-3xl sm:text-4xl bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                      style={{ borderRadius: "12px" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {symbol}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Validate button */}
          <Button
            onClick={handleValidate}
            disabled={!isGridComplete(grid)}
            className="w-full py-7 text-lg"
            style={{ 
              backgroundColor: isGridComplete(grid) ? "#1E90FF" : "#CCCCCC",
              borderRadius: "12px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px"
            }}
          >
            <Check className="w-5 h-5 mr-2" />
            {uiTexts.validate[language]}
          </Button>
        </div>
      </div>
    );
  }

  // Render feedback phase
  if (phase === "feedback") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#F8F8F8" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <Card className="shadow-lg" style={{ borderRadius: "12px" }}>
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl mb-6"
              >
                {isCorrect ? "🎉" : "🤔"}
              </motion.div>

              <p 
                className="text-lg mb-6 leading-relaxed"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {isCorrect 
                  ? uiTexts.feedbackCorrect[currentLevel as keyof typeof uiTexts.feedbackCorrect][language]
                  : uiTexts.feedbackIncorrect[language]
                }
              </p>

              {isCorrect && lastSolveTime && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg" style={{ borderRadius: "8px" }}>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr" ? "Temps de résolution :" : "Solve time:"}
                  </p>
                  <p className="text-xl font-bold text-blue-600">{lastSolveTime}s</p>
                </div>
              )}

              <div className="space-y-3">
                {isCorrect ? (
                  <Button
                    onClick={handleNextLevel}
                    className="w-full py-6"
                    style={{ 
                      backgroundColor: "#1E90FF",
                      borderRadius: "12px",
                      fontFamily: "Montserrat, sans-serif"
                    }}
                  >
                    {currentLevel < 5 ? uiTexts.nextLevel[language] : uiTexts.replay[language]}
                  </Button>
                ) : (
                  <Button
                    onClick={handleRetry}
                    className="w-full py-6"
                    style={{ 
                      backgroundColor: "#1E90FF",
                      borderRadius: "12px",
                      fontFamily: "Montserrat, sans-serif"
                    }}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {uiTexts.retry[language]}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => setPhase("level-select")}
                  className="w-full"
                  style={{ borderRadius: "12px", fontFamily: "Montserrat, sans-serif" }}
                >
                  <Home className="w-5 h-5 mr-2" />
                  {language === "fr" ? "Choisir un niveau" : "Choose a level"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render complete phase
  if (phase === "complete") {
    const clarityPercentage = Math.min(18, Math.round((completedLevels.length / 5) * 18));
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#F8F8F8" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <Card className="shadow-lg" style={{ borderRadius: "12px" }}>
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl mb-6"
              >
                🏆
              </motion.div>

              <h2 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {language === "fr" ? "Félicitations !" : "Congratulations!"}
              </h2>

              <p 
                className="text-muted-foreground mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {uiTexts.finalMessage[language]}
              </p>

              {/* Clarity gauge */}
              <div className="mb-8">
                <p 
                  className="text-sm text-muted-foreground mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {uiTexts.clarityGauge[language]}
                </p>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(clarityPercentage / 18) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full rounded-full"
                    style={{ 
                      background: "linear-gradient(90deg, #98FB98, #1E90FF)"
                    }}
                  />
                </div>
                <p 
                  className="text-2xl font-bold mt-2"
                  style={{ 
                    fontFamily: "Montserrat, sans-serif",
                    background: "linear-gradient(90deg, #98FB98, #1E90FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  +{clarityPercentage}%
                </p>
              </div>

              {/* Best time */}
              {bestTime && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg" style={{ borderRadius: "8px" }}>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr" ? "Votre meilleur temps :" : "Your best time:"}
                  </p>
                  <p className="text-xl font-bold text-blue-600">{bestTime}s</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setCurrentLevel(1);
                    setCompletedLevels([]);
                    setScore(0);
                    setPhase("level-select");
                  }}
                  className="w-full py-6"
                  style={{ 
                    backgroundColor: "#1E90FF",
                    borderRadius: "12px",
                    fontFamily: "Montserrat, sans-serif"
                  }}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  {uiTexts.replay[language]}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    const text = language === "fr"
                      ? `J'ai atteint +${clarityPercentage}% de clarté mentale au Carré Cognitif ! 🧠`
                      : `I reached +${clarityPercentage}% mental clarity at the Cognitive Square! 🧠`;
                    navigator.share?.({ text }) || navigator.clipboard.writeText(text);
                  }}
                  className="w-full"
                  style={{ borderRadius: "12px", fontFamily: "Montserrat, sans-serif" }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {uiTexts.share[language]}
                </Button>

                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="w-full"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {uiTexts.discover[language]}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default CarreCognitifGame;
