import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    { key: 'all', label: 'All Batches' },
    { key: 'foundation', label: 'Class 8–10 Foundation' },
    { key: 'science', label: '11–12 Science (PCM/PCB)' },
    { key: 'competitive', label: 'JEE / NEET Prep' }
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Focused Batches for Every Academic Goal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every batch is capped at 25-30 students with daily 1-on-1 doubt clearing, modular theory booklets, and simulated mock exams.
          </p>
        </motion.div>
      </section>

      {/* 2. Filters & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
          {/* Category Tabs with motion */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat.key
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                placeholder="Search subject (e.g. Physics, Class 10)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>

            {/* Quick Grade Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Filter by Class:
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
              No matching batches found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search keyword or selecting "All Batches".
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

      {/* 4. CTA */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug)}
        title="Not sure which batch fits your syllabus?"
        subtitle="Talk to an academic counselor who will evaluate your child's stream, goals, and schedule a 2-day trial."
      />
    </div>
  );
};
