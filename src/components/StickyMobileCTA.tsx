import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyInfo';

interface StickyMobileCTAProps {
  onOpenEnquiry: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0F172A] border-t border-slate-800 p-2.5 flex items-center gap-2 shadow-2xl backdrop-blur-md">
      <a
        href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-amber-400" />
        <span>Call Now</span>
      </a>

      <button
        onClick={onOpenEnquiry}
        className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Enquire Now</span>
      </button>
    </div>
  );
};
