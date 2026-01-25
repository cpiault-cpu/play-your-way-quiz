import { Language, translations } from "@/data/quizData";

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

const Header = ({ language, onToggleLanguage }: HeaderProps) => {
  const t = translations[language];

  return (
    <header className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm border-b border-border relative z-20">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <a href="https://www.peita.fr" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://www.peita.fr/wp-content/uploads/2023/09/LOGO-PEITA-SMALL-sans-fond.png" 
            alt="PEITA Logo" 
            className="h-12 md:h-14 object-contain"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
