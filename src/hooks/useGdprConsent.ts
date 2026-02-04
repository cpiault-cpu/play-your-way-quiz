import { useState, useEffect } from 'react';

const CONSENT_KEY = 'gdpr_consent';
const CONSENT_EXPIRY_KEY = 'gdpr_consent_expiry';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export type ConsentStatus = 'pending' | 'accepted' | 'refused';

export const useGdprConsent = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null;
    const storedExpiry = localStorage.getItem(CONSENT_EXPIRY_KEY);

    if (storedConsent && storedExpiry) {
      const expiryDate = new Date(storedExpiry);
      if (new Date() < expiryDate) {
        setConsentStatus(storedConsent);
      } else {
        // Consent expired, reset to pending
        localStorage.removeItem(CONSENT_KEY);
        localStorage.removeItem(CONSENT_EXPIRY_KEY);
        setConsentStatus('pending');
      }
    }
    setIsLoading(false);
  }, []);

  const acceptConsent = () => {
    const expiryDate = new Date(Date.now() + THIRTY_DAYS_MS);
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(CONSENT_EXPIRY_KEY, expiryDate.toISOString());
    setConsentStatus('accepted');
  };

  const refuseConsent = () => {
    const expiryDate = new Date(Date.now() + THIRTY_DAYS_MS);
    localStorage.setItem(CONSENT_KEY, 'refused');
    localStorage.setItem(CONSENT_EXPIRY_KEY, expiryDate.toISOString());
    setConsentStatus('refused');
  };

  const canSaveProgress = () => {
    return consentStatus === 'accepted';
  };

  return {
    consentStatus,
    isLoading,
    acceptConsent,
    refuseConsent,
    canSaveProgress,
  };
};

// Helper to check consent status from anywhere
export const getConsentStatus = (): ConsentStatus => {
  const storedConsent = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null;
  const storedExpiry = localStorage.getItem(CONSENT_EXPIRY_KEY);

  if (storedConsent && storedExpiry) {
    const expiryDate = new Date(storedExpiry);
    if (new Date() < expiryDate) {
      return storedConsent;
    }
  }
  return 'pending';
};

export const canSaveProgressGlobal = (): boolean => {
  return getConsentStatus() === 'accepted';
};
