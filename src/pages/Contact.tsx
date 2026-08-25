import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Compass,
  ExternalLink,
  AlertCircle,
  Building2
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ACADEMY_INFO } from '../data/academyInfo';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Academic Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) errs.message = 'Please type your inquiry message';
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
    }, 700);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>We are here to help</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Get in Touch with <br />
            <span className="italic font-normal text-amber-400">Our Academic Desk</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about upcoming batches, curriculum schedules, or merit fee scholarships? Visit our campus or connect with our senior counselors.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Campus Addresses */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-[1.5px] bg-amber-500" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                    Reach Out To Us
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                  Direct Contact Channels
                </h2>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Admissions Helpline
                    </h4>
                    <div className="text-base font-serif font-bold text-[#0F172A] mt-0.5">
                      <a href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-600 transition-colors">
                        {ACADEMY_INFO.contact.primaryPhone}
                      </a>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Counseling Desk: <a href={`tel:${ACADEMY_INFO.contact.secondaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-600">{ACADEMY_INFO.contact.secondaryPhone}</a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Official Inquiries
                    </h4>
                    <div className="text-base font-serif font-bold text-[#0F172A] mt-0.5">
                      <a href={`mailto:${ACADEMY_INFO.contact.email}`} className="hover:text-amber-600 transition-colors">
                        {ACADEMY_INFO.contact.email}
                      </a>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Admissions: <a href={`mailto:${ACADEMY_INFO.contact.infoEmail}`} className="hover:text-amber-600">{ACADEMY_INFO.contact.infoEmail}</a>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Academy Timings
                    </h4>
                    <div className="text-sm font-serif font-bold text-[#0F172A] mt-0.5">
                      {ACADEMY_INFO.contact.workingHours.weekdays}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Sunday: {ACADEMY_INFO.contact.workingHours.sunday}
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Branches */}
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-serif font-bold text-[#0F172A] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <span>Campus Locations</span>
                </h3>

                <div className="p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-amber-400 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                      Main Academic Campus
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">Head Office</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {ACADEMY_INFO.contact.mainCampusAddress}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Surabhi+Coaching+Academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-amber-700 uppercase tracking-wider transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>Get Driving Directions</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-amber-400 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      West Wing Campus
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">Branch</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {ACADEMY_INFO.contact.branchAddress}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Surabhi+Coaching+Academy+VIP+Road"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] hover:text-amber-700 uppercase tracking-wider transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>Get Driving Directions</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Interactive Message Box */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
                  Online Messaging
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0F172A]">
                  Send an Inquiry or Question
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our academic desk will respond within 2 to 4 business hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-12 bg-white rounded-2xl p-8 border border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out to Surabhi Coaching Academy. A counselor has received your message and will get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Academic Inquiry',
                        message: ''
                      });
                    }}
                    className="bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-slate-800 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      className={`w-full px-3 py-2.5 text-sm bg-white rounded-xl border ${errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                        } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className={`w-full px-3 py-2.5 text-sm bg-white rounded-xl border ${errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                          } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Subject / Topic
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="General Academic Inquiry">General Academic Inquiry</option>
                      <option value="Batch Timing & Schedule">Batch Timing & Schedule</option>
                      <option value="Fee Structure & Scholarships">Fee Structure & Scholarships</option>
                      <option value="Faculty Consultation Request">Faculty Consultation Request</option>
                      <option value="Hostel / Transport Assistance">Hostel / Transport Assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Message / Question *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe what information you need regarding batches or enrollment..."
                      className={`w-full px-3 py-2.5 text-sm bg-white rounded-xl border ${errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-amber-500'
                        } focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Send Message to Counseling Desk</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Map / Location Guidance Card */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-[#0F172A]">
                  Planning a Campus Visit?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our academic counselors are available Monday to Saturday (8:00 AM – 8:00 PM) for in-person parent consultations.
                </p>
              </div>
            </div>
            <a
              href={`tel:${ACADEMY_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-all shrink-0"
            >
              Call To Reserve a Slot
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
