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
    <div className="min-h-screen forest-bg">
      <Header language={language} onToggleLanguage={handleToggleLanguage} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span>{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            {t.subtitle}
          </p>
          <p className="text-md text-muted-foreground mb-2">
            {t.discountInfo}
          </p>
          <p className="text-sm text-muted-foreground/80 italic mb-6">
            {t.warning}
          </p>

          <button
            onClick={handleToggleLanguage}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-foreground hover:bg-muted transition-colors"
          >
            {language === "fr" ? "🇬🇧" : "🇫🇷"} {t.switchLang}
          </button>
        </motion.div>

        {/* Quiz Levels */}
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
