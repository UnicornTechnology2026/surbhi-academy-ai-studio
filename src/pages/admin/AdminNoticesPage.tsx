import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit2, 
  AlertTriangle, 
  Search, 
  X,
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Notice } from '../../types';

export const AdminNoticesPage: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice, toggleNoticeStatus } = useAcademy();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Notice>>({
    title: '',
    category: 'Admissions',
    summary: '',
    publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    isUrgent: false,
    content: '',
    status: 'published'
  });

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setForm({
      title: '',
      category: 'Admissions',
      summary: '',
      publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isUrgent: false,
      content: '',
      status: 'published'
    });
    setIsEditing(null);
    setShowModal(true);
  };

  const handleOpenEdit = (notice: Notice) => {
    setForm(notice);
    setIsEditing(notice.id);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    if (isEditing) {
      updateNotice(isEditing, form);
    } else {
      addNotice({
        title: form.title || 'Notice Title',
        category: form.category || 'Admissions',
        summary: form.summary || '',
        publishDate: form.publishDate || 'Today',
        isUrgent: form.isUrgent || false,
        content: form.content || form.summary,
        status: form.status || 'published'
      });
    }

    setShowModal(false);
    setIsEditing(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" />
            <span>Notice Board & Circulars</span>
          </h1>
          <p className="text-xs text-slate-400">
            Publish official announcements, batch orientation dates, holiday circulars, and urgent alerts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search circulars by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold">
          Total: <strong className="text-amber-400">{filtered.length}</strong> Notices
        </div>
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((notice) => (
          <div
            key={notice.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border border-amber-500/30">
                    {notice.category}
                  </span>
                  {notice.isUrgent && (
                    <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{notice.publishDate}</span>
              </div>

              <h3 className="font-serif font-bold text-white text-base leading-snug">
                {notice.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {notice.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => toggleNoticeStatus(notice.id)}
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                  notice.status === 'published' ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {notice.status === 'published' ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-emerald-400" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4 text-slate-500" />
                    <span>Draft</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(notice)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete notice "${notice.title}"?`)) {
                      deleteNotice(notice.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-xl font-serif font-bold text-white">
                {isEditing ? 'Edit Notice' : 'Post New Notice'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Batch Commencement for Class 10 (2026-27)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Category</label>
                  <select
                    value={form.category || 'Admissions'}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Academic Schedule">Academic Schedule</option>
                    <option value="Examinations">Examinations</option>
                    <option value="Holidays">Holidays</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={form.publishDate || ''}
                    onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Summary / Ticker Text *</label>
                <textarea
                  rows={2}
                  required
                  value={form.summary || ''}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Brief synopsis shown on top ticker and cards..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={form.isUrgent || false}
                  onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="urgent-check" className="text-slate-300 font-semibold cursor-pointer">
                  Mark as Urgent Alert (Red Highlight)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold uppercase hover:bg-amber-400"
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
