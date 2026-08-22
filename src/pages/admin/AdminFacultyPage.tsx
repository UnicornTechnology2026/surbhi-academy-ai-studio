import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  X,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { FacultyMember, FacultyDepartment } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminFacultyPage: React.FC = () => {
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useAcademy();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);

  // Delete confirm
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyMember | null>(null);

  // Form State
  const [form, setForm] = useState<Partial<FacultyMember>>({
    name: '',
    role: 'Senior Faculty & HOD',
    department: 'Mathematics',
    qualifications: 'M.Sc. Mathematics, B.Ed.',
    experience: '12+ Years Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Dedicated mentor with over a decade of experience producing state top rankers.',
    achievements: ['Produced 40+ 100/100 scorers in Board Exams'],
    subjectsTaught: ['Class 10 Advanced Math', 'Class 12 Calculus'],
    status: 'active'
  });

  const [subjectsTaughtInput, setSubjectsTaughtInput] = useState('Class 10 Advanced Math, Class 12 Calculus');

  const filteredFaculty = faculty.filter((f) => {
    const matchesDept = selectedDept === 'all' || f.department === selectedDept;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.qualifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setForm({
      name: '',
      role: 'Senior Faculty',
      department: 'Mathematics',
      qualifications: 'M.Sc., B.Ed.',
      experience: '10+ Years Experience',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Expert teacher passionate about building mathematical reasoning from first principles.',
      achievements: ['Mentored 100+ Board Toppers'],
      subjectsTaught: ['Mathematics'],
      status: 'active'
    });
    setSubjectsTaughtInput('Mathematics');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: FacultyMember) => {
    setEditingFaculty(member);
    setForm({ ...member });
    setSubjectsTaughtInput(member.subjectsTaught.join(', '));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.qualifications) return;

    const subjectsArr = subjectsTaughtInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Omit<FacultyMember, 'id'> = {
      name: form.name,
      role: form.role || 'Senior Faculty',
      department: (form.department as FacultyDepartment) || 'Mathematics',
      qualifications: form.qualifications,
      experience: form.experience || '8+ Years',
      image: form.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: form.bio || '',
      achievements: form.achievements || ['Mentored 50+ Top Rankers'],
      subjectsTaught: subjectsArr.length > 0 ? subjectsArr : ['General Studies'],
      status: form.status || 'active'
    };

    if (editingFaculty) {
      updateFaculty(editingFaculty.id, payload);
    } else {
      addFaculty(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeletePrompt = (member: FacultyMember) => {
    setFacultyToDelete(member);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (facultyToDelete) {
      deleteFaculty(facultyToDelete.id);
      setFacultyToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Academic Mentors
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Faculty Directory CMS
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Commerce', 'Foundation'].map(
            (dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {dept}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search faculty..."
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
                <th className="py-4 px-6 font-semibold">Faculty Mentor</th>
                <th className="py-4 px-4 font-semibold">Department</th>
                <th className="py-4 px-4 font-semibold">Qualifications & Experience</th>
                <th className="py-4 px-4 font-semibold">Subjects Taught</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={f.image}
                        alt={f.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">{f.name}</div>
                        <div className="text-[11px] text-amber-400 font-medium">{f.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-slate-800 px-2.5 py-0.5 rounded text-[10px] font-semibold text-slate-200">
                      {f.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{f.qualifications}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{f.experience}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {f.subjectsTaught.map((sub, i) => (
                        <span key={i} className="bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(f)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(f)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Delete Profile"
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
                {editingFaculty ? 'Edit Faculty Profile' : 'Add Faculty Member'}
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
                    Faculty Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Ananya Joshi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of Mathematics Dept."
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Department *
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value as FacultyDepartment })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Qualifications *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc. Math, B.Ed."
                    value={form.qualifications}
                    onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Teaching Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12+ Years"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Subjects Taught (comma separated)
                </label>
                <input
                  type="text"
                  value={subjectsTaughtInput}
                  onChange={(e) => setSubjectsTaughtInput(e.target.value)}
                  placeholder="e.g. Class 10 Math, Class 12 Calculus"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Faculty Bio / Teaching Philosophy
                </label>
                <textarea
                  rows={3}
                  placeholder="A brief introduction to their mentorship philosophy..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
                  {editingFaculty ? 'Save Changes' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Faculty Profile"
        message={`Are you sure you want to remove "${facultyToDelete?.name}" from the faculty list?`}
        confirmLabel="Delete Faculty"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
