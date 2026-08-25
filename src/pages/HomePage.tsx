import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  MessageCircle,
  HelpCircle,
  Zap,
  Check,
  X as CloseIcon
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
  const { courses, achievers, faculty, testimonials, heroContent } = useAcademy();
  const [activeCourseCategory, setActiveCourseCategory] = useState<'all' | CourseCategory>('all');
  const [selectedGradeTab, setSelectedGradeTab] = useState<'10' | '11' | '12' | '8-9'>('10');

  // Filter active courses
  const filteredCourses = courses
    .filter((c) => c.status === 'active')
    .filter((c) => (activeCourseCategory === 'all' ? true : c.category === activeCourseCategory));

  // Top featured achievers
  const featuredAchievers = achievers
    .filter((a) => a.status === 'active' && a.featured)
    .slice(0, 3);

  // Conversational Grade Finder Data
  const gradeFinderData = {
    '8-9': {
      title: 'Class 8 & 9 Strong Foundations',
      tagline: 'Remove math & science anxiety early before high school pressures begin.',
      perks: ['Math, Science & English mastery', 'Weekly diagnostic quizzes', 'Concept-building experiments'],
      timing: '4:30 PM – 7:30 PM (Mon-Sat)',
      slug: 'class-9-foundation'
    },
    '10': {
      title: 'Class 10 Board Excellence Program',
      tagline: 'Step-by-step scoring formula to guarantee 90%+ in CBSE & State Boards.',
      perks: ['10-year question bank analysis', 'Examiner answer-writing training', '3 full-length pre-board simulations'],
      timing: '5:00 PM – 8:30 PM (Mon-Sat)',
      slug: 'class-10-board-excellence'
    },
    '11': {
      title: 'Class 11 Science (Physics, Chem, Math/Bio)',
      tagline: 'Bridge the jump from Class 10 with deep fundamental physics & chemistry coaching.',
      perks: ['Zero backlog policy with recorded recap', 'Numerical solving speed drills', 'Integrated JEE/NEET basics'],
      timing: '7:30 AM – 10:30 AM OR 4:00 PM – 7:00 PM',
      slug: 'class-11-science'
    },
    '12': {
      title: 'Class 12 Boards + Entrance Exam Batch',
      tagline: 'Master both board syllabus and entrance MCQs without burnout or confusion.',
      perks: ['Syllabus wrap-up by November', 'December-January full mock revision', '1-on-1 teacher doubt clinic'],
      timing: '6:30 AM – 9:30 AM OR 5:00 PM – 8:00 PM',
      slug: 'class-12-science'
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">

      {/* 1. HERO SECTION - Conversational & Animated */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-amber-50/40 via-slate-50/50 to-white">
        {/* Animated ambient background shapes */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -ml-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Conversational Hero Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Conversational Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-300 shadow-xs text-xs font-bold text-amber-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Admissions Open 2026–27 • Free 2-Day Trial</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-[#0F172A] leading-[1.12] tracking-tight">
                Where concepts <span className="text-amber-600 italic">finally click</span> and top ranks happen.
              </h1>

              {/* Punchy Talkative Subhead */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                No 100-student crowded auditoriums. Just 25 curious minds per batch, master teachers who know your name, and daily 1-on-1 doubt clearing until every problem makes sense.
              </p>

              {/* Conversational Checkmarks */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-800 pt-1">
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Max 25-30 Per Batch</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily 1-on-1 Doubt Desk</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2-Day Free Trial Pass</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenEnquiry()}
                  className="w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Book Free 2-Day Trial Pass</span>
                </motion.button>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/courses"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Explore Batches</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual with Animated Floating Speech Bubbles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Classroom Image with Gradient Overlay */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5] group">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="Surbhi Coaching Academy Classroom & Toppers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#0F172A]/90 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      ★ 29+ Years in Nagpur
                    </span>
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      100% Board Pass
                    </span>
                  </div>

                  {/* Bottom Text in Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      <span>Consistent City Toppers</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      "I used to fear Physics. Now it's my highest scoring subject."
                    </h3>
                    <p className="text-xs text-slate-300">
                      — Class 10 Board Distinction Student
                    </p>
                  </div>
                </div>

                {/* Floating Animated Speech Bubble 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-5 -left-5 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 max-w-xs z-10"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold">
                    💬
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900">
                      "Daily Doubt Sessions"
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Sit 1-on-1 with teachers everyday
                    </div>
                  </div>
                </motion.div>

                {/* Floating Animated Topper Pill 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3.5 max-w-xs z-10"
                >
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
                      Ananya (Class 10 State)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      100/100 Math & Science
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Statistics Bar - Animated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 sm:mt-16 pt-8 border-t border-slate-200/80"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0F172A]">
                  29+
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Years of Trust in Nagpur
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-600">
                  12,500+
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Students Mentored
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0F172A]">
                  100%
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Board Exam Pass Rate
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-600">
                  Max 25-30
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Students per Batch
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE "FIND YOUR BATCH" CONVERSATIONAL WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Quick Interactive Match
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Which Class are You Looking For?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Click your grade below to see how our batches work, timing options, and book your free 2-day trial.
              </p>

              {/* Grade Selector Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {(['8-9', '10', '11', '12'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedGradeTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedGradeTab === tab
                        ? 'bg-amber-500 text-slate-950 shadow-lg scale-105'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {tab === '8-9' ? 'Class 8 & 9' : `Class ${tab}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Card for Selected Grade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGradeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>{gradeFinderData[selectedGradeTab].title}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      {gradeFinderData[selectedGradeTab].tagline}
                    </h3>
                    <div className="space-y-1.5 pt-2">
                      {gradeFinderData[selectedGradeTab].perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-amber-300/90 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Batch Timing: {gradeFinderData[selectedGradeTab].timing}</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-3 justify-center">
                    <button
                      onClick={() => onOpenEnquiry(gradeFinderData[selectedGradeTab].slug)}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Claim 2-Day Trial</span>
                    </button>
                    <Link
                      to={`/courses/${gradeFinderData[selectedGradeTab].slug}`}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all text-center flex items-center justify-center gap-1"
                    >
                      <span>Full Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. THE SURBHI DIFFERENCE - Talkative Before/After Contrast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Surbhi Difference"
          title="Why Nagpur Parents & Students Switch to Us"
          subtitle="Tired of crowded coaching classes where your child is just a roll number? Here is how we do things differently."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* The Ordinary Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-5"
          >
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs font-extrabold">✕</span>
              <span>The Big Factory Institutes</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-800">
              80–120 students packed in an auditorium
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Teachers don't know the student's name or weak areas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Doubts go unanswered because students feel shy in giant rooms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Formula memorization without understanding real-life concepts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Parents only find out about weak scores at the end of the year.</span>
              </li>
            </ul>
          </motion.div>

          {/* The Surbhi Academy Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border-2 border-amber-400/80 shadow-xl space-y-5 relative"
          >
            <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Surbhi Standard
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-extrabold">✓</span>
              <span>The Surbhi Academy Approach</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0F172A]">
              Strict 25–30 student limit with daily personal mentor
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-900">Every student is known, mentored, and tracked individually.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-900">Daily 1-on-1 doubt time with subject faculties after every lecture.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-900">Concept-first interactive demonstrations — zero mindless rote learning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-900">Weekly WhatsApp test report cards so parents are always in the loop.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 4. FEATURED COURSES / ACADEMIC PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
              Explore Our Batches
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
              Specialized Coaching Programs
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Small batch sizes, clear concepts, and structured revision cycles to secure 90%+ marks.
            </p>
          </div>

          {/* Stream Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCourseCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCourseCategory === 'all'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setActiveCourseCategory('foundation')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCourseCategory === 'foundation'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Class 8–10 Foundation
            </button>
            <button
              onClick={() => setActiveCourseCategory('science')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCourseCategory === 'science'
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              11–12 Science
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
            <span>View Full Batch Timetable & Fees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. 4-STEP TEACHING METHODOLOGY - Conversational & Animated */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-white/10 text-amber-400 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3">
              How We Teach
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 4-Step Formula to Academic Confidence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              No guesswork. Just a proven 4-stage system that takes students from confused to top rankers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3"
            >
              <div className="text-2xl font-serif font-extrabold text-amber-400">Step 1</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Understand the "Why"
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visual smartboard demonstrations and practical analogies so you grasp the idea before touching formulas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3"
            >
              <div className="text-2xl font-serif font-extrabold text-amber-400">Step 2</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Targeted Daily Practice
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solve graded 10-problem daily sheets (DPPs) directly matched to what was taught in class today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3"
            >
              <div className="text-2xl font-serif font-extrabold text-amber-400">Step 3</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Daily 1-on-1 Doubt Desk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stuck on a question? Sit with your subject teacher individually until you understand every single step.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3"
            >
              <div className="text-2xl font-serif font-extrabold text-amber-400">Step 4</div>
              <h3 className="text-lg font-serif font-bold text-white">
                Pre-Board Exam Drills
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Simulated 3-hour board exams on official answer sheets with examiners' step-by-step marking rubrics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. HALL OF FAME / TOP ACHIEVERS */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Hall of Fame"
            title="Real Students. Real 99%+ Board Scores."
            subtitle="Meet our top rankers who turned their effort into city and state board distinction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {featuredAchievers.map((student) => (
              <RankCard key={student.id} student={student} isFeatured={true} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all shadow-md"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>See All Board Toppers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TALKATIVE TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Parent & Student Voices"
          title="What Families Love About Surbhi"
          subtitle="Direct, unfiltered feedback from students and parents across Nagpur."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.filter(t => t.status === 'active').slice(0, 3).map((test) => (
            <TestimonialCard key={test.id} testimonial={test} />
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug)}
        title="Curious? Sit in our classroom for 2 days free."
        subtitle="Experience our teaching, meet the faculty, and see how much your child learns in just 48 hours. Zero commitments."
      />
    </div>
  );
};
