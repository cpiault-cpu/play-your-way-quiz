export type Language = 'fr' | 'en';

export type HealthQuizSeriesId = 'nutrition' | 'mitochondria';

export interface HealthQuizQuestion {
  question: { fr: string; en: string };
  options: { fr: string[]; en: string[] };
  correctAnswer: number;
}

export interface HealthQuizLevel {
  level: 1 | 2 | 3;
  seriesId: HealthQuizSeriesId;
  text: { fr: string; en: string };
  readingTime: number; // seconds
  questions: HealthQuizQuestion[];
  couponCode: string;
  discountPercent: string;
}

export interface HealthQuizSeries {
  id: HealthQuizSeriesId;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: string;
  bgClass: string;
}

export const healthQuizSeries: HealthQuizSeries[] = [
  {
    id: 'nutrition',
    title: { fr: 'Nutriments essentiels', en: 'Essential Nutrients' },
    description: {
      fr: "Ce quiz évalue votre mémoire à court terme et votre capacité de rétention d'informations nutritionnelles. Lisez attentivement le texte affiché pendant quelques secondes, puis répondez aux questions de mémoire.",
      en: "This quiz evaluates your short-term memory and your ability to retain nutritional information. Carefully read the text displayed for a few seconds, then answer the memory questions."
    },
    icon: '❤️',
    bgClass: 'bg-gradient-to-br from-red-50 to-orange-50'
  },
  {
    id: 'mitochondria',
    title: { fr: 'Le fonctionnement de la mitochondrie', en: 'How Mitochondria Work' },
    description: {
      fr: "Découvrez les secrets de la centrale énergétique de nos cellules. La mitochondrie produit l'ATP, carburant essentiel à toute activité cellulaire. Mémorisez les informations puis testez vos connaissances.",
      en: "Discover the secrets of our cells' powerhouse. Mitochondria produce ATP, the essential fuel for all cellular activity. Memorize the information then test your knowledge."
    },
    icon: '⚡',
    bgClass: 'bg-gradient-to-br from-orange-100 to-amber-100'
  }
];

export const healthQuizLevels: HealthQuizLevel[] = [
  // === NUTRITION SERIES ===
  {
    level: 1,
    seriesId: 'nutrition',
    readingTime: 20,
    text: {
      fr: `Le calcium contribue à la solidité des os et des dents, mais il intervient aussi dans la contraction musculaire.

Le fer permet le transport de l'oxygène dans le sang et aide à réduire la fatigue.

Les oméga-3 participent au bon fonctionnement du cerveau et soutiennent la mémoire et la concentration.

Chez l'adulte, les besoins en protéines sont en moyenne d'environ 0,8 g par kilo de poids corporel et par jour.`,
      en: `Calcium contributes to the strength of bones and teeth, but it also plays a role in muscle contraction.

Iron enables the transport of oxygen in the blood and helps reduce fatigue.

Omega-3s contribute to proper brain function and support memory and concentration.

In adults, protein requirements average about 0.8 g per kilogram of body weight per day.`
    },
    questions: [
      {
        question: { 
          fr: "En plus des os, le calcium intervient dans…",
          en: "Besides bones, calcium is involved in…"
        },
        options: {
          fr: ["La digestion", "La contraction musculaire", "La mémoire", "La vision"],
          en: ["Digestion", "Muscle contraction", "Memory", "Vision"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Le rôle principal du fer est de…",
          en: "The main role of iron is to…"
        },
        options: {
          fr: ["Renforcer les dents", "Transporter l'oxygène dans le sang", "Produire de l'énergie directement", "Lubrifier les articulations"],
          en: ["Strengthen teeth", "Transport oxygen in the blood", "Produce energy directly", "Lubricate joints"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Les oméga-3 sont surtout liés à…",
          en: "Omega-3s are mainly linked to…"
        },
        options: {
          fr: ["La peau", "Le système digestif", "Le cerveau et la mémoire", "Les os"],
          en: ["The skin", "The digestive system", "The brain and memory", "Bones"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Les besoins moyens en protéines d'un adulte sont…",
          en: "Average protein needs for an adult are…"
        },
        options: {
          fr: ["Identiques pour tous", "Environ 0,8 g/kg/jour", "Environ 2 g/kg/jour", "Indépendants du poids"],
          en: ["The same for everyone", "About 0.8 g/kg/day", "About 2 g/kg/day", "Independent of weight"]
        },
        correctAnswer: 1
      }
    ],
    couponCode: "SANTE5",
    discountPercent: "5%"
  },
  {
    level: 2,
    seriesId: 'nutrition',
    readingTime: 25,
    text: {
      fr: `Le calcium ne sert pas uniquement à la structure osseuse : il est aussi indispensable à l'activité musculaire.

Une carence en fer peut entraîner une baisse d'énergie, car l'oxygène circule moins efficacement dans le sang.

Les oméga-3, en particulier ceux d'origine marine, jouent un rôle important dans les fonctions cognitives.

Les besoins en protéines évoluent avec l'âge et l'activité physique, mais restent autour de 0,8 g/kg/jour chez l'adulte.`,
      en: `Calcium is not only used for bone structure: it is also essential for muscle activity.

Iron deficiency can lead to a drop in energy, as oxygen circulates less efficiently in the blood.

Omega-3s, especially those of marine origin, play an important role in cognitive functions.

Protein needs change with age and physical activity, but remain around 0.8 g/kg/day in adults.`
    },
    questions: [
      {
        question: { 
          fr: "Selon le texte, le calcium est aussi nécessaire pour…",
          en: "According to the text, calcium is also necessary for…"
        },
        options: {
          fr: ["La mémoire", "La vision nocturne", "L'activité musculaire", "Le transport du fer"],
          en: ["Memory", "Night vision", "Muscle activity", "Iron transport"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Pourquoi une carence en fer fatigue-t-elle ?",
          en: "Why does iron deficiency cause fatigue?"
        },
        options: {
          fr: ["Elle ralentit la digestion", "Elle diminue l'absorption du calcium", "L'oxygène circule moins bien dans le sang", "Elle bloque les oméga-3"],
          en: ["It slows digestion", "It reduces calcium absorption", "Oxygen circulates less efficiently in the blood", "It blocks omega-3s"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Les oméga-3 évoqués sont surtout associés à…",
          en: "The omega-3s mentioned are mainly associated with…"
        },
        options: {
          fr: ["La masse musculaire", "Les fonctions cognitives", "La solidité des dents", "La digestion des protéines"],
          en: ["Muscle mass", "Cognitive functions", "Tooth strength", "Protein digestion"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Les besoins en protéines…",
          en: "Protein needs…"
        },
        options: {
          fr: ["Sont fixes tout au long de la vie", "Dépendent uniquement du sexe", "Évoluent mais restent autour de 0,8 g/kg/jour chez l'adulte", "Sont toujours supérieurs à 1,5 g/kg/jour"],
          en: ["Are fixed throughout life", "Depend only on sex", "Change but remain around 0.8 g/kg/day in adults", "Are always above 1.5 g/kg/day"]
        },
        correctAnswer: 2
      }
    ],
    couponCode: "SANTE10",
    discountPercent: "10%"
  },
  {
    level: 3,
    seriesId: 'nutrition',
    readingTime: 30,
    text: {
      fr: `Le calcium est essentiel aux os, mais aussi à la transmission des signaux musculaires.

Le fer est un micronutriment clé de l'hémoglobine, indispensable au transport de l'oxygène.

Les oméga-3 contribuent à la fluidité des membranes neuronales, favorisant les fonctions cognitives.

Les apports protéiques recommandés chez l'adulte tournent autour de 0,8 g/kg/jour, avec des besoins plus élevés chez les seniors ou les sportifs.`,
      en: `Calcium is essential for bones, but also for the transmission of muscle signals.

Iron is a key micronutrient in hemoglobin, essential for oxygen transport.

Omega-3s contribute to the fluidity of neuronal membranes, promoting cognitive functions.

Recommended protein intake in adults is around 0.8 g/kg/day, with higher needs for seniors or athletes.`
    },
    questions: [
      {
        question: { 
          fr: "Quel nutriment agit à la fois sur les os ET les muscles ?",
          en: "Which nutrient affects both bones AND muscles?"
        },
        options: {
          fr: ["Le fer", "Les protéines", "Le calcium", "Les oméga-3"],
          en: ["Iron", "Proteins", "Calcium", "Omega-3s"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Le fer est directement lié à…",
          en: "Iron is directly linked to…"
        },
        options: {
          fr: ["La mémoire", "L'hémoglobine et l'oxygène", "La contraction musculaire", "La solidité osseuse"],
          en: ["Memory", "Hemoglobin and oxygen", "Muscle contraction", "Bone strength"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Selon le texte, les oméga-3 agissent sur le cerveau en améliorant…",
          en: "According to the text, omega-3s act on the brain by improving…"
        },
        options: {
          fr: ["La masse neuronale", "La fluidité des membranes neuronales", "La vitesse de digestion", "La fixation du calcium"],
          en: ["Neuronal mass", "Fluidity of neuronal membranes", "Digestion speed", "Calcium fixation"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Qui peut avoir des besoins en protéines supérieurs à 0,8 g/kg/jour ?",
          en: "Who may have protein needs above 0.8 g/kg/day?"
        },
        options: {
          fr: ["Un adulte sédentaire", "Tout le monde sans exception", "Les seniors ou les sportifs", "Uniquement les enfants"],
          en: ["A sedentary adult", "Everyone without exception", "Seniors or athletes", "Only children"]
        },
        correctAnswer: 2
      }
    ],
    couponCode: "SANTE15",
    discountPercent: "15%"
  },
  
  // === MITOCHONDRIA SERIES ===
  {
    level: 1,
    seriesId: 'mitochondria',
    readingTime: 20,
    text: {
      fr: `La mitochondrie est un organite présent dans la majorité des cellules humaines et joue un rôle central dans la production d'énergie.

Elle produit de l'ATP, une molécule indispensable au fonctionnement des cellules.

Les mitochondries utilisent principalement les nutriments issus des glucides et des lipides pour produire cette énergie.

Les cellules très actives, comme les muscles ou le cerveau, contiennent un grand nombre de mitochondries.`,
      en: `Mitochondria are organelles present in most human cells and play a central role in energy production.

They produce ATP, a molecule essential for cell function.

Mitochondria primarily use nutrients from carbohydrates and lipids to produce this energy.

Highly active cells, such as muscles or the brain, contain a large number of mitochondria.`
    },
    questions: [
      {
        question: { 
          fr: "Le rôle principal de la mitochondrie est de…",
          en: "The main role of mitochondria is to…"
        },
        options: {
          fr: ["Stocker l'oxygène", "Produire de l'énergie sous forme d'ATP", "Protéger l'ADN", "Fabriquer des protéines"],
          en: ["Store oxygen", "Produce energy in the form of ATP", "Protect DNA", "Make proteins"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "L'ATP est…",
          en: "ATP is…"
        },
        options: {
          fr: ["Une vitamine", "Une hormone", "Une molécule d'énergie cellulaire", "Un minéral"],
          en: ["A vitamin", "A hormone", "A cellular energy molecule", "A mineral"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Les mitochondries utilisent surtout…",
          en: "Mitochondria mainly use…"
        },
        options: {
          fr: ["Les protéines uniquement", "Les vitamines", "Les glucides et les lipides", "L'eau"],
          en: ["Only proteins", "Vitamins", "Carbohydrates and lipids", "Water"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Où trouve-t-on le plus de mitochondries ?",
          en: "Where are the most mitochondria found?"
        },
        options: {
          fr: ["Dans les cellules peu actives", "Dans les cellules mortes", "Dans les muscles et le cerveau", "Dans le plasma sanguin"],
          en: ["In inactive cells", "In dead cells", "In muscles and the brain", "In blood plasma"]
        },
        correctAnswer: 2
      }
    ],
    couponCode: "MITO5",
    discountPercent: "5%"
  },
  {
    level: 2,
    seriesId: 'mitochondria',
    readingTime: 25,
    text: {
      fr: `Les mitochondries produisent l'ATP grâce à un processus appelé respiration cellulaire.

Cette production d'énergie nécessite de l'oxygène, ce qui explique le lien entre mitochondries et respiration.

Les mitochondries possèdent leur propre ADN, distinct de l'ADN nucléaire.

Leur nombre et leur efficacité influencent directement la vitalité cellulaire et la performance physique.`,
      en: `Mitochondria produce ATP through a process called cellular respiration.

This energy production requires oxygen, which explains the link between mitochondria and breathing.

Mitochondria have their own DNA, distinct from nuclear DNA.

Their number and efficiency directly influence cellular vitality and physical performance.`
    },
    questions: [
      {
        question: { 
          fr: "Le processus utilisé par les mitochondries pour produire de l'ATP est…",
          en: "The process used by mitochondria to produce ATP is…"
        },
        options: {
          fr: ["La digestion cellulaire", "La fermentation", "La respiration cellulaire", "La photosynthèse"],
          en: ["Cellular digestion", "Fermentation", "Cellular respiration", "Photosynthesis"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Pourquoi l'oxygène est-il important pour les mitochondries ?",
          en: "Why is oxygen important for mitochondria?"
        },
        options: {
          fr: ["Il hydrate la cellule", "Il permet la respiration cellulaire", "Il transporte le glucose", "Il active les enzymes digestives"],
          en: ["It hydrates the cell", "It enables cellular respiration", "It transports glucose", "It activates digestive enzymes"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Une particularité des mitochondries est qu'elles…",
          en: "A unique feature of mitochondria is that they…"
        },
        options: {
          fr: ["N'ont pas d'ADN", "Utilisent l'ADN du noyau uniquement", "Possèdent leur propre ADN", "Ne se divisent jamais"],
          en: ["Have no DNA", "Only use nuclear DNA", "Have their own DNA", "Never divide"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "L'efficacité des mitochondries influence surtout…",
          en: "Mitochondrial efficiency mainly influences…"
        },
        options: {
          fr: ["La couleur des cellules", "La vitalité et la performance physique", "La taille des os", "La digestion intestinale"],
          en: ["Cell color", "Vitality and physical performance", "Bone size", "Intestinal digestion"]
        },
        correctAnswer: 1
      }
    ],
    couponCode: "MITO10",
    discountPercent: "10%"
  },
  {
    level: 3,
    seriesId: 'mitochondria',
    readingTime: 30,
    text: {
      fr: `La mitochondrie est le principal site de production de l'ATP via la chaîne respiratoire située dans sa membrane interne.

Elle joue aussi un rôle clé dans la régulation du stress oxydatif et de l'apoptose, la mort cellulaire programmée.

Le dysfonctionnement mitochondrial est associé au vieillissement et à de nombreuses maladies métaboliques et neurodégénératives.

L'activité physique stimule la biogenèse mitochondriale, augmentant leur nombre et leur efficacité.`,
      en: `Mitochondria are the main site of ATP production via the respiratory chain located in their inner membrane.

They also play a key role in regulating oxidative stress and apoptosis, programmed cell death.

Mitochondrial dysfunction is associated with aging and many metabolic and neurodegenerative diseases.

Physical activity stimulates mitochondrial biogenesis, increasing their number and efficiency.`
    },
    questions: [
      {
        question: { 
          fr: "Où se déroule principalement la production d'ATP dans la mitochondrie ?",
          en: "Where does ATP production mainly occur in mitochondria?"
        },
        options: {
          fr: ["Dans le cytoplasme", "Dans la membrane externe", "Dans la membrane interne (chaîne respiratoire)", "Dans le noyau"],
          en: ["In the cytoplasm", "In the outer membrane", "In the inner membrane (respiratory chain)", "In the nucleus"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "En plus de l'énergie, la mitochondrie participe à…",
          en: "Besides energy, mitochondria participate in…"
        },
        options: {
          fr: ["La digestion des protéines", "La synthèse des vitamines", "La régulation du stress oxydatif et de l'apoptose", "La photosynthèse cellulaire"],
          en: ["Protein digestion", "Vitamin synthesis", "Regulating oxidative stress and apoptosis", "Cellular photosynthesis"]
        },
        correctAnswer: 2
      },
      {
        question: { 
          fr: "Le dysfonctionnement mitochondrial est lié à…",
          en: "Mitochondrial dysfunction is linked to…"
        },
        options: {
          fr: ["Uniquement aux blessures musculaires", "Le vieillissement et certaines maladies chroniques", "La croissance osseuse", "L'absorption intestinale"],
          en: ["Only muscle injuries", "Aging and certain chronic diseases", "Bone growth", "Intestinal absorption"]
        },
        correctAnswer: 1
      },
      {
        question: { 
          fr: "Quel facteur augmente le nombre et l'efficacité des mitochondries ?",
          en: "What factor increases the number and efficiency of mitochondria?"
        },
        options: {
          fr: ["Le repos prolongé", "L'activité physique régulière", "Le jeûne hydrique seul", "Le sommeil uniquement"],
          en: ["Prolonged rest", "Regular physical activity", "Water fasting alone", "Sleep only"]
        },
        correctAnswer: 1
      }
    ],
    couponCode: "MITO15",
    discountPercent: "15%"
  }
];

export const healthQuizTranslations = {
  fr: {
    title: "Quiz Santé",
    subtitle: "Mémorisez le texte puis répondez aux questions",
    level: "Niveau",
    readText: "Mémorisez ce texte",
    timeRemaining: "Temps restant",
    seconds: "secondes",
    startQuiz: "Commencer le quiz",
    question: "Question",
    of: "sur",
    correct: "Bonne réponse !",
    incorrect: "Mauvaise réponse",
    next: "Suivant",
    results: "Résultats",
    score: "Score",
    perfect: "Score parfait !",
    couponTitle: "Félicitations !",
    couponText: "Voici votre code de réduction :",
    couponCopied: "Code copié !",
    tryAgain: "Réessayer",
    back: "Retour",
    enterEmail: "Entrez votre email pour commencer",
    emailPlaceholder: "votre@email.com",
    invalidEmail: "Email invalide",
    start: "Commencer",
    visitShop: "Visitez notre boutique",
    level1Desc: "4 questions • Texte affiché 20 secondes",
    level2Desc: "4 questions • Texte affiché 25 secondes",
    level3Desc: "4 questions • Texte affiché 30 secondes",
    discount: "de réduction",
    play: "Jouer",
    yourMistakes: "Vos erreurs",
    yourAnswer: "Votre réponse",
    correctAnswer: "Bonne réponse"
  },
  en: {
    title: "Health Quiz",
    subtitle: "Memorize the text then answer the questions",
    level: "Level",
    readText: "Memorize this text",
    timeRemaining: "Time remaining",
    seconds: "seconds",
    startQuiz: "Start quiz",
    question: "Question",
    of: "of",
    correct: "Correct!",
    incorrect: "Incorrect",
    next: "Next",
    results: "Results",
    score: "Score",
    perfect: "Perfect score!",
    couponTitle: "Congratulations!",
    couponText: "Here is your discount code:",
    couponCopied: "Code copied!",
    tryAgain: "Try again",
    back: "Back",
    enterEmail: "Enter your email to start",
    emailPlaceholder: "your@email.com",
    invalidEmail: "Invalid email",
    start: "Start",
    visitShop: "Visit our shop",
    level1Desc: "4 questions • Text displayed 20 seconds",
    level2Desc: "4 questions • Text displayed 25 seconds",
    level3Desc: "4 questions • Text displayed 30 seconds",
    discount: "discount",
    play: "Play",
    yourMistakes: "Your mistakes",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer"
  }
};
