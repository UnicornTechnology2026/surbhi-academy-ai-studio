import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowLeft,
  Phone,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";
import { COURSES_DATA } from "../data/courses";
import { FACULTY_DATA } from "../data/faculty";
import { FacultyCard } from "../components/FacultyCard";
import { CourseCard } from "../components/CourseCard";
import { CTASection } from "../components/CTASection";
import { ACADEMY_INFO } from "../data/academyInfo";

interface CourseDetailProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  onOpenEnquiry,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  // Related courses in the same category or overall
  const relatedCourses = COURSES_DATA.filter((c) => c.id !== course.id).slice(
    0,
    3,
  );

  // Faculty related to the course department
  const relatedFaculty = FACULTY_DATA.slice(0, 2);

  return (
    <div className="bg-white">
      {/* Top Breadcrumb & Hero Header */}
      <section className="relative bg-[#0F172A] text-white py-14 sm:py-18 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-white/5 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {course.categoryLabel}
                </span>
                <span className="bg-white/10 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {course.gradeLevel}
                </span>
                {course.badge && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry(course.slug)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enquire For This Batch</span>
                </button>
                <a
                  href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call: {ACADEMY_INFO.contact.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Quick Summary Card */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 border-b border-slate-800 pb-2">
                Program Quick Facts
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Duration:
                  </span>
                  <span className="font-semibold text-white">
                    {course.duration}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Batch Size:
                  </span>
                  <span className="font-semibold text-white">
                    {course.batchSize}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Timings:
                  </span>
                  <span className="font-semibold text-white text-right">
                    {course.classTiming}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />{" "}
                    Assessment:
                  </span>
                  <span className="font-semibold text-white">
                    Weekly Diagnostic Tests
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* 1. Overview */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  <span>Program Overview</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* 2. Subjects Covered */}
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-4">
                  Subjects Covered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.subjects.map((sub, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">
                        {sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Curriculum Highlights */}
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-4">
                  Curriculum Highlights & Modules
                </h3>
                <div className="space-y-4">
                  {course.curriculumHighlights.map((mod, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80"
                    >
                      <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">
                        Module 0{i + 1}
                      </div>
                      <h4 className="text-base font-serif font-bold text-[#0F172A] mb-1.5">
                        {mod.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Program Features */}
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-4">
                  Why Students Excel in This Program
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Materials Included */}
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-4">
                  Study Materials & Kit Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.materialsIncluded.map((mat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200"
                    >
                      <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar: Admission & Eligibility */}
            <div className="lg:col-span-4 space-y-8">
              {/* Eligibility & Batch Details Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">
                    Who Should Join
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#0F172A] mb-2">
                    Eligibility Criteria
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.eligibility}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-2">
                    Targeted Examinations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.targetedExams.map((exam, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => onOpenEnquiry(course.slug)}
                    className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Batch Enrollment</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>

              {/* Free Trial Banner */}
              <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif font-bold text-slate-900 mb-1">
                  2-Day Free Trial Pass
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Attend actual live classes with our faculty before making any
                  enrollment commitment.
                </p>
                <button
                  onClick={() => onOpenEnquiry(course.slug)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Claim Free Trial Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
              Explore Other Academic Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCourses.map((c) => (
              <CourseCard key={c.id} course={c} onEnquire={onOpenEnquiry} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
