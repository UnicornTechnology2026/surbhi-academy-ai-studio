import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  description?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlightText,
  description,
  subtitle,
  centered = true,
  dark = false,
  className = ''
}) => {
  const effectiveSub = subtitle || description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`max-w-3xl mb-10 ${centered ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2.5 mb-3 ${centered ? 'justify-center' : 'justify-start'}`}>
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.2] font-serif font-bold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
        {title}{' '}
        {highlightText && (
          <span className="italic font-normal text-amber-600">
            {highlightText}
          </span>
        )}
      </h2>

      {effectiveSub && (
        <p className={`mt-3 text-base sm:text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {effectiveSub}
        </p>
      )}
    </motion.div>
  );
};
