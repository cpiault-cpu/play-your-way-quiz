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
      {/* Hero Section with background image only */}
      <section className="hero-section" />

      {/* Logo and text content below the background image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 py-8 text-center"
      >
        <a href="https://www.peita.fr" target="_blank" rel="noopener noreferrer" className="inline-block mb-6">
          <img 
            src="/images/peita-logo.png" 
            alt="PEITA Logo" 
            className="h-12 md:h-14 object-contain mx-auto"
          />
        </a>

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <span>{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
            {t.title}
          </h1>
          <p className="text-base md:text-xl text-foreground/90 mb-3">
            {t.subtitle}
          </p>
          <p className="text-sm md:text-lg text-foreground/80 mb-3">
            {t.discountInfo}
          </p>
          <p className="text-sm md:text-base text-foreground/70 italic mb-6">
            {t.warning}
          </p>

          <button
            onClick={handleToggleLanguage}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-base md:text-lg rounded-full bg-primary/20 border border-primary/30 text-foreground hover:bg-primary/30 transition-colors"
          >
            {language === "fr" ? "🇬🇧" : "🇫🇷"} {t.switchLang}
          </button>
        </div>
      </motion.div>

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
