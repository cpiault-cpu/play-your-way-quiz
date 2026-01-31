import { Language } from "./quizData";

export interface MicronutritionQuestion {
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

export interface MicronutritionQuiz {
  id: string;
  levelId: "1.1" | "1.2" | "1.3";
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  questions: MicronutritionQuestion[];
}

export const micronutritionTranslations = {
  fr: {
    title: "Micronutrition",
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
    title: "Micronutrition",
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

export const micronutritionQuizzes: MicronutritionQuiz[] = [
  // NIVEAU 1.1 — Fondamentaux de la micronutrition
  {
    id: "micro-1.1",
    levelId: "1.1",
    title: { fr: "Micronutrition Niveau 1.1", en: "Micronutrition Level 1.1" },
    subtitle: { fr: "Fondamentaux de la micronutrition", en: "Micronutrition Fundamentals" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Qu'est-ce qu'un micronutriment ?",
          en: "What is a micronutrient?",
        },
        options: {
          fr: ["Un type de graisse", "Un nutriment nécessaire en grande quantité", "Un nutriment nécessaire en petite quantité", "Une source d'énergie"],
          en: ["A type of fat", "A nutrient needed in large quantities", "A nutrient needed in small quantities", "An energy source"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Les micronutriments sont des vitamines et des minéraux dont l'organisme a besoin en très petites quantités, mais qui sont indispensables au bon fonctionnement du métabolisme, du système immunitaire et du développement cellulaire.",
          en: "Micronutrients are vitamins and minerals that the body needs in very small quantities, but which are essential for proper metabolism, immune system function, and cellular development.",
        },
        source: {
          title: "WHO – Micronutrients in human health",
          url: "https://pubmed.ncbi.nlm.nih.gov/25646252/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Les micronutriments incluent :",
          en: "Micronutrients include:",
        },
        options: {
          fr: ["Glucides et protéines", "Acides gras essentiels", "Vitamines et minéraux", "Calories"],
          en: ["Carbohydrates and proteins", "Essential fatty acids", "Vitamins and minerals", "Calories"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Les vitamines et minéraux sont classés comme micronutriments car ils ne fournissent pas d'énergie, contrairement aux macronutriments, mais régulent de nombreuses fonctions biologiques.",
          en: "Vitamins and minerals are classified as micronutrients because they do not provide energy, unlike macronutrients, but regulate many biological functions.",
        },
        source: {
          title: "Gernand et al., Micronutrients and human health",
          url: "https://pubmed.ncbi.nlm.nih.gov/31103040/",
        },
      },
      {
        id: 3,
        question: {
          fr: "Quel micronutriment est essentiel pour la vision ?",
          en: "Which micronutrient is essential for vision?",
        },
        options: {
          fr: ["Vitamine A", "Vitamine C", "Calcium", "Zinc"],
          en: ["Vitamin A", "Vitamin C", "Calcium", "Zinc"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine A est essentielle à la santé de la rétine. Une carence peut entraîner une baisse de la vision nocturne, voire des troubles visuels sévères.",
          en: "Vitamin A is essential for retinal health. A deficiency can lead to decreased night vision or even severe visual disorders.",
        },
        source: {
          title: "Sommer A., Vitamin A deficiency and vision",
          url: "https://pubmed.ncbi.nlm.nih.gov/2431177/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Une carence en fer peut provoquer :",
          en: "Iron deficiency can cause:",
        },
        options: {
          fr: ["Insomnie", "Fatigue et anémie", "Palpitations uniquement", "Perte de cheveux"],
          en: ["Insomnia", "Fatigue and anemia", "Palpitations only", "Hair loss"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le fer est indispensable au transport de l'oxygène dans le sang. Une carence entraîne une anémie, souvent associée à une grande fatigue et à une baisse des performances physiques et cognitives.",
          en: "Iron is essential for oxygen transport in the blood. A deficiency leads to anemia, often associated with severe fatigue and decreased physical and cognitive performance.",
        },
        source: {
          title: "WHO, Iron deficiency anaemia",
          url: "https://pubmed.ncbi.nlm.nih.gov/31609105/",
        },
      },
    ],
  },

  // NIVEAU 1.2 — Fonctions et impacts physiologiques
  {
    id: "micro-1.2",
    levelId: "1.2",
    title: { fr: "Micronutrition Niveau 1.2", en: "Micronutrition Level 1.2" },
    subtitle: { fr: "Fonctions et impacts physiologiques", en: "Functions and Physiological Impacts" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Quel micronutriment est fortement impliqué dans l'immunité et l'antioxydation ?",
          en: "Which micronutrient is strongly involved in immunity and antioxidation?",
        },
        options: {
          fr: ["Vitamine C", "Glucose", "Protéines", "Lipides"],
          en: ["Vitamin C", "Glucose", "Proteins", "Lipids"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine C agit comme antioxydant et soutient les cellules immunitaires. Elle aide l'organisme à se défendre contre les infections.",
          en: "Vitamin C acts as an antioxidant and supports immune cells. It helps the body defend against infections.",
        },
        source: {
          title: "Carr & Maggini, Vitamin C and immune function",
          url: "https://pubmed.ncbi.nlm.nih.gov/29099763/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Quel micronutriment est indispensable au bon fonctionnement de la thyroïde ?",
          en: "Which micronutrient is essential for proper thyroid function?",
        },
        options: {
          fr: ["Iode", "Calcium", "Zinc", "Potassium"],
          en: ["Iodine", "Calcium", "Zinc", "Potassium"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "L'iode est essentiel à la production des hormones thyroïdiennes, qui régulent le métabolisme, la croissance et le développement neurologique.",
          en: "Iodine is essential for the production of thyroid hormones, which regulate metabolism, growth, and neurological development.",
        },
        source: {
          title: "Zimmermann, Iodine deficiency and thyroid function",
          url: "https://pubmed.ncbi.nlm.nih.gov/18769214/",
        },
      },
      {
        id: 3,
        question: {
          fr: "Les carences en micronutriments peuvent :",
          en: "Micronutrient deficiencies can:",
        },
        options: {
          fr: ["Toujours être visibles", "N'affecter que les enfants", "Réduire l'énergie et les fonctions cognitives", "Ne jamais avoir d'impact"],
          en: ["Always be visible", "Only affect children", "Reduce energy and cognitive functions", "Never have an impact"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Même modérées, les carences en micronutriments peuvent entraîner fatigue, baisse de concentration et diminution des performances mentales.",
          en: "Even moderate micronutrient deficiencies can lead to fatigue, decreased concentration, and reduced mental performance.",
        },
        source: {
          title: "Benton, Micronutrient deficiencies and cognitive performance",
          url: "https://pubmed.ncbi.nlm.nih.gov/20459344/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Quel micronutriment est nécessaire à la synthèse du collagène ?",
          en: "Which micronutrient is necessary for collagen synthesis?",
        },
        options: {
          fr: ["Vitamine C", "Vitamine B12", "Vitamine K", "Iode"],
          en: ["Vitamin C", "Vitamin B12", "Vitamin K", "Iodine"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine C est indispensable à la fabrication du collagène, une protéine clé pour la peau, les articulations, les vaisseaux sanguins et la cicatrisation.",
          en: "Vitamin C is essential for collagen production, a key protein for skin, joints, blood vessels, and wound healing.",
        },
        source: {
          title: "Pullar et al., Role of vitamin C in collagen synthesis",
          url: "https://pubmed.ncbi.nlm.nih.gov/28805671/",
        },
      },
    ],
  },

  // NIVEAU 1.3 — Approfondissement
  {
    id: "micro-1.3",
    levelId: "1.3",
    title: { fr: "Micronutrition Niveau 1.3", en: "Micronutrition Level 1.3" },
    subtitle: { fr: "Approfondissement", en: "Deep Dive" },
    questions: [
      {
        id: 1,
        question: {
          fr: "Quel est le rôle principal de la vitamine E ?",
          en: "What is the main role of vitamin E?",
        },
        options: {
          fr: ["Antioxydant cellulaire", "Production d'insuline", "Transport de l'oxygène", "Digestion des graisses"],
          en: ["Cellular antioxidant", "Insulin production", "Oxygen transport", "Fat digestion"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine E protège les cellules contre le stress oxydatif en neutralisant les radicaux libres, contribuant ainsi à la prévention du vieillissement cellulaire.",
          en: "Vitamin E protects cells against oxidative stress by neutralizing free radicals, thus contributing to the prevention of cellular aging.",
        },
        source: {
          title: "Traber & Stevens, Vitamin E and oxidative stress",
          url: "https://pubmed.ncbi.nlm.nih.gov/20166931/",
        },
      },
      {
        id: 2,
        question: {
          fr: "L'absorption de certains micronutriments est influencée par :",
          en: "The absorption of certain micronutrients is influenced by:",
        },
        options: {
          fr: ["La fréquence cardiaque", "Le microbiote intestinal", "Le bruit", "La température extérieure"],
          en: ["Heart rate", "Gut microbiota", "Noise", "Outside temperature"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le microbiote intestinal participe à la synthèse, à l'activation et à l'absorption de certains micronutriments, notamment les vitamines B et K.",
          en: "The gut microbiota participates in the synthesis, activation, and absorption of certain micronutrients, particularly B and K vitamins.",
        },
        source: {
          title: "Rowland et al., Gut microbiota and micronutrient metabolism",
          url: "https://pubmed.ncbi.nlm.nih.gov/35294077/",
        },
      },
      {
        id: 3,
        question: {
          fr: "La supplémentation en multivitamines :",
          en: "Multivitamin supplementation:",
        },
        options: {
          fr: ["Remplace une alimentation équilibrée", "Est toujours bénéfique", "Est utile surtout en cas de carence", "Est sans aucun risque"],
          en: ["Replaces a balanced diet", "Is always beneficial", "Is useful mainly in case of deficiency", "Is completely risk-free"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Les bénéfices des multivitamines sont surtout observés chez les personnes ayant des apports insuffisants. Elles ne remplacent pas une alimentation variée.",
          en: "The benefits of multivitamins are mainly observed in people with insufficient intake. They do not replace a varied diet.",
        },
        source: {
          title: "Jenkins et al., Multivitamin supplementation and health outcomes",
          url: "https://pubmed.ncbi.nlm.nih.gov/38648170/",
        },
      },
      {
        id: 4,
        question: {
          fr: "La carence en iode est associée à :",
          en: "Iodine deficiency is associated with:",
        },
        options: {
          fr: ["Hyperactivité", "Dysfonction thyroïdienne et troubles neurologiques", "Insomnie", "Perte de cheveux uniquement"],
          en: ["Hyperactivity", "Thyroid dysfunction and neurological disorders", "Insomnia", "Hair loss only"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Une carence en iode perturbe la production d'hormones thyroïdiennes et peut affecter le développement cérébral, en particulier chez le fœtus et l'enfant.",
          en: "Iodine deficiency disrupts thyroid hormone production and can affect brain development, especially in fetuses and children.",
        },
        source: {
          title: "Bath et al., Iodine deficiency and brain development",
          url: "https://pubmed.ncbi.nlm.nih.gov/26529009/",
        },
      },
    ],
  },
];
