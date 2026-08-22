import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  BookOpen,
  ArrowLeft,
  Phone,
  GraduationCap,
  Award,
  ChevronRight,
  ShieldCheck,
  Download,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { FacultyCard } from '../components/FacultyCard';
import { RankCard } from '../components/RankCard';
import { CTASection } from '../components/CTASection';

interface CourseDetailPageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const { courses, faculty, achievers, siteSettings } = useAcademy();

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">Course Not Found</h2>
        <p className="text-slate-600 text-sm">
          The requested course program could not be located or has been archived.
        </p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>
      </div>
    );
  }

  // Related achievers from similar category
  const relatedAchievers = achievers
    .filter((a) => a.status === 'active' && (a.category === course.category || course.gradeLevel.includes(a.gradeLevel)))
    .slice(0, 3);

  // Relevant faculty teaching this program
  const relevantFaculty = faculty
    .filter((f) => f.status === 'active' && f.classesTaught.some((cls) => course.gradeLevel.includes(cls)))
    .slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses" className="hover:text-amber-700">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold truncate">{course.title}</span>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Course Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.gradeLevel}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.category}
              </span>
              {course.badge && (
                <span className="bg-[#0F172A] text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {course.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Duration
                </div>
                <div className="text-sm font-bold text-slate-900">{course.duration}</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  Batch Size
                </div>
                <div className="text-sm font-bold text-slate-900">{course.batchSize}</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  Eligibility
                </div>
                <div className="text-sm font-bold text-slate-900">{course.eligibility}</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                  Target Exam
                </div>
                <div className="text-sm font-bold text-slate-900">{course.targetExam}</div>
              </div>
            </div>

            {/* Course Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 max-h-96">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Program Highlights */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
                Key Program Features & Deliverables
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects Covered */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
                Subjects & Syllabus Modules
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.subjects.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Curriculum Breakdown */}
            {course.curriculumHighlights && course.curriculumHighlights.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
                  Course Structure & Phases
                </h2>
                <div className="space-y-3">
                  {course.curriculumHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-serif font-bold text-[#0F172A]">
                          {item.title}
                        </h3>
                        {item.duration && (
                          <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md">
                            {item.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                      {item.topics && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {item.topics.map((t, i) => (
                            <span key={i} className="text-[11px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-100">
                              • {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Enrollment 2026–27
                </div>
                <div className="text-2xl font-serif font-bold text-[#0F172A] mt-1">
                  {course.feeStructure}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Flexible installment schedules & merit scholarships available.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOpenEnquiry(course.slug)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free 2-Day Trial</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry(course.slug)}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Request Full Syllabus PDF</span>
                </button>
              </div>

              {/* Batch Timings Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Available Batch Timings</span>
                </div>
                <div className="text-slate-600 space-y-1">
                  <div>🌅 <strong>Morning Batch:</strong> 06:45 AM – 09:30 AM</div>
                  <div>🌆 <strong>Evening Batch:</strong> 04:30 PM – 07:45 PM</div>
                  <div>🎯 <strong>Doubt Clinic:</strong> 07:45 PM – 08:30 PM (Daily)</div>
                </div>
              </div>

              {/* Direct helpline assistance */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2 text-xs">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Speak With Lead Counselor</span>
                </div>
                <div className="text-amber-900">
                  Call directly at <span className="font-bold">{siteSettings.primaryPhone}</span> for seat availability.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Faculty */}
      {relevantFaculty.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
              Mentorship Team
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0F172A]">
              Faculty Mentors for this Program
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relevantFaculty.map((f) => (
              <FacultyCard key={f.id} faculty={f} />
            ))}
          </div>
        </section>
      )}

      {/* 4. CTA */}
      <CTASection
        onOpenEnquiry={(slug) => onOpenEnquiry(slug || course.slug)}
        title={`Enroll in ${course.title} Today`}
        subtitle="Seats are strictly capped at 25–30 students per batch to ensure personalized guidance."
      />
    </div>
  );
};