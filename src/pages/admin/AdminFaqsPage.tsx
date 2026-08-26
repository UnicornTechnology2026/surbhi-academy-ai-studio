import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  CheckCircle2
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { FAQ } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminFaqsPage: React.FC = () => {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: '',
    category: 'admissions',
    status: 'active',
    displayOrder: 1
  });

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  const categories = ['All', 'admissions', 'academics', 'facilities', 'general'];

  const handleOpenAddModal = () => {
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'admissions',
      status: 'active',
      displayOrder: (faqs.length || 0) + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'admissions',
      status: faq.status || 'active',
      displayOrder: faq.displayOrder || 1
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    if (editingFaq) {
      updateFAQ(editingFaq.id, formData);
    } else {
      addFAQ(formData);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (faqToDelete) {
      deleteFAQ(faqToDelete);
      setFaqToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = selectedCategory === 'All' || f.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-400" />
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-sm text-slate-400">
            Address parent and student questions about batches, fee installments, test series, and admission criteria.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Search & Category Tabs */}
      <div className="grid sm:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs by question or answer keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="sm:col-span-6 flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                    {faq.category || 'admissions'}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                  {faq.question}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEditModal(faq)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setFaqToDelete(faq.id);
                    setDeleteModalOpen(true);
                  }}
                  className="p-2 bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {faq.answer}
            </p>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No FAQs found matching your query.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 capitalize"
                >
                  <option value="admissions">Admissions</option>
                  <option value="academics">Academics</option>
                  <option value="facilities">Facilities</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Question *</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. What is the batch size for Class 10 State Board?"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 leading-relaxed"
                  placeholder="Explain the answer in clear, reassuring terms for parents..."
                  required
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
                  {editingFaq ? 'Save Changes' : 'Publish FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ? It will no longer be visible on the public FAQ section."
        confirmLabel="Yes, Delete"
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
