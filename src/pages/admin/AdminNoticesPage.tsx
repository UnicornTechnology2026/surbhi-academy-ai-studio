import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Calendar, 
  X
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Notice, NoticeCategory } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminNoticesPage: React.FC = () => {
  const { notices, addNotice, updateNotice, deleteNotice } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'All'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Notice, 'id'>>({
    title: '',
    category: 'admissions',
    categoryLabel: 'Admissions',
    description: '',
    date: 'Active Now',
    publishDate: new Date().toISOString(),
    isUrgent: false,
    status: 'published'
  });

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<string | null>(null);

  const categories: { label: string; value: NoticeCategory | 'All' }[] = [
    { label: 'All', value: 'All' },
    { label: 'Admissions', value: 'admissions' },
    { label: 'Batch Alerts', value: 'batch' },
    { label: 'Academic', value: 'academic' },
    { label: 'Holiday', value: 'holiday' }
  ];

  const handleOpenAddModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      category: 'admissions',
      categoryLabel: 'Admissions',
      description: '',
      date: 'Active Now',
      publishDate: new Date().toISOString(),
      isUrgent: true,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      category: notice.category,
      categoryLabel: notice.categoryLabel || notice.category,
      description: notice.description || notice.content || '',
      date: notice.date || 'Active Now',
      publishDate: notice.publishDate || new Date().toISOString(),
      isUrgent: !!notice.isUrgent,
      status: notice.status || 'published'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
    } else {
      addNotice(formData);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (noticeToDelete) {
      deleteNotice(noticeToDelete);
      setNoticeToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (n.date || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-amber-400" />
            Notices & Ticker Announcements
          </h1>
          <p className="text-sm text-slate-400">
            Publish urgent admission alerts, scholarship deadlines, and top-bar notice tickers.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid sm:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices by title or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="sm:col-span-5 flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filteredNotices.map((notice, idx) => (
          <div
            key={notice.id}
            className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {notice.categoryLabel || notice.category}
                </span>
                {notice.isUrgent && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                    Urgent Alert
                  </span>
                )}
                {idx === 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Live On Top Ticker
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {notice.date || 'Active'}
                </span>
              </div>

              <h3 className="font-semibold text-white text-sm sm:text-base leading-snug">
                {notice.title}
              </h3>

              {notice.description && (
                <p className="text-xs text-slate-400 line-clamp-1">
                  {notice.description}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEditModal(notice)}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setNoticeToDelete(notice.id);
                  setDeleteModalOpen(true);
                }}
                className="p-2 bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notices published matching your filter.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>{editingNotice ? 'Edit Notice' : 'Publish New Notice'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notice / Announcement Title *</label>
                <textarea
                  rows={3}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Admissions Open: Class 10 Board Mastery Batch for 2026-27 (25 seats)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as NoticeCategory;
                      setFormData({ 
                        ...formData, 
                        category: cat,
                        categoryLabel: cat.charAt(0).toUpperCase() + cat.slice(1)
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 capitalize"
                  >
                    <option value="admissions">Admissions</option>
                    <option value="batch">Batch Alerts</option>
                    <option value="academic">Academic</option>
                    <option value="holiday">Holiday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date Tag / Deadline</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Active Now, March 15"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description / Instructions</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Optional additional notes for students & parents..."
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-400 bg-slate-950"
                />
                <label htmlFor="urgent-check" className="text-xs text-slate-300 font-medium">
                  Mark as Urgent Alert (Highlighted with red pulse on notices ticker)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20"
                >
                  {editingNotice ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? It will immediately disappear from the public ticker and admission announcements."
        confirmLabel="Yes, Delete"
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
