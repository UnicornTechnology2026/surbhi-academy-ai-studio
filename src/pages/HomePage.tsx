import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Trophy,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { CourseCard } from "../components/CourseCard";
import { RankCard } from "../components/RankCard";
import { CTASection } from "../components/CTASection";
import { SectionHeader } from "../components/SectionHeader";
import { CourseCategory } from "../types";

interface HomePageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const { courses, achievers } = useAcademy();
  const [activeCourseCategory, setActiveCourseCategory] = useState<
    "all" | CourseCategory
  >("all");

  // Filter active courses
  const filteredCourses = courses
    .filter((c) => c.status === "active")
    .filter((c) =>
      activeCourseCategory === "all"
        ? true
        : c.category === activeCourseCategory,
    );

  // Top featured achievers
  const featuredAchievers = achievers
    .filter((a) => a.status === "active" && a.featured)
    .slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 overflow-hidden">
      {/* 1. HERO SECTION - High Visual Impact & Social Proof */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden bg-linear-to-b from-amber-50/50 via-slate-50/60 to-white">
        {/* Animated background ambient glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-150 h-150 bg-amber-400/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-137.5 h-137.5 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -ml-20"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="hero-orbit absolute -right-32 top-24 h-96 w-96 rounded-full border border-amber-400/20 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="hero-orbit hero-orbit--inner absolute -right-20 top-36 h-72 w-72 rounded-full border border-blue-400/15 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Headline, Social Proof & CTAs */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Main Headline */}
              <motion.h1
                variants={revealItem}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-[#0F172A] leading-[1.12] tracking-tight"
              >
                Where concepts{" "}
                <span className="hero-highlight text-amber-600 italic">
                  finally click
                </span>{" "}
                and top ranks happen.
              </motion.h1>

              {/* Persuasive Subtitle */}
              <motion.p
                variants={revealItem}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Our focused batches, experienced faculty, and personalized
                guidance help every student build strong concepts, gain
                confidence, and achieve better results.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={revealItem}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenEnquiry()}
                  className="w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer border border-amber-500/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Book Free 2-Day Trial Pass</span>
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/courses"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Explore Batches & Timings</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={revealItem}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1 text-xs font-semibold text-slate-500"
              >
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Concept-first teaching
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  Small focused batches
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="w-4 h-4 text-blue-600" />
                  Daily doubt support
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Visual with Interactive Trial Card & Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <motion.div
                  animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.6, 0.35] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-amber-400/40 via-transparent to-blue-500/25 blur-xl pointer-events-none"
                />
                {/* Classroom Image with Badges */}
                <motion.div
                  whileHover={{ y: -8, rotate: 0.5 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-4/5 group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="Surabhi Coaching Academy Classroom & Toppers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />
                  <motion.div
                    animate={{ x: ["-130%", "130%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5.5,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-linear-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                  />

                  {/* Bottom Text Inside Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      <span>Consistent City & State Ranks</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                      "I used to fear Physics. Now it's my highest scoring
                      subject."
                    </h3>
                  </div>
                </motion.div>

                {/* Floating Animated Speech Bubble 1 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                  }}
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
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3.5 max-w-xs z-20"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      99%+ board scores
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Consistency compounds
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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
              Explore Our Batches
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
              Specialized Coaching Programs
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Small batch sizes, clear concepts, and structured revision cycles
              to secure 90%+ marks.
            </p>
          </div>

          {/* Stream Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all" as const, label: "All Batches" },
              { id: "foundation" as const, label: "Class 8–10 Foundation" },
              { id: "science" as const, label: "11–12 Science" },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCourseCategory(filter.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCourseCategory === filter.id
                    ? "bg-[#0F172A] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {activeCourseCategory === filter.id && (
                  <motion.span
                    layoutId="course-filter-highlight"
                    className="absolute inset-0 rounded-full bg-[#0F172A]"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Course Cards Grid */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeCourseCategory}
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.slice(0, 6).map((course) => (
              <motion.div key={course.id} variants={revealItem} layout>
                <CourseCard
                  course={course}
                  onEnquire={(slug) => onOpenEnquiry(slug)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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

          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
          >
            {featuredAchievers.map((student) => (
              <motion.div key={student.id} variants={revealItem}>
                <RankCard student={student} isFeatured={true} />
              </motion.div>
            ))}
          </motion.div>

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
