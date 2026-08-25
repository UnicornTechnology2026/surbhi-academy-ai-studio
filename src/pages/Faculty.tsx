import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Clock, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { FacultyCard } from '../components/FacultyCard';
import { CTASection } from '../components/CTASection';
import { FACULTY_DATA } from '../data/faculty';

interface FacultyProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const Faculty: React.FC<FacultyProps> = ({ onOpenEnquiry }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'Mathematics', label: 'Mathematics' },
    { id: 'Physics', label: 'Physics' },
    { id: 'Chemistry', label: 'Chemistry' },
    { id: 'Biology', label: 'Biology & Life Sciences' },
    { id: 'Commerce', label: 'Commerce & Economics' }
  ];

  const filteredFaculty = FACULTY_DATA.filter((fac) => {
    return (
      selectedDepartment === 'all' || fac.department === selectedDepartment
    );
  });

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Expert Faculty & <br />
            <span className="italic font-normal text-amber-400">Dedicated Mentors</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Learn directly from seasoned Ph.D. scholars, Chartered Accountants, and master educators with over a decade of proven teaching experience.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${selectedDepartment === dept.id
                    ? 'bg-[#0F172A] text-amber-400 shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              Distinguished Educators ({filteredFaculty.length} Faculty Members)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every teacher at Surabhi Coaching Academy is a subject specialist committed to individual student understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((fac) => (
              <FacultyCard
                key={fac.id}
                faculty={fac}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Mentorship Philosophy */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-600 font-bold">
                The Surabhi Mentorship Culture
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                Accessible, Approachable & Accountable Mentors
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Unlike mass commercial institutes where students cannot reach senior teachers after class, our faculty members are personally available every day for designated 1-on-1 doubt resolution sessions, periodic progress reviews, and motivational counseling.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <button
                onClick={() => onOpenEnquiry()}
                className="bg-[#0F172A] hover:bg-slate-800 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Meet Our Faculty in Person
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
