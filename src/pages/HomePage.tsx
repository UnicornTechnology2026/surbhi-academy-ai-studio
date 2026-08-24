import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  BookOpen,
  GraduationCap,
  Star,
  Award,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Bell,
  Phone,
  HelpCircle
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { CourseCard } from '../components/CourseCard';
import { RankCard } from '../components/RankCard';
import { FacultyCard } from '../components/FacultyCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { CTASection } from '../components/CTASection';
import { SectionHeader } from '../components/SectionHeader';
import { CourseCategory } from '../types';

interface HomePageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const { courses, achievers, faculty, testimonials, notices, heroContent, siteSettings } = useAcademy();
  const [activeCourseCategory, setActiveCourseCategory] = useState<'all' | CourseCategory>('all');

  // Filter active courses
  const filteredCourses = courses
    .filter((c) => c.status === 'active')
    .filter((c) => (activeCourseCategory === 'all' ? true : c.category === activeCourseCategory));

  // Top featured achievers
  const featuredAchievers = achievers
    .filter((a) => a.status === 'active' && a.featured)
    .slice(0, 3);

  // Latest published notice
  const latestNotice = notices.find((n) => n.status === 'published');

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* 1. HERO SECTION (Artistic Navy & Gold Theme) */}
      <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Subtle geometric circles in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -ml-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full "></div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F172A] leading-[1.15] tracking-tight">
                {heroContent.headlineMain}{' '}
                <span className="relative inline-block text-amber-700 italic">
                  {heroContent.headlineHighlight}
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-amber-300/30 -z-10 rounded-full" />
                </span>{' '}
                {heroContent.headlineEnd}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {heroContent.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700 pt-1">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Small Batches (Max 25-30)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Daily 1-on-1 Doubt Clear</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Complimentary 2-Day Trial</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-enquire-btn"
                  onClick={() => onOpenEnquiry()}
                  className="w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{heroContent.secondaryButtonText}</span>
                </button>

                <Link
                  to="/courses"
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{heroContent.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Bento Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card with Topper image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5] group">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="Surbhi Coaching Academy Classroom & Toppers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />

                  {/* Floating badge inside image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#0F172A]/90 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      ★ 29+ Years Legacy
                    </span>
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      98.4% Merit Rate
                    </span>
                  </div>

                  {/* Bottom overlay text */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      <span>Consistent City Rank 1s</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      Where Potential Transforms Into Board Distinction
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      Rigorous conceptual teaching, examiners' answer-writing rubrics, and personalized mentoring.
                    </p>
                  </div>
                </div>

                {/* Floating Top Achiever highlight card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3.5 max-w-xs animate-bounceSubtle">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      alt="Ananya Deshmukh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      City Rank 1 • 99.2%
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      Ananya Deshmukh (Class 10)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      100/100 Math & Science
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0F172A]">
                  {heroContent.stats.yearsOfExcellence}+
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Years of Excellence
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-700">
                  {heroContent.stats.successfulStudents.toLocaleString()}+
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Students Trained
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0F172A]">
                  {heroContent.stats.expertFaculty}+
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Expert Faculty
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-700">
                  {heroContent.stats.topAchievers}+
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  95%+ Scorers
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0F172A]">
                  {heroContent.stats.boardMeritRate}
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Board Pass Rate
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-700">
                  {heroContent.stats.cityRankHolders}+
                </div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  City & State Ranks
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COURSES / ACADEMIC PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-2">
              Comprehensive Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
              Specialized Coaching Programs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              Scientifically paced programs with small batch limits, 3-stage revision cycles, and comprehensive study modules.
            </p>
          </div>

          {/* Stream Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCourseCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'all'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveCourseCategory('foundation')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'foundation'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Foundation (Class 8-10)
            </button>
            <button
              onClick={() => setActiveCourseCategory('science')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'science'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              11-12 Science (PCM/PCB)
            </button>
            <button
              onClick={() => setActiveCourseCategory('competitive')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'competitive'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Entrance Exam
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnquire={(slug) => onOpenEnquiry(slug)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
          >
            <span>View All Course Details & Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. HALL OF FAME / TOP ACHIEVERS WALL PREVIEW */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Hall of Fame"
            title="Our Star Performers & Board Rank Holders"
            subtitle="Year after year, Surbhi students establish city benchmarks in Class 10 & 12 Boards and competitive foundations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featuredAchievers.map((student) => (
              <RankCard key={student.id} student={student} isFeatured={true} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-md"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Explore Complete Results & Rankers Wall</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SURBHI COACHING ACADEMY (6-Pillar Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Surbhi Advantage"
          title="Why Nagpur's Top Students Choose Surbhi"
          subtitle="A disciplined academic culture pairing high expectations with empathetic, personalized mentorship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              18+ Years Expert Faculty Leadership
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Learn directly from expert teachers, experienced educators, senior board evaluators, and subject specialists who bring deep knowledge and simplify complex concepts with clarity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Strict Batch Limit (25–30 Students)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No crowded auditoriums. Every child is known by name, their strengths nurtured, and weaknesses systematically addressed.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Daily 1-on-1 Doubt Clearing Clinics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dedicated evening doubt hours where students sit individually with subject teachers to resolve any conceptual confusion.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Comprehensive Modular Study Kits
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chapter theory modules, Daily Practice Problems (DPPs), solved 10-year question banks, and formula pocket cards provided.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              3-Stage Revision & Pre-Board Simulations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Syllabus completed well in advance, followed by 3 revision cycles and full-length simulated board exams on official answer sheets.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Transparent Parent Partnerships
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Real-time daily attendance updates, chapter test scores, and quarterly one-on-one progress review meetings with parents.
            </p>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP TEACHING METHODOLOGY */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-amber-400 text-xs uppercase tracking-widest font-semibold mb-4">
              Pedagogical Framework
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 4-Step Academic Mastery Cycle
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Our proven teaching approach makes learning easier, builds confidence, improves logical thinking, and helps students achieve better exam scores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="text-3xl font-serif font-extrabold text-amber-400">01</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Learn (Concept Mastery)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visual interactive smartboard lectures and real-life scientific demonstrations. Focus is on understanding 'why', not memorizing.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="text-3xl font-serif font-extrabold text-amber-400">02</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Practice (Targeted DPPs)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Daily graded worksheets, NCERT Exemplar problems, and HOTS questions solved with structured steps and formulas.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="text-3xl font-serif font-extrabold text-amber-400">03</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Improve (Doubt Clinics)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Weekly diagnostic evaluations followed by 1-on-1 personal mentorship to clear every doubt and avoid persistent errors.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="text-3xl font-serif font-extrabold text-amber-400">04</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Achieve (Board Rankers)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-board simulations under strict 3-hour exam conditions with examiner marking rubrics to secure 95%+ marks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS & PARENT REVIEWS */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Real Experiences"
            title="What Students & Parents Say"
            subtitle="Hear directly from families whose academic journeys were transformed at Surbhi Coaching Academy."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.filter(t => t.status === 'active').slice(0, 3).map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#0F172A] hover:text-amber-700"
            >
              <span>Read All Student & Parent Testimonials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug)}
        title="Ready to Secure Your Child’s Academic Future?"
        subtitle="Book a complimentary 2-day classroom trial pass and experience our concept-first teaching methodology firsthand."
      />
    </div>
  );
};
