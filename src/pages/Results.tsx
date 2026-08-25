import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Star,
  Sparkles,
  Filter,
  CheckCircle2,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { RankCard } from '../components/RankCard';
import { CTASection } from '../components/CTASection';
import { RESULTS_DATA } from '../data/results';

interface ResultsProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const Results: React.FC<ResultsProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Results' },
    { id: 'class10', label: 'Class 10 Board' },
    { id: 'class12', label: 'Class 12 Science & Commerce' },
    { id: 'competitive', label: 'Competitive (NEET/JEE/Olympiad)' }
  ];

  const years = ['all', '2026', '2025', '2024'];

  const filteredResults = RESULTS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    return matchesCategory && matchesYear;
  });

  // Top 3 Podium Rankers (for visual podium showcase)
  const podiumStudents = RESULTS_DATA.filter((s) => s.rank && s.rank <= 3).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-500/15 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Student Achievements & Hall of Fame</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Proven Results & <br />
            <span className="italic font-normal text-amber-400">Top Rank Holders</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Consistently producing City Rank 1s, 99%+ board toppers, and top competitive rank holders through dedicated mentorship and concept clarity.
          </p>

          {/* Quick Result Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto text-left">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-serif font-bold text-amber-400">99.2%</div>
              <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mt-0.5">
                Highest 10th Board Score
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-serif font-bold text-amber-400">705/720</div>
              <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mt-0.5">
                Top NEET-UG Score
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-serif font-bold text-amber-400">98.8%</div>
              <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mt-0.5">
                Highest 12th Science Score
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-serif font-bold text-amber-400">100/100</div>
              <div className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mt-0.5">
                Perfect Scores in Math/Accts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat.id
                      ? 'bg-[#0F172A] text-amber-400 shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Year:
              </span>
              <div className="flex bg-white rounded-full p-1 border border-slate-200">
                {years.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${selectedYear === yr
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              Top Academic Achievers ({filteredResults.length} Records)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Displaying meritorious students who scored top ranks in Board Exams and Competitive Entrances.
            </p>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((student) => (
                <RankCard
                  key={student.id}
                  student={student}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto p-8">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-[#0F172A] mb-1">
                No Results in this Category
              </h3>
              <p className="text-slate-500 text-xs mb-4">
                Please select another filter or view all results.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedYear('all');
                }}
                className="bg-[#0F172A] text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Specific Hall of Fame CTA Requested */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Want to Be Our Next Top Achiever?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Begin your journey with our experienced mentors, structured test series, and dedicated doubt resolution clinics.
          </p>
          <button
            onClick={() => onOpenEnquiry()}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/20 cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join Surabhi Coaching Academy</span>
          </button>
        </div>
      </section>
    </div>
  );
};
