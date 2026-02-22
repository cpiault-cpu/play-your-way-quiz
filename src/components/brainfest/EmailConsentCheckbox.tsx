import { Language } from "@/data/quizData";

interface EmailConsentCheckboxProps {
  language: Language;
}

const EmailConsentCheckbox = ({ language }: EmailConsentCheckboxProps) => {
  return (
    <div className="flex items-start gap-3 text-left">
      <input
        type="checkbox"
        id="email-consent"
        name="email-consent"
        required
        className="mt-1 shrink-0 h-4 w-4 rounded border-primary accent-primary cursor-pointer"
      />
      <label
        htmlFor="email-consent"
        className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {language === "fr"
          ? "J'accepte que mon email soit utilisé pour participer aux jeux et avoir accès aux autres."
          : "I agree that my email will be used to participate in the games and access the others."}
      </label>
    </div>
  );
};

export default EmailConsentCheckbox;
