import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Clock } from 'lucide-react';
import { FacultyMember } from '../types';

interface FacultyCardProps {
  faculty: FacultyMember;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Top Image & Department Tag */}
      <div className="relative h-64 overflow-hidden bg-slate-900">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />

        {/* Department Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#0F172A]/90 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30">
            {faculty.department}
          </span>
        </div>

        {/* Experience & Name overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
            {faculty.name}
          </h3>
          <div className="text-xs text-amber-400 font-semibold mt-0.5">
            {faculty.role} • {faculty.experience}
          </div>
        </div>
      </div>

      {/* Bio Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Qualifications */}
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
            <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{faculty.qualifications}</span>
          </div>

          {/* Bio text - punchy */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {faculty.bio}
          </p>

          {/* Key Achievements */}
          {faculty.achievements && faculty.achievements.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {faculty.achievements.slice(0, 2).map((ach, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="line-clamp-1">{ach}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
