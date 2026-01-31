import { Language } from "./quizData";

export interface BiologyQuestion {
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

export interface BiologyQuiz {
  id: string;
  levelId: "1.1" | "1.2" | "1.3";
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  questions: BiologyQuestion[];
}

export const biologyTranslations = {
  fr: {
    title: "Biologie",
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
    title: "Biology",
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

export const biologyQuizzes: BiologyQuiz[] = [
  // NIVEAU 1.1 — Bases fondamentales
  {
    id: "bio-1.1",
    levelId: "1.1",
    title: { fr: "Biologie Niveau 1.1", en: "Biology Level 1.1" },
    subtitle: { fr: "Bases fondamentales", en: "Fundamental Basics" },
    questions: [
      {
        id: 1,
        question: {
          fr: "La cellule est :",
          en: "The cell is:",
        },
        options: {
          fr: ["La plus grande structure vivante", "L'unité fondamentale de la vie", "Un type de tissu", "Un composé chimique"],
          en: ["The largest living structure", "The fundamental unit of life", "A type of tissue", "A chemical compound"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Toutes les formes de vie connues sont composées de cellules — elles sont l'unité structurale et fonctionnelle de la vie. Cela englobe des cellules simples comme les bactéries et très complexes comme celles des humains.",
          en: "All known forms of life are made up of cells — they are the structural and functional unit of life. This includes simple cells like bacteria and very complex ones like those of humans.",
        },
        source: {
          title: "McDaniel et al., Learning Introductory Biology",
          url: "https://www.britannica.com/science/cell-biology",
        },
      },
      {
        id: 2,
        question: {
          fr: "Quel processus permet aux cellules de se diviser en deux cellules identiques ?",
          en: "What process allows cells to divide into two identical cells?",
        },
        options: {
          fr: ["Photosynthèse", "Respiration", "Mitose", "Digestion"],
          en: ["Photosynthesis", "Respiration", "Mitosis", "Digestion"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "La mitose est la division cellulaire qui produit deux cellules « filles » identiques à la cellule « mère », essentielle à la croissance et au remplacement cellulaire.",
          en: "Mitosis is the cell division that produces two 'daughter' cells identical to the 'mother' cell, essential for growth and cell replacement.",
        },
        source: {
          title: "Mitosis — Encyclopædia Britannica",
          url: "https://www.britannica.com/science/mitosis",
        },
      },
      {
        id: 3,
        question: {
          fr: "L'ADN sert à :",
          en: "DNA is used to:",
        },
        options: {
          fr: ["Stocker l'énergie", "Transmettre l'information génétique", "Produire des cellules musculaires", "Conduire l'électricité"],
          en: ["Store energy", "Transmit genetic information", "Produce muscle cells", "Conduct electricity"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'ADN (acide désoxyribonucléique) contient le code génétique qui dicte la structure et le fonctionnement des organismes — c'est la molécule qui porte l'information héréditaire.",
          en: "DNA (deoxyribonucleic acid) contains the genetic code that dictates the structure and function of organisms — it is the molecule that carries hereditary information.",
        },
        source: {
          title: "DNA Structure — Nature Education",
          url: "https://www.nature.com/scitable/topicpage/discovery-of-dna-structure-and-function-watson-702/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Une mutation est :",
          en: "A mutation is:",
        },
        options: {
          fr: ["Une réaction enzymatique", "Une variation dans la séquence d'ADN", "Un type de cellule nerveuse", "Un organe reproducteur"],
          en: ["An enzymatic reaction", "A variation in the DNA sequence", "A type of nerve cell", "A reproductive organ"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Une mutation est un changement dans la séquence d'ADN, ce qui peut être neutre, avantageux, ou parfois défavorable ; c'est la source principale de variation génétique.",
          en: "A mutation is a change in the DNA sequence, which can be neutral, advantageous, or sometimes harmful; it is the main source of genetic variation.",
        },
        source: {
          title: "Mutation definition in biology",
          url: "https://www.britannica.com/science/mutation-genetics",
        },
      },
    ],
  },

  // NIVEAU 1.2 — Fonctionnement des organismes
  {
    id: "bio-1.2",
    levelId: "1.2",
    title: { fr: "Biologie Niveau 1.2", en: "Biology Level 1.2" },
    subtitle: { fr: "Fonctionnement des organismes", en: "How Organisms Function" },
    questions: [
      {
        id: 1,
        question: {
          fr: "L'homéostasie se définit comme :",
          en: "Homeostasis is defined as:",
        },
        options: {
          fr: ["Une mutation génétique", "Un mécanisme qui maintient l'équilibre interne", "Une étape de reproduction", "Une modification permanente"],
          en: ["A genetic mutation", "A mechanism that maintains internal balance", "A reproduction stage", "A permanent modification"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'homéostasie est la capacité d'un organisme à maintenir un environnement interne stable malgré les variations externes (température, pH, glucose…).",
          en: "Homeostasis is the ability of an organism to maintain a stable internal environment despite external variations (temperature, pH, glucose...).",
        },
        source: {
          title: "McDaniel et al., Learning Introductory Biology",
          url: "https://www.britannica.com/science/homeostasis",
        },
      },
      {
        id: 2,
        question: {
          fr: "Quel système transporte l'oxygène dans le corps humain ?",
          en: "Which system transports oxygen in the human body?",
        },
        options: {
          fr: ["Digestif", "Nerveux", "Sanguin", "Tégumentaire"],
          en: ["Digestive", "Nervous", "Circulatory", "Integumentary"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Le système sanguin transporte l'oxygène avec l'aide de l'hémoglobine dans les globules rouges.",
          en: "The circulatory system transports oxygen with the help of hemoglobin in red blood cells.",
        },
        source: {
          title: "Vision and Change — 5 core concepts in biology",
          url: "https://www.britannica.com/science/circulatory-system",
        },
      },
      {
        id: 3,
        question: {
          fr: "Dans une chaîne alimentaire, les producteurs sont :",
          en: "In a food chain, producers are:",
        },
        options: {
          fr: ["Les carnivores", "Les herbivores", "Les plantes", "Les décomposeurs"],
          en: ["Carnivores", "Herbivores", "Plants", "Decomposers"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Dans une chaîne alimentaire, les producteurs (comme les plantes) fabriquent leur propre nourriture par photosynthèse et fournissent l'énergie aux consommateurs.",
          en: "In a food chain, producers (like plants) make their own food through photosynthesis and provide energy to consumers.",
        },
        source: {
          title: "Biology Corner — producers/consumers concepts",
          url: "https://www.britannica.com/science/food-chain",
        },
      },
      {
        id: 4,
        question: {
          fr: "L'évolution se produit parce que :",
          en: "Evolution occurs because:",
        },
        options: {
          fr: ["Les organismes arrêtent de se reproduire", "L'environnement ne change jamais", "La génétique change sur plusieurs générations", "Les cellules cessent de fonctionner"],
          en: ["Organisms stop reproducing", "The environment never changes", "Genetics change over several generations", "Cells stop functioning"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "L'évolution est due à des changements dans l'ADN qui s'accumulent au fil des générations, créant de la diversité et permettant l'adaptation.",
          en: "Evolution is due to changes in DNA that accumulate over generations, creating diversity and enabling adaptation.",
        },
        source: {
          title: "Vision and Change core concepts",
          url: "https://www.britannica.com/science/evolution-scientific-theory",
        },
      },
    ],
  },

  // NIVEAU 1.3 — Niveau approfondi
  {
    id: "bio-1.3",
    levelId: "1.3",
    title: { fr: "Biologie Niveau 1.3", en: "Biology Level 1.3" },
    subtitle: { fr: "Niveau approfondi", en: "Advanced Level" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Le dogme central de la biologie décrit :",
          en: "The central dogma of biology describes:",
        },
        options: {
          fr: ["Comment l'énergie est produite", "Comment l'information génétique circule de l'ADN à l'ARN à la protéine", "Comment les cellules respirent", "Comment les nutriments sont absorbés"],
          en: ["How energy is produced", "How genetic information flows from DNA to RNA to protein", "How cells breathe", "How nutrients are absorbed"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le dogme central décrit la séquence d'information : l'ADN est transcrit en ARN, puis traduit en protéines.",
          en: "The central dogma describes the sequence of information: DNA is transcribed into RNA, then translated into proteins.",
        },
        source: {
          title: "Central dogma of molecular biology overview",
          url: "https://www.nature.com/scitable/topicpage/central-dogma-of-molecular-biology-14469284/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Dans le corps, quel rôle principal ont les enzymes ?",
          en: "In the body, what is the main role of enzymes?",
        },
        options: {
          fr: ["Fournir de l'énergie mécanique", "Catalyser les réactions chimiques", "Former des inhibiteurs", "Produire des globules rouges"],
          en: ["Provide mechanical energy", "Catalyze chemical reactions", "Form inhibitors", "Produce red blood cells"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les enzymes accélèrent les réactions du métabolisme sans être consommées, ce qui est essentiel à la vie.",
          en: "Enzymes speed up metabolic reactions without being consumed, which is essential for life.",
        },
        source: {
          title: "Vision and Change core concepts",
          url: "https://www.britannica.com/science/enzyme",
        },
      },
      {
        id: 3,
        question: {
          fr: "La reproduction sexuée implique :",
          en: "Sexual reproduction involves:",
        },
        options: {
          fr: ["Un seul parent", "Deux parents", "Aucune variation génétique", "Une cellule immobile"],
          en: ["One parent", "Two parents", "No genetic variation", "An immobile cell"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La reproduction sexuée combine le matériel génétique de deux parents, créant de la diversité génétique.",
          en: "Sexual reproduction combines genetic material from two parents, creating genetic diversity.",
        },
        source: {
          title: "Biology Core Concepts Instrument",
          url: "https://www.britannica.com/science/sexual-reproduction",
        },
      },
      {
        id: 4,
        question: {
          fr: "L'adaptation dans une population est généralement due à :",
          en: "Adaptation in a population is generally due to:",
        },
        options: {
          fr: ["Des mutations favorables et sélection naturelle", "La gravité terrestre", "Des choix religieux", "La vitesse des météores"],
          en: ["Favorable mutations and natural selection", "Earth's gravity", "Religious choices", "Meteor speed"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "Les mutations favorables peuvent être sélectionnées par l'environnement, conduisant à l'adaptation des populations au fil du temps.",
          en: "Favorable mutations can be selected by the environment, leading to population adaptation over time.",
        },
        source: {
          title: "Vision and Change core concepts",
          url: "https://www.britannica.com/science/adaptation-biology-and-physiology",
        },
      },
    ],
  },
];
