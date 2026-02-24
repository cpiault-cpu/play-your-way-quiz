import { Language } from "./quizData";

export type QuestionType = "single" | "multi" | "association";

export interface AntiInflammatoryQuestion {
  id: string;
  type: QuestionType;
  question: { fr: string; en: string };
  // For single choice
  options?: { fr: string[]; en: string[] };
  correctIndex?: number;
  // For multi-select
  multiOptions?: { fr: string[]; en: string[] };
  correctIndices?: number[];
  // For association
  associations?: {
    pairs: { left: string; right: string }[];
    distractors?: string[];
  };
  explanation: { fr: string; en: string };
}

export interface AntiInflammatoryLevel {
  level: number;
  title: { fr: string; en: string };
  readingTime: number;
  versions: {
    A: {
      text: { fr: string[]; en: string[] };
      questions: AntiInflammatoryQuestion[];
    };
    B: {
      text: { fr: string[]; en: string[] };
      questions: AntiInflammatoryQuestion[];
    };
  };
}

export const antiInflammatoryLevels: AntiInflammatoryLevel[] = [
  // LEVEL 1 — Fondations
  {
    level: 1,
    title: { fr: "Fondations", en: "Foundations" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "L'inflammation chronique de bas grade peut être modulée par l'alimentation.",
            "Les oméga-3 marins, les polyphénols et certains pigments végétaux participent à sa régulation.",
            "Les baies, légumes verts et petits poissons gras sont étudiés pour leurs effets protecteurs.",
            "La qualité des lipides influence fortement la réponse inflammatoire."
          ],
          en: [
            "Low-grade chronic inflammation can be modulated by diet.",
            "Marine omega-3s, polyphenols and certain plant pigments help regulate it.",
            "Berries, green vegetables and small fatty fish are studied for their protective effects.",
            "Lipid quality strongly influences the inflammatory response."
          ]
        },
        questions: [
          {
            id: "l1-q1-a",
            type: "multi",
            question: {
              fr: "Sélectionner les aliments anti-inflammatoires :",
              en: "Select the anti-inflammatory foods:"
            },
            multiOptions: {
              fr: ["🫐 Myrtilles", "🥦 Brocoli", "🐟 Sardines", "🍩 Donut", "🥬 Épinards"],
              en: ["🫐 Blueberries", "🥦 Broccoli", "🐟 Sardines", "🍩 Donut", "🥬 Spinach"]
            },
            correctIndices: [0, 1, 2, 4],
            explanation: {
              fr: "Les myrtilles, brocoli, sardines et épinards sont riches en composés anti-inflammatoires. Le donut est un aliment ultra-transformé pro-inflammatoire.",
              en: "Blueberries, broccoli, sardines and spinach are rich in anti-inflammatory compounds. The donut is a pro-inflammatory ultra-processed food."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Les oméga-3 EPA et DHA ont un rôle dans la modulation des médiateurs inflammatoires.",
            "Les aliments ultra-transformés favorisent l'inflammation.",
            "La densité nutritionnelle est prioritaire."
          ],
          en: [
            "EPA and DHA omega-3s play a role in modulating inflammatory mediators.",
            "Ultra-processed foods promote inflammation.",
            "Nutritional density is a priority."
          ]
        },
        questions: [
          {
            id: "l1-q1-b",
            type: "single",
            question: {
              fr: "Quel aliment contient des oméga-3 actifs ?",
              en: "Which food contains active omega-3s?"
            },
            options: {
              fr: ["🐟 Sardines", "🍟 Frites", "🍬 Bonbon"],
              en: ["🐟 Sardines", "🍟 Fries", "🍬 Candy"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les sardines contiennent des oméga-3 EPA et DHA directement actifs, contrairement aux aliments ultra-transformés.",
              en: "Sardines contain directly active EPA and DHA omega-3s, unlike ultra-processed foods."
            }
          }
        ]
      }
    }
  },
  // LEVEL 2 — Pigments & molécules
  {
    level: 2,
    title: { fr: "Pigments & molécules", en: "Pigments & molecules" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Les anthocyanines colorent les baies et les cerises.",
            "Le lycopène donne sa couleur rouge à la tomate.",
            "Les agrumes apportent flavonoïdes et vitamine C.",
            "La diversité pigmentaire reflète une diversité biochimique."
          ],
          en: [
            "Anthocyanins color berries and cherries.",
            "Lycopene gives tomatoes their red color.",
            "Citrus fruits provide flavonoids and vitamin C.",
            "Pigment diversity reflects biochemical diversity."
          ]
        },
        questions: [
          {
            id: "l2-q1-a",
            type: "association",
            question: {
              fr: "Associer chaque aliment à son pigment :",
              en: "Match each food to its pigment:"
            },
            associations: {
              pairs: [
                { left: "🫐", right: "Anthocyanines" },
                { left: "🍅", right: "Lycopène" }
              ]
            },
            explanation: {
              fr: "Les myrtilles contiennent des anthocyanines (pigment violet/bleu), la tomate du lycopène (pigment rouge).",
              en: "Blueberries contain anthocyanins (purple/blue pigment), tomatoes contain lycopene (red pigment)."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Certains antioxydants sont liposolubles.",
            "D'autres sont hydrosolubles.",
            "L'absorption dépend du contexte alimentaire."
          ],
          en: [
            "Some antioxidants are fat-soluble.",
            "Others are water-soluble.",
            "Absorption depends on the dietary context."
          ]
        },
        questions: [
          {
            id: "l2-q1-b",
            type: "single",
            question: {
              fr: "Le lycopène est :",
              en: "Lycopene is:"
            },
            options: {
              fr: ["Liposoluble", "Hydrosoluble", "Minéral"],
              en: ["Fat-soluble", "Water-soluble", "Mineral"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le lycopène est liposoluble, son absorption est améliorée en présence de matières grasses.",
              en: "Lycopene is fat-soluble, its absorption is improved in the presence of fats."
            }
          }
        ]
      }
    }
  },
  // LEVEL 3 — Oméga-3 & qualité
  {
    level: 3,
    title: { fr: "Oméga-3 & qualité", en: "Omega-3 & quality" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Les petits poissons gras apportent EPA et DHA.",
            "La taille du poisson influence la concentration en polluants.",
            "Le mode d'élevage modifie la composition lipidique.",
            "La fraîcheur et la cuisson douce préservent les oméga-3."
          ],
          en: [
            "Small fatty fish provide EPA and DHA.",
            "Fish size influences pollutant concentration.",
            "Farming method modifies lipid composition.",
            "Freshness and gentle cooking preserve omega-3s."
          ]
        },
        questions: [
          {
            id: "l3-q1-a",
            type: "multi",
            question: {
              fr: "Sélectionner les meilleurs choix :",
              en: "Select the best choices:"
            },
            multiOptions: {
              fr: ["🐟 Sardines", "🐟 Maquereau", "🐟 Anchois", "🐟 Saumon d'élevage intensif"],
              en: ["🐟 Sardines", "🐟 Mackerel", "🐟 Anchovies", "🐟 Intensively farmed salmon"]
            },
            correctIndices: [0, 1, 2],
            explanation: {
              fr: "Les sardines, maquereaux et anchois sont de petits poissons gras moins exposés aux polluants. Le saumon d'élevage intensif a une composition lipidique altérée.",
              en: "Sardines, mackerel and anchovies are small fatty fish less exposed to pollutants. Intensively farmed salmon has altered lipid composition."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La qualité des oméga-3 dépend de plusieurs facteurs environnementaux.",
            "Le mode d'élevage est un facteur clé de la composition lipidique.",
            "La couleur de la chair ne prédit pas la teneur en oméga-3."
          ],
          en: [
            "The quality of omega-3s depends on several environmental factors.",
            "Farming method is a key factor in lipid composition.",
            "Flesh color does not predict omega-3 content."
          ]
        },
        questions: [
          {
            id: "l3-q1-b",
            type: "single",
            question: {
              fr: "Quel facteur influence la qualité des oméga-3 ?",
              en: "Which factor influences omega-3 quality?"
            },
            options: {
              fr: ["Mode d'élevage", "Couleur de la chair", "Taille du filet"],
              en: ["Farming method", "Flesh color", "Fillet size"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le mode d'élevage influence directement la composition en oméga-3 des poissons.",
              en: "The farming method directly influences the omega-3 composition of fish."
            }
          }
        ]
      }
    }
  },
  // LEVEL 4 — Épices & biodisponibilité
  {
    level: 4,
    title: { fr: "Épices & biodisponibilité", en: "Spices & bioavailability" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "La curcumine est peu biodisponible seule.",
            "La pipérine du poivre noir améliore son absorption.",
            "Le gingembre et la cannelle possèdent des propriétés modulatrices.",
            "Les herbes aromatiques concentrent des composés bioactifs."
          ],
          en: [
            "Curcumin has low bioavailability on its own.",
            "Piperine from black pepper improves its absorption.",
            "Ginger and cinnamon have modulatory properties.",
            "Aromatic herbs concentrate bioactive compounds."
          ]
        },
        questions: [
          {
            id: "l4-q1-a",
            type: "single",
            question: {
              fr: "Qu'est-ce qui optimise l'absorption du curcuma ?",
              en: "What optimizes turmeric absorption?"
            },
            options: {
              fr: ["🍎 Pomme", "🍋 Citron", "⚫ Poivre noir"],
              en: ["🍎 Apple", "🍋 Lemon", "⚫ Black pepper"]
            },
            correctIndex: 2,
            explanation: {
              fr: "La pipérine du poivre noir multiplie l'absorption de la curcumine par un facteur significatif.",
              en: "Piperine from black pepper multiplies curcumin absorption by a significant factor."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La curcumine est un composé liposoluble.",
            "Sa biodisponibilité dépend de son association avec d'autres molécules.",
            "Seule, elle est très peu absorbée par l'organisme."
          ],
          en: [
            "Curcumin is a fat-soluble compound.",
            "Its bioavailability depends on its combination with other molecules.",
            "Alone, it is very poorly absorbed by the body."
          ]
        },
        questions: [
          {
            id: "l4-q1-b",
            type: "single",
            question: {
              fr: "La curcumine est :",
              en: "Curcumin is:"
            },
            options: {
              fr: ["Liposoluble", "Hydrosoluble", "Hydratante"],
              en: ["Fat-soluble", "Water-soluble", "Moisturizing"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La curcumine est liposoluble, c'est pourquoi son absorption est favorisée par les graisses et la pipérine.",
              en: "Curcumin is fat-soluble, which is why its absorption is enhanced by fats and piperine."
            }
          }
        ]
      }
    }
  },
  // LEVEL 5 — Synergie systémique
  {
    level: 5,
    title: { fr: "Synergie systémique", en: "Systemic synergy" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Les crucifères soutiennent certaines enzymes de détoxification.",
            "Les légumes-feuilles apportent magnésium et antioxydants.",
            "Les fibres nourrissent le microbiote.",
            "La synergie alimentaire prime sur l'aliment isolé."
          ],
          en: [
            "Cruciferous vegetables support certain detoxification enzymes.",
            "Leafy greens provide magnesium and antioxidants.",
            "Fiber feeds the microbiota.",
            "Dietary synergy takes precedence over individual foods."
          ]
        },
        questions: [
          {
            id: "l5-q1-a",
            type: "single",
            question: {
              fr: "Quelle combinaison est cohérente ?",
              en: "Which combination is coherent?"
            },
            options: {
              fr: ["Épinards + Brocoli + Myrtilles", "Pain blanc + Soda", "Dessert + Sucre"],
              en: ["Spinach + Broccoli + Blueberries", "White bread + Soda", "Dessert + Sugar"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La combinaison épinards + brocoli + myrtilles associe crucifères, feuilles vertes et baies, illustrant la synergie alimentaire anti-inflammatoire.",
              en: "The spinach + broccoli + blueberries combination associates cruciferous vegetables, leafy greens and berries, illustrating anti-inflammatory dietary synergy."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Le microbiote intestinal est nourri par les fibres alimentaires.",
            "Un microbiote diversifié contribue à la régulation de l'inflammation.",
            "Les prébiotiques se trouvent dans les légumes, fruits et céréales complètes."
          ],
          en: [
            "The gut microbiota is nourished by dietary fiber.",
            "A diverse microbiota contributes to inflammation regulation.",
            "Prebiotics are found in vegetables, fruits and whole grains."
          ]
        },
        questions: [
          {
            id: "l5-q1-b",
            type: "single",
            question: {
              fr: "Qu'est-ce qui nourrit le microbiote ?",
              en: "What feeds the microbiota?"
            },
            options: {
              fr: ["Les fibres alimentaires", "Les édulcorants", "Les graisses saturées"],
              en: ["Dietary fiber", "Sweeteners", "Saturated fats"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les fibres alimentaires sont le carburant principal du microbiote intestinal, favorisant sa diversité et la régulation inflammatoire.",
              en: "Dietary fiber is the main fuel for the gut microbiota, promoting its diversity and inflammatory regulation."
            }
          }
        ]
      }
    }
  },
  // LEVEL 6 — Maîtrise globale
  {
    level: 6,
    title: { fr: "Maîtrise globale", en: "Global mastery" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Une alimentation anti-inflammatoire repose sur :",
            "diversité végétale, oméga-3 marins, épices fonctionnelles,",
            "qualité des lipides et limitation des produits ultra-transformés.",
            "La constance prévaut sur la perfection."
          ],
          en: [
            "An anti-inflammatory diet is based on:",
            "plant diversity, marine omega-3s, functional spices,",
            "lipid quality and limiting ultra-processed products.",
            "Consistency prevails over perfection."
          ]
        },
        questions: [
          {
            id: "l6-q1-a",
            type: "single",
            question: {
              fr: "Combien de familles protectrices ont été abordées ?",
              en: "How many protective families have been covered?"
            },
            options: {
              fr: ["3", "5", "8+"],
              en: ["3", "5", "8+"]
            },
            correctIndex: 2,
            explanation: {
              fr: "Au fil des 6 niveaux, nous avons abordé : baies, légumes verts, poissons gras, épinards, crucifères, épices (curcuma, poivre, gingembre, cannelle), herbes aromatiques, fibres/prébiotiques, et plus encore.",
              en: "Through the 6 levels, we covered: berries, green vegetables, fatty fish, spinach, cruciferous vegetables, spices (turmeric, pepper, ginger, cinnamon), aromatic herbs, fiber/prebiotics, and more."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La diversité alimentaire est la clé d'une alimentation anti-inflammatoire.",
            "Aucun aliment seul ne suffit : c'est l'ensemble qui compte.",
            "La régularité des bons choix est plus importante que la perfection occasionnelle."
          ],
          en: [
            "Dietary diversity is the key to an anti-inflammatory diet.",
            "No single food is enough: it's the whole picture that matters.",
            "Regular good choices are more important than occasional perfection."
          ]
        },
        questions: [
          {
            id: "l6-q1-b",
            type: "single",
            question: {
              fr: "Qu'est-ce qui prévaut dans une alimentation anti-inflammatoire ?",
              en: "What prevails in an anti-inflammatory diet?"
            },
            options: {
              fr: ["La constance", "La perfection", "Les compléments"],
              en: ["Consistency", "Perfection", "Supplements"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La constance dans les bons choix alimentaires prévaut sur la perfection. C'est la régularité qui fait la différence.",
              en: "Consistency in good food choices prevails over perfection. It's regularity that makes the difference."
            }
          }
        ]
      }
    }
  }
];

export const antiInflammatoryUiTexts = {
  back: { fr: "Retour", en: "Back" },
  start: { fr: "Commencer", en: "Start" },
  readingPhase: { fr: "📖 Lisez et mémorisez", en: "📖 Read and memorize" },
  readingTimer: { fr: "Temps de lecture", en: "Reading time" },
  questionPhase: { fr: "Question", en: "Question" },
  validate: { fr: "Valider", en: "Validate" },
  correct: { fr: "Correct !", en: "Correct!" },
  incorrect: { fr: "Pas tout à fait...", en: "Not quite..." },
  perfectLevel: { fr: "Niveau validé ! 🎉", en: "Level validated! 🎉" },
  retryMessage: { fr: "Un niveau correctif va vous aider à consolider ce point.", en: "A corrective level will help you consolidate this point." },
  nextLevel: { fr: "Niveau suivant", en: "Next level" },
  retry: { fr: "Niveau correctif", en: "Corrective level" },
  finalTitle: { fr: "🧠 Votre assiette est désormais une alliée puissante", en: "🧠 Your plate is now a powerful ally" },
  finalMessage: { fr: "pour apaiser votre corps et booster votre énergie. Mais gardez en tête que la nutrition est un univers de nuances :\n\nUn aliment peut être parfait pour l'un et moins adapté pour l'autre.\n\nCertains ingrédients se révèlent plus bénéfiques crus, d'autres cuits (et vice versa !).\n\nVotre terrain unique (digestion, métabolisme, sensibilité) fait toute la différence.\n\nIl n'existe pas de recette magique universelle – seulement des pistes à explorer et à personnaliser.\n\n👉 Un·e naturopathe saura vous guider pour affiner ces subtilités et créer votre équilibre sur mesure.", en: "to soothe your body and boost your energy. But keep in mind that nutrition is a world of nuances:\n\nA food can be perfect for one person and less suited for another.\n\nSome ingredients are more beneficial raw, others cooked (and vice versa!).\n\nYour unique profile (digestion, metabolism, sensitivity) makes all the difference.\n\nThere is no universal magic recipe – only paths to explore and personalize.\n\n👉 A naturopath can guide you to refine these subtleties and create your tailored balance." },
  selectAll: { fr: "Sélectionnez toutes les bonnes réponses", en: "Select all correct answers" },
  matchItems: { fr: "Associez chaque élément", en: "Match each item" },
  levelProgress: { fr: "Niveau", en: "Level" },
  errorCount0: { fr: "Parfait ! Progression directe.", en: "Perfect! Direct progression." },
  errorCount1: { fr: "Presque ! Un point à consolider.", en: "Almost! One point to consolidate." },
  errorCount2: { fr: "Niveau correctif renforcé nécessaire.", en: "Reinforced corrective level needed." },
};
