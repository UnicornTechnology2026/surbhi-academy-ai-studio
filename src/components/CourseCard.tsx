import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Course } from "../types";

interface CourseCardProps {
  course: Course;
  onEnquire: (courseSlug: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnquire,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 flex flex-col overflow-hidden group relative"
    >
      {/* Course Image & Badge Header */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="bg-[#0F172A]/90 backdrop-blur-md text-amber-400 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30">
            {course.categoryLabel}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Key Subjects */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {course.subjects.slice(0, 3).map((sub, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
                >
                  {sub}
                </span>
              ))}
              {course.subjects.length > 3 && (
                <span className="bg-amber-50 text-amber-900 border border-amber-200/70 text-[11px] px-2 py-1 rounded-md font-semibold">
                  +{course.subjects.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Conversational Highlights */}
          <div className="mt-4 space-y-2">
            {course.features.slice(0, 2).map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-700 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs py-2.5 px-3 rounded-xl transition-colors text-center uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          </Link>
          <button
            onClick={() => onEnquire(course.slug)}
            className="flex-1 bg-[#0F172A] hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-xs text-center uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Book Trial</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
