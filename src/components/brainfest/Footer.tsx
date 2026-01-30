import { motion } from "framer-motion";
import { Language } from "@/data/quizData";

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  return (
    <footer className="bg-foreground relative overflow-hidden py-12 px-4 sm:py-16">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-light text-white/90 mb-3">
            Source Lab
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">
            {language === "fr" 
              ? "Les sources d'une bonne santé, accessibles à tous."
              : "The sources of good health, accessible to all."
            }
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-px bg-white/20 mx-auto mb-8"
        />

        {/* Copyright */}
        <motion.p 
          className="text-white/30 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          © 2024 Source Lab. {language === "fr" ? "Tous droits réservés." : "All rights reserved."}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
