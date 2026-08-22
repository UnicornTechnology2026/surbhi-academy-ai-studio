import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Award, 
  Users, 
  Clock, 
  Phone, 
  ShieldCheck,
  Send,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface AdmissionsPageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onOpenEnquiry }) => {
  const { courses, siteSettings, submitEnquiry } = useAcademy();

  const [form, setForm] = useState({
    studentName: '',
    parentName: '',
    mobileNumber: '',
    emailAddress: '',
    studentClass: 'Class 10',
    courseInterested: courses[0]?.title || 'Class 10 Board Excellence',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.mobileNumber) return;
    setSubmitting(true);
    await submitEnquiry({
      studentName: form.studentName,
      parentName: form.parentName,
      mobileNumber: form.mobileNumber,
      emailAddress: form.emailAddress,
      studentClass: form.studentClass,
      courseInterested: form.courseInterested,
      message: form.message,
      source: 'Admissions Page Form'
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Session 2026–27</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Admissions & 2-Day Complimentary Trial Passes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Experience our interactive teaching and meet senior faculty before taking admission. Seats are strictly limited to 25–30 students per batch.
          </p>
        </div>
      </section>

      {/* 2. Four-Step Admission Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Simple & Transparent"
          title="Our 4-Step Admission Journey"
          subtitle="A clear, zero-pressure admission process focused on aligning the student’s needs with the right batch."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-serif font-bold text-base flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-serif font-bold text-[#0F172A]">
              Enquiry & Diagnostic Review
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit your enquiry online or visit the campus to discuss academic goals and evaluate baseline strengths.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-serif font-bold text-base flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-serif font-bold text-[#0F172A]">
              Free 2-Day Trial Classes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The student attends two live lectures in their target batch to experience teaching depth and peer focus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-serif font-bold text-base flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-serif font-bold text-[#0F172A]">
              Parent-Mentor Consultation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meet the department head to review the trial feedback, study roadmap, and available installment/scholarship tiers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-serif font-bold text-base flex items-center justify-center">
              04
            </div>
            <h3 className="text-base font-serif font-bold text-[#0F172A]">
              Seat Confirmation & Kit Issue
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formalize admission, receive printed study booklets, student ID badge, and welcome orientation schedule.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Scholarships & Documents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Scholarships & Perks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Surbhi Talent Rewards
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Merit Scholarships & Fee Concessions
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>90%+ in Previous Class:</strong> Up to 25% Merit Scholarship on course fees.</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>95%+ in Previous Class / School Topper:</strong> Up to 50% Merit Scholarship.</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Sibling Concession:</strong> 10% fee reduction for real brothers/sisters enrolled concurrently.</span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Early Bird Advantage:</strong> Complimentary foundation bridge module & test kit.</span>
                </div>
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#0F172A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-700" />
                <span>Documents Required for Admission</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Photocopy of previous academic year’s report card / marksheet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Two recent passport-sized photographs of the student</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Student & Parent Aadhar Card photocopy (identity verification)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Direct Admissions Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Online Seat Pre-Booking
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mt-0.5">
                Apply for Admission / Trial Pass
              </h3>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you. Our counselor desk will reach out to schedule your 2-day trial class.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-amber-800 underline"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atharva Joshi"
                    value={form.studentName}
                    onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Sanjay Joshi"
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Target Class & Stream *
                  </label>
                  <select
                    value={form.studentClass}
                    onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="Class 6">Class 6 (Junior Foundation)</option>
                    <option value="Class 7">Class 7 (Junior Foundation)</option>
                    <option value="Class 8">Class 8 (Junior Foundation)</option>
                    <option value="Class 9">Class 9 (Pre-Board Foundation)</option>
                    <option value="Class 10">Class 10 (Board Excellence)</option>
                    <option value="Class 11 Science">Class 11 Science (PCM/PCB)</option>
                    <option value="Class 12 Science">Class 12 Science (PCM/PCB)</option>
                    <option value="Class 11 Commerce">Class 11 Commerce</option>
                    <option value="Class 12 Commerce">Class 12 Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Specific Questions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Preferred batch time, scholarship queries..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Apply & Reserve Trial Class'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Need Immediate Admission Assistance?"
        subtitle={`Speak directly with our senior counselor desk at ${siteSettings.primaryPhone}.`}
      />
    </div>
  );
};
