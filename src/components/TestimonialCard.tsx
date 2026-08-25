import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
    >
      <div>
        {/* Star Rating & Quote Mark */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-6 h-6 text-slate-300 group-hover:text-amber-500 transition-colors" />
        </div>

        {/* Content */}
        <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/40 shrink-0 bg-slate-100">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-serif font-bold text-[#0F172A] truncate">
            {testimonial.name}
          </h4>
          <div className="text-xs text-amber-700 font-semibold truncate">
            {testimonial.role} • {testimonial.course}
          </div>
          {testimonial.achievement && (
            <div className="text-[11px] text-emerald-700 font-medium truncate flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{testimonial.achievement}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
