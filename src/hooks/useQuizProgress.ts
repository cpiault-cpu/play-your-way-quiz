import { useState, useCallback, useEffect } from 'react';

// Types for tracking quiz progress
export interface WrongAnswerRecord {
  questionId: string;
  question: { fr: string; en: string };
  userAnswer: string | null;
  correctAnswer: string;
  isTrap?: boolean;
}

export interface QuizProgress {
  category: "biology" | "micronutrition" | "plants";
  level: number;
  wrongQuestionIds: string[];
  completedLevels: number[];
  lastAttemptDate: string;
}

const STORAGE_KEY = 'brainfest_quiz_progress';

export const useQuizProgress = () => {
  const [progress, setProgress] = useState<QuizProgress[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading quiz progress:', error);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: QuizProgress[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving quiz progress:', error);
    }
  }, []);

  // Get progress for a specific category
  const getCategoryProgress = useCallback((category: "biology" | "micronutrition" | "plants"): QuizProgress | undefined => {
    return progress.find(p => p.category === category);
  }, [progress]);

  // Get wrong question IDs for a category and level
  const getWrongQuestionIds = useCallback((category: "biology" | "micronutrition" | "plants", level: number): string[] => {
    const categoryProgress = progress.find(p => p.category === category);
    if (!categoryProgress) return [];
    return categoryProgress.wrongQuestionIds;
  }, [progress]);

  // Save wrong answers for a level
  const saveWrongAnswers = useCallback((
    category: "biology" | "micronutrition" | "plants",
    level: number,
    wrongQuestionIds: string[]
  ) => {
    const existingProgress = progress.find(p => p.category === category);
    
    if (existingProgress) {
      // Update existing progress - add new wrong question IDs
      const updatedProgress = progress.map(p => {
        if (p.category === category) {
          const combinedWrongIds = [...new Set([...p.wrongQuestionIds, ...wrongQuestionIds])];
          return {
            ...p,
            wrongQuestionIds: combinedWrongIds,
            lastAttemptDate: new Date().toISOString()
          };
        }
        return p;
      });
      saveProgress(updatedProgress);
    } else {
      // Create new progress entry
      const newProgress: QuizProgress = {
        category,
        level,
        wrongQuestionIds,
        completedLevels: [],
        lastAttemptDate: new Date().toISOString()
      };
      saveProgress([...progress, newProgress]);
    }
  }, [progress, saveProgress]);

  // Mark a level as completed (perfect score)
  const markLevelCompleted = useCallback((
    category: "biology" | "micronutrition" | "plants",
    level: number
  ) => {
    const existingProgress = progress.find(p => p.category === category);
    
    if (existingProgress) {
      const updatedProgress = progress.map(p => {
        if (p.category === category) {
          const completedLevels = [...new Set([...p.completedLevels, level])];
          return {
            ...p,
            completedLevels,
            lastAttemptDate: new Date().toISOString()
          };
        }
        return p;
      });
      saveProgress(updatedProgress);
    } else {
      const newProgress: QuizProgress = {
        category,
        level,
        wrongQuestionIds: [],
        completedLevels: [level],
        lastAttemptDate: new Date().toISOString()
      };
      saveProgress([...progress, newProgress]);
    }
  }, [progress, saveProgress]);

  // Remove a question from wrong answers (answered correctly)
  const removeWrongQuestion = useCallback((
    category: "biology" | "micronutrition" | "plants",
    questionId: string
  ) => {
    const updatedProgress = progress.map(p => {
      if (p.category === category) {
        return {
          ...p,
          wrongQuestionIds: p.wrongQuestionIds.filter(id => id !== questionId)
        };
      }
      return p;
    });
    saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  // Check if a level is completed
  const isLevelCompleted = useCallback((
    category: "biology" | "micronutrition" | "plants",
    level: number
  ): boolean => {
    const categoryProgress = progress.find(p => p.category === category);
    return categoryProgress?.completedLevels.includes(level) ?? false;
  }, [progress]);

  // Clear all progress (for testing)
  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress([]);
  }, []);

  return {
    progress,
    getCategoryProgress,
    getWrongQuestionIds,
    saveWrongAnswers,
    markLevelCompleted,
    removeWrongQuestion,
    isLevelCompleted,
    clearProgress
  };
};
