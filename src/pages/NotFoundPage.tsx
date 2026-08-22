import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, BookOpen, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl border border-amber-200 flex items-center justify-center mx-auto text-amber-700 font-serif font-extrabold text-3xl shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-[#0F172A]">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
