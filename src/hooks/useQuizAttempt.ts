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
   * @returns true if the email has already been used (attempt exists)
   */
  const checkEmailUsed = useCallback(async (email: string, quizId: string): Promise<boolean> => {
    setIsChecking(true);
    setError(null);
    
    try {
      const { data, error: queryError } = await supabase
        .from("signups")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .eq("quiz_id", quizId)
        .maybeSingle();

      if (queryError) {
        if (import.meta.env.DEV) {
          console.error("Error checking email:", queryError);
        }
        setError(queryError.message);
        return false;
      }

      // If data exists, email has been used
      return !!data;
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
   * Only updates if GDPR consent has been accepted
   */
  const updateScore = useCallback(async (email: string, quizId: string, score: number): Promise<void> => {
    // Only update if user has accepted GDPR consent
    if (!canSaveProgressGlobal()) {
      console.log("GDPR consent not given, skipping score update");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("signups")
        .update({ score })
        .eq("email", email.toLowerCase().trim())
        .eq("quiz_id", quizId);

      if (updateError) {
        if (import.meta.env.DEV) {
          console.error("Error updating score:", updateError);
        }
        throw updateError;
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
