import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Lock,
  User,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { useAcademy } from "../context/AcademyContext";
import { useAdminAuth } from "../context/AdminAuthContext";

interface NavbarProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

interface NavLinkItem {
  name: string;
  path: string;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { siteSettings } = useAcademy();
  const { isAuthenticated, adminUser } = useAdminAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks: NavLinkItem[] = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Results", path: "/results" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all"
    >
      {/* Top Announcement Bar */}
      <div className="bg-[#090E1A] text-slate-300 text-[11px] py-2 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        {/* Left marquee / notification */}
        <div className="flex items-center gap-2 overflow-hidden text-xs"> </div>

        {/* Right Quick Links */}
        <div className="flex items-center gap-4 shrink-0 text-xs">
          <a
            href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, "")}`}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-white tracking-wide"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Helpline:</span>
            <span>{siteSettings.primaryPhone}</span>
          </a>

          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-[10px] bg-white/10 px-2 py-0.5 rounded-md"
            >
              <User className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-23.25 h-17.5 bg-[#123B2A] flex items-center justify-center rounded-xl shadow-md group-hover:bg-slate-800 transition-colors">
            <img
              src="../../assets/logo.png"
              alt=""
              className="w-15 h-17 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#0F172A] uppercase leading-none flex items-center gap-1.5">
              SURABHI{" "}
              <span className="font-serif italic font-normal text-amber-700 capitalize">
                Academy
              </span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold mt-1">
              Teaching Beyond Examination
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all relative ${
                  isActive
                    ? "text-amber-700 bg-amber-50/90 shadow-xs"
                    : "text-slate-700 hover:text-[#0F172A] hover:bg-slate-100/70"
                }`
              }
            >
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3"></div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -8 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-800 font-bold border border-amber-200"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Free 2-Day Trial Seat</span>
            </button>

            <a
              href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, "")}`}
              className="w-full bg-[#090E1A] text-white font-semibold text-xs uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline: {siteSettings.primaryPhone}</span>
            </a>

            <div className="pt-2 text-center">
              {isAuthenticated ? (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-amber-700 inline-flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Open Admin Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Administrator Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
