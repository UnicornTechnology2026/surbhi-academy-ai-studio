import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Sparkles, ChevronRight, ChevronDown, GraduationCap, Bell, Lock, User } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { useAdminAuth } from '../context/AdminAuthContext';

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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { siteSettings, notices } = useAcademy();
  const { isAuthenticated, adminUser } = useAdminAuth();

  const urgentNoticesCount = notices.filter(n => n.status === 'published' && n.isNew).length;

  // Close the "More" dropdown on outside click, Escape key, or route change
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setMoreMenuOpen(false);
  }, [location.pathname]);

  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Results', path: '/results' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Top micro bar with contact & announcement */}
      <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 tracking-wider uppercase hidden md:flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4"></div>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, '')}`}
            className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold text-white tracking-wide"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Helpline: {siteSettings.primaryPhone}</span>
          </a>
          <span className="text-slate-600">|</span>

          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-[10px] bg-white/10 px-2.5 py-0.5 rounded-md"
            >
              <User className="w-3 h-3" />
              <span>Admin Panel ({adminUser?.name?.split(' ')[0]})</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-semibold text-[10px]"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0F172A] flex items-center justify-center rounded-xl shadow-md group-hover:bg-slate-800 transition-colors">
            <span className="text-amber-400 font-serif font-bold text-2xl tracking-tighter">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#0F172A] uppercase leading-none">
              SURBHI <span className="font-serif italic font-normal text-amber-700 capitalize">Academy</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-semibold mt-0.5">
              Teaching Beyond Examination
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.slice(0, 8).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-semibold uppercase tracking-wider px-2.5 py-2 rounded-lg transition-colors relative ${isActive
                  ? 'text-amber-700 bg-amber-50/80 font-bold'
                  : 'text-slate-700 hover:text-[#0F172A] hover:bg-slate-50'
                }`
              }
            >
              <span className="flex items-center gap-1">
                {link.name}
                {link.badge && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center -top-1 -right-1">
                    {link.badge}
                  </span>
                )}
              </span>
            </NavLink>
          ))}

          {/* More Dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setMoreMenuOpen((prev) => !prev)}
              aria-expanded={moreMenuOpen}
              aria-haspopup="true"
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              <span>More</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fadeIn">
                <Link
                  to="/testimonials"
                  onClick={() => setMoreMenuOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  ⭐ Testimonials
                </Link>
                <Link
                  to="/faqs"
                  onClick={() => setMoreMenuOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  ❓ FAQs
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMoreMenuOpen(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                >
                  📍 Contact & Map
                </Link>
                <div className="border-t border-slate-100 my-1"></div>
                {isAuthenticated ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-bold text-amber-800 bg-amber-50/50"
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50"
                  >
                    🔒 Admin Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-enquire-btn"
            onClick={() => onOpenEnquiry()}
            className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enquire Now</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenEnquiry()}
            className="sm:hidden bg-[#0F172A] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
          >
            Enquire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-slideDown max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${isActive
                    ? 'bg-amber-50 text-amber-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge ? (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge} New
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free 2-Day Trial Class</span>
            </button>

            <a
              href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, '')}`}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-600" />
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
                  <span>Administrator / Staff Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};