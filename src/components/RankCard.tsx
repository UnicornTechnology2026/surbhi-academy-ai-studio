import React from 'react';
import { Trophy, Award, Star, Quote, Sparkles } from 'lucide-react';
import { StudentResult } from '../types';

interface RankCardProps {
  student: StudentResult;
  isFeatured?: boolean;
}

export const RankCard: React.FC<RankCardProps> = ({ student, isFeatured = false }) => {
  // Rank badge styling logic
  const getBadgeStyle = () => {
    switch (student.badgeType) {
      case 'gold':
        return {
          cardBorder: 'border-amber-300 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-50/40 via-white to-white',
          rankBg: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md shadow-amber-500/20',
          iconColor: 'text-amber-500',
          accentColor: 'text-amber-700',
          scoreBadge: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'silver':
        return {
          cardBorder: 'border-slate-300 ring-1 ring-slate-400/20 bg-gradient-to-b from-slate-50/60 via-white to-white',
          rankBg: 'bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold shadow-md shadow-slate-400/20',
          iconColor: 'text-slate-500',
          accentColor: 'text-slate-800',
          scoreBadge: 'bg-slate-100 text-slate-900 border-slate-300'
        };
      case 'bronze':
        return {
          cardBorder: 'border-amber-200 ring-1 ring-amber-300/20 bg-gradient-to-b from-orange-50/30 via-white to-white',
          rankBg: 'bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold shadow-md shadow-amber-700/20',
          iconColor: 'text-amber-700',
          accentColor: 'text-amber-900',
          scoreBadge: 'bg-orange-100 text-amber-950 border-orange-200'
        };
      default:
        return {
          cardBorder: 'border-slate-200 bg-white',
          rankBg: 'bg-[#0F172A] text-white font-semibold',
          iconColor: 'text-blue-600',
          accentColor: 'text-slate-900',
          scoreBadge: 'bg-slate-100 text-slate-800 border-slate-200'
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <div
      className={`rounded-2xl border ${badgeStyle.cardBorder} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
    >
      {/* Top Background subtle glow for top 3 */}
      {student.badgeType === 'gold' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
      )}

      <div>
        {/* Top bar with Rank Badge & Academic Year */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle.rankBg}`}
            >
              {student.rank && student.rank <= 3 ? (
                <Trophy className="w-3.5 h-3.5" />
              ) : (
                <Award className="w-3.5 h-3.5" />
              )}
              {student.rank ? `Rank 0${student.rank}` : 'Top Merit'}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {student.categoryLabel}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            Year {student.year}
          </span>
        </div>

        {/* Student Image & Key Highlights */}
        <div className="flex items-center gap-4 my-2">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-100">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            {student.badgeType === 'gold' && (
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow-xs">
                <Sparkles className="w-3 h-3" />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold text-[#0F172A] leading-tight group-hover:text-amber-700 transition-colors">
              {student.name}
            </h4>
            <div className="text-xs font-semibold text-amber-700 mt-0.5">
              {student.rankTitle}
            </div>
            {student.school && (
              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {student.school}
              </div>
            )}
          </div>
        </div>

        {/* Big Score Box */}
        <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              {student.exam}
            </div>
            <div className="text-xl sm:text-2xl font-serif font-extrabold text-[#0F172A] mt-0.5">
              {student.score}
            </div>
          </div>
          {student.percentile && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold block">
                Merit Standing
              </span>
              <span className="text-xs font-semibold text-slate-700">
                {student.percentile}
              </span>
            </div>
          )}
        </div>

        {/* Student quote/testimonial */}
        {student.testimonial && (
          <div className="relative pt-2">
            <Quote className="w-4 h-4 text-amber-500/40 absolute -left-1 -top-0.5" />
            <p className="text-xs text-slate-600 italic pl-4 leading-relaxed line-clamp-3">
              "{student.testimonial}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
