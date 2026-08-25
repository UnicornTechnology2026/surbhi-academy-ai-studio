import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Sparkles,
  Search,
  Filter,
  Award,
  Star,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { RankCard } from '../components/RankCard';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface ResultsPageProps {
  onOpenEnquiry: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onOpenEnquiry }) => {
  const { achievers } = useAcademy();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const years = ['all', '2025', '2024', '2023'];
  const categories = [
    { key: 'all', label: 'All Streams' },
    { key: 'Class 10', label: 'Class 10 Boards' },
    { key: 'science', label: 'Class 12 Science' },
    { key: 'competitive', label: 'Entrance & Olympiads' }
  ];

  const filteredAchievers = achievers.filter((student) => {
    if (student.status !== 'active') return false;
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;
    const matchesCategory =
      selectedCategory === 'all' ||
      student.category === selectedCategory ||
      student.gradeLevel.includes(selectedCategory);
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.examName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesCategory && matchesSearch;
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Hall of Fame & Academic Benchmarks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Meet the Rankers Who Made Nagpur Proud
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Consistent city and state ranks achieved through small batches, zero rote learning, and daily 1-on-1 mentor guidance.
          </p>
        </motion.div>
      </section>

      {/* 2. Merit Statistics Summary Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Board Pass Rate
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">84.6%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Students in Distinction (75%+)
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">45+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Scored 95%+ in 2025
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">14</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Perfect 100/100 Scores
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Stream Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat.key
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-slate-600">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr === 'all' ? 'All Years' : yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ranker Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAchievers.map((student) => (
            <RankCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={onOpenEnquiry}
        title="Want your child to be our next top ranker?"
        subtitle="Claim a 2-day free trial class and experience our personal mentorship approach firsthand."
      />
    </div>
  );
};
