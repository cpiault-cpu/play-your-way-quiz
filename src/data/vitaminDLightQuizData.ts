import { Language } from "./quizData";

export interface VitaminDLightQuestion {
  id: string;
  question: {
    fr: string;
    en: string;
  };
  options: {
    fr: string[];
    en: string[];
  };
  correctIndex: number;
  feedback: {
    success: {
      fr: string;
      en: string;
    };
    error: {
      fr: string;
      en: string;
    };
    correction: {
      fr: string;
      en: string;
    };
  };
}

export interface VitaminDLightLevel {
  level: 1 | 2 | 3 | 4;
  title: {
    fr: string;
    en: string;
  };
  emoji: string;
  color: string;
  text: {
    fr: string;
    en: string;
  };
  question: VitaminDLightQuestion;
  sources: {
    title: string;
    link: string;
    description: {
      fr: string;
      en: string;
    };
  }[];
}

export const vitaminDLightLevels: VitaminDLightLevel[] = [
  {
    level: 1,
    title: {
      fr: "Circadien & lumière",
      en: "Circadian & Light"
    },
    emoji: "🟢",
    color: "#4CAF50",
    text: {
      fr: "L'exposition à une lumière vive tôt le matin influence notre horloge biologique : elle supprime la mélatonine nocturne et induit une élévation aiguë du cortisol au réveil. Cela aide à synchroniser les rythmes hormonaux circadiens pour l'éveil et la vigilance.",
      en: "Exposure to bright light early in the morning influences our biological clock: it suppresses nocturnal melatonin and induces an acute elevation of cortisol upon waking. This helps synchronize circadian hormonal rhythms for alertness and vigilance."
    },
    question: {
      id: "vdl-l1-q1",
      question: {
        fr: "Quel effet immédiat la lumière du matin a-t-elle sur les hormones ?",
        en: "What immediate effect does morning light have on hormones?"
      },
      options: {
        fr: ["↑ Mélatonine", "↑ Cortisol", "↓ Cortisol"],
        en: ["↑ Melatonin", "↑ Cortisol", "↓ Cortisol"]
      },
      correctIndex: 1,
      feedback: {
        success: {
          fr: "🎉 Bravo ! Vous venez d'aligner votre horloge interne.",
          en: "🎉 Bravo! You've just aligned your internal clock."
        },
        error: {
          fr: "Non : ce n'est pas l'obscurité qui alimente l'éveil — c'est la lumière qui synchronise vos cycles hormonaux.",
          en: "No: it's not darkness that fuels wakefulness — it's light that synchronizes your hormonal cycles."
        },
        correction: {
          fr: "La lumière matinale agit comme un signal « réveil » : la production de mélatonine diminue tandis que le cortisol augmente pour favoriser l'éveil.",
          en: "Morning light acts as a 'wake-up' signal: melatonin production decreases while cortisol increases to promote wakefulness."
        }
      }
    },
    sources: [
      {
        title: "Transition from dim to bright light in the morning induces an immediate elevation of cortisol levels",
        link: "https://pubmed.ncbi.nlm.nih.gov/11231993/",
        description: {
          fr: "Montre qu'un passage de lumière faible à vive le matin supprime la mélatonine et élève le cortisol.",
          en: "Shows that a transition from dim to bright light in the morning suppresses melatonin and elevates cortisol."
        }
      }
    ]
  },
  {
    level: 2,
    title: {
      fr: "Cholestérol & Vitamine D",
      en: "Cholesterol & Vitamin D"
    },
    emoji: "🟠",
    color: "#FF9800",
    text: {
      fr: "La vitamine D est synthétisée dans la peau à partir du 7-déhydrocholestérol, un précurseur aussi impliqué dans la synthèse du cholestérol. Sous l'action des UVB, ce précurseur forme la pré-vitamine D3, qui devient ensuite vitamine D3 active.",
      en: "Vitamin D is synthesized in the skin from 7-dehydrocholesterol, a precursor also involved in cholesterol synthesis. Under UVB action, this precursor forms pre-vitamin D3, which then becomes active vitamin D3."
    },
    question: {
      id: "vdl-l2-q1",
      question: {
        fr: "La vitamine D est produite à partir de :",
        en: "Vitamin D is produced from:"
      },
      options: {
        fr: ["Glucose", "7-déhydrocholestérol (précurseur du cholestérol)", "Acides aminés"],
        en: ["Glucose", "7-dehydrocholesterol (cholesterol precursor)", "Amino acids"]
      },
      correctIndex: 1,
      feedback: {
        success: {
          fr: "☀️ Et hop ! Vous venez d'encoder un lien biochimique essentiel.",
          en: "☀️ And there! You've just encoded an essential biochemical link."
        },
        error: {
          fr: "Ce n'est pas une vitamine fabriquée à partir du sucre — c'est une hormone solaire !",
          en: "It's not a vitamin made from sugar — it's a solar hormone!"
        },
        correction: {
          fr: "Exact : le même précurseur du cholestérol est photosensible — exposé aux UVB, il se transforme en vitamine D.",
          en: "Exactly: the same cholesterol precursor is photosensitive — exposed to UVB, it transforms into vitamin D."
        }
      }
    },
    sources: [
      {
        title: "Vitamin D3 production pathway",
        link: "https://www.ncbi.nlm.nih.gov/books/NBK532266/",
        description: {
          fr: "Décrit la conversion du 7-déhydrocholestérol en vitamine D sous UVB.",
          en: "Describes the conversion of 7-dehydrocholesterol to vitamin D under UVB."
        }
      }
    ]
  },
  {
    level: 3,
    title: {
      fr: "Cortisol & Thyroïde",
      en: "Cortisol & Thyroid"
    },
    emoji: "🔵",
    color: "#2196F3",
    text: {
      fr: "Un excès prolongé de cortisol peut inhiber la sécrétion de TRH et TSH, et réduire la conversion périphérique de thyroxine (T4) en triiodothyronine (T3), ce qui peut donner un profil hormono-thyroïdien plus bas.",
      en: "Prolonged excess cortisol can inhibit TRH and TSH secretion, and reduce the peripheral conversion of thyroxine (T4) to triiodothyronine (T3), which can result in a lower thyroid hormone profile."
    },
    question: {
      id: "vdl-l3-q1",
      question: {
        fr: "Un cortisol chronique élevé peut :",
        en: "High chronic cortisol can:"
      },
      options: {
        fr: ["↑ Conversion de T4 → T3", "↓ Conversion de T4 → T3", "Ne jamais influencer la thyroïde"],
        en: ["↑ T4 → T3 conversion", "↓ T4 → T3 conversion", "Never influence the thyroid"]
      },
      correctIndex: 1,
      feedback: {
        success: {
          fr: "🧠 Exact ! Vous commencez à lire entre les axes endocriniens.",
          en: "🧠 Exactly! You're starting to read between the endocrine axes."
        },
        error: {
          fr: "Ce n'est pas que « ça n'a aucun effet » — le cortisol interfère avec les signaux régulateurs de la thyroïde.",
          en: "It's not that 'it has no effect' — cortisol interferes with thyroid regulatory signals."
        },
        correction: {
          fr: "Le cortisol interagit avec l'axe thyroïdien, diminuant la conversion active T4 → T3.",
          en: "Cortisol interacts with the thyroid axis, decreasing active T4 → T3 conversion."
        }
      }
    },
    sources: [
      {
        title: "Physiology, Cortisol – StatPearls",
        link: "https://www.ncbi.nlm.nih.gov/books/NBK538239/",
        description: {
          fr: "Cortisol et son impact sur la fonction thyroïdienne (conversion T4 → T3).",
          en: "Cortisol and its impact on thyroid function (T4 → T3 conversion)."
        }
      }
    ]
  },
  {
    level: 4,
    title: {
      fr: "Intégration endocrinienne",
      en: "Endocrine Integration"
    },
    emoji: "🟣",
    color: "#9C27B0",
    text: {
      fr: "La thyroïde produit T4 et T3, des hormones clés du métabolisme énergétique. L'axe hypothalamo-hypophysaire coordonne de nombreuses hormones ensemble : thyroïde, cortisol, insuline et autres s'influencent mutuellement dans un réseau intégré.",
      en: "The thyroid produces T4 and T3, key hormones of energy metabolism. The hypothalamic-pituitary axis coordinates many hormones together: thyroid, cortisol, insulin and others mutually influence each other in an integrated network."
    },
    question: {
      id: "vdl-l4-q1",
      question: {
        fr: "Les hormones thyroïdiennes influencent principalement :",
        en: "Thyroid hormones primarily influence:"
      },
      options: {
        fr: ["Le métabolisme énergétique", "Seulement l'humeur", "Uniquement la circulation"],
        en: ["Energy metabolism", "Only mood", "Only circulation"]
      },
      correctIndex: 0,
      feedback: {
        success: {
          fr: "👏 Impressionnant ! Vous voyez l'endocrinologie comme un orchestre, pas une partition isolée.",
          en: "👏 Impressive! You see endocrinology as an orchestra, not an isolated score."
        },
        error: {
          fr: "La thyroïde ne se limite pas à un seul rôle — elle régule l'énergie de tout le corps.",
          en: "The thyroid is not limited to one role — it regulates energy throughout the body."
        },
        correction: {
          fr: "Correct : T3 et T4 modulent l'énergie, la thermogenèse et interagissent avec d'autres axes hormonaux.",
          en: "Correct: T3 and T4 modulate energy, thermogenesis and interact with other hormonal axes."
        }
      }
    },
    sources: [
      {
        title: "Hypothalamus-pituitary-thyroid axis interactions",
        link: "https://www.ncbi.nlm.nih.gov/books/NBK279388/",
        description: {
          fr: "Explique les interactions entre les axes hormonaux hypothalamo-hypophysaires.",
          en: "Explains the interactions between hypothalamic-pituitary hormonal axes."
        }
      }
    ]
  }
];

export const vitaminDLightSuccessMessages = {
  levelComplete: {
    fr: "Prêt à aller plus loin ?",
    en: "Ready to go further?"
  },
  finalComplete: {
    fr: "Votre compréhension des rythmes hormonaux et du rôle de la lumière est solide — continuons vers de nouvelles découvertes !",
    en: "Your understanding of hormonal rhythms and the role of light is solid — let's continue toward new discoveries!"
  },
  tryAgain: {
    fr: "Pour renforcer l'ancrage logique, relisez ce texte enrichi.",
    en: "To reinforce logical anchoring, reread this enriched text."
  }
};

export const vitaminDLightUiTexts = {
  back: {
    fr: "Retour",
    en: "Back"
  },
  start: {
    fr: "Commencer",
    en: "Start"
  },
  validate: {
    fr: "Valider",
    en: "Validate"
  },
  retry: {
    fr: "Recommencer",
    en: "Try Again"
  },
  nextLevel: {
    fr: "Niveau suivant",
    en: "Next Level"
  },
  readingPhase: {
    fr: "📖 Lisez attentivement",
    en: "📖 Read carefully"
  },
  questionPhase: {
    fr: "Question",
    en: "Question"
  },
  corrections: {
    fr: "Points à retenir",
    en: "Key takeaways"
  },
  readingTimer: {
    fr: "Temps de lecture",
    en: "Reading time"
  },
  answerTimer: {
    fr: "Temps pour répondre",
    en: "Time to answer"
  },
  waitForTimer: {
    fr: "Attendez la fin du chrono...",
    en: "Wait for the timer..."
  },
  scientificSources: {
    fr: "Sources scientifiques",
    en: "Scientific sources"
  }
};
