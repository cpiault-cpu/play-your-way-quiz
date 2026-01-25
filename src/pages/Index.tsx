import { useState } from "react";
import { motion } from "framer-motion";
import { Language, quizzes, translations } from "@/data/quizData";
import Header from "@/components/brainfest/Header";
import LevelSection from "@/components/brainfest/LevelSection";
import QuizGame from "@/components/brainfest/QuizGame";

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  const t = translations[language];

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const handlePlayQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
  };

  const handleBackToHome = () => {
    setActiveQuizId(null);
  };

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  if (activeQuiz) {
    return (
      <QuizGame
        quiz={activeQuiz}
        language={language}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with background image - includes header */}
      <section className="hero-section">
        {/* Header inside hero for same background */}
        <div className="relative z-20 py-4 px-6">
          <div className="max-w-6xl mx-auto flex justify-center items-center">
            <a href="https://www.peita.fr" target="_blank" rel="noopener noreferrer">
              <img 
                src="/images/peita-logo.png" 
                alt="PEITA Logo" 
                className="h-10 md:h-12 object-contain"
              />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-6xl mx-auto px-4 pb-12 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40 shadow-lg max-w-md mx-auto">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1 flex items-center justify-center gap-2">
              <span>{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-foreground/90 mb-1">
              {t.subtitle}
            </p>
            <p className="text-xs text-foreground/80 mb-1">
              {t.discountInfo}
            </p>
            <p className="text-xs text-foreground/70 italic mb-3">
              {t.warning}
            </p>

            <button
              onClick={handleToggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 transition-colors"
            >
              {language === "fr" ? "🇬🇧" : "🇫🇷"} {t.switchLang}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quiz Levels */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <LevelSection
            level={1}
            quizzes={quizzes}
            language={language}
            onPlayQuiz={handlePlayQuiz}
          />
          <LevelSection
            level={2}
            quizzes={quizzes}
            language={language}
            onPlayQuiz={handlePlayQuiz}
          />
          <LevelSection
            level={3}
            quizzes={quizzes}
            language={language}
            onPlayQuiz={handlePlayQuiz}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
