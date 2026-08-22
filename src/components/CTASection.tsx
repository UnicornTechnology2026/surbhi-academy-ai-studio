import React from 'react';
import { ArrowRight, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyInfo';

interface CTASectionProps {
  onOpenEnquiry: (courseSlug?: string) => void;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenEnquiry,
  title = 'Want to Be Our Next Top Achiever?',
  subtitle = 'Join thousands of successful students who transformed their grades and confidence with Surbhi Coaching Academy.'
}) => {
  return (
    <section className="relative bg-[#0F172A] text-white py-16 sm:py-20 overflow-hidden">
      {/* Artistic circular geometry background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-amber-500/15 rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Admissions Open 2026–27
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <button
            onClick={() => onOpenEnquiry()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply For Admission</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call Counselor: {ACADEMY_INFO.contact.primaryPhone}</span>
          </a>
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-6 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>2-Day Free Trial Pass</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Small Batch Size (Max 25–30)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>1-on-1 Daily Doubt Clinic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Merit Scholarships Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
