import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building,
  Navigation
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

export const ContactPage: React.FC = () => {
  const { siteSettings, submitEnquiry, courses } = useAcademy();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    targetClass: 'Class 10',
    subject: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    await submitEnquiry({
      studentName: form.name,
      parentName: form.name,
      mobileNumber: form.phone,
      emailAddress: form.email,
      studentClass: form.targetClass,
      courseInterested: form.subject,
      message: form.message,
      source: 'Contact Page Form'
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
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect with Our Academic Counselors</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Contact Surabhi Coaching Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Visit our state-of-the-art campus in Nagpur or send us a message. We are delighted to answer your questions regarding admissions, faculty, and batch schedules.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#0F172A]">Telephone Helplines</h3>
              <p className="text-xs text-slate-500 mt-1">Direct admission & counseling support</p>
            </div>
            <div className="space-y-1.5 text-sm font-semibold text-slate-800">
              <div>
                <a href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-700">
                  {siteSettings.primaryPhone} (Main Helpline)
                </a>
              </div>
              <div>
                <a href={`tel:${siteSettings.secondaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-700">
                  {siteSettings.secondaryPhone} (Desk)
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#0F172A]">Email Correspondence</h3>
              <p className="text-xs text-slate-500 mt-1">Official circulars & enquiries</p>
            </div>
            <div className="space-y-1.5 text-sm font-semibold text-slate-800">
              <div>
                <a href={`mailto:${siteSettings.email}`} className="hover:text-blue-700">
                  {siteSettings.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#0F172A]">Counseling Hours</h3>
              <p className="text-xs text-slate-500 mt-1">Academy front desk timings</p>
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-slate-800 font-medium">
              <div>📅 <strong>Mon – Sat:</strong> {siteSettings.workingHoursWeekdays}</div>
              <div>🌞 <strong>Sunday:</strong> {siteSettings.workingHoursSunday}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form & Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Direct Communication
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill out this quick form and our academic team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">Message Sent!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, {form.name}. Our academic counselor will call on {form.phone} soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-amber-800 underline"
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Target Class
                    </label>
                    <select
                      value={form.targetClass}
                      onChange={(e) => setForm({ ...form, targetClass: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 Science">Class 11 Science</option>
                      <option value="Class 12 Science">Class 12 Science</option>
                      <option value="Class 11 Commerce">Class 11 Commerce</option>
                      <option value="Class 12 Commerce">Class 12 Commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                    >
                      <option value="Admission & 2-Day Trial">Admission & 2-Day Trial</option>
                      <option value="Fee Structure & Scholarship">Fee Structure & Scholarship</option>
                      <option value="Batch Timings & Schedules">Batch Timings & Schedules</option>
                      <option value="Faculty & Curriculum">Faculty & Curriculum</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Your Message / Specific Question
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the student's background or specific learning requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Campus & Location Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0F172A]">
                    Visit Surabhi Academy
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{siteSettings.mainCampusAddress}</span>
                </div>
              </div>

              {/* Simulated Map Visual */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-[16/9] bg-slate-900">
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-[16/9] bg-slate-900">
                  <iframe
                    title="Surabhi Coaching Academy Location Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(siteSettings.mainCampusAddress)}&z=16&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteSettings.mainCampusAddress)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-md">

                    <Navigation className="w-3 h-3 text-amber-700" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
