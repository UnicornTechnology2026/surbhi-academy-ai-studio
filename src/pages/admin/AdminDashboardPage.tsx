import React from "react";
import { Link } from "react-router-dom";
import {
  Inbox,
  BookOpen,
  Trophy,
  Users,
  Bell,
  Sparkles,
  ArrowRight,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  ExternalLink,
} from "lucide-react";
import { useAcademy } from "../../context/AcademyContext";
import { useAdminAuth } from "../../context/AdminAuthContext";

export const AdminDashboardPage: React.FC = () => {
  const { adminUser } = useAdminAuth();
  const {
    enquiries,
    courses,
    achievers,
    faculty,
    notices,
    testimonials,
    siteSettings,
  } = useAcademy();

  const newEnquiries = enquiries.filter((e) => e.status === "new");

  const statCards = [
    {
      title: "Total Enquiries",
      value: enquiries.length,
      subtitle: `${newEnquiries.length} new leads pending`,
      icon: Inbox,
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      link: "/admin/enquiries",
      badge: newEnquiries.length > 0 ? `${newEnquiries.length} New` : null,
    },
    {
      title: "Course Batches",
      value: courses.length,
      subtitle: "State Board, CBSE, Foundation",
      icon: BookOpen,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      link: "/admin/courses",
    },
    {
      title: "Hall of Fame",
      value: achievers.length,
      subtitle: "Board & Competitive Rankers",
      icon: Trophy,
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      link: "/admin/achievers",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0F172A] border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surabhi Management Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome <span className="text-amber-300">Admin</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Managing{" "}
            <strong className="text-white font-bold">
              {siteSettings.name}
            </strong>
            . You have{" "}
            <strong className="text-amber-400 font-bold">
              {newEnquiries.length} new student admission enquiries
            </strong>{" "}
            requiring follow-up.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link
            to="/admin/enquiries"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>Review Enquiries ({newEnquiries.length})</span>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl transition-all group shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border ${card.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {card.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {card.value}
                </div>
                <div className="text-xs text-slate-300 font-semibold mt-0.5">
                  {card.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {card.subtitle}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Recent Admission Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recent Enquiries Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Recent Admission Enquiries
              </h2>
              <p className="text-xs text-slate-400">
                Latest submissions from website visitors and enrollment forms
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
                  <th className="p-3">Class / Interest</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.slice(0, 5).map((enq) => {
                  let statusBadge =
                    "bg-blue-900/50 text-blue-300 border-blue-800";
                  if (enq.status === "new")
                    statusBadge = "bg-red-900/50 text-red-300 border-red-800";
                  if (enq.status === "contacted")
                    statusBadge =
                      "bg-amber-900/50 text-amber-300 border-amber-800";
                  if (enq.status === "converted" || enq.status === "enrolled")
                    statusBadge =
                      "bg-emerald-900/50 text-emerald-300 border-emerald-800";
                  if (enq.status === "closed")
                    statusBadge =
                      "bg-slate-800 text-slate-400 border-slate-700";

                  return (
                    <tr
                      key={enq.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-3">
                        <div className="font-bold text-white">
                          {enq.studentName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Parent: {enq.parentName || "N/A"}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-200">
                          {enq.studentClass}
                        </span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {enq.courseInterested || "General"}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-slate-300 font-mono">
                          {enq.mobileNumber}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {enq.emailAddress || "No Email"}
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge}`}
                        >
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

                {enquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-slate-500 text-xs"
                    >
                      No enquiries received yet. Form submissions will appear
                      here in real-time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Administration Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Content & Batch Managers
            </h3>

            <div className="space-y-2">
              <Link
                to="/admin/courses"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Course Programs & Batches</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/achievers"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Achievers & Wall of Fame</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span>Academy Profile & Branding</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
