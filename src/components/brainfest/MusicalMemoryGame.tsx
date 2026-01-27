import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Volume2, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/data/quizData";

interface MusicalMemoryGameProps {
  language: Language;
  level: 1 | 2 | 3;
  onBack: () => void;
}

// Piano notes with their frequencies - vivid colors for better visibility
const NOTES = [
  { name: "C", frequency: 261.63, color: "from-red-500 to-red-600", activeColor: "from-red-300 to-red-400 shadow-red-400/60" },
  { name: "D", frequency: 293.66, color: "from-orange-500 to-orange-600", activeColor: "from-orange-300 to-orange-400 shadow-orange-400/60" },
  { name: "E", frequency: 329.63, color: "from-yellow-400 to-yellow-500", activeColor: "from-yellow-200 to-yellow-300 shadow-yellow-300/60" },
  { name: "F", frequency: 349.23, color: "from-emerald-500 to-emerald-600", activeColor: "from-emerald-300 to-emerald-400 shadow-emerald-400/60" },
  { name: "G", frequency: 392.0, color: "from-blue-500 to-blue-600", activeColor: "from-blue-300 to-blue-400 shadow-blue-400/60" },
  { name: "A", frequency: 440.0, color: "from-indigo-500 to-indigo-600", activeColor: "from-indigo-300 to-indigo-400 shadow-indigo-400/60" },
  { name: "B", frequency: 493.88, color: "from-purple-500 to-purple-600", activeColor: "from-purple-300 to-purple-400 shadow-purple-400/60" },
  { name: "C2", frequency: 523.25, color: "from-pink-500 to-pink-600", activeColor: "from-pink-300 to-pink-400 shadow-pink-400/60" },
];

const translations = {
  fr: {
    title: "Mémoire Musicale",
    subtitle: "Reproduisez la séquence de notes",
    round: "Tour",
    listen: "Écoutez la séquence...",
    yourTurn: "À vous de jouer !",
    success: "Bravo ! Séquence correcte",
    failure: "Oops ! Mauvaise note",
    gameOver: "Partie terminée",
    finalScore: "Score final",
    rounds: "tours réussis",
    playAgain: "Rejouer",
    back: "Retour",
    start: "Commencer",
    instructions: "Écoutez la séquence de notes et reproduisez-la en cliquant sur les touches colorées dans le bon ordre.",
    level1Desc: "Séquences de 3-4 notes",
    level2Desc: "Séquences de 5-6 notes",
    level3Desc: "Séquences de 7-8 notes",
  },
  en: {
    title: "Musical Memory",
    subtitle: "Reproduce the note sequence",
    round: "Round",
    listen: "Listen to the sequence...",
    yourTurn: "Your turn!",
    success: "Great! Correct sequence",
    failure: "Oops! Wrong note",
    gameOver: "Game Over",
    finalScore: "Final Score",
    rounds: "rounds completed",
    playAgain: "Play Again",
    back: "Back",
    start: "Start",
    instructions: "Listen to the sequence of notes and reproduce it by clicking the colored keys in the correct order.",
    level1Desc: "Sequences of 3-4 notes",
    level2Desc: "Sequences of 5-6 notes",
    level3Desc: "Sequences of 7-8 notes",
  },
};

const MusicalMemoryGame = ({ language, level, onBack }: MusicalMemoryGameProps) => {
  const t = translations[language];
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const [gameState, setGameState] = useState<"idle" | "playing" | "listening" | "input" | "success" | "failure" | "gameover">("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Get starting sequence length based on level
  const getStartingLength = () => {
    switch (level) {
      case 1: return 3;
      case 2: return 5;
      case 3: return 7;
      default: return 3;
    }
  };

  // Initialize AudioContext
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play a note using Web Audio API
  const playNote = useCallback((noteIndex: number, duration = 400) => {
    const audioContext = initAudio();
    const note = NOTES[noteIndex];
    
    // Create oscillator for the main tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime);
    
    // Create a nice envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
    
    // Visual feedback
    setActiveNote(noteIndex);
    setTimeout(() => setActiveNote(null), duration - 50);
  }, [initAudio]);

  // Play the sequence
  const playSequence = useCallback(async (seq: number[]) => {
    setGameState("listening");
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      playNote(seq[i], 400);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setGameState("input");
    setPlayerInput([]);
  }, [playNote]);

  // Generate new sequence
  const generateSequence = useCallback((length: number) => {
    const newSequence: number[] = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * NOTES.length));
    }
    return newSequence;
  }, []);

  // Start new game
  const startGame = useCallback(() => {
    const startingLength = getStartingLength();
    const newSequence = generateSequence(startingLength);
    setSequence(newSequence);
    setRound(1);
    setScore(0);
    setPlayerInput([]);
    setGameState("playing");
    
    setTimeout(() => playSequence(newSequence), 1000);
  }, [generateSequence, playSequence]);

  // Handle player note click
  const handleNoteClick = useCallback((noteIndex: number) => {
    if (gameState !== "input") return;
    
    playNote(noteIndex, 300);
    const newInput = [...playerInput, noteIndex];
    setPlayerInput(newInput);
    
    // Check if this note is correct
    if (sequence[newInput.length - 1] !== noteIndex) {
      setGameState("failure");
      setTimeout(() => setGameState("gameover"), 1500);
      return;
    }
    
    // Check if sequence is complete
    if (newInput.length === sequence.length) {
      setGameState("success");
      setScore(prev => prev + 1);
      
      // Generate next round with one more note
      setTimeout(() => {
        const newSequence = [...sequence, Math.floor(Math.random() * NOTES.length)];
        setSequence(newSequence);
        setRound(prev => prev + 1);
        playSequence(newSequence);
      }, 1500);
    }
  }, [gameState, playerInput, sequence, playNote, playSequence]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getLevelDescription = () => {
    switch (level) {
      case 1: return t.level1Desc;
      case 2: return t.level2Desc;
      case 3: return t.level3Desc;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-primary" />
              {t.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {t.subtitle} • {getLevelDescription()}
            </p>
          </div>
        </div>

        {/* Game Status */}
        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <p className="text-foreground mb-4">{t.instructions}</p>
                <Button
                  onClick={startGame}
                  className="btn-primary-custom text-primary-foreground font-medium"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t.start}
                </Button>
              </div>
            </motion.div>
          )}

          {(gameState === "playing" || gameState === "listening" || gameState === "input" || gameState === "success" || gameState === "failure") && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              {/* Round indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-foreground">
                  {t.round} {round}
                </span>
                <span className="text-sm text-muted-foreground">
                  {sequence.length} notes
                </span>
              </div>
              
              {/* Progress bar */}
              <Progress 
                value={gameState === "input" ? (playerInput.length / sequence.length) * 100 : 0} 
                className="h-2 mb-4"
              />
              
              {/* Status message */}
              <div className="text-center py-4">
                {gameState === "listening" && (
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-lg text-primary font-medium"
                  >
                    🎵 {t.listen}
                  </motion.p>
                )}
                {gameState === "input" && (
                  <p className="text-lg text-foreground font-medium">
                    👆 {t.yourTurn}
                  </p>
                )}
                {gameState === "success" && (
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-lg text-green-500 font-medium"
                  >
                    ✨ {t.success}
                  </motion.p>
                )}
                {gameState === "failure" && (
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-lg text-red-500 font-medium"
                  >
                    ❌ {t.failure}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <div className="bg-card border border-border rounded-xl p-8">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {t.gameOver}
                </h2>
                <p className="text-3xl font-bold text-primary mb-2">
                  {score} {t.rounds}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t.finalScore}: {sequence.length - 1} notes max
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={startGame}
                    className="btn-primary-custom text-primary-foreground"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.playAgain}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-border"
                  >
                    {t.back}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Piano Keys */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {NOTES.map((note, index) => (
            <motion.button
              key={note.name}
              onClick={() => handleNoteClick(index)}
              disabled={gameState !== "input"}
              className={`
                relative aspect-square rounded-2xl font-bold text-lg md:text-xl
                transition-all duration-100
                ${activeNote === index 
                  ? `bg-gradient-to-br ${note.activeColor} scale-110 shadow-2xl ring-4 ring-white` 
                  : `bg-gradient-to-br ${note.color}`
                }
                ${gameState === "input" ? "hover:scale-105 hover:brightness-110 cursor-pointer active:scale-95" : "cursor-default opacity-80"}
                disabled:opacity-50
              `}
              whileTap={gameState === "input" ? { scale: 0.9 } : {}}
              animate={activeNote === index ? { 
                scale: [1, 1.15, 1.1],
              } : { scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              <span className={`drop-shadow-lg ${activeNote === index ? "text-gray-800 font-black" : "text-white"}`}>
                {note.name}
              </span>
              
              {/* Intense glow effect when active */}
              {activeNote === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-2xl bg-white/50 blur-xl -z-10"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Note names legend */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Do (C) • Ré (D) • Mi (E) • Fa (F) • Sol (G) • La (A) • Si (B) • Do² (C2)</p>
        </div>
      </div>
    </div>
  );
};

export default MusicalMemoryGame;
