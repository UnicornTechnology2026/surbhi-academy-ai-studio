import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, User, BookOpen, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseSlug?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCourseSlug = ''
}) => {
  const { courses, siteSettings, submitEnquiry } = useAcademy();

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobileNumber: '',
    emailAddress: '',
    studentClass: 'Class 10',
    courseInterested: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialCourseSlug && courses.length > 0) {
      const matched = courses.find((c) => c.slug === initialCourseSlug);
      if (matched) {
        setFormData((prev) => ({
          ...prev,
          courseInterested: matched.title,
          studentClass: matched.gradeLevel
        }));
      }
    } else if (courses.length > 0 && !formData.courseInterested) {
      setFormData((prev) => ({
        ...prev,
        courseInterested: courses[0].title
      }));
    }
  }, [initialCourseSlug, isOpen, courses]);

  if (!isOpen) return null;

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
    if (!formData.courseInterested) {
      errs.courseInterested = 'Please select a program of interest';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const success = await submitEnquiry({
      studentName: formData.studentName,
      parentName: formData.parentName,
      mobileNumber: formData.mobileNumber,
      emailAddress: formData.emailAddress,
      studentClass: formData.studentClass,
      courseInterested: formData.courseInterested,
      message: formData.message,
      source: 'Enquiry Modal'
    });

    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      studentName: '',
      parentName: '',
      mobileNumber: '',
      emailAddress: '',
      studentClass: 'Class 10',
      courseInterested: courses[0]?.title || '',
      message: ''
    });
    onClose();
  };

  return (
    <div
      id="enquiry-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'enquiry-modal-backdrop') {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0F172A] px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Admissions Open 2026–27
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Request Free Academic Counselling
              </h3>
            </div>
          </div>
          <button
            id="close-enquiry-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-[#0F172A]">
                Enquiry Received Successfully!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.studentName}</span>. Our senior academic counselor will call on <span className="font-semibold text-slate-900">{formData.mobileNumber}</span> within 24 hours with complete batch schedules, syllabus breakdown, and your complimentary 2-day trial pass.
              </p>
              <div className="p-4 bg-amber-50/80 border border-amber-200/70 rounded-xl text-xs text-amber-900 text-left max-w-md mx-auto space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Immediate Academic Assistance?</span>
                </div>
                <div>
                  Call our senior counselor desk directly at <span className="font-bold">{siteSettings.primaryPhone}</span> or WhatsApp us.
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>🎯 Small Batch Caps (Max 25-30)</span>
                <span className="text-amber-700 font-bold">2-Day Free Trial Pass Included</span>
              </div>

              {/* Student Name & Parent Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ananya Deshmukh"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border ${errors.studentName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        } focus:outline-none focus:border-amber-500`}
                    />
                  </div>
                  {errors.studentName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.studentName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Parent / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Rajesh Deshmukh"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm rounded-xl border ${errors.parentName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      } focus:outline-none focus:border-amber-500`}
                  />
                  {errors.parentName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.parentName}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border ${errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        } focus:outline-none focus:border-amber-500`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-slate-400 text-[10px] lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. parent@example.com"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border ${errors.emailAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        } focus:outline-none focus:border-amber-500`}
                    />
                  </div>
                  {errors.emailAddress && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.emailAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Class & Interested Program */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Student's Current / Target Class
                  </label>
                  <select
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="Class 6">Class 6 (Junior Foundation)</option>
                    <option value="Class 7">Class 7 (Junior Foundation)</option>
                    <option value="Class 8">Class 8 (Junior Foundation)</option>
                    <option value="Class 9">Class 9 (Pre-Board Foundation)</option>
                    <option value="Class 10">Class 10 (Board Excellence & Merit)</option>
                    <option value="Class 11 Science">Class 11 Science (PCM / PCB)</option>
                    <option value="Class 12 Science">Class 12 Science (PCM / PCB)</option>
                    <option value="Class 11 Commerce">Class 11 Commerce</option>
                    <option value="Class 12 Commerce">Class 12 Commerce Pro</option>
                    <option value="Olympiad / NTSE">Olympiad / NTSE Edge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Program Interested In <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={formData.courseInterested}
                      onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message / Specific Queries */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Questions / Specific Requirements
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Tell us about previous academic performance, preferred batch time, or branch location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit & Book Free Trial Pass</span>
                    </>
                  )}
                </button>
                <div className="text-center mt-2.5 text-[11px] text-slate-400">
                  🔒 We respect your privacy. No spam. Academic counselors will connect strictly during day hours.
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};