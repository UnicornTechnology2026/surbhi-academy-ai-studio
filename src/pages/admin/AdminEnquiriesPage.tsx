import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  Plus,
  Download,
  X,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Enquiry } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminEnquiriesPage: React.FC = () => {
  const { enquiries, updateEnquiryStatus, addCounselorNote, deleteEnquiry, submitEnquiry } =
    useAcademy();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [counselorNoteInput, setCounselorNoteInput] = useState('');

  // Add Walk-in Modal
  const [isAddWalkinOpen, setIsAddWalkinOpen] = useState(false);
  const [walkinForm, setWalkinForm] = useState({
    studentName: '',
    parentName: '',
    mobileNumber: '',
    emailAddress: '',
    studentClass: 'Class 10',
    courseInterested: 'Class 10 Board Excellence',
    message: '',
    source: 'Campus Front Desk Walk-In'
  });

  // Delete Confirm
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchesSearch =
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.parentName && e.parentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.mobileNumber.includes(searchQuery) ||
      e.studentClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.courseInterested && e.courseInterested.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (e: Enquiry) => {
    setSelectedEnquiry(e);
    setCounselorNoteInput(e.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedEnquiry) {
      addCounselorNote(selectedEnquiry.id, counselorNoteInput);
      setSelectedEnquiry({ ...selectedEnquiry, notes: counselorNoteInput });
    }
  };

  const handleStatusChange = (newStatus: 'new' | 'contacted' | 'enrolled' | 'archived') => {
    if (selectedEnquiry) {
      updateEnquiryStatus(selectedEnquiry.id, newStatus);
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinForm.studentName || !walkinForm.mobileNumber) return;

    await submitEnquiry(walkinForm);
    setIsAddWalkinOpen(false);
    setWalkinForm({
      studentName: '',
      parentName: '',
      mobileNumber: '',
      emailAddress: '',
      studentClass: 'Class 10',
      courseInterested: 'Class 10 Board Excellence',
      message: '',
      source: 'Campus Front Desk Walk-In'
    });
  };

  const handleDeletePrompt = (enq: Enquiry) => {
    setEnquiryToDelete(enq);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (enquiryToDelete) {
      deleteEnquiry(enquiryToDelete.id);
      if (selectedEnquiry?.id === enquiryToDelete.id) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
    }
  };

  // CSV Export utility
  const handleExportCSV = () => {
    const headers = [
      'Student Name',
      'Parent Name',
      'Phone Number',
      'Email',
      'Class',
      'Course',
      'Status',
      'Source',
      'Message',
      'Counselor Notes',
      'Date'
    ];
    const rows = filteredEnquiries.map((e) => [
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${(e.parentName || '').replace(/"/g, '""')}"`,
      `"${e.mobileNumber}"`,
      `"${(e.emailAddress || '').replace(/"/g, '""')}"`,
      `"${e.studentClass}"`,
      `"${(e.courseInterested || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${e.source || 'Website'}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `surbhi_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Admissions Pipeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Admission Leads & CRM Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddWalkinOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-In Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Leads' },
            { key: 'new', label: '🔴 New' },
            { key: 'contacted', label: '🟡 Contacted' },
            { key: 'enrolled', label: '🟢 Enrolled' },
            { key: 'archived', label: '⚪ Archived' }
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === status.key
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search name, phone, class, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Student & Parent</th>
                <th className="py-4 px-4 font-semibold">Contact</th>
                <th className="py-4 px-4 font-semibold">Class / Course</th>
                <th className="py-4 px-4 font-semibold">Lead Source</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Date</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredEnquiries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-sm text-white">{e.studentName}</div>
                    <div className="text-[11px] text-slate-400">
                      Parent: {e.parentName || '—'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-slate-200">
                      <a href={`tel:${e.mobileNumber}`} className="hover:text-amber-400">
                        {e.mobileNumber}
                      </a>
                    </div>
                    {e.emailAddress && (
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {e.emailAddress}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-200">{e.studentClass}</div>
                    <div className="text-[10px] text-amber-400/90 truncate max-w-[180px]">
                      {e.courseInterested || 'General Enquiry'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300">
                      {e.source || 'Website'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={e.status}
                      onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value as any)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border focus:outline-none cursor-pointer ${
                        e.status === 'new'
                          ? 'bg-red-950 text-red-300 border-red-800'
                          : e.status === 'contacted'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : e.status === 'enrolled'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <option value="new">🔴 New</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="enrolled">🟢 Enrolled</option>
                      <option value="archived">⚪ Archived</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-[11px]">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenDetail(e)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white transition-colors cursor-pointer"
                      title="View Lead Details & Add Notes"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(e)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Delete Lead"
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

      {/* Lead Detail & Counselor Notes Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Lead Profile
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {selectedEnquiry.studentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300">
              {/* Quick info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Mobile Phone</div>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">
                    <a href={`tel:${selectedEnquiry.mobileNumber}`} className="hover:text-amber-400">
                      {selectedEnquiry.mobileNumber}
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Parent Name</div>
                  <div className="font-bold text-white mt-0.5">
                    {selectedEnquiry.parentName || 'Not specified'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Class Level</div>
                  <div className="font-bold text-amber-400 mt-0.5">
                    {selectedEnquiry.studentClass}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Course Interest</div>
                  <div className="font-bold text-white mt-0.5">
                    {selectedEnquiry.courseInterested || 'General Enquiry'}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Enquiry Date</div>
                  <div className="text-slate-300 mt-0.5">
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 uppercase font-bold text-[10px]">Current Status</div>
                  <div className="mt-0.5">
                    <span className="bg-amber-500/20 text-amber-400 font-bold uppercase text-[10px] px-2 py-0.5 rounded">
                      {selectedEnquiry.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message from user */}
              {selectedEnquiry.message && (
                <div className="space-y-1">
                  <div className="text-slate-400 uppercase font-bold text-[10px]">
                    Student / Parent Inquired Message:
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed italic">
                    "{selectedEnquiry.message}"
                  </div>
                </div>
              )}

              {/* Status Selector */}
              <div className="space-y-2">
                <div className="text-slate-300 uppercase font-bold text-[10px]">
                  Change Pipeline Stage:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['new', 'contacted', 'enrolled', 'archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Counselor Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-slate-300 uppercase font-bold text-[10px]">
                    Internal Counselor Notes / Follow-Up History:
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="text-amber-400 hover:text-amber-300 font-bold text-[11px] cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Record call summary, trial class batch assigned, discount discussions..."
                  value={counselorNoteInput}
                  onChange={(e) => setCounselorNoteInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Quick Actions (Call, WhatsApp) */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${selectedEnquiry.mobileNumber}`}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {selectedEnquiry.mobileNumber}</span>
                </a>

                <a
                  href={`https://wa.me/91${selectedEnquiry.mobileNumber.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                    selectedEnquiry.studentName
                  )},%20greetings%20from%20Surbhi%20Coaching%20Academy.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Walkin Lead Modal */}
      {isAddWalkinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-lg font-serif font-bold text-white">
                Record Front Desk Walk-In Lead
              </h3>
              <button
                onClick={() => setIsAddWalkinOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkin} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yash Kothari"
                    value={walkinForm.studentName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Anil Kothari"
                    value={walkinForm.parentName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={walkinForm.mobileNumber}
                    onChange={(e) => setWalkinForm({ ...walkinForm, mobileNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Class Level
                  </label>
                  <select
                    value={walkinForm.studentClass}
                    onChange={(e) => setWalkinForm({ ...walkinForm, studentClass: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11 Science">Class 11 Science</option>
                    <option value="Class 12 Science">Class 12 Science</option>
                    <option value="Class 11 Commerce">Class 11 Commerce</option>
                    <option value="Class 12 Commerce">Class 12 Commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Counselor Notes / Initial Conversation
                </label>
                <textarea
                  rows={3}
                  placeholder="Discussed batch timings, interested in 2-day trial for mathematics..."
                  value={walkinForm.message}
                  onChange={(e) => setWalkinForm({ ...walkinForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddWalkinOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Admission Lead"
        message={`Are you sure you want to permanently delete lead record for "${enquiryToDelete?.studentName}"?`}
        confirmLabel="Delete Lead"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
