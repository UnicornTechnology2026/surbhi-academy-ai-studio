import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CourseCard } from '../components/CourseCard';
import { CTASection } from '../components/CTASection';
import { COURSES_DATA } from '../data/courses';

interface CoursesProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'foundation', label: 'School Foundation (6–10)' },
    { id: 'science', label: 'Senior Secondary Science' },
    { id: 'commerce', label: 'Commerce Pro (11–12)' },
    { id: 'competitive', label: 'Competitive & Olympiad' }
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory =
      selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Academic Programs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Comprehensive <span className="italic font-normal text-amber-400">Courses</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From middle-school foundational thinking to elite senior secondary board & competitive mastery, explore our meticulously designed programs.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0F172A] text-amber-400 shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                id="course-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject, grade, board..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white rounded-full border border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnquire={onOpenEnquiry}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-xl mx-auto p-8">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">
                No Courses Found
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                We could not find any program matching "{searchQuery}". Please try resetting your search keyword or contact our counseling desk.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-[#0F172A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Comparison Ribbon */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-1">
                Unsure Which Program Fits Your Child Best?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Take our free 30-minute diagnostic aptitude evaluation to determine your child's conceptual baseline and receive an expert batch recommendation.
              </p>
            </div>
            <button
              onClick={() => onOpenEnquiry()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-md cursor-pointer"
            >
              Book Free Diagnostic Counselling
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
