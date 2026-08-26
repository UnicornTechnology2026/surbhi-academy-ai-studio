import { Course, StudentResult, AdmissionEnquiryData } from '../types';

// --- courses ---------------------------------------------------------

export const courseFromRow = (row: any): Course => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  category: row.category,
  categoryLabel: row.category_label,
  gradeLevel: row.grade_level,
  duration: row.duration,
  description: row.description ?? undefined,
  badge: row.badge ?? undefined,
  shortDescription: row.short_description,
  fullDescription: row.full_description,
  subjects: row.subjects ?? [],
  features: row.features ?? [],
  eligibility: row.eligibility,
  classTiming: row.class_timing,
  batchSize: row.batch_size,
  materialsIncluded: row.materials_included ?? [],
  curriculumHighlights: row.curriculum_highlights ?? [],
  targetedExams: row.targeted_exams ?? [],
  feeStructure: row.fee_structure ?? undefined,
  image: row.image ?? '',
  feesInfo: row.fees_info ?? undefined,
  status: row.status,
  displayOrder: row.display_order ?? 0
});

export const courseToRow = (course: Partial<Course>): Record<string, any> => {
  const row: Record<string, any> = {};
  if (course.slug !== undefined) row.slug = course.slug;
  if (course.title !== undefined) row.title = course.title;
  if (course.category !== undefined) row.category = course.category;
  if (course.categoryLabel !== undefined) row.category_label = course.categoryLabel;
  if (course.gradeLevel !== undefined) row.grade_level = course.gradeLevel;
  if (course.duration !== undefined) row.duration = course.duration;
  if (course.description !== undefined) row.description = course.description;
  if (course.badge !== undefined) row.badge = course.badge;
  if (course.shortDescription !== undefined) row.short_description = course.shortDescription;
  if (course.fullDescription !== undefined) row.full_description = course.fullDescription;
  if (course.subjects !== undefined) row.subjects = course.subjects;
  if (course.features !== undefined) row.features = course.features;
  if (course.eligibility !== undefined) row.eligibility = course.eligibility;
  if (course.classTiming !== undefined) row.class_timing = course.classTiming;
  if (course.batchSize !== undefined) row.batch_size = course.batchSize;
  if (course.materialsIncluded !== undefined) row.materials_included = course.materialsIncluded;
  if (course.curriculumHighlights !== undefined) row.curriculum_highlights = course.curriculumHighlights;
  if (course.targetedExams !== undefined) row.targeted_exams = course.targetedExams;
  if (course.feeStructure !== undefined) row.fee_structure = course.feeStructure;
  if (course.image !== undefined) row.image = course.image;
  if (course.feesInfo !== undefined) row.fees_info = course.feesInfo;
  if (course.status !== undefined) row.status = course.status;
  if (course.displayOrder !== undefined) row.display_order = course.displayOrder;
  return row;
};

// --- achievers ---------------------------------------------------------

export const achieverFromRow = (row: any): StudentResult => ({
  id: row.id,
  name: row.name,
  rank: row.rank ?? undefined,
  rankTitle: row.rank_title,
  exam: row.exam,
  examName: row.exam_name ?? undefined,
  score: row.score,
  percentile: row.percentile ?? undefined,
  year: row.year,
  category: row.category,
  categoryLabel: row.category_label,
  gradeLevel: row.grade_level,
  school: row.school ?? undefined,
  testimonial: row.testimonial ?? undefined,
  testimonialQuote: row.testimonial_quote ?? undefined,
  image: row.image ?? '',
  photo: row.photo ?? undefined,
  badgeType: row.badge_type ?? undefined,
  featured: row.featured ?? false,
  displayOrder: row.display_order ?? 0,
  status: row.status ?? 'active'
});

export const achieverToRow = (a: Partial<StudentResult>): Record<string, any> => {
  const row: Record<string, any> = {};
  if (a.name !== undefined) row.name = a.name;
  if (a.rank !== undefined) row.rank = a.rank;
  if (a.rankTitle !== undefined) row.rank_title = a.rankTitle;
  if (a.exam !== undefined) row.exam = a.exam;
  if (a.examName !== undefined) row.exam_name = a.examName;
  if (a.score !== undefined) row.score = a.score;
  if (a.percentile !== undefined) row.percentile = a.percentile;
  if (a.year !== undefined) row.year = a.year;
  if (a.category !== undefined) row.category = a.category;
  if (a.categoryLabel !== undefined) row.category_label = a.categoryLabel;
  if (a.gradeLevel !== undefined) row.grade_level = a.gradeLevel;
  if (a.school !== undefined) row.school = a.school;
  if (a.testimonial !== undefined) row.testimonial = a.testimonial;
  if (a.testimonialQuote !== undefined) row.testimonial_quote = a.testimonialQuote;
  if (a.image !== undefined) row.image = a.image;
  if (a.photo !== undefined) row.photo = a.photo;
  if (a.badgeType !== undefined) row.badge_type = a.badgeType;
  if (a.featured !== undefined) row.featured = a.featured;
  if (a.displayOrder !== undefined) row.display_order = a.displayOrder;
  if (a.status !== undefined) row.status = a.status;
  return row;
};

// --- enquiries ---------------------------------------------------------

export const enquiryFromRow = (row: any): AdmissionEnquiryData => ({
  id: row.id,
  studentName: row.student_name,
  parentName: row.parent_name ?? undefined,
  mobileNumber: row.mobile_number,
  emailAddress: row.email_address ?? undefined,
  studentClass: row.student_class,
  courseInterested: row.course_interested ?? undefined,
  message: row.message ?? undefined,
  notes: row.notes ?? undefined,
  status: row.status,
  adminNotes: row.admin_notes ?? undefined,
  createdAt: row.created_at,
  source: row.source ?? undefined
});

export const enquiryToInsertRow = (
  e: Omit<AdmissionEnquiryData, 'id' | 'status' | 'createdAt'>
): Record<string, any> => ({
  student_name: e.studentName,
  parent_name: e.parentName,
  mobile_number: e.mobileNumber,
  email_address: e.emailAddress,
  student_class: e.studentClass,
  course_interested: e.courseInterested,
  message: e.message,
  notes: e.notes,
  source: e.source
});