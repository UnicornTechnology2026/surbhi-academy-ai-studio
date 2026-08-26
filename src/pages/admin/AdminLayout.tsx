import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Users,
  Image as ImageIcon,
  MessageSquareQuote,
  Bell,
  Inbox,
  HelpCircle,
  FileEdit,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Shield,
  Sparkles,
  User
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useAcademy } from '../../context/AcademyContext';

export const AdminLayout: React.FC = () => {
  const { adminUser, logout } = useAdminAuth();
  const { enquiries, notices } = useAcademy();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries & CRM', path: '/admin/enquiries', icon: Inbox, badge: newEnquiriesCount > 0 ? newEnquiriesCount : undefined },
    { name: 'Course Programs', path: '/admin/courses', icon: BookOpen },
    { name: 'Achievers & Ranks', path: '/admin/achievers', icon: Trophy },
    { name: 'Academy Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between z-30">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-serif font-bold text-lg">
            S
          </div>
          <span className="font-bold text-sm text-white uppercase tracking-wider">
            Surabhi Admin
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-400 hover:text-white"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-serif font-extrabold text-2xl shadow-md">
                S
              </div>
              <div>
                <span className="font-bold text-sm text-white uppercase tracking-wider block leading-none">
                  SURABHI <span className="text-amber-400 font-serif lowercase italic">admin</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 block">
                  CMS Control Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Core Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
          <div className="flex items-center gap-3">
            {/* <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-500/40 bg-slate-800 shrink-0">
              {adminUser?.avatar ? (
                <img src={adminUser.avatar} alt={adminUser.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-slate-400 m-2" />
              )}
            </div> */}
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-bold text-white truncate">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-amber-400 font-medium truncate">{adminUser?.role || 'Super Admin'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/"
              className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-amber-400" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-2.5 py-2 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-red-900/50"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content View Area */}
      <main className="flex-1 min-w-0 bg-slate-950 flex flex-col">
        {/* Top bar for desktop */}
        <header className="hidden md:flex h-16 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400 font-medium">
              Surabhi Academic Management System & CMS
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Public Website</span>
            </Link>

            <div className="h-4 w-px bg-slate-800" />

            <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
