import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollIndicatorProps {
  scrollRef: RefObject<HTMLDivElement>;
  className?: string;
}

const ScrollIndicator = ({ scrollRef, className = "" }: ScrollIndicatorProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      checkScrollPosition();
      element.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        element.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [scrollRef]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 270; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`flex items-center gap-2 md:hidden ${className}`}>
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo('left')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-md border border-gray-200 text-gray-600 active:scale-95 transition-transform"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Scroll hint dots */}
      <div className="flex gap-1.5">
        <motion.div 
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${canScrollLeft ? 'bg-white/40' : 'bg-white'}`}
        />
        <motion.div 
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${!canScrollLeft && !canScrollRight ? 'bg-white' : canScrollLeft && canScrollRight ? 'bg-white' : 'bg-white/40'}`}
        />
        <motion.div 
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${canScrollRight ? 'bg-white/40' : 'bg-white'}`}
        />
      </div>

      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo('right')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-md border border-gray-200 text-gray-600 active:scale-95 transition-transform"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollIndicator;
