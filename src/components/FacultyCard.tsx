import React from 'react';
import { GraduationCap, Award, BookOpen, Clock } from 'lucide-react';
import { FacultyMember } from '../types';

interface FacultyCardProps {
  faculty: FacultyMember;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Image & Department Tag */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent" />
        
        {/* Department Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#0F172A]/90 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
            {faculty.department} Department
          </span>
        </div>

        {/* Experience & Role overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
            {faculty.name}
          </h3>
          <div className="text-xs text-amber-400 font-semibold mt-0.5">
            {faculty.role}
          </div>
        </div>
      </div>

      {/* Bio Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Qualifications & Experience */}
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span className="font-medium text-slate-800">{faculty.qualifications}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold text-slate-700">{faculty.experience}</span>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {faculty.bio}
          </p>

          {/* Key Achievements */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Key Mentorship Highlights</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              {faculty.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subjects taught pills */}
        <div className="pt-3 border-t border-slate-100">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Programs Taught</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {faculty.subjectsTaught.map((sub, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-800 text-[10px] font-medium px-2.5 py-0.5 rounded-md"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
