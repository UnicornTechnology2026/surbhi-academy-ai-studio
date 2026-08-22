import React, { useState } from 'react';
import {
  Sparkles,
  GraduationCap,
  Search,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { FacultyCard } from '../components/FacultyCard';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface FacultyPageProps {
  onOpenEnquiry: () => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ onOpenEnquiry }) => {
  const { faculty } = useAcademy();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    'all',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Accountancy & Tax',
    'Economics'
  ];

  const filteredFaculty = faculty.filter((member) => {
    if (member.status !== 'active') return false;
    const matchesSubject =
      selectedSubject === 'all' ||
      member.subjectsTaught.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()));
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.qualifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Leadership & Mentors</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Learn Directly from Distinguished Subject Heads
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our permanent core teaching faculty consists of Ph.D. scholars, senior board examiners, and Chartered Accountants who make concepts crystal clear and memorable.
          </p>
        </div>
      </section>

      {/* 2. Faculty Standards Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Permanent Core Faculty</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                No rotational guest tutors; full accountability throughout the year.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Board Examiner Insights</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Master the exact step-by-step marking rubrics evaluated by board checkers.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">1-on-1 Personal Doubts</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every teacher is available post-lecture for individual student doubts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Subject Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedSubject === sub
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {sub === 'all' ? 'All Departments' : sub}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search mentor name or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Faculty Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((member) => (
            <FacultyCard key={member.id} faculty={member} />
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Experience a Live Demo Lecture"
        subtitle="Attend a complimentary 2-day classroom session and see our teaching mentors in action."
      />
    </div>
  );
};