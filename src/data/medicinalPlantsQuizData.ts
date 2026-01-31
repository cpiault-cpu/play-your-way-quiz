import { Language } from "./quizData";

export interface MedicinalPlantsQuestion {
  id: number;
  question: { fr: string; en: string };
  options: { fr: string[]; en: string[] };
  correctAnswer: number;
  explanation: { fr: string; en: string };
  source: {
    title: string;
    url: string;
  };
}

export interface MedicinalPlantsQuiz {
  id: string;
  levelId: "1.1" | "1.2" | "1.3";
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  questions: MedicinalPlantsQuestion[];
}

export const medicinalPlantsTranslations = {
  fr: {
    title: "Plantes médicinales",
    level: "Niveau",
    play: "Jouer",
    question: "Question",
    of: "sur",
    score: "Score",
    congratulations: "Quiz terminé !",
    perfectScore: "Score parfait ! Bravo !",
    goodScore: "Excellent travail !",
    mediumScore: "Pas mal du tout !",
    lowScore: "Continuez à apprendre !",
    backToQuizzes: "Retour",
    startQuiz: "Commencer",
    enterEmail: "Entrez votre email pour jouer",
    emailPlaceholder: "votre@email.com",
    invalidEmail: "Email invalide",
    next: "Suivant",
    seeResults: "Voir les résultats",
    correct: "Correct !",
    incorrect: "Incorrect",
    yourMistakes: "Vos erreurs :",
    yourAnswer: "Votre réponse",
    correctAnswer: "Bonne réponse",
    timeRanOut: "Temps écoulé",
    explanationsTitle: "Explications & Sources",
    scientificSource: "Source scientifique",
  },
  en: {
    title: "Medicinal Plants",
    level: "Level",
    play: "Play",
    question: "Question",
    of: "of",
    score: "Score",
    congratulations: "Quiz completed!",
    perfectScore: "Perfect score! Congratulations!",
    goodScore: "Excellent work!",
    mediumScore: "Not bad at all!",
    lowScore: "Keep learning!",
    backToQuizzes: "Back",
    startQuiz: "Start",
    enterEmail: "Enter your email to play",
    emailPlaceholder: "your@email.com",
    invalidEmail: "Invalid email",
    next: "Next",
    seeResults: "See results",
    correct: "Correct!",
    incorrect: "Incorrect",
    yourMistakes: "Your mistakes:",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer",
    timeRanOut: "Time ran out",
    explanationsTitle: "Explanations & Sources",
    scientificSource: "Scientific source",
  },
};

export const medicinalPlantsQuizzes: MedicinalPlantsQuiz[] = [
  // NIVEAU 1.1 — Notions de base
  {
    id: "plants-1.1",
    levelId: "1.1",
    title: { fr: "Plantes Médicinales Niveau 1.1", en: "Medicinal Plants Level 1.1" },
    subtitle: { fr: "Notions de base", en: "Basic Concepts" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Une plante médicinale est :",
          en: "A medicinal plant is:",
        },
        options: {
          fr: ["Une plante toxique uniquement", "Une plante utilisée pour ses composés bénéfiques", "Une plante décorative", "Une plante carnivore"],
          en: ["Only a toxic plant", "A plant used for its beneficial compounds", "A decorative plant", "A carnivorous plant"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les plantes médicinales sont utilisées pour leurs composés actifs qui peuvent moduler des processus biologiques.",
          en: "Medicinal plants are used for their active compounds that can modulate biological processes.",
        },
        source: {
          title: "Medicinal Plants review — history and uses",
          url: "https://pubmed.ncbi.nlm.nih.gov/26457478/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Les phytocomposés sont :",
          en: "Phytocompounds are:",
        },
        options: {
          fr: ["Des minéraux du sol", "Des molécules bioactives produites par les plantes", "Des enzymes humaines", "Des parasites"],
          en: ["Soil minerals", "Bioactive molecules produced by plants", "Human enzymes", "Parasites"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les phytocomposés sont des substances produites par les plantes (alkaloïdes, flavonoïdes, terpénoïdes…) avec des effets biologiques.",
          en: "Phytocompounds are substances produced by plants (alkaloids, flavonoids, terpenoids...) with biological effects.",
        },
        source: {
          title: "Ethnobotanical review of medicinal plants usage",
          url: "https://pubmed.ncbi.nlm.nih.gov/30857886/",
        },
      },
      {
        id: 3,
        question: {
          fr: "L'utilisation traditionnelle des plantes médicinales :",
          en: "Traditional use of medicinal plants:",
        },
        options: {
          fr: ["N'a jamais été étudiée scientifiquement", "Est documentée dans de nombreuses cultures", "Est toujours dangereuse", "S'est arrêtée au XIXe siècle"],
          en: ["Has never been studied scientifically", "Is documented in many cultures", "Is always dangerous", "Stopped in the 19th century"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'usage traditionnel des plantes est documenté dans différentes régions du monde et fait l'objet d'études ethnobotaniques.",
          en: "Traditional plant use is documented in different regions of the world and is the subject of ethnobotanical studies.",
        },
        source: {
          title: "Ethnobotanical review of medicinal plants usage",
          url: "https://pubmed.ncbi.nlm.nih.gov/30857886/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Le terme « phytothérapie » signifie :",
          en: "The term 'phytotherapy' means:",
        },
        options: {
          fr: ["Étude des étoiles", "Utilisation thérapeutique des plantes", "Respiration des racines", "Fossilisation des plantes"],
          en: ["Study of stars", "Therapeutic use of plants", "Root respiration", "Plant fossilization"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La phytothérapie désigne l'emploi des plantes à des fins thérapeutiques.",
          en: "Phytotherapy refers to the use of plants for therapeutic purposes.",
        },
        source: {
          title: "Medicinal Plants review — history and uses",
          url: "https://pubmed.ncbi.nlm.nih.gov/26457478/",
        },
      },
    ],
  },

  // NIVEAU 1.2 — Applications et preuves
  {
    id: "plants-1.2",
    levelId: "1.2",
    title: { fr: "Plantes Médicinales Niveau 1.2", en: "Medicinal Plants Level 1.2" },
    subtitle: { fr: "Applications et preuves", en: "Applications and Evidence" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Beaucoup de médicaments modernes sont dérivés de :",
          en: "Many modern medicines are derived from:",
        },
        options: {
          fr: ["Minéraux synthétiques", "Composés végétaux naturels", "Eau pure", "Métaux lourds"],
          en: ["Synthetic minerals", "Natural plant compounds", "Pure water", "Heavy metals"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "De nombreux médicaments actuels (ex : quinine, digitaline) proviennent de molécules végétales actives.",
          en: "Many current medications (e.g., quinine, digitalis) come from active plant molecules.",
        },
        source: {
          title: "Medicinal plants review, biological activities",
          url: "https://pubmed.ncbi.nlm.nih.gov/26457478/",
        },
      },
      {
        id: 2,
        question: {
          fr: "L'une des raisons de l'intérêt récent pour les plantes médicinales est :",
          en: "One reason for the recent interest in medicinal plants is:",
        },
        options: {
          fr: ["Leur coût élevé", "Leur potentiel antibactérien naturel", "Leur interdiction mondiale", "Leur couleur attractive"],
          en: ["Their high cost", "Their natural antibacterial potential", "Their worldwide ban", "Their attractive color"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La recherche explore les plantes comme sources potentielles d'antimicrobiens face aux résistances bactériennes.",
          en: "Research explores plants as potential sources of antimicrobials in the face of bacterial resistance.",
        },
        source: {
          title: "Medicinal plants and human health historic review",
          url: "https://pubmed.ncbi.nlm.nih.gov/30699028/",
        },
      },
      {
        id: 3,
        question: {
          fr: "L'ethnopharmacologie étudie :",
          en: "Ethnopharmacology studies:",
        },
        options: {
          fr: ["L'évolution des étoiles", "L'utilisation des substances naturelles en médecine traditionnelle", "L'influence du climat sur les océans", "La chimie des roches"],
          en: ["The evolution of stars", "The use of natural substances in traditional medicine", "The influence of climate on oceans", "Rock chemistry"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'ethnopharmacologie étudie comment les différentes cultures utilisent les plantes et autres substances naturelles pour la santé.",
          en: "Ethnopharmacology studies how different cultures use plants and other natural substances for health.",
        },
        source: {
          title: "Journal of Ethnopharmacology overview",
          url: "https://www.sciencedirect.com/journal/journal-of-ethnopharmacology",
        },
      },
      {
        id: 4,
        question: {
          fr: "L'efficacité d'une plante médicinale dépend souvent de :",
          en: "The effectiveness of a medicinal plant often depends on:",
        },
        options: {
          fr: ["La couleur des fleurs", "La quantité de composés bioactifs", "Le jour de récolte uniquement", "La saison favorite des jardiniers"],
          en: ["The color of flowers", "The amount of bioactive compounds", "Only the harvest day", "Gardeners' favorite season"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'activité d'une plante dépend de ses constituants bioactifs : plus ils sont présents et spécifiques, plus l'effet attendu peut être observé.",
          en: "A plant's activity depends on its bioactive constituents: the more present and specific they are, the more the expected effect can be observed.",
        },
        source: {
          title: "Medicinal plants and human health historic review",
          url: "https://pubmed.ncbi.nlm.nih.gov/30699028/",
        },
      },
    ],
  },

  // NIVEAU 1.3 — Concepts avancés
  {
    id: "plants-1.3",
    levelId: "1.3",
    title: { fr: "Plantes Médicinales Niveau 1.3", en: "Medicinal Plants Level 1.3" },
    subtitle: { fr: "Concepts avancés", en: "Advanced Concepts" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Les phytothérapies modernes cherchent à :",
          en: "Modern phytotherapies seek to:",
        },
        options: {
          fr: ["Remplacer totalement la médecine classique", "Intégrer des approches basées sur des preuves scientifiques", "Utiliser uniquement des décoctions anciennes", "Interdire l'usage des plantes"],
          en: ["Completely replace conventional medicine", "Integrate evidence-based approaches", "Only use ancient decoctions", "Ban the use of plants"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les approches modernes combinent connaissances traditionnelles et preuves scientifiques rigoureuses pour garantir efficacité et sécurité.",
          en: "Modern approaches combine traditional knowledge and rigorous scientific evidence to ensure efficacy and safety.",
        },
        source: {
          title: "Medicinal plants and human health review",
          url: "https://pubmed.ncbi.nlm.nih.gov/30699028/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Quel domaine scientifique aide à identifier les composés actifs dans les plantes ?",
          en: "Which scientific field helps identify active compounds in plants?",
        },
        options: {
          fr: ["Astronomie", "Omics (génomique, métabolomique)", "Archéologie", "Hydrologie"],
          en: ["Astronomy", "Omics (genomics, metabolomics)", "Archaeology", "Hydrology"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les technologies omics (génomique, métabolomique) permettent de cartographier et identifier des composés bioactifs dans les plantes.",
          en: "Omics technologies (genomics, metabolomics) allow mapping and identification of bioactive compounds in plants.",
        },
        source: {
          title: "Medicinal plants and bioactive compounds comprehensive review",
          url: "https://pubmed.ncbi.nlm.nih.gov/33573238/",
        },
      },
      {
        id: 3,
        question: {
          fr: "La biodiversité des plantes médicinales est importante pour :",
          en: "Medicinal plant biodiversity is important for:",
        },
        options: {
          fr: ["La production alimentaire uniquement", "La découverte de nouveaux médicaments", "Les jeux vidéo", "L'augmentation de la pollution"],
          en: ["Food production only", "Discovering new medicines", "Video games", "Increasing pollution"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La biodiversité végétale est une source de diversité chimique pour potentiellement découvrir de nouveaux traitements.",
          en: "Plant biodiversity is a source of chemical diversity to potentially discover new treatments.",
        },
        source: {
          title: "Antimicrobial potential of medicinal plants review",
          url: "https://pubmed.ncbi.nlm.nih.gov/32150751/",
        },
      },
      {
        id: 4,
        question: {
          fr: "L'utilisation de plantes médicinales doit être :",
          en: "The use of medicinal plants should be:",
        },
        options: {
          fr: ["Toujours sans risque", "Dépendante de preuves d'efficacité et de sécurité", "Décidée uniquement par des opinions", "Exclusivement traditionnelle"],
          en: ["Always risk-free", "Dependent on evidence of efficacy and safety", "Decided only by opinions", "Exclusively traditional"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Comme tout traitement, l'usage des plantes doit être basé sur des données d'efficacité et de sécurité validées scientifiquement.",
          en: "Like any treatment, the use of plants must be based on scientifically validated efficacy and safety data.",
        },
        source: {
          title: "Antimicrobial potential of medicinal plants review",
          url: "https://pubmed.ncbi.nlm.nih.gov/32150751/",
        },
      },
    ],
  },
];
