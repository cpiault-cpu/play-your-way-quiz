import { motion } from "framer-motion";
import { Quiz, Language, translations } from "@/data/quizData";
import QuizCard from "./QuizCard";

interface LevelSectionProps {
  level: 1 | 2 | 3;
  quizzes: Quiz[];
  language: Language;
  onPlayQuiz: (quizId: string) => void;
}

const LevelSection = ({ level, quizzes, language, onPlayQuiz }: LevelSectionProps) => {
  const t = translations[language];
  const levelQuizzes = quizzes.filter(q => q.level === level);

  const getLevelColor = () => {
    switch (level) {
      case 1: return "bg-primary";
      case 2: return "bg-accent";
      case 3: return "bg-destructive";
      default: return "bg-primary";
    }
  };

  return (
    <motion.section 
      className="mt-10 sm:mt-12 md:mt-14 mb-10 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <span className={`w-3 h-3 rounded-full ${getLevelColor()} flex-shrink-0`} />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          {t.level} {level}
        </h2>
        <div className="flex-1 h-px bg-border/50 ml-2" />
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-4 min-w-0">
        {levelQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
          >
            <QuizCard
              quiz={quiz}
              language={language}
              onPlay={onPlayQuiz}
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0 items-stretch">
        {levelQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
          >
            <QuizCard
              quiz={quiz}
              language={language}
              onPlay={onPlayQuiz}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LevelSection;