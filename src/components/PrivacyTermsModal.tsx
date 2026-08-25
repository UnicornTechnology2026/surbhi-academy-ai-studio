import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyInfo';

interface PrivacyTermsModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      id="policy-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === 'policy-modal-backdrop') {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Official Institutional Policy
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                {isPrivacy ? 'Privacy Policy & Student Data Protection' : 'Terms & Conditions of Admission'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-600 text-xs sm:text-sm space-y-5 leading-relaxed">
          {isPrivacy ? (
            <>
              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  1. Information Collection & Usage
                </h4>
                <p>
                  At <strong>Surabhi Coaching Academy</strong>, student and parent confidentiality is our top priority. We collect basic contact information (Student Name, Parent Name, Mobile Number, Email, and Academic Grade) solely for academic counselling, attendance tracking, and performance updates.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  2. No Third-Party Commercial Sharing
                </h4>
                <p>
                  We do not sell, rent, or lease your personal contact details to third-party telemarketers or external commercial advertisers. All collected data remains strictly within our internal academic management registry.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  3. Academic Performance Publishing
                </h4>
                <p>
                  Rank holders and top-performing student achievements may be felicitated on academy noticeboards, official website banners, and annual brochures with parental consent.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  4. Contacting the Academy Privacy Officer
                </h4>
                <p>
                  For any inquiries regarding data protection or to update your contact preferences, please write to us at{' '}
                  <span className="font-semibold text-slate-800">{ACADEMY_INFO.contact.email}</span>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  1. Admission Eligibility & Verification
                </h4>
                <p>
                  Enrollment into Foundation, Science, Commerce, or Competitive Target batches is finalized upon verification of previous academic marksheets and payment of registration fees.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  2. Attendance & Academic Discipline
                </h4>
                <p>
                  Students are expected to maintain minimum 85% attendance in classroom sessions and appear for all scheduled diagnostic tests and pre-board examinations.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  3. Comprehensive Study Material Rights
                </h4>
                <p>
                  All printed modules, question banks, and daily practice sets provided by Surabhi Coaching Academy are proprietary intellectual property. Duplication or commercial distribution without written consent is strictly prohibited.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#0F172A] text-base mb-1">
                  4. Fee Schedules & Refund Policy
                </h4>
                <p>
                  Tuition fees may be paid in installments as agreed upon at admission. Registration fee covers orientation kit and initial module allocation. Detailed installment schedules are provided in the admission invoice.
                </p>
              </div>
            </>
          )}

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Updated & Effective for Academic Session 2026–2027.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
