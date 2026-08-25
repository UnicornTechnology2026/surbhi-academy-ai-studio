export type CourseCategory = 'foundation' | 'science' | 'commerce' | 'competitive';
export type AchieverCategory = 'class10' | 'class12' | 'competitive';
export type FacultyDepartment = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'Commerce' | 'Foundation';
export type GalleryCategory = 'classroom' | 'sessions' | 'activities' | 'achievements' | 'events' | 'ceremonies';
export type NoticePriority = 'normal' | 'important' | 'urgent';
export type NoticeCategory = 'admissions' | 'batch' | 'holiday' | 'academic';
export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'converted'
  | 'closed'
  | 'enrolled'
  | 'archived';

export interface CourseCurriculumItem {
  title: string;
  description: string;
  duration?: string;
  topics?: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  categoryLabel: string;
  gradeLevel: string;
  duration: string;
  description?: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  subjects: string[];
  features: string[];
  eligibility: string;
  classTiming: string;
  batchSize: string;
  materialsIncluded: string[];
  curriculumHighlights: CourseCurriculumItem[];
  /** @deprecated use curriculumHighlights - kept for backward compatibility */
  curriculum?: CourseCurriculumItem[];
  targetedExams: string[];
  /** @deprecated use targetedExams - kept for backward compatibility */
  targetExam?: string;
  feeStructure?: string;
  image: string;
  feesInfo?: string;
  status: 'active' | 'inactive';
  displayOrder?: number;
}

export interface StudentResult {
  id: string;
  name: string;
  rank?: number;
  rankTitle: string;
  exam: string;
  examName?: string;
  score: string;
  percentile?: string;
  year: string;
  category: AchieverCategory;
  categoryLabel: string;
  gradeLevel: string;
  school?: string;
  testimonial?: string;
  testimonialQuote?: string;
  image: string;
  photo?: string;
  badgeType?: 'gold' | 'silver' | 'bronze' | 'special';
  featured?: boolean;
  displayOrder?: number;
  status?: 'active' | 'inactive';
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: FacultyDepartment;
  qualifications: string;
  /** @deprecated use qualifications - kept for backward compatibility */
  qualification?: string;
  experience: string;
  image: string;
  bio: string;
  achievements: string[];
  subjectsTaught: string[];
  /** @deprecated use subjectsTaught - kept for backward compatibility */
  subject?: string;
  displayOrder?: number;
  status?: 'active' | 'inactive';

}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  caption?: string;
  date?: string;
  status?: 'active' | 'inactive';
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent' | 'Alumni';
  relation?: string;
  course?: string;
  year?: string;
  achievement?: string;
  rating: number;
  image?: string;
  photo?: string;
  content?: string;
  quote?: string;
  status?: 'active' | 'inactive';
  featured?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  description?: string;
  content?: string;
  summary?: string;
  date?: string;
  publishDate?: string;
  priority?: NoticePriority;
  isUrgent?: boolean;
  category: NoticeCategory;
  categoryLabel?: string;
  attachmentUrl?: string;
  status: 'published' | 'draft';
  isNew?: boolean;
}

/** Alias kept for backward compatibility with pages importing NoticeItem */
export type NoticeItem = Notice;

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'admissions' | 'academics' | 'facilities' | 'general' | 'Admissions' | 'Academics' | 'Fees' | 'Batches' | 'General' | string;
  displayOrder?: number;
  order?: number;
  status: 'active' | 'inactive';
}

/** Alias kept for backward compatibility with pages importing FAQItem */
export type FAQItem = FAQ;

export interface AdmissionEnquiryData {
  id: string;
  studentName: string;
  parentName?: string;
  mobileNumber: string;
  emailAddress?: string;
  studentClass: string;
  courseInterested?: string;
  message?: string;
  notes?: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
  source?: string;
}

/** Alias kept for backward compatibility with pages importing Enquiry */
export type Enquiry = AdmissionEnquiryData;

export interface ContactMessageData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface AcademyStats {
  yearsOfExcellence: number;
  successfulStudents: number;
  expertFaculty: number;
  topAchievers: number;
  boardMeritRate: string;
  cityRankHolders: number;
}

export interface HeroContent {
  eyebrow?: ''
  headlineMain: string;
  headlineHighlight: string;
  headlineEnd: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  badgeText: string;
  stats: AcademyStats;
}

export interface AboutContent {
  tagline: string;
  storyTitle: string;
  storyParagraphs: string[];
  founderMessage: {
    name: string;
    role: string;
    photo: string;
    message: string;
    signatureText: string;
  };
  vision: string;
  mission: string;
  coreValues: { title: string; desc: string }[];
}

export interface SiteSettings {
  name: string;
  academyName?: string;
  tagline: string;
  logoUrl?: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  infoEmail?: string;
  mainCampusAddress: string;
  branchAddress?: string;
  secondaryCampusAddress?: string;
  workingHoursWeekdays: string;
  workingHoursSunday: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  socialFacebook?: string;
  socialInstagram?: string;
  socialYoutube?: string;
  socialLinkedin?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Academic Counselor' | 'Editor';
}