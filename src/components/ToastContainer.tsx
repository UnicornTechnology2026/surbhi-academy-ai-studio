import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage, useAcademy } from '../context/AcademyContext';

interface ToastContainerProps {
  toasts?: ToastMessage[];
  onRemove?: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts: propToasts, onRemove: propOnRemove }) => {
  const academy = useAcademy();
  const toasts = propToasts ?? academy.toasts;
  const onRemove = propOnRemove ?? academy.removeToast;

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-400';

        if (toast.type === 'error') {
          bg = 'bg-red-950 text-white border-red-800';
          Icon = AlertCircle;
          iconColor = 'text-red-400';
        } else if (toast.type === 'info') {
          bg = 'bg-[#0F172A] text-white border-amber-500/40';
          Icon = Info;
          iconColor = 'text-amber-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slideDown ${bg}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
              {toast.text}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

