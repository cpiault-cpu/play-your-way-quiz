/**
 * Registry of all quizzes with their URL slugs for direct access links.
 * Each entry maps a slug to the quiz type and metadata.
 */

export interface QuizRegistryEntry {
  slug: string;
  type: "microbiote" | "anti-inflammatory" | "micronutrition" | "vitamind" | "vitamind-light" | "plants" | "sardines" | "memory-music" | "memory-cards" | "carre-cognitif";
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  emoji: string;
  maxLevel: number;
}

export const quizRegistry: QuizRegistryEntry[] = [
  {
    slug: "microbiote-safari",
    type: "microbiote",
    title: { fr: "Microbiote : Le Grand Safari Intérieur", en: "Microbiota: The Great Inner Safari" },
    description: { fr: "Explorez votre jungle microbienne niveau par niveau !", en: "Explore your microbial jungle level by level!" },
    emoji: "🦠",
    maxLevel: 4,
  },
  {
    slug: "anti-inflammatoire",
    type: "anti-inflammatory",
    title: { fr: "Stratège Anti-Inflammatoire", en: "Anti-Inflammatory Strategist" },
    description: { fr: "Maîtrisez l'alimentation anti-inflammatoire", en: "Master anti-inflammatory nutrition" },
    emoji: "🔥",
    maxLevel: 6,
  },
  {
    slug: "sardines",
    type: "sardines",
    title: { fr: "Sardines, Sardines, Mais pourquoi ?", en: "Sardines, Sardines, But why?" },
    description: { fr: "Découvrez les super-pouvoirs des sardines", en: "Discover the superpowers of sardines" },
    emoji: "🐟",
    maxLevel: 4,
  },
  {
    slug: "micronutrition",
    type: "micronutrition",
    title: { fr: "Micronutrition 1", en: "Micronutrition 1" },
    description: { fr: "Testez vos connaissances en micronutrition", en: "Test your micronutrition knowledge" },
    emoji: "💊",
    maxLevel: 3,
  },
  {
    slug: "vitamine-d",
    type: "vitamind",
    title: { fr: "VitD ça dépend", en: "VitD it depends" },
    description: { fr: "Renforcez votre mémoire sur la vitamine D", en: "Strengthen your vitamin D memory" },
    emoji: "☀️",
    maxLevel: 3,
  },
  {
    slug: "vitamine-d-lumiere",
    type: "vitamind-light",
    title: { fr: "VitD - Que la lumière soit", en: "VitD - Let there be light" },
    description: { fr: "Faites la lumière sur les liens entre soleil et vitamine D", en: "Shed light on sun and vitamin D links" },
    emoji: "🌅",
    maxLevel: 4,
  },
  {
    slug: "plantes-sante",
    type: "plants",
    title: { fr: "Plantes Santé", en: "Health Plants" },
    description: { fr: "Découvrez les plantes qui soignent", en: "Discover healing plants" },
    emoji: "🌿",
    maxLevel: 3,
  },
  {
    slug: "memoire-musicale",
    type: "memory-music",
    title: { fr: "Mémoire Musicale", en: "Musical Memory" },
    description: { fr: "Écoutez et reproduisez les séquences de notes", en: "Listen and reproduce note sequences" },
    emoji: "🎹",
    maxLevel: 3,
  },
  {
    slug: "memory-cartes",
    type: "memory-cards",
    title: { fr: "Memory Cartes", en: "Memory Cards" },
    description: { fr: "Retrouvez les paires dissimulées", en: "Find the hidden pairs" },
    emoji: "🃏",
    maxLevel: 3,
  },
  {
    slug: "puzzle-cognitif",
    type: "carre-cognitif",
    title: { fr: "Puzzle Cognitif", en: "Cognitive Puzzle" },
    description: { fr: "Testez votre logique et votre mémoire", en: "Test your logic and memory" },
    emoji: "🧩",
    maxLevel: 1,
  },
];

export const getQuizBySlug = (slug: string): QuizRegistryEntry | undefined => {
  return quizRegistry.find((q) => q.slug === slug);
};

export const getQuizByType = (type: string): QuizRegistryEntry | undefined => {
  return quizRegistry.find((q) => q.type === type);
};
