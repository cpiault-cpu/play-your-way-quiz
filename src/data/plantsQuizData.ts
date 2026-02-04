import { Language } from "./quizData";

export interface PlantsQuestion {
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
  explanation: {
    fr: string;
    en: string;
  };
  confusionHint: {
    fr: string;
    en: string;
  };
}

export interface PlantsLevel {
  level: 1 | 2 | 3;
  title: {
    fr: string;
    en: string;
  };
  versions: {
    A: {
      text: {
        fr: string[];
        en: string[];
      };
      questions: PlantsQuestion[];
    };
    B: {
      text: {
        fr: string[];
        en: string[];
      };
      questions: PlantsQuestion[];
    };
  };
}

export const plantsLevels: PlantsLevel[] = [
  {
    level: 1,
    title: {
      fr: "Fondations",
      en: "Foundations"
    },
    versions: {
      A: {
        text: {
          fr: [
            "La camomille est connue pour ses propriétés apaisantes, notamment grâce à l'apigénine, un flavonoïde qui agit sur le système nerveux.",
            "Le gingembre, riche en gingérol, est utilisé pour soulager les nausées et l'inflammation.",
            "La menthe poivrée contient du menthol, qui facilite la digestion.",
            "Ces plantes sont utilisées depuis des siècles en médecine traditionnelle."
          ],
          en: [
            "Chamomile is known for its soothing properties, notably thanks to apigenin, a flavonoid that acts on the nervous system.",
            "Ginger, rich in gingerol, is used to relieve nausea and inflammation.",
            "Peppermint contains menthol, which aids digestion.",
            "These plants have been used for centuries in traditional medicine."
          ]
        },
        questions: [
          {
            id: "pl-l1-q1-a",
            question: {
              fr: "La camomille agit surtout sur :",
              en: "Chamomile mainly acts on:"
            },
            options: {
              fr: ["La circulation", "Le stress", "La toux"],
              en: ["Circulation", "Stress", "Cough"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'apigénine de la camomille agit sur le système nerveux pour réduire le stress.",
              en: "Chamomile's apigenin acts on the nervous system to reduce stress."
            },
            confusionHint: {
              fr: "La camomille est réputée pour ses effets calmants, pas pour la circulation.",
              en: "Chamomile is known for its calming effects, not for circulation."
            }
          },
          {
            id: "pl-l1-q2-a",
            question: {
              fr: "Le gingérol est un composé actif du :",
              en: "Gingerol is an active compound of:"
            },
            options: {
              fr: ["Thym", "Gingembre", "Romarin"],
              en: ["Thyme", "Ginger", "Rosemary"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le gingérol est bien le principe actif du gingembre, utilisé contre les nausées.",
              en: "Gingerol is indeed the active ingredient in ginger, used against nausea."
            },
            confusionHint: {
              fr: "Le nom 'gingérol' vient directement du mot 'gingembre'.",
              en: "The name 'gingerol' comes directly from the word 'ginger'."
            }
          },
          {
            id: "pl-l1-q3-a",
            question: {
              fr: "Le menthol est présent dans :",
              en: "Menthol is found in:"
            },
            options: {
              fr: ["La lavande", "La menthe poivrée", "L'ail"],
              en: ["Lavender", "Peppermint", "Garlic"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le menthol est le composé principal de la menthe poivrée.",
              en: "Menthol is the main compound in peppermint."
            },
            confusionHint: {
              fr: "Le menthol tire son nom de la menthe dont il est extrait.",
              en: "Menthol gets its name from mint, from which it is extracted."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "L'apigénine de la camomille réduit l'anxiété en agissant sur les récepteurs GABA.",
            "Le gingembre, anti-inflammatoire, est efficace contre les maux d'estomac grâce au gingérol.",
            "La menthe poivrée, grâce au menthol, détend les muscles digestifs et soulage les ballonnements."
          ],
          en: [
            "Chamomile's apigenin reduces anxiety by acting on GABA receptors.",
            "Ginger, an anti-inflammatory, is effective against stomach ailments thanks to gingerol.",
            "Peppermint, thanks to menthol, relaxes digestive muscles and relieves bloating."
          ]
        },
        questions: [
          {
            id: "pl-l1-q1-b",
            question: {
              fr: "L'apigénine est un composé de la :",
              en: "Apigenin is a compound of:"
            },
            options: {
              fr: ["Sauge", "Camomille", "Valériane"],
              en: ["Sage", "Chamomile", "Valerian"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'apigénine est le flavonoïde principal de la camomille.",
              en: "Apigenin is the main flavonoid in chamomile."
            },
            confusionHint: {
              fr: "L'apigénine donne à la camomille ses propriétés calmantes.",
              en: "Apigenin gives chamomile its calming properties."
            }
          },
          {
            id: "pl-l1-q2-b",
            question: {
              fr: "Le gingembre est souvent utilisé pour :",
              en: "Ginger is often used to:"
            },
            options: {
              fr: ["Stimuler l'appétit", "Calmer les nausées", "Soigner les brûlures"],
              en: ["Stimulate appetite", "Calm nausea", "Heal burns"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le gingérol du gingembre est reconnu pour ses effets anti-nauséeux.",
              en: "Ginger's gingerol is recognized for its anti-nausea effects."
            },
            confusionHint: {
              fr: "Le gingembre est traditionnellement utilisé contre le mal des transports.",
              en: "Ginger is traditionally used against motion sickness."
            }
          },
          {
            id: "pl-l1-q3-b",
            question: {
              fr: "Le menthol détend principalement :",
              en: "Menthol mainly relaxes:"
            },
            options: {
              fr: ["Les articulations", "Les muscles digestifs", "Les poumons"],
              en: ["Joints", "Digestive muscles", "Lungs"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le menthol de la menthe poivrée a un effet relaxant sur le système digestif.",
              en: "Peppermint's menthol has a relaxing effect on the digestive system."
            },
            confusionHint: {
              fr: "La menthe poivrée est connue pour faciliter la digestion.",
              en: "Peppermint is known for aiding digestion."
            }
          }
        ]
      }
    }
  },
  {
    level: 2,
    title: {
      fr: "Consolidation",
      en: "Consolidation"
    },
    versions: {
      A: {
        text: {
          fr: [
            "Le curcuma, avec sa curcumine, est un puissant anti-inflammatoire utilisé depuis des millénaires.",
            "L'aloe vera, riche en polysaccharides, accélère la cicatrisation et hydrate la peau.",
            "L'échinacée stimule le système immunitaire grâce à ses alkylamides."
          ],
          en: [
            "Turmeric, with its curcumin, is a powerful anti-inflammatory used for millennia.",
            "Aloe vera, rich in polysaccharides, accelerates healing and moisturizes the skin.",
            "Echinacea stimulates the immune system thanks to its alkylamides."
          ]
        },
        questions: [
          {
            id: "pl-l2-q1-a",
            question: {
              fr: "La curcumine est le principe actif du :",
              en: "Curcumin is the active ingredient in:"
            },
            options: {
              fr: ["Ginseng", "Curcuma", "Basilic"],
              en: ["Ginseng", "Turmeric", "Basil"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La curcumine donne au curcuma sa couleur jaune et ses propriétés anti-inflammatoires.",
              en: "Curcumin gives turmeric its yellow color and anti-inflammatory properties."
            },
            confusionHint: {
              fr: "La curcumine tire son nom du curcuma dont elle est extraite.",
              en: "Curcumin gets its name from turmeric, from which it is extracted."
            }
          },
          {
            id: "pl-l2-q2-a",
            question: {
              fr: "L'aloe vera est surtout utilisé pour :",
              en: "Aloe vera is mainly used for:"
            },
            options: {
              fr: ["La digestion", "La cicatrisation", "Le sommeil"],
              en: ["Digestion", "Healing", "Sleep"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les polysaccharides de l'aloe vera favorisent la régénération cutanée.",
              en: "Aloe vera's polysaccharides promote skin regeneration."
            },
            confusionHint: {
              fr: "L'aloe vera est très utilisé en cosmétique pour ses vertus cicatrisantes.",
              en: "Aloe vera is widely used in cosmetics for its healing properties."
            }
          },
          {
            id: "pl-l2-q3-a",
            question: {
              fr: "L'échinacée renforce :",
              en: "Echinacea strengthens:"
            },
            options: {
              fr: ["Les os", "L'immunité", "La mémoire"],
              en: ["Bones", "Immunity", "Memory"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les alkylamides de l'échinacée stimulent les défenses immunitaires.",
              en: "Echinacea's alkylamides stimulate immune defenses."
            },
            confusionHint: {
              fr: "L'échinacée ne cible pas les os, mais elle stimule les défenses immunitaires.",
              en: "Echinacea doesn't target bones, but it stimulates immune defenses."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La curcumine du curcuma est un anti-inflammatoire naturel qui agit sur plusieurs voies métaboliques.",
            "L'aloe vera contient des polysaccharides qui hydratent et réparent les tissus cutanés.",
            "L'échinacée, grâce à ses alkylamides, active les cellules immunitaires comme les macrophages."
          ],
          en: [
            "Turmeric's curcumin is a natural anti-inflammatory that acts on several metabolic pathways.",
            "Aloe vera contains polysaccharides that hydrate and repair skin tissues.",
            "Echinacea, thanks to its alkylamides, activates immune cells like macrophages."
          ]
        },
        questions: [
          {
            id: "pl-l2-q1-b",
            question: {
              fr: "Le curcuma est connu pour ses propriétés :",
              en: "Turmeric is known for its properties:"
            },
            options: {
              fr: ["Stimulantes", "Anti-inflammatoires", "Sédatives"],
              en: ["Stimulating", "Anti-inflammatory", "Sedative"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La curcumine confère au curcuma de puissantes propriétés anti-inflammatoires.",
              en: "Curcumin gives turmeric powerful anti-inflammatory properties."
            },
            confusionHint: {
              fr: "Le curcuma est utilisé depuis des siècles pour réduire l'inflammation.",
              en: "Turmeric has been used for centuries to reduce inflammation."
            }
          },
          {
            id: "pl-l2-q2-b",
            question: {
              fr: "Les polysaccharides de l'aloe vera :",
              en: "Aloe vera polysaccharides:"
            },
            options: {
              fr: ["Stimulent le foie", "Réparent la peau", "Calment les nerfs"],
              en: ["Stimulate the liver", "Repair skin", "Calm nerves"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les polysaccharides favorisent l'hydratation et la régénération cutanée.",
              en: "Polysaccharides promote hydration and skin regeneration."
            },
            confusionHint: {
              fr: "L'aloe vera est surtout connu pour ses bienfaits sur la peau.",
              en: "Aloe vera is mainly known for its skin benefits."
            }
          },
          {
            id: "pl-l2-q3-b",
            question: {
              fr: "L'échinacée active les :",
              en: "Echinacea activates:"
            },
            options: {
              fr: ["Neurones", "Cellules immunitaires", "Muscles"],
              en: ["Neurons", "Immune cells", "Muscles"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'échinacée stimule les macrophages et autres cellules de défense.",
              en: "Echinacea stimulates macrophages and other defense cells."
            },
            confusionHint: {
              fr: "L'échinacée est traditionnellement utilisée pour prévenir les rhumes.",
              en: "Echinacea is traditionally used to prevent colds."
            }
          }
        ]
      }
    }
  },
  {
    level: 3,
    title: {
      fr: "Maîtrise",
      en: "Mastery"
    },
    versions: {
      A: {
        text: {
          fr: [
            "La valériane, grâce à ses valépotriates, améliore la qualité du sommeil en agissant sur les récepteurs GABA.",
            "Le millepertuis, avec son hyperforine, est utilisé contre la dépression légère en modulant la sérotonine.",
            "L'arnica, appliqué en pommade, réduit les ecchymoses et les douleurs musculaires."
          ],
          en: [
            "Valerian, thanks to its valepotriates, improves sleep quality by acting on GABA receptors.",
            "St. John's wort, with its hyperforin, is used against mild depression by modulating serotonin.",
            "Arnica, applied as an ointment, reduces bruises and muscle pain."
          ]
        },
        questions: [
          {
            id: "pl-l3-q1-a",
            question: {
              fr: "La valériane est connue pour :",
              en: "Valerian is known for:"
            },
            options: {
              fr: ["La concentration", "Le sommeil", "La digestion"],
              en: ["Concentration", "Sleep", "Digestion"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les valépotriates de la valériane favorisent un sommeil réparateur.",
              en: "Valerian's valepotriates promote restful sleep."
            },
            confusionHint: {
              fr: "La valériane est l'une des plantes les plus utilisées contre l'insomnie.",
              en: "Valerian is one of the most used plants against insomnia."
            }
          },
          {
            id: "pl-l3-q2-a",
            question: {
              fr: "Le millepertuis agit sur :",
              en: "St. John's wort acts on:"
            },
            options: {
              fr: ["La tension", "L'humeur", "L'appétit"],
              en: ["Blood pressure", "Mood", "Appetite"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'hyperforine du millepertuis module la sérotonine et améliore l'humeur.",
              en: "St. John's wort's hyperforin modulates serotonin and improves mood."
            },
            confusionHint: {
              fr: "Le millepertuis est parfois appelé 'antidépresseur naturel'.",
              en: "St. John's wort is sometimes called a 'natural antidepressant'."
            }
          },
          {
            id: "pl-l3-q3-a",
            question: {
              fr: "L'arnica est utilisé en :",
              en: "Arnica is used in:"
            },
            options: {
              fr: ["Infusion", "Application cutanée", "Gélule"],
              en: ["Infusion", "Skin application", "Capsule"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'arnica s'applique en pommade sur les contusions et douleurs musculaires.",
              en: "Arnica is applied as an ointment on bruises and muscle pain."
            },
            confusionHint: {
              fr: "L'arnica est principalement utilisé en usage externe, pas en ingestion.",
              en: "Arnica is mainly used externally, not ingested."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Les valépotriates de la valériane prolongent le sommeil profond en agissant sur le système GABAergique.",
            "L'hyperforine du millepertuis régule la sérotonine et la dopamine, améliorant l'équilibre émotionnel.",
            "L'arnica, en usage externe uniquement, soulage les douleurs musculaires et accélère la résorption des hématomes."
          ],
          en: [
            "Valerian's valepotriates prolong deep sleep by acting on the GABAergic system.",
            "St. John's wort's hyperforin regulates serotonin and dopamine, improving emotional balance.",
            "Arnica, for external use only, relieves muscle pain and accelerates bruise resorption."
          ]
        },
        questions: [
          {
            id: "pl-l3-q1-b",
            question: {
              fr: "Les valépotriates agissent sur le système :",
              en: "Valepotriates act on the system:"
            },
            options: {
              fr: ["Digestif", "GABAergique", "Cardio-vasculaire"],
              en: ["Digestive", "GABAergic", "Cardiovascular"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les valépotriates modulent les récepteurs GABA, favorisant la relaxation.",
              en: "Valepotriates modulate GABA receptors, promoting relaxation."
            },
            confusionHint: {
              fr: "Le système GABA est impliqué dans la régulation du sommeil et de l'anxiété.",
              en: "The GABA system is involved in regulating sleep and anxiety."
            }
          },
          {
            id: "pl-l3-q2-b",
            question: {
              fr: "L'hyperforine régule notamment :",
              en: "Hyperforin particularly regulates:"
            },
            options: {
              fr: ["L'insuline", "La sérotonine", "L'adrénaline"],
              en: ["Insulin", "Serotonin", "Adrenaline"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'hyperforine agit sur la sérotonine, neurotransmetteur de l'humeur.",
              en: "Hyperforin acts on serotonin, the mood neurotransmitter."
            },
            confusionHint: {
              fr: "La sérotonine est souvent appelée 'hormone du bonheur'.",
              en: "Serotonin is often called the 'happiness hormone'."
            }
          },
          {
            id: "pl-l3-q3-b",
            question: {
              fr: "L'arnica accélère la résorption des :",
              en: "Arnica accelerates the resorption of:"
            },
            options: {
              fr: ["Inflammations", "Hématomes", "Infections"],
              en: ["Inflammations", "Bruises", "Infections"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'arnica est particulièrement efficace sur les bleus et ecchymoses.",
              en: "Arnica is particularly effective on bruises and contusions."
            },
            confusionHint: {
              fr: "L'arnica est traditionnellement utilisé après les chocs et traumatismes.",
              en: "Arnica is traditionally used after shocks and trauma."
            }
          }
        ]
      }
    }
  }
];

export const plantsSuccessMessages = {
  levelComplete: {
    fr: "🌿 Excellent ! Votre mémoire des plantes s'affine.\nPrêt à aller plus loin ?",
    en: "🌿 Excellent! Your plant memory is sharpening.\nReady to go further?"
  },
  finalComplete: {
    fr: "🌿 Niveau expert atteint !\nVotre cerveau maîtrise désormais les plantes médicinales et leurs usages.",
    en: "🌿 Expert level reached!\nYour brain now masters medicinal plants and their uses."
  },
  tryAgain: {
    fr: "Relisez attentivement le texte reformulé pour mieux ancrer ces informations.",
    en: "Read the reformulated text carefully to better anchor this information."
  }
};

export const plantsUiTexts = {
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
  }
};
