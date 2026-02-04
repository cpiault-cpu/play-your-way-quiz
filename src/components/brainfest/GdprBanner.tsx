import { Link } from "react-router-dom";
import { useGdprConsent } from "@/hooks/useGdprConsent";
import { Language } from "@/data/quizData";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GdprBannerProps {
  language: Language;
}

const GdprBanner = ({ language }: GdprBannerProps) => {
  const { consentStatus, isLoading, acceptConsent, refuseConsent } = useGdprConsent();

  // Don't show banner while loading or if consent already given
  if (isLoading || consentStatus !== 'pending') {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 shadow-lg"
      style={{ 
        backgroundColor: '#B6BDB0',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '14px',
        color: '#000000'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="flex-1 leading-relaxed">
            {language === "fr" 
              ? "Ce site utilise des cookies et collecte des données (e-mails, progrès dans les quiz) pour améliorer votre expérience. "
              : "This site uses cookies and collects data (emails, quiz progress) to improve your experience. "
            }
            <Link 
              to="/politique-de-confidentialite" 
              className="underline hover:opacity-70 transition-opacity font-medium"
            >
              {language === "fr" ? "Lire notre politique de confidentialité" : "Read our privacy policy"}
            </Link>
            .
          </p>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={acceptConsent}
              size="sm"
              className="bg-white hover:bg-gray-50 text-black border border-gray-300 font-medium gap-2"
              style={{ borderRadius: '8px' }}
            >
              <Check className="w-4 h-4" />
              {language === "fr" ? "J'accepte" : "I accept"}
            </Button>
            <Button
              onClick={refuseConsent}
              size="sm"
              variant="outline"
              className="bg-transparent hover:bg-black/10 text-black border-black/30 font-medium gap-2"
              style={{ borderRadius: '8px' }}
            >
              <X className="w-4 h-4" />
              {language === "fr" ? "Refuser" : "Refuse"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GdprBanner;
