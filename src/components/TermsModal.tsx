import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-serif font-bold text-white">
              Terms of Admission & Academic Code of Conduct
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
            By enrolling in courses at <strong>{siteSettings.name}</strong>, students and guardians agree to adhere to our standard institutional regulations outlined below.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              1. Attendance & Punctuality
            </h4>
            <p>
              Students are required to maintain a minimum of 85% attendance across all registered subjects. Classroom doors close promptly 5 minutes after lecture commencement to preserve focus.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              2. Daily Practice Problems (DPP) & Assessments
            </h4>
            <p>
              Completion of assigned homework, chapter test sheets, and pre-board mock examinations is mandatory. Habitual non-submission is flagged during quarterly parent-teacher meetings.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              3. Classroom Decorum & Technology Policy
            </h4>
            <p>
              Smartphones must remain in silent mode in designated lockers during active teaching sessions. Mutual respect between peer learners and faculty is paramount.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              4. Fee Schedule & Refunds
            </h4>
            <p>
              Course fee installments must be settled according to the agreed admission timeline. Complimentary trial classes (2 days) carry zero financial obligation before formal registration.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer"
          >
            Agree & Close
          </button>
        </div>
      </div>
    </div>
  );
};
