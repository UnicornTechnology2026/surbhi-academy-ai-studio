import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Star, 
  X, 
  Quote 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Testimonial } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: 'Student',
    course: 'Class 10 Board Batch',
    achievement: '96.4% in SSC Boards',
    quote: '',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    status: 'active',
    featured: true
  });

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: 'Student',
      course: 'Class 10 Board Batch',
      achievement: '95%+ in SSC Boards',
      quote: '',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
      status: 'active',
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditingTestimonial(item);
    setFormData({
      name: item.name,
      role: item.role,
      course: item.course || '',
      achievement: item.achievement || '',
      quote: item.quote || item.content || '',
      rating: item.rating,
      photo: item.photo || item.image || '',
      status: item.status || 'active',
      featured: item.featured ?? true
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !(formData.quote || '').trim()) return;

    const payload: Omit<Testimonial, 'id'> = {
      ...formData,
      content: formData.quote,
      image: formData.photo
    };

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, payload);
    } else {
      addTestimonial(payload);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteTestimonial(itemToDelete);
      setItemToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    const matchesRating = selectedRating === 'All' || t.rating === selectedRating;
    const textContent = (t.quote || t.content || '');
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          textContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.course || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-amber-400" />
            Testimonials & Student Reviews
          </h1>
          <p className="text-sm text-slate-400">
            Publish authentic feedback and parent reviews praising faculty mentorship and scores.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid sm:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search testimonials by student name, course or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-1.5 justify-end">
          <button
            onClick={() => setSelectedRating('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedRating === 'All'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Ratings
          </button>
          <button
            onClick={() => setSelectedRating(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              selectedRating === 5
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            5 Stars Only
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <Quote className="w-12 h-12 text-slate-800/40 absolute -right-2 -bottom-2 pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                {t.achievement && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t.achievement}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{t.quote || t.content}"
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={t.photo || t.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300'}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400/40 shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-white text-xs leading-tight truncate">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {t.role} • {t.course || 'Academy Alumni'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2 relative z-10">
              <button
                onClick={() => handleOpenEditModal(t)}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setItemToDelete(t.id);
                  setDeleteModalOpen(true);
                }}
                className="p-2 bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredTestimonials.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500">
            <MessageSquareQuote className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No testimonials matching your search filter.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-amber-400" />
                <span>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Student / Parent Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Sneha Kulkarni"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Student' | 'Parent' | 'Alumni' })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Course / Batch</label>
                  <input
                    type="text"
                    value={formData.course || ''}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Class 10 State Board"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Achievement Tag</label>
                  <input
                    type="text"
                    value={formData.achievement || ''}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. 98.2% (Maths 100/100)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Star Rating</label>
                <div className="flex items-center gap-3 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-amber-400 font-bold ml-2">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Review Quote / Content *</label>
                <textarea
                  rows={3}
                  value={formData.quote || ''}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Share the review details, mentorship experience, and academic breakthrough..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar / Photo URL</label>
                <input
                  type="text"
                  value={formData.photo || ''}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/..."
                />
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
                  {editingTestimonial ? 'Save Changes' : 'Publish Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Testimonial"
        message="Are you sure you want to delete this student testimonial from the website?"
        confirmLabel="Yes, Delete"
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
