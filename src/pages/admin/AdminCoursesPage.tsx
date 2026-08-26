import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
  X,
} from "lucide-react";
import { useAcademy } from "../../context/AcademyContext";
import { Course, CourseCategory } from "../../types";
import { ConfirmModal } from "../../components/ConfirmModal";
import { ImageUpload } from "../../components/admin/ImageUpload";

export const AdminCoursesPage: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourseStatus } =
    useAcademy();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  // Form State
  const [form, setForm] = useState<Partial<Course>>({
    title: "",
    slug: "",
    category: "science",
    categoryLabel: "Class 11 & 12 Science",
    gradeLevel: "Class 11-12",
    duration: "1 or 2 Years Integrated",
    badge: "Popular",
    shortDescription: "",
    fullDescription: "",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    features: [
      "Small batch size",
      "Daily doubt sessions",
      "Comprehensive test series",
    ],
    eligibility: "Pass in previous class with min 60%",
    classTiming: "Mon-Sat: 4:30 PM - 7:30 PM",
    batchSize: "Max 25-30 Students",
    materialsIncluded: ["Module Notes", "Question Banks", "Formula Sheets"],
    curriculumHighlights: [
      {
        title: "Concept Mastery",
        description: "Deep fundamentals for school & competitive exams.",
      },
    ],
    targetedExams: ["CBSE Board", "State Board", "Olympiads"],
    image: "",
    feesInfo: "Affordable installment plans available",
    status: "active",
  });

  const [subjectsInput, setSubjectsInput] = useState(
    "Physics, Chemistry, Mathematics",
  );
  const [featuresInput, setFeaturesInput] = useState(
    "Small batch size, Daily doubt sessions, Comprehensive study material",
  );

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "all" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setForm({
      title: "",
      slug: "",
      category: "science",
      categoryLabel: CATEGORY_LABELS.science,
      gradeLevel: "",
      duration: "1 or 2 Years Integrated",
      badge: "New Batch",
      shortDescription: "",
      fullDescription: "",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      features: [
        "Small batch size",
        "Daily doubt clinics",
        "Weekly chapter tests",
      ],
      eligibility: "Pass in previous qualifying exam",
      materialsIncluded: ["Theory Modules", "Worksheets", "Mind Maps"],
      curriculumHighlights: [
        {
          title: "Fundamental Concepts",
          description: "Building step-by-step analytical clarity.",
        },
      ],
      targetedExams: ["CBSE Board", "State Board"],
      image: "", // <--- Changed to blank string
      feesInfo: "Installment & Merit Scholarships Available",
      status: "active",
    });
    setSubjectsInput("Physics, Chemistry, Mathematics");
    setFeaturesInput(
      "Small batch size, Daily doubt clinics, Weekly chapter tests",
    );
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: Course) => {
    setEditingCourse(course);
    setForm({ ...course });
    setSubjectsInput(course.subjects.join(", "));
    setFeaturesInput(course.features.join(", "));
    setIsModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const slug =
      form.slug ||
      form.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");

    const subjectsArr = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const featuresArr = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Omit<Course, "id"> = {
      title: form.title || "",
      slug,
      category: (form.category as CourseCategory) || "science",
      categoryLabel: form.categoryLabel || "Academic Course",
      gradeLevel: form.gradeLevel || "Class 10",
      duration: form.duration || "1 Year",
      badge: form.badge || undefined,
      shortDescription: form.shortDescription || "",
      fullDescription: form.fullDescription || form.shortDescription || "",
      subjects: subjectsArr.length > 0 ? subjectsArr : ["General Studies"],
      features:
        featuresArr.length > 0
          ? featuresArr
          : ["Expert Faculty", "Regular Tests"],
      eligibility: form.eligibility || "Standard school pass criteria",
      classTiming: form.classTiming || "Evening Batches",
      batchSize: form.batchSize || "Max 25-30 Students",
      materialsIncluded: form.materialsIncluded || [
        "Printed Notes",
        "Question Bank",
      ],
      curriculumHighlights: form.curriculumHighlights || [
        {
          title: "Core Syllabus",
          description: "Comprehensive coverage with revisions.",
        },
      ],
      targetedExams: form.targetedExams || ["Board Exams"],
      image:
        form.image ||
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      feesInfo: form.feesInfo || "Contact Admissions for details",
      status: form.status || "active",
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, payload);
    } else {
      addCourse(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeletePrompt = (course: Course) => {
    setCourseToDelete(course);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id);
      setCourseToDelete(null);
    }
  };

  const CATEGORY_LABELS: Record<CourseCategory, string> = {
    foundation: "Class 6–10 Foundation",
    science: "Class 11 & 12 Science",
    commerce: "Class 11 & 12 Commerce",
    competitive: "Competitive Exams",
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Academic Curriculum
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Course Management CMS
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["all", "foundation", "science", "commerce", "competitive"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat === "all" ? "All Programs" : cat}
              </button>
            ),
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Courses List Table */}
      {/* Courses List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6 font-semibold">Program</th>
                <th className="py-4 px-4 font-semibold">Grade / Category</th>
                <th className="py-4 px-4 font-semibold">Subjects</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCourses.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-12 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-2">
                          <span>{c.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {c.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">
                      {c.gradeLevel}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase">
                      {c.category}
                    </div>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {c.subjects.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-300"
                        >
                          {sub}
                        </span>
                      ))}
                      {c.subjects.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          +{c.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleCourseStatus(c.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        c.status === "active"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {c.status === "active" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  {/* Edit & Delete in ONE clean inline row */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(c)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="Edit Course"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(c)}
                        className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-red-100 transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingCourse
                  ? `Edit Course: ${editingCourse.title}`
                  : "Add New Academic Program"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveCourse}
              className="p-6 overflow-y-auto space-y-5 flex-1 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 10 Board Excellence & Merit Batch"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const category = e.target.value as CourseCategory;
                      setForm({
                        ...form,
                        category,
                        categoryLabel: CATEGORY_LABELS[category],
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="foundation">Class 6–10 Foundation</option>
                    <option value="science">Class 11 & 12 Science</option>
                    <option value="competitive">Competitive Exams</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Target Grade / Class
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Class 10"
                    value={form.gradeLevel}
                    onChange={(e) =>
                      setForm({ ...form, gradeLevel: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Program Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year Academic Session"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, Admissions Open"
                    value={form.badge || ""}
                    onChange={(e) =>
                      setForm({ ...form, badge: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Short Overview / Subtitle *
                </label>
                <input
                  type="text"
                  required
                  placeholder="One sentence summary for course cards..."
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 uppercase font-bold mb-1">
                  Full Course Description
                </label>
                <textarea
                  rows={3}
                  placeholder="In-depth explanation of syllabus coverage, methodology..."
                  value={form.fullDescription}
                  onChange={(e) =>
                    setForm({ ...form, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Subjects (comma separated)
                  </label>
                  <input
                    type="text"
                    value={subjectsInput}
                    onChange={(e) => setSubjectsInput(e.target.value)}
                    placeholder="e.g. Mathematics, Science, English"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Key Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="e.g. Small Batch, Daily Tests, Doubt Clinic"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 uppercase font-bold mb-1">
                    Fee Structure Info
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Installment options available / Scholarships Available"
                    value={form.feesInfo || ""}
                    onChange={(e) =>
                      setForm({ ...form, feesInfo: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Cover Image Uploader (Drag, Drop, or Select from Device) */}
                <div>
                  <ImageUpload
                    label="Program Cover Image / Banner *"
                    value={form.image}
                    onChange={(img: string) => setForm({ ...form, image: img })}
                    helperText="Drag & drop your course flyer/banner or click to upload from device (PNG, JPG, WebP)"
                    aspectRatio="landscape"
                    theme="dark"
                  />
                </div>
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
                  {editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="Delete Course Program"
        message={`Are you sure you want to remove "${courseToDelete?.title}" from the academy catalogue?`}
        confirmLabel="Delete Program"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};
