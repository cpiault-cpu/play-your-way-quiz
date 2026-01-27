import { useState } from "react";
import { Language } from "@/data/quizData";
import { Instagram, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('signups')
        .insert({
          email: formData.email,
          quiz_id: `signup_${formData.firstName}_${formData.lastName}`,
        });

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setFormData({ firstName: "", lastName: "", email: "" });
      }, 2000);
    } catch (error) {
      console.error('Error saving signup:', error);
      toast.error(language === "fr" ? "Erreur lors de l'inscription" : "Error during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#3E5D58] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Signup Button */}
        <div className="flex justify-center mb-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-[#3E5D58] font-bold px-8 py-6 text-lg rounded-full shadow-lg"
              >
                {language === "fr" ? "S'inscrire" : "Sign Up"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#3E5D58] border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-center">
                  {language === "fr" ? "Inscription" : "Sign Up"}
                </DialogTitle>
              </DialogHeader>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <p className="text-xl text-amber-400 font-semibold">
                    {language === "fr" ? "Merci pour votre inscription !" : "Thank you for signing up!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === "fr" ? "Prénom" : "First Name"}
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder={language === "fr" ? "Votre prénom" : "Your first name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === "fr" ? "Nom" : "Last Name"}
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder={language === "fr" ? "Votre nom" : "Your last name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {language === "fr" ? "Adresse email" : "Email Address"}
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-500 text-[#3E5D58] font-bold py-3"
                  >
                    {language === "fr" ? "S'inscrire" : "Sign Up"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://www.instagram.com/maison_peita/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors"
          >
            <Instagram className="w-6 h-6" />
            <span className="font-medium">@maison_peita</span>
          </a>
          <a
            href="https://www.peita.fr/boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-medium">{language === "fr" ? "Boutique" : "Shop"}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
