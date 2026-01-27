import { useState, useRef, useEffect } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position to update active dot
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85 + 16; // 85vw + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, levelQuizzes.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [levelQuizzes.length]);

  // Scroll to specific card when dot is clicked
  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.85 + 16;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        {t.level} {level}
      </h2>

      {/* Mobile: horizontal scroll with pagination dots */}
      <div className="md:hidden -mx-3 px-3 sm:-mx-4 sm:px-4">
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory"
        >
          {levelQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex-shrink-0 w-[80vw] sm:w-[75vw] snap-start">
              <QuizCard
                quiz={quiz}
                language={language}
                onPlay={onPlayQuiz}
              />
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        {levelQuizzes.length > 1 && (
          <div className="flex justify-center gap-2 mt-2">
            {levelQuizzes.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Quiz ${index + 1}`}
              />
            ))}
          </div>
        )}
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
