import { Language } from "./quizData";

export interface MicronutritionQuestion {
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

export interface MicronutritionLevel {
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
      questions: MicronutritionQuestion[];
    };
    B: {
      text: {
        fr: string[];
        en: string[];
      };
      questions: MicronutritionQuestion[];
    };
  };
}

export const micronutritionLevels: MicronutritionLevel[] = [
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
            "Le calcium renforce les os et les dents et participe aussi à la contraction des muscles.",
            "Le fer aide le sang à transporter l'oxygène, ce qui limite la fatigue.",
            "Les oméga-3 soutiennent le cerveau, notamment la mémoire et la concentration.",
            "Un adulte a besoin en moyenne d'environ 0,8 g de protéines par kilo de poids corporel chaque jour."
          ],
          en: [
            "Calcium strengthens bones and teeth and also participates in muscle contraction.",
            "Iron helps blood transport oxygen, which limits fatigue.",
            "Omega-3s support the brain, particularly memory and concentration.",
            "An adult needs an average of about 0.8 g of protein per kilogram of body weight each day."
          ]
        },
        questions: [
          {
            id: "l1-q1-a",
            question: {
              fr: "En plus des os, le calcium participe à :",
              en: "In addition to bones, calcium participates in:"
            },
            options: {
              fr: ["La digestion", "La contraction musculaire", "La mémoire", "La vision"],
              en: ["Digestion", "Muscle contraction", "Memory", "Vision"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium intervient dans la contraction musculaire, pas dans la mémoire.",
              en: "Calcium is involved in muscle contraction, not memory."
            },
            confusionHint: {
              fr: "Attention à la confusion entre calcium et fonctions cérébrales.",
              en: "Be careful not to confuse calcium with brain functions."
            }
          },
          {
            id: "l1-q2-a",
            question: {
              fr: "Le fer sert principalement à :",
              en: "Iron is mainly used for:"
            },
            options: {
              fr: ["Fabriquer les dents", "Transporter l'oxygène", "Produire des hormones", "Hydrater les cellules"],
              en: ["Making teeth", "Transporting oxygen", "Producing hormones", "Hydrating cells"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le fer est essentiel au transport de l'oxygène dans le sang.",
              en: "Iron is essential for oxygen transport in the blood."
            },
            confusionHint: {
              fr: "Attention à ne pas confondre le fer avec d'autres minéraux.",
              en: "Be careful not to confuse iron with other minerals."
            }
          },
          {
            id: "l1-q3-a",
            question: {
              fr: "Les oméga-3 soutiennent surtout :",
              en: "Omega-3s mainly support:"
            },
            options: {
              fr: ["La peau", "Le cerveau", "Les os", "Les articulations"],
              en: ["The skin", "The brain", "Bones", "Joints"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 sont particulièrement bénéfiques pour les fonctions cérébrales.",
              en: "Omega-3s are particularly beneficial for brain functions."
            },
            confusionHint: {
              fr: "Les oméga-3 agissent sur plusieurs systèmes, mais le cerveau est leur cible principale.",
              en: "Omega-3s act on several systems, but the brain is their main target."
            }
          },
          {
            id: "l1-q4-a",
            question: {
              fr: "L'apport moyen en protéines est :",
              en: "The average protein intake is:"
            },
            options: {
              fr: ["Identique pour tous", "0,8 g/kg/jour", "2 g/kg/jour", "Indépendant du poids"],
              en: ["The same for everyone", "0.8 g/kg/day", "2 g/kg/day", "Independent of weight"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'apport recommandé est d'environ 0,8 g de protéines par kilo de poids corporel.",
              en: "The recommended intake is about 0.8 g of protein per kilogram of body weight."
            },
            confusionHint: {
              fr: "Les besoins varient selon le poids, d'où l'expression en g/kg/jour.",
              en: "Needs vary according to weight, hence the expression in g/kg/day."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Le calcium est indispensable aux os mais permet aussi aux muscles de se contracter.",
            "Le fer transporte l'oxygène dans l'organisme et participe ainsi au niveau d'énergie.",
            "Les oméga-3 contribuent aux fonctions cérébrales comme la concentration.",
            "Les adultes doivent consommer environ 0,8 g de protéines par kilo chaque jour."
          ],
          en: [
            "Calcium is essential for bones but also allows muscles to contract.",
            "Iron transports oxygen in the body and thus contributes to energy levels.",
            "Omega-3s contribute to brain functions such as concentration.",
            "Adults should consume about 0.8 g of protein per kilogram each day."
          ]
        },
        questions: [
          {
            id: "l1-q1-b",
            question: {
              fr: "Le calcium permet aux muscles de :",
              en: "Calcium allows muscles to:"
            },
            options: {
              fr: ["Se relaxer uniquement", "Se contracter", "Stocker de l'énergie", "Produire des hormones"],
              en: ["Relax only", "Contract", "Store energy", "Produce hormones"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium est essentiel à la contraction musculaire.",
              en: "Calcium is essential for muscle contraction."
            },
            confusionHint: {
              fr: "Le calcium agit sur les muscles, pas sur le stockage d'énergie.",
              en: "Calcium acts on muscles, not on energy storage."
            }
          },
          {
            id: "l1-q2-b",
            question: {
              fr: "Le fer contribue au niveau d'énergie en :",
              en: "Iron contributes to energy levels by:"
            },
            options: {
              fr: ["Stockant les graisses", "Transportant l'oxygène", "Produisant du glucose", "Hydratant les tissus"],
              en: ["Storing fat", "Transporting oxygen", "Producing glucose", "Hydrating tissues"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le fer transporte l'oxygène, ce qui est essentiel pour l'énergie.",
              en: "Iron transports oxygen, which is essential for energy."
            },
            confusionHint: {
              fr: "L'énergie vient de l'oxygénation, pas du stockage de graisses.",
              en: "Energy comes from oxygenation, not fat storage."
            }
          },
          {
            id: "l1-q3-b",
            question: {
              fr: "Les oméga-3 contribuent notamment à :",
              en: "Omega-3s contribute particularly to:"
            },
            options: {
              fr: ["La digestion", "La concentration", "La solidité des os", "L'hydratation"],
              en: ["Digestion", "Concentration", "Bone strength", "Hydration"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 soutiennent les fonctions cérébrales dont la concentration.",
              en: "Omega-3s support brain functions including concentration."
            },
            confusionHint: {
              fr: "Les oméga-3 agissent sur le cerveau, pas sur les os.",
              en: "Omega-3s act on the brain, not on bones."
            }
          },
          {
            id: "l1-q4-b",
            question: {
              fr: "L'apport quotidien en protéines recommandé pour un adulte est :",
              en: "The recommended daily protein intake for an adult is:"
            },
            options: {
              fr: ["1,5 g par repas", "0,8 g par kilo de poids", "Fixe à 50 g", "Variable selon l'humeur"],
              en: ["1.5 g per meal", "0.8 g per kilogram of weight", "Fixed at 50 g", "Variable according to mood"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'apport est calculé en fonction du poids : 0,8 g/kg/jour.",
              en: "The intake is calculated based on weight: 0.8 g/kg/day."
            },
            confusionHint: {
              fr: "L'apport dépend du poids corporel, pas d'un chiffre fixe.",
              en: "The intake depends on body weight, not a fixed number."
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
            "Le calcium ne sert pas uniquement au squelette : il est essentiel à l'activité musculaire.",
            "Une carence en fer réduit l'efficacité du transport de l'oxygène.",
            "Les oméga-3 d'origine marine jouent un rôle majeur dans les fonctions cognitives.",
            "Les besoins en protéines varient selon l'âge et l'activité mais restent proches de 0,8 g/kg/jour chez l'adulte."
          ],
          en: [
            "Calcium is not only for the skeleton: it is essential for muscle activity.",
            "Iron deficiency reduces the efficiency of oxygen transport.",
            "Marine omega-3s play a major role in cognitive functions.",
            "Protein needs vary according to age and activity but remain close to 0.8 g/kg/day in adults."
          ]
        },
        questions: [
          {
            id: "l2-q1-a",
            question: {
              fr: "Le calcium est indispensable à :",
              en: "Calcium is essential for:"
            },
            options: {
              fr: ["La vision", "L'activité musculaire", "L'immunité", "La digestion"],
              en: ["Vision", "Muscle activity", "Immunity", "Digestion"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium est essentiel à l'activité musculaire, au-delà des os.",
              en: "Calcium is essential for muscle activity, beyond bones."
            },
            confusionHint: {
              fr: "Le calcium agit sur les muscles, pas sur le système immunitaire.",
              en: "Calcium acts on muscles, not on the immune system."
            }
          },
          {
            id: "l2-q2-a",
            question: {
              fr: "La fatigue liée au manque de fer s'explique par :",
              en: "Fatigue related to iron deficiency is explained by:"
            },
            options: {
              fr: ["Une digestion lente", "Un transport d'oxygène moins efficace", "Un excès de calcium", "Un manque de protéines"],
              en: ["Slow digestion", "Less efficient oxygen transport", "Excess calcium", "Lack of protein"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le fer transporte l'oxygène ; sa carence fatigue l'organisme.",
              en: "Iron transports oxygen; its deficiency tires the body."
            },
            confusionHint: {
              fr: "La fatigue vient du manque d'oxygène, pas d'un excès de calcium.",
              en: "Fatigue comes from lack of oxygen, not excess calcium."
            }
          },
          {
            id: "l2-q3-a",
            question: {
              fr: "Les oméga-3 marins sont associés à :",
              en: "Marine omega-3s are associated with:"
            },
            options: {
              fr: ["La masse osseuse", "La cognition", "La glycémie", "Les tendons"],
              en: ["Bone mass", "Cognition", "Blood sugar", "Tendons"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 marins soutiennent les fonctions cognitives.",
              en: "Marine omega-3s support cognitive functions."
            },
            confusionHint: {
              fr: "Les oméga-3 agissent sur le cerveau, pas sur les os.",
              en: "Omega-3s act on the brain, not on bones."
            }
          },
          {
            id: "l2-q4-a",
            question: {
              fr: "Les besoins en protéines :",
              en: "Protein needs:"
            },
            options: {
              fr: ["Ne changent jamais", "Tournent autour de 0,8 g/kg/jour chez l'adulte", "Dépassent toujours 1,5 g", "Dépendent uniquement du sexe"],
              en: ["Never change", "Are around 0.8 g/kg/day in adults", "Always exceed 1.5 g", "Depend only on sex"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les besoins varient mais restent proches de 0,8 g/kg/jour chez l'adulte.",
              en: "Needs vary but remain close to 0.8 g/kg/day in adults."
            },
            confusionHint: {
              fr: "Les besoins varient selon plusieurs facteurs, pas seulement le sexe.",
              en: "Needs vary according to several factors, not just sex."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Au-delà du squelette, le calcium active les contractions musculaires.",
            "Le fer assure le transport de l'oxygène ; en manquer provoque de la fatigue.",
            "Les oméga-3 issus des poissons gras sont reconnus pour leur action sur la cognition.",
            "Selon l'âge et l'activité physique, les besoins en protéines oscillent autour de 0,8 g/kg/jour."
          ],
          en: [
            "Beyond the skeleton, calcium activates muscle contractions.",
            "Iron ensures oxygen transport; lacking it causes fatigue.",
            "Omega-3s from fatty fish are recognized for their action on cognition.",
            "Depending on age and physical activity, protein needs fluctuate around 0.8 g/kg/day."
          ]
        },
        questions: [
          {
            id: "l2-q1-b",
            question: {
              fr: "En plus des os, le calcium active :",
              en: "In addition to bones, calcium activates:"
            },
            options: {
              fr: ["La production d'hormones", "Les contractions musculaires", "La digestion des graisses", "La régulation thermique"],
              en: ["Hormone production", "Muscle contractions", "Fat digestion", "Temperature regulation"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium est essentiel aux contractions musculaires.",
              en: "Calcium is essential for muscle contractions."
            },
            confusionHint: {
              fr: "Le calcium agit sur les muscles, pas sur la digestion.",
              en: "Calcium acts on muscles, not on digestion."
            }
          },
          {
            id: "l2-q2-b",
            question: {
              fr: "Un manque de fer entraîne de la fatigue car :",
              en: "Iron deficiency causes fatigue because:"
            },
            options: {
              fr: ["Le sang s'épaissit", "L'oxygène est moins bien transporté", "Les muscles se contractent moins", "Le cœur ralentit"],
              en: ["Blood thickens", "Oxygen is less well transported", "Muscles contract less", "Heart slows down"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le fer transporte l'oxygène ; sans lui, l'organisme fatigue.",
              en: "Iron transports oxygen; without it, the body tires."
            },
            confusionHint: {
              fr: "La fatigue vient du manque d'oxygène, pas d'un problème cardiaque direct.",
              en: "Fatigue comes from lack of oxygen, not a direct heart problem."
            }
          },
          {
            id: "l2-q3-b",
            question: {
              fr: "Les oméga-3 des poissons gras sont reconnus pour leur action sur :",
              en: "Omega-3s from fatty fish are recognized for their action on:"
            },
            options: {
              fr: ["Les articulations", "La cognition", "La peau sèche", "Les muscles"],
              en: ["Joints", "Cognition", "Dry skin", "Muscles"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 marins soutiennent particulièrement les fonctions cognitives.",
              en: "Marine omega-3s particularly support cognitive functions."
            },
            confusionHint: {
              fr: "Les oméga-3 ont plusieurs bienfaits, mais la cognition est leur effet majeur.",
              en: "Omega-3s have several benefits, but cognition is their major effect."
            }
          },
          {
            id: "l2-q4-b",
            question: {
              fr: "Les besoins en protéines d'un adulte oscillent autour de :",
              en: "An adult's protein needs fluctuate around:"
            },
            options: {
              fr: ["0,5 g/kg/jour", "0,8 g/kg/jour", "1,2 g/kg/jour fixe", "2 g/kg/jour minimum"],
              en: ["0.5 g/kg/day", "0.8 g/kg/day", "Fixed 1.2 g/kg/day", "2 g/kg/day minimum"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'apport recommandé reste proche de 0,8 g/kg/jour pour un adulte.",
              en: "The recommended intake remains close to 0.8 g/kg/day for an adult."
            },
            confusionHint: {
              fr: "Les besoins ne sont ni très bas (0,5) ni très hauts (2 g) pour un adulte moyen.",
              en: "Needs are neither very low (0.5) nor very high (2 g) for an average adult."
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
            "Le calcium intervient dans la solidité osseuse et la transmission des signaux musculaires.",
            "Le fer est un composant central de l'hémoglobine qui transporte l'oxygène.",
            "Les oméga-3 améliorent la fluidité des membranes neuronales.",
            "Les besoins protéiques sont d'environ 0,8 g/kg/jour mais augmentent chez les sportifs et les seniors."
          ],
          en: [
            "Calcium is involved in bone strength and muscle signal transmission.",
            "Iron is a central component of hemoglobin that transports oxygen.",
            "Omega-3s improve the fluidity of neuronal membranes.",
            "Protein needs are about 0.8 g/kg/day but increase in athletes and seniors."
          ]
        },
        questions: [
          {
            id: "l3-q1-a",
            question: {
              fr: "Quel nutriment agit sur les os ET les muscles ?",
              en: "Which nutrient acts on bones AND muscles?"
            },
            options: {
              fr: ["Le fer", "Le calcium", "Les oméga-3", "Les protéines"],
              en: ["Iron", "Calcium", "Omega-3s", "Proteins"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium agit sur la solidité osseuse et la transmission des signaux musculaires.",
              en: "Calcium acts on bone strength and muscle signal transmission."
            },
            confusionHint: {
              fr: "Les protéines construisent les muscles, mais le calcium les fait fonctionner.",
              en: "Proteins build muscles, but calcium makes them work."
            }
          },
          {
            id: "l3-q2-a",
            question: {
              fr: "Le fer est lié à :",
              en: "Iron is linked to:"
            },
            options: {
              fr: ["La myoglobine uniquement", "L'hémoglobine", "Les neurotransmetteurs", "Les anticorps"],
              en: ["Myoglobin only", "Hemoglobin", "Neurotransmitters", "Antibodies"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le fer est un composant central de l'hémoglobine.",
              en: "Iron is a central component of hemoglobin."
            },
            confusionHint: {
              fr: "L'hémoglobine transporte l'oxygène dans le sang grâce au fer.",
              en: "Hemoglobin transports oxygen in the blood thanks to iron."
            }
          },
          {
            id: "l3-q3-a",
            question: {
              fr: "Les oméga-3 améliorent :",
              en: "Omega-3s improve:"
            },
            options: {
              fr: ["La rigidité des artères", "La fluidité des membranes neuronales", "La densité osseuse", "La production de globules rouges"],
              en: ["Arterial rigidity", "Neuronal membrane fluidity", "Bone density", "Red blood cell production"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 rendent les membranes neuronales plus fluides.",
              en: "Omega-3s make neuronal membranes more fluid."
            },
            confusionHint: {
              fr: "Les oméga-3 fluidifient, ils ne rigidifient pas.",
              en: "Omega-3s fluidify, they don't stiffen."
            }
          },
          {
            id: "l3-q4-a",
            question: {
              fr: "Qui peut nécessiter davantage de protéines que 0,8 g/kg/jour ?",
              en: "Who may need more protein than 0.8 g/kg/day?"
            },
            options: {
              fr: ["Les enfants uniquement", "Les seniors et sportifs", "Les personnes sédentaires", "Personne, c'est fixe"],
              en: ["Children only", "Seniors and athletes", "Sedentary people", "No one, it's fixed"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les sportifs et seniors ont des besoins protéiques plus élevés.",
              en: "Athletes and seniors have higher protein needs."
            },
            confusionHint: {
              fr: "L'activité physique et l'âge augmentent les besoins en protéines.",
              en: "Physical activity and age increase protein needs."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Le calcium assure à la fois la solidité des os et la transmission des influx vers les muscles.",
            "L'hémoglobine, riche en fer, est responsable du transport de l'oxygène sanguin.",
            "La fluidité des membranes neuronales dépend en partie des oméga-3.",
            "Les sportifs et les personnes âgées ont souvent besoin de plus de 0,8 g de protéines par kilo."
          ],
          en: [
            "Calcium ensures both bone strength and the transmission of impulses to muscles.",
            "Hemoglobin, rich in iron, is responsible for blood oxygen transport.",
            "The fluidity of neuronal membranes depends partly on omega-3s.",
            "Athletes and elderly people often need more than 0.8 g of protein per kilogram."
          ]
        },
        questions: [
          {
            id: "l3-q1-b",
            question: {
              fr: "Le calcium assure à la fois la solidité des os et :",
              en: "Calcium ensures both bone strength and:"
            },
            options: {
              fr: ["La production d'énergie", "La transmission des influx vers les muscles", "La digestion des lipides", "La synthèse des vitamines"],
              en: ["Energy production", "Impulse transmission to muscles", "Lipid digestion", "Vitamin synthesis"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le calcium transmet les signaux nerveux aux muscles.",
              en: "Calcium transmits nerve signals to muscles."
            },
            confusionHint: {
              fr: "Le calcium agit sur les muscles via les influx nerveux.",
              en: "Calcium acts on muscles through nerve impulses."
            }
          },
          {
            id: "l3-q2-b",
            question: {
              fr: "L'hémoglobine, riche en fer, transporte :",
              en: "Hemoglobin, rich in iron, transports:"
            },
            options: {
              fr: ["Les nutriments", "L'oxygène sanguin", "Les anticorps", "Les hormones"],
              en: ["Nutrients", "Blood oxygen", "Antibodies", "Hormones"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'hémoglobine transporte l'oxygène grâce au fer qu'elle contient.",
              en: "Hemoglobin transports oxygen thanks to the iron it contains."
            },
            confusionHint: {
              fr: "L'hémoglobine transporte l'oxygène, pas les nutriments.",
              en: "Hemoglobin transports oxygen, not nutrients."
            }
          },
          {
            id: "l3-q3-b",
            question: {
              fr: "La fluidité des membranes neuronales dépend en partie de :",
              en: "The fluidity of neuronal membranes depends partly on:"
            },
            options: {
              fr: ["Du calcium", "Des oméga-3", "Du fer", "Des protéines"],
              en: ["Calcium", "Omega-3s", "Iron", "Proteins"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Les oméga-3 améliorent la fluidité des membranes neuronales.",
              en: "Omega-3s improve the fluidity of neuronal membranes."
            },
            confusionHint: {
              fr: "Les oméga-3, pas le calcium, agissent sur les membranes neuronales.",
              en: "Omega-3s, not calcium, act on neuronal membranes."
            }
          },
          {
            id: "l3-q4-b",
            question: {
              fr: "Qui a souvent besoin de plus de 0,8 g de protéines par kilo ?",
              en: "Who often needs more than 0.8 g of protein per kilogram?"
            },
            options: {
              fr: ["Les adolescents uniquement", "Les sportifs et personnes âgées", "Tout le monde pareil", "Les personnes en surpoids"],
              en: ["Teenagers only", "Athletes and elderly people", "Everyone equally", "Overweight people"]
            },
            correctIndex: 1,
            explanation: {
              fr: "L'activité physique et l'âge avancé augmentent les besoins protéiques.",
              en: "Physical activity and advanced age increase protein needs."
            },
            confusionHint: {
              fr: "Les besoins augmentent avec l'activité et l'âge, pas avec le poids.",
              en: "Needs increase with activity and age, not with weight."
            }
          }
        ]
      }
    }
  }
];

export const successMessages = {
  levelComplete: {
    fr: "🧠 Excellent. Votre mémoire vient de franchir un cap.\nPrêt à stimuler davantage votre cerveau ?",
    en: "🧠 Excellent. Your memory has just reached a new level.\nReady to stimulate your brain further?"
  },
  finalComplete: {
    fr: "🧠 Niveau expert atteint.\nVotre cerveau vient de consolider des connaissances essentielles pour votre santé.",
    en: "🧠 Expert level achieved.\nYour brain has just consolidated essential knowledge for your health."
  },
  tryAgain: {
    fr: "Continuons à renforcer ces notions. Une nouvelle lecture vous attend.",
    en: "Let's continue to reinforce these concepts. A new reading awaits you."
  }
};

export const uiTexts = {
  readingPhase: {
    fr: "Mémorisez ces informations",
    en: "Memorize this information"
  },
  readingTimer: {
    fr: "Temps de lecture",
    en: "Reading time"
  },
  questionPhase: {
    fr: "Question",
    en: "Question"
  },
  resultsPhase: {
    fr: "Vos résultats",
    en: "Your results"
  },
  score: {
    fr: "Score",
    en: "Score"
  },
  perfect: {
    fr: "Parfait !",
    en: "Perfect!"
  },
  corrections: {
    fr: "Points d'attention",
    en: "Points to note"
  },
  nextLevel: {
    fr: "Passer au niveau supérieur",
    en: "Move to next level"
  },
  retry: {
    fr: "Renforcer mes connaissances",
    en: "Reinforce my knowledge"
  },
  start: {
    fr: "Commencer",
    en: "Start"
  },
  validate: {
    fr: "Valider",
    en: "Validate"
  },
  back: {
    fr: "Retour",
    en: "Back"
  }
};
