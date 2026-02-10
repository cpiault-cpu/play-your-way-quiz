import { useState, useCallback } from "react";

const EMAIL_STORAGE_PREFIX = "quiz_email_";

/**
 * Hook to persist email per quiz category in localStorage.
 * Users only need to enter their email once per quiz type.
 */
export const useQuizEmail = (quizCategory: string) => {
  const storageKey = `${EMAIL_STORAGE_PREFIX}${quizCategory}`;

  const [email, setEmailState] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) || "";
    } catch {
      return "";
    }
  });

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
  }, []);

  const saveEmail = useCallback((emailToSave: string) => {
    const trimmed = emailToSave.toLowerCase().trim();
    try {
      localStorage.setItem(storageKey, trimmed);
    } catch {
      // localStorage not available
    }
    setEmailState(trimmed);
  }, [storageKey]);

  const hasStoredEmail = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return { email, setEmail, saveEmail, hasStoredEmail };
};
