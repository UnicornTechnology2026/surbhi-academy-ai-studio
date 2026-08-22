import React from 'react';
import { X, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { siteSettings } = useAcademy();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-serif font-bold text-white">
              Privacy Policy & Student Data Protection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Welcome to <strong>{siteSettings.name}</strong>. We value the privacy of our prospective students, enrolled candidates, and their parents. This policy details how we collect, safeguard, and utilize data.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              1. Information We Collect
            </h4>
            <p>
              When you submit an admission enquiry or register for a course, we gather contact details including student name, parent/guardian name, phone number, email address, current school, and academic interest.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              2. How We Use Your Information
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide tailored academic counseling and schedule free 2-day trial classes.</li>
              <li>To communicate batch timings, fee structures, and scholarship criteria.</li>
              <li>To transmit daily attendance and test performance reports to registered parents.</li>
              <li>Strictly zero commercial spam or third-party sharing.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              3. Data Security & Storage
            </h4>
            <p>
              Student assessment records and contact data are maintained in encrypted, password-protected systems accessible only to authorized academic staff and counselors.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              4. Contact Us
            </h4>
            <p>
              For queries or to update your recorded information, contact our privacy compliance officer at <strong>{siteSettings.email}</strong> or visit our main campus.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
