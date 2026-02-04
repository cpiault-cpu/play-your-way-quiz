import { useState } from "react";
import { motion } from "framer-motion";
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
    <footer className="relative overflow-hidden py-10 px-4 sm:py-12" style={{ backgroundColor: '#B6BDB0' }}>
      <div className="max-w-5xl mx-auto">
        {/* Footer description text */}
        <motion.p
          className="text-left mb-6"
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 400, 
            fontSize: '16px', 
            color: '#000000',
            lineHeight: 1.5
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {language === "fr" 
            ? "Cette page sera renouvelée souvent avec de nouveaux jeux et des matières à étudier plus profondément. Inscrivez-vous pour être tenus au courant et suivez-nous sur Instagram."
            : "This page will be updated frequently with new games and deeper study materials. Sign up to stay informed and follow us on Instagram."
          }
        </motion.p>

        {/* Signup Button */}
        <motion.div 
          className="flex justify-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="default"
                className="bg-white hover:bg-gray-50 font-normal px-6 py-2 text-sm shadow-lg transition-all hover:shadow-xl"
                style={{ color: '#000000', border: '1px solid #B6BDB0', borderRadius: '12px' }}
              >
                {language === "fr" ? "S'inscrire" : "Sign Up"}
              </Button>
            </DialogTrigger>
            <DialogContent className="hero-gradient border-white/20 text-white" style={{ borderRadius: '12px' }}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  {language === "fr" ? "Inscription" : "Sign Up"}
                </DialogTitle>
              </DialogHeader>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <p className="text-xl text-accent font-semibold">
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
                      style={{ borderRadius: '12px' }}
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
                      style={{ borderRadius: '12px' }}
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-accent"
                      style={{ borderRadius: '12px' }}
                      placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    {isLoading 
                      ? (language === "fr" ? "Envoi..." : "Sending...") 
                      : (language === "fr" ? "S'inscrire" : "Sign Up")
                    }
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://www.instagram.com/maison_peita/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity group"
            style={{ color: '#000000' }}
          >
            <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>@maison_peita</span>
          </a>
          <a
            href="https://www.peita.fr/boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity group"
            style={{ color: '#000000' }}
          >
            <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{language === "fr" ? "Boutique" : "Shop"}</span>
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p 
          className="text-center mt-8"
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontWeight: 400, 
            fontSize: '14px', 
            color: '#000000' 
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          (c) La Troisième Note / Maison Peita
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;