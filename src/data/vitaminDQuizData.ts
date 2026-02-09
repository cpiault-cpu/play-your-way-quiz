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
              fr: "L'excès de vitamine D est lié au calcium, pas au fer.",
              en: "Excess vitamin D is related to calcium, not iron."
            }
          },
          {
            id: "vd-l2-q3-b",
            question: {
              fr: "Pour mesurer le statut en vitamine D, on dose :",
              en: "To measure vitamin D status, we measure:"
            },
            options: {
              fr: ["Le calcium sanguin", "La 25(OH)D", "Les UVB absorbés", "La mélanine cutanée"],
              en: ["Blood calcium", "25(OH)D", "Absorbed UVB", "Skin melanin"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La 25(OH)D est le marqueur de référence pour évaluer les réserves en vitamine D.",
              en: "25(OH)D is the reference marker for evaluating vitamin D reserves."
            },
            confusionHint: {
              fr: "On ne dose pas directement les UVB, mais le métabolite sanguin 25(OH)D.",
              en: "We don't directly measure UVB, but the blood metabolite 25(OH)D."
            }
          },
          {
            id: "vd-l2-q4-b",
            question: {
              fr: "Les personnes à peau foncée doivent :",
              en: "People with dark skin should:"
            },
            options: {
              fr: ["Éviter le soleil", "S'exposer plus longtemps au soleil", "Prendre moins de compléments", "Manger plus de légumes verts"],
              en: ["Avoid the sun", "Get more sun exposure", "Take fewer supplements", "Eat more green vegetables"]
            },
            correctIndex: 1,
            explanation: {
              fr: "La mélanine filtre les UVB, donc une exposition plus longue est nécessaire.",
              en: "Melanin filters UVB, so longer exposure is needed."
            },
            confusionHint: {
              fr: "Plus de mélanine = moins d'UVB absorbés = besoin d'exposition plus longue.",
              en: "More melanin = less UVB absorbed = need for longer exposure."
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
            "La vitamine D influence le système immunitaire inné et adaptatif via des récepteurs nucléaires (VDR).",
            "Des études suggèrent un lien entre carence en vitamine D et risque accru de maladies auto-immunes.",
            "La conversion de la vitamine D en calcitriol se fait en deux étapes : foie puis reins.",
            "Les besoins varient selon l'âge, la couleur de peau, et le niveau d'ensoleillement régional."
          ],
          en: [
            "Vitamin D influences the innate and adaptive immune system via nuclear receptors (VDR).",
            "Studies suggest a link between vitamin D deficiency and increased risk of autoimmune diseases.",
            "Conversion of vitamin D to calcitriol occurs in two steps: liver then kidneys.",
            "Needs vary according to age, skin color, and regional sunlight levels."
          ]
        },
        questions: [
          {
            id: "vd-l3-q1-a",
            question: {
              fr: "La vitamine D agit sur l'immunité via :",
              en: "Vitamin D acts on immunity via:"
            },
            options: {
              fr: ["Des enzymes digestives", "Des récepteurs nucléaires (VDR)", "Des anticorps", "Des hormones thyroïdiennes"],
              en: ["Digestive enzymes", "Nuclear receptors (VDR)", "Antibodies", "Thyroid hormones"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les récepteurs VDR permettent à la vitamine D d'influencer l'expression génétique immunitaire.",
              en: "VDR receptors allow vitamin D to influence immune gene expression."
            },
            confusionHint: {
              fr: "La vitamine D n'agit pas via les anticorps mais via ses récepteurs nucléaires VDR.",
              en: "Vitamin D doesn't act via antibodies but through its VDR nuclear receptors."
            }
          },
          {
            id: "vd-l3-q2-a",
            question: {
              fr: "La conversion finale en calcitriol se fait dans :",
              en: "Final conversion to calcitriol occurs in:"
            },
            options: {
              fr: ["La peau", "Le foie", "Les reins", "Les intestins"],
              en: ["The skin", "The liver", "The kidneys", "The intestines"]
            },
            correctIndex: 2,
            explanation: {
              fr: "La dernière étape de conversion se produit dans les reins.",
              en: "The final conversion step occurs in the kidneys."
            },
            confusionHint: {
              fr: "Le foie fait la première conversion, les reins la finalisent en calcitriol actif.",
              en: "The liver does the first conversion, the kidneys finalize it into active calcitriol."
            }
          },
          {
            id: "vd-l3-q3-a",
            question: {
              fr: "Une carence en vitamine D est associée à :",
              en: "Vitamin D deficiency is associated with:"
            },
            options: {
              fr: ["Une meilleure régulation immunitaire", "Un risque accru de maladies auto-immunes", "Une diminution de l'inflammation", "Une production d'anticorps optimale"],
              en: ["Better immune regulation", "Increased risk of autoimmune diseases", "Decreased inflammation", "Optimal antibody production"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Des études montrent un lien entre carence et risque accru de maladies auto-immunes.",
              en: "Studies show a link between deficiency and increased risk of autoimmune diseases."
            },
            confusionHint: {
              fr: "La carence dérégule l'immunité, augmentant les risques auto-immuns.",
              en: "Deficiency dysregulates immunity, increasing autoimmune risks."
            }
          },
          {
            id: "vd-l3-q4-a",
            question: {
              fr: "Les besoins en vitamine D dépendent de :",
              en: "Vitamin D needs depend on:"
            },
            options: {
              fr: ["Uniquement de l'alimentation", "L'âge, la peau et l'ensoleillement", "Le groupe sanguin", "Le niveau d'activité physique"],
              en: ["Diet only", "Age, skin and sunlight", "Blood type", "Physical activity level"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les besoins varient selon l'âge, la couleur de peau et l'ensoleillement régional.",
              en: "Needs vary according to age, skin color and regional sunlight."
            },
            confusionHint: {
              fr: "Ce sont des facteurs biologiques et environnementaux, pas le groupe sanguin.",
              en: "These are biological and environmental factors, not blood type."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La vitamine D module l'immunité grâce à ses récepteurs nucléaires VDR présents dans de nombreuses cellules.",
            "Sa transformation en forme active (calcitriol) nécessite deux organes : le foie d'abord, puis les reins.",
            "Un déficit prolongé est corrélé à des troubles auto-immuns et une inflammation chronique.",
            "Les besoins individuels dépendent de l'âge, de la pigmentation cutanée et de l'exposition solaire."
          ],
          en: [
            "Vitamin D modulates immunity through its VDR nuclear receptors present in many cells.",
            "Its transformation into active form (calcitriol) requires two organs: the liver first, then the kidneys.",
            "Prolonged deficiency is correlated with autoimmune disorders and chronic inflammation.",
            "Individual needs depend on age, skin pigmentation and sun exposure."
          ]
        },
        questions: [
          {
            id: "vd-l3-q1-b",
            question: {
              fr: "Les récepteurs VDR se trouvent :",
              en: "VDR receptors are found:"
            },
            options: {
              fr: ["Uniquement dans les os", "Dans de nombreuses cellules du corps", "Seulement dans la peau", "Dans le sang uniquement"],
              en: ["Only in bones", "In many cells of the body", "Only in the skin", "In blood only"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les VDR sont présents dans de nombreux types cellulaires, pas seulement les os.",
              en: "VDRs are present in many cell types, not just bones."
            },
            confusionHint: {
              fr: "La vitamine D a des effets systémiques car les VDR sont partout dans le corps.",
              en: "Vitamin D has systemic effects because VDRs are everywhere in the body."
            }
          },
          {
            id: "vd-l3-q2-b",
            question: {
              fr: "Le premier organe de conversion de la vitamine D est :",
              en: "The first organ for vitamin D conversion is:"
            },
            options: {
              fr: ["Les reins", "Le foie", "La peau", "Les poumons"],
              en: ["The kidneys", "The liver", "The skin", "The lungs"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le foie effectue la première hydroxylation de la vitamine D.",
              en: "The liver performs the first hydroxylation of vitamin D."
            },
            confusionHint: {
              fr: "La peau produit la vitamine D, mais c'est le foie qui commence sa conversion.",
              en: "The skin produces vitamin D, but it's the liver that starts its conversion."
            }
          },
          {
            id: "vd-l3-q3-b",
            question: {
              fr: "Un déficit prolongé en vitamine D peut causer :",
              en: "Prolonged vitamin D deficiency can cause:"
            },
            options: {
              fr: ["Une meilleure tolérance au froid", "Des troubles auto-immuns", "Une augmentation de l'énergie", "Une peau plus résistante"],
              en: ["Better cold tolerance", "Autoimmune disorders", "Increased energy", "More resistant skin"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le déficit chronique est lié à des dérèglements immunitaires et auto-immuns.",
              en: "Chronic deficiency is linked to immune and autoimmune dysregulation."
            },
            confusionHint: {
              fr: "La carence affaiblit l'immunité, elle ne renforce pas l'organisme.",
              en: "Deficiency weakens immunity, it doesn't strengthen the body."
            }
          },
          {
            id: "vd-l3-q4-b",
            question: {
              fr: "Les besoins en vitamine D varient selon :",
              en: "Vitamin D needs vary according to:"
            },
            options: {
              fr: ["Le régime alimentaire uniquement", "L'exposition solaire et l'alimentation", "Le sport pratiqué", "La taille de l'individu"],
              en: ["Diet only", "Sun exposure and diet", "Sport practiced", "Individual height"]
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
    fr: "Bravo ! Bonne maîtrise. Il faut tout de même savoir que d'autres facteurs affectent l'absorption de la vitamine D. Une naturopathe saura vous l'expliquer plus en détail.",
    en: "Bravo! Good mastery. However, you should know that other factors affect vitamin D absorption. A naturopath can explain this in more detail."
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
