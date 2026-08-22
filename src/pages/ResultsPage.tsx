import React, { useState } from 'react';
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
  const { achievers, siteSettings } = useAcademy();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const years = ['all', '2025', '2024', '2023'];
  const categories = [
    { key: 'all', label: 'All Streams' },
    { key: 'Class 10', label: 'Class 10 Boards' },
    { key: 'science', label: 'Class 12 Science' },
    { key: 'commerce', label: 'Class 12 Commerce' },
    { key: 'competitive', label: 'Olympiads & NTSE' }
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
      student.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.examName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Hall of Fame & Academic Benchmarks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Celebrating Our Board Toppers & Rank Holders
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Consistently setting city and state records in CBSE, State Board, and competitive foundations through rigorous preparation and personalized mentorship.
          </p>
        </div>
      </section>

      {/* 2. Merit Statistics Summary Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Overall Board Pass Rate
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">84.6%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Students in Distinction Bracket
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
                Perfect 100/100 Subject Scores
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filters Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Year Filters */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Academic Year:
              </span>
              <div className="flex gap-1.5">
                {years.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedYear === yr
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Stream Category filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Stream:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500 bg-white"
              >
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search student or school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Achievers Wall Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredAchievers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <Trophy className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-slate-700">
              No results found matching your criteria
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting the year or stream filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievers.map((student) => (
              <RankCard
                key={student.id}
                student={student}
                isFeatured={student.featured}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Be on Nagpur’s Next Merit List"
        subtitle="Join Surbhi Coaching Academy for the 2026–27 session and learn from faculty who produce city toppers."
      />
    </div>
  );
};
