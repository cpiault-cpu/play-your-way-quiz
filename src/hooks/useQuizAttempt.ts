import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { canSaveProgressGlobal } from "@/hooks/useGdprConsent";

interface UseQuizAttemptResult {
  checkEmailUsed: (email: string, quizId: string) => Promise<boolean>;
  saveAttempt: (email: string, quizId: string, score?: number | null) => Promise<void>;
  updateScore: (email: string, quizId: string, score: number) => Promise<void>;
  isChecking: boolean;
  error: string | null;
}

/**
 * Hook to manage quiz attempts - checks if email already used for a quiz
 * and saves new attempts to the database.
 * Respects GDPR consent - only saves data if user has accepted.
 */
export const useQuizAttempt = (): UseQuizAttemptResult => {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if an email has already been used for a specific quiz
   * Uses edge function to avoid exposing all signups data via SELECT policy
   * @returns true if the email has already been used (attempt exists)
   */
  const checkEmailUsed = useCallback(async (email: string, quizId: string): Promise<boolean> => {
    setIsChecking(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke("quiz-operations", {
        body: {
          action: "check-email",
          email: email.toLowerCase().trim(),
          quiz_id: quizId,
        },
      });

      if (fnError) {
        if (import.meta.env.DEV) {
          console.error("Error checking email:", fnError);
        }
        setError(fnError.message);
        return false;
      }

      return data?.exists ?? false;
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error checking email:", err);
      }
      setError(err instanceof Error ? err.message : "Unknown error");
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  /**
   * Save a new quiz attempt to the database
   * Only saves if GDPR consent has been accepted
   * Uses direct INSERT (still allowed by RLS policy)
   */
  const saveAttempt = useCallback(async (email: string, quizId: string, score?: number | null): Promise<void> => {
    // Only save if user has accepted GDPR consent
    if (!canSaveProgressGlobal()) {
      console.log("GDPR consent not given, skipping save");
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from("signups")
        .insert({
          email: email.toLowerCase().trim(),
          quiz_id: quizId,
          score: score ?? null
        });

      if (insertError) {
        if (import.meta.env.DEV) {
          console.error("Error saving attempt:", insertError);
        }
        throw insertError;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error saving attempt:", err);
      }
      throw err;
    }
  }, []);

  /**
   * Update the score for an existing attempt
   * Uses edge function to avoid needing public UPDATE policy
   * Only updates if GDPR consent has been accepted
   */
  const updateScore = useCallback(async (email: string, quizId: string, score: number): Promise<void> => {
    // Only update if user has accepted GDPR consent
    if (!canSaveProgressGlobal()) {
      console.log("GDPR consent not given, skipping score update");
      return;
    }

    try {
      const { error: fnError } = await supabase.functions.invoke("quiz-operations", {
        body: {
          action: "update-score",
          email: email.toLowerCase().trim(),
          quiz_id: quizId,
          score,
        },
      });

      if (fnError) {
        if (import.meta.env.DEV) {
          console.error("Error updating score:", fnError);
        }
        throw fnError;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error updating score:", err);
      }
      throw err;
    }
  }, []);

  return {
    checkEmailUsed,
    saveAttempt,
    updateScore,
    isChecking,
    error
  };
};

export default useQuizAttempt;
