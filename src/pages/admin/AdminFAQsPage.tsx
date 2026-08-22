import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Tag
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { FAQItem } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminFAQsPage: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAcademy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FAQItem | null>(null);

  const [form, setForm] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'Admissions',
    order: 1,
    status: 'active'
  });

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = selectedCat === 'all' || f.category === selectedCat;
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setForm({
      question: '',
      answer: '',
      category: 'Admissions',
      order: faqs.length + 1,
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FAQItem) => {
    setEditingFaq(f);
    setForm({ ...f });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) return;

    const payload: Omit<FAQItem, 'id'> = {
      question: form.question,
      answer: form.answer,
      category: form.category || 'General',
      order: Number(form.order) || 1,
      status: form.status || 'active'
    };

    if (editingFaq) {
      updateFaq(editingFaq.id, payload);
    } else {
      addFaq(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeletePrompt = (f: FAQItem) => {
    setFaqToDelete(f);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (faqToDelete) {
      deleteFaq(faqToDelete.id);
      setFaqToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Knowledge Base
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            FAQ Management CMS
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'Admissions', 'Academics', 'Fees', 'Batches'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Question</th>
                <th className="py-4 px-4 font-semibold">Category</th>
                <th className="py-4 px-4 font-semibold">Order</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredFaqs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 max-w-md">
                    <div className="font-bold text-sm text-white">{f.question}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{f.answer}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-800 px-2.5 py-0.5 rounded text-[10px] font-semibold text-slate-300">
                      {f.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">{f.order}</td>
                  <td className="py-4 px-4">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                      {f.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(f)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(f)}
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
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How do I register for the free 2-day trial class?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Admissions">Admissions & Trial</option>
                    <option value="Academics">Curriculum & Doubts</option>
                    <option value="Fees">Fee Structure</option>
                    <option value="Batches">Timings & Batches</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Display Order (Number)
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed, clear answer..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
                  {editingFaq ? 'Save Changes' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete FAQ Item"
        message="Are you sure you want to remove this question from the FAQ page?"
        confirmLabel="Delete Question"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
