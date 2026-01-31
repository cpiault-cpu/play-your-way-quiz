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
  // NIVEAU 1.1 — Fondamentaux de la Micronutrition
  {
    id: "micro-1.1",
    levelId: "1.1",
    title: { fr: "Micronutrition Niveau 1.1", en: "Micronutrition Level 1.1" },
    subtitle: { fr: "Fondamentaux de la Micronutrition", en: "Micronutrition Fundamentals" },
    questions: [
      // Quiz 1
      {
        id: 1,
        question: {
          fr: "Qu'est-ce qu'un micronutriment ?",
          en: "What is a micronutrient?",
        },
        options: {
          fr: ["Un type de graisse", "Un nutriment nécessaire en grande quantité", "Un nutriment nécessaire en petite quantité", "Une source d'énergie uniquement"],
          en: ["A type of fat", "A nutrient needed in large quantities", "A nutrient needed in small quantities", "An energy source only"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Les micronutriments comprennent les vitamines et minéraux nécessaires en quantités très faibles, mais essentiels aux fonctions du corps (métabolisme, hormones, enzymes).",
          en: "Micronutrients include vitamins and minerals needed in very small quantities, but essential for body functions (metabolism, hormones, enzymes).",
        },
        source: {
          title: "WHO – Micronutrients overview",
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
          fr: "Contrairement aux macronutriments (glucides/protéines/lipides), les micronutriments ne fournissent pas d'énergie mais régulent les fonctions corporelles.",
          en: "Unlike macronutrients (carbohydrates/proteins/lipids), micronutrients do not provide energy but regulate body functions.",
        },
        source: {
          title: "Gernand et al., Micronutrients in human health",
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
          fr: "La vitamine A est cruciale pour la santé de la rétine et la vision.",
          en: "Vitamin A is crucial for retinal health and vision.",
        },
        source: {
          title: "Sommer A., Vitamin A deficiency and vision",
          url: "https://pubmed.ncbi.nlm.nih.gov/2431177/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Une carence en fer peut causer :",
          en: "Iron deficiency can cause:",
        },
        options: {
          fr: ["Insomnie", "Fatigue et anémie", "Palpitations uniquement", "Perte de cheveux"],
          en: ["Insomnia", "Fatigue and anemia", "Palpitations only", "Hair loss"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le fer est essentiel au transport de l'oxygène dans le sang via l'hémoglobine ; son déficit provoque souvent de l'anémie.",
          en: "Iron is essential for oxygen transport in the blood via hemoglobin; its deficiency often causes anemia.",
        },
        source: {
          title: "WHO, Iron deficiency anaemia",
          url: "https://pubmed.ncbi.nlm.nih.gov/31609105/",
        },
      },
      // Quiz 2
      {
        id: 5,
        question: {
          fr: "La vitamine D est principalement liée à :",
          en: "Vitamin D is mainly associated with:",
        },
        options: {
          fr: ["Immunité des yeux", "Absorption du calcium", "Production de glucose", "Fonction thyroïdienne"],
          en: ["Eye immunity", "Calcium absorption", "Glucose production", "Thyroid function"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La vitamine D favorise l'absorption du calcium et le maintien de la santé osseuse.",
          en: "Vitamin D promotes calcium absorption and maintenance of bone health.",
        },
        source: {
          title: "WHO – Micronutrients overview",
          url: "https://pubmed.ncbi.nlm.nih.gov/25646252/",
        },
      },
      {
        id: 6,
        question: {
          fr: "Lequel est un minéral ?",
          en: "Which is a mineral?",
        },
        options: {
          fr: ["Vitamine C", "Vitamine E", "Zinc", "Oméga-3"],
          en: ["Vitamin C", "Vitamin E", "Zinc", "Omega-3"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Le zinc est un oligo-élément minéral essentiel au métabolisme et à l'immunité.",
          en: "Zinc is a trace mineral element essential for metabolism and immunity.",
        },
        source: {
          title: "Gernand et al., Micronutrients in human health",
          url: "https://pubmed.ncbi.nlm.nih.gov/31103040/",
        },
      },
      {
        id: 7,
        question: {
          fr: "Quel micronutriment est indispensable à la coagulation ?",
          en: "Which micronutrient is essential for coagulation?",
        },
        options: {
          fr: ["Vitamine A", "Vitamine K", "Magnésium", "Iode"],
          en: ["Vitamin A", "Vitamin K", "Magnesium", "Iodine"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La vitamine K aide à activer les protéines impliquées dans la coagulation du sang.",
          en: "Vitamin K helps activate proteins involved in blood coagulation.",
        },
        source: {
          title: "Sommer A., Vitamin A deficiency and vision",
          url: "https://pubmed.ncbi.nlm.nih.gov/2431177/",
        },
      },
      {
        id: 8,
        question: {
          fr: "Un excès de micronutriments peut :",
          en: "An excess of micronutrients can:",
        },
        options: {
          fr: ["Être toujours bénéfique", "Ne jamais poser de problème", "Être nocif s'il dépasse les besoins", "Remplacer les macronutriments"],
          en: ["Always be beneficial", "Never be a problem", "Be harmful if it exceeds needs", "Replace macronutrients"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Certaines vitamines/minéraux en excès (ex : vitamine A, E) peuvent entraîner des effets indésirables.",
          en: "Some vitamins/minerals in excess (e.g., vitamin A, E) can cause adverse effects.",
        },
        source: {
          title: "WHO, Iron deficiency anaemia",
          url: "https://pubmed.ncbi.nlm.nih.gov/31609105/",
        },
      },
    ],
  },

  // NIVEAU 1.2 — Fonctions & Impacts
  {
    id: "micro-1.2",
    levelId: "1.2",
    title: { fr: "Micronutrition Niveau 1.2", en: "Micronutrition Level 1.2" },
    subtitle: { fr: "Fonctions & Impacts", en: "Functions & Impacts" },
    questions: [
      // Quiz 3
      {
        id: 1,
        question: {
          fr: "Quel micronutriment est souvent lié à l'immunité et à l'antioxydation ?",
          en: "Which micronutrient is often linked to immunity and antioxidation?",
        },
        options: {
          fr: ["Vitamine C", "Glucose", "Protéines", "Lipides"],
          en: ["Vitamin C", "Glucose", "Proteins", "Lipids"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine C est un antioxydant qui soutient la fonction des cellules immunitaires.",
          en: "Vitamin C is an antioxidant that supports immune cell function.",
        },
        source: {
          title: "Carr & Maggini, Vitamin C and immune function",
          url: "https://pubmed.ncbi.nlm.nih.gov/29099763/",
        },
      },
      {
        id: 2,
        question: {
          fr: "Quel élément est essentiel pour la thyroïde ?",
          en: "Which element is essential for the thyroid?",
        },
        options: {
          fr: ["Iode", "Calcium", "Zinc", "Potassium"],
          en: ["Iodine", "Calcium", "Zinc", "Potassium"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "L'iode est nécessaire à la fabrication des hormones thyroïdiennes.",
          en: "Iodine is necessary for the production of thyroid hormones.",
        },
        source: {
          title: "Zimmermann, Iodine deficiency",
          url: "https://pubmed.ncbi.nlm.nih.gov/18769214/",
        },
      },
      {
        id: 3,
        question: {
          fr: "Les déficiences en micronutriments peuvent :",
          en: "Micronutrient deficiencies can:",
        },
        options: {
          fr: ["Toujours être invisibles", "Toujours être mortelles", "Parfois réduire l'énergie et la clarté mentale", "Être uniquement visibles chez les enfants"],
          en: ["Always be invisible", "Always be fatal", "Sometimes reduce energy and mental clarity", "Only be visible in children"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Les carences peuvent entraîner fatigue, diminution des performances et symptômes subtils.",
          en: "Deficiencies can lead to fatigue, reduced performance, and subtle symptoms.",
        },
        source: {
          title: "Benton, Micronutrient deficiencies and cognitive performance",
          url: "https://pubmed.ncbi.nlm.nih.gov/20459344/",
        },
      },
      {
        id: 4,
        question: {
          fr: "Quel micronutriment aide à la formation du collagène ?",
          en: "Which micronutrient helps in collagen formation?",
        },
        options: {
          fr: ["Vitamine C", "Vitamine B12", "Vitamine K", "Iode"],
          en: ["Vitamin C", "Vitamin B12", "Vitamin K", "Iodine"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine C est essentielle à la synthèse du collagène, protéine clé de la peau et des tissus conjonctifs.",
          en: "Vitamin C is essential for collagen synthesis, a key protein in skin and connective tissues.",
        },
        source: {
          title: "Pullar et al., The roles of vitamin C in skin health",
          url: "https://pubmed.ncbi.nlm.nih.gov/28805671/",
        },
      },
      // Quiz 4
      {
        id: 5,
        question: {
          fr: "Quel micronutriment est directement synthétisé par les bactéries intestinales ?",
          en: "Which micronutrient is directly synthesized by gut bacteria?",
        },
        options: {
          fr: ["Vitamine B12", "Aucun micronutriment", "Certaines vitamines B & K", "Fer"],
          en: ["Vitamin B12", "No micronutrient", "Some B & K vitamins", "Iron"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Certaines bactéries du microbiome peuvent produire des vitamines B et K influençant leur disponibilité.",
          en: "Some microbiome bacteria can produce B and K vitamins influencing their availability.",
        },
        source: {
          title: "Carr & Maggini, Vitamin C and immune function",
          url: "https://pubmed.ncbi.nlm.nih.gov/29099763/",
        },
      },
      {
        id: 6,
        question: {
          fr: "Calcium est important pour :",
          en: "Calcium is important for:",
        },
        options: {
          fr: ["La vision uniquement", "La contraction musculaire et les os", "La digestion des graisses", "La production de glucose"],
          en: ["Vision only", "Muscle contraction and bones", "Fat digestion", "Glucose production"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Calcium joue un rôle structurel dans les os et dans la contraction musculaire.",
          en: "Calcium plays a structural role in bones and in muscle contraction.",
        },
        source: {
          title: "Zimmermann, Iodine deficiency",
          url: "https://pubmed.ncbi.nlm.nih.gov/18769214/",
        },
      },
      {
        id: 7,
        question: {
          fr: "Zinc est essentiel à :",
          en: "Zinc is essential for:",
        },
        options: {
          fr: ["La vision uniquement", "La production d'hémoglobine", "L'immunité et la réparation cellulaire", "La synthèse d'insuline"],
          en: ["Vision only", "Hemoglobin production", "Immunity and cellular repair", "Insulin synthesis"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Le zinc participe à la fonction immunitaire et à la cicatrisation.",
          en: "Zinc participates in immune function and wound healing.",
        },
        source: {
          title: "Benton, Micronutrient deficiencies and cognitive performance",
          url: "https://pubmed.ncbi.nlm.nih.gov/20459344/",
        },
      },
      {
        id: 8,
        question: {
          fr: "Un apport inadéquat en micronutriments peut contribuer à :",
          en: "Inadequate micronutrient intake can contribute to:",
        },
        options: {
          fr: ["Une meilleure santé", "Une réduction de la productivité et maladies", "Une perte de poids instantanée", "Une digestion plus rapide"],
          en: ["Better health", "Reduced productivity and diseases", "Instant weight loss", "Faster digestion"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Les carences non détectées peuvent diminuer la santé générale et la capacité à fonctionner normalement.",
          en: "Undetected deficiencies can diminish overall health and the ability to function normally.",
        },
        source: {
          title: "Pullar et al., The roles of vitamin C in skin health",
          url: "https://pubmed.ncbi.nlm.nih.gov/28805671/",
        },
      },
    ],
  },

  // NIVEAU 1.3 — Approfondir
  {
    id: "micro-1.3",
    levelId: "1.3",
    title: { fr: "Micronutrition Niveau 1.3", en: "Micronutrition Level 1.3" },
    subtitle: { fr: "Approfondir", en: "Deep Dive" },
    questions: [
      // Quiz 5
      {
        id: 1,
        question: {
          fr: "Quel rôle la vitamine E joue-t-elle ?",
          en: "What role does vitamin E play?",
        },
        options: {
          fr: ["Antioxydant cellulaire", "Production d'insuline", "Métabolisme des lipides uniquement", "Transport de l'oxygène"],
          en: ["Cellular antioxidant", "Insulin production", "Lipid metabolism only", "Oxygen transport"],
        },
        correctAnswer: 0,
        explanation: {
          fr: "La vitamine E protège les membranes cellulaires contre les radicaux libres.",
          en: "Vitamin E protects cell membranes against free radicals.",
        },
        source: {
          title: "Traber & Stevens, Vitamin E: antioxidant",
          url: "https://pubmed.ncbi.nlm.nih.gov/20166931/",
        },
      },
      {
        id: 2,
        question: {
          fr: "L'absorption des micronutriments peut être influencée par :",
          en: "Micronutrient absorption can be influenced by:",
        },
        options: {
          fr: ["La lumière du soleil", "Le microbiome intestinal", "La fréquence cardiaque", "Le bruit environnant"],
          en: ["Sunlight", "Gut microbiome", "Heart rate", "Environmental noise"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le microbiome joue un rôle dans la biodisponibilité des vitamines/minéraux.",
          en: "The microbiome plays a role in the bioavailability of vitamins/minerals.",
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
          fr: ["Remplace une mauvaise alimentation", "N'est toujours bénéfique pour tous", "Doit être recommandée à tous", "Est toujours sans risque"],
          en: ["Replaces a poor diet", "Is not always beneficial for everyone", "Should be recommended for everyone", "Is always risk-free"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Des preuves montrent que l'avantage dépend d'un déficit réel plutôt que d'une utilisation universelle.",
          en: "Evidence shows that the benefit depends on a real deficit rather than universal use.",
        },
        source: {
          title: "Jenkins et al., Multivitamin supplementation",
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
          fr: ["Hyperactivité", "Dysfonction thyroïdienne et retard mental", "Perte de cheveux uniquement", "Insomnie"],
          en: ["Hyperactivity", "Thyroid dysfunction and mental retardation", "Hair loss only", "Insomnia"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "L'insuffisance d'iode affecte la production d'hormones thyroïdiennes et le développement neurologique.",
          en: "Iodine insufficiency affects thyroid hormone production and neurological development.",
        },
        source: {
          title: "Bath et al., Iodine deficiency and brain development",
          url: "https://pubmed.ncbi.nlm.nih.gov/26529009/",
        },
      },
      // Quiz 6
      {
        id: 5,
        question: {
          fr: "Une carence en vitamine B12 peut provoquer :",
          en: "Vitamin B12 deficiency can cause:",
        },
        options: {
          fr: ["Éruption cutanée", "Anémie et troubles neurologiques", "Douleurs articulaires", "Hypertension"],
          en: ["Skin rash", "Anemia and neurological disorders", "Joint pain", "Hypertension"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La vitamine B12 est essentielle à la formation des globules rouges et au système nerveux.",
          en: "Vitamin B12 is essential for red blood cell formation and the nervous system.",
        },
        source: {
          title: "Traber & Stevens, Vitamin E: antioxidant",
          url: "https://pubmed.ncbi.nlm.nih.gov/20166931/",
        },
      },
      {
        id: 6,
        question: {
          fr: "Quel micronutriment est reconnu pour soutenir le système immunitaire ?",
          en: "Which micronutrient is recognized for supporting the immune system?",
        },
        options: {
          fr: ["Calcium", "Vitamine C", "Fer uniquement", "Glucose"],
          en: ["Calcium", "Vitamin C", "Iron only", "Glucose"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "La vitamine C aide la réaction immunitaire des cellules.",
          en: "Vitamin C helps the immune response of cells.",
        },
        source: {
          title: "Rowland et al., Gut microbiota and micronutrient metabolism",
          url: "https://pubmed.ncbi.nlm.nih.gov/35294077/",
        },
      },
      {
        id: 7,
        question: {
          fr: "L'oxygène est transporté par :",
          en: "Oxygen is transported by:",
        },
        options: {
          fr: ["Vitamine D", "Cholestérol", "Hémoglobine avec fer", "Vitamine K"],
          en: ["Vitamin D", "Cholesterol", "Hemoglobin with iron", "Vitamin K"],
        },
        correctAnswer: 2,
        explanation: {
          fr: "Le fer est un composant essentiel de l'hémoglobine qui transporte l'oxygène.",
          en: "Iron is an essential component of hemoglobin which transports oxygen.",
        },
        source: {
          title: "Jenkins et al., Multivitamin supplementation",
          url: "https://pubmed.ncbi.nlm.nih.gov/38648170/",
        },
      },
      {
        id: 8,
        question: {
          fr: "Le zinc agit aussi comme :",
          en: "Zinc also acts as:",
        },
        options: {
          fr: ["Un neurotransmetteur", "Un cofacteur enzymatique", "Une hormone", "Une enzyme digestive"],
          en: ["A neurotransmitter", "An enzymatic cofactor", "A hormone", "A digestive enzyme"],
        },
        correctAnswer: 1,
        explanation: {
          fr: "Le zinc est un cofacteur dans des centaines de réactions enzymatiques.",
          en: "Zinc is a cofactor in hundreds of enzymatic reactions.",
        },
        source: {
          title: "Bath et al., Iodine deficiency and brain development",
          url: "https://pubmed.ncbi.nlm.nih.gov/26529009/",
        },
      },
    ],
  },
];
