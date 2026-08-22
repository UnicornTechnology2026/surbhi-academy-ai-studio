import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Star,
  Sparkles,
  Quote,
  Filter,
  GraduationCap,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAcademy } from '../context/AcademyContext';

interface TestimonialsPageProps {
  onOpenEnquiry: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenEnquiry }) => {
  const { testimonials, achievers, siteSettings } = useAcademy();
  const [filter, setFilter] = useState<'all' | 'Student' | 'Parent'>('all');

  const activeTestimonials = testimonials.filter((t) => t.status === 'active');
  const filtered = activeTestimonials.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'Student') return t.relation?.toLowerCase().includes('student') || t.role?.toLowerCase().includes('student');
    if (filter === 'Parent') return t.relation?.toLowerCase().includes('parent') || t.role?.toLowerCase().includes('parent');
    return true;
  });

  return (
    <div className="space-y-16 py-8">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 p-8 sm:p-14 text-white border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Parent & Student Voices</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Stories of Transformation, Discipline & Academic Triumphs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Read firsthand experiences from students who elevated their board examination ranks and parents who trusted {siteSettings.name} with their children’s academic foundation.
          </p>
        </div>
      </section>

      {/* 2. Key Trust Counters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-1 backdrop-blur-sm">
          <div className="text-3xl font-serif font-bold text-amber-400">4.9 / 5.0</div>
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Average Parent Rating</div>
          <div className="flex justify-center gap-1 text-amber-400 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-1 backdrop-blur-sm">
          <div className="text-3xl font-serif font-bold text-white">96.8%</div>
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Parents Recommend Us</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Annual Parent Survey</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-1 backdrop-blur-sm">
          <div className="text-3xl font-serif font-bold text-amber-400">12,500+</div>
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Alumni Network</div>
          <div className="text-[11px] text-slate-400">Across Top Colleges</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl text-center space-y-1 backdrop-blur-sm">
          <div className="text-3xl font-serif font-bold text-white">100%</div>
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Verified Real Reviews</div>
          <div className="text-[11px] text-blue-400 font-semibold">Authenticated Feedback</div>
        </div>
      </section>

      {/* 3. Filter Bar */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="text-sm text-slate-300 font-semibold">
          Showing <strong className="text-amber-400">{filtered.length}</strong> Genuine Reviews
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'Student', 'Parent'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${filter === tab
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
            >
              {tab === 'all' ? 'All Testimonials' : `${tab} Reviews`}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Testimonials Masonry Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 shadow-xl space-y-5 flex flex-col justify-between hover:border-amber-500/40 transition-all group backdrop-blur-xs relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                  {item.relation || 'Verified Review'}
                </span>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-amber-500/20 absolute -top-3 -left-2 pointer-events-none" />
                <p className="text-slate-200 text-sm leading-relaxed relative z-10 pl-2">
                  "{item.quote}"
                </p>
              </div>

              {item.achievement && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.achievement}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              {item.photo ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/30 shrink-0 bg-slate-950">
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-amber-500/30">
                  {item.name.charAt(0)}
                </div>
              )}
              <div className="overflow-hidden">
                <div className="font-serif font-bold text-white text-base truncate">{item.name}</div>
                <div className="text-xs text-slate-400 truncate">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. Hall of Fame Top Rankers Highlight */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Rankers Who Made Us Proud
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Topper Reflections & Hall of Fame
            </h2>
          </div>
          <Link
            to="/results"
            className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Board Rankers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievers.slice(0, 3).map((achiever) => (
            <div key={achiever.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={achiever.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={achiever.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
                />
                <div>
                  <div className="font-serif font-bold text-white text-sm">{achiever.name}</div>
                  <div className="text-xs font-bold text-amber-400">{achiever.score} • {achiever.rank}</div>
                </div>
              </div>
              {achiever.testimonialQuote && (
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{achiever.testimonialQuote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-serif font-extrabold max-w-2xl mx-auto leading-tight">
          Give Your Child the Advantage of Proven Academic Guidance
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 max-w-xl mx-auto font-medium">
          Experience our teaching methodology first-hand. Book a 2-day complimentary classroom demo session at our academy.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/admissions"
            className="bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-xl"
          >
            Apply for Admission Demo
          </Link>
          <Link
            to="/courses"
            className="bg-white/80 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md"
          >
            Explore Academic Batches
          </Link>
          <button
            onClick={() => onOpenEnquiry()}
            className="bg-transparent border-2 border-slate-950 hover:bg-slate-950 hover:text-white text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all"
          >
            Enquire Now
          </button>
        </div>
      </section>
    </div>
  );
};