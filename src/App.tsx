import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { AcademyProvider } from "./context/AcademyContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// Navigation & Layout
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { ScrollToTop } from "./components/ScrollToTop";
import { ToastContainer } from "./components/ToastContainer";

// Modals
import { EnquiryModal } from "./components/EnquiryModal";
import { PrivacyModal } from "./components/PrivacyModal";
import { TermsModal } from "./components/TermsModal";

// Public Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { ResultsPage } from "./pages/ResultsPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin CMS Pages & Auth
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminCoursesPage } from "./pages/admin/AdminCoursesPage";
import { AdminAchieversPage } from "./pages/admin/AdminAchieversPage";
import { AdminEnquiriesPage } from "./pages/admin/AdminEnquiriesPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

// Inner shell to conditionally render public layout vs admin layout
const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Modal States
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCourseSlug, setEnquiryCourseSlug] = useState<
    string | undefined
  >(undefined);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleOpenEnquiry = (courseSlug?: string) => {
    setEnquiryCourseSlug(courseSlug);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
    setEnquiryCourseSlug(undefined);
  };

  const routeContent = (
    <Routes>
      {/* Public Academic Website Routes */}
      <Route
        path="/"
        element={<HomePage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route
        path="/about"
        element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route
        path="/courses"
        element={<CoursesPage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route
        path="/courses/:slug"
        element={<CourseDetailPage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route
        path="/results"
        element={<ResultsPage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route
        path="/admissions"
        element={<AdmissionsPage onOpenEnquiry={handleOpenEnquiry} />}
      />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin CMS Dashboard */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="achievers" element={<AdminAchieversPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

  return (
    <div
      className={`min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 ${
        isAdminRoute ? "admin-shell" : ""
      }`}
    >
      <ScrollToTop />
      <ToastContainer />

      {/* Public Navbar (Hidden on Admin portal) */}
      {!isAdminRoute && <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />}

      {/* Main Content Viewport */}
      <div className="flex-1">
        {isAdminRoute ? (
          routeContent
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="min-h-full"
            >
              {routeContent}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Public Footer (Hidden on Admin portal) */}
      {!isAdminRoute && (
        <Footer
          onOpenEnquiry={() => handleOpenEnquiry()}
          onOpenPrivacy={() => setPrivacyOpen(true)}
          onOpenTerms={() => setTermsOpen(true)}
        />
      )}

      {/* Global Modals */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        initialCourseSlug={enquiryCourseSlug}
        onClose={handleCloseEnquiry}
      />

      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AdminAuthProvider>
    </AcademyProvider>
  );
}
