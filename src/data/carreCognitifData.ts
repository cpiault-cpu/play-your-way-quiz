import { Language } from "@/data/quizData";

// Symbols used in the game
export const SYMBOLS = ["🐟", "🫒", "☀️", "🧠"] as const;
export const LEVEL_5_SYMBOLS = ["🐟", "🫒", "☀️", "🧠", "🍋"] as const;

export type Symbol = typeof SYMBOLS[number];
export type Level5Symbol = typeof LEVEL_5_SYMBOLS[number];

export interface GridCell {
  symbol: Symbol | Level5Symbol | null;
  isRevealed: boolean;
  isEditable: boolean;
  row: number;
  col: number;
}

export interface LevelConfig {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  gridSize: 4 | 5;
  symbols: readonly (Symbol | Level5Symbol)[];
  memoryMode: boolean; // Grid disappears and player must reconstruct
  memoryTime: number; // Seconds to memorize (only for memory mode)
  hiddenRule: boolean; // Rule is not explained
  colorRule: boolean; // Colors also matter (level 3+)
  dynamicChange: boolean; // Symbols change mid-game (level 5+)
  patternMode: boolean; // Sequence pattern recognition (level 6+)
  successRate: number; // Expected success rate
}

export const levelConfigs: LevelConfig[] = [
  {
    level: 1,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: false,
    colorRule: false,
    dynamicChange: false,
    patternMode: false,
    successRate: 75,
  },
  {
    level: 2,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: false,
    colorRule: false,
    dynamicChange: false,
    patternMode: false,
    successRate: 70,
  },
  {
    level: 3,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: false,
    colorRule: true,
    dynamicChange: false,
    patternMode: false,
    successRate: 65,
  },
  {
    level: 4,
    gridSize: 5,
    symbols: LEVEL_5_SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: true,
    colorRule: false,
    dynamicChange: false,
    patternMode: false,
    successRate: 60,
  },
  {
    level: 5,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: true,
    memoryTime: 6,
    hiddenRule: false,
    colorRule: false,
    dynamicChange: true,
    patternMode: false,
    successRate: 60,
  },
  {
    level: 6,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: true,
    colorRule: false,
    dynamicChange: false,
    patternMode: true,
    successRate: 55,
  },
  {
    level: 7,
    gridSize: 4,
    symbols: SYMBOLS,
    memoryMode: false,
    memoryTime: 0,
    hiddenRule: true,
    colorRule: false,
    dynamicChange: false,
    patternMode: true,
    successRate: 50,
  },
];

export const uiTexts = {
  gameTitle: {
    fr: "Le Carré Cognitif",
    en: "The Cognitive Square",
  },
  buttonText: {
    fr: "Défiez votre intuition",
    en: "Challenge your intuition",
  },
  emailPrompt: {
    fr: "Entrez votre e-mail pour sauvegarder vos progrès et débloquer des niveaux",
    en: "Enter your email to save your progress and unlock levels",
  },
  start: {
    fr: "Jouer",
    en: "Play",
  },
  back: {
    fr: "Retour",
    en: "Back",
  },
  validate: {
    fr: "Valider",
    en: "Validate",
  },
  nextLevel: {
    fr: "Niveau suivant",
    en: "Next level",
  },
  retry: {
    fr: "Réessayer",
    en: "Try again",
  },
  memorize: {
    fr: "Mémorisez la grille...",
    en: "Memorize the grid...",
  },
  reconstruct: {
    fr: "Reconstituez la grille !",
    en: "Reconstruct the grid!",
  },
  rule: {
    fr: "Aucun symbole ne peut apparaître deux fois dans une même ligne ou colonne",
    en: "No symbol can appear twice in the same row or column",
  },
  hiddenRuleHint: {
    fr: "Découvrez la règle cachée...",
    en: "Discover the hidden rule...",
  },
  patternHint: {
    fr: "Trouvez le motif invisible...",
    en: "Find the invisible pattern...",
  },
  levelTitles: {
    1: { fr: "Logique Pure", en: "Pure Logic" },
    2: { fr: "Charge Mentale", en: "Mental Load" },
    3: { fr: "Règle Double", en: "Double Rule" },
    4: { fr: "Règle Cachée", en: "Hidden Rule" },
    5: { fr: "Sudoku Mémoire", en: "Memory Sudoku" },
    6: { fr: "Piège Cérébral", en: "Brain Trap" },
    7: { fr: "Fausse Évidence", en: "False Evidence" },
  },
  levelSubtitles: {
    1: { fr: "Grille 4×4", en: "4×4 Grid" },
    2: { fr: "Plus de cases vides", en: "More empty cells" },
    3: { fr: "Symboles + Couleurs", en: "Symbols + Colors" },
    4: { fr: "Grille 5×5", en: "5×5 Grid" },
    5: { fr: "Mémoriser puis reconstruire", en: "Memorize then reconstruct" },
    6: { fr: "Rotation des motifs", en: "Pattern rotation" },
    7: { fr: "Séquences trompeuses", en: "Deceptive sequences" },
  },
  feedbackCorrect: {
    1: { fr: "✅ Votre cerveau a détecté le motif. C'est ça, l'intelligence fluide !", en: "✅ Your brain detected the pattern. That's fluid intelligence!" },
    2: { fr: "✅ Charge cognitive maîtrisée. Votre mémoire de travail fonctionne parfaitement !", en: "✅ Cognitive load mastered. Your working memory is functioning perfectly!" },
    3: { fr: "✅ Double règle, double victoire ! Votre cerveau gère la complexité avec élégance.", en: "✅ Double rule, double victory! Your brain handles complexity with elegance." },
    4: { fr: "✅ Vous avez découvert la règle cachée. C'est ça, l'insight cognitif !", en: "✅ You discovered the hidden rule. That's cognitive insight!" },
    5: { fr: "✅ Mémoire spatiale activée. Votre hippocampe vous dit merci !", en: "✅ Spatial memory activated. Your hippocampus thanks you!" },
    6: { fr: "✅ Votre cerveau vient de percevoir une structure invisible. C'est ça, la pensée abstraite !", en: "✅ Your brain just perceived an invisible structure. That's abstract thinking!" },
    7: { fr: "✅ Vous venez de restructurer votre perception. C'est ça, la puissance cognitive !", en: "✅ You just restructured your perception. That's cognitive power!" },
  },
  feedbackIncorrect: {
    fr: "❌ Ce n'est pas tout à fait ça. Observez mieux les lignes et colonnes...",
    en: "❌ Not quite right. Look more carefully at rows and columns...",
  },
  finalMessage: {
    fr: "Votre cerveau vient de résoudre un puzzle invisible. Et ça, c'est puissant.",
    en: "Your brain just solved an invisible puzzle. And that's powerful.",
  },
  clarityGauge: {
    fr: "Indice de clarté mentale",
    en: "Mental clarity index",
  },
  replay: {
    fr: "Rejouer",
    en: "Replay",
  },
  share: {
    fr: "Partager mon score",
    en: "Share my score",
  },
  discover: {
    fr: "Découvrir d'autres défis",
    en: "Discover other challenges",
  },
  selectSymbol: {
    fr: "Sélectionnez un symbole",
    en: "Select a symbol",
  },
  timeLeft: {
    fr: "Temps restant",
    en: "Time left",
  },
};

export const levelColors = {
  1: "#98FB98", // Vert menthe
  2: "#FF7F50", // Orange corail
  3: "#5F9EA0", // Bleu canard
  4: "#DDA0DD", // Violet clair
  5: "#8B0000", // Rouge bordeaux
  6: "#4169E1", // Bleu royal
  7: "#FFD700", // Or
};

// Generate a valid sudoku-style grid
export function generateValidGrid(size: 4 | 5, symbols: readonly string[]): string[][] {
  const grid: string[][] = [];
  
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      // Shift the pattern for each row to create a valid sudoku
      const shift = row;
      const index = (col + shift) % size;
      grid[row][col] = symbols[index];
    }
  }
  
  // Shuffle rows within groups to add variety
  for (let i = 0; i < size; i++) {
    const j = Math.floor(Math.random() * size);
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  
  // Shuffle columns
  for (let i = 0; i < size; i++) {
    const j = Math.floor(Math.random() * size);
    for (let row = 0; row < size; row++) {
      [grid[row][i], grid[row][j]] = [grid[row][j], grid[row][i]];
    }
  }
  
  return grid;
}

// Create a puzzle by hiding some cells
export function createPuzzle(
  grid: string[][], 
  emptyCells: number
): { puzzle: (string | null)[][], solution: string[][] } {
  const size = grid.length;
  const puzzle: (string | null)[][] = grid.map(row => [...row]);
  const positions: [number, number][] = [];
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      positions.push([row, col]);
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove cells
  for (let i = 0; i < emptyCells && i < positions.length; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = null;
  }
  
  return { puzzle, solution: grid };
}

// Check if a placement is valid
export function isValidPlacement(
  grid: (string | null)[][],
  row: number,
  col: number,
  symbol: string
): boolean {
  const size = grid.length;
  
  // Check row
  for (let c = 0; c < size; c++) {
    if (c !== col && grid[row][c] === symbol) {
      return false;
    }
  }
  
  // Check column
  for (let r = 0; r < size; r++) {
    if (r !== row && grid[r][col] === symbol) {
      return false;
    }
  }
  
  return true;
}

// Check if the grid is complete and valid
export function isGridComplete(grid: (string | null)[][]): boolean {
  const size = grid.length;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === null) {
        return false;
      }
    }
  }
  
  return true;
}

// Check if the grid matches the solution
export function checkSolution(
  grid: (string | null)[][],
  solution: string[][]
): boolean {
  const size = grid.length;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  
  return true;
}
