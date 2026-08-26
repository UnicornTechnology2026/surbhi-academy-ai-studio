import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  Building,
  Phone,
  Clock,
  Share2,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useAcademy } from "../../context/AcademyContext";
import { ConfirmModal } from "../../components/ConfirmModal";

export const AdminSettingsPage: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetToDefaultData } = useAcademy();

  const [form, setForm] = useState({
    academyName: siteSettings.academyName,
    tagline: siteSettings.tagline,
    primaryPhone: siteSettings.primaryPhone,
    secondaryPhone: siteSettings.secondaryPhone,
    whatsappNumber: siteSettings.whatsappNumber,
    email: siteSettings.email,
    mainCampusAddress: siteSettings.mainCampusAddress,
    secondaryCampusAddress: siteSettings.secondaryCampusAddress,
    workingHoursWeekdays: siteSettings.workingHoursWeekdays,
    workingHoursSunday: siteSettings.workingHoursSunday,
    socialYoutube: siteSettings.socialYoutube,
    socialFacebook: siteSettings.socialFacebook,
    socialInstagram: siteSettings.socialInstagram,
    socialLinkedin: siteSettings.socialLinkedin,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setResetConfirmOpen(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Configuration
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Academy Info & Global Settings
          </h1>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold px-4 py-2 rounded-xl animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* 1. General Academy Identity */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Institution Identity & Branding
              </h3>
              <p className="text-[11px] text-slate-400">
                Official academy branding shown across navbar, footer, and
                inquiry slips.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Official Academy Name
              </label>
              <input
                type="text"
                value={form.academyName}
                onChange={(e) =>
                  setForm({ ...form, academyName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-serif font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Academy Slogan / Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Communication & Contact Helplines */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Admission Contact Helplines & Email
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Primary Helpline Phone
              </label>
              <input
                type="text"
                value={form.primaryPhone}
                onChange={(e) =>
                  setForm({ ...form, primaryPhone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Secondary / Desk Phone
              </label>
              <input
                type="text"
                value={form.secondaryPhone}
                onChange={(e) =>
                  setForm({ ...form, secondaryPhone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                WhatsApp Connect Number
              </label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm({ ...form, whatsappNumber: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 uppercase font-bold mb-1">
              Official Inquiries Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 3. Campus Addresses & Timings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Campus Location & Office Timings
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Main Campus Address
              </label>
              <textarea
                rows={2}
                value={form.mainCampusAddress}
                onChange={(e) =>
                  setForm({ ...form, mainCampusAddress: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Secondary Campus Branch
              </label>
              <textarea
                rows={2}
                value={form.secondaryCampusAddress}
                onChange={(e) =>
                  setForm({ ...form, secondaryCampusAddress: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Counseling Hours (Mon–Sat)
              </label>
              <input
                type="text"
                value={form.workingHoursWeekdays}
                onChange={(e) =>
                  setForm({ ...form, workingHoursWeekdays: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Counseling Hours (Sunday)
              </label>
              <input
                type="text"
                value={form.workingHoursSunday}
                onChange={(e) =>
                  setForm({ ...form, workingHoursSunday: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Social Links */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Social Media Channels
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                YouTube
              </label>
              <input
                type="text"
                value={form.socialYoutube}
                onChange={(e) =>
                  setForm({ ...form, socialYoutube: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Facebook
              </label>
              <input
                type="text"
                value={form.socialFacebook}
                onChange={(e) =>
                  setForm({ ...form, socialFacebook: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={form.socialInstagram}
                onChange={(e) =>
                  setForm({ ...form, socialInstagram: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 uppercase font-bold mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                value={form.socialLinkedin}
                onChange={(e) =>
                  setForm({ ...form, socialLinkedin: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 5. Danger Zone: Reset Data */}
        <div className="bg-red-950/20 border border-red-900/50 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-serif font-bold text-red-300">
              Reset Academy Sandbox Data
            </h3>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Restores all default courses, rankers, and circulars back to initial
            seed data.
          </p>
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Clean Seed Data</span>
          </button>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-6 z-20 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-2xl">
          <span className="text-xs text-slate-400">
            Updated configurations will instantly take effect across the entire
            website.
          </span>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation */}
      <ConfirmModal
        isOpen={resetConfirmOpen}
        title="Reset All Sandbox Data"
        message="This will restore all default courses, rankers. Continue?"
        confirmLabel="Reset Data"
        onConfirm={handleConfirmReset}
        onClose={() => setResetConfirmOpen(false)}
      />
    </div>
  );
};
