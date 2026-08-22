import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AcademyProvider } from './context/AcademyContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Navigation & Layout
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { ScrollToTop } from './components/ScrollToTop';
import { ToastContainer } from './components/ToastContainer';

// Modals
import { EnquiryModal } from './components/EnquiryModal';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ResultsPage } from './pages/ResultsPage';
import { FacultyPage } from './pages/FacultyPage';
import { GalleryPage } from './pages/GalleryPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages & Auth
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminAchieversPage } from './pages/admin/AdminAchieversPage';
import { AdminFacultyPage } from './pages/admin/AdminFacultyPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminNoticesPage } from './pages/admin/AdminNoticesPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminFAQsPage } from './pages/admin/AdminFAQsPage';
import { AdminCMSPage } from './pages/admin/AdminCMSPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Inner shell to conditionally render public layout vs admin layout
const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Modal States
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCourseSlug, setEnquiryCourseSlug] = useState<string | undefined>(undefined);
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      <ScrollToTop />
      <ToastContainer />

      {/* Public Navbar (Hidden on Admin portal) */}
      {!isAdminRoute && <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />}

      {/* Main Content Viewport */}
      <div className="flex-1">
        <Routes>
          {/* Public Academic Website Routes */}
          <Route path="/" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/courses" element={<CoursesPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/courses/:slug" element={<CourseDetailPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/results" element={<ResultsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/faculty" element={<FacultyPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/gallery" element={<GalleryPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/testimonials" element={<TestimonialsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/admissions" element={<AdmissionsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/faq" element={<FAQPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/faqs" element={<FAQPage onOpenEnquiry={handleOpenEnquiry} />} />
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
              <Route path="faculty" element={<AdminFacultyPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="testimonials" element={<AdminTestimonialsPage />} />
              <Route path="notices" element={<AdminNoticesPage />} />
              <Route path="faqs" element={<AdminFAQsPage />} />
              <Route path="cms" element={<AdminCMSPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* Public Footer (Hidden on Admin portal) */}
      {!isAdminRoute && (
        <Footer
          onOpenEnquiry={() => handleOpenEnquiry()}
          onOpenPrivacy={() => setPrivacyOpen(true)}
          onOpenTerms={() => setTermsOpen(true)}
        />
      )}

      {/* Floating Actions for Public Users */}
      {!isAdminRoute && (
        <>
          <FloatingWhatsApp />
          <StickyMobileCTA onOpenEnquiry={() => handleOpenEnquiry()} />
        </>
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

      <TermsModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
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
