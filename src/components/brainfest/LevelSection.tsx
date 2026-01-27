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

  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        {t.level} {level}
      </h2>

      {/* Mobile: vertical stack (no horizontal scroll) */}
      <div className="md:hidden flex flex-col gap-4">
        {levelQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            language={language}
            onPlay={onPlayQuiz}
          />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            language={language}
            onPlay={onPlayQuiz}
          />
        ))}
      </div>
    </section>
  );
};

export default LevelSection;
