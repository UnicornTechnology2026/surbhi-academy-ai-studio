import React, { useState } from 'react';
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  Star,
  Search,
  Filter,
  X,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { StudentResult, AchieverCategory } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminAchieversPage: React.FC = () => {
  const {
    achievers,
    addAchiever,
    updateAchiever,
    deleteAchiever,
    toggleAchieverFeatured
  } = useAcademy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState<StudentResult | null>(null);

  // Delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [achieverToDelete, setAchieverToDelete] = useState<StudentResult | null>(null);

  // Form State
  const [form, setForm] = useState<Partial<StudentResult>>({
    name: '',
    rankTitle: 'City Topper (Nagpur)',
    exam: 'CBSE Class 10 Board Exam',
    score: '98.8%',
    percentile: '100th Percentile',
    year: '2025',
    category: 'class10',
    categoryLabel: 'Class 10 Board Toppers',
    school: 'Bhavans Bhagwandas Purohit Vidya Mandir',
    testimonial: 'Surbhi Academy provided the exact conceptual framework and test rigor I needed.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    badgeType: 'gold',
    featured: true,
    status: 'active'
  });

  const filteredAchievers = achievers.filter((a) => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.score.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.school && a.school.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingAchiever(null);
    setForm({
      name: '',
      rankTitle: 'State Rank 1',
      exam: 'CBSE Class 10 Board Exam',
      score: '99.0%',
      percentile: '100th Percentile',
      year: '2025',
      category: 'class10',
      categoryLabel: 'Class 10 Board Toppers',
      school: 'Centre Point School',
      testimonial: 'The dedicated faculty and chapter-wise mock tests made all the difference.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badgeType: 'gold',
      featured: true,
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (achiever: StudentResult) => {
    setEditingAchiever(achiever);
    setForm({ ...achiever });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.score) return;

    const payload: Omit<StudentResult, 'id'> = {
      name: form.name,
      rankTitle: form.rankTitle || 'Merit Ranker',
      exam: form.exam || 'Board Examination',
      score: form.score,
      percentile: form.percentile || undefined,
      year: form.year || '2025',
      category: (form.category as AchieverCategory) || 'class10',
      categoryLabel:
        form.category === 'class10'
          ? 'Class 10 Board Toppers'
          : form.category === 'class12'
            ? 'Class 12 Board Toppers'
            : 'Competitive Olympiads',
      school: form.school || undefined,
      testimonial: form.testimonial || undefined,
      image: form.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badgeType: form.badgeType || 'gold',
      featured: form.featured ?? true,
      status: form.status || 'active',
      gradeLevel: ''
    };

    if (editingAchiever) {
      updateAchiever(editingAchiever.id, payload);
    } else {
      addAchiever(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeletePrompt = (achiever: StudentResult) => {
    setAchieverToDelete(achiever);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (achieverToDelete) {
      deleteAchiever(achieverToDelete.id);
      setAchieverToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Hall of Fame
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Student Rankers & Achievers CMS
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Rank Holder</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'class10', 'class12', 'competitive'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
            >
              {cat === 'all'
                ? 'All Rankers'
                : cat === 'class10'
                  ? 'Class 10 Toppers'
                  : cat === 'class12'
                    ? 'Class 12 Toppers'
                    : 'Olympiad Rankers'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student or score..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Achievers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Student Name & Photo</th>
                <th className="py-4 px-4 font-semibold">Exam & Year</th>
                <th className="py-4 px-4 font-semibold">Score / Rank</th>
                <th className="py-4 px-4 font-semibold">School</th>
                <th className="py-4 px-4 font-semibold">Featured</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredAchievers.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">{a.name}</div>
                        <div className="text-[11px] text-amber-400 font-semibold">{a.rankTitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{a.exam}</div>
                    <div className="text-[10px] text-slate-400">Batch of {a.year}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-base font-serif font-bold text-amber-400">{a.score}</div>
                    {a.percentile && (
                      <div className="text-[10px] text-slate-400">{a.percentile}</div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-[160px] truncate">
                    {a.school || '—'}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleAchieverFeatured(a.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1 ${a.featured
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                        }`}
                    >
                      <Star className={`w-3 h-3 ${a.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>{a.featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(a)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(a)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingAchiever ? 'Edit Achiever Profile' : 'Add New Ranker Profile'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanmay Joshi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Rank Title / Milestone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nagpur City Rank 1"
                    value={form.rankTitle}
                    onChange={(e) => setForm({ ...form, rankTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Score / Percentage *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 98.8% or 695/720"
                    value={form.score}
                    onChange={(e) => setForm({ ...form, score: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Year of Exam
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2025"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as AchieverCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="class10">Class 10 Board Toppers</option>
                    <option value="class12">Class 12 Board Toppers</option>
                    <option value="competitive">Competitive Olympiads</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Exam Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CBSE Class 10 Board Exam"
                    value={form.exam}
                    onChange={(e) => setForm({ ...form, exam: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    School / College Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bhavans Vidya Mandir"
                    value={form.school || ''}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Student Testimonial / Quote
                </label>
                <textarea
                  rows={2}
                  placeholder="What the student said about Surbhi Coaching Academy..."
                  value={form.testimonial || ''}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingAchiever ? 'Save Changes' : 'Add Topper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Ranker Profile"
        message={`Are you sure you want to remove "${achieverToDelete?.name}" from the Toppers list?`}
        confirmLabel="Delete Topper"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
