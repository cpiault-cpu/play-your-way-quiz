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

// Piano notes for levels 1 & 2 - vivid colors for better visibility
const PIANO_NOTES = [
  { name: "C", frequency: 261.63, color: "from-red-500 to-red-600", activeColor: "from-red-300 to-red-400 shadow-red-400/60" },
  { name: "D", frequency: 293.66, color: "from-orange-500 to-orange-600", activeColor: "from-orange-300 to-orange-400 shadow-orange-400/60" },
  { name: "E", frequency: 329.63, color: "from-yellow-400 to-yellow-500", activeColor: "from-yellow-200 to-yellow-300 shadow-yellow-300/60" },
  { name: "F", frequency: 349.23, color: "from-emerald-500 to-emerald-600", activeColor: "from-emerald-300 to-emerald-400 shadow-emerald-400/60" },
  { name: "G", frequency: 392.0, color: "from-blue-500 to-blue-600", activeColor: "from-blue-300 to-blue-400 shadow-blue-400/60" },
  { name: "A", frequency: 440.0, color: "from-indigo-500 to-indigo-600", activeColor: "from-indigo-300 to-indigo-400 shadow-indigo-400/60" },
  { name: "B", frequency: 493.88, color: "from-purple-500 to-purple-600", activeColor: "from-purple-300 to-purple-400 shadow-purple-400/60" },
  { name: "C2", frequency: 523.25, color: "from-pink-500 to-pink-600", activeColor: "from-pink-300 to-pink-400 shadow-pink-400/60" },
];

// Instrument sounds for level 3 - each note is a different instrument
type InstrumentType = "piano" | "violin" | "flute" | "cymbal" | "bassDrum" | "xylophone" | "trumpet" | "guitar" | "harp" | "bell";

interface InstrumentNote {
  name: string;
  instrument: InstrumentType;
  frequency: number;
  color: string;
  activeColor: string;
  emoji: string;
}

const INSTRUMENT_NOTES: InstrumentNote[] = [
  { name: "Piano", instrument: "piano", frequency: 261.63, color: "from-slate-600 to-slate-700", activeColor: "from-slate-400 to-slate-500 shadow-slate-400/60", emoji: "🎹" },
  { name: "Violon", instrument: "violin", frequency: 440.0, color: "from-amber-600 to-amber-700", activeColor: "from-amber-400 to-amber-500 shadow-amber-400/60", emoji: "🎻" },
  { name: "Flûte", instrument: "flute", frequency: 523.25, color: "from-sky-500 to-sky-600", activeColor: "from-sky-300 to-sky-400 shadow-sky-400/60", emoji: "🪈" },
  { name: "Cymbale", instrument: "cymbal", frequency: 0, color: "from-yellow-500 to-yellow-600", activeColor: "from-yellow-300 to-yellow-400 shadow-yellow-400/60", emoji: "🥁" },
  { name: "Grosse caisse", instrument: "bassDrum", frequency: 60, color: "from-red-700 to-red-800", activeColor: "from-red-500 to-red-600 shadow-red-500/60", emoji: "🪘" },
  { name: "Xylophone", instrument: "xylophone", frequency: 587.33, color: "from-pink-500 to-pink-600", activeColor: "from-pink-300 to-pink-400 shadow-pink-400/60", emoji: "🎵" },
  { name: "Trompette", instrument: "trumpet", frequency: 349.23, color: "from-orange-500 to-orange-600", activeColor: "from-orange-300 to-orange-400 shadow-orange-400/60", emoji: "🎺" },
  { name: "Guitare", instrument: "guitar", frequency: 196.0, color: "from-rose-600 to-rose-700", activeColor: "from-rose-400 to-rose-500 shadow-rose-400/60", emoji: "🎸" },
  { name: "Harpe", instrument: "harp", frequency: 392.0, color: "from-violet-500 to-violet-600", activeColor: "from-violet-300 to-violet-400 shadow-violet-400/60", emoji: "🎶" },
  { name: "Cloche", instrument: "bell", frequency: 880.0, color: "from-teal-500 to-teal-600", activeColor: "from-teal-300 to-teal-400 shadow-teal-400/60", emoji: "🔔" },
];

const translations = {
  fr: {
    title: "Mémoire Musicale",
    subtitle: "Reproduisez la séquence de notes",
    round: "Série",
    listen: "Écoutez la séquence...",
    yourTurn: "À vous de jouer !",
    success: "Bravo ! Série réussie",
    failure: "Oops ! Mauvaise note",
    gameOver: "Partie terminée",
    victory: "Victoire !",
    finalScore: "Score final",
    rounds: "séries réussies",
    youWon: "Vous avez gagné !",
    playAgain: "Rejouer",
    back: "Retour",
    start: "Commencer",
    instructions: "Écoutez la séquence de notes et reproduisez-la en cliquant sur les touches colorées dans le bon ordre.",
    level1Desc: "6 notes • 3 séries à mémoriser",
    level2Desc: "8 notes par séquence",
    level3Desc: "10 notes • Instruments différents",
    seriesOf: "Série",
    of: "sur",
  },
  en: {
    title: "Musical Memory",
    subtitle: "Reproduce the note sequence",
    round: "Series",
    listen: "Listen to the sequence...",
    yourTurn: "Your turn!",
    success: "Great! Series completed",
    failure: "Oops! Wrong note",
    gameOver: "Game Over",
    victory: "Victory!",
    finalScore: "Final Score",
    rounds: "series completed",
    youWon: "You won!",
    playAgain: "Play Again",
    back: "Back",
    start: "Start",
    instructions: "Listen to the sequence of notes and reproduce it by clicking the colored keys in the correct order.",
    level1Desc: "6 notes • 3 series to memorize",
    level2Desc: "8 notes per sequence",
    level3Desc: "10 notes • Different instruments",
    seriesOf: "Series",
    of: "of",
  },
};

// Level configuration
const LEVEL_CONFIG = {
  1: { notesPerSequence: 6, seriesToWin: 3, useInstruments: false },
  2: { notesPerSequence: 8, seriesToWin: 1, useInstruments: false },
  3: { notesPerSequence: 10, seriesToWin: 1, useInstruments: true },
};

const MusicalMemoryGame = ({ language, level, onBack }: MusicalMemoryGameProps) => {
  const t = translations[language];
  const audioContextRef = useRef<AudioContext | null>(null);
  const config = LEVEL_CONFIG[level];
  const notes = config.useInstruments ? INSTRUMENT_NOTES : PIANO_NOTES;
  
  const [gameState, setGameState] = useState<"idle" | "playing" | "listening" | "input" | "success" | "failure" | "gameover" | "victory">("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [currentSeries, setCurrentSeries] = useState(0);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [seriesCompleted, setSeriesCompleted] = useState(0);

  // Initialize AudioContext
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play instrument sound based on type
  const playInstrumentSound = useCallback((instrument: InstrumentType, frequency: number, audioContext: AudioContext) => {
    const currentTime = audioContext.currentTime;
    
    switch (instrument) {
      case "piano": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.5, currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.8);
        break;
      }
      case "violin": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.3, currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.8);
        break;
      }
      case "flute": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.6);
        break;
      }
      case "cymbal": {
        const bufferSize = audioContext.sampleRate * 0.5;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.15));
        }
        const source = audioContext.createBufferSource();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(3000, currentTime);
        source.buffer = buffer;
        gain.gain.setValueAtTime(0.4, currentTime);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        source.start(currentTime);
        break;
      }
      case "bassDrum": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, currentTime + 0.15);
        gain.gain.setValueAtTime(0.8, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.4);
        break;
      }
      case "xylophone": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.3);
        break;
      }
      case "trumpet": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0.2, currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 0.6);
        break;
      }
      case "guitar": {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc1.type = "triangle";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        gain.gain.setValueAtTime(0.4, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioContext.destination);
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc1.stop(currentTime + 0.5);
        osc2.stop(currentTime + 0.5);
        break;
      }
      case "harp": {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, currentTime);
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(currentTime);
        osc.stop(currentTime + 1.2);
        break;
      }
      case "bell": {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc1.type = "sine";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2.4, currentTime);
        gain.gain.setValueAtTime(0.3, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioContext.destination);
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc1.stop(currentTime + 1);
        osc2.stop(currentTime + 1);
        break;
      }
    }
  }, []);

  // Play a note using Web Audio API
  const playNote = useCallback((noteIndex: number, duration = 400) => {
    const audioContext = initAudio();
    const note = notes[noteIndex];
    
    if (config.useInstruments) {
      const instrumentNote = note as InstrumentNote;
      playInstrumentSound(instrumentNote.instrument, instrumentNote.frequency, audioContext);
    } else {
      // Standard piano sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime((note as typeof PIANO_NOTES[0]).frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Visual feedback
    setActiveNote(noteIndex);
    setTimeout(() => setActiveNote(null), duration - 50);
  }, [initAudio, notes, config.useInstruments, playInstrumentSound]);

  // Play the sequence
  const playSequence = useCallback(async (seq: number[]) => {
    setGameState("listening");
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 700));
      playNote(seq[i], 500);
    }
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setGameState("input");
    setPlayerInput([]);
  }, [playNote]);

  // Generate new sequence
  const generateSequence = useCallback((length: number) => {
    const newSequence: number[] = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * notes.length));
    }
    return newSequence;
  }, [notes.length]);

  // Start new game
  const startGame = useCallback(() => {
    const newSequence = generateSequence(config.notesPerSequence);
    setSequence(newSequence);
    setCurrentSeries(1);
    setSeriesCompleted(0);
    setPlayerInput([]);
    setGameState("playing");
    
    setTimeout(() => playSequence(newSequence), 1000);
  }, [generateSequence, playSequence, config.notesPerSequence]);

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
      const newSeriesCompleted = seriesCompleted + 1;
      setSeriesCompleted(newSeriesCompleted);
      
      // Check if player won (completed all required series)
      if (newSeriesCompleted >= config.seriesToWin) {
        setGameState("success");
        setTimeout(() => setGameState("victory"), 1500);
        return;
      }
      
      setGameState("success");
      
      // Generate next series (new sequence of same length)
      setTimeout(() => {
        const newSequence = generateSequence(config.notesPerSequence);
        setSequence(newSequence);
        setCurrentSeries(prev => prev + 1);
        playSequence(newSequence);
      }, 1500);
    }
  }, [gameState, playerInput, sequence, playNote, playSequence, generateSequence, config, seriesCompleted]);

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
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-foreground flex items-center gap-2">
              <Volume2 className="w-7 h-7 text-primary" />
              {t.title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
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
              className="text-center mb-6"
            >
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
                <p className="text-foreground text-lg md:text-xl mb-6">{t.instructions}</p>
                <Button
                  onClick={startGame}
                  className="btn-primary-custom text-primary-foreground font-medium text-lg px-8 py-6"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
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
              className="mb-6"
            >
              {/* Round indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl md:text-2xl font-semibold text-foreground">
                  {t.seriesOf} {currentSeries} {t.of} {config.seriesToWin}
                </span>
                <span className="text-base md:text-lg text-muted-foreground font-medium">
                  {config.notesPerSequence} notes
                </span>
              </div>
              
              {/* Progress bar */}
              <Progress 
                value={gameState === "input" ? (playerInput.length / sequence.length) * 100 : 0} 
                className="h-3 mb-4"
              />
              
              {/* Status message */}
              <div className="text-center py-4">
                {gameState === "listening" && (
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xl md:text-2xl text-primary font-medium"
                  >
                    🎵 {t.listen}
                  </motion.p>
                )}
                {gameState === "input" && (
                  <p className="text-xl md:text-2xl text-foreground font-medium">
                    👆 {t.yourTurn}
                  </p>
                )}
                {gameState === "success" && (
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-xl md:text-2xl text-green-500 font-medium"
                  >
                    ✨ {t.success}
                  </motion.p>
                )}
                {gameState === "failure" && (
                  <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-xl md:text-2xl text-red-500 font-medium"
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
              className="text-center mb-6"
            >
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="text-6xl mb-4">😢</div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t.gameOver}
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {seriesCompleted} {t.rounds}
                </p>
                <p className="text-muted-foreground text-lg mb-6">
                  {t.finalScore}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={startGame}
                    className="btn-primary-custom text-primary-foreground text-lg px-6 py-5"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {t.playAgain}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-border text-lg px-6 py-5"
                  >
                    {t.back}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === "victory" && (
            <motion.div
              key="victory"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6"
            >
              <div className="bg-card border border-border rounded-xl p-8">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  🎉 {t.victory}
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {t.youWon}
                </p>
                <p className="text-muted-foreground text-lg mb-6">
                  {config.seriesToWin} {t.rounds}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={startGame}
                    className="btn-primary-custom text-primary-foreground text-lg px-6 py-5"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {t.playAgain}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="border-border text-lg px-6 py-5"
                  >
                    {t.back}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keys/Instruments Grid */}
        <div className={`grid gap-3 md:gap-4 ${config.useInstruments ? "grid-cols-5" : "grid-cols-4"}`}>
          {notes.map((note, index) => (
            <motion.button
              key={note.name}
              onClick={() => handleNoteClick(index)}
              disabled={gameState !== "input"}
              className={`
                relative aspect-square rounded-2xl font-bold text-sm md:text-lg
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
              <div className="flex flex-col items-center justify-center h-full">
                {config.useInstruments && (
                  <span className="text-2xl md:text-3xl mb-1">{(note as InstrumentNote).emoji}</span>
                )}
                <span className={`drop-shadow-lg ${activeNote === index ? "text-gray-800 font-black" : "text-white"} ${config.useInstruments ? "text-xs md:text-sm" : ""}`}>
                  {note.name}
                </span>
              </div>
              
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
        <div className="mt-6 text-center text-base md:text-lg text-muted-foreground">
          {config.useInstruments ? (
            <p>🎹 Piano • 🎻 Violon • 🪈 Flûte • 🥁 Cymbale • 🪘 Grosse caisse</p>
          ) : (
            <p>Do (C) • Ré (D) • Mi (E) • Fa (F) • Sol (G) • La (A) • Si (B) • Do² (C2)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicalMemoryGame;
