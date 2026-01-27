import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Volume2, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/data/quizData";
import confetti from "canvas-confetti";

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

    // Confetti from left side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'],
    });
    // Confetti from right side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#ff00ff'],
    });
  }, 250);
};

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

// Instrument sounds for level 3 - each note is a different instrument with rich sound synthesis
type InstrumentType = "piano" | "violin" | "flute" | "clarinet" | "cello" | "xylophone" | "trumpet" | "guitar" | "harp" | "bell";

interface InstrumentNote {
  instrument: InstrumentType;
  frequency: number;
  color: string;
  activeColor: string;
  emoji: string;
}

const INSTRUMENT_NOTES: InstrumentNote[] = [
  { instrument: "piano", frequency: 261.63, color: "from-slate-600 to-slate-700", activeColor: "from-slate-400 to-slate-500 shadow-slate-400/60", emoji: "🎹" },
  { instrument: "violin", frequency: 440.0, color: "from-amber-600 to-amber-700", activeColor: "from-amber-400 to-amber-500 shadow-amber-400/60", emoji: "🎻" },
  { instrument: "flute", frequency: 523.25, color: "from-sky-500 to-sky-600", activeColor: "from-sky-300 to-sky-400 shadow-sky-400/60", emoji: "🪈" },
  { instrument: "clarinet", frequency: 349.23, color: "from-emerald-600 to-emerald-700", activeColor: "from-emerald-400 to-emerald-500 shadow-emerald-400/60", emoji: "🎷" },
  { instrument: "cello", frequency: 130.81, color: "from-red-700 to-red-800", activeColor: "from-red-500 to-red-600 shadow-red-500/60", emoji: "🪕" },
  { instrument: "xylophone", frequency: 587.33, color: "from-pink-500 to-pink-600", activeColor: "from-pink-300 to-pink-400 shadow-pink-400/60", emoji: "🎵" },
  { instrument: "trumpet", frequency: 392.0, color: "from-orange-500 to-orange-600", activeColor: "from-orange-300 to-orange-400 shadow-orange-400/60", emoji: "🎺" },
  { instrument: "guitar", frequency: 196.0, color: "from-rose-600 to-rose-700", activeColor: "from-rose-400 to-rose-500 shadow-rose-400/60", emoji: "🎸" },
  { instrument: "harp", frequency: 329.63, color: "from-violet-500 to-violet-600", activeColor: "from-violet-300 to-violet-400 shadow-violet-400/60", emoji: "🎶" },
  { instrument: "bell", frequency: 880.0, color: "from-teal-500 to-teal-600", activeColor: "from-teal-300 to-teal-400 shadow-teal-400/60", emoji: "🔔" },
];

// Famous melody patterns inspired by classical/jazz pieces
// These are index sequences into INSTRUMENT_NOTES
const FAMOUS_MELODIES = {
  // 8 notes - Inspired by Beethoven's Ode to Joy theme
  round1: [0, 0, 1, 2, 2, 1, 0, 6], // Piano-Piano-Violin-Flute repeated pattern
  // 9 notes - Inspired by Mozart's Eine kleine Nachtmusik
  round2: [7, 7, 4, 7, 7, 4, 0, 1, 2],
  // 10 notes - Inspired by Take Five (jazz)
  round3: [3, 5, 8, 0, 9, 3, 5, 8, 0, 1],
};

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
  1: { notesPerSequence: 5, seriesToWin: 1, useInstruments: true },
  2: { notesPerSequence: 7, seriesToWin: 1, useInstruments: true },
  3: { notesPerSequence: 9, seriesToWin: 1, useInstruments: true },
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

  // Play instrument sound based on type - improved rich synthesis
  const playInstrumentSound = useCallback((instrument: InstrumentType, frequency: number, audioContext: AudioContext) => {
    const currentTime = audioContext.currentTime;
    
    // Create master gain for all instruments
    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.6, currentTime);
    masterGain.connect(audioContext.destination);
    
    switch (instrument) {
      case "piano": {
        // Rich piano with harmonics
        const fundamentalGain = audioContext.createGain();
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();
        
        osc1.type = "sine";
        osc2.type = "sine";
        osc3.type = "sine";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        osc3.frequency.setValueAtTime(frequency * 3, currentTime);
        
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        
        gain1.gain.setValueAtTime(0.5, currentTime);
        gain2.gain.setValueAtTime(0.2, currentTime);
        gain3.gain.setValueAtTime(0.1, currentTime);
        
        fundamentalGain.gain.setValueAtTime(0, currentTime);
        fundamentalGain.gain.linearRampToValueAtTime(0.7, currentTime + 0.01);
        fundamentalGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.2);
        
        osc1.connect(gain1).connect(fundamentalGain);
        osc2.connect(gain2).connect(fundamentalGain);
        osc3.connect(gain3).connect(fundamentalGain);
        fundamentalGain.connect(masterGain);
        
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc3.start(currentTime);
        osc1.stop(currentTime + 1.2);
        osc2.stop(currentTime + 1.2);
        osc3.stop(currentTime + 1.2);
        break;
      }
      case "violin": {
        // Warm violin with vibrato
        const osc = audioContext.createOscillator();
        const vibrato = audioContext.createOscillator();
        const vibratoGain = audioContext.createGain();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        vibrato.frequency.setValueAtTime(5, currentTime);
        vibratoGain.gain.setValueAtTime(3, currentTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(frequency, currentTime);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, currentTime);
        filter.Q.setValueAtTime(1, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.35, currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        vibrato.start(currentTime);
        osc.start(currentTime);
        vibrato.stop(currentTime + 1);
        osc.stop(currentTime + 1);
        break;
      }
      case "flute": {
        // Breathy flute
        const osc = audioContext.createOscillator();
        const noise = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const noiseGain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, currentTime);
        
        noise.type = "triangle";
        noise.frequency.setValueAtTime(frequency * 2, currentTime);
        noiseGain.gain.setValueAtTime(0.08, currentTime);
        
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(frequency, currentTime);
        filter.Q.setValueAtTime(2, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);
        
        osc.connect(filter);
        noise.connect(noiseGain);
        noiseGain.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        osc.start(currentTime);
        noise.start(currentTime);
        osc.stop(currentTime + 0.8);
        noise.stop(currentTime + 0.8);
        break;
      }
      case "clarinet": {
        // Clarinet with odd harmonics
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        osc1.type = "square";
        osc2.type = "square";
        osc3.type = "square";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 3, currentTime);
        osc3.frequency.setValueAtTime(frequency * 5, currentTime);
        
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        gain1.gain.setValueAtTime(0.3, currentTime);
        gain2.gain.setValueAtTime(0.15, currentTime);
        gain3.gain.setValueAtTime(0.05, currentTime);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1500, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.9);
        
        osc1.connect(gain1).connect(filter);
        osc2.connect(gain2).connect(filter);
        osc3.connect(gain3).connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc3.start(currentTime);
        osc1.stop(currentTime + 0.9);
        osc2.stop(currentTime + 0.9);
        osc3.stop(currentTime + 0.9);
        break;
      }
      case "cello": {
        // Deep cello with rich harmonics
        const osc = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const vibrato = audioContext.createOscillator();
        const vibratoGain = audioContext.createGain();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        vibrato.frequency.setValueAtTime(4, currentTime);
        vibratoGain.gain.setValueAtTime(2, currentTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        
        osc.type = "sawtooth";
        osc2.type = "triangle";
        osc.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.4, currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.2);
        
        const oscGain = audioContext.createGain();
        const osc2Gain = audioContext.createGain();
        oscGain.gain.setValueAtTime(0.4, currentTime);
        osc2Gain.gain.setValueAtTime(0.15, currentTime);
        
        osc.connect(oscGain).connect(filter);
        osc2.connect(osc2Gain).connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        vibrato.start(currentTime);
        osc.start(currentTime);
        osc2.start(currentTime);
        vibrato.stop(currentTime + 1.2);
        osc.stop(currentTime + 1.2);
        osc2.stop(currentTime + 1.2);
        break;
      }
      case "xylophone": {
        // Bright xylophone with quick decay
        const osc = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = "sine";
        osc2.type = "sine";
        osc.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 4, currentTime);
        
        const gain2 = audioContext.createGain();
        gain2.gain.setValueAtTime(0.3, currentTime);
        
        gain.gain.setValueAtTime(0.6, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.5);
        
        osc.connect(gain);
        osc2.connect(gain2).connect(gain);
        gain.connect(masterGain);
        
        osc.start(currentTime);
        osc2.start(currentTime);
        osc.stop(currentTime + 0.5);
        osc2.stop(currentTime + 0.5);
        break;
      }
      case "trumpet": {
        // Bright trumpet with brass character
        const osc = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        osc.type = "sawtooth";
        osc2.type = "square";
        osc.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(500, currentTime);
        filter.frequency.linearRampToValueAtTime(3000, currentTime + 0.1);
        
        const oscGain = audioContext.createGain();
        const osc2Gain = audioContext.createGain();
        oscGain.gain.setValueAtTime(0.3, currentTime);
        osc2Gain.gain.setValueAtTime(0.15, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.35, currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);
        
        osc.connect(oscGain).connect(filter);
        osc2.connect(osc2Gain).connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        osc.start(currentTime);
        osc2.start(currentTime);
        osc.stop(currentTime + 0.8);
        osc2.stop(currentTime + 0.8);
        break;
      }
      case "guitar": {
        // Acoustic guitar pluck
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        osc1.type = "triangle";
        osc2.type = "sawtooth";
        osc3.type = "sine";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        osc3.frequency.setValueAtTime(frequency * 3, currentTime);
        
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        gain1.gain.setValueAtTime(0.4, currentTime);
        gain2.gain.setValueAtTime(0.2, currentTime);
        gain3.gain.setValueAtTime(0.1, currentTime);
        
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(3000, currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.5, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.8);
        
        osc1.connect(gain1).connect(filter);
        osc2.connect(gain2).connect(filter);
        osc3.connect(gain3).connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc3.start(currentTime);
        osc1.stop(currentTime + 0.8);
        osc2.stop(currentTime + 0.8);
        osc3.stop(currentTime + 0.8);
        break;
      }
      case "harp": {
        // Ethereal harp with long sustain
        const osc = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = "sine";
        osc2.type = "triangle";
        osc.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2, currentTime);
        
        const gain2 = audioContext.createGain();
        gain2.gain.setValueAtTime(0.2, currentTime);
        
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.45, currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.5);
        
        osc.connect(gain);
        osc2.connect(gain2).connect(gain);
        gain.connect(masterGain);
        
        osc.start(currentTime);
        osc2.start(currentTime);
        osc.stop(currentTime + 1.5);
        osc2.stop(currentTime + 1.5);
        break;
      }
      case "bell": {
        // Church bell with inharmonic partials
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc1.type = "sine";
        osc2.type = "sine";
        osc3.type = "sine";
        osc1.frequency.setValueAtTime(frequency, currentTime);
        osc2.frequency.setValueAtTime(frequency * 2.4, currentTime);
        osc3.frequency.setValueAtTime(frequency * 5.95, currentTime);
        
        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        gain1.gain.setValueAtTime(0.4, currentTime);
        gain2.gain.setValueAtTime(0.25, currentTime);
        gain3.gain.setValueAtTime(0.15, currentTime);
        
        gain.gain.setValueAtTime(0.5, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.8);
        
        osc1.connect(gain1).connect(gain);
        osc2.connect(gain2).connect(gain);
        osc3.connect(gain3).connect(gain);
        gain.connect(masterGain);
        
        osc1.start(currentTime);
        osc2.start(currentTime);
        osc3.start(currentTime);
        osc1.stop(currentTime + 1.8);
        osc2.stop(currentTime + 1.8);
        osc3.stop(currentTime + 1.8);
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

  // Generate new sequence - for level 3, use famous melody patterns
  const generateSequence = useCallback((length: number, round?: number) => {
    // For level 3, use predefined famous melodies
    if (config.useInstruments && round !== undefined) {
      if (round === 1) return [...FAMOUS_MELODIES.round1];
      if (round === 2) return [...FAMOUS_MELODIES.round2];
      if (round === 3) return [...FAMOUS_MELODIES.round3];
    }
    
    // For other levels, generate random sequence
    const newSequence: number[] = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * notes.length));
    }
    return newSequence;
  }, [notes.length, config.useInstruments]);

  // Get notes per sequence for current round (level 3 has progressive difficulty)
  const getNotesForRound = useCallback((round: number) => {
    if (Array.isArray(config.notesPerSequence)) {
      return config.notesPerSequence[Math.min(round - 1, config.notesPerSequence.length - 1)];
    }
    return config.notesPerSequence;
  }, [config.notesPerSequence]);

  // Start new game
  const startGame = useCallback(() => {
    const notesCount = getNotesForRound(1);
    const newSequence = generateSequence(notesCount, config.useInstruments ? 1 : undefined);
    setSequence(newSequence);
    setCurrentSeries(1);
    setSeriesCompleted(0);
    setPlayerInput([]);
    setGameState("playing");
    
    setTimeout(() => playSequence(newSequence), 1000);
  }, [generateSequence, playSequence, getNotesForRound, config.useInstruments]);

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
        fireConfetti(); // Launch confetti!
        setTimeout(() => setGameState("victory"), 1500);
        return;
      }
      
      setGameState("success");
      
      // Generate next series (with potentially more notes for level 3)
      setTimeout(() => {
        const nextRound = currentSeries + 1;
        const notesCount = getNotesForRound(nextRound);
        const newSequence = generateSequence(notesCount, config.useInstruments ? nextRound : undefined);
        setSequence(newSequence);
        setCurrentSeries(nextRound);
        playSequence(newSequence);
      }, 1500);
    }
  }, [gameState, playerInput, sequence, playNote, playSequence, generateSequence, config, seriesCompleted, currentSeries, getNotesForRound]);

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
                  {sequence.length} notes
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
                {config.useInstruments ? (
                  <span className="text-3xl md:text-4xl">{(note as InstrumentNote).emoji}</span>
                ) : (
                  <span className={`drop-shadow-lg text-lg md:text-xl font-bold ${activeNote === index ? "text-gray-800" : "text-white"}`}>
                    {(note as typeof PIANO_NOTES[0]).name}
                  </span>
                )}
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

        {/* Note names legend - only show for piano levels */}
        {!config.useInstruments && (
          <div className="mt-6 text-center text-base md:text-lg text-muted-foreground">
            <p>Do (C) • Ré (D) • Mi (E) • Fa (F) • Sol (G) • La (A) • Si (B) • Do² (C2)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicalMemoryGame;
