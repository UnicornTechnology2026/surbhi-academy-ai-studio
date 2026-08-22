import React from 'react';
import { Star, Quote, CheckCircle2, User } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between relative group">
      <div>
        {/* Star Rating & Quote Mark */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-slate-200 group-hover:text-amber-300/40 transition-colors" />
        </div>

        {/* Content */}
        <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed italic mb-6">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/30 shrink-0 bg-slate-100">
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
          <div className="text-xs text-amber-700 font-medium truncate">
            {testimonial.role} • {testimonial.course}
          </div>
          {testimonial.achievement && (
            <div className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{testimonial.achievement}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
