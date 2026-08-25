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
  X as CloseIcon,
  Phone,
  Calendar,
  Send,
  Eye,
  Smile,
  Flame,
  BadgeCheck
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { CourseCard } from '../components/CourseCard';
import { RankCard } from '../components/RankCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { CTASection } from '../components/CTASection';
import { SectionHeader } from '../components/SectionHeader';
import { CourseCategory } from '../types';

interface HomePageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const { courses, achievers, faculty, testimonials, heroContent, siteSettings, submitEnquiry } = useAcademy();
  const [activeCourseCategory, setActiveCourseCategory] = useState<'all' | CourseCategory>('all');
  const [selectedGradeTab, setSelectedGradeTab] = useState<'10' | '11' | '12' | '8-9'>('10');

  // Quick trial form state
  const [quickForm, setQuickForm] = useState({
    studentName: '',
    mobileNumber: '',
    grade: 'Class 10'
  });
  const [quickFormSuccess, setQuickFormSuccess] = useState(false);
  const [quickFormSubmitting, setQuickFormSubmitting] = useState(false);

  const handleQuickFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.studentName || !quickForm.mobileNumber) return;
    setQuickFormSubmitting(true);
    await submitEnquiry({
      studentName: quickForm.studentName,
      mobileNumber: quickForm.mobileNumber,
      studentClass: quickForm.grade,
      courseInterested: `${quickForm.grade} Free 2-Day Trial`,
      source: 'Hero Quick Booking Widget'
    });
    setQuickFormSubmitting(false);
    setQuickFormSuccess(true);
  };

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
      tagline: 'Remove math & science fear early before high school pressures begin.',
      perks: [
        'Math, Science & English conceptual mastery',
        'Weekly diagnostic quizzes & oral problem solving',
        'Interactive experiments & visual physical models'
      ],
      timing: '4:30 PM – 7:30 PM (Evening Batch)',
      seatsLeft: 6,
      slug: 'class-9-foundation'
    },
    '10': {
      title: 'Class 10 Board Excellence Program',
      tagline: 'Step-by-step scoring formula to secure 90%+ in CBSE & Maharashtra State Boards.',
      perks: [
        '10-year question bank analysis & examiner tips',
        'Step-wise answer writing rubrics for full marks',
        '3 full-length pre-board simulations on board sheets'
      ],
      timing: '5:00 PM – 8:30 PM (Evening Batch)',
      seatsLeft: 4,
      slug: 'class-10-board-excellence'
    },
    '11': {
      title: 'Class 11 Science (Physics, Chem, Math/Bio)',
      tagline: 'Bridge the jump from Class 10 with deep fundamental physics & chemistry coaching.',
      perks: [
        'Zero backlog policy with recorded recap notes',
        'Numerical solving speed drills & formula maps',
        'Integrated JEE & NEET competitive basics'
      ],
      timing: '7:30 AM – 10:30 AM (Morning) OR 4:00 PM – 7:00 PM (Evening)',
      seatsLeft: 7,
      slug: 'class-11-science'
    },
    '12': {
      title: 'Class 12 Boards + Entrance Exam Batch',
      tagline: 'Master both board syllabus and entrance MCQs without burnout or confusion.',
      perks: [
        'Complete syllabus wrap-up by November',
        'December-January full mock revision series',
        '1-on-1 teacher doubt clinic every single day'
      ],
      timing: '6:30 AM – 9:30 AM (Morning) OR 5:00 PM – 8:00 PM (Evening)',
      seatsLeft: 5,
      slug: 'class-12-science'
    }
  };

  // Real Score Transformation Stories
  const transformationStories = [
    {
      name: 'Aditya Joshi',
      grade: 'Class 10 CBSE',
      school: 'Bhavan’s Bhagwandas Purohit Vidya Mandir',
      beforeScore: '64%',
      beforeLabel: 'Class 9 Final Exam',
      afterScore: '96.2%',
      afterLabel: 'Class 10 CBSE Board',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      story: 'I had serious math anxiety and skipped numericals. The daily 1-on-1 doubt clearing at Surbhi rebuilt my confidence from step one.'
    },
    {
      name: 'Sneha Raut',
      grade: 'Class 12 HSC Science',
      school: 'Somalwar High School & Jr College',
      beforeScore: '59%',
      beforeLabel: 'Class 11 Chemistry',
      afterScore: '98/100',
      afterLabel: 'HSC Chemistry (95.4% Overall)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      story: 'Organic chemistry was a nightmare until our chemistry sir gave us step-by-step reaction mechanisms. Surbhi turned my weakest subject into my highest.'
    },
    {
      name: 'Rohan Kulkarni',
      grade: 'Class 10 State Board',
      school: 'Centre Point School',
      beforeScore: '71%',
      beforeLabel: 'Class 9 Science',
      afterScore: '100/100',
      afterLabel: 'Perfect Score in Science & Math',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      story: 'The 3 full-length pre-board simulations gave me the exact timing and presentation strategy needed for a 100/100 score.'
    }
  ];

  // Campus & Facility Highlights
  const campusFacilities = [
    {
      title: 'Smart Interactive Classrooms',
      desc: '3D animations, digital diagrams, and live concept demonstrations that make complex science instantly intuitive.',
      icon: '🖥️',
      tag: 'Visual Learning'
    },
    {
      title: 'Daily 1-on-1 Doubt Desk',
      desc: 'No student goes home confused. Senior subject faculties stay back every evening for individual doubt clearing.',
      icon: '👨‍🏫',
      tag: 'Personal Mentorship'
    },
    {
      title: 'Graded Daily Practice Sheets (DPPs)',
      desc: '10 targeted questions after every lecture to build rock-solid problem solving habits.',
      icon: '📝',
      tag: 'Concept Mastery'
    },
    {
      title: 'Weekly Parent WhatsApp Reports',
      desc: 'Detailed attendance, test scores, and teacher remarks sent directly to parents every weekend.',
      icon: '📱',
      tag: 'Total Transparency'
    },
    {
      title: 'AC Quiet Study Zone & Library',
      desc: 'Peaceful, distraction-free library with reference books and question banks open before and after class.',
      icon: '📚',
      tag: 'Focused Atmosphere'
    },
    {
      title: 'Official Board Simulation Mocks',
      desc: 'Rigorous 3-hour mock exams on official board answer sheets with strict step-wise examiner marking.',
      icon: '🎯',
      tag: 'Exam Readiness'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">

      {/* 1. HERO SECTION - High Visual Impact & Social Proof */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-amber-50/50 via-slate-50/60 to-white">
        {/* Animated background ambient glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none -ml-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headline, Social Proof & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-[#0F172A] leading-[1.12] tracking-tight">
                Where concepts <span className="text-amber-600 italic">finally click</span> and top ranks happen.
              </h1>

              {/* Persuasive Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                No 100-student crowded auditoriums. Just 25 curious minds per batch, master teachers who know your child's name, and daily 1-on-1 doubt clearing until every problem makes sense.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenEnquiry()}
                  className="w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer border border-amber-500/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Book Free 2-Day Trial Pass</span>
                </motion.button>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/courses"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Explore Batches & Timings</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>


            </motion.div>

            {/* Right Column: Hero Visual with Interactive Trial Card & Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Classroom Image with Badges */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/5] group">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="Surabhi Coaching Academy Classroom & Toppers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />


                  {/* Bottom Text Inside Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      <span>Consistent City & State Ranks</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                      "I used to fear Physics. Now it's my highest scoring subject."
                    </h3>
                    <p className="text-xs text-slate-300">
                      — Ananya Deshmukh (99.2% Class 10 Board Distinction)
                    </p>
                  </div>
                </div>

                {/* Floating Animated Speech Bubble 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -top-5 -left-5 bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3 max-w-xs z-20"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold text-lg">
                    💬
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      "Daily Doubt Sessions"
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Sit 1-on-1 with teachers
                    </div>
                  </div>
                </motion.div>

                {/* Floating Animated Topper Pill 2 */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3.5 max-w-xs z-20"
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
                      Ananya Deshmukh
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      100/100 Math & Science
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED ACADEMIC PROGRAMS GRID */}
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
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'all'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setActiveCourseCategory('foundation')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'foundation'
                ? 'bg-[#0F172A] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Class 8–10 Foundation
            </button>
            <button
              onClick={() => setActiveCourseCategory('science')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeCourseCategory === 'science'
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
            <span>View Full Batch Timetable & Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. HALL OF FAME / TOP ACHIEVERS */}
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

      {/* 8. TALKATIVE PARENT & STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Parent & Student Voices"
          title="What Nagpur Families Say About Surbhi"
          subtitle="Direct, unfiltered feedback from students and parents across Nagpur."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.filter(t => t.status === 'active').slice(0, 3).map((test) => (
            <TestimonialCard key={test.id} testimonial={test} />
          ))}
        </div>
      </section>

      {/* 9. CALL TO ACTION - 2-Day Free Trial Banner */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug)}
        title="Curious? Sit in our classroom for 2 days free."
        subtitle="Experience our teaching, meet the faculty, and see how much your child learns in just 48 hours. Zero commitments."
      />
    </div>
  );
};
