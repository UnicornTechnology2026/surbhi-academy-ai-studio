import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  ArrowRight,
  HelpCircle,
  Users
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface AdmissionsPageProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onOpenEnquiry }) => {
  const { courses, submitEnquiry } = useAcademy();

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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions 2026–27 • Limited 25 Seats/Batch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Try 2 Days of Classes Completely Free
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            No upfront fees, no pressure. Experience our classroom teaching, meet the faculty, and see your child's confidence grow before making any commitment.
          </p>
        </motion.div>
      </section>

      {/* 2. 3-Step Simple Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Zero Friction"
          title="How to Get Started in 3 Steps"
          subtitle="A completely transparent, zero-stress trial experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 font-serif font-bold text-lg flex items-center justify-center">
              01
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Fill the 30-Sec Form
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tell us your child's current grade and subjects. We'll assign the right batch and date for their trial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 font-serif font-bold text-lg flex items-center justify-center">
              02
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Attend 2 Free Lectures
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your child sits in the real classroom, participates in discussions, and tries our daily doubt desk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 font-serif font-bold text-lg flex items-center justify-center">
              03
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0F172A]">
              Decide with Confidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If your child loved the learning style, confirm the seat. If not, no questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Direct Interactive Trial Booking Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Quick Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-xl space-y-5">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Why Students Love the Trial
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Experience the Surbhi classroom difference.
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Meet senior subject teachers directly</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Receive complimentary chapter practice booklet</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Experience small batch interaction (max 25-30)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero registration charges or credit card needed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Clean Talkative Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0F172A]">
                  Trial Pass Confirmed!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Our academic counselor will call you within 2 business hours on <strong>{form.mobileNumber}</strong> with batch timings and classroom details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-[#0F172A] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800"
                >
                  Book Another Pass
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">
                  Claim Your 2-Day Trial Pass
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Takes under 30 seconds. No credit card or paperwork required.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.studentName}
                      onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Parent Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={form.mobileNumber}
                      onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Current Grade
                    </label>
                    <select
                      value={form.studentClass}
                      onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10 (Board Batch)</option>
                      <option value="Class 11 Science">Class 11 Science (PCM/PCB)</option>
                      <option value="Class 12 Science">Class 12 Science (Boards + Entrance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Interested Program
                    </label>
                    <select
                      value={form.courseInterested}
                      onChange={(e) => setForm({ ...form, courseInterested: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 bg-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 bg-[#0F172A] hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Confirming...' : 'Claim 2-Day Free Trial Pass'}</span>
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
