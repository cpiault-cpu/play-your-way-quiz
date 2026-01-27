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
    <section className="mb-10">
      <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        {t.level} {level}
      </h2>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {levelQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex-shrink-0 w-[85vw] snap-start">
              <QuizCard
                quiz={quiz}
                language={language}
                onPlay={onPlayQuiz}
              />
            </div>
          ))}
        </div>
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
