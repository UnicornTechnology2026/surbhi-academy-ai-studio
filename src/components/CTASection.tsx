import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyInfo';

interface CTASectionProps {
  onOpenEnquiry: (courseSlug?: string) => void;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenEnquiry,
  title = 'Want to see how we teach before deciding?',
  subtitle = 'Take a free 2-day classroom trial. No fees, zero pressure — just real teaching and instant clarity.'
}) => {
  return (
    <section className="relative bg-[#0F172A] text-white py-16 pb-px  overflow-hidden">
      {/* Dynamic Animated background ambient lights */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Admissions 2026–27 • Limited 25 Seats/Batch
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenEnquiry()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book 2-Day Free Trial Pass</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call Us: {ACADEMY_INFO.contact.primaryPhone}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
