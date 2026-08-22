import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
  subtitle?: string; // Added subtitle prop
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlightText,
  description,
  centered = true,
  dark = false,
  className = ''
}) => {
  return (
    <div className={`max-w-3xl mb-12 ${centered ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2.5 mb-3.5 ${centered ? 'justify-center' : 'justify-start'}`}>
          <div className="w-8 h-[1.5px] bg-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            {eyebrow}
          </span>
          {centered && <div className="w-8 h-[1.5px] bg-amber-500" />}
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.2] font-serif font-bold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
        {title}{' '}
        {highlightText && (
          <span className="italic font-normal text-amber-600">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
