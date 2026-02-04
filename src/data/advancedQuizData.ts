import { Language } from "./quizData";

// Extended question with explanations and trap variants
export interface AdvancedQuestion {
  id: string;
  question: { fr: string; en: string };
  options: { fr: string[]; en: string[] };
  correctAnswer: number;
  explanation: { fr: string; en: string };
  source?: { fr: string; en: string };
  // Trap variant - reformulated version with a trick
  trapVariant?: {
    question: { fr: string; en: string };
    options: { fr: string[]; en: string[] };
    correctAnswer: number;
  };
  isTrap?: boolean;
}

export interface AdvancedQuizLevel {
  id: string;
  level: 1 | 2 | 3;
  category: "biology" | "micronutrition" | "plants";
  title: { fr: string; en: string };
  introText: { fr: string; en: string };
  questions: AdvancedQuestion[];
}

// Introductory texts for each category
export const categoryIntros = {
  biology: {
    fr: "Rien n'est plus merveilleux que les rouages du vivant, et explorer ce qui se passe sous la surface. Si le sujet vous passionne comme nous, ces quiz vont vous plaire.",
    en: "Nothing is more wonderful than the inner workings of life, and exploring what happens beneath the surface. If you're as passionate about this subject as we are, you'll love these quizzes."
  },
  micronutrition: {
    fr: "Comment vitamines, minéraux et oligo-éléments influencent chaque fonction du corps. Ces équilibres invisibles qui nous soutiennent chaque jour. Affinez vos connaissances pour avoir des échanges encore plus intéressants quand vous discutez avec votre naturopathe.",
    en: "How vitamins, minerals and trace elements influence every function of the body. These invisible balances that support us every day. Sharpen your knowledge for even more interesting discussions with your naturopath."
  },
  plants: {
    fr: "Les plantes médicinales murmurent depuis toujours leurs secrets à ceux qui savent les écouter.",
    en: "Medicinal plants have always whispered their secrets to those who know how to listen."
  }
};

// Level-specific intro texts
export const levelIntros: Record<string, { fr: string; en: string }> = {
  // Biology
  "biology-1": {
    fr: "Découvrez les bases fascinantes de la biologie humaine. Ce premier niveau explore les organes, les cellules et les mécanismes fondamentaux de la vie.",
    en: "Discover the fascinating basics of human biology. This first level explores organs, cells and the fundamental mechanisms of life."
  },
  "biology-2": {
    fr: "Approfondissez vos connaissances sur les neurotransmetteurs, le microbiote et les processus cellulaires avancés.",
    en: "Deepen your knowledge about neurotransmitters, the microbiome and advanced cellular processes."
  },
  "biology-3": {
    fr: "Niveau expert : explorez l'ADN, l'épigénétique, CRISPR et les découvertes Nobel qui ont révolutionné notre compréhension du vivant.",
    en: "Expert level: explore DNA, epigenetics, CRISPR and the Nobel discoveries that revolutionized our understanding of life."
  },
  // Micronutrition
  "micronutrition-1": {
    fr: "Les bases de la micronutrition : vitamines, minéraux et leurs rôles essentiels dans votre organisme.",
    en: "The basics of micronutrition: vitamins, minerals and their essential roles in your body."
  },
  "micronutrition-2": {
    fr: "Niveau intermédiaire : biodisponibilité, cofacteurs enzymatiques et interactions entre nutriments.",
    en: "Intermediate level: bioavailability, enzymatic cofactors and nutrient interactions."
  },
  "micronutrition-3": {
    fr: "Niveau expert : antioxydants, NAD+, glutathion et bioénergétique cellulaire.",
    en: "Expert level: antioxidants, NAD+, glutathione and cellular bioenergetics."
  },
  // Plants
  "plants-1": {
    fr: "Initiez-vous aux plantes médicinales les plus connues et leurs propriétés traditionnelles.",
    en: "Get to know the most famous medicinal plants and their traditional properties."
  },
  "plants-2": {
    fr: "Niveau intermédiaire : curcuma, ginkgo, millepertuis et les plantes phares de la phytothérapie.",
    en: "Intermediate level: turmeric, ginkgo, St. John's wort and the flagship plants of phytotherapy."
  },
  "plants-3": {
    fr: "Niveau expert : adaptogènes, berbérine, rhodiola et les découvertes avancées en phytothérapie.",
    en: "Expert level: adaptogens, berberine, rhodiola and advanced discoveries in phytotherapy."
  }
};

// Advanced quiz questions with explanations and trap variants
export const advancedQuizzes: AdvancedQuizLevel[] = [
  // ===== BIOLOGY LEVEL 1 =====
  {
    id: "biology-1",
    level: 1,
    category: "biology",
    title: { fr: "Biologie - Niveau 1", en: "Biology - Level 1" },
    introText: levelIntros["biology-1"],
    questions: [
      {
        id: "bio1-1",
        question: {
          fr: "Quel organe produit l'insuline ?",
          en: "Which organ produces insulin?"
        },
        options: {
          fr: ["Foie", "Pancréas", "Reins", "Estomac"],
          en: ["Liver", "Pancreas", "Kidneys", "Stomach"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le pancréas produit l'insuline grâce aux cellules bêta des îlots de Langerhans. L'insuline régule la glycémie en permettant aux cellules d'absorber le glucose.",
          en: "📌 The pancreas produces insulin through the beta cells of the islets of Langerhans. Insulin regulates blood sugar by allowing cells to absorb glucose."
        },
        source: {
          fr: "📚 Source : Guyton & Hall, Textbook of Medical Physiology",
          en: "📚 Source: Guyton & Hall, Textbook of Medical Physiology"
        },
        trapVariant: {
          question: {
            fr: "L'insuline est produite par le foie, vrai ou faux ?",
            en: "Insulin is produced by the liver, true or false?"
          },
          options: {
            fr: ["Vrai, le foie régule la glycémie", "Faux, c'est le pancréas", "Vrai, avec les reins", "Faux, c'est l'estomac"],
            en: ["True, the liver regulates blood sugar", "False, it's the pancreas", "True, with the kidneys", "False, it's the stomach"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio1-2",
        question: {
          fr: "Combien de chromosomes contient une cellule humaine normale ?",
          en: "How many chromosomes does a normal human cell contain?"
        },
        options: {
          fr: ["23", "46", "48", "44"],
          en: ["23", "46", "48", "44"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Une cellule humaine normale (somatique) contient 46 chromosomes, soit 23 paires. Les gamètes (ovules et spermatozoïdes) n'en contiennent que 23.",
          en: "📌 A normal human (somatic) cell contains 46 chromosomes, or 23 pairs. Gametes (eggs and sperm) contain only 23."
        },
        source: {
          fr: "📚 Source : Alberts et al., Molecular Biology of the Cell",
          en: "📚 Source: Alberts et al., Molecular Biology of the Cell"
        },
        trapVariant: {
          question: {
            fr: "Les cellules humaines contiennent 23 chromosomes, n'est-ce pas ?",
            en: "Human cells contain 23 chromosomes, right?"
          },
          options: {
            fr: ["Oui, 23 chromosomes", "Non, 46 chromosomes (23 paires)", "Oui, comme les gamètes", "Non, 48 chromosomes"],
            en: ["Yes, 23 chromosomes", "No, 46 chromosomes (23 pairs)", "Yes, like gametes", "No, 48 chromosomes"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio1-3",
        question: {
          fr: "Quel est le plus grand organe du corps humain ?",
          en: "What is the largest organ in the human body?"
        },
        options: {
          fr: ["Le foie", "Les poumons", "La peau", "Le cœur"],
          en: ["The liver", "The lungs", "The skin", "The heart"]
        },
        correctAnswer: 2,
        explanation: {
          fr: "📌 La peau est le plus grand organe du corps humain, pesant environ 3-4 kg et couvrant une surface de 1,5 à 2 m². Elle joue un rôle essentiel de protection.",
          en: "📌 The skin is the largest organ in the human body, weighing about 3-4 kg and covering an area of 1.5 to 2 m². It plays an essential protective role."
        },
        trapVariant: {
          question: {
            fr: "Le foie est le plus grand organe interne, mais quel est le plus grand organe du corps ?",
            en: "The liver is the largest internal organ, but what is the largest organ in the body?"
          },
          options: {
            fr: ["Le foie bien sûr", "Les poumons combinés", "La peau", "L'intestin grêle"],
            en: ["The liver of course", "The combined lungs", "The skin", "The small intestine"]
          },
          correctAnswer: 2
        }
      },
      {
        id: "bio1-4",
        question: {
          fr: "Quelle molécule transporte l'oxygène dans le sang ?",
          en: "Which molecule carries oxygen in the blood?"
        },
        options: {
          fr: ["Glucose", "Hémoglobine", "Albumine", "Fibrinogène"],
          en: ["Glucose", "Hemoglobin", "Albumin", "Fibrinogen"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'hémoglobine est la protéine contenue dans les globules rouges qui transporte l'oxygène des poumons vers les tissus et le CO2 en retour.",
          en: "📌 Hemoglobin is the protein contained in red blood cells that carries oxygen from the lungs to the tissues and CO2 back."
        },
        trapVariant: {
          question: {
            fr: "Le glucose transporte l'oxygène dans le sang, vrai ou faux ?",
            en: "Glucose carries oxygen in the blood, true or false?"
          },
          options: {
            fr: ["Vrai, c'est l'énergie du sang", "Faux, c'est l'hémoglobine", "Vrai, dans les globules rouges", "Faux, c'est l'albumine"],
            en: ["True, it's the energy in blood", "False, it's hemoglobin", "True, in red blood cells", "False, it's albumin"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== BIOLOGY LEVEL 2 =====
  {
    id: "biology-2",
    level: 2,
    category: "biology",
    title: { fr: "Biologie - Niveau 2", en: "Biology - Level 2" },
    introText: levelIntros["biology-2"],
    questions: [
      {
        id: "bio2-1",
        question: {
          fr: "Quel neurotransmetteur est principalement associé au bonheur ?",
          en: "Which neurotransmitter is mainly associated with happiness?"
        },
        options: {
          fr: ["Dopamine", "Sérotonine", "Adrénaline", "Acétylcholine"],
          en: ["Dopamine", "Serotonin", "Adrenaline", "Acetylcholine"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La sérotonine est souvent appelée 'l'hormone du bonheur'. Elle régule l'humeur, le sommeil et l'appétit. Un déficit est associé à la dépression.",
          en: "📌 Serotonin is often called the 'happiness hormone'. It regulates mood, sleep and appetite. A deficit is associated with depression."
        },
        trapVariant: {
          question: {
            fr: "La dopamine est le principal neurotransmetteur du bonheur, vrai ?",
            en: "Dopamine is the main happiness neurotransmitter, right?"
          },
          options: {
            fr: ["Oui, dopamine = bonheur", "Non, c'est la sérotonine", "Oui, comme la récompense", "Non, c'est l'adrénaline"],
            en: ["Yes, dopamine = happiness", "No, it's serotonin", "Yes, like reward", "No, it's adrenaline"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio2-2",
        question: {
          fr: "Quelle hormone régule le cycle circadien ?",
          en: "Which hormone regulates the circadian cycle?"
        },
        options: {
          fr: ["Cortisol", "Mélatonine", "Insuline", "Thyroxine"],
          en: ["Cortisol", "Melatonin", "Insulin", "Thyroxine"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La mélatonine, produite par la glande pinéale, régule le cycle veille-sommeil. Sa production augmente le soir et diminue avec la lumière.",
          en: "📌 Melatonin, produced by the pineal gland, regulates the sleep-wake cycle. Its production increases in the evening and decreases with light."
        },
        trapVariant: {
          question: {
            fr: "Le cortisol, l'hormone du stress, régule aussi le cycle circadien, non ?",
            en: "Cortisol, the stress hormone, also regulates the circadian cycle, right?"
          },
          options: {
            fr: ["Oui, cortisol et sommeil", "Non, c'est la mélatonine", "Oui, il baisse le soir", "Non, c'est l'insuline"],
            en: ["Yes, cortisol and sleep", "No, it's melatonin", "Yes, it decreases in evening", "No, it's insulin"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio2-3",
        question: {
          fr: "L'apoptose est :",
          en: "Apoptosis is:"
        },
        options: {
          fr: ["La division cellulaire", "La mort cellulaire programmée", "La réparation de l'ADN", "La différenciation cellulaire"],
          en: ["Cell division", "Programmed cell death", "DNA repair", "Cell differentiation"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'apoptose est un processus de mort cellulaire programmée essentiel pour éliminer les cellules endommagées ou inutiles sans inflammation.",
          en: "📌 Apoptosis is a programmed cell death process essential for eliminating damaged or unnecessary cells without inflammation."
        },
        trapVariant: {
          question: {
            fr: "L'apoptose est le processus de division cellulaire rapide, vrai ?",
            en: "Apoptosis is the process of rapid cell division, true?"
          },
          options: {
            fr: ["Vrai, pour la croissance", "Faux, c'est la mort cellulaire programmée", "Vrai, comme la mitose", "Faux, c'est la réparation"],
            en: ["True, for growth", "False, it's programmed cell death", "True, like mitosis", "False, it's repair"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio2-4",
        question: {
          fr: "Les télomères sont situés :",
          en: "Telomeres are located:"
        },
        options: {
          fr: ["Au centre des chromosomes", "Aux extrémités des chromosomes", "Dans le cytoplasme", "Dans les mitochondries"],
          en: ["At the center of chromosomes", "At the ends of chromosomes", "In the cytoplasm", "In the mitochondria"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Les télomères sont des séquences répétitives d'ADN aux extrémités des chromosomes. Ils protègent l'ADN et raccourcissent avec l'âge.",
          en: "📌 Telomeres are repetitive DNA sequences at the ends of chromosomes. They protect DNA and shorten with age."
        },
        trapVariant: {
          question: {
            fr: "Les télomères sont au centre des chromosomes, là où se trouve le centromère ?",
            en: "Telomeres are at the center of chromosomes, where the centromere is?"
          },
          options: {
            fr: ["Oui, avec le centromère", "Non, aux extrémités", "Oui, ils divisent le chromosome", "Non, dans les mitochondries"],
            en: ["Yes, with the centromere", "No, at the ends", "Yes, they divide the chromosome", "No, in mitochondria"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== BIOLOGY LEVEL 3 =====
  {
    id: "biology-3",
    level: 3,
    category: "biology",
    title: { fr: "Biologie - Niveau 3", en: "Biology - Level 3" },
    introText: levelIntros["biology-3"],
    questions: [
      {
        id: "bio3-1",
        question: {
          fr: "L'ADN mitochondrial est transmis exclusivement par :",
          en: "Mitochondrial DNA is transmitted exclusively by:"
        },
        options: {
          fr: ["Le père", "La mère", "Les deux parents", "Ni l'un ni l'autre"],
          en: ["The father", "The mother", "Both parents", "Neither"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'ADN mitochondrial est hérité uniquement de la mère car les mitochondries du spermatozoïde sont détruites après la fécondation.",
          en: "📌 Mitochondrial DNA is inherited only from the mother because the mitochondria of the sperm are destroyed after fertilization."
        },
        source: {
          fr: "📚 Source : Nature Reviews Genetics",
          en: "📚 Source: Nature Reviews Genetics"
        },
        trapVariant: {
          question: {
            fr: "L'ADN mitochondrial est transmis par les deux parents comme l'ADN nucléaire ?",
            en: "Mitochondrial DNA is transmitted by both parents like nuclear DNA?"
          },
          options: {
            fr: ["Oui, comme l'ADN normal", "Non, uniquement par la mère", "Oui, 50-50", "Non, uniquement par le père"],
            en: ["Yes, like normal DNA", "No, only by the mother", "Yes, 50-50", "No, only by the father"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio3-2",
        question: {
          fr: "L'autophagie, processus récompensé par le Prix Nobel 2016, est :",
          en: "Autophagy, the process awarded the 2016 Nobel Prize, is:"
        },
        options: {
          fr: ["La destruction des cellules voisines", "Le recyclage des composants cellulaires endommagés", "La division cellulaire rapide", "La mort cellulaire programmée"],
          en: ["The destruction of neighboring cells", "The recycling of damaged cellular components", "Rapid cell division", "Programmed cell death"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'autophagie (\"se manger soi-même\") est le processus par lequel les cellules recyclent leurs composants endommagés. Yoshinori Ohsumi a reçu le Nobel 2016 pour cette découverte.",
          en: "📌 Autophagy ('self-eating') is the process by which cells recycle their damaged components. Yoshinori Ohsumi received the 2016 Nobel for this discovery."
        },
        trapVariant: {
          question: {
            fr: "L'autophagie est synonyme d'apoptose, la mort cellulaire programmée ?",
            en: "Autophagy is synonymous with apoptosis, programmed cell death?"
          },
          options: {
            fr: ["Oui, même processus", "Non, c'est le recyclage cellulaire", "Oui, destruction cellulaire", "Non, c'est la division"],
            en: ["Yes, same process", "No, it's cellular recycling", "Yes, cell destruction", "No, it's division"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio3-3",
        question: {
          fr: "La télomérase est une enzyme qui :",
          en: "Telomerase is an enzyme that:"
        },
        options: {
          fr: ["Raccourcit les télomères", "Allonge les télomères", "Détruit les chromosomes", "Répare les mutations génétiques"],
          en: ["Shortens telomeres", "Lengthens telomeres", "Destroys chromosomes", "Repairs genetic mutations"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La télomérase allonge les télomères, contrecarrant leur raccourcissement naturel. Elle est très active dans les cellules souches et cancéreuses.",
          en: "📌 Telomerase lengthens telomeres, counteracting their natural shortening. It is very active in stem cells and cancer cells."
        },
        trapVariant: {
          question: {
            fr: "La télomérase raccourcit les télomères avec l'âge ?",
            en: "Telomerase shortens telomeres with age?"
          },
          options: {
            fr: ["Oui, c'est le vieillissement", "Non, elle les allonge", "Oui, naturellement", "Non, elle les détruit"],
            en: ["Yes, that's aging", "No, it lengthens them", "Yes, naturally", "No, it destroys them"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "bio3-4",
        question: {
          fr: "CRISPR-Cas9, récompensé par le Prix Nobel 2020, fonctionne comme :",
          en: "CRISPR-Cas9, awarded the 2020 Nobel Prize, works as:"
        },
        options: {
          fr: ["Un microscope moléculaire", "Des ciseaux moléculaires pour l'ADN", "Un amplificateur de gènes", "Un vaccin génétique"],
          en: ["A molecular microscope", "Molecular scissors for DNA", "A gene amplifier", "A genetic vaccine"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 CRISPR-Cas9 agit comme des ciseaux moléculaires capables de couper l'ADN à des endroits précis pour modifier les gènes. Nobel 2020 décerné à Charpentier et Doudna.",
          en: "📌 CRISPR-Cas9 acts as molecular scissors capable of cutting DNA at precise locations to modify genes. Nobel 2020 awarded to Charpentier and Doudna."
        },
        trapVariant: {
          question: {
            fr: "CRISPR-Cas9 amplifie les gènes comme la PCR ?",
            en: "CRISPR-Cas9 amplifies genes like PCR?"
          },
          options: {
            fr: ["Oui, multiplication génique", "Non, ce sont des ciseaux moléculaires", "Oui, pour le séquençage", "Non, c'est un vaccin"],
            en: ["Yes, gene multiplication", "No, they're molecular scissors", "Yes, for sequencing", "No, it's a vaccine"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== MICRONUTRITION LEVEL 1 =====
  {
    id: "micronutrition-1",
    level: 1,
    category: "micronutrition",
    title: { fr: "Micronutrition - Niveau 1", en: "Micronutrition - Level 1" },
    introText: levelIntros["micronutrition-1"],
    questions: [
      {
        id: "micro1-1",
        question: {
          fr: "Quel est le rôle principal de la vitamine D dans l'organisme ?",
          en: "What is the main role of vitamin D in the body?"
        },
        options: {
          fr: ["Renforcer les os", "Améliorer la vue", "Favoriser la digestion", "Augmenter l'énergie"],
          en: ["Strengthen bones", "Improve vision", "Aid digestion", "Increase energy"]
        },
        correctAnswer: 0,
        explanation: {
          fr: "📌 La vitamine D favorise l'absorption du calcium et du phosphore, essentiels pour la santé osseuse. Elle joue aussi un rôle dans l'immunité.",
          en: "📌 Vitamin D promotes the absorption of calcium and phosphorus, essential for bone health. It also plays a role in immunity."
        },
        trapVariant: {
          question: {
            fr: "La vitamine D améliore principalement la vue, comme la vitamine A ?",
            en: "Vitamin D mainly improves vision, like vitamin A?"
          },
          options: {
            fr: ["Non, elle renforce les os", "Oui, vision et os", "Non, c'est la digestion", "Oui, avec le bêta-carotène"],
            en: ["No, it strengthens bones", "Yes, vision and bones", "No, it's digestion", "Yes, with beta-carotene"]
          },
          correctAnswer: 0
        }
      },
      {
        id: "micro1-2",
        question: {
          fr: "Quel minéral est essentiel pour le bon fonctionnement de la thyroïde ?",
          en: "Which mineral is essential for proper thyroid function?"
        },
        options: {
          fr: ["Fer", "Iode", "Calcium", "Zinc"],
          en: ["Iron", "Iodine", "Calcium", "Zinc"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'iode est indispensable à la synthèse des hormones thyroïdiennes T3 et T4, qui régulent le métabolisme. Une carence peut causer le goitre.",
          en: "📌 Iodine is essential for the synthesis of thyroid hormones T3 and T4, which regulate metabolism. A deficiency can cause goiter."
        },
        trapVariant: {
          question: {
            fr: "Le fer est le minéral clé pour la thyroïde, n'est-ce pas ?",
            en: "Iron is the key mineral for the thyroid, isn't it?"
          },
          options: {
            fr: ["Oui, fer et thyroïde", "Non, c'est l'iode", "Oui, pour les hormones", "Non, c'est le calcium"],
            en: ["Yes, iron and thyroid", "No, it's iodine", "Yes, for hormones", "No, it's calcium"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro1-3",
        question: {
          fr: "Quelle vitamine est principalement connue pour son rôle antioxydant ?",
          en: "Which vitamin is mainly known for its antioxidant role?"
        },
        options: {
          fr: ["Vitamine A", "Vitamine B12", "Vitamine C", "Vitamine K"],
          en: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin K"]
        },
        correctAnswer: 2,
        explanation: {
          fr: "📌 La vitamine C est un puissant antioxydant qui protège les cellules contre le stress oxydatif. Elle favorise aussi l'absorption du fer.",
          en: "📌 Vitamin C is a powerful antioxidant that protects cells against oxidative stress. It also promotes iron absorption."
        },
        trapVariant: {
          question: {
            fr: "La vitamine B12 est le principal antioxydant, car elle protège le système nerveux ?",
            en: "Vitamin B12 is the main antioxidant because it protects the nervous system?"
          },
          options: {
            fr: ["Oui, B12 = antioxydant", "Non, c'est la vitamine C", "Oui, nerfs et antioxydant", "Non, c'est la vitamine A"],
            en: ["Yes, B12 = antioxidant", "No, it's vitamin C", "Yes, nerves and antioxidant", "No, it's vitamin A"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro1-4",
        question: {
          fr: "Quel acide gras est considéré comme essentiel pour le cerveau ?",
          en: "Which fatty acid is considered essential for the brain?"
        },
        options: {
          fr: ["Acide oléique", "Oméga-3 (DHA)", "Acide palmitique", "Acide laurique"],
          en: ["Oleic acid", "Omega-3 (DHA)", "Palmitic acid", "Lauric acid"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le DHA (acide docosahexaénoïque), un oméga-3, constitue environ 40% des acides gras du cerveau et est crucial pour les fonctions cognitives.",
          en: "📌 DHA (docosahexaenoic acid), an omega-3, makes up about 40% of brain fatty acids and is crucial for cognitive functions."
        },
        trapVariant: {
          question: {
            fr: "L'acide oléique (huile d'olive) est l'acide gras le plus important pour le cerveau ?",
            en: "Oleic acid (olive oil) is the most important fatty acid for the brain?"
          },
          options: {
            fr: ["Oui, régime méditerranéen", "Non, c'est le DHA (oméga-3)", "Oui, pour la mémoire", "Non, c'est l'acide palmitique"],
            en: ["Yes, Mediterranean diet", "No, it's DHA (omega-3)", "Yes, for memory", "No, it's palmitic acid"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== MICRONUTRITION LEVEL 2 =====
  {
    id: "micronutrition-2",
    level: 2,
    category: "micronutrition",
    title: { fr: "Micronutrition - Niveau 2", en: "Micronutrition - Level 2" },
    introText: levelIntros["micronutrition-2"],
    questions: [
      {
        id: "micro2-1",
        question: {
          fr: "Quel cofacteur enzymatique est essentiel à plus de 300 réactions biochimiques ?",
          en: "Which enzymatic cofactor is essential for over 300 biochemical reactions?"
        },
        options: {
          fr: ["Calcium", "Magnésium", "Potassium", "Sodium"],
          en: ["Calcium", "Magnesium", "Potassium", "Sodium"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le magnésium participe à plus de 300 réactions enzymatiques : synthèse d'ATP, relaxation musculaire, transmission nerveuse, synthèse protéique.",
          en: "📌 Magnesium participates in over 300 enzymatic reactions: ATP synthesis, muscle relaxation, nerve transmission, protein synthesis."
        },
        trapVariant: {
          question: {
            fr: "Le calcium est impliqué dans plus de 300 réactions enzymatiques ?",
            en: "Calcium is involved in over 300 enzymatic reactions?"
          },
          options: {
            fr: ["Oui, calcium = cofacteur universel", "Non, c'est le magnésium", "Oui, avec le potassium", "Non, c'est le sodium"],
            en: ["Yes, calcium = universal cofactor", "No, it's magnesium", "Yes, with potassium", "No, it's sodium"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro2-2",
        question: {
          fr: "La biodisponibilité du fer non héminique est améliorée par :",
          en: "The bioavailability of non-heme iron is improved by:"
        },
        options: {
          fr: ["Le calcium", "La vitamine C", "Les tanins", "Les phytates"],
          en: ["Calcium", "Vitamin C", "Tannins", "Phytates"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La vitamine C améliore l'absorption du fer non héminique (végétal) en le convertissant en forme ferreux (Fe2+) plus assimilable.",
          en: "📌 Vitamin C improves the absorption of non-heme iron (plant-based) by converting it to the more absorbable ferrous form (Fe2+)."
        },
        trapVariant: {
          question: {
            fr: "Le calcium améliore l'absorption du fer végétal ?",
            en: "Calcium improves the absorption of plant iron?"
          },
          options: {
            fr: ["Oui, synergie minérale", "Non, c'est la vitamine C", "Oui, dans les laitages", "Non, il l'inhibe en fait"],
            en: ["Yes, mineral synergy", "No, it's vitamin C", "Yes, in dairy", "No, it actually inhibits it"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro2-3",
        question: {
          fr: "Quelle forme de vitamine B12 est la plus active dans l'organisme ?",
          en: "Which form of vitamin B12 is most active in the body?"
        },
        options: {
          fr: ["Cyanocobalamine", "Méthylcobalamine", "Hydroxocobalamine", "Adénosylcobalamine"],
          en: ["Cyanocobalamin", "Methylcobalamin", "Hydroxocobalamin", "Adenosylcobalamin"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La méthylcobalamine est la forme active de B12 utilisée directement par les cellules, notamment pour la méthylation de l'homocystéine.",
          en: "📌 Methylcobalamin is the active form of B12 used directly by cells, particularly for homocysteine methylation."
        },
        trapVariant: {
          question: {
            fr: "La cyanocobalamine est la forme la plus active de B12 car c'est la plus courante en suppléments ?",
            en: "Cyanocobalamin is the most active form of B12 because it's the most common in supplements?"
          },
          options: {
            fr: ["Oui, la plus utilisée = la meilleure", "Non, c'est la méthylcobalamine", "Oui, forme standard", "Non, c'est l'hydroxocobalamine"],
            en: ["Yes, most used = best", "No, it's methylcobalamin", "Yes, standard form", "No, it's hydroxocobalamin"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro2-4",
        question: {
          fr: "Quel ratio oméga-6/oméga-3 est généralement recommandé ?",
          en: "What omega-6/omega-3 ratio is generally recommended?"
        },
        options: {
          fr: ["1:1 à 4:1", "10:1", "15:1", "20:1"],
          en: ["1:1 to 4:1", "10:1", "15:1", "20:1"]
        },
        correctAnswer: 0,
        explanation: {
          fr: "📌 Un ratio de 1:1 à 4:1 est optimal pour réduire l'inflammation. L'alimentation occidentale moderne est souvent à 15-20:1, ce qui est pro-inflammatoire.",
          en: "📌 A ratio of 1:1 to 4:1 is optimal to reduce inflammation. The modern Western diet is often at 15-20:1, which is pro-inflammatory."
        },
        trapVariant: {
          question: {
            fr: "Un ratio oméga-6/oméga-3 de 15:1 est recommandé comme dans l'alimentation moderne ?",
            en: "An omega-6/omega-3 ratio of 15:1 is recommended as in the modern diet?"
          },
          options: {
            fr: ["Non, idéalement 1:1 à 4:1", "Oui, 15:1 est normal", "Non, il faut 20:1", "Oui, standard occidental"],
            en: ["No, ideally 1:1 to 4:1", "Yes, 15:1 is normal", "No, you need 20:1", "Yes, Western standard"]
          },
          correctAnswer: 0
        }
      }
    ]
  },
  // ===== MICRONUTRITION LEVEL 3 =====
  {
    id: "micronutrition-3",
    level: 3,
    category: "micronutrition",
    title: { fr: "Micronutrition - Niveau 3", en: "Micronutrition - Level 3" },
    introText: levelIntros["micronutrition-3"],
    questions: [
      {
        id: "micro3-1",
        question: {
          fr: "Le glutathion est considéré comme :",
          en: "Glutathione is considered as:"
        },
        options: {
          fr: ["Un pro-oxydant", "Le maître antioxydant", "Une hormone", "Un neurotransmetteur"],
          en: ["A pro-oxidant", "The master antioxidant", "A hormone", "A neurotransmitter"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le glutathion est appelé 'maître antioxydant' car il régénère les autres antioxydants (vitamines C, E) et protège les cellules du stress oxydatif.",
          en: "📌 Glutathione is called the 'master antioxidant' because it regenerates other antioxidants (vitamins C, E) and protects cells from oxidative stress."
        },
        trapVariant: {
          question: {
            fr: "Le glutathion est un pro-oxydant qui stimule la production de radicaux libres ?",
            en: "Glutathione is a pro-oxidant that stimulates free radical production?"
          },
          options: {
            fr: ["Oui, pro-oxydant cellulaire", "Non, c'est le maître antioxydant", "Oui, stimule l'oxydation", "Non, c'est une hormone"],
            en: ["Yes, cellular pro-oxidant", "No, it's the master antioxidant", "Yes, stimulates oxidation", "No, it's a hormone"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro3-2",
        question: {
          fr: "La NAD+ est essentielle pour :",
          en: "NAD+ is essential for:"
        },
        options: {
          fr: ["La production d'énergie cellulaire", "La réparation de l'ADN", "Le vieillissement cellulaire", "Toutes ces réponses"],
          en: ["Cellular energy production", "DNA repair", "Cellular aging", "All of the above"]
        },
        correctAnswer: 3,
        explanation: {
          fr: "📌 La NAD+ (nicotinamide adénine dinucléotide) est cruciale pour la production d'ATP, la réparation de l'ADN via les sirtuines, et diminue avec l'âge.",
          en: "📌 NAD+ (nicotinamide adenine dinucleotide) is crucial for ATP production, DNA repair via sirtuins, and decreases with age."
        },
        trapVariant: {
          question: {
            fr: "La NAD+ n'est utile que pour la production d'énergie, pas pour l'ADN ?",
            en: "NAD+ is only useful for energy production, not for DNA?"
          },
          options: {
            fr: ["Oui, énergie uniquement", "Non, aussi ADN et vieillissement", "Oui, juste l'ATP", "Non, que pour l'ADN"],
            en: ["Yes, energy only", "No, also DNA and aging", "Yes, just ATP", "No, only for DNA"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro3-3",
        question: {
          fr: "Quel nutriment est précurseur de la mélatonine ?",
          en: "Which nutrient is a precursor to melatonin?"
        },
        options: {
          fr: ["Tyrosine", "Tryptophane", "Phénylalanine", "Leucine"],
          en: ["Tyrosine", "Tryptophan", "Phenylalanine", "Leucine"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le tryptophane → 5-HTP → sérotonine → mélatonine. Cette chaîne de conversion explique pourquoi le tryptophane est essentiel au sommeil.",
          en: "📌 Tryptophan → 5-HTP → serotonin → melatonin. This conversion chain explains why tryptophan is essential for sleep."
        },
        trapVariant: {
          question: {
            fr: "La tyrosine est le précurseur de la mélatonine, l'hormone du sommeil ?",
            en: "Tyrosine is the precursor to melatonin, the sleep hormone?"
          },
          options: {
            fr: ["Oui, tyrosine → mélatonine", "Non, c'est le tryptophane", "Oui, via la dopamine", "Non, c'est la phénylalanine"],
            en: ["Yes, tyrosine → melatonin", "No, it's tryptophan", "Yes, via dopamine", "No, it's phenylalanine"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "micro3-4",
        question: {
          fr: "La coenzyme Q10 joue un rôle majeur dans :",
          en: "Coenzyme Q10 plays a major role in:"
        },
        options: {
          fr: ["La synthèse protéique", "La chaîne respiratoire mitochondriale", "La digestion des lipides", "La fixation du calcium"],
          en: ["Protein synthesis", "Mitochondrial respiratory chain", "Lipid digestion", "Calcium fixation"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La CoQ10 est essentielle dans la chaîne respiratoire mitochondriale pour la production d'ATP. Elle diminue avec l'âge et les statines.",
          en: "📌 CoQ10 is essential in the mitochondrial respiratory chain for ATP production. It decreases with age and statins."
        },
        trapVariant: {
          question: {
            fr: "La coenzyme Q10 aide à la digestion des lipides dans l'intestin ?",
            en: "Coenzyme Q10 helps digest lipids in the intestine?"
          },
          options: {
            fr: ["Oui, comme les sels biliaires", "Non, elle agit dans les mitochondries", "Oui, enzyme digestive", "Non, c'est pour le calcium"],
            en: ["Yes, like bile salts", "No, it acts in mitochondria", "Yes, digestive enzyme", "No, it's for calcium"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== PLANTS LEVEL 1 =====
  {
    id: "plants-1",
    level: 1,
    category: "plants",
    title: { fr: "Plantes médicinales - Niveau 1", en: "Medicinal Plants - Level 1" },
    introText: levelIntros["plants-1"],
    questions: [
      {
        id: "plant1-1",
        question: {
          fr: "Quelle plante est traditionnellement utilisée pour améliorer le sommeil ?",
          en: "Which plant is traditionally used to improve sleep?"
        },
        options: {
          fr: ["Ginseng", "Valériane", "Ginkgo", "Échinacée"],
          en: ["Ginseng", "Valerian", "Ginkgo", "Echinacea"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La valériane (Valeriana officinalis) contient des composés qui augmentent le GABA, un neurotransmetteur calmant, favorisant ainsi le sommeil.",
          en: "📌 Valerian (Valeriana officinalis) contains compounds that increase GABA, a calming neurotransmitter, thus promoting sleep."
        },
        trapVariant: {
          question: {
            fr: "Le ginseng est traditionnellement utilisé pour améliorer le sommeil ?",
            en: "Ginseng is traditionally used to improve sleep?"
          },
          options: {
            fr: ["Oui, plante relaxante", "Non, c'est la valériane", "Oui, calme le système nerveux", "Non, c'est le ginkgo"],
            en: ["Yes, relaxing plant", "No, it's valerian", "Yes, calms the nervous system", "No, it's ginkgo"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant1-2",
        question: {
          fr: "La camomille est principalement connue pour ses propriétés :",
          en: "Chamomile is mainly known for its properties:"
        },
        options: {
          fr: ["Stimulantes", "Apaisantes", "Laxatives", "Tonifiantes"],
          en: ["Stimulating", "Soothing", "Laxative", "Toning"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La camomille (Matricaria chamomilla) possède des propriétés apaisantes et anti-inflammatoires. Elle est utilisée en infusion pour calmer et faciliter la digestion.",
          en: "📌 Chamomile (Matricaria chamomilla) has soothing and anti-inflammatory properties. It is used as an infusion to calm and aid digestion."
        },
        trapVariant: {
          question: {
            fr: "La camomille est connue pour ses propriétés stimulantes et tonifiantes ?",
            en: "Chamomile is known for its stimulating and toning properties?"
          },
          options: {
            fr: ["Oui, énergisante", "Non, apaisantes", "Oui, pour le tonus", "Non, laxatives"],
            en: ["Yes, energizing", "No, soothing", "Yes, for tone", "No, laxative"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant1-3",
        question: {
          fr: "Quelle plante est souvent utilisée pour renforcer le système immunitaire ?",
          en: "Which plant is often used to boost the immune system?"
        },
        options: {
          fr: ["Lavande", "Échinacée", "Camomille", "Menthe"],
          en: ["Lavender", "Echinacea", "Chamomile", "Mint"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'échinacée (Echinacea purpurea) stimule les défenses immunitaires. Elle est souvent utilisée en prévention des infections hivernales.",
          en: "📌 Echinacea (Echinacea purpurea) stimulates immune defenses. It is often used to prevent winter infections."
        },
        trapVariant: {
          question: {
            fr: "La lavande est principalement utilisée pour renforcer le système immunitaire ?",
            en: "Lavender is mainly used to boost the immune system?"
          },
          options: {
            fr: ["Oui, immunostimulante", "Non, c'est l'échinacée", "Oui, antiseptique = immunité", "Non, c'est la menthe"],
            en: ["Yes, immunostimulant", "No, it's echinacea", "Yes, antiseptic = immunity", "No, it's mint"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant1-4",
        question: {
          fr: "Le thym est traditionnellement utilisé pour :",
          en: "Thyme is traditionally used for:"
        },
        options: {
          fr: ["Le stress", "Les troubles respiratoires", "La vue", "Les douleurs articulaires"],
          en: ["Stress", "Respiratory issues", "Vision", "Joint pain"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le thym (Thymus vulgaris) possède des propriétés antiseptiques et expectorantes. Il est utilisé pour les bronchites, toux et infections respiratoires.",
          en: "📌 Thyme (Thymus vulgaris) has antiseptic and expectorant properties. It is used for bronchitis, coughs and respiratory infections."
        },
        trapVariant: {
          question: {
            fr: "Le thym est principalement utilisé pour réduire le stress et l'anxiété ?",
            en: "Thyme is mainly used to reduce stress and anxiety?"
          },
          options: {
            fr: ["Oui, calmant naturel", "Non, pour les voies respiratoires", "Oui, relaxant", "Non, pour les articulations"],
            en: ["Yes, natural calming", "No, for respiratory tract", "Yes, relaxing", "No, for joints"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== PLANTS LEVEL 2 =====
  {
    id: "plants-2",
    level: 2,
    category: "plants",
    title: { fr: "Plantes médicinales - Niveau 2", en: "Medicinal Plants - Level 2" },
    introText: levelIntros["plants-2"],
    questions: [
      {
        id: "plant2-1",
        question: {
          fr: "Le curcuma est principalement connu pour ses propriétés :",
          en: "Turmeric is mainly known for its properties:"
        },
        options: {
          fr: ["Laxatives", "Anti-inflammatoires", "Diurétiques", "Stimulantes"],
          en: ["Laxative", "Anti-inflammatory", "Diuretic", "Stimulant"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La curcumine, principe actif du curcuma, possède de puissantes propriétés anti-inflammatoires et antioxydantes. L'absorption est améliorée par la pipérine.",
          en: "📌 Curcumin, the active ingredient in turmeric, has powerful anti-inflammatory and antioxidant properties. Absorption is improved by piperine."
        },
        trapVariant: {
          question: {
            fr: "Le curcuma est principalement un diurétique naturel ?",
            en: "Turmeric is mainly a natural diuretic?"
          },
          options: {
            fr: ["Oui, drainage naturel", "Non, anti-inflammatoire", "Oui, pour les reins", "Non, laxatif"],
            en: ["Yes, natural drainage", "No, anti-inflammatory", "Yes, for kidneys", "No, laxative"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant2-2",
        question: {
          fr: "Le ginkgo biloba est réputé pour améliorer :",
          en: "Ginkgo biloba is known to improve:"
        },
        options: {
          fr: ["La digestion", "La circulation sanguine et la mémoire", "Le sommeil", "L'appétit"],
          en: ["Digestion", "Blood circulation and memory", "Sleep", "Appetite"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le ginkgo améliore la microcirculation cérébrale, favorisant l'oxygénation du cerveau. Il est utilisé pour la mémoire et les troubles cognitifs légers.",
          en: "📌 Ginkgo improves cerebral microcirculation, promoting brain oxygenation. It is used for memory and mild cognitive disorders."
        },
        trapVariant: {
          question: {
            fr: "Le ginkgo biloba améliore principalement le sommeil ?",
            en: "Ginkgo biloba mainly improves sleep?"
          },
          options: {
            fr: ["Oui, relaxant cérébral", "Non, circulation et mémoire", "Oui, calme les pensées", "Non, c'est l'appétit"],
            en: ["Yes, brain relaxant", "No, circulation and memory", "Yes, calms thoughts", "No, it's appetite"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant2-3",
        question: {
          fr: "Quelle partie du millepertuis est utilisée en phytothérapie ?",
          en: "Which part of St. John's Wort is used in herbal medicine?"
        },
        options: {
          fr: ["Les racines", "Les sommités fleuries", "Les graines", "L'écorce"],
          en: ["The roots", "The flowering tops", "The seeds", "The bark"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Les sommités fleuries du millepertuis contiennent l'hypéricine et l'hyperforine, les principes actifs antidépresseurs de la plante.",
          en: "📌 The flowering tops of St. John's Wort contain hypericin and hyperforin, the plant's antidepressant active ingredients."
        },
        trapVariant: {
          question: {
            fr: "Les racines du millepertuis sont utilisées en phytothérapie ?",
            en: "St. John's Wort roots are used in herbal medicine?"
          },
          options: {
            fr: ["Oui, comme beaucoup de plantes", "Non, les sommités fleuries", "Oui, concentration maximale", "Non, les graines"],
            en: ["Yes, like many plants", "No, the flowering tops", "Yes, maximum concentration", "No, the seeds"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant2-4",
        question: {
          fr: "La mélisse est traditionnellement utilisée pour :",
          en: "Lemon balm is traditionally used for:"
        },
        options: {
          fr: ["Stimuler l'énergie", "Calmer l'anxiété et favoriser la digestion", "Renforcer les os", "Améliorer la vue"],
          en: ["Boost energy", "Calm anxiety and aid digestion", "Strengthen bones", "Improve vision"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 La mélisse (Melissa officinalis) a des propriétés anxiolytiques et antispasmodiques digestives. Elle est souvent associée à la valériane pour le sommeil.",
          en: "📌 Lemon balm (Melissa officinalis) has anxiolytic and digestive antispasmodic properties. It is often combined with valerian for sleep."
        },
        trapVariant: {
          question: {
            fr: "La mélisse est utilisée pour stimuler l'énergie et la concentration ?",
            en: "Lemon balm is used to boost energy and concentration?"
          },
          options: {
            fr: ["Oui, tonique naturel", "Non, anxiolytique et digestive", "Oui, comme le café", "Non, pour les os"],
            en: ["Yes, natural tonic", "No, anxiolytic and digestive", "Yes, like coffee", "No, for bones"]
          },
          correctAnswer: 1
        }
      }
    ]
  },
  // ===== PLANTS LEVEL 3 =====
  {
    id: "plants-3",
    level: 3,
    category: "plants",
    title: { fr: "Plantes médicinales - Niveau 3", en: "Medicinal Plants - Level 3" },
    introText: levelIntros["plants-3"],
    questions: [
      {
        id: "plant3-1",
        question: {
          fr: "L'ashwagandha est classée comme :",
          en: "Ashwagandha is classified as:"
        },
        options: {
          fr: ["Un stimulant", "Un adaptogène", "Un sédatif", "Un laxatif"],
          en: ["A stimulant", "An adaptogen", "A sedative", "A laxative"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 L'ashwagandha (Withania somnifera) est un adaptogène qui aide l'organisme à s'adapter au stress en régulant le cortisol.",
          en: "📌 Ashwagandha (Withania somnifera) is an adaptogen that helps the body adapt to stress by regulating cortisol."
        },
        trapVariant: {
          question: {
            fr: "L'ashwagandha est un sédatif puissant qui provoque la somnolence ?",
            en: "Ashwagandha is a powerful sedative that causes drowsiness?"
          },
          options: {
            fr: ["Oui, très sédative", "Non, c'est un adaptogène", "Oui, pour le sommeil uniquement", "Non, c'est un stimulant"],
            en: ["Yes, very sedative", "No, it's an adaptogen", "Yes, for sleep only", "No, it's a stimulant"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant3-2",
        question: {
          fr: "La berbérine, présente dans plusieurs plantes, agit sur :",
          en: "Berberine, found in several plants, acts on:"
        },
        options: {
          fr: ["Le métabolisme du glucose", "La flore intestinale", "Les lipides sanguins", "Toutes ces réponses"],
          en: ["Glucose metabolism", "Gut flora", "Blood lipids", "All of the above"]
        },
        correctAnswer: 3,
        explanation: {
          fr: "📌 La berbérine active l'AMPK, régule la glycémie, améliore le profil lipidique et module le microbiote. Elle est comparée à la metformine.",
          en: "📌 Berberine activates AMPK, regulates blood sugar, improves lipid profile and modulates the microbiome. It is compared to metformin."
        },
        trapVariant: {
          question: {
            fr: "La berbérine agit uniquement sur le métabolisme du glucose ?",
            en: "Berberine only acts on glucose metabolism?"
          },
          options: {
            fr: ["Oui, antidiabétique uniquement", "Non, glucose + lipides + microbiote", "Oui, comme la metformine", "Non, que sur les lipides"],
            en: ["Yes, antidiabetic only", "No, glucose + lipids + microbiome", "Yes, like metformin", "No, only on lipids"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant3-3",
        question: {
          fr: "Le Rhodiola rosea est particulièrement indiqué pour :",
          en: "Rhodiola rosea is particularly indicated for:"
        },
        options: {
          fr: ["Les troubles digestifs", "La fatigue et le stress", "Les problèmes de peau", "L'hypertension"],
          en: ["Digestive disorders", "Fatigue and stress", "Skin problems", "Hypertension"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le rhodiola est un adaptogène qui améliore la résistance au stress, réduit la fatigue mentale et physique, et soutient les performances cognitives.",
          en: "📌 Rhodiola is an adaptogen that improves stress resistance, reduces mental and physical fatigue, and supports cognitive performance."
        },
        trapVariant: {
          question: {
            fr: "Le Rhodiola rosea est principalement indiqué pour les troubles digestifs ?",
            en: "Rhodiola rosea is mainly indicated for digestive disorders?"
          },
          options: {
            fr: ["Oui, antispasmodique", "Non, fatigue et stress", "Oui, pour l'estomac", "Non, pour la peau"],
            en: ["Yes, antispasmodic", "No, fatigue and stress", "Yes, for stomach", "No, for skin"]
          },
          correctAnswer: 1
        }
      },
      {
        id: "plant3-4",
        question: {
          fr: "Le bacopa monnieri est traditionnellement utilisé pour :",
          en: "Bacopa monnieri is traditionally used for:"
        },
        options: {
          fr: ["Le sommeil", "La mémoire et la cognition", "La digestion", "L'immunité"],
          en: ["Sleep", "Memory and cognition", "Digestion", "Immunity"]
        },
        correctAnswer: 1,
        explanation: {
          fr: "📌 Le bacopa est utilisé en médecine ayurvédique depuis des millénaires pour améliorer la mémoire et les fonctions cognitives. Les bacosides sont ses principes actifs.",
          en: "📌 Bacopa has been used in Ayurvedic medicine for millennia to improve memory and cognitive functions. Bacosides are its active ingredients."
        },
        trapVariant: {
          question: {
            fr: "Le bacopa monnieri est principalement utilisé pour améliorer le sommeil ?",
            en: "Bacopa monnieri is mainly used to improve sleep?"
          },
          options: {
            fr: ["Oui, sédatif ayurvédique", "Non, mémoire et cognition", "Oui, relaxant cérébral", "Non, pour l'immunité"],
            en: ["Yes, Ayurvedic sedative", "No, memory and cognition", "Yes, brain relaxant", "No, for immunity"]
          },
          correctAnswer: 1
        }
      }
    ]
  }
];

// Get quiz by category and level
export const getAdvancedQuiz = (category: "biology" | "micronutrition" | "plants", level: 1 | 2 | 3): AdvancedQuizLevel | undefined => {
  return advancedQuizzes.find(q => q.category === category && q.level === level);
};

// Translations for advanced quiz
export const advancedQuizTranslations = {
  fr: {
    readIntro: "Prenez le temps de lire cette introduction",
    startQuiz: "Commencer le quiz",
    timePerQuestion: "10 secondes par question",
    questionsCount: "4 questions",
    yourMistakes: "Vos erreurs :",
    trapQuestion: "⚠️ Question piège",
    correctAnswer: "Bonne réponse",
    yourAnswer: "Votre réponse",
    timeRanOut: "Temps écoulé",
    retry: "Réessayer",
    nextLevel: "Niveau suivant",
    congratulations: "Félicitations !",
    perfectScore: "Score parfait ! 🎉",
    goodScore: "Excellent travail ! 🌟",
    keepLearning: "Continuez à apprendre ! 💪",
    score: "Score",
    backToQuizzes: "Retour aux quiz",
    level: "Niveau",
    question: "Question",
    of: "sur",
    next: "Suivant",
    seeResults: "Voir les résultats",
    correct: "Correct !",
    incorrect: "Incorrect",
    enterEmail: "Entrez votre email pour jouer",
    emailPlaceholder: "votre@email.com",
    invalidEmail: "Email invalide",
    alreadyPlayed: "Vous avez déjà participé à ce quiz avec cette adresse email."
  },
  en: {
    readIntro: "Take time to read this introduction",
    startQuiz: "Start quiz",
    timePerQuestion: "10 seconds per question",
    questionsCount: "4 questions",
    yourMistakes: "Your mistakes:",
    trapQuestion: "⚠️ Trap question",
    correctAnswer: "Correct answer",
    yourAnswer: "Your answer",
    timeRanOut: "Time ran out",
    retry: "Try again",
    nextLevel: "Next level",
    congratulations: "Congratulations!",
    perfectScore: "Perfect score! 🎉",
    goodScore: "Excellent work! 🌟",
    keepLearning: "Keep learning! 💪",
    score: "Score",
    backToQuizzes: "Back to quizzes",
    level: "Level",
    question: "Question",
    of: "of",
    next: "Next",
    seeResults: "See results",
    correct: "Correct!",
    incorrect: "Incorrect",
    enterEmail: "Enter your email to play",
    emailPlaceholder: "your@email.com",
    invalidEmail: "Invalid email",
    alreadyPlayed: "You have already participated in this quiz with this email address."
  }
};
