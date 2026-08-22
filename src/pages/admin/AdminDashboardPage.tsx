import React from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  BookOpen,
  Trophy,
  Users,
  Bell,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { adminUser } = useAdminAuth();
  const {
    enquiries,
    courses,
    achievers,
    faculty,
    notices,
    testimonials,
    siteSettings
  } = useAcademy();

  const newEnquiries = enquiries.filter((e) => e.status === 'new');
  const activeCourses = courses.filter((c) => c.status === 'active');
  const activeFaculty = faculty.filter((f) => f.status === 'active');
  const publishedNotices = notices.filter((n) => n.status === 'published');

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0F172A] border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surbhi Management Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome back, {adminUser?.name || 'Administrator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            You have <strong className="text-amber-400 font-bold">{newEnquiries.length} new student admission enquiries</strong> requiring counselor follow-up today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            to="/admin/enquiries"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>Process Enquiries ({newEnquiries.length})</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition-all flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span>Live Site</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          to="/admin/enquiries"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            {newEnquiries.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {newEnquiries.length} New
              </span>
            )}
          </div>
          <div className="text-2xl font-serif font-extrabold text-white group-hover:text-amber-400 transition-colors">
            {enquiries.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Total Enquiries</div>
        </Link>

        <Link
          to="/admin/courses"
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-5 rounded-2xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 font-semibold">{activeCourses.length} Active</span>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white group-hover:text-blue-400 transition-colors">
            {courses.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Academic Courses</div>
        </Link>

        <Link
          to="/admin/achievers"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-xs text-amber-400 font-semibold">Rank 1 Record</span>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white group-hover:text-amber-400 transition-colors">
            {achievers.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Hall of Fame Rankers</div>
        </Link>

        <Link
          to="/admin/faculty"
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 font-semibold">{activeFaculty.length} Active</span>
          </div>
          <div className="text-2xl font-serif font-extrabold text-white group-hover:text-emerald-400 transition-colors">
            {faculty.length}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Faculty Mentors</div>
        </Link>
      </div>

      {/* 3. Recent Admission Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Enquiries Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Recent Admission Enquiries
              </h2>
              <p className="text-xs text-slate-400">
                Latest submissions from website visitors, course detail pages, and trial bookings
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All ({enquiries.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Student & Parent</th>
                  <th className="p-3">Class / Program</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.slice(0, 5).map((enq) => {
                  let statusBadge = 'bg-blue-900/50 text-blue-300 border-blue-800';
                  if (enq.status === 'new') statusBadge = 'bg-red-900/50 text-red-300 border-red-800';
                  if (enq.status === 'contacted') statusBadge = 'bg-amber-900/50 text-amber-300 border-amber-800';
                  if (enq.status === 'converted') statusBadge = 'bg-emerald-900/50 text-emerald-300 border-emerald-800';

                  return (
                    <tr key={enq.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{enq.studentName}</div>
                        <div className="text-[11px] text-slate-400">Parent: {enq.parentName || 'N/A'}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-200">{enq.studentClass}</span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{enq.courseInterested}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-slate-300 font-mono">{enq.mobileNumber}</div>
                        <div className="text-[10px] text-slate-400">{enq.emailAddress || 'No Email'}</div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to="/admin/enquiries"
                          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs font-bold"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Administration Actions & Notice summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Quick Management Shortcuts
            </h3>

            <div className="space-y-2">
              <Link
                to="/admin/courses"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Add New Course / Batch</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/achievers"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Add Board Topper / Ranker</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/notices"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Post Urgent Notice</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Update Phone / Address</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Active Notices & Circulars */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Live Notice Board</span>
              </h3>
              <Link to="/admin/notices" className="text-xs text-amber-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{notice.publishDate}</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{notice.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">{notice.summary}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
