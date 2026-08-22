import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Phone, 
  Mail, 
  User, 
  BookOpen, 
  AlertCircle, 
  Sparkles, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { COURSES_DATA } from '../data/courses';
import { ACADEMY_INFO } from '../data/academyInfo';

export const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobileNumber: '',
    emailAddress: '',
    studentClass: 'Class 10',
    courseInterested: COURSES_DATA[0].title,
    branchPreference: 'Main Academic Campus (Central Ave)',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.studentName.trim()) {
      errs.studentName = 'Student name is required';
    }
    if (!formData.parentName.trim()) {
      errs.parentName = 'Parent / Guardian name is required';
    }
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/[\s-+]/g, ''))) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      errs.emailAddress = 'Please enter a valid email address';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Open 2026–2027</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Begin Your Journey to <br />
            <span className="italic font-normal text-amber-400">Academic Excellence</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Simple 5-step admission process with complimentary diagnostic evaluation and merit scholarship benefits.
          </p>
        </div>
      </section>

      {/* 5-Step Admission Roadmap */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Step-by-Step Procedure"
            title="The 5-Step Admission"
            highlightText="Roadmap"
            description="Our transparent, student-friendly enrollment workflow designed to set you up for success from day one."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {ACADEMY_INFO.admissionSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-amber-400 flex items-center justify-center font-serif font-bold text-lg mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0F172A] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] uppercase font-bold text-amber-700">
                  Step 0{step.stepNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form & Scholarship Information Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Full Admission Form */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
                  Online Application Desk
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0F172A]">
                  Direct Admission Enquiry Form
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submit your details below to schedule an academic counseling appointment.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-10 bg-white rounded-2xl p-8 border border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">
                    Application Received!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you! An admissions counselor will call you shortly on <strong>{formData.mobileNumber}</strong> to confirm your batch timing, seat reservation, and diagnostic schedule.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        studentName: '',
                        parentName: '',
                        mobileNumber: '',
                        emailAddress: '',
                        studentClass: 'Class 10',
                        courseInterested: COURSES_DATA[0].title,
                        branchPreference: 'Main Academic Campus (Central Ave)',
                        message: ''
                      });
                    }}
                    className="bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-slate-800 transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="admission-student-name"
                          type="text"
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          placeholder="e.g. Priyanshu Roy"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border ${
                            errors.studentName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                          } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                      </div>
                      {errors.studentName && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.studentName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="admission-parent-name"
                          type="text"
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="e.g. Sandeep Roy"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border ${
                            errors.parentName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                          } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                      </div>
                      {errors.parentName && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.parentName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="admission-mobile-number"
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          placeholder="10-digit mobile number"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border ${
                            errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                          } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="admission-email-address"
                          type="email"
                          value={formData.emailAddress}
                          onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                          placeholder="parent@example.com"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border ${
                            errors.emailAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                          } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Class / Grade *
                      </label>
                      <select
                        id="admission-student-class"
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10 (Board Target)</option>
                        <option value="Class 11 Science">Class 11 Science (PCM/PCB)</option>
                        <option value="Class 12 Science">Class 12 Science (Board + Entrance)</option>
                        <option value="Class 11 Commerce">Class 11 Commerce</option>
                        <option value="Class 12 Commerce">Class 12 Commerce</option>
                        <option value="Competitive Foundation">Olympiad & NTSE Special</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Program Interested In *
                      </label>
                      <select
                        id="admission-course-select"
                        value={formData.courseInterested}
                        onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 truncate"
                      >
                        {COURSES_DATA.map((course) => (
                          <option key={course.id} value={course.title}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Campus Branch
                    </label>
                    <select
                      value={formData.branchPreference}
                      onChange={(e) => setFormData({ ...formData, branchPreference: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Main Academic Campus (Central Ave)">Main Academic Campus (Central Avenue Road)</option>
                      <option value="West Wing Campus (VIP Road)">West Wing Campus (VIP Road)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Additional Query or Timing Preference (Optional)
                    </label>
                    <textarea
                      id="admission-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Inquiring about weekend batches and scholarship assessment..."
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      id="submit-admission-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-xs uppercase tracking-wider"
                    >
                      {isSubmitting ? (
                        <span>Processing Application...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Submit Online Admission Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Scholarship & Merit Benefits Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Merit Scholarship Card */}
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold text-white mb-2">
                  Surbhi Merit Scholarship Scheme
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We believe financial constraints should never stand between a bright mind and world-class education.
                </p>
                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span>95%+ in Previous Class</span>
                    <span className="font-bold text-amber-400">Up to 50% Waiver</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span>90%–94.9% Score</span>
                    <span className="font-bold text-amber-400">Up to 30% Waiver</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span>National Olympiad Rankers</span>
                    <span className="font-bold text-amber-400">Special Fellowship</span>
                  </div>
                </div>
              </div>

              {/* Installment Support */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <h4 className="text-base font-serif font-bold text-[#0F172A]">
                    Flexible Fee Installment Plans
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Parents can choose between quarterly, bi-annual, or annual installment plans with zero hidden fees. All study materials, mock test papers, and doubt clinics are included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Got Questions?"
            title="Frequently Asked"
            highlightText="Questions"
            description="Find direct answers to common queries regarding batches, teaching methodology, and enrollment."
          />

          <div className="space-y-3">
            {ACADEMY_INFO.faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-serif font-bold text-[#0F172A]">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
