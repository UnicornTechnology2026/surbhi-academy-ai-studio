import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Course,
  StudentResult,
  FacultyMember,
  GalleryItem,
  Testimonial,
  Notice,
  FAQ,
  AdmissionEnquiryData,
  HeroContent,
  AboutContent,
  SiteSettings,
  EnquiryStatus,
} from "../types";
import { supabase } from "../lib/supabaseClient";
import {
  courseFromRow,
  courseToRow,
  achieverFromRow,
  achieverToRow,
  enquiryFromRow,
  enquiryToInsertRow,
} from "../lib/mappers";

const DEFAULT_HERO_CONTENT: HeroContent = {
  eyebrow: "",
  headlineMain: "Empowering Young Minds For",
  headlineHighlight: "Academic Brilliance",
  headlineEnd: "& Board Merit.",
  description:
    "Nagpur’s most trusted coaching academy for Class 8 to 10 Foundation, Class 11-12 (State & CBSE) and Competitive Exams. Backed by 29+ years of pedagogical excellence and verified state rank holders.",
  primaryButtonText: "Explore Courses",
  secondaryButtonText: "Enquire for Admission",
  badgeText: "Rank 1 Record in Board Exams",
  stats: {
    yearsOfExcellence: 29,
    successfulStudents: 12500,
    expertFaculty: 13,
    topAchievers: 520,
    boardMeritRate: "98.4%",
    cityRankHolders: 45,
  },
};

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  tagline:
    "A legacy of academic integrity, conceptual clarity, and individual student mentorship since 1997.",
  storyTitle: "Over 29 Years of Crafting Leaders & Board Toppers",
  storyParagraphs: [
    "Founded in 1997 by Mr. Sandeep Panchabhai, Surabhi Coaching Academy was established with a vision to provide quality education through strong conceptual learning, disciplined study, and personalized mentorship. With limited class sizes, we ensure that every student receives individual attention and guidance.",

    "Over the years, Surabhi Coaching Academy has helped numerous students achieve success in medical, engineering, commerce, and other prestigious fields. By combining experienced teaching, modern technology, and strong academic values, we continue to empower students to achieve their full potential.",
  ],
  founderMessage: {
    name: "Mr.Sandeep Panchabhai",
    role: "Founder & Academic Director",
    photo: "../../assets/director/director.png",
    message:
      "Every student possesses boundless potential waiting for the right guidance. At Surabhi Academy, we do not simply prepare students for examinations; we cultivate the critical thinking, resilience, and curiosity that will guide their careers for life. We welcome you to join our family of achievers.",
    signatureText: "Mr.Sandeep Panchabhai.",
  },
  vision:
    "To be the gold standard in foundational and secondary education, nurturing confident, intellectually capable, and ethically grounded achievers who lead their fields.",
  mission:
    "To provide high-quality, concept-first education through experienced faculty, modern visual pedagogical tools, small batch sizes, and continuous diagnostic evaluation that eliminates fear and fosters genuine academic enthusiasm.",
  coreValues: [
    {
      title: "Concept Over Rote Learning",
      desc: "We train students to understand first principles so they can solve even unfamiliar non-routine problems with confidence.",
    },
    {
      title: "Uncompromising Individual Attention",
      desc: "With small batch caps and daily 1-on-1 doubt clinics, every student’s unique pace and doubts are acknowledged.",
    },
    {
      title: "Academic Discipline with Compassion",
      desc: "We maintain high academic standards while providing an uplifting, motivating, and stress-free environment.",
    },
    {
      title: "Transparent Parent Collaboration",
      desc: "Continuous real-time communication on attendance, test scores, and qualitative progress reviews.",
    },
  ],
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: "Surabhi Coaching Academy",
  tagline: "Teaching Beyond Examination",
  logoUrl: "",
  primaryPhone: "+91 98226 94137",
  secondaryPhone: "+91 88888 24388",
  whatsappNumber: "+91 98226 94137",
  email: "surabhitutionclasses@rediffmail.com",
  infoEmail: "surabhitution",
  mainCampusAddress:
    "Surabhi Academy,  N-42, Near Volleyball Ground, Reshimbag, Nagpur, Maharashtra, India",
  workingHoursWeekdays: "Monday – Saturday: 8:00 AM – 8:30 PM",
  workingHoursSunday: "Sunday: 9:00 AM – 2:00 PM (Counseling & Enquiry)",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
  seo: {
    metaTitle:
      "Surabhi Coaching Academy - Premier Coaching for Class 8-12, Olympiads & JEE and NEET Coaching  in Nagpur",
    metaDescription:
      "Best coaching classes in Nagpur for Class 8-10 Foundation, Class 11-12 Science (PCM/PCB). Small batches, top faculty, and 99%+ board results.",
    keywords:
      "Surabhi coaching academy, coaching classes in Nagpur, Class 10 board coaching, 11th 12th science, Olympiad coaching and JEE and NEET Coaching.",
  },
};

const INITIAL_ENQUIRIES: AdmissionEnquiryData[] = [];

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

interface AcademyContextType {
  // Courses
  courses: Course[];
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  toggleCourseStatus: (id: string) => void;

  // Achievers
  achievers: StudentResult[];
  addAchiever: (achiever: Omit<StudentResult, "id">) => void;
  updateAchiever: (id: string, updated: Partial<StudentResult>) => void;
  deleteAchiever: (id: string) => void;
  toggleAchieverFeatured: (id: string) => void;

  // Enquiries
  enquiries: AdmissionEnquiryData[];
  submitEnquiry: (
    data: Omit<AdmissionEnquiryData, "id" | "status" | "createdAt">,
  ) => Promise<boolean>;
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

  // Notification Toasts
  toasts: ToastMessage[];
  addToast: (text: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = "surabhi_academy_";

export const AcademyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  // Courses, achievers, enquiries, and the three content-settings tables are
  // backed by Supabase (see supabase-schema.sql) — they're fetched below and
  // every mutation writes straight through to the database.
  const [courses, setCourses] = useState<Course[]>([]);
  const [achievers, setAchievers] = useState<StudentResult[]>([]);
  const [enquiries, setEnquiries] = useState<AdmissionEnquiryData[]>([]);
  const [heroContent, setHeroContent] =
    useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [aboutContent, setAboutContent] = useState<AboutContent>(
    DEFAULT_ABOUT_CONTENT,
  );
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(
    DEFAULT_SITE_SETTINGS,
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initial fetch from Supabase
  useEffect(() => {
    (async () => {
      const [
        coursesRes,
        achieversRes,
        enquiriesRes,
        heroRes,
        aboutRes,
        settingsRes,
      ] = await Promise.all([
        supabase
          .from("courses")
          .select("*")
          .order("display_order", { ascending: true }),
        supabase
          .from("achievers")
          .select("*")
          .order("display_order", { ascending: true }),
        supabase
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("hero_content").select("data").eq("id", 1).maybeSingle(),
        supabase.from("about_content").select("data").eq("id", 1).maybeSingle(),
        supabase.from("site_settings").select("data").eq("id", 1).maybeSingle(),
      ]);

      if (coursesRes.error)
        console.error("Failed to load courses:", coursesRes.error);
      else setCourses((coursesRes.data ?? []).map(courseFromRow));

      if (achieversRes.error)
        console.error("Failed to load achievers:", achieversRes.error);
      else setAchievers((achieversRes.data ?? []).map(achieverFromRow));

      if (enquiriesRes.error)
        console.error("Failed to load enquiries:", enquiriesRes.error);
      else setEnquiries((enquiriesRes.data ?? []).map(enquiryFromRow));

      if (
        !heroRes.error &&
        heroRes.data?.data &&
        Object.keys(heroRes.data.data).length > 0
      ) {
        setHeroContent(heroRes.data.data as HeroContent);
      }
      if (
        !aboutRes.error &&
        aboutRes.data?.data &&
        Object.keys(aboutRes.data.data).length > 0
      ) {
        setAboutContent(aboutRes.data.data as AboutContent);
      }
      if (
        !settingsRes.error &&
        settingsRes.data?.data &&
        Object.keys(settingsRes.data.data).length > 0
      ) {
        setSiteSettings(settingsRes.data.data as SiteSettings);
      }
    })();
  }, []);

  // Sync to local storage (faculty/gallery/testimonials/notices/faqs only —
  // courses/achievers/enquiries/content-settings sync directly to Supabase
  // inside their own handlers instead of via a generic effect).

  // Toast notifications helper
  const addToast = (
    text: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    const id =
      "toast_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Course handlers (Supabase-backed)
  const addCourse = async (courseData: Omit<Course, "id">) => {
    const { data, error } = await supabase
      .from("courses")
      .insert(courseToRow(courseData))
      .select()
      .single();

    if (error || !data) {
      console.error("addCourse failed:", error);
      addToast(error?.message ?? "Failed to create course.", "error");
      return;
    }
    const newCourse = courseFromRow(data);
    setCourses((prev) => [newCourse, ...prev]);
    addToast(`Course "${newCourse.title}" created successfully.`);
  };

  const updateCourse = async (id: string, updated: Partial<Course>) => {
    const { data, error } = await supabase
      .from("courses")
      .update(courseToRow(updated))
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("updateCourse failed:", error);
      addToast(error?.message ?? "Failed to update course.", "error");
      return;
    }
    const savedCourse = courseFromRow(data);
    setCourses((prev) => prev.map((c) => (c.id === id ? savedCourse : c)));
    addToast("Course details updated successfully.");
  };

  const deleteCourse = async (id: string) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      console.error("deleteCourse failed:", error);
      addToast(error.message, "error");
      return;
    }
    setCourses((prev) => prev.filter((c) => c.id !== id));
    addToast("Course removed successfully.", "info");
  };

  const toggleCourseStatus = async (id: string) => {
    const current = courses.find((c) => c.id === id);
    if (!current) return;
    const nextStatus = current.status === "active" ? "inactive" : "active";

    const { data, error } = await supabase
      .from("courses")
      .update({ status: nextStatus })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("toggleCourseStatus failed:", error);
      addToast(error?.message ?? "Failed to update course status.", "error");
      return;
    }
    const savedCourse = courseFromRow(data);
    setCourses((prev) => prev.map((c) => (c.id === id ? savedCourse : c)));
    addToast("Course status updated.");
  };

  // Achievers handlers (Supabase-backed)
  const addAchiever = async (achieverData: Omit<StudentResult, "id">) => {
    const { data, error } = await supabase
      .from("achievers")
      .insert(achieverToRow({ ...achieverData, status: "active" }))
      .select()
      .single();

    if (error || !data) {
      console.error("addAchiever failed:", error);
      addToast(error?.message ?? "Failed to add achiever.", "error");
      return;
    }
    const newAchiever = achieverFromRow(data);
    setAchievers((prev) => [newAchiever, ...prev]);
    addToast(`Student achiever "${newAchiever.name}" added successfully.`);
  };

  const updateAchiever = async (
    id: string,
    updated: Partial<StudentResult>,
  ) => {
    const { data, error } = await supabase
      .from("achievers")
      .update(achieverToRow(updated))
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("updateAchiever failed:", error);
      addToast(error?.message ?? "Failed to update achiever.", "error");
      return;
    }
    const savedAchiever = achieverFromRow(data);
    setAchievers((prev) => prev.map((a) => (a.id === id ? savedAchiever : a)));
    addToast("Student achiever record updated.");
  };

  const deleteAchiever = async (id: string) => {
    const { error } = await supabase.from("achievers").delete().eq("id", id);
    if (error) {
      console.error("deleteAchiever failed:", error);
      addToast(error.message, "error");
      return;
    }
    setAchievers((prev) => prev.filter((a) => a.id !== id));
    addToast("Student record deleted.", "info");
  };

  const toggleAchieverFeatured = async (id: string) => {
    const current = achievers.find((a) => a.id === id);
    if (!current) return;

    const { data, error } = await supabase
      .from("achievers")
      .update({ featured: !current.featured })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("toggleAchieverFeatured failed:", error);
      addToast(error?.message ?? "Failed to update featured status.", "error");
      return;
    }
    const savedAchiever = achieverFromRow(data);
    setAchievers((prev) => prev.map((a) => (a.id === id ? savedAchiever : a)));
    addToast("Achiever featured status changed.");
  };

  // Enquiry handlers (Supabase-backed)
  const submitEnquiry = async (
    data: Omit<AdmissionEnquiryData, "id" | "status" | "createdAt">,
  ): Promise<boolean> => {
    const { data: row, error } = await supabase
      .from("enquiries")
      .insert(enquiryToInsertRow(data))
      .select()
      .single();

    if (error || !row) {
      console.error("submitEnquiry failed:", error);
      addToast("Failed to submit enquiry. Please call us directly.", "error");
      return false;
    }
    setEnquiries((prev) => [enquiryFromRow(row), ...prev]);
    addToast(
      "Your admission enquiry has been submitted successfully! Our counselor will call you within 24 hours.",
      "success",
    );
    return true;
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.error("updateEnquiryStatus failed:", error);
      addToast(error.message, "error");
      return;
    }
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
    addToast(`Enquiry marked as ${status}.`);
  };

  const updateEnquiryNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from("enquiries")
      .update({ admin_notes: notes })
      .eq("id", id);
    if (error) {
      console.error("updateEnquiryNotes failed:", error);
      addToast(error.message, "error");
      return;
    }
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, adminNotes: notes } : e)),
    );
    addToast("Internal counselor notes saved.");
  };

  const deleteEnquiry = async (id: string) => {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) {
      console.error("deleteEnquiry failed:", error);
      addToast(error.message, "error");
      return;
    }
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    addToast("Enquiry record deleted.", "info");
  };

  // Content & Settings handlers (Supabase-backed: single-row jsonb tables)
  const updateHeroContent = async (content: Partial<HeroContent>) => {
    const next = { ...heroContent, ...content };
    const { error } = await supabase
      .from("hero_content")
      .upsert({ id: 1, data: next });
    if (error) {
      console.error("updateHeroContent failed:", error);
      addToast(error.message, "error");
      return;
    }
    setHeroContent(next);
    addToast("Homepage hero content updated successfully.");
  };

  const updateAboutContent = async (content: Partial<AboutContent>) => {
    const next = { ...aboutContent, ...content };
    const { error } = await supabase
      .from("about_content")
      .upsert({ id: 1, data: next });
    if (error) {
      console.error("updateAboutContent failed:", error);
      addToast(error.message, "error");
      return;
    }
    setAboutContent(next);
    addToast("About page content updated.");
  };

  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    const next = { ...siteSettings, ...settings };
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, data: next });
    if (error) {
      console.error("updateSiteSettings failed:", error);
      addToast(error.message, "error");
      return;
    }
    setSiteSettings(next);
    addToast("Academy settings and contact details saved.");
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

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = (): AcademyContextType => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error("useAcademy must be used within an AcademyProvider");
  }
  return context;
};
