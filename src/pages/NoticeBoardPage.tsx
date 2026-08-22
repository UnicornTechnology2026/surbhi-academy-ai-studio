import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Calendar, 
  Tag, 
  Search, 
  FileText, 
  Download, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';
import { NoticeItem } from '../types';

interface NoticeBoardPageProps {
  onOpenEnquiry: () => void;
}

export const NoticeBoardPage: React.FC<NoticeBoardPageProps> = ({ onOpenEnquiry }) => {
  const { notices } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All Notices' },
    { key: 'Admissions', label: 'Admissions' },
    { key: 'Academic', label: 'Academic & Timetable' },
    { key: 'PTM', label: 'Parent-Teacher Meet' },
    { key: 'Holiday', label: 'Holidays & Schedule' }
  ];

  const filteredNotices = notices.filter((item) => {
    if (item.status !== 'published') return false;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Academy Circulars & Updates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Academy Notice Board & Announcements
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stay informed with the latest updates regarding admissions, revised batch timetables, parent-teacher conferences, and academic schedules.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500 bg-white"
            />
          </div>
        </div>
      </section>

      {/* 3. Notices List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-slate-700">
              No circulars found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your category or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all ${
                  notice.isUrgent
                    ? 'border-amber-400 shadow-md bg-amber-50/10'
                    : 'border-slate-100 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {notice.isUrgent && (
                      <span className="bg-red-600 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Urgent Notice
                      </span>
                    )}
                    {notice.isNew && (
                      <span className="bg-amber-500 text-slate-950 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {notice.category}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Posted on {notice.date}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0F172A] mb-2">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {notice.content}
                </p>

                {notice.attachmentUrl && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-600" />
                      Attached Circular Document
                    </span>
                    <button
                      onClick={() => alert(`Downloading circular: ${notice.title}`)}
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Have Questions Regarding An Announcement?"
        subtitle="Our admission and academic administrative desk is available from 08:00 AM – 08:30 PM."
      />
    </div>
  );
};
