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
    <section className="mb-12">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {t.level} {level}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
