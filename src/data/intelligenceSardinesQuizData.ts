import { Language } from "@/data/quizData";

export interface IntelligenceSardinesQuestion {
  question: {
    fr: string;
    en: string;
  };
  options: {
    fr: string[];
    en: string[];
  };
  correctIndex: number;
  feedbackCorrect: {
    fr: string;
    en: string;
  };
  feedbackIncorrect: {
    fr: string;
    en: string;
  };
}

export interface IntelligenceSardinesLevel {
  level: 1 | 2 | 3 | 4 | 5;
  title: {
    fr: string;
    en: string;
  };
  subtitle: {
    fr: string;
    en: string;
  };
  color: string;
  readingTime: number; // seconds
  text: {
    fr: string[];
    en: string[];
  };
  question: IntelligenceSardinesQuestion;
}

export const intelligenceSardinesLevels: IntelligenceSardinesLevel[] = [
  {
    level: 1,
    title: {
      fr: "Intelligence d'observation",
      en: "Observation Intelligence"
    },
    subtitle: {
      fr: "Niveau 1",
      en: "Level 1"
    },
    color: "#98FB98", // Vert menthe
    readingTime: 12,
    text: {
      fr: [
        "La sardine pêchée en été contient davantage de lipides, donc plus d'oméga-3.",
        "Une cuisson douce protège ces acides gras sensibles à la chaleur.",
        "L'huile d'olive limite leur oxydation.",
        "La vitamine E agit comme un bouclier antioxydant."
      ],
      en: [
        "Sardines caught in summer contain more lipids, therefore more omega-3.",
        "Gentle cooking protects these heat-sensitive fatty acids.",
        "Olive oil limits their oxidation.",
        "Vitamin E acts as an antioxidant shield."
      ]
    },
    question: {
      question: {
        fr: "Quelle combinaison protège LE MIEUX les oméga-3 ?",
        en: "Which combination BEST protects omega-3s?"
      },
      options: {
        fr: ["Friture + huile neutre", "Cuisson douce + huile d'olive", "Haute température + vitamine C"],
        en: ["Frying + neutral oil", "Gentle cooking + olive oil", "High temperature + vitamin C"]
      },
      correctIndex: 1,
      feedbackCorrect: {
        fr: "✅ Votre cerveau vient de faire une intégration rapide — un marqueur classique d'efficacité cognitive.",
        en: "✅ Your brain just made a quick integration — a classic marker of cognitive efficiency."
      },
      feedbackIncorrect: {
        fr: "❌ Attention, les oméga-3 craignent la chaleur excessive. Réessayez.",
        en: "❌ Be careful, omega-3s fear excessive heat. Try again."
      }
    }
  },
  {
    level: 2,
    title: {
      fr: "Déduction biologique",
      en: "Biological Deduction"
    },
    subtitle: {
      fr: "Niveau 2",
      en: "Level 2"
    },
    color: "#FF7F50", // Orange corail
    readingTime: 12,
    text: {
      fr: [
        "Les sardines apportent EPA et DHA dans un ratio souvent proche de l'équilibre.",
        "L'EPA participe à la régulation de l'inflammation.",
        "Le DHA soutient les membranes neuronales.",
        "Les vitamines du groupe B facilitent le métabolisme lipidique."
      ],
      en: [
        "Sardines provide EPA and DHA in a ratio often close to balance.",
        "EPA participates in inflammation regulation.",
        "DHA supports neuronal membranes.",
        "B vitamins facilitate lipid metabolism."
      ]
    },
    question: {
      question: {
        fr: "Si un aliment favorise la structure des neurones, quel acide gras est le plus directement impliqué ?",
        en: "If a food supports neuron structure, which fatty acid is most directly involved?"
      },
      options: {
        fr: ["EPA", "DHA", "Oméga-6"],
        en: ["EPA", "DHA", "Omega-6"]
      },
      correctIndex: 1,
      feedbackCorrect: {
        fr: "✅ Vous ne vous êtes pas contenté de mémoriser — vous avez hiérarchisé l'information. Le cerveau adore ça.",
        en: "✅ You didn't just memorize — you prioritized the information. The brain loves that."
      },
      feedbackIncorrect: {
        fr: "❌ Le DHA est la brique des neurones. Relisez et réessayez.",
        en: "❌ DHA is the building block of neurons. Reread and try again."
      }
    }
  },
  {
    level: 3,
    title: {
      fr: "Piège conceptuel",
      en: "Conceptual Trap"
    },
    subtitle: {
      fr: "Niveau 3",
      en: "Level 3"
    },
    color: "#5F9EA0", // Bleu canard
    readingTime: 12,
    text: {
      fr: [
        "Une sardine estivale est plus dense sur le plan nutritionnel.",
        "Consommées avec leurs arêtes, elles fournissent du calcium biodisponible.",
        "Elles apportent aussi vitamine D, protéines complètes et sélénium."
      ],
      en: [
        "A summer sardine is more nutritionally dense.",
        "Eaten with their bones, they provide bioavailable calcium.",
        "They also provide vitamin D, complete proteins and selenium."
      ]
    },
    question: {
      question: {
        fr: "Quelle conclusion est la PLUS logique ?",
        en: "Which conclusion is the MOST logical?"
      },
      options: {
        fr: [
          "Les sardines remplacent tous les aliments",
          "Leur petite taille limite leur intérêt nutritionnel",
          "Leur densité nutritionnelle est élevée malgré leur taille"
        ],
        en: [
          "Sardines replace all foods",
          "Their small size limits their nutritional value",
          "Their nutritional density is high despite their size"
        ]
      },
      correctIndex: 2,
      feedbackCorrect: {
        fr: "✅ Raisonnement proportionnel détecté. C'est une signature des esprits analytiques.",
        en: "✅ Proportional reasoning detected. This is a signature of analytical minds."
      },
      feedbackIncorrect: {
        fr: "❌ La taille ne détermine pas la valeur nutritionnelle. Réfléchissez encore.",
        en: "❌ Size doesn't determine nutritional value. Think again."
      }
    }
  },
  {
    level: 4,
    title: {
      fr: "Charge cognitive élevée",
      en: "High Cognitive Load"
    },
    subtitle: {
      fr: "Niveau 4",
      en: "Level 4"
    },
    color: "#DDA0DD", // Violet clair
    readingTime: 15,
    text: {
      fr: [
        "L'excès d'huiles riches en oméga-6 peut favoriser un terrain inflammatoire.",
        "Les oméga-3 exercent généralement un effet régulateur.",
        "L'équilibre entre ces acides gras influence les réponses physiologiques."
      ],
      en: [
        "Excess oils rich in omega-6 can promote an inflammatory environment.",
        "Omega-3s generally exert a regulatory effect.",
        "The balance between these fatty acids influences physiological responses."
      ]
    },
    question: {
      question: {
        fr: "Quel scénario semble le plus favorable ?",
        en: "Which scenario seems most favorable?"
      },
      options: {
        fr: [
          "Beaucoup d'oméga-6, très peu d'oméga-3",
          "Un équilibre entre oméga-3 et oméga-6",
          "Supprimer totalement les lipides"
        ],
        en: [
          "Lots of omega-6, very little omega-3",
          "A balance between omega-3 and omega-6",
          "Completely eliminate lipids"
        ]
      },
      correctIndex: 1,
      feedbackCorrect: {
        fr: "✅ Votre cerveau vient d'éviter un faux extrême — excellent indicateur de maturité cognitive.",
        en: "✅ Your brain just avoided a false extreme — excellent indicator of cognitive maturity."
      },
      feedbackIncorrect: {
        fr: "❌ L'équilibre est clé. Relisez les indices.",
        en: "❌ Balance is key. Reread the clues."
      }
    }
  },
  {
    level: 5,
    title: {
      fr: "Illusion d'expertise",
      en: "Illusion of Expertise"
    },
    subtitle: {
      fr: "Niveau 5",
      en: "Level 5"
    },
    color: "#8B0000", // Rouge bordeaux
    readingTime: 15,
    text: {
      fr: [
        "Les nutriments agissent rarement seuls : antioxydants, acides gras et vitamines fonctionnent en réseau.",
        "La qualité d'un aliment dépend autant de sa composition que de sa préparation."
      ],
      en: [
        "Nutrients rarely act alone: antioxidants, fatty acids and vitamins work as a network.",
        "The quality of a food depends as much on its composition as on its preparation."
      ]
    },
    question: {
      question: {
        fr: "Quelle phrase résume le mieux ce principe ?",
        en: "Which sentence best summarizes this principle?"
      },
      options: {
        fr: [
          "Seul le nutriment principal compte",
          "La synergie nutritionnelle influence les effets",
          "La cuisson ne change rien"
        ],
        en: [
          "Only the main nutrient matters",
          "Nutritional synergy influences effects",
          "Cooking doesn't change anything"
        ]
      },
      correctIndex: 1,
      feedbackCorrect: {
        fr: "✅ Vous venez d'utiliser une pensée systémique — compétence typique des profils experts.",
        en: "✅ You just used systems thinking — a typical skill of expert profiles."
      },
      feedbackIncorrect: {
        fr: "❌ Pensez réseau, pas élément isolé. Réessayez.",
        en: "❌ Think network, not isolated element. Try again."
      }
    }
  }
];

export const uiTexts = {
  quizTitle: {
    fr: "Intelligence Nutritionnelle : Les Sardines",
    en: "Nutritional Intelligence: Sardines"
  },
  buttonText: {
    fr: "Défiez votre cerveau",
    en: "Challenge your brain"
  },
  emailPrompt: {
    fr: "Entrez votre e-mail pour jouer et recevoir vos résultats",
    en: "Enter your email to play and receive your results"
  },
  start: {
    fr: "Commencer",
    en: "Start"
  },
  back: {
    fr: "Retour",
    en: "Back"
  },
  validate: {
    fr: "Valider",
    en: "Validate"
  },
  next: {
    fr: "Niveau suivant",
    en: "Next level"
  },
  retry: {
    fr: "Réessayer",
    en: "Try again"
  },
  readingPhase: {
    fr: "Mémorisez ces informations",
    en: "Memorize this information"
  },
  readingTimer: {
    fr: "Temps de lecture",
    en: "Reading time"
  },
  finalMessage: {
    fr: "Votre cerveau ne s'est pas contenté de répondre — il a établi des connexions. C'est exactement ainsi que progresse l'intelligence.",
    en: "Your brain didn't just answer — it made connections. This is exactly how intelligence progresses."
  },
  clarityGauge: {
    fr: "Indice de clarté mentale",
    en: "Mental clarity index"
  },
  replay: {
    fr: "Rejouer",
    en: "Replay"
  },
  share: {
    fr: "Partager mon score",
    en: "Share my score"
  },
  discover: {
    fr: "Découvrir d'autres défis",
    en: "Discover other challenges"
  }
};

export const successRates = {
  1: 70,
  2: 70,
  3: 65,
  4: 60,
  5: 60
};
