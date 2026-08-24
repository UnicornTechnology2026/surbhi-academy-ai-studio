import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  BookOpen,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { CourseCard } from '../components/CourseCard';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';
import { CourseCategory } from '../types';

interface CoursesPageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenEnquiry }) => {
  const { courses } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<'all' | CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  const categories: { key: 'all' | CourseCategory; label: string }[] = [
    { key: 'all', label: 'All Programs' },
    { key: 'foundation', label: 'Class 8–10 Foundation' },
    { key: 'science', label: '11–12 Science (PCM/PCB)' },
    { key: 'competitive', label: 'JEE/NEET' },

  ];

  const filteredCourses = courses.filter((course) => {
    if (course.status !== 'active') return false;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGrade = selectedGrade === 'all' || course.gradeLevel.includes(selectedGrade);
    return matchesCategory && matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Programs 2026–27</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Curated Programs Built for Academic Distinction
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From junior foundation fundamentals to Class 12 board merit preparation, our small-batch courses empower every learner with conceptual clarity and high test performance.
          </p>
        </div>
      </section>

      {/* 2. Filters & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat.key
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Secondary Filter Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search subject, class, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>

            {/* Quick Grade Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Class:
              </span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500 bg-white"
              >
                <option value="all">All Classes</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Course List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-slate-700">
              No matching courses found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting a different category tab.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedGrade('all');
              }}
              className="mt-2 text-xs font-bold text-amber-700 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnquire={(slug) => onOpenEnquiry(slug)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Pedagogical Feature Highlights */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What's Included"
            title="Every Surbhi Course Includes"
            subtitle="Standardized academic excellence deliverables bundled with every batch enrollment."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-[#0F172A]">
                Comprehensive Study Kits
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Printed theory booklets, chapter exercise sheets, and previous 10-year solved board papers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-[#0F172A]">
                Daily Graded DPPs
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily practice problems checked next morning to catch conceptual mistakes immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-[#0F172A]">
                Daily Doubt Clearing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                1-on-1 private doubts clinic open Monday through Saturday with dedicated subject heads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-[#0F172A]">
                Parent Progress Reports
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Weekly attendance notifications and monthly performance review conferences with mentors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug)}
        title="Unsure Which Batch Best Fits Your Child?"
        subtitle="Book a free diagnostic academic assessment with our senior academic counselor."
      />
    </div>
  );
};
