export type Language = 'fr' | 'en';

export interface Question {
  id: number;
  question: { fr: string; en: string };
  options: { fr: string[]; en: string[] };
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  level: 1 | 2 | 3;
  title: { fr: string; en: string };
  category: { fr: string; en: string };
  discount: string;
  icon: 'molecule' | 'plant' | 'music' | 'biology';
  questions: Question[];
}

export const quizzes: Quiz[] = [
  // Niveau 1
  {
    id: '1.1',
    level: 1,
    title: { fr: 'Quiz 1.1 - Micronutrition', en: 'Quiz 1.1 - Micronutrition' },
    category: { fr: 'Micronutrition', en: 'Micronutrition' },
    discount: '5%',
    icon: 'molecule',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Quel est le rôle principal de la vitamine D dans l\'organisme ?',
          en: 'What is the main role of vitamin D in the body?'
        },
        options: {
          fr: ['Renforcer les os', 'Améliorer la vue', 'Favoriser la digestion', 'Augmenter l\'énergie'],
          en: ['Strengthen bones', 'Improve vision', 'Aid digestion', 'Increase energy']
        },
        correctAnswer: 0,
      },
      {
        id: 2,
        question: { 
          fr: 'Quel minéral est essentiel pour le bon fonctionnement de la thyroïde ?',
          en: 'Which mineral is essential for proper thyroid function?'
        },
        options: {
          fr: ['Fer', 'Iode', 'Calcium', 'Zinc'],
          en: ['Iron', 'Iodine', 'Calcium', 'Zinc']
        },
        correctAnswer: 1,
      },
      {
        id: 3,
        question: { 
          fr: 'Quelle vitamine est principalement connue pour son rôle antioxydant ?',
          en: 'Which vitamin is mainly known for its antioxidant role?'
        },
        options: {
          fr: ['Vitamine A', 'Vitamine B12', 'Vitamine C', 'Vitamine K'],
          en: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin K']
        },
        correctAnswer: 2,
      },
      {
        id: 4,
        question: { 
          fr: 'Quel acide gras est considéré comme essentiel pour le cerveau ?',
          en: 'Which fatty acid is considered essential for the brain?'
        },
        options: {
          fr: ['Acide oléique', 'Oméga-3 (DHA)', 'Acide palmitique', 'Acide laurique'],
          en: ['Oleic acid', 'Omega-3 (DHA)', 'Palmitic acid', 'Lauric acid']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Quelle carence en micronutriment est la plus répandue dans le monde ?',
          en: 'Which micronutrient deficiency is most common worldwide?'
        },
        options: {
          fr: ['Vitamine C', 'Fer', 'Magnésium', 'Vitamine B6'],
          en: ['Vitamin C', 'Iron', 'Magnesium', 'Vitamin B6']
        },
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '1.2',
    level: 1,
    title: { fr: 'Quiz 1.2 - Biologie', en: 'Quiz 1.2 - Biology' },
    category: { fr: 'Biologie', en: 'Biology' },
    discount: '5%',
    icon: 'biology',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Quel organe produit l\'insuline ?',
          en: 'Which organ produces insulin?'
        },
        options: {
          fr: ['Foie', 'Pancréas', 'Reins', 'Estomac'],
          en: ['Liver', 'Pancreas', 'Kidneys', 'Stomach']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'Combien de chromosomes contient une cellule humaine normale ?',
          en: 'How many chromosomes does a normal human cell contain?'
        },
        options: {
          fr: ['23', '46', '48', '44'],
          en: ['23', '46', '48', '44']
        },
        correctAnswer: 1,
      },
      {
        id: 3,
        question: { 
          fr: 'Quel est le plus grand organe du corps humain ?',
          en: 'What is the largest organ in the human body?'
        },
        options: {
          fr: ['Le foie', 'Les poumons', 'La peau', 'Le cœur'],
          en: ['The liver', 'The lungs', 'The skin', 'The heart']
        },
        correctAnswer: 2,
      },
      {
        id: 4,
        question: { 
          fr: 'Quelle molécule transporte l\'oxygène dans le sang ?',
          en: 'Which molecule carries oxygen in the blood?'
        },
        options: {
          fr: ['Glucose', 'Hémoglobine', 'Albumine', 'Fibrinogène'],
          en: ['Glucose', 'Hemoglobin', 'Albumin', 'Fibrinogen']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Où se trouve l\'ADN dans une cellule eucaryote ?',
          en: 'Where is DNA located in a eukaryotic cell?'
        },
        options: {
          fr: ['Cytoplasme', 'Membrane', 'Noyau', 'Ribosome'],
          en: ['Cytoplasm', 'Membrane', 'Nucleus', 'Ribosome']
        },
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '1.3',
    level: 1,
    title: { fr: 'Quiz 1.3 - Plantes médicinales', en: 'Quiz 1.3 - Medicinal Plants' },
    category: { fr: 'Plantes médicinales', en: 'Medicinal Plants' },
    discount: '5%',
    icon: 'plant',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Quelle plante est traditionnellement utilisée pour améliorer le sommeil ?',
          en: 'Which plant is traditionally used to improve sleep?'
        },
        options: {
          fr: ['Ginseng', 'Valériane', 'Ginkgo', 'Échinacée'],
          en: ['Ginseng', 'Valerian', 'Ginkgo', 'Echinacea']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'Le curcuma est principalement connu pour ses propriétés :',
          en: 'Turmeric is mainly known for its properties:'
        },
        options: {
          fr: ['Laxatives', 'Anti-inflammatoires', 'Diurétiques', 'Stimulantes'],
          en: ['Laxative', 'Anti-inflammatory', 'Diuretic', 'Stimulant']
        },
        correctAnswer: 1,
      },
      {
        id: 3,
        question: { 
          fr: 'Quelle plante est souvent utilisée pour renforcer le système immunitaire ?',
          en: 'Which plant is often used to boost the immune system?'
        },
        options: {
          fr: ['Lavande', 'Échinacée', 'Camomille', 'Menthe'],
          en: ['Lavender', 'Echinacea', 'Chamomile', 'Mint']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'Le ginkgo biloba est réputé pour améliorer :',
          en: 'Ginkgo biloba is known to improve:'
        },
        options: {
          fr: ['La digestion', 'La circulation sanguine', 'Le sommeil', 'L\'appétit'],
          en: ['Digestion', 'Blood circulation', 'Sleep', 'Appetite']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Quelle partie du millepertuis est utilisée en phytothérapie ?',
          en: 'Which part of St. John\'s Wort is used in herbal medicine?'
        },
        options: {
          fr: ['Les racines', 'Les fleurs', 'Les graines', 'L\'écorce'],
          en: ['The roots', 'The flowers', 'The seeds', 'The bark']
        },
        correctAnswer: 1,
      },
    ],
  },
  // Niveau 2
  {
    id: '2.1',
    level: 2,
    title: { fr: 'Quiz 2.1 - Micronutrition', en: 'Quiz 2.1 - Micronutrition' },
    category: { fr: 'Micronutrition', en: 'Micronutrition' },
    discount: '10%',
    icon: 'molecule',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Quel cofacteur enzymatique est essentiel à plus de 300 réactions biochimiques ?',
          en: 'Which enzymatic cofactor is essential for over 300 biochemical reactions?'
        },
        options: {
          fr: ['Calcium', 'Magnésium', 'Potassium', 'Sodium'],
          en: ['Calcium', 'Magnesium', 'Potassium', 'Sodium']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'La biodisponibilité du fer non héminique est améliorée par :',
          en: 'The bioavailability of non-heme iron is improved by:'
        },
        options: {
          fr: ['Le calcium', 'La vitamine C', 'Les tanins', 'Les phytates'],
          en: ['Calcium', 'Vitamin C', 'Tannins', 'Phytates']
        },
        correctAnswer: 1,
      },
      {
        id: 3,
        question: { 
          fr: 'Quelle forme de vitamine B12 est la plus active dans l\'organisme ?',
          en: 'Which form of vitamin B12 is most active in the body?'
        },
        options: {
          fr: ['Cyanocobalamine', 'Méthylcobalamine', 'Hydroxocobalamine', 'Adénosylcobalamine'],
          en: ['Cyanocobalamin', 'Methylcobalamin', 'Hydroxocobalamin', 'Adenosylcobalamin']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'Le zinc joue un rôle crucial dans :',
          en: 'Zinc plays a crucial role in:'
        },
        options: {
          fr: ['La coagulation', 'L\'immunité', 'La vision nocturne', 'Toutes ces réponses'],
          en: ['Coagulation', 'Immunity', 'Night vision', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 5,
        question: { 
          fr: 'Quel ratio oméga-6/oméga-3 est généralement recommandé ?',
          en: 'What omega-6/omega-3 ratio is generally recommended?'
        },
        options: {
          fr: ['1:1 à 4:1', '10:1', '15:1', '20:1'],
          en: ['1:1 to 4:1', '10:1', '15:1', '20:1']
        },
        correctAnswer: 0,
      },
    ],
  },
  {
    id: '2.2',
    level: 2,
    title: { fr: 'Quiz 2.2 - Biologie', en: 'Quiz 2.2 - Biology' },
    category: { fr: 'Biologie', en: 'Biology' },
    discount: '10%',
    icon: 'biology',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Quel neurotransmetteur est principalement associé au bonheur ?',
          en: 'Which neurotransmitter is mainly associated with happiness?'
        },
        options: {
          fr: ['Dopamine', 'Sérotonine', 'Adrénaline', 'Acétylcholine'],
          en: ['Dopamine', 'Serotonin', 'Adrenaline', 'Acetylcholine']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'Le microbiote intestinal représente environ :',
          en: 'The gut microbiota represents approximately:'
        },
        options: {
          fr: ['100 millions de bactéries', '1 milliard de bactéries', '100 billions de bactéries', '1 trillion de bactéries'],
          en: ['100 million bacteria', '1 billion bacteria', '100 trillion bacteria', '1 quadrillion bacteria']
        },
        correctAnswer: 2,
      },
      {
        id: 3,
        question: { 
          fr: 'Quelle hormone régule le cycle circadien ?',
          en: 'Which hormone regulates the circadian cycle?'
        },
        options: {
          fr: ['Cortisol', 'Mélatonine', 'Insuline', 'Thyroxine'],
          en: ['Cortisol', 'Melatonin', 'Insulin', 'Thyroxine']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'L\'apoptose est :',
          en: 'Apoptosis is:'
        },
        options: {
          fr: ['La division cellulaire', 'La mort cellulaire programmée', 'La réparation de l\'ADN', 'La différenciation cellulaire'],
          en: ['Cell division', 'Programmed cell death', 'DNA repair', 'Cell differentiation']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Les télomères sont situés :',
          en: 'Telomeres are located:'
        },
        options: {
          fr: ['Au centre des chromosomes', 'Aux extrémités des chromosomes', 'Dans le cytoplasme', 'Dans les mitochondries'],
          en: ['At the center of chromosomes', 'At the ends of chromosomes', 'In the cytoplasm', 'In the mitochondria']
        },
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '2.3',
    level: 2,
    title: { fr: 'Quiz 2.3 - Musique et santé', en: 'Quiz 2.3 - Music and Health' },
    category: { fr: 'Musique et santé', en: 'Music and Health' },
    discount: '10%',
    icon: 'music',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'La musicothérapie peut aider à réduire :',
          en: 'Music therapy can help reduce:'
        },
        options: {
          fr: ['Le stress', 'La douleur', 'L\'anxiété', 'Toutes ces réponses'],
          en: ['Stress', 'Pain', 'Anxiety', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 2,
        question: { 
          fr: 'Quelle fréquence est souvent associée à la relaxation profonde ?',
          en: 'Which frequency is often associated with deep relaxation?'
        },
        options: {
          fr: ['432 Hz', '528 Hz', '639 Hz', '852 Hz'],
          en: ['432 Hz', '528 Hz', '639 Hz', '852 Hz']
        },
        correctAnswer: 0,
      },
      {
        id: 3,
        question: { 
          fr: 'L\'effet Mozart suggère que la musique classique améliore :',
          en: 'The Mozart effect suggests that classical music improves:'
        },
        options: {
          fr: ['La digestion', 'Les capacités spatiales', 'Le sommeil', 'L\'immunité'],
          en: ['Digestion', 'Spatial abilities', 'Sleep', 'Immunity']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'Quel type d\'ondes cérébrales est favorisé par la musique méditative ?',
          en: 'Which type of brain waves is promoted by meditative music?'
        },
        options: {
          fr: ['Ondes beta', 'Ondes alpha', 'Ondes gamma', 'Ondes delta'],
          en: ['Beta waves', 'Alpha waves', 'Gamma waves', 'Delta waves']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'La pratique d\'un instrument de musique stimule :',
          en: 'Playing a musical instrument stimulates:'
        },
        options: {
          fr: ['L\'hémisphère gauche', 'L\'hémisphère droit', 'Les deux hémisphères', 'Le cervelet uniquement'],
          en: ['The left hemisphere', 'The right hemisphere', 'Both hemispheres', 'Only the cerebellum']
        },
        correctAnswer: 2,
      },
    ],
  },
  // Niveau 3
  {
    id: '3.1',
    level: 3,
    title: { fr: 'Quiz 3.1 - Micronutrition avancée', en: 'Quiz 3.1 - Advanced Micronutrition' },
    category: { fr: 'Micronutrition avancée', en: 'Advanced Micronutrition' },
    discount: '15%',
    icon: 'molecule',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'Le glutathion est considéré comme :',
          en: 'Glutathione is considered as:'
        },
        options: {
          fr: ['Un pro-oxydant', 'Le maître antioxydant', 'Une hormone', 'Un neurotransmetteur'],
          en: ['A pro-oxidant', 'The master antioxidant', 'A hormone', 'A neurotransmitter']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'La NAD+ est essentielle pour :',
          en: 'NAD+ is essential for:'
        },
        options: {
          fr: ['La production d\'énergie cellulaire', 'La réparation de l\'ADN', 'Le vieillissement cellulaire', 'Toutes ces réponses'],
          en: ['Cellular energy production', 'DNA repair', 'Cellular aging', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 3,
        question: { 
          fr: 'Quel nutriment est précurseur de la mélatonine ?',
          en: 'Which nutrient is a precursor to melatonin?'
        },
        options: {
          fr: ['Tyrosine', 'Tryptophane', 'Phénylalanine', 'Leucine'],
          en: ['Tyrosine', 'Tryptophan', 'Phenylalanine', 'Leucine']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'La coenzyme Q10 joue un rôle majeur dans :',
          en: 'Coenzyme Q10 plays a major role in:'
        },
        options: {
          fr: ['La synthèse protéique', 'La chaîne respiratoire mitochondriale', 'La digestion des lipides', 'La fixation du calcium'],
          en: ['Protein synthesis', 'Mitochondrial respiratory chain', 'Lipid digestion', 'Calcium fixation']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Le sulforaphane, présent dans les crucifères, active :',
          en: 'Sulforaphane, found in cruciferous vegetables, activates:'
        },
        options: {
          fr: ['Les enzymes de phase 1', 'La voie Nrf2', 'Les cytochromes P450', 'L\'insuline'],
          en: ['Phase 1 enzymes', 'The Nrf2 pathway', 'Cytochrome P450', 'Insulin']
        },
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3.2',
    level: 3,
    title: { fr: 'Quiz 3.2 - Plantes médicinales', en: 'Quiz 3.2 - Medicinal Plants' },
    category: { fr: 'Plantes médicinales', en: 'Medicinal Plants' },
    discount: '15%',
    icon: 'plant',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'L\'ashwagandha est classée comme :',
          en: 'Ashwagandha is classified as:'
        },
        options: {
          fr: ['Un stimulant', 'Un adaptogène', 'Un sédatif', 'Un laxatif'],
          en: ['A stimulant', 'An adaptogen', 'A sedative', 'A laxative']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'La berbérine, présente dans plusieurs plantes, agit sur :',
          en: 'Berberine, found in several plants, acts on:'
        },
        options: {
          fr: ['Le métabolisme du glucose', 'La flore intestinale', 'Les lipides sanguins', 'Toutes ces réponses'],
          en: ['Glucose metabolism', 'Gut flora', 'Blood lipids', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 3,
        question: { 
          fr: 'Le Rhodiola rosea est particulièrement indiqué pour :',
          en: 'Rhodiola rosea is particularly indicated for:'
        },
        options: {
          fr: ['Les troubles digestifs', 'La fatigue et le stress', 'Les problèmes de peau', 'L\'hypertension'],
          en: ['Digestive disorders', 'Fatigue and stress', 'Skin problems', 'Hypertension']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'Les ginsénosides sont les principes actifs du :',
          en: 'Ginsenosides are the active compounds of:'
        },
        options: {
          fr: ['Ginkgo', 'Ginseng', 'Guarana', 'Gotu kola'],
          en: ['Ginkgo', 'Ginseng', 'Guarana', 'Gotu kola']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'Le bacopa monnieri est traditionnellement utilisé pour :',
          en: 'Bacopa monnieri is traditionally used for:'
        },
        options: {
          fr: ['Le sommeil', 'La mémoire et la cognition', 'La digestion', 'L\'immunité'],
          en: ['Sleep', 'Memory and cognition', 'Digestion', 'Immunity']
        },
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3.3',
    level: 3,
    title: { fr: 'Quiz 3.3 - Biologie & Musique', en: 'Quiz 3.3 - Biology & Music' },
    category: { fr: 'Biologie & Musique', en: 'Biology & Music' },
    discount: '15%',
    icon: 'music',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'L\'écoute de musique stimule la libération de :',
          en: 'Listening to music stimulates the release of:'
        },
        options: {
          fr: ['Cortisol', 'Dopamine', 'Adrénaline', 'Insuline'],
          en: ['Cortisol', 'Dopamine', 'Adrenaline', 'Insulin']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'La cohérence cardiaque peut être améliorée par :',
          en: 'Heart coherence can be improved by:'
        },
        options: {
          fr: ['La respiration synchronisée à la musique', 'Les battements binauraux', 'Le chant', 'Toutes ces réponses'],
          en: ['Breathing synchronized to music', 'Binaural beats', 'Singing', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 3,
        question: { 
          fr: 'Le nerf vague est stimulé par :',
          en: 'The vagus nerve is stimulated by:'
        },
        options: {
          fr: ['Le chant', 'Le fredonnement', 'L\'écoute de certaines fréquences', 'Toutes ces réponses'],
          en: ['Singing', 'Humming', 'Listening to certain frequencies', 'All of the above']
        },
        correctAnswer: 3,
      },
      {
        id: 4,
        question: { 
          fr: 'Les battements binauraux à 10 Hz favorisent :',
          en: 'Binaural beats at 10 Hz promote:'
        },
        options: {
          fr: ['Le sommeil profond', 'L\'état alpha (relaxation)', 'L\'état gamma (concentration)', 'L\'anxiété'],
          en: ['Deep sleep', 'Alpha state (relaxation)', 'Gamma state (concentration)', 'Anxiety']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'La synchronisation neurale par la musique améliore :',
          en: 'Neural synchronization through music improves:'
        },
        options: {
          fr: ['La coordination motrice', 'La communication inter-hémisphérique', 'L\'apprentissage', 'Toutes ces réponses'],
          en: ['Motor coordination', 'Inter-hemispheric communication', 'Learning', 'All of the above']
        },
        correctAnswer: 3,
      },
    ],
  },
  {
    id: '3.4',
    level: 3,
    title: { fr: 'Quiz 3.4 - Biologie avancée', en: 'Quiz 3.4 - Advanced Biology' },
    category: { fr: 'Biologie', en: 'Biology' },
    discount: '15%',
    icon: 'biology',
    questions: [
      {
        id: 1,
        question: { 
          fr: 'L\'ADN mitochondrial est transmis exclusivement par :',
          en: 'Mitochondrial DNA is transmitted exclusively by:'
        },
        options: {
          fr: ['Le père', 'La mère', 'Les deux parents', 'Ni l\'un ni l\'autre'],
          en: ['The father', 'The mother', 'Both parents', 'Neither']
        },
        correctAnswer: 1,
      },
      {
        id: 2,
        question: { 
          fr: 'L\'autophagie, processus récompensé par le Prix Nobel 2016, est :',
          en: 'Autophagy, the process awarded the 2016 Nobel Prize, is:'
        },
        options: {
          fr: ['La destruction des cellules voisines', 'Le recyclage des composants cellulaires endommagés', 'La division cellulaire rapide', 'La mort cellulaire programmée'],
          en: ['The destruction of neighboring cells', 'The recycling of damaged cellular components', 'Rapid cell division', 'Programmed cell death']
        },
        correctAnswer: 1,
      },
      {
        id: 3,
        question: { 
          fr: 'La télomérase est une enzyme qui :',
          en: 'Telomerase is an enzyme that:'
        },
        options: {
          fr: ['Raccourcit les télomères', 'Allonge les télomères', 'Détruit les chromosomes', 'Répare les mutations génétiques'],
          en: ['Shortens telomeres', 'Lengthens telomeres', 'Destroys chromosomes', 'Repairs genetic mutations']
        },
        correctAnswer: 1,
      },
      {
        id: 4,
        question: { 
          fr: 'La méthylation de l\'ADN est un mécanisme épigénétique qui :',
          en: 'DNA methylation is an epigenetic mechanism that:'
        },
        options: {
          fr: ['Modifie la séquence d\'ADN', 'Régule l\'expression des gènes sans modifier la séquence', 'Augmente le nombre de chromosomes', 'Provoque des mutations'],
          en: ['Modifies the DNA sequence', 'Regulates gene expression without modifying the sequence', 'Increases the number of chromosomes', 'Causes mutations']
        },
        correctAnswer: 1,
      },
      {
        id: 5,
        question: { 
          fr: 'CRISPR-Cas9, récompensé par le Prix Nobel 2020, fonctionne comme :',
          en: 'CRISPR-Cas9, awarded the 2020 Nobel Prize, works as:'
        },
        options: {
          fr: ['Un microscope moléculaire', 'Des ciseaux moléculaires pour l\'ADN', 'Un amplificateur de gènes', 'Un vaccin génétique'],
          en: ['A molecular microscope', 'Molecular scissors for DNA', 'A gene amplifier', 'A genetic vaccine']
        },
        correctAnswer: 1,
      },
    ],
  },
];

export const translations = {
  fr: {
    title: 'Quiz Santé & Bien-être',
    subtitle: 'Testez vos connaissances et votre mémoire.',
    discountInfo: 'Répondez correctement pour débloquer des réductions.',
    warning: 'Attention, vous ne pouvez jouer qu\'une fois à chaque quiz avec votre adresse mail.',
    switchLang: 'English version',
    level: 'Niveau',
    discount: 'de réduction',
    play: 'Jouer',
    visitShop: 'Visiter la boutique',
    question: 'Question',
    of: 'sur',
    next: 'Suivant',
    seeResults: 'Voir les résultats',
    congratulations: 'Félicitations !',
    score: 'Votre score',
    correct: 'Bonne réponse !',
    incorrect: 'Mauvaise réponse',
    discountCode: 'Votre code de réduction',
    copyCode: 'Copier le code',
    codeCopied: 'Code copié !',
    backToQuizzes: 'Retour aux quiz',
    enterEmail: 'Entrez votre email pour jouer',
    emailPlaceholder: 'votre@email.com',
    startQuiz: 'Commencer le quiz',
    invalidEmail: 'Email invalide',
    perfectScore: 'Score parfait ! 🎉',
    goodScore: 'Excellent travail ! 🌟',
    mediumScore: 'Bien joué ! 👍',
    lowScore: 'Continuez à apprendre ! 💪',
  },
  en: {
    title: 'Health & Wellness Quiz',
    subtitle: 'Test your knowledge and memory.',
    discountInfo: 'Answer correctly to unlock discounts.',
    warning: 'Please note, you can only play each quiz once with your email address.',
    switchLang: '🇫🇷 Version française',
    level: 'Level',
    discount: 'discount',
    play: 'Play',
    visitShop: 'Visit the shop',
    question: 'Question',
    of: 'of',
    next: 'Next',
    seeResults: 'See Results',
    congratulations: 'Congratulations!',
    score: 'Your score',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    discountCode: 'Your discount code',
    copyCode: 'Copy code',
    codeCopied: 'Code copied!',
    backToQuizzes: 'Back to quizzes',
    enterEmail: 'Enter your email to play',
    emailPlaceholder: 'your@email.com',
    startQuiz: 'Start quiz',
    invalidEmail: 'Invalid email',
    perfectScore: 'Perfect score! 🎉',
    goodScore: 'Excellent work! 🌟',
    mediumScore: 'Well done! 👍',
    lowScore: 'Keep learning! 💪',
  },
};
