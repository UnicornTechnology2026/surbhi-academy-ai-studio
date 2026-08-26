import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Course,
  StudentResult,
  FacultyMember,
  GalleryItem,
  Testimonial,
  Notice,
  FAQ,
  AdmissionEnquiryData,
  ContactMessageData,
  HeroContent,
  AboutContent,
  SiteSettings,
  EnquiryStatus
} from '../types';
import { COURSES_DATA } from '../data/courses';
import { RESULTS_DATA } from '../data/results';
import { FACULTY_DATA } from '../data/faculty';
import { GALLERY_DATA } from '../data/gallery';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { INITIAL_NOTICES } from '../data/notices';
import { INITIAL_FAQS } from '../data/faqs';
import { ACADEMY_INFO } from '../data/academyInfo';

const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: '',
  headlineMain: 'Empowering Young Minds For',
  headlineHighlight: 'Academic Brilliance',
  headlineEnd: '& Board Merit.',
  description: 'Nagpur’s most trusted coaching academy for Class 8 to 10 Foundation, Class 11-12 (State & CBSE) and Competitive Exams. Backed by 29+ years of pedagogical excellence and verified state rank holders.',
  primaryButtonText: 'Explore Courses',
  secondaryButtonText: 'Enquire for Admission',
  badgeText: 'Rank 1 Record in Board Exams',
  stats: {
    yearsOfExcellence: 29,
    successfulStudents: 12500,
    expertFaculty: 13,
    topAchievers: 520,
    boardMeritRate: '98.4%',
    cityRankHolders: 45
  }
};

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  tagline: 'A legacy of academic integrity, conceptual clarity, and individual student mentorship since 1997.',
  storyTitle: 'Over 29 Years of Crafting Leaders & Board Toppers',
  storyParagraphs: [
    'Founded in 1997 by Mr. Sandeep Panchabhai, Surabhi Coaching Academy was established with a vision to provide quality education through strong conceptual learning, disciplined study, and personalized mentorship. With limited class sizes, we ensure that every student receives individual attention and guidance.',

    'Over the years, Surabhi Coaching Academy has helped numerous students achieve success in medical, engineering, commerce, and other prestigious fields. By combining experienced teaching, modern technology, and strong academic values, we continue to empower students to achieve their full potential.'
  ],
  founderMessage: {
    name: 'Mr.Sandeep Panchabhai',
    role: 'Founder & Academic Director',
    photo: '../../assets/director/director.png',
    message: 'Every student possesses boundless potential waiting for the right guidance. At Surabhi Academy, we do not simply prepare students for examinations; we cultivate the critical thinking, resilience, and curiosity that will guide their careers for life. We welcome you to join our family of achievers.',
    signatureText: 'Mr.Sandeep Panchabhai.'
  },
  vision: 'To be the gold standard in foundational and secondary education, nurturing confident, intellectually capable, and ethically grounded achievers who lead their fields.',
  mission: 'To provide high-quality, concept-first education through experienced faculty, modern visual pedagogical tools, small batch sizes, and continuous diagnostic evaluation that eliminates fear and fosters genuine academic enthusiasm.',
  coreValues: [
    {
      title: 'Concept Over Rote Learning',
      desc: 'We train students to understand first principles so they can solve even unfamiliar non-routine problems with confidence.'
    },
    {
      title: 'Uncompromising Individual Attention',
      desc: 'With small batch caps and daily 1-on-1 doubt clinics, every student’s unique pace and doubts are acknowledged.'
    },
    {
      title: 'Academic Discipline with Compassion',
      desc: 'We maintain high academic standards while providing an uplifting, motivating, and stress-free environment.'
    },
    {
      title: 'Transparent Parent Collaboration',
      desc: 'Continuous real-time communication on attendance, test scores, and qualitative progress reviews.'
    }
  ]
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: 'Surabhi Coaching Academy',
  tagline: 'Teaching Beyond Examination',
  logoUrl: '',
  primaryPhone: '+91 98226 94137',
  secondaryPhone: '+91 88888 24388',
  whatsappNumber: '+91 98226 94137',
  email: 'surabhitutionclasses@rediffmail.com',
  infoEmail: 'surabhitution',
  mainCampusAddress: 'Surabhi Academy,  N-42, Near Volleyball Ground, Reshimbag, Nagpur, Maharashtra, India',
  workingHoursWeekdays: 'Monday – Saturday: 8:00 AM – 8:30 PM',
  workingHoursSunday: 'Sunday: 9:00 AM – 2:00 PM (Counseling & Enquiry)',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  },
  seo: {
    metaTitle: 'Surabhi Coaching Academy - Premier Coaching for Class 8-12, Olympiads & JEE and NEET Coaching  in Nagpur',
    metaDescription: 'Best coaching classes in Nagpur for Class 8-10 Foundation, Class 11-12 Science (PCM/PCB). Small batches, top faculty, and 99%+ board results.',
    keywords: 'Surabhi coaching academy, coaching classes in Nagpur, Class 10 board coaching, 11th 12th science, Olympiad coaching and JEE and NEET Coaching.'
  }
};

const INITIAL_ENQUIRIES: AdmissionEnquiryData[] = [
];

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AcademyContextType {
  // Courses
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  toggleCourseStatus: (id: string) => void;

  // Achievers
  achievers: StudentResult[];
  addAchiever: (achiever: Omit<StudentResult, 'id'>) => void;
  updateAchiever: (id: string, updated: Partial<StudentResult>) => void;
  deleteAchiever: (id: string) => void;
  toggleAchieverFeatured: (id: string) => void;

  // Faculty
  faculty: FacultyMember[];
  addFaculty: (member: Omit<FacultyMember, 'id'>) => void;
  updateFaculty: (id: string, updated: Partial<FacultyMember>) => void;
  deleteFaculty: (id: string) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  toggleTestimonialStatus: (id: string) => void;

  // Notices
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, updated: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  toggleNoticeStatus: (id: string) => void;

  // FAQs
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, updated: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  addFaq: (faq: Omit<FAQ, 'id'>) => void;
  updateFaq: (id: string, updated: Partial<FAQ>) => void;
  deleteFaq: (id: string) => void;

  // Enquiries
  enquiries: AdmissionEnquiryData[];
  submitEnquiry: (data: Omit<AdmissionEnquiryData, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;
  addCounselorNote: (id: string, notes: string) => void;
  deleteEnquiry: (id: string) => void;

  // Content & Settings
  heroContent: HeroContent;
  updateHeroContent: (content: Partial<HeroContent>) => void;
  aboutContent: AboutContent;
  updateAboutContent: (content: Partial<AboutContent>) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Reset to demo
  resetToDefaultData: () => void;

  // Notification Toasts
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'surabhi_academy_';

export const AcademyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper to load or fallback
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
      if (item) return JSON.parse(item);
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
    }
    return fallback;
  };

  const [courses, setCourses] = useState<Course[]>(() => getStored('courses', COURSES_DATA));
  const [achievers, setAchievers] = useState<StudentResult[]>(() => getStored('achievers', RESULTS_DATA));
  const [faculty, setFaculty] = useState<FacultyMember[]>(() => getStored('faculty', FACULTY_DATA));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getStored('gallery', GALLERY_DATA));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getStored('testimonials', TESTIMONIALS_DATA));
  const [notices, setNotices] = useState<Notice[]>(() => getStored('notices', INITIAL_NOTICES));
  const [faqs, setFaqs] = useState<FAQ[]>(() => getStored('faqs', INITIAL_FAQS));
  const [enquiries, setEnquiries] = useState<AdmissionEnquiryData[]>(() => getStored('enquiries', INITIAL_ENQUIRIES));
  const [heroContent, setHeroContent] = useState<HeroContent>(() => getStored('hero_content', DEFAULT_HERO_CONTENT));
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => getStored('about_content', DEFAULT_ABOUT_CONTENT));
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStored('site_settings', DEFAULT_SITE_SETTINGS));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'courses', JSON.stringify(courses));
    } catch (e) { console.error(e); }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'achievers', JSON.stringify(achievers));
    } catch (e) { console.error(e); }
  }, [achievers]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'faculty', JSON.stringify(faculty));
    } catch (e) { console.error(e); }
  }, [faculty]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'gallery', JSON.stringify(gallery));
    } catch (e) { console.error(e); }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'testimonials', JSON.stringify(testimonials));
    } catch (e) { console.error(e); }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'notices', JSON.stringify(notices));
    } catch (e) { console.error(e); }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'faqs', JSON.stringify(faqs));
    } catch (e) { console.error(e); }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'enquiries', JSON.stringify(enquiries));
    } catch (e) { console.error(e); }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'hero_content', JSON.stringify(heroContent));
    } catch (e) { console.error(e); }
  }, [heroContent]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'about_content', JSON.stringify(aboutContent));
    } catch (e) { console.error(e); }
  }, [aboutContent]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'site_settings', JSON.stringify(siteSettings));
    } catch (e) { console.error(e); }
  }, [siteSettings]);

  // Toast notifications helper
  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Course handlers
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: 'c_' + Date.now()
    };
    setCourses((prev) => [newCourse, ...prev]);
    addToast(`Course "${newCourse.title}" created successfully.`);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    addToast('Course details updated successfully.');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    addToast('Course removed successfully.', 'info');
  };

  const toggleCourseStatus = (id: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
    addToast('Course status updated.');
  };

  // Achievers handlers
  const addAchiever = (achieverData: Omit<StudentResult, 'id'>) => {
    const newAchiever: StudentResult = {
      ...achieverData,
      id: 'r_' + Date.now(),
      status: 'active'
    };
    setAchievers((prev) => [newAchiever, ...prev]);
    addToast(`Student achiever "${newAchiever.name}" added successfully.`);
  };

  const updateAchiever = (id: string, updated: Partial<StudentResult>) => {
    setAchievers((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
    );
    addToast('Student achiever record updated.');
  };

  const deleteAchiever = (id: string) => {
    setAchievers((prev) => prev.filter((a) => a.id !== id));
    addToast('Student record deleted.', 'info');
  };

  const toggleAchieverFeatured = (id: string) => {
    setAchievers((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a))
    );
    addToast('Achiever featured status changed.');
  };

  // Faculty handlers
  const addFaculty = (memberData: Omit<FacultyMember, 'id'>) => {
    const newMember: FacultyMember = {
      ...memberData,
      id: 'f_' + Date.now(),
      status: 'active'
    };
    setFaculty((prev) => [...prev, newMember]);
    addToast(`Faculty member "${newMember.name}" added.`);
  };

  const updateFaculty = (id: string, updated: Partial<FacultyMember>) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
    addToast('Faculty profile updated.');
  };

  const deleteFaculty = (id: string) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
    addToast('Faculty record removed.', 'info');
  };

  // Gallery handlers
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: 'g_' + Date.now(),
      status: 'active'
    };
    setGallery((prev) => [newItem, ...prev]);
    addToast('Gallery photo added.');
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
    addToast('Gallery item updated.');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    addToast('Gallery item deleted.', 'info');
  };

  // Testimonials handlers
  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testData,
      id: 't_' + Date.now(),
      status: 'active'
    };
    setTestimonials((prev) => [newTest, ...prev]);
    addToast('Testimonial added.');
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    addToast('Testimonial updated.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    addToast('Testimonial removed.', 'info');
  };

  const toggleTestimonialStatus = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
      )
    );
    addToast('Testimonial status updated.');
  };

  // Notices handlers
  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: 'n_' + Date.now(),
      isNew: true
    };
    setNotices((prev) => [newNotice, ...prev]);
    addToast('New announcement posted.');
  };

  const updateNotice = (id: string, updated: Partial<Notice>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
    addToast('Announcement updated.');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    addToast('Announcement deleted.', 'info');
  };

  const toggleNoticeStatus = (id: string) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: n.status === 'published' ? 'draft' : 'published' } : n
      )
    );
    addToast('Notice publication status changed.');
  };

  // FAQ handlers
  const addFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFaq: FAQ = {
      ...faqData,
      id: 'faq_' + Date.now(),
      status: 'active'
    };
    setFaqs((prev) => [...prev, newFaq]);
    addToast('FAQ question added.');
  };

  const updateFAQ = (id: string, updated: Partial<FAQ>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
    addToast('FAQ updated.');
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    addToast('FAQ deleted.', 'info');
  };

  // Enquiry handlers
  const submitEnquiry = async (data: Omit<AdmissionEnquiryData, 'id' | 'status' | 'createdAt'>): Promise<boolean> => {
    try {
      const newEnquiry: AdmissionEnquiryData = {
        ...data,
        id: 'enq-' + Date.now(),
        status: 'new',
        adminNotes: '',
        createdAt: new Date().toISOString()
      };
      setEnquiries((prev) => [newEnquiry, ...prev]);
      addToast('Your admission enquiry has been submitted successfully! Our counselor will call you within 24 hours.', 'success');
      return true;
    } catch (e) {
      addToast('Failed to submit enquiry. Please call us directly.', 'error');
      return false;
    }
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    addToast(`Enquiry marked as ${status}.`);
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, adminNotes: notes } : e))
    );
    addToast('Internal counselor notes saved.');
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    addToast('Enquiry record deleted.', 'info');
  };

  // Content & Settings handlers
  const updateHeroContent = (content: Partial<HeroContent>) => {
    setHeroContent((prev) => ({ ...prev, ...content }));
    addToast('Homepage hero content updated successfully.');
  };

  const updateAboutContent = (content: Partial<AboutContent>) => {
    setAboutContent((prev) => ({ ...prev, ...content }));
    addToast('About page content updated.');
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    addToast('Academy settings and contact details saved.');
  };

  const resetToDefaultData = () => {
    setCourses(COURSES_DATA);
    setAchievers(RESULTS_DATA);
    setFaculty(FACULTY_DATA);
    setGallery(GALLERY_DATA);
    setTestimonials(TESTIMONIALS_DATA);
    setNotices(INITIAL_NOTICES);
    setFaqs(INITIAL_FAQS);
    setEnquiries(INITIAL_ENQUIRIES);
    setHeroContent(DEFAULT_HERO_CONTENT);
    setAboutContent(DEFAULT_ABOUT_CONTENT);
    setSiteSettings(DEFAULT_SITE_SETTINGS);

    // Clear local storage keys
    [
      'courses',
      'achievers',
      'faculty',
      'gallery',
      'testimonials',
      'notices',
      'faqs',
      'enquiries',
      'hero_content',
      'about_content',
      'site_settings'
    ].forEach((k) => {
      localStorage.removeItem(LOCAL_STORAGE_PREFIX + k);
    });

    addToast('All demo data and settings have been reset to factory defaults.', 'info');
  };

  return (
    <AcademyContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleCourseStatus,

        achievers,
        addAchiever,
        updateAchiever,
        deleteAchiever,
        toggleAchieverFeatured,

        faculty,
        addFaculty,
        updateFaculty,
        deleteFaculty,

        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        toggleTestimonialStatus,

        notices,
        addNotice,
        updateNotice,
        deleteNotice,
        toggleNoticeStatus,

        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addFaq: addFAQ,
        updateFaq: updateFAQ,
        deleteFaq: deleteFAQ,

        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        addCounselorNote: updateEnquiryNotes,
        deleteEnquiry,

        heroContent,
        updateHeroContent,
        aboutContent,
        updateAboutContent,
        siteSettings,
        updateSiteSettings,

        resetToDefaultData,

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = (): AcademyContextType => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
