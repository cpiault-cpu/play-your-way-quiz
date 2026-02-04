import { Language } from "./quizData";

export interface VitaminDQuestion {
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

export interface VitaminDLevel {
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
      questions: VitaminDQuestion[];
    };
    B: {
      text: {
        fr: string[];
        en: string[];
      };
      questions: VitaminDQuestion[];
    };
  };
}

export const vitaminDLevels: VitaminDLevel[] = [
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
            "La vitamine D agit comme une hormone et est synthétisée par la peau sous l'effet des UVB.",
            "Elle favorise l'absorption du calcium, renforce les os et soutient l'immunité.",
            "En hiver, sa production naturelle chute, ce qui peut entraîner fatigue et fragilité osseuse.",
            "Les poissons gras et les jaunes d'œufs en sont les principales sources alimentaires."
          ],
          en: [
            "Vitamin D acts as a hormone and is synthesized by the skin under the effect of UVB rays.",
            "It promotes calcium absorption, strengthens bones and supports immunity.",
            "In winter, its natural production drops, which can lead to fatigue and bone fragility.",
            "Fatty fish and egg yolks are the main dietary sources."
          ]
        },
        questions: [
          {
            id: "vd-l1-q1-a",
            question: {
              fr: "La vitamine D est principalement synthétisée grâce à :",
              en: "Vitamin D is mainly synthesized through:"
            },
            options: {
              fr: ["L'alimentation", "Le soleil", "Les compléments alimentaires", "L'exercice physique"],
              en: ["Diet", "Sunlight", "Dietary supplements", "Physical exercise"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le soleil est la source majeure de vitamine D (80% des apports).",
              en: "Sunlight is the main source of vitamin D (80% of intake)."
            },
            confusionHint: {
              fr: "Attention : la vitamine D est synthétisée par la peau grâce aux UVB du soleil.",
              en: "Note: Vitamin D is synthesized by the skin through UVB rays from the sun."
            }
          },
          {
            id: "vd-l1-q2-a",
            question: {
              fr: "Son rôle principal concerne :",
              en: "Its main role concerns:"
            },
            options: {
              fr: ["La digestion", "L'absorption du calcium", "La production d'énergie", "La régulation du sommeil"],
              en: ["Digestion", "Calcium absorption", "Energy production", "Sleep regulation"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La vitamine D favorise l'absorption du calcium et renforce les os.",
              en: "Vitamin D promotes calcium absorption and strengthens bones."
            },
            confusionHint: {
              fr: "La vitamine D n'est pas liée à la digestion, mais à l'absorption du calcium et à la solidité osseuse.",
              en: "Vitamin D is not related to digestion, but to calcium absorption and bone strength."
            }
          },
          {
            id: "vd-l1-q3-a",
            question: {
              fr: "Une carence en vitamine D peut provoquer :",
              en: "A vitamin D deficiency can cause:"
            },
            options: {
              fr: ["Une meilleure résistance aux infections", "Une fatigue chronique", "Une augmentation de la masse musculaire", "Une amélioration de la mémoire"],
              en: ["Better resistance to infections", "Chronic fatigue", "Increased muscle mass", "Improved memory"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Une carence en vitamine D entraîne fatigue et fragilité osseuse.",
              en: "Vitamin D deficiency leads to fatigue and bone fragility."
            },
            confusionHint: {
              fr: "La carence en vitamine D affaiblit l'organisme, elle ne le renforce pas.",
              en: "Vitamin D deficiency weakens the body, it does not strengthen it."
            }
          },
          {
            id: "vd-l1-q4-a",
            question: {
              fr: "En hiver, la synthèse de vitamine D est réduite à cause :",
              en: "In winter, vitamin D synthesis is reduced because of:"
            },
            options: {
              fr: ["Du manque de poissons gras", "De la baisse des UVB", "De l'excès de compléments", "De l'augmentation des températures"],
              en: ["Lack of fatty fish", "Decrease in UVB rays", "Excess supplements", "Temperature increase"]
            },
            correctIndex: 1,
            explanation: {
              fr: "En hiver, les UVB du soleil sont moins présents, réduisant la synthèse cutanée.",
              en: "In winter, UVB rays from the sun are less present, reducing skin synthesis."
            },
            confusionHint: {
              fr: "La synthèse dépend des UVB solaires, pas de l'alimentation en hiver.",
              en: "Synthesis depends on solar UVB, not diet in winter."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La vitamine D, produite sous l'effet des UVB, est essentielle pour fixer le calcium sur les os et moduler l'immunité.",
            "Les carences, fréquentes en hiver, se manifestent par une fatigue persistante et des douleurs osseuses.",
            "Les aliments comme le saumon ou le foie de morue en contiennent, mais en quantité limitée.",
            "C'est pourquoi l'exposition solaire reste la principale source de cette vitamine."
          ],
          en: [
            "Vitamin D, produced under the effect of UVB, is essential for fixing calcium on bones and modulating immunity.",
            "Deficiencies, frequent in winter, manifest as persistent fatigue and bone pain.",
            "Foods like salmon or cod liver contain it, but in limited quantities.",
            "This is why sun exposure remains the main source of this vitamin."
          ]
        },
        questions: [
          {
            id: "vd-l1-q1-b",
            question: {
              fr: "La vitamine D est qualifiée d'hormone car elle :",
              en: "Vitamin D is called a hormone because it:"
            },
            options: {
              fr: ["Se stocke dans les muscles", "Est produite par le corps", "Est éliminée rapidement", "Agit uniquement sur la peau"],
              en: ["Is stored in muscles", "Is produced by the body", "Is quickly eliminated", "Acts only on the skin"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La vitamine D est produite par le corps (la peau) sous l'effet du soleil, comme une hormone.",
              en: "Vitamin D is produced by the body (skin) under sunlight, like a hormone."
            },
            confusionHint: {
              fr: "Une hormone est produite par l'organisme, c'est le cas de la vitamine D.",
              en: "A hormone is produced by the body, as is the case with vitamin D."
            }
          },
          {
            id: "vd-l1-q2-b",
            question: {
              fr: "Son déficit peut ralentir :",
              en: "Its deficiency can slow down:"
            },
            options: {
              fr: ["La cicatrisation", "La croissance des cheveux", "La production de globules rouges", "La digestion des lipides"],
              en: ["Healing", "Hair growth", "Red blood cell production", "Fat digestion"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La vitamine D influence la cicatrisation via son rôle immunitaire et cellulaire.",
              en: "Vitamin D influences healing through its immune and cellular role."
            },
            confusionHint: {
              fr: "La vitamine D soutient l'immunité et la régénération cellulaire, donc la cicatrisation.",
              en: "Vitamin D supports immunity and cell regeneration, hence healing."
            }
          },
          {
            id: "vd-l1-q3-b",
            question: {
              fr: "Les carences en vitamine D sont fréquentes :",
              en: "Vitamin D deficiencies are frequent:"
            },
            options: {
              fr: ["En été", "En hiver", "Toute l'année", "Uniquement chez les sportifs"],
              en: ["In summer", "In winter", "All year round", "Only in athletes"]
            },
            correctIndex: 1,
            explanation: {
              fr: "En hiver, le manque d'UVB solaires réduit la production de vitamine D.",
              en: "In winter, the lack of solar UVB reduces vitamin D production."
            },
            confusionHint: {
              fr: "L'hiver est la période critique car l'ensoleillement est insuffisant.",
              en: "Winter is the critical period because sunlight is insufficient."
            }
          },
          {
            id: "vd-l1-q4-b",
            question: {
              fr: "La principale source de vitamine D est :",
              en: "The main source of vitamin D is:"
            },
            options: {
              fr: ["Les légumes verts", "L'exposition solaire", "Les produits laitiers", "Les céréales"],
              en: ["Green vegetables", "Sun exposure", "Dairy products", "Cereals"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'exposition solaire reste la principale source de vitamine D (80% des apports).",
              en: "Sun exposure remains the main source of vitamin D (80% of intake)."
            },
            confusionHint: {
              fr: "Les aliments apportent peu de vitamine D comparé au soleil.",
              en: "Foods provide little vitamin D compared to sunlight."
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
            "Le calcitriol, forme active de la vitamine D, régule plus de 200 gènes, dont ceux impliqués dans l'immunité.",
            "Une supplémentation est souvent recommandée en hiver, mais un excès peut être toxique.",
            "Les personnes à peau foncée synthétisent moins de vitamine D, car la mélanine bloque partiellement les UVB.",
            "Le dosage sanguin de la 25(OH)D permet d'évaluer les réserves de l'organisme."
          ],
          en: [
            "Calcitriol, the active form of vitamin D, regulates over 200 genes, including those involved in immunity.",
            "Supplementation is often recommended in winter, but excess can be toxic.",
            "People with dark skin synthesize less vitamin D because melanin partially blocks UVB.",
            "Blood testing of 25(OH)D allows evaluation of the body's reserves."
          ]
        },
        questions: [
          {
            id: "vd-l2-q1-a",
            question: {
              fr: "Le calcitriol est :",
              en: "Calcitriol is:"
            },
            options: {
              fr: ["Un minéral", "La forme active de la vitamine D", "Un acide aminé", "Une protéine"],
              en: ["A mineral", "The active form of vitamin D", "An amino acid", "A protein"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcitriol est la forme active de la vitamine D produite par les reins.",
              en: "Calcitriol is the active form of vitamin D produced by the kidneys."
            },
            confusionHint: {
              fr: "Le calcitriol n'est pas un minéral, c'est la vitamine D activée.",
              en: "Calcitriol is not a mineral, it's activated vitamin D."
            }
          },
          {
            id: "vd-l2-q2-a",
            question: {
              fr: "Un excès de vitamine D peut entraîner :",
              en: "Excess vitamin D can cause:"
            },
            options: {
              fr: ["Une meilleure absorption du calcium", "Une hypercalcémie", "Une carence en fer", "Une augmentation des défenses immunitaires"],
              en: ["Better calcium absorption", "Hypercalcemia", "Iron deficiency", "Increased immune defenses"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Un excès de vitamine D peut provoquer une hypercalcémie (trop de calcium dans le sang).",
              en: "Excess vitamin D can cause hypercalcemia (too much calcium in the blood)."
            },
            confusionHint: {
              fr: "Trop de vitamine D = trop de calcium absorbé = hypercalcémie toxique.",
              en: "Too much vitamin D = too much calcium absorbed = toxic hypercalcemia."
            }
          },
          {
            id: "vd-l2-q3-a",
            question: {
              fr: "Les personnes à peau foncée synthétisent moins de vitamine D car :",
              en: "People with dark skin synthesize less vitamin D because:"
            },
            options: {
              fr: ["Elles mangent différemment", "La mélanine bloque les UVB", "Elles ont moins de récepteurs", "Le climat les affecte plus"],
              en: ["They eat differently", "Melanin blocks UVB", "They have fewer receptors", "Climate affects them more"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La mélanine, pigment protecteur, filtre une partie des UVB nécessaires à la synthèse.",
              en: "Melanin, a protective pigment, filters some of the UVB needed for synthesis."
            },
            confusionHint: {
              fr: "C'est un mécanisme biologique lié à la mélanine, pas à l'alimentation.",
              en: "It's a biological mechanism related to melanin, not diet."
            }
          },
          {
            id: "vd-l2-q4-a",
            question: {
              fr: "Le calcitriol régule :",
              en: "Calcitriol regulates:"
            },
            options: {
              fr: ["Uniquement le calcium", "Plus de 200 gènes", "La température corporelle", "Le rythme cardiaque"],
              en: ["Only calcium", "Over 200 genes", "Body temperature", "Heart rate"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcitriol influence l'expression de plus de 200 gènes, bien au-delà du calcium.",
              en: "Calcitriol influences the expression of over 200 genes, far beyond calcium."
            },
            confusionHint: {
              fr: "La vitamine D a des effets génétiques très larges, pas seulement sur le calcium.",
              en: "Vitamin D has very broad genetic effects, not just on calcium."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La vitamine D active (calcitriol) agit sur plus de 200 gènes et module la réponse immunitaire.",
            "Les peaux foncées, riches en mélanine, nécessitent plus d'exposition solaire pour produire assez de vitamine D.",
            "Une supplémentation excessive peut provoquer une accumulation de calcium dangereuse (hypercalcémie).",
            "Le marqueur sanguin 25(OH)D est l'indicateur de référence pour mesurer le statut en vitamine D."
          ],
          en: [
            "Active vitamin D (calcitriol) acts on over 200 genes and modulates the immune response.",
            "Dark skin, rich in melanin, requires more sun exposure to produce enough vitamin D.",
            "Excessive supplementation can cause dangerous calcium accumulation (hypercalcemia).",
            "The blood marker 25(OH)D is the reference indicator for measuring vitamin D status."
          ]
        },
        questions: [
          {
            id: "vd-l2-q1-b",
            question: {
              fr: "Le calcitriol module notamment :",
              en: "Calcitriol particularly modulates:"
            },
            options: {
              fr: ["La digestion", "La réponse immunitaire", "La vision nocturne", "La production de sueur"],
              en: ["Digestion", "Immune response", "Night vision", "Sweat production"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcitriol joue un rôle clé dans la modulation de l'immunité.",
              en: "Calcitriol plays a key role in modulating immunity."
            },
            confusionHint: {
              fr: "La vitamine D active influence l'immunité, pas la digestion.",
              en: "Active vitamin D influences immunity, not digestion."
            }
          },
          {
            id: "vd-l2-q2-b",
            question: {
              fr: "Une supplémentation excessive peut provoquer :",
              en: "Excessive supplementation can cause:"
            },
            options: {
              fr: ["Une carence en fer", "Une hypercalcémie", "Une perte de poids", "Une amélioration de la vue"],
              en: ["Iron deficiency", "Hypercalcemia", "Weight loss", "Improved vision"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Trop de vitamine D entraîne une absorption excessive de calcium (hypercalcémie).",
              en: "Too much vitamin D leads to excessive calcium absorption (hypercalcemia)."
            },
            confusionHint: {
              fr: "L'excès de vitamine D est dangereux car il perturbe le métabolisme du calcium.",
              en: "Excess vitamin D is dangerous because it disrupts calcium metabolism."
            }
          },
          {
            id: "vd-l2-q3-b",
            question: {
              fr: "Le marqueur sanguin de référence pour la vitamine D est :",
              en: "The reference blood marker for vitamin D is:"
            },
            options: {
              fr: ["Le calcitriol", "La 25(OH)D", "Le calcium total", "La PTH"],
              en: ["Calcitriol", "25(OH)D", "Total calcium", "PTH"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La 25(OH)D est le marqueur de référence pour évaluer les réserves en vitamine D.",
              en: "25(OH)D is the reference marker for assessing vitamin D reserves."
            },
            confusionHint: {
              fr: "On dose la 25(OH)D, pas le calcitriol, pour mesurer le statut vitaminique.",
              en: "25(OH)D is measured, not calcitriol, to assess vitamin status."
            }
          },
          {
            id: "vd-l2-q4-b",
            question: {
              fr: "Les peaux riches en mélanine :",
              en: "Skin rich in melanin:"
            },
            options: {
              fr: ["Produisent plus de vitamine D", "Nécessitent plus d'exposition solaire", "Sont insensibles aux UVB", "N'ont pas besoin de vitamine D"],
              en: ["Produce more vitamin D", "Require more sun exposure", "Are insensitive to UVB", "Don't need vitamin D"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La mélanine filtre les UVB, donc plus d'exposition est nécessaire.",
              en: "Melanin filters UVB, so more exposure is needed."
            },
            confusionHint: {
              fr: "La mélanine protège mais réduit aussi la synthèse de vitamine D.",
              en: "Melanin protects but also reduces vitamin D synthesis."
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
            "La vitamine D module l'expression génétique, influence la contraction musculaire et réduit les risques de chutes chez les seniors.",
            "Sa forme stockée dans le foie (25(OH)D) permet d'évaluer les réserves.",
            "Les apports recommandés varient selon l'âge et l'exposition solaire, généralement entre 800 et 2000 UI/jour.",
            "Un taux optimal de vitamine D est associé à une meilleure fonction musculaire et un risque réduit de fractures."
          ],
          en: [
            "Vitamin D modulates gene expression, influences muscle contraction and reduces fall risk in seniors.",
            "Its form stored in the liver (25(OH)D) allows evaluation of reserves.",
            "Recommended intakes vary according to age and sun exposure, generally between 800 and 2000 IU/day.",
            "Optimal vitamin D levels are associated with better muscle function and reduced fracture risk."
          ]
        },
        questions: [
          {
            id: "vd-l3-q1-a",
            question: {
              fr: "La 25(OH)D sert à évaluer :",
              en: "25(OH)D is used to evaluate:"
            },
            options: {
              fr: ["L'absorption intestinale", "Les réserves en vitamine D", "La fonction rénale", "Le métabolisme des graisses"],
              en: ["Intestinal absorption", "Vitamin D reserves", "Kidney function", "Fat metabolism"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La 25(OH)D est le marqueur de référence pour mesurer les réserves de vitamine D.",
              en: "25(OH)D is the reference marker for measuring vitamin D reserves."
            },
            confusionHint: {
              fr: "La 25(OH)D reflète les réserves hépatiques, pas l'absorption intestinale.",
              en: "25(OH)D reflects liver stores, not intestinal absorption."
            }
          },
          {
            id: "vd-l3-q2-a",
            question: {
              fr: "Un taux optimal de vitamine D réduit le risque de :",
              en: "Optimal vitamin D levels reduce the risk of:"
            },
            options: {
              fr: ["Surpoids", "Chutes chez les seniors", "Allergies alimentaires", "Troubles digestifs"],
              en: ["Overweight", "Falls in seniors", "Food allergies", "Digestive disorders"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La vitamine D influence la fonction musculaire et réduit le risque de chutes chez les seniors.",
              en: "Vitamin D influences muscle function and reduces fall risk in seniors."
            },
            confusionHint: {
              fr: "La vitamine D agit sur les muscles, pas sur le système digestif.",
              en: "Vitamin D acts on muscles, not on the digestive system."
            }
          },
          {
            id: "vd-l3-q3-a",
            question: {
              fr: "Les apports recommandés en vitamine D sont généralement :",
              en: "Recommended vitamin D intakes are generally:"
            },
            options: {
              fr: ["100 à 200 UI/jour", "800 à 2000 UI/jour", "5000 à 10000 UI/jour", "Identiques pour tous"],
              en: ["100 to 200 IU/day", "800 to 2000 IU/day", "5000 to 10000 IU/day", "Same for everyone"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les recommandations sont généralement de 800 à 2000 UI/jour selon l'âge et l'exposition.",
              en: "Recommendations are generally 800 to 2000 IU/day depending on age and exposure."
            },
            confusionHint: {
              fr: "Les besoins varient mais restent dans une fourchette raisonnable.",
              en: "Needs vary but remain within a reasonable range."
            }
          },
          {
            id: "vd-l3-q4-a",
            question: {
              fr: "La vitamine D influence :",
              en: "Vitamin D influences:"
            },
            options: {
              fr: ["Uniquement les os", "La contraction musculaire et l'expression génétique", "La production de mélanine", "La circulation sanguine"],
              en: ["Only bones", "Muscle contraction and gene expression", "Melanin production", "Blood circulation"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La vitamine D agit sur les muscles, les gènes et bien d'autres fonctions.",
              en: "Vitamin D acts on muscles, genes and many other functions."
            },
            confusionHint: {
              fr: "La vitamine D a des effets bien plus larges que sur les os seuls.",
              en: "Vitamin D has much broader effects than just on bones."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La vitamine D, liposoluble, se mesure via la 25(OH)D stockée dans le foie.",
            "Elle agit sur les muscles, les os et le système immunitaire avec plus de 200 gènes cibles.",
            "Les apports conseillés (800 à 2000 UI/jour) dépendent de l'ensoleillement et de l'alimentation.",
            "Chez les seniors, un bon statut en vitamine D améliore l'équilibre et réduit les fractures."
          ],
          en: [
            "Vitamin D, fat-soluble, is measured via 25(OH)D stored in the liver.",
            "It acts on muscles, bones and the immune system with over 200 target genes.",
            "Recommended intakes (800 to 2000 IU/day) depend on sunlight and diet.",
            "In seniors, good vitamin D status improves balance and reduces fractures."
          ]
        },
        questions: [
          {
            id: "vd-l3-q1-b",
            question: {
              fr: "La vitamine D est dite liposoluble car elle :",
              en: "Vitamin D is called fat-soluble because it:"
            },
            options: {
              fr: ["Se dissout dans l'eau", "Se stocke dans les graisses", "Est éliminée rapidement", "Agit sur les lipides"],
              en: ["Dissolves in water", "Is stored in fat", "Is quickly eliminated", "Acts on lipids"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Une vitamine liposoluble se stocke dans les tissus graisseux.",
              en: "A fat-soluble vitamin is stored in fatty tissues."
            },
            confusionHint: {
              fr: "Liposoluble = soluble dans les graisses, donc stockée dans les tissus adipeux.",
              en: "Fat-soluble = soluble in fats, therefore stored in adipose tissues."
            }
          },
          {
            id: "vd-l3-q2-b",
            question: {
              fr: "Chez les seniors, un bon statut en vitamine D :",
              en: "In seniors, good vitamin D status:"
            },
            options: {
              fr: ["Augmente l'appétit", "Améliore l'équilibre", "Accélère le métabolisme", "Renforce la vue"],
              en: ["Increases appetite", "Improves balance", "Speeds up metabolism", "Strengthens vision"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La vitamine D améliore la fonction musculaire et donc l'équilibre chez les seniors.",
              en: "Vitamin D improves muscle function and therefore balance in seniors."
            },
            confusionHint: {
              fr: "L'équilibre dépend de la fonction musculaire, influencée par la vitamine D.",
              en: "Balance depends on muscle function, influenced by vitamin D."
            }
          },
          {
            id: "vd-l3-q3-b",
            question: {
              fr: "La vitamine D cible plus de :",
              en: "Vitamin D targets more than:"
            },
            options: {
              fr: ["10 gènes", "50 gènes", "200 gènes", "1000 gènes"],
              en: ["10 genes", "50 genes", "200 genes", "1000 genes"]
            },
            correctIndex: 2,
            explanation: {
              fr: "Le calcitriol régule l'expression de plus de 200 gènes.",
              en: "Calcitriol regulates the expression of over 200 genes."
            },
            confusionHint: {
              fr: "La vitamine D a un impact génétique très large, plus de 200 gènes.",
              en: "Vitamin D has a very broad genetic impact, over 200 genes."
            }
          },
          {
            id: "vd-l3-q4-b",
            question: {
              fr: "Les apports en vitamine D dépendent de :",
              en: "Vitamin D intake depends on:"
            },
            options: {
              fr: ["Uniquement l'âge", "L'ensoleillement et l'alimentation", "Le groupe sanguin", "L'activité sportive"],
              en: ["Age only", "Sunlight and diet", "Blood type", "Sports activity"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les besoins dépendent principalement de l'exposition solaire et de l'alimentation.",
              en: "Needs depend mainly on sun exposure and diet."
            },
            confusionHint: {
              fr: "L'ensoleillement est le facteur principal, modulé par l'alimentation.",
              en: "Sunlight is the main factor, modulated by diet."
            }
          }
        ]
      }
    }
  }
];

export const vitaminDSuccessMessages = {
  levelComplete: {
    fr: "🧠 Excellent ! Votre mémoire vient de consolider une connaissance clé.\nPrêt à approfondir ?",
    en: "🧠 Excellent! Your memory has just consolidated key knowledge.\nReady to go deeper?"
  },
  finalComplete: {
    fr: "🧠 Niveau expert atteint !\nVotre cerveau maîtrise désormais les mécanismes clés de la vitamine D.",
    en: "🧠 Expert level reached!\nYour brain now masters the key mechanisms of vitamin D."
  },
  tryAgain: {
    fr: "Relisez attentivement le texte reformulé pour mieux ancrer ces informations.",
    en: "Read the reformulated text carefully to better anchor this information."
  }
};

export const vitaminDUiTexts = {
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
