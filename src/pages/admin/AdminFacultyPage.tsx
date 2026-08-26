import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { FacultyMember, FacultyDepartment } from '../../types';
import { ConfirmModal } from '../../components/ConfirmModal';

export const AdminFacultyPage: React.FC = () => {
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useAcademy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<FacultyMember, 'id'>>({
    name: '',
    role: 'Senior Faculty',
    department: 'Mathematics',
    qualifications: 'M.Sc. / B.Ed',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Dedicated educator specializing in state board & competitive exams.',
    achievements: ['100+ Students in Merit List', 'Best Educator Award'],
    subjectsTaught: ['Mathematics', 'Statistics'],
    status: 'active'
  });

  // Helper strings for multi-inputs
  const [achievementsStr, setAchievementsStr] = useState('');
  const [subjectsStr, setSubjectsStr] = useState('');

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<string | null>(null);

  const departments: (FacultyDepartment | 'All')[] = [
    'All', 
    'Mathematics', 
    'Physics', 
    'Chemistry', 
    'Biology', 
    'Commerce', 
    'Foundation'
  ];

  const handleOpenAddModal = () => {
    setEditingFaculty(null);
    setFormData({
      name: '',
      role: 'Senior Faculty',
      department: 'Mathematics',
      qualifications: 'M.Sc., B.Ed',
      experience: '10+ Years',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Dedicated educator specializing in concept-first learning.',
      achievements: ['100+ Students in Merit List'],
      subjectsTaught: ['Mathematics'],
      status: 'active'
    });
    setAchievementsStr('100+ Students in Merit List');
    setSubjectsStr('Mathematics');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: FacultyMember) => {
    setEditingFaculty(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      qualifications: member.qualifications || member.qualification || '',
      experience: member.experience,
      image: member.image,
      bio: member.bio || '',
      achievements: member.achievements || [],
      subjectsTaught: member.subjectsTaught || (member.subject ? [member.subject] : []),
      status: member.status || 'active'
    });
    setAchievementsStr((member.achievements || []).join(', '));
    setSubjectsStr((member.subjectsTaught || (member.subject ? [member.subject] : [])).join(', '));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload: Omit<FacultyMember, 'id'> = {
      ...formData,
      achievements: achievementsStr.split(',').map(s => s.trim()).filter(Boolean),
      subjectsTaught: subjectsStr.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingFaculty) {
      updateFaculty(editingFaculty.id, payload);
    } else {
      addFaculty(payload);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (facultyToDelete) {
      deleteFaculty(facultyToDelete);
      setFacultyToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredFaculty = faculty.filter(f => {
    const matchesDept = selectedDepartment === 'All' || f.department === selectedDepartment;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (f.subjectsTaught || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            Faculty & Mentors Management
          </h1>
          <p className="text-sm text-slate-400">
            Manage teacher profiles, departments, academic qualifications, and bios displayed on the website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid sm:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, subject, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="sm:col-span-6 flex items-center gap-1.5 overflow-x-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shrink-0"
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-white text-base leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {member.role}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <BookOpen className="w-3 h-3 text-slate-500" />
                    <span>{member.department}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Experience:</span>
                  <span className="text-white font-medium">{member.experience}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Qualifications:</span>
                  <span className="text-white font-medium truncate max-w-[150px]">{member.qualifications || member.qualification}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Subjects:</span>
                  <span className="text-amber-300 font-medium truncate max-w-[150px]">
                    {(member.subjectsTaught || []).join(', ') || member.subject || member.department}
                  </span>
                </div>
              </div>

              {member.bio && (
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Mentor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(member)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setFacultyToDelete(member.id);
                    setDeleteModalOpen(true);
                  }}
                  className="p-2 bg-slate-900 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredFaculty.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No faculty members found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>{editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}</span>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Prof. Rajesh Sharma"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Head of Department"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as FacultyDepartment })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Experience *</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. 12+ Years"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Qualifications *</label>
                  <input
                    type="text"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder="e.g. M.Sc. (Maths), B.Ed"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subjects Taught (comma-separated)</label>
                <input
                  type="text"
                  value={subjectsStr}
                  onChange={(e) => setSubjectsStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Higher Mathematics, Geometry, Statistics"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Achievements (comma-separated)</label>
                <input
                  type="text"
                  value={achievementsStr}
                  onChange={(e) => setAchievementsStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Mentored Rank 1, 100/100 in Maths"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Photo URL (Unsplash or Image link)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Biography</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Brief overview of teaching philosophy and student success track record..."
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
                  {editingFaculty ? 'Save Changes' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Faculty Profile"
        message="Are you sure you want to remove this faculty profile from the website directory?"
        confirmLabel="Yes, Delete"
        onConfirm={confirmDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
