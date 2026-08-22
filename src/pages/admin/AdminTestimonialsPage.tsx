import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Plus, 
  Trash2, 
  Edit2, 
  Star, 
  Search, 
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Testimonial } from '../../types';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialStatus } = useAcademy();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Testimonial>>({
    name: '',
    role: 'Student, Class 10 Topper',
    relation: 'Student (Batch of 2025)',
    rating: 5,
    quote: '',
    photo: '',
    achievement: 'Scored 98.4% in Board Exams',
    status: 'active'
  });

  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setForm({
      name: '',
      role: 'Parent of Class 10 Merit Holder',
      relation: 'Parent',
      rating: 5,
      quote: '',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      achievement: 'State Board Merit Rank',
      status: 'active'
    });
    setIsEditing(null);
    setShowModal(true);
  };

  const handleOpenEdit = (test: Testimonial) => {
    setForm(test);
    setIsEditing(test.id);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;

    if (isEditing) {
      updateTestimonial(isEditing, form);
    } else {
      addTestimonial({
        name: form.name || 'Anonymous',
        role: form.role || 'Student',
        relation: form.relation || 'Student',
        rating: form.rating || 5,
        quote: form.quote || '',
        photo: form.photo,
        achievement: form.achievement,
        status: form.status || 'active'
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
            <MessageSquareQuote className="w-6 h-6 text-amber-400" />
            <span>Testimonials & Parent Reviews</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage feedback from students and parents, edit review ratings, and toggle website visibility.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search testimonials by name or text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="text-xs text-slate-400 font-semibold">
          Total: <strong className="text-amber-400">{filtered.length}</strong> Testimonials
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((test) => (
          <div
            key={test.id}
            className={`bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all ${
              test.status === 'active' ? 'border-slate-800' : 'border-slate-800 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {test.relation || 'Review'}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{test.quote}"
              </p>

              {test.achievement && (
                <div className="text-[11px] text-amber-400 font-bold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  🏆 {test.achievement}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                {test.photo && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/30 shrink-0">
                    <img src={test.photo} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-serif font-bold text-white text-sm">{test.name}</div>
                  <div className="text-[11px] text-slate-400">{test.role}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => toggleTestimonialStatus(test.id)}
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                    test.status === 'active' ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {test.status === 'active' ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-500" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(test)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete review from ${test.name}?`)) {
                        deleteTestimonial(test.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Anil Joshi (Parent)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={form.role || ''}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Parent of Sarthak Joshi"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Rating (1 to 5)</label>
                  <select
                    value={form.rating || 5}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Key Distinction / Score</label>
                <input
                  type="text"
                  value={form.achievement || ''}
                  onChange={(e) => setForm({ ...form, achievement: e.target.value })}
                  placeholder="e.g. 99.4% in 10th CBSE & 100 in Maths"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={form.quote || ''}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Detailed feedback regarding teaching, doubt clinics, faculty support..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
