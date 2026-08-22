import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Track scroll position to show floating button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      id="scroll-to-top-btn"
      onClick={scrollToTop}
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-30 w-10 h-10 rounded-full bg-[#0F172A] hover:bg-slate-800 text-amber-400 border border-slate-700 shadow-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
      aria-label="Scroll to top of page"
    >
      <ArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
    </button>
  );
};
