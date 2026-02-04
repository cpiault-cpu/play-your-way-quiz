import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Clock, ExternalLink, Loader2 } from "lucide-react";
import { Language } from "@/data/quizData";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useQuizAttempt } from "@/hooks/useQuizAttempt";

// Import plant images
import lavenderImg from "@/assets/plants/lavender.png";
import chamomileImg from "@/assets/plants/chamomile.png";
import mintImg from "@/assets/plants/mint.png";
import gingerImg from "@/assets/plants/ginger.png";
import echinaceaImg from "@/assets/plants/echinacea.png";
import thymeImg from "@/assets/plants/thyme.png";
import rosemaryImg from "@/assets/plants/rosemary.png";
import sageImg from "@/assets/plants/sage.png";

interface MemoryPairsGameProps {
  level: 1 | 2 | 3;
  language: Language;
  onBack: () => void;
}

interface Card {
  id: number;
  plantId: number;
  name: { fr: string; en: string };
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const plants = [
  { id: 1, name: { fr: "Lavande", en: "Lavender" }, image: lavenderImg },
  { id: 2, name: { fr: "Camomille", en: "Chamomile" }, image: chamomileImg },
  { id: 3, name: { fr: "Menthe", en: "Mint" }, image: mintImg },
  { id: 4, name: { fr: "Gingembre", en: "Ginger" }, image: gingerImg },
  { id: 5, name: { fr: "Échinacée", en: "Echinacea" }, image: echinaceaImg },
  { id: 6, name: { fr: "Thym", en: "Thyme" }, image: thymeImg },
  { id: 7, name: { fr: "Romarin", en: "Rosemary" }, image: rosemaryImg },
  { id: 8, name: { fr: "Sauge", en: "Sage" }, image: sageImg },
];

const translations = {
  fr: {
    title: "Memory Plantes",
    moves: "Coups",
    pairs: "Paires",
    game: "Partie",
    victory: "Bravo !",
    victoryMsg: "Vous avez réussi les 3 parties !",
    gameOver: "Temps écoulé !",
    gameOverMsg: "Vous n'avez pas trouvé toutes les paires à temps.",
    playAgain: "Rejouer",
    back: "Retour",
    instructions: "Trouvez toutes les paires de plantes identiques en 30 secondes ! Mémorisez leur position. Réussissez 3 parties pour gagner votre code de réduction.",
    timeLeft: "Temps restant",
    enterEmail: "Entrez votre email pour commencer",
    emailPlaceholder: "votre@email.com",
    start: "Commencer",
    invalidEmail: "Veuillez entrer un email valide",
    couponTitle: "Félicitations !",
    couponText: "Voici votre code de réduction :",
    couponCopied: "Code copié !",
    visitShop: "Visiter la boutique",
    nextGame: "Partie suivante",
    gameSuccess: "Partie réussie !",
  },
  en: {
    title: "Plant Memory",
    moves: "Moves",
    pairs: "Pairs",
    game: "Game",
    victory: "Congratulations!",
    victoryMsg: "You completed all 3 games!",
    gameOver: "Time's up!",
    gameOverMsg: "You didn't find all pairs in time.",
    playAgain: "Play Again",
    back: "Back",
    instructions: "Find all matching plant pairs in 30 seconds! Remember their positions. Complete 3 games to win your discount code.",
    timeLeft: "Time left",
    enterEmail: "Enter your email to start",
    emailPlaceholder: "your@email.com",
    start: "Start",
    invalidEmail: "Please enter a valid email",
    couponTitle: "Congratulations!",
    couponText: "Here is your discount code:",
    couponCopied: "Code copied!",
    visitShop: "Visit the shop",
    nextGame: "Next game",
    gameSuccess: "Game completed!",
  },
};

// Level configuration
const LEVEL_CONFIG = {
  1: { pairsCount: 4, gamesToWin: 3 },
  2: { pairsCount: 6, gamesToWin: 3 },
  3: { pairsCount: 8, gamesToWin: 3 },
};

// Discount codes per level
const DISCOUNT_CODES = {
  1: "PLANTES5",
  2: "PLANTES10",
  3: "PLANTES15",
};

const DISCOUNT_AMOUNTS = {
  1: "5%",
  2: "10%",
  3: "15%",
};

const GAME_DURATION = 30; // 30 seconds per game

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
      colors: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    });
  }, 250);
};

const MemoryPairsGame = ({ level, language, onBack }: MemoryPairsGameProps) => {
  const t = translations[language];
  const config = LEVEL_CONFIG[level];
  const { checkEmailUsed, saveAttempt, isChecking } = useQuizAttempt();
  const quizId = `memory-pairs-${level}`;
  
  const [gameState, setGameState] = useState<"email" | "playing" | "gameSuccess" | "gameOver" | "victory">("email");
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [currentGame, setCurrentGame] = useState(1);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Email validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error(t.invalidEmail);
      return;
    }
    
    // Check if email already used for this game
    const alreadyUsed = await checkEmailUsed(email, quizId);
    if (alreadyUsed) {
      toast.error(
        language === "fr" 
          ? "Vous avez déjà participé à ce jeu avec cette adresse email."
          : "You have already participated in this game with this email address."
      );
      return;
    }
    
    // Save the attempt
    try {
      await saveAttempt(email, quizId);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
    
    initializeGame();
    setGameState("playing");
  };

  const initializeGame = useCallback(() => {
    const selectedPlants = plants.slice(0, config.pairsCount);
    const cardPairs: Card[] = [];
    
    selectedPlants.forEach((plant, index) => {
      cardPairs.push({
        id: index * 2,
        plantId: plant.id,
        name: plant.name,
        image: plant.image,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: index * 2 + 1,
        plantId: plant.id,
        name: plant.name,
        image: plant.image,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setTimeLeft(GAME_DURATION);
  }, [config.pairsCount]);

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (gameState === "playing" && timeLeft === 0) {
      // Time's up!
      setGameState("gameOver");
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, timeLeft]);

  // Check for game win
  useEffect(() => {
    if (gameState === "playing" && matchedPairs === config.pairsCount) {
      // Clear timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      if (currentGame >= config.gamesToWin) {
        // All games completed!
        setGameState("victory");
        fireConfetti();
      } else {
        // Move to next game
        setGameState("gameSuccess");
      }
    }
  }, [matchedPairs, config.pairsCount, currentGame, config.gamesToWin, gameState]);

  const handleNextGame = () => {
    setCurrentGame(prev => prev + 1);
    initializeGame();
    setGameState("playing");
  };

  const handleRestart = () => {
    setCurrentGame(1);
    initializeGame();
    setGameState("playing");
  };

  const handleCardClick = (cardId: number) => {
    if (isLocked || gameState !== "playing") return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      setIsLocked(true);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.plantId === secondCard.plantId) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatchedPairs(m => m + 1);
          setFlippedCards([]);
          setIsLocked(false);
        }, 300);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
          setIsLocked(false);
        }, 800);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DISCOUNT_CODES[level]);
    toast.success(t.couponCopied);
  };

  const getGridCols = () => {
    switch (config.pairsCount) {
      case 4: return "grid-cols-4";
      case 6: return "grid-cols-4";
      case 8: return "grid-cols-4";
      default: return "grid-cols-4";
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return "bg-green-500";
    if (timeLeft > 10) return "bg-orange-500";
    return "bg-red-500";
  };

  // Email input screen
  if (gameState === "email") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">🌿</div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
            {t.title} - {language === "fr" ? "Niveau" : "Level"} {level}
          </h1>
          <p className="text-muted-foreground mb-6 text-sm px-2 bg-primary/5 py-3 rounded-lg border border-primary/10">
            {t.instructions}
          </p>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center"
            />
            <Button
              onClick={handleEmailSubmit}
              disabled={isChecking}
              className="w-full btn-primary-custom text-white"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === "fr" ? "Vérification..." : "Checking..."}
                </>
              ) : (
                t.start
              )}
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Game success screen (between games)
  if (gameState === "gameSuccess") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            {t.gameSuccess}
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            {t.game} {currentGame}/{config.gamesToWin}
          </p>
          <p className="text-primary text-lg font-semibold mb-6">
            {t.moves}: {moves}
          </p>
          
          <Button
            onClick={handleNextGame}
            className="w-full btn-primary-custom text-white"
          >
            {t.nextGame}
          </Button>
        </div>
      </div>
    );
  }

  // Game over screen
  if (gameState === "gameOver") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">⏱️</div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            {t.gameOver}
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            {t.gameOverMsg}
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleRestart}
              className="w-full btn-primary-custom text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.playAgain}
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Victory screen with coupon
  if (gameState === "victory") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            {t.victory}
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            {t.victoryMsg}
          </p>
          
          {/* Coupon section */}
          <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
            <p className="text-foreground font-medium mb-2">{t.couponText}</p>
            <button
              onClick={copyToClipboard}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-xl hover:bg-primary/90 transition-colors"
            >
              {DISCOUNT_CODES[level]} (-{DISCOUNT_AMOUNTS[level]})
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.open("https://www.peita.fr/product-page/8-boites-de-petites-sardines", "_blank")}
              className="w-full btn-primary-custom text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t.visitShop}
            </Button>
            <Button
              onClick={handleRestart}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.playAgain}
            </Button>
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main game screen
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t.back}
          </Button>
          
          <h1 className="font-serif text-lg font-bold text-foreground">
            {t.game} {currentGame}/{config.gamesToWin}
          </h1>
          
          <Button
            onClick={handleRestart}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Timer */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{t.timeLeft}</span>
            </div>
            <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-foreground'}`}>
              {timeLeft}s
            </span>
          </div>
          <Progress 
            value={(timeLeft / GAME_DURATION) * 100} 
            className="h-2"
          />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{moves}</p>
            <p className="text-sm text-muted-foreground">{t.moves}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{matchedPairs}/{config.pairsCount}</p>
            <p className="text-sm text-muted-foreground">{t.pairs}</p>
          </div>
        </div>

        {/* Game Grid */}
        <div className={`grid ${getGridCols()} gap-2 sm:gap-3`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isLocked}
              className={`
                aspect-square rounded-xl
                transition-all duration-300 transform
                ${card.isFlipped || card.isMatched
                  ? "bg-white border-2 border-primary scale-100 shadow-md"
                  : "bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-primary/30 hover:border-primary/60 hover:scale-105"
                }
                ${card.isMatched ? "opacity-70" : ""}
                flex flex-col items-center justify-center p-1 overflow-hidden
              `}
            >
              {card.isFlipped || card.isMatched ? (
                <>
                  <img 
                    src={card.image} 
                    alt={card.name[language]} 
                    className="w-full h-3/4 object-contain"
                  />
                  <span className="text-[8px] sm:text-[10px] text-foreground font-medium truncate w-full text-center">
                    {card.name[language]}
                  </span>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl">🌿</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryPairsGame;
