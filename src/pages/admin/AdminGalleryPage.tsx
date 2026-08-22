import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Search, 
  X, 
  Filter 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { GalleryItem } from '../../types';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useAcademy();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState<Partial<GalleryItem>>({
    title: '',
    imageUrl: '',
    category: 'Classroom',
    caption: '',
    date: '2026',
    status: 'active'
  });

  const filtered = gallery.filter((item) => {
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;

    addGalleryItem({
      title: form.title || 'Academy Photo',
      imageUrl: form.imageUrl,
      category: form.category || 'Classroom',
      caption: form.caption || '',
      date: form.date || '2026',
      status: 'active'
    });

    setShowModal(false);
    setForm({
      title: '',
      imageUrl: '',
      category: 'Classroom',
      caption: '',
      date: '2026',
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-400" />
            <span>Campus Photo Gallery Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Add classroom photos, felicitations, student labs, library corners, and campus events.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search gallery photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'Classroom', 'Events', 'Felicitation', 'Infrastructure'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl group hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <div className="font-serif font-bold text-white text-sm line-clamp-1">{item.title}</div>
              {item.caption && <p className="text-[11px] text-slate-400 line-clamp-2">{item.caption}</p>}
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-2">
              <span className="text-[10px] text-slate-500">{item.date}</span>
              <button
                onClick={() => {
                  if (window.confirm(`Delete photo "${item.title}"?`)) {
                    deleteGalleryItem(item.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-xl font-serif font-bold text-white">Add Campus Photo</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Annual Felicitation 2026"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={form.imageUrl || ''}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Category</label>
                  <select
                    value={form.category || 'Classroom'}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Classroom">Classroom</option>
                    <option value="Events">Events</option>
                    <option value="Felicitation">Felicitation</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={form.date || '2026'}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={form.caption || ''}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Brief description of the event..."
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
