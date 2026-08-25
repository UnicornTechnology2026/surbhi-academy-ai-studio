import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Trophy,
  GraduationCap,
  UserCheck,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Award,
  ChevronRight,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CourseCard } from '../components/CourseCard';
import { RankCard } from '../components/RankCard';
import { FacultyCard } from '../components/FacultyCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { CTASection } from '../components/CTASection';
import { COURSES_DATA } from '../data/courses';
import { RESULTS_DATA } from '../data/results';
import { FACULTY_DATA } from '../data/faculty';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { ACADEMY_INFO } from '../data/academyInfo';

interface HomeProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenEnquiry }) => {
  // Top 3 courses for quick home preview
  const featuredCourses = COURSES_DATA.slice(0, 3);
  // Top 4 results for home hall of fame
  const topRankers = RESULTS_DATA.slice(0, 4);
  // Top 3 faculty members
  const featuredFaculty = FACULTY_DATA.slice(0, 3);

  // Icon mapping for Why Choose Us
  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-amber-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-600" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      default: return <Award className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION - Artistic Flair theme styling */}
      <section className="relative bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          {/* Left Column: Headline, Trust & CTAs */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            {/* Artistic Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <div className="w-10 h-[1.5px] bg-amber-500" />
              <span className="text-amber-700 font-bold text-xs tracking-widest uppercase">
                The Pursuit of Academic Excellence
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.12] text-[#0F172A] mb-6">
              Empowering Students to Achieve{' '}
              <span className="italic font-normal text-amber-600">
                Academic
              </span>{' '}
              Brilliance
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              Expert guidance, structured learning, dedicated faculty, and a proven approach to help students achieve their academic goals in Board Exams and Competitive Foundations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/courses"
                className="bg-[#0F172A] hover:bg-slate-800 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-slate-300 flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
              <button
                onClick={() => onOpenEnquiry()}
                className="bg-white hover:bg-slate-50 text-[#0F172A] border-2 border-[#0F172A] px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Enquire Now</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            {/* Quick Trust Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200/60">
                <div className="text-2xl lg:text-3xl font-serif font-extrabold text-[#0F172A]">
                  15+
                </div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-0.5">
                  Years of Excellence
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200/60">
                <div className="text-2xl lg:text-3xl font-serif font-extrabold text-[#0F172A]">
                  12,500+
                </div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-0.5">
                  Successful Students
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200/60">
                <div className="text-2xl lg:text-3xl font-serif font-extrabold text-[#0F172A]">
                  28+
                </div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-0.5">
                  Expert Faculty
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-200/60">
                <div className="text-2xl lg:text-3xl font-serif font-extrabold text-amber-600">
                  520+
                </div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-0.5">
                  Top Achievers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual & Artistic Geometric Backdrop */}
          <div className="lg:col-span-5 relative bg-[#0F172A] p-8 sm:p-12 flex flex-col justify-between overflow-hidden min-h-[380px]">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-slate-900/60 pointer-events-none" />

            {/* Concentric rings matching artistic design */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/10 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-white/15 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-white/5 rounded-full backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border border-white/10 shadow-2xl">
                  <span className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                    Academic Year 2026–27
                  </span>
                  <span className="text-white font-serif text-2xl font-bold italic">
                    Admissions Open
                  </span>
                  <span className="text-slate-300 text-[11px] mt-1">
                    Class 6 to 12
                  </span>
                </div>
              </div>
            </div>

            {/* Background watermark typography */}
            <div className="absolute bottom-4 right-4 text-white/5 font-serif text-8xl lg:text-9xl italic select-none pointer-events-none leading-none">
              Excel
            </div>

            {/* Top Badge on right side */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-[11px] text-amber-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>#1 Ranked Coaching In Region</span>
              </div>
            </div>

            {/* Bottom floating merit spotlight card */}
            <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-xl text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                  Recent Board Benchmark
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-semibold">
                  100% Pass Rate
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-serif font-bold text-sm flex items-center justify-center border border-amber-500/40">
                  99.2%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">City Rank 1 Topper in Class 10</div>
                  <div className="text-[11px] text-slate-400">Ananya Deshmukh • 100/100 in Math & Science</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Quick Navigation Ribbon from Artistic Flair Spec */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-slate-200/80 bg-white">
          <div className="p-6 lg:p-8 border-b sm:border-b-0 sm:border-r border-slate-200/80 hover:bg-slate-50 transition-colors group">
            <div className="text-amber-600 font-serif text-3xl mb-2 font-bold">01</div>
            <h3 className="font-bold text-[#0F172A] uppercase text-xs tracking-widest mb-2 flex items-center justify-between">
              <span>Junior Foundation</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Class 6–8 rigorous training focusing on fundamental clarity, geometry concepts, and mental logic.
            </p>
          </div>

          <div className="p-6 lg:p-8 border-b sm:border-b-0 sm:border-r border-slate-200/80 hover:bg-slate-50 transition-colors group">
            <div className="text-amber-600 font-serif text-3xl mb-2 font-bold">02</div>
            <h3 className="font-bold text-[#0F172A] uppercase text-xs tracking-widest mb-2 flex items-center justify-between">
              <span>Secondary & Boards</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Class 9 & 10 intensive curriculum with 3-tier revision system and board answer writing drills.
            </p>
          </div>

          <div className="p-6 lg:p-8 border-b lg:border-b-0 sm:border-r border-slate-200/80 hover:bg-slate-50 transition-colors group">
            <div className="text-amber-600 font-serif text-3xl mb-2 font-bold">03</div>
            <h3 className="font-bold text-[#0F172A] uppercase text-xs tracking-widest mb-2 flex items-center justify-between">
              <span>Senior Secondary</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Class 11 & 12 Science (PCM/PCB) and Commerce Pro with CA & Ph.D. faculty mentorship.
            </p>
          </div>

          <div className="p-6 lg:p-8 bg-slate-50/80 relative hover:bg-slate-100/80 transition-colors">
            <div className="text-amber-600 font-serif text-3xl mb-2 font-bold">04</div>
            <h3 className="font-bold text-[#0F172A] uppercase text-xs tracking-widest mb-2">
              <span>Competitive Edge</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Specialized coaching for Olympiads, NTSE, and entrance fundamentals with national percentile benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE SURABHI COACHING ACADEMY */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Surabhi Academy"
            title="A Proven Foundation for"
            highlightText="Lifelong Success"
            description="Our student-centered methodology blends academic rigor with continuous encouragement and personal attention."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ACADEMY_INFO.whyChooseUs.map((item, index) => (
              <div
                key={item.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-50/50 transition-colors">
                      {getWhyIcon(item.icon)}
                    </div>
                    <span className="text-xs font-serif font-bold text-slate-300 group-hover:text-amber-600 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#0F172A] group-hover:text-amber-700 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <span>Core Academic Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES PREVIEW */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-3">
                <div className="w-8 h-[1.5px] bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Comprehensive Curriculum
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
                Featured Academic <span className="italic font-normal text-amber-600">Programs</span>
              </h2>
            </div>
            <Link
              to="/courses"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:text-amber-700 transition-colors group"
            >
              <span>View All 7 Programs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnquire={onOpenEnquiry}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md transition-all"
            >
              <span>Browse Full Course Catalog & Detailed Syllabus</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HALL OF FAME / RANK HOLDERS SPOTLIGHT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Hall of Fame"
            title="Our Top Performing"
            highlightText="Rank Holders"
            description="Celebrating the relentless effort, discipline, and extraordinary scores of Surabhi Coaching Academy students."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRankers.map((student) => (
              <RankCard
                key={student.id}
                student={student}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md transition-all"
            >
              <span>View Full Hall of Fame & Results Archive</span>
              <Trophy className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP PEDAGOGICAL APPROACH */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            eyebrow="Our Teaching Methodology"
            title="The Surabhi 4-Step"
            highlightText="Learning Cycle"
            description="A proven academic framework designed to bridge the gap between understanding concepts and scoring top marks."
            dark
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMY_INFO.pedagogicalApproach.map((step) => (
              <div
                key={step.step}
                className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 group"
              >
                <div>
                  <div className="text-3xl lg:text-4xl font-serif font-extrabold text-amber-400 mb-4 group-hover:scale-110 transition-transform inline-block">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Structured Milestone</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FACULTY SPOTLIGHT */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-3">
                <div className="w-8 h-[1.5px] bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Academic Mentors
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
                Learn from Renowned <span className="italic font-normal text-amber-600">Educators</span>
              </h2>
            </div>
            <Link
              to="/faculty"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:text-amber-700 transition-colors group"
            >
              <span>Meet All Department Heads</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFaculty.map((fac) => (
              <FacultyCard
                key={fac.id}
                faculty={fac}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDENT & PARENT SUCCESS STORIES (TESTIMONIALS) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Student & Parent Voices"
            title="Stories of Trust and"
            highlightText="Transformation"
            description="Read real experiences from families who entrusted Surabhi Coaching Academy with their child’s academic future."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.slice(0, 3).map((test) => (
              <TestimonialCard
                key={test.id}
                testimonial={test}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
