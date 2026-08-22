import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Users, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnquire: (courseSlug: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnquire }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Course Image & Badge Header */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-[#0F172A]/90 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
            {course.categoryLabel}
          </span>
          {course.badge && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {course.badge}
            </span>
          )}
        </div>

        {/* Grade overlay on image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
            {course.gradeLevel}
          </span>
          <span className="text-xs flex items-center gap-1 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Key Subjects */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Key Subjects:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {course.subjects.slice(0, 3).map((sub, idx) => (
                <span
                  key={idx}
                  className="bg-slate-50 text-slate-700 border border-slate-200/80 text-[11px] px-2.5 py-0.5 rounded-md"
                >
                  {sub}
                </span>
              ))}
              {course.subjects.length > 3 && (
                <span className="bg-amber-50 text-amber-800 border border-amber-200/60 text-[11px] px-2 py-0.5 rounded-md font-medium">
                  +{course.subjects.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Quick bullet points */}
          <div className="mt-4 space-y-1.5">
            {course.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors text-center uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </Link>
          <button
            onClick={() => onEnquire(course.slug)}
            className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-all shadow-sm hover:shadow-md text-center uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
