import { Language } from "@/data/quizData";

export interface SardinesQuestion {
  question: {
    fr: string;
    en: string;
  };
  options: {
    fr: string[];
    en: string[];
  };
  correctIndex: number;
  confusionHint: {
    fr: string;
    en: string;
  };
  explanation: {
    fr: string;
    en: string;
  };
}

export interface SardinesVersion {
  text: {
    fr: string[];
    en: string[];
  };
  questions: SardinesQuestion[];
}

export interface SardinesLevel {
  level: 1 | 2 | 3 | 4;
  title: {
    fr: string;
    en: string;
  };
  subtitle: {
    fr: string;
    en: string;
  };
  color: string;
  versions: {
    A: SardinesVersion;
    B: SardinesVersion;
  };
}

export const sardinesLevels: SardinesLevel[] = [
  {
    level: 1,
    title: {
      fr: "Fondations",
      en: "Foundations"
    },
    subtitle: {
      fr: "Découvrez les bases nutritionnelles de la sardine",
      en: "Discover the nutritional basics of sardines"
    },
    color: "#A8E6CF",
    versions: {
      A: {
        text: {
          fr: [
            "La petite sardine est plus riche en lipides lorsqu'elle est pêchée en été, ce qui signifie une meilleure concentration en oméga-3.",
            "Sur les côtes atlantiques, la période idéale s'étend de juin à novembre.",
            "Cette variation saisonnière influence directement sa valeur nutritionnelle."
          ],
          en: [
            "The little sardine is richer in lipids when caught in summer, which means a better concentration of omega-3.",
            "On the Atlantic coasts, the ideal period extends from June to November.",
            "This seasonal variation directly influences its nutritional value."
          ]
        },
        questions: [
          {
            question: {
              fr: "La sardine contient le plus d'oméga-3 en :",
              en: "Sardines contain the most omega-3 in:"
            },
            options: {
              fr: ["Hiver", "Printemps", "Été"],
              en: ["Winter", "Spring", "Summer"]
            },
            correctIndex: 2,
            confusionHint: {
              fr: "La saison influence la teneur en lipides de la sardine.",
              en: "The season influences the lipid content of sardines."
            },
            explanation: {
              fr: "En été, la sardine accumule des réserves lipidiques riches en oméga-3.",
              en: "In summer, sardines accumulate lipid reserves rich in omega-3."
            }
          },
          {
            question: {
              fr: "La meilleure période de pêche sur l'Atlantique est :",
              en: "The best fishing period on the Atlantic is:"
            },
            options: {
              fr: ["Juin à novembre", "Janvier à mars", "Toute l'année"],
              en: ["June to November", "January to March", "All year round"]
            },
            correctIndex: 0,
            confusionHint: {
              fr: "La période de pêche optimale correspond aux mois chauds.",
              en: "The optimal fishing period corresponds to the warm months."
            },
            explanation: {
              fr: "De juin à novembre, les sardines sont les plus grasses et nutritives.",
              en: "From June to November, sardines are the fattest and most nutritious."
            }
          },
          {
            question: {
              fr: "Une sardine plus grasse signifie généralement :",
              en: "A fattier sardine generally means:"
            },
            options: {
              fr: ["Moins nutritive", "Plus riche en oméga-3", "Impossible à digérer"],
              en: ["Less nutritious", "Richer in omega-3", "Impossible to digest"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "❌ Idée reçue : plus de lipides ne veut pas dire moins sain.",
              en: "❌ Misconception: more lipids doesn't mean less healthy."
            },
            explanation: {
              fr: "Les lipides de la sardine sont principalement des oméga-3 bénéfiques.",
              en: "Sardine lipids are mainly beneficial omega-3s."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "En été, la sardine accumule des réserves lipidiques riches en oméga-3.",
            "Cette phase correspond à sa meilleure densité nutritionnelle.",
            "La saison de pêche devient donc un véritable indicateur de qualité."
          ],
          en: [
            "In summer, sardines accumulate lipid reserves rich in omega-3.",
            "This phase corresponds to their best nutritional density.",
            "The fishing season thus becomes a true quality indicator."
          ]
        },
        questions: [
          {
            question: {
              fr: "Quand la sardine accumule-t-elle le plus de réserves lipidiques ?",
              en: "When do sardines accumulate the most lipid reserves?"
            },
            options: {
              fr: ["En hiver", "En été", "Au printemps"],
              en: ["In winter", "In summer", "In spring"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "La saison chaude favorise l'accumulation de lipides.",
              en: "The warm season promotes lipid accumulation."
            },
            explanation: {
              fr: "L'été est la période où la sardine est la plus grasse.",
              en: "Summer is when sardines are the fattest."
            }
          },
          {
            question: {
              fr: "La saison de pêche est un indicateur de :",
              en: "The fishing season is an indicator of:"
            },
            options: {
              fr: ["Qualité", "Taille", "Couleur"],
              en: ["Quality", "Size", "Color"]
            },
            correctIndex: 0,
            confusionHint: {
              fr: "La période de pêche influence la valeur nutritionnelle.",
              en: "The fishing period influences nutritional value."
            },
            explanation: {
              fr: "Une sardine pêchée en saison est plus riche en nutriments.",
              en: "A sardine caught in season is richer in nutrients."
            }
          },
          {
            question: {
              fr: "La meilleure densité nutritionnelle de la sardine correspond à :",
              en: "The best nutritional density of sardines corresponds to:"
            },
            options: {
              fr: ["La période hivernale", "La phase d'accumulation des lipides", "La période de reproduction"],
              en: ["The winter period", "The lipid accumulation phase", "The reproduction period"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Les lipides sont synonymes de richesse en oméga-3.",
              en: "Lipids are synonymous with omega-3 richness."
            },
            explanation: {
              fr: "L'accumulation de lipides en été maximise la valeur nutritionnelle.",
              en: "Lipid accumulation in summer maximizes nutritional value."
            }
          }
        ]
      }
    }
  },
  {
    level: 2,
    title: {
      fr: "Conservation intelligente",
      en: "Smart Conservation"
    },
    subtitle: {
      fr: "Apprenez à préserver les bienfaits",
      en: "Learn to preserve the benefits"
    },
    color: "#FFD3B6",
    versions: {
      A: {
        text: {
          fr: [
            "Pour préserver les oméga-3, la sardine doit cuire à température douce et ne surtout pas être frite.",
            "Ces acides gras sont sensibles aux fortes chaleurs.",
            "Une huile d'olive de qualité aide à les protéger de l'oxydation."
          ],
          en: [
            "To preserve omega-3s, sardines should be cooked at low temperatures and definitely not fried.",
            "These fatty acids are sensitive to high heat.",
            "Quality olive oil helps protect them from oxidation."
          ]
        },
        questions: [
          {
            question: {
              fr: "Avant la mise en conserve, la sardine devrait être :",
              en: "Before canning, sardines should be:"
            },
            options: {
              fr: ["Frite", "Cuite doucement", "Grillée à très haute température"],
              en: ["Fried", "Gently cooked", "Grilled at very high temperature"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "❌ Les oméga-3 ne sont pas fans des températures extrêmes.",
              en: "❌ Omega-3s are not fans of extreme temperatures."
            },
            explanation: {
              fr: "La cuisson douce préserve les acides gras essentiels.",
              en: "Gentle cooking preserves essential fatty acids."
            }
          },
          {
            question: {
              fr: "L'huile la plus protectrice pour les oméga-3 est généralement :",
              en: "The most protective oil for omega-3s is generally:"
            },
            options: {
              fr: ["L'huile d'olive", "L'huile de tournesol", "N'importe quelle huile"],
              en: ["Olive oil", "Sunflower oil", "Any oil"]
            },
            correctIndex: 0,
            confusionHint: {
              fr: "Toutes les huiles n'ont pas les mêmes propriétés antioxydantes.",
              en: "Not all oils have the same antioxidant properties."
            },
            explanation: {
              fr: "L'huile d'olive contient des antioxydants naturels protecteurs.",
              en: "Olive oil contains natural protective antioxidants."
            }
          },
          {
            question: {
              fr: "Les oméga-3 sont sensibles :",
              en: "Omega-3s are sensitive to:"
            },
            options: {
              fr: ["Au froid", "Aux fortes chaleurs", "À l'obscurité"],
              en: ["Cold", "High heat", "Darkness"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "La chaleur excessive dégrade les acides gras.",
              en: "Excessive heat degrades fatty acids."
            },
            explanation: {
              fr: "Les hautes températures oxydent et détruisent les oméga-3.",
              en: "High temperatures oxidize and destroy omega-3s."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "La friture est l'ennemie des oméga-3 : elle les détruit par oxydation.",
            "Privilégier une cuisson douce permet de conserver leurs bienfaits.",
            "L'huile d'olive, riche en antioxydants, forme un bouclier protecteur."
          ],
          en: [
            "Frying is the enemy of omega-3s: it destroys them through oxidation.",
            "Preferring gentle cooking helps preserve their benefits.",
            "Olive oil, rich in antioxidants, forms a protective shield."
          ]
        },
        questions: [
          {
            question: {
              fr: "Quel mode de cuisson détruit les oméga-3 ?",
              en: "Which cooking method destroys omega-3s?"
            },
            options: {
              fr: ["La cuisson vapeur", "La friture", "La cuisson à basse température"],
              en: ["Steaming", "Frying", "Low temperature cooking"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Les températures extrêmes sont à éviter.",
              en: "Extreme temperatures should be avoided."
            },
            explanation: {
              fr: "La friture oxyde et dégrade les oméga-3.",
              en: "Frying oxidizes and degrades omega-3s."
            }
          },
          {
            question: {
              fr: "L'huile d'olive protège les oméga-3 grâce à :",
              en: "Olive oil protects omega-3s thanks to:"
            },
            options: {
              fr: ["Sa couleur", "Ses antioxydants", "Son goût"],
              en: ["Its color", "Its antioxidants", "Its taste"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Les antioxydants combattent l'oxydation.",
              en: "Antioxidants fight oxidation."
            },
            explanation: {
              fr: "Les antioxydants de l'huile d'olive créent un bouclier protecteur.",
              en: "Olive oil antioxidants create a protective shield."
            }
          },
          {
            question: {
              fr: "Pour préserver les bienfaits de la sardine, il faut :",
              en: "To preserve sardine benefits, you should:"
            },
            options: {
              fr: ["La cuire à haute température", "Privilégier une cuisson douce", "La congeler crue"],
              en: ["Cook it at high temperature", "Prefer gentle cooking", "Freeze it raw"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "La douceur préserve les nutriments.",
              en: "Gentleness preserves nutrients."
            },
            explanation: {
              fr: "La cuisson douce conserve les oméga-3 intacts.",
              en: "Gentle cooking keeps omega-3s intact."
            }
          }
        ]
      }
    }
  },
  {
    level: 3,
    title: {
      fr: "Maîtrise nutritionnelle",
      en: "Nutritional Mastery"
    },
    subtitle: {
      fr: "Approfondissez vos connaissances",
      en: "Deepen your knowledge"
    },
    color: "#B5EAD7",
    versions: {
      A: {
        text: {
          fr: [
            "Les sardines apportent naturellement EPA et DHA, deux oméga-3 complémentaires.",
            "Un équilibre proche de 1:1 est le plus souvent considéré comme harmonieux.",
            "La vitamine E protège ces lipides de l'oxydation, tandis que la vitamine D agit en synergie avec eux."
          ],
          en: [
            "Sardines naturally provide EPA and DHA, two complementary omega-3s.",
            "A balance close to 1:1 is most often considered harmonious.",
            "Vitamin E protects these lipids from oxidation, while vitamin D acts in synergy with them."
          ]
        },
        questions: [
          {
            question: {
              fr: "Le duo d'oméga-3 des sardines est :",
              en: "The omega-3 duo in sardines is:"
            },
            options: {
              fr: ["ALA et EPA", "EPA et DHA", "DHA et ALA"],
              en: ["ALA and EPA", "EPA and DHA", "DHA and ALA"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "EPA et DHA sont les formes actives d'origine marine.",
              en: "EPA and DHA are the active forms of marine origin."
            },
            explanation: {
              fr: "EPA et DHA sont les deux oméga-3 marins les plus bénéfiques.",
              en: "EPA and DHA are the two most beneficial marine omega-3s."
            }
          },
          {
            question: {
              fr: "La vitamine qui protège les oméga-3 est surtout :",
              en: "The vitamin that mainly protects omega-3s is:"
            },
            options: {
              fr: ["Vitamine A", "Vitamine E", "Vitamine C"],
              en: ["Vitamin A", "Vitamin E", "Vitamin C"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Cette vitamine est un puissant antioxydant liposoluble.",
              en: "This vitamin is a powerful fat-soluble antioxidant."
            },
            explanation: {
              fr: "La vitamine E protège les lipides de l'oxydation.",
              en: "Vitamin E protects lipids from oxidation."
            }
          },
          {
            question: {
              fr: "Un ratio souvent considéré comme équilibré est :",
              en: "A ratio often considered balanced is:"
            },
            options: {
              fr: ["Proche de 1:1", "Proche de 10:1", "Proche de 1:10"],
              en: ["Close to 1:1", "Close to 10:1", "Close to 1:10"]
            },
            correctIndex: 0,
            confusionHint: {
              fr: "L'équilibre entre EPA et DHA est important.",
              en: "The balance between EPA and DHA is important."
            },
            explanation: {
              fr: "Un ratio 1:1 entre EPA et DHA est considéré comme optimal.",
              en: "A 1:1 ratio between EPA and DHA is considered optimal."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "EPA et DHA sont les deux formes d'oméga-3 présentes dans les sardines.",
            "La vitamine E, antioxydant naturel, empêche leur dégradation.",
            "L'idéal est d'avoir un équilibre entre ces deux acides gras, proche de 1:1."
          ],
          en: [
            "EPA and DHA are the two forms of omega-3 found in sardines.",
            "Vitamin E, a natural antioxidant, prevents their degradation.",
            "The ideal is to have a balance between these two fatty acids, close to 1:1."
          ]
        },
        questions: [
          {
            question: {
              fr: "Les deux formes d'oméga-3 dans les sardines sont :",
              en: "The two forms of omega-3 in sardines are:"
            },
            options: {
              fr: ["Oméga-6 et oméga-9", "EPA et DHA", "Acide linoléique et ALA"],
              en: ["Omega-6 and omega-9", "EPA and DHA", "Linoleic acid and ALA"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Ces deux acides gras sont d'origine marine.",
              en: "These two fatty acids are of marine origin."
            },
            explanation: {
              fr: "EPA et DHA sont les oméga-3 spécifiques aux poissons gras.",
              en: "EPA and DHA are omega-3s specific to fatty fish."
            }
          },
          {
            question: {
              fr: "Quel antioxydant empêche la dégradation des oméga-3 ?",
              en: "Which antioxidant prevents omega-3 degradation?"
            },
            options: {
              fr: ["Le fer", "La vitamine E", "Le calcium"],
              en: ["Iron", "Vitamin E", "Calcium"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "C'est une vitamine liposoluble.",
              en: "It's a fat-soluble vitamin."
            },
            explanation: {
              fr: "La vitamine E est l'antioxydant clé pour les lipides.",
              en: "Vitamin E is the key antioxidant for lipids."
            }
          },
          {
            question: {
              fr: "L'équilibre idéal entre EPA et DHA est :",
              en: "The ideal balance between EPA and DHA is:"
            },
            options: {
              fr: ["2:1", "1:1", "5:1"],
              en: ["2:1", "1:1", "5:1"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Un équilibre harmonieux signifie des proportions égales.",
              en: "A harmonious balance means equal proportions."
            },
            explanation: {
              fr: "Le ratio 1:1 est considéré comme le plus bénéfique.",
              en: "The 1:1 ratio is considered the most beneficial."
            }
          }
        ]
      }
    }
  },
  {
    level: 4,
    title: {
      fr: "Expert",
      en: "Expert"
    },
    subtitle: {
      fr: "Au-delà des oméga-3",
      en: "Beyond omega-3s"
    },
    color: "#D4B5E8",
    versions: {
      A: {
        text: {
          fr: [
            "La petite sardine est aussi une excellente source de protéines hautement assimilables.",
            "Consommées avec leurs arêtes, elles apportent du calcium biodisponible.",
            "Elles fournissent également de la vitamine B12, du sélénium, du phosphore et naturellement de la vitamine D."
          ],
          en: [
            "The little sardine is also an excellent source of highly assimilable proteins.",
            "Eaten with their bones, they provide bioavailable calcium.",
            "They also provide vitamin B12, selenium, phosphorus and naturally vitamin D."
          ]
        },
        questions: [
          {
            question: {
              fr: "Les arêtes de sardines sont riches en :",
              en: "Sardine bones are rich in:"
            },
            options: {
              fr: ["Collagène", "Calcium", "Fibres"],
              en: ["Collagen", "Calcium", "Fiber"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Les arêtes sont une source minérale importante.",
              en: "Bones are an important mineral source."
            },
            explanation: {
              fr: "Les arêtes fournissent du calcium biodisponible.",
              en: "Bones provide bioavailable calcium."
            }
          },
          {
            question: {
              fr: "La sardine contient naturellement :",
              en: "Sardines naturally contain:"
            },
            options: {
              fr: ["Vitamine D", "Vitamine C", "Bêta-carotène"],
              en: ["Vitamin D", "Vitamin C", "Beta-carotene"]
            },
            correctIndex: 0,
            confusionHint: {
              fr: "Cette vitamine est rare dans l'alimentation.",
              en: "This vitamin is rare in food."
            },
            explanation: {
              fr: "La sardine est l'une des meilleures sources alimentaires de vitamine D.",
              en: "Sardines are one of the best dietary sources of vitamin D."
            }
          },
          {
            question: {
              fr: "La richesse en protéines de la sardine est :",
              en: "The protein richness of sardines is:"
            },
            options: {
              fr: ["Faible", "Modérée", "Élevée"],
              en: ["Low", "Moderate", "High"]
            },
            correctIndex: 2,
            confusionHint: {
              fr: "La sardine est considérée comme un aliment protéique.",
              en: "Sardines are considered a protein food."
            },
            explanation: {
              fr: "La sardine est une excellente source de protéines complètes.",
              en: "Sardines are an excellent source of complete proteins."
            }
          }
        ]
      },
      B: {
        text: {
          fr: [
            "Au-delà des oméga-3, la sardine offre des protéines de haute qualité.",
            "Ses arêtes comestibles sont une source précieuse de calcium.",
            "Elle contient aussi de la vitamine D, B12, du sélénium et du phosphore."
          ],
          en: [
            "Beyond omega-3s, sardines offer high-quality proteins.",
            "Their edible bones are a precious source of calcium.",
            "They also contain vitamin D, B12, selenium and phosphorus."
          ]
        },
        questions: [
          {
            question: {
              fr: "Quel minéral trouve-t-on dans les arêtes de sardine ?",
              en: "Which mineral is found in sardine bones?"
            },
            options: {
              fr: ["Le fer", "Le calcium", "Le magnésium"],
              en: ["Iron", "Calcium", "Magnesium"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Ce minéral est essentiel pour les os.",
              en: "This mineral is essential for bones."
            },
            explanation: {
              fr: "Le calcium des arêtes est particulièrement bien absorbé.",
              en: "Calcium from bones is particularly well absorbed."
            }
          },
          {
            question: {
              fr: "Quelle vitamine rare la sardine fournit-elle naturellement ?",
              en: "Which rare vitamin do sardines naturally provide?"
            },
            options: {
              fr: ["Vitamine K", "Vitamine D", "Vitamine B6"],
              en: ["Vitamin K", "Vitamin D", "Vitamin B6"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "Cette vitamine est souvent déficiente dans l'alimentation.",
              en: "This vitamin is often deficient in the diet."
            },
            explanation: {
              fr: "La vitamine D est naturellement présente dans les poissons gras.",
              en: "Vitamin D is naturally present in fatty fish."
            }
          },
          {
            question: {
              fr: "Les protéines de la sardine sont :",
              en: "Sardine proteins are:"
            },
            options: {
              fr: ["Difficiles à digérer", "Hautement assimilables", "Incomplètes"],
              en: ["Hard to digest", "Highly assimilable", "Incomplete"]
            },
            correctIndex: 1,
            confusionHint: {
              fr: "La qualité des protéines compte autant que la quantité.",
              en: "Protein quality matters as much as quantity."
            },
            explanation: {
              fr: "Les protéines de sardine sont facilement absorbées par l'organisme.",
              en: "Sardine proteins are easily absorbed by the body."
            }
          }
        ]
      }
    }
  }
];

export const successMessages = {
  levelComplete: {
    fr: "🐟 Excellent !\nVotre cerveau vient de capter un principe simple : la saison change la biologie.",
    en: "🐟 Excellent!\nYour brain just grasped a simple principle: season changes biology."
  },
  level2Complete: {
    fr: "🐠 Votre lecture des étiquettes devient redoutable !",
    en: "🐠 Your label reading is becoming formidable!"
  },
  level3Complete: {
    fr: "🐟 Maîtrise nutritionnelle acquise !\nVous comprenez maintenant les subtilités des oméga-3.",
    en: "🐟 Nutritional mastery achieved!\nYou now understand the subtleties of omega-3s."
  },
  finalComplete: {
    fr: "Bravo ! À bientôt pour aller plus loin, avec d'autres informations intéressantes, des combinaisons d'assiettes idéales, etc. Stay tuned :-)",
    en: "Well done! See you soon to go further, with more interesting information, ideal plate combinations, etc. Stay tuned :-)"
  },
  tryAgain: {
    fr: "Pas tout à fait... Relisez le texte reformulé et réessayez !",
    en: "Not quite... Re-read the reformulated text and try again!"
  }
};

export const uiTexts = {
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
  nextLevel: {
    fr: "Niveau suivant",
    en: "Next Level"
  },
  retry: {
    fr: "Réessayer",
    en: "Try Again"
  },
  readingPhase: {
    fr: "Mémorisez ce texte",
    en: "Memorize this text"
  },
  questionPhase: {
    fr: "Question",
    en: "Question"
  },
  readingTimer: {
    fr: "Temps de lecture",
    en: "Reading time"
  },
  corrections: {
    fr: "Vos erreurs",
    en: "Your mistakes"
  }
};
