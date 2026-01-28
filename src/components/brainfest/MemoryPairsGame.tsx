import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Language } from "@/data/quizData";
import confetti from "canvas-confetti";

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
    victory: "Bravo !",
    victoryMsg: "Vous avez trouvé toutes les paires !",
    playAgain: "Rejouer",
    back: "Retour",
    instructions: "Retournez les cartes pour trouver les paires de plantes identiques. Mémorisez leur position pour les retrouver !",
  },
  en: {
    title: "Plant Memory",
    moves: "Moves",
    pairs: "Pairs",
    victory: "Congratulations!",
    victoryMsg: "You found all the pairs!",
    playAgain: "Play Again",
    back: "Back",
    instructions: "Flip the cards to find matching plant pairs. Remember their positions to find them again!",
  },
};

const MemoryPairsGame = ({ level, language, onBack }: MemoryPairsGameProps) => {
  const t = translations[language];
  
  const getPairsCount = () => {
    switch (level) {
      case 1: return 4;
      case 2: return 6;
      case 3: return 8;
    }
  };

  const pairsCount = getPairsCount();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const selectedPlants = plants.slice(0, pairsCount);
    const cardPairs: Card[] = [];
    
    selectedPlants.forEach((plant, index) => {
      // Create two cards for each plant
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
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [level]);

  const handleCardClick = (cardId: number) => {
    if (isLocked) return;
    
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
          setMatchedPairs(m => {
            const newCount = m + 1;
            if (newCount === pairsCount) {
              setGameWon(true);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
            return newCount;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
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
        }, 1000);
      }
    }
  };

  const getGridCols = () => {
    switch (pairsCount) {
      case 4: return "grid-cols-4";
      case 6: return "grid-cols-4";
      case 8: return "grid-cols-4";
      default: return "grid-cols-4";
    }
  };

  if (gameWon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            {t.victory}
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            {t.victoryMsg}
          </p>
          <p className="text-primary text-xl font-semibold mb-6">
            {t.moves}: {moves}
          </p>
          
          <div className="flex flex-col gap-3">
            <Button
              onClick={initializeGame}
              className="btn-primary-custom text-white w-full"
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t.back}
          </Button>
          
          <h1 className="font-serif text-xl font-bold text-foreground">
            {t.title}
          </h1>
          
          <Button
            onClick={initializeGame}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-center text-sm text-muted-foreground mb-4 px-2 bg-primary/5 py-3 rounded-lg border border-primary/10">
          {t.instructions}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{moves}</p>
            <p className="text-sm text-muted-foreground">{t.moves}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{matchedPairs}/{pairsCount}</p>
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
