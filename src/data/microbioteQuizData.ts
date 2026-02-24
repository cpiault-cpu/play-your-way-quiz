import { Language } from "./quizData";

export type MicrobioteQuestionType = "single" | "multi" | "association";

export interface MicrobioteQuestion {
  id: string;
  type: MicrobioteQuestionType;
  question: { fr: string; en: string };
  options?: { fr: string[]; en: string[] };
  correctIndex?: number;
  multiOptions?: { fr: string[]; en: string[] };
  correctIndices?: number[];
  associations?: {
    pairs: { left: string; right: string }[];
    distractors?: string[];
  };
  explanation: { fr: string; en: string };
}

export interface MicrobioteLevel {
  level: number;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  readingTime: number;
  versions: {
    A: {
      text: { fr: string[]; en: string[] };
      questions: MicrobioteQuestion[];
    };
    B: {
      text: { fr: string[]; en: string[] };
      questions: MicrobioteQuestion[];
    };
  };
}

export const microbioteLevels: MicrobioteLevel[] = [
  // LEVEL 1 — La carte d'identité de votre écosystème
  {
    level: 1,
    title: { fr: "La carte d'identité de votre écosystème", en: "Your Ecosystem's ID Card" },
    subtitle: { fr: "Distinguez les acteurs de cette jungle !", en: "Identify the players in this jungle!" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Votre mission : distinguer les acteurs de cette jungle !",
            "Le microbiote, c'est la liste des invités — l'ensemble des micro-organismes qui vivent dans votre intestin.",
            "Le microbiome, c'est leur CV + leurs super-pouvoirs — leur patrimoine génétique et leurs fonctions.",
            "Le métagénome, c'est le mode d'emploi de tous leurs gènes réunis — l'ensemble du matériel génétique de la communauté."
          ],
          en: [
            "Your mission: identify the players in this jungle!",
            "The microbiota is the guest list — all the microorganisms living in your gut.",
            "The microbiome is their CV + superpowers — their genetic heritage and functions.",
            "The metagenome is the user manual of all their genes combined — the total genetic material of the community."
          ]
        },
        questions: [
          {
            id: "mb-l1-q1-a",
            type: "single",
            question: {
              fr: "Le microbiote, c'est...",
              en: "The microbiota is..."
            },
            options: {
              fr: ["📋 Un catalogue d'espèces", "🏭 Une usine à vitamines", "🌐 Un réseau social microbien", "📖 Un livre de recettes génétiques"],
              en: ["📋 A catalog of species", "🏭 A vitamin factory", "🌐 A microbial social network", "📖 A genetic recipe book"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le microbiote est l'ensemble des micro-organismes (bactéries, virus, champignons) qui peuplent un environnement. C'est bien un catalogue d'espèces !",
              en: "The microbiota is the collection of microorganisms (bacteria, viruses, fungi) that inhabit an environment. It's indeed a catalog of species!"
            }
          },
          {
            id: "mb-l1-q2-a",
            type: "single",
            question: {
              fr: "Le microbiome correspond à :",
              en: "The microbiome corresponds to:"
            },
            options: {
              fr: ["La liste des bactéries", "Les gènes et fonctions des micro-organismes", "Le nombre total de cellules", "La taille de l'intestin"],
              en: ["The list of bacteria", "The genes and functions of microorganisms", "The total number of cells", "The size of the intestine"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le microbiome englobe le patrimoine génétique et les fonctions de l'ensemble des micro-organismes — leur CV et leurs super-pouvoirs !",
              en: "The microbiome encompasses the genetic heritage and functions of all microorganisms — their CV and superpowers!"
            }
          },
          {
            id: "mb-l1-q3-a",
            type: "single",
            question: {
              fr: "Le métagénome, c'est :",
              en: "The metagenome is:"
            },
            options: {
              fr: ["Un type de bactérie", "L'ensemble du matériel génétique de la communauté", "Un régime alimentaire", "Un organe digestif"],
              en: ["A type of bacteria", "The total genetic material of the community", "A diet", "A digestive organ"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le métagénome rassemble l'intégralité du matériel génétique de tous les micro-organismes d'une communauté — le mode d'emploi de tous leurs gènes réunis.",
              en: "The metagenome gathers all the genetic material of every microorganism in a community — the user manual of all their combined genes."
            }
          },
          {
            id: "mb-l1-q4-a",
            type: "single",
            question: {
              fr: "Combien de micro-organismes vivent environ dans nos intestins ?",
              en: "How many microorganisms live approximately in our intestines?"
            },
            options: {
              fr: ["1 million", "1 milliard", "100 000 milliards", "1 000"],
              en: ["1 million", "1 billion", "100 trillion", "1,000"]
            },
            correctIndex: 2,
            explanation: {
              fr: "Environ 100 000 milliards de micro-organismes vivent dans nos intestins — une forêt tropicale miniature !",
              en: "About 100 trillion microorganisms live in our intestines — a miniature tropical forest!"
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Reprenons les bases avec des images simples :",
            "🏠 Le microbiote = les habitants de votre village intestinal.",
            "📄 Le microbiome = la fiche de poste de chaque habitant (ce qu'ils savent faire).",
            "📚 Le métagénome = la bibliothèque de tous les gènes du village."
          ],
          en: [
            "Let's review the basics with simple images:",
            "🏠 The microbiota = the inhabitants of your intestinal village.",
            "📄 The microbiome = each inhabitant's job description (what they can do).",
            "📚 The metagenome = the library of all the village's genes."
          ]
        },
        questions: [
          {
            id: "mb-l1-q1-b",
            type: "single",
            question: {
              fr: "Les « habitants » de votre intestin, c'est :",
              en: "The 'inhabitants' of your intestine are:"
            },
            options: {
              fr: ["Le microbiote", "Le microbiome", "Le métagénome"],
              en: ["The microbiota", "The microbiome", "The metagenome"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le microbiote, ce sont les habitants — l'ensemble des micro-organismes vivant dans votre intestin.",
              en: "The microbiota are the inhabitants — all the microorganisms living in your intestine."
            }
          },
          {
            id: "mb-l1-q2-b",
            type: "single",
            question: {
              fr: "La « fiche de poste » des micro-organismes, c'est :",
              en: "The 'job description' of microorganisms is:"
            },
            options: {
              fr: ["Le métagénome", "Le microbiome", "Le microbiote"],
              en: ["The metagenome", "The microbiome", "The microbiota"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le microbiome décrit les compétences et fonctions de chaque micro-organisme — leur fiche de poste !",
              en: "The microbiome describes the skills and functions of each microorganism — their job description!"
            }
          },
          {
            id: "mb-l1-q3-b",
            type: "single",
            question: {
              fr: "La « bibliothèque génétique » du village intestinal, c'est :",
              en: "The 'genetic library' of the intestinal village is:"
            },
            options: {
              fr: ["Le microbiote", "Le métagénome", "Le microbiome"],
              en: ["The microbiota", "The metagenome", "The microbiome"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le métagénome est la bibliothèque de tous les gènes de la communauté microbienne.",
              en: "The metagenome is the library of all genes in the microbial community."
            }
          },
          {
            id: "mb-l1-q4-b",
            type: "multi",
            question: {
              fr: "Quels termes désignent des concepts liés au microbiote intestinal ?",
              en: "Which terms refer to concepts related to the gut microbiota?"
            },
            multiOptions: {
              fr: ["Microbiote", "Microbiome", "Métagénome", "Métabolisme"],
              en: ["Microbiota", "Microbiome", "Metagenome", "Metabolism"]
            },
            correctIndices: [0, 1, 2],
            explanation: {
              fr: "Microbiote, microbiome et métagénome sont les 3 concepts clés. Le métabolisme est un processus biochimique différent.",
              en: "Microbiota, microbiome and metagenome are the 3 key concepts. Metabolism is a different biochemical process."
            }
          }
        ]
      }
    }
  },
  // LEVEL 2 — La guerre des bactéries
  {
    level: 2,
    title: { fr: "La guerre des bactéries", en: "The Bacteria War" },
    subtitle: { fr: "Commensales vs opportunistes", en: "Commensals vs opportunists" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "À la naissance, votre intestin est une terre vierge.",
            "Les premiers arrivants (bactéries commensales) préparent le terrain pour les 'colons' stricts.",
            "Vers 2 ans, l'écosystème est stable… sauf si les opportunistes en profitent !",
            "Les commensales vivent en harmonie avec vous. Les opportunistes guettent la moindre faiblesse."
          ],
          en: [
            "At birth, your intestine is virgin land.",
            "The first arrivals (commensal bacteria) prepare the ground for strict 'colonizers'.",
            "Around age 2, the ecosystem is stable… unless opportunists take advantage!",
            "Commensals live in harmony with you. Opportunists watch for the slightest weakness."
          ]
        },
        questions: [
          {
            id: "mb-l2-q1-a",
            type: "single",
            question: {
              fr: "Une bactérie commensale est une bactérie qui :",
              en: "A commensal bacterium is one that:"
            },
            options: {
              fr: ["Vit en harmonie avec l'hôte", "Provoque des maladies", "Se nourrit de sucre uniquement", "N'existe pas dans l'intestin"],
              en: ["Lives in harmony with the host", "Causes diseases", "Feeds only on sugar", "Doesn't exist in the intestine"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les bactéries commensales vivent en symbiose avec vous — elles vous aident et vous les aidez !",
              en: "Commensal bacteria live in symbiosis with you — they help you and you help them!"
            }
          },
          {
            id: "mb-l2-q2-a",
            type: "single",
            question: {
              fr: "À quel âge l'écosystème intestinal se stabilise-t-il environ ?",
              en: "At what age does the intestinal ecosystem approximately stabilize?"
            },
            options: {
              fr: ["6 mois", "2 ans", "10 ans", "À l'adolescence"],
              en: ["6 months", "2 years", "10 years", "In adolescence"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Vers 2 ans, le microbiote intestinal atteint une composition relativement stable et mature.",
              en: "Around age 2, the gut microbiota reaches a relatively stable and mature composition."
            }
          },
          {
            id: "mb-l2-q3-a",
            type: "multi",
            question: {
              fr: "Sélectionnez les caractéristiques des bactéries opportunistes :",
              en: "Select the characteristics of opportunistic bacteria:"
            },
            multiOptions: {
              fr: ["Guettent la moindre faiblesse", "Vivent en harmonie avec l'hôte", "Profitent d'un déséquilibre", "Sont toujours dangereuses"],
              en: ["Watch for the slightest weakness", "Live in harmony with the host", "Take advantage of imbalance", "Are always dangerous"]
            },
            correctIndices: [0, 2],
            explanation: {
              fr: "Les opportunistes guettent les faiblesses et profitent des déséquilibres. Elles ne vivent pas en harmonie et ne sont pas toujours dangereuses (elles le deviennent quand l'équilibre est rompu).",
              en: "Opportunists watch for weaknesses and take advantage of imbalances. They don't live in harmony and aren't always dangerous (they become so when balance is disrupted)."
            }
          },
          {
            id: "mb-l2-q4-a",
            type: "single",
            question: {
              fr: "À la naissance, l'intestin est :",
              en: "At birth, the intestine is:"
            },
            options: {
              fr: ["Déjà rempli de bactéries", "Une terre vierge", "Infecté par des virus", "Identique à celui d'un adulte"],
              en: ["Already full of bacteria", "Virgin land", "Infected by viruses", "Identical to an adult's"]
            },
            correctIndex: 1,
            explanation: {
              fr: "À la naissance, l'intestin est quasiment vierge. Les premiers micro-organismes arrivent lors de l'accouchement et l'allaitement.",
              en: "At birth, the intestine is nearly virgin. The first microorganisms arrive during delivery and breastfeeding."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Imaginez votre intestin comme un village :",
            "🟢 Les commensales = les habitants pacifiques qui font tourner le village.",
            "🔴 Les opportunistes = les brigands qui n'attaquent que quand les défenses sont faibles.",
            "L'équilibre entre les deux dépend de votre alimentation et de votre mode de vie."
          ],
          en: [
            "Imagine your intestine as a village:",
            "🟢 Commensals = the peaceful inhabitants who keep the village running.",
            "🔴 Opportunists = the bandits who only attack when defenses are weak.",
            "The balance between the two depends on your diet and lifestyle."
          ]
        },
        questions: [
          {
            id: "mb-l2-q1-b",
            type: "single",
            question: {
              fr: "Les « habitants pacifiques » du village intestinal sont :",
              en: "The 'peaceful inhabitants' of the intestinal village are:"
            },
            options: {
              fr: ["Les commensales", "Les opportunistes", "Les virus"],
              en: ["Commensals", "Opportunists", "Viruses"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les bactéries commensales sont les habitants pacifiques qui maintiennent l'équilibre de votre écosystème intestinal.",
              en: "Commensal bacteria are the peaceful inhabitants who maintain the balance of your intestinal ecosystem."
            }
          },
          {
            id: "mb-l2-q2-b",
            type: "single",
            question: {
              fr: "Les bactéries opportunistes attaquent quand :",
              en: "Opportunistic bacteria attack when:"
            },
            options: {
              fr: ["Les défenses sont affaiblies", "Tout va bien", "On mange des légumes"],
              en: ["Defenses are weakened", "Everything is fine", "You eat vegetables"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les opportunistes profitent des moments de faiblesse — stress, alimentation déséquilibrée, antibiotiques…",
              en: "Opportunists take advantage of moments of weakness — stress, unbalanced diet, antibiotics…"
            }
          },
          {
            id: "mb-l2-q3-b",
            type: "single",
            question: {
              fr: "L'équilibre du microbiote dépend de :",
              en: "The balance of the microbiota depends on:"
            },
            options: {
              fr: ["L'alimentation et le mode de vie", "La couleur des yeux", "L'heure du coucher uniquement"],
              en: ["Diet and lifestyle", "Eye color", "Bedtime only"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Votre alimentation et votre mode de vie sont les principaux leviers pour maintenir un microbiote équilibré.",
              en: "Your diet and lifestyle are the main levers for maintaining a balanced microbiota."
            }
          },
          {
            id: "mb-l2-q4-b",
            type: "association",
            question: {
              fr: "Associez chaque type de bactérie à son rôle :",
              en: "Match each type of bacteria to its role:"
            },
            associations: {
              pairs: [
                { left: "🟢 Commensale", right: "Harmonie" },
                { left: "🔴 Opportuniste", right: "Profite des faiblesses" }
              ]
            },
            explanation: {
              fr: "Les commensales vivent en harmonie, les opportunistes profitent des moments de déséquilibre.",
              en: "Commensals live in harmony, opportunists take advantage of moments of imbalance."
            }
          }
        ]
      }
    }
  },
  // LEVEL 3 — Dysbiose : le chaos alimentaire
  {
    level: 3,
    title: { fr: "Dysbiose : le chaos alimentaire", en: "Dysbiosis: Dietary Chaos" },
    subtitle: { fr: "Votre alimentation change tout", en: "Your diet changes everything" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Votre alimentation est une arme de construction (ou de destruction) massive pour votre microbiote.",
            "50% de sa composition dépend de ce que vous mangez !",
            "Le régime occidental (fast-food, sucres, graisses saturées) favorise les bactéries pro-inflammatoires.",
            "Le régime méditerranéen (légumes, poisson, huile d'olive) nourrit les bonnes bactéries et renforce la barrière intestinale."
          ],
          en: [
            "Your diet is a weapon of mass construction (or destruction) for your microbiota.",
            "50% of its composition depends on what you eat!",
            "The Western diet (fast food, sugars, saturated fats) promotes pro-inflammatory bacteria.",
            "The Mediterranean diet (vegetables, fish, olive oil) feeds good bacteria and strengthens the intestinal barrier."
          ]
        },
        questions: [
          {
            id: "mb-l3-q1-a",
            type: "single",
            question: {
              fr: "Quel pourcentage de la composition du microbiote dépend de l'alimentation ?",
              en: "What percentage of the microbiota's composition depends on diet?"
            },
            options: {
              fr: ["10%", "25%", "50%", "90%"],
              en: ["10%", "25%", "50%", "90%"]
            },
            correctIndex: 2,
            explanation: {
              fr: "Environ 50% de la composition du microbiote est influencée par l'alimentation — votre assiette a un vrai pouvoir !",
              en: "About 50% of the microbiota's composition is influenced by diet — your plate has real power!"
            }
          },
          {
            id: "mb-l3-q2-a",
            type: "single",
            question: {
              fr: "Quel repas fait fuir les 'méchantes' bactéries ?",
              en: "Which meal scares away the 'bad' bacteria?"
            },
            options: {
              fr: ["🍔 Burger + frites + soda", "🥗 Salade + poisson + huile d'olive", "🍕 Pizza + glace", "🌭 Hot-dog + ketchup"],
              en: ["🍔 Burger + fries + soda", "🥗 Salad + fish + olive oil", "🍕 Pizza + ice cream", "🌭 Hot dog + ketchup"]
            },
            correctIndex: 1,
            explanation: {
              fr: "Le repas méditerranéen (salade, poisson, huile d'olive) nourrit les bonnes bactéries et fait fuir les pro-inflammatoires !",
              en: "The Mediterranean meal (salad, fish, olive oil) feeds good bacteria and scares away the pro-inflammatory ones!"
            }
          },
          {
            id: "mb-l3-q3-a",
            type: "multi",
            question: {
              fr: "Quels aliments favorisent les bactéries pro-inflammatoires ?",
              en: "Which foods promote pro-inflammatory bacteria?"
            },
            multiOptions: {
              fr: ["🍟 Frites", "🥦 Brocoli", "🍩 Beignets", "🐟 Sardines", "🍬 Bonbons"],
              en: ["🍟 Fries", "🥦 Broccoli", "🍩 Donuts", "🐟 Sardines", "🍬 Candy"]
            },
            correctIndices: [0, 2, 4],
            explanation: {
              fr: "Les frites, beignets et bonbons sont des aliments ultra-transformés qui nourrissent les bactéries pro-inflammatoires. Le brocoli et les sardines font l'inverse !",
              en: "Fries, donuts and candy are ultra-processed foods that feed pro-inflammatory bacteria. Broccoli and sardines do the opposite!"
            }
          },
          {
            id: "mb-l3-q4-a",
            type: "single",
            question: {
              fr: "La dysbiose, c'est :",
              en: "Dysbiosis is:"
            },
            options: {
              fr: ["Un déséquilibre du microbiote", "Une maladie rare", "Un type de régime", "Un complément alimentaire"],
              en: ["An imbalance of the microbiota", "A rare disease", "A type of diet", "A dietary supplement"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La dysbiose est un déséquilibre dans la composition du microbiote, souvent causé par une alimentation inadaptée.",
              en: "Dysbiosis is an imbalance in the microbiota's composition, often caused by an inadequate diet."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Pensez à votre intestin comme un jardin :",
            "🥗 Le régime méditerranéen = engrais naturel pour vos bonnes plantes (bactéries).",
            "🍔 Le régime occidental = désherbant qui laisse pousser les mauvaises herbes (bactéries inflammatoires).",
            "La dysbiose, c'est quand les mauvaises herbes envahissent votre jardin intestinal."
          ],
          en: [
            "Think of your intestine as a garden:",
            "🥗 The Mediterranean diet = natural fertilizer for your good plants (bacteria).",
            "🍔 The Western diet = weed killer that lets weeds grow (inflammatory bacteria).",
            "Dysbiosis is when weeds take over your intestinal garden."
          ]
        },
        questions: [
          {
            id: "mb-l3-q1-b",
            type: "single",
            question: {
              fr: "Le régime méditerranéen agit comme :",
              en: "The Mediterranean diet acts as:"
            },
            options: {
              fr: ["Un engrais pour les bonnes bactéries", "Un poison pour l'intestin", "Un désherbant"],
              en: ["Fertilizer for good bacteria", "Poison for the intestine", "A weed killer"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le régime méditerranéen nourrit les bonnes bactéries comme un engrais naturel nourrit un jardin !",
              en: "The Mediterranean diet feeds good bacteria like natural fertilizer feeds a garden!"
            }
          },
          {
            id: "mb-l3-q2-b",
            type: "single",
            question: {
              fr: "La dysbiose, c'est quand :",
              en: "Dysbiosis is when:"
            },
            options: {
              fr: ["Les mauvaises bactéries dominent", "Tout est en équilibre", "On mange trop de légumes"],
              en: ["Bad bacteria dominate", "Everything is in balance", "You eat too many vegetables"]
            },
            correctIndex: 0,
            explanation: {
              fr: "La dysbiose se produit quand les mauvaises bactéries prennent le dessus — comme des mauvaises herbes dans un jardin.",
              en: "Dysbiosis occurs when bad bacteria take over — like weeds in a garden."
            }
          },
          {
            id: "mb-l3-q3-b",
            type: "association",
            question: {
              fr: "Associez chaque régime à son effet :",
              en: "Match each diet to its effect:"
            },
            associations: {
              pairs: [
                { left: "🥗 Méditerranéen", right: "Bonnes bactéries" },
                { left: "🍔 Occidental", right: "Mauvaises bactéries" }
              ]
            },
            explanation: {
              fr: "Le régime méditerranéen favorise les bonnes bactéries, le régime occidental favorise les inflammatoires.",
              en: "The Mediterranean diet promotes good bacteria, the Western diet promotes inflammatory ones."
            }
          },
          {
            id: "mb-l3-q4-b",
            type: "single",
            question: {
              fr: "Quel % du microbiote dépend de l'alimentation ?",
              en: "What % of the microbiota depends on diet?"
            },
            options: {
              fr: ["50%", "10%", "90%"],
              en: ["50%", "10%", "90%"]
            },
            correctIndex: 0,
            explanation: {
              fr: "50% de la composition de votre microbiote est directement influencée par ce que vous mangez.",
              en: "50% of your microbiota's composition is directly influenced by what you eat."
            }
          }
        ]
      }
    }
  },
  // LEVEL 4 — Le téléphone intestin-cerveau
  {
    level: 4,
    title: { fr: "Le téléphone intestin-cerveau", en: "The Gut-Brain Phone" },
    subtitle: { fr: "Vos bactéries parlent à votre cerveau", en: "Your bacteria talk to your brain" },
    readingTime: 16,
    versions: {
      A: {
        text: {
          fr: [
            "Vos bactéries envoient des SMS à votre cerveau via le nerf vague et des molécules messagères.",
            "'Plus de tryptophane, svp !' → sérotonine (l'hormone du bien-être).",
            "'La barrière est fragilisée !' → inflammation en approche.",
            "Les acides gras à chaîne courte (AGCC), produits par les bonnes bactéries, servent de carburant aux cellules intestinales et protègent la barrière.",
            "Le régime méditerranéen ? Le meilleur forfait mobile pour votre axe intestin-cerveau !"
          ],
          en: [
            "Your bacteria send texts to your brain via the vagus nerve and messenger molecules.",
            "'More tryptophan please!' → serotonin (the well-being hormone).",
            "'The barrier is weakened!' → inflammation approaching.",
            "Short-chain fatty acids (SCFAs), produced by good bacteria, fuel intestinal cells and protect the barrier.",
            "The Mediterranean diet? The best mobile plan for your gut-brain axis!"
          ]
        },
        questions: [
          {
            id: "mb-l4-q1-a",
            type: "single",
            question: {
              fr: "Complétez : 'Les acides gras à chaîne courte sont comme…'",
              en: "Complete: 'Short-chain fatty acids are like…'"
            },
            options: {
              fr: ["⛽ Du carburant pour vos cellules intestinales", "🧱 Des briques pour votre mur intestinal", "💋 Des bisous pour vos bactéries", "🚨 Des alarmes anti-inflammation"],
              en: ["⛽ Fuel for your intestinal cells", "🧱 Bricks for your intestinal wall", "💋 Kisses for your bacteria", "🚨 Anti-inflammation alarms"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Les AGCC sont le carburant principal des cellules de la paroi intestinale (colonocytes). Ils nourrissent et protègent la barrière !",
              en: "SCFAs are the main fuel for intestinal wall cells (colonocytes). They nourish and protect the barrier!"
            }
          },
          {
            id: "mb-l4-q2-a",
            type: "single",
            question: {
              fr: "Le tryptophane est un précurseur de :",
              en: "Tryptophan is a precursor of:"
            },
            options: {
              fr: ["La sérotonine", "L'adrénaline", "L'insuline", "Le cholestérol"],
              en: ["Serotonin", "Adrenaline", "Insulin", "Cholesterol"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le tryptophane est transformé en sérotonine, l'hormone du bien-être. Et 95% de la sérotonine est produite dans l'intestin !",
              en: "Tryptophan is converted into serotonin, the well-being hormone. And 95% of serotonin is produced in the gut!"
            }
          },
          {
            id: "mb-l4-q3-a",
            type: "single",
            question: {
              fr: "Par quel 'câble' principal les bactéries communiquent-elles avec le cerveau ?",
              en: "Through which main 'cable' do bacteria communicate with the brain?"
            },
            options: {
              fr: ["Le nerf vague", "La moelle épinière", "Les artères", "Les os"],
              en: ["The vagus nerve", "The spinal cord", "The arteries", "The bones"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le nerf vague est l'autoroute de communication entre l'intestin et le cerveau — un véritable câble biologique !",
              en: "The vagus nerve is the communication highway between the gut and the brain — a true biological cable!"
            }
          },
          {
            id: "mb-l4-q4-a",
            type: "multi",
            question: {
              fr: "Que produisent les bonnes bactéries intestinales ?",
              en: "What do good intestinal bacteria produce?"
            },
            multiOptions: {
              fr: ["Acides gras à chaîne courte", "Vitamines (B, K)", "Neurotransmetteurs", "Graisses saturées"],
              en: ["Short-chain fatty acids", "Vitamins (B, K)", "Neurotransmitters", "Saturated fats"]
            },
            correctIndices: [0, 1, 2],
            explanation: {
              fr: "Les bonnes bactéries produisent des AGCC, des vitamines (B, K) et participent à la production de neurotransmetteurs. Pas de graisses saturées !",
              en: "Good bacteria produce SCFAs, vitamins (B, K) and participate in neurotransmitter production. No saturated fats!"
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "L'axe intestin-cerveau, en résumé :",
            "📱 Vos bactéries « appellent » votre cerveau via le nerf vague.",
            "🍽️ Ce que vous mangez change le contenu des messages : inflammation OU bien-être.",
            "🧠 La sérotonine (hormone du bonheur) est fabriquée à 95% dans votre intestin !"
          ],
          en: [
            "The gut-brain axis, in summary:",
            "📱 Your bacteria 'call' your brain via the vagus nerve.",
            "🍽️ What you eat changes the message content: inflammation OR well-being.",
            "🧠 Serotonin (the happiness hormone) is 95% made in your gut!"
          ]
        },
        questions: [
          {
            id: "mb-l4-q1-b",
            type: "single",
            question: {
              fr: "Où est produite 95% de la sérotonine ?",
              en: "Where is 95% of serotonin produced?"
            },
            options: {
              fr: ["Dans l'intestin", "Dans le cerveau", "Dans le foie"],
              en: ["In the gut", "In the brain", "In the liver"]
            },
            correctIndex: 0,
            explanation: {
              fr: "95% de la sérotonine est produite dans l'intestin — votre « deuxième cerveau » !",
              en: "95% of serotonin is produced in the gut — your 'second brain'!"
            }
          },
          {
            id: "mb-l4-q2-b",
            type: "single",
            question: {
              fr: "Le nerf vague relie :",
              en: "The vagus nerve connects:"
            },
            options: {
              fr: ["L'intestin au cerveau", "Les poumons au cœur", "Les reins au foie"],
              en: ["The gut to the brain", "The lungs to the heart", "The kidneys to the liver"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Le nerf vague est la ligne directe entre votre intestin et votre cerveau.",
              en: "The vagus nerve is the direct line between your gut and your brain."
            }
          },
          {
            id: "mb-l4-q3-b",
            type: "single",
            question: {
              fr: "Ce que vous mangez influence les messages envoyés au cerveau. Vrai ou faux ?",
              en: "What you eat influences the messages sent to the brain. True or false?"
            },
            options: {
              fr: ["Vrai", "Faux"],
              en: ["True", "False"]
            },
            correctIndex: 0,
            explanation: {
              fr: "Absolument vrai ! Votre alimentation modifie la composition du microbiote et donc les messages envoyés au cerveau.",
              en: "Absolutely true! Your diet modifies the microbiota's composition and therefore the messages sent to the brain."
            }
          },
          {
            id: "mb-l4-q4-b",
            type: "association",
            question: {
              fr: "Associez chaque élément à sa fonction :",
              en: "Match each element to its function:"
            },
            associations: {
              pairs: [
                { left: "🧠 Sérotonine", right: "Bien-être" },
                { left: "⛽ AGCC", right: "Carburant intestinal" }
              ]
            },
            explanation: {
              fr: "La sérotonine est l'hormone du bien-être, les AGCC sont le carburant des cellules intestinales.",
              en: "Serotonin is the well-being hormone, SCFAs are the fuel for intestinal cells."
            }
          }
        ]
      }
    }
  }
];

export const microbioteUiTexts = {
  back: { fr: "Retour", en: "Back" },
  start: { fr: "Commencer le safari", en: "Start the safari" },
  readingPhase: { fr: "📖 Lisez et mémorisez", en: "📖 Read and memorize" },
  readingTimer: { fr: "Temps de lecture", en: "Reading time" },
  questionPhase: { fr: "Question", en: "Question" },
  validate: { fr: "Valider", en: "Validate" },
  correct: { fr: "Correct ! 🦠✨", en: "Correct! 🦠✨" },
  incorrect: { fr: "Pas tout à fait...", en: "Not quite..." },
  perfectLevel: { fr: "Niveau validé ! 🎉", en: "Level validated! 🎉" },
  retryMessage: { fr: "Un niveau correctif va vous aider à consolider ce point.", en: "A corrective level will help you consolidate this point." },
  nextLevel: { fr: "Niveau suivant", en: "Next level" },
  retry: { fr: "Niveau correctif", en: "Corrective level" },
  finalTitle: { fr: "🧠 Safari terminé !", en: "🧠 Safari complete!" },
  finalMessage: { 
    fr: "Bravo, explorateur·rice ! Vous avez traversé la jungle microbienne avec brio.\n\nVous savez maintenant distinguer microbiote, microbiome et métagénome. Vous connaissez la guerre secrète entre commensales et opportunistes. Vous comprenez le pouvoir de votre assiette sur votre écosystème intérieur. Et vous avez découvert le téléphone intestin-cerveau !\n\n🌱 Prenez soin de vos 100 000 milliards d'alliés — ils vous le rendront bien.\n\n👉 Un·e naturopathe peut vous aider à personnaliser votre alimentation pour chouchouter votre microbiote.", 
    en: "Congratulations, explorer! You've navigated the microbial jungle brilliantly.\n\nYou now know the difference between microbiota, microbiome and metagenome. You understand the secret war between commensals and opportunists. You grasp the power of your plate over your inner ecosystem. And you've discovered the gut-brain phone!\n\n🌱 Take care of your 100 trillion allies — they'll return the favor.\n\n👉 A naturopath can help you personalize your diet to pamper your microbiota." 
  },
  selectAll: { fr: "Sélectionnez toutes les bonnes réponses", en: "Select all correct answers" },
  matchItems: { fr: "Associez chaque élément", en: "Match each item" },
  levelProgress: { fr: "Niveau", en: "Level" },
  errorCount0: { fr: "Bravo, apprenti·e microbiologiste ! 🦠", en: "Well done, apprentice microbiologist! 🦠" },
  errorCount1: { fr: "Psst… Voici un indice en image !", en: "Psst… Here's a visual hint!" },
  errorCount2: { fr: "On reprend avec des images plus simples !", en: "Let's try again with simpler images!" },
};
