import React, { useState } from 'react';
import {
  FileEdit,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Quote
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const AdminCMSPage: React.FC = () => {
  const { 
    heroContent, 
    updateHeroContent, 
    aboutContent, 
    updateAboutContent 
  } = useAcademy();

  const [heroForm, setHeroForm] = useState({
    eyebrow: heroContent.eyebrow,
    headlineMain: heroContent.headlineMain,
    headlineHighlight: heroContent.headlineHighlight,
    headlineEnd: heroContent.headlineEnd,
    description: heroContent.description,
    badgeText: heroContent.badgeText,
    yearsOfExcellence: heroContent.stats.yearsOfExcellence,
    successfulStudents: heroContent.stats.successfulStudents,
    expertFaculty: heroContent.stats.expertFaculty,
    boardMeritRate: heroContent.stats.boardMeritRate,
    topAchievers: heroContent.stats.topAchievers,
    cityRankHolders: heroContent.stats.cityRankHolders
  });

  const [aboutForm, setAboutForm] = useState({
    tagline: aboutContent.tagline,
    storyTitle: aboutContent.storyTitle,
    storyP1: aboutContent.storyParagraphs[0] || '',
    storyP2: aboutContent.storyParagraphs[1] || '',
    storyP3: aboutContent.storyParagraphs[2] || '',
    founderName: aboutContent.founderMessage.name,
    founderRole: aboutContent.founderMessage.role,
    founderPhoto: aboutContent.founderMessage.photo,
    founderMessage: aboutContent.founderMessage.message,
    vision: aboutContent.vision,
    mission: aboutContent.mission
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateHeroContent({
      eyebrow: heroForm.eyebrow,
      headlineMain: heroForm.headlineMain,
      headlineHighlight: heroForm.headlineHighlight,
      headlineEnd: heroForm.headlineEnd,
      description: heroForm.description,
      badgeText: heroForm.badgeText,
      stats: {
        yearsOfExcellence: Number(heroForm.yearsOfExcellence),
        successfulStudents: Number(heroForm.successfulStudents),
        expertFaculty: Number(heroForm.expertFaculty),
        boardMeritRate: heroForm.boardMeritRate,
        topAchievers: Number(heroForm.topAchievers),
        cityRankHolders: Number(heroForm.cityRankHolders)
      }
    });

    updateAboutContent({
      tagline: aboutForm.tagline,
      storyTitle: aboutForm.storyTitle,
      storyParagraphs: [aboutForm.storyP1, aboutForm.storyP2, aboutForm.storyP3].filter(Boolean),
      founderMessage: {
        ...aboutContent.founderMessage,
        name: aboutForm.founderName,
        role: aboutForm.founderRole,
        photo: aboutForm.founderPhoto,
        message: aboutForm.founderMessage
      },
      vision: aboutForm.vision,
      mission: aboutForm.mission
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
            <FileEdit className="w-4 h-4 text-amber-600" />
            <span>Live Copywriting</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#0F172A] mt-1">
            Website Content & Story CMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify the homepage headlines, institutional story, director's note, stats counters, vision & mission.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Content Saved & Live Instantly!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Homepage Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-[#0F172A]">
              1. Homepage Hero Banner Content
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Top Eyebrow Badge
              </label>
              <input
                type="text"
                value={heroForm.eyebrow}
                onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Headline Start
                </label>
                <input
                  type="text"
                  value={heroForm.headlineMain}
                  onChange={(e) => setHeroForm({ ...heroForm, headlineMain: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Headline Highlight (Italic/Amber)
                </label>
                <input
                  type="text"
                  value={heroForm.headlineHighlight}
                  onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-serif italic text-amber-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Headline End
                </label>
                <input
                  type="text"
                  value={heroForm.headlineEnd}
                  onChange={(e) => setHeroForm({ ...heroForm, headlineEnd: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hero Description Text
              </label>
              <textarea
                rows={3}
                value={heroForm.description}
                onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Live Counters & Stats */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-[#0F172A]">
              2. Trust Metrics & Statistics Counters
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Years Exp
              </label>
              <input
                type="number"
                value={heroForm.yearsOfExcellence}
                onChange={(e) => setHeroForm({ ...heroForm, yearsOfExcellence: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Students
              </label>
              <input
                type="number"
                value={heroForm.successfulStudents}
                onChange={(e) => setHeroForm({ ...heroForm, successfulStudents: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Faculty
              </label>
              <input
                type="number"
                value={heroForm.expertFaculty}
                onChange={(e) => setHeroForm({ ...heroForm, expertFaculty: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Merit Rate
              </label>
              <input
                type="text"
                value={heroForm.boardMeritRate}
                onChange={(e) => setHeroForm({ ...heroForm, boardMeritRate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Top Rankers
              </label>
              <input
                type="number"
                value={heroForm.topAchievers}
                onChange={(e) => setHeroForm({ ...heroForm, topAchievers: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                City Ranks
              </label>
              <input
                type="number"
                value={heroForm.cityRankHolders}
                onChange={(e) => setHeroForm({ ...heroForm, cityRankHolders: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>
        </div>

        {/* About Us & Story */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-[#0F172A]">
              3. Institutional Story & Philosophy
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Story Title / Heading
              </label>
              <input
                type="text"
                value={aboutForm.storyTitle}
                onChange={(e) => setAboutForm({ ...aboutForm, storyTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Story Paragraph 1 (Founding & Background)
              </label>
              <textarea
                rows={3}
                value={aboutForm.storyP1}
                onChange={(e) => setAboutForm({ ...aboutForm, storyP1: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Story Paragraph 2 (Growth & Approach)
              </label>
              <textarea
                rows={3}
                value={aboutForm.storyP2}
                onChange={(e) => setAboutForm({ ...aboutForm, storyP2: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Founder & Director's Message */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Quote className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-[#0F172A]">
              4. Founder & Academic Director's Desk
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Director Name
              </label>
              <input
                type="text"
                value={aboutForm.founderName}
                onChange={(e) => setAboutForm({ ...aboutForm, founderName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Director Role / Title
              </label>
              <input
                type="text"
                value={aboutForm.founderRole}
                onChange={(e) => setAboutForm({ ...aboutForm, founderRole: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Director Photo URL
            </label>
            <input
              type="url"
              value={aboutForm.founderPhoto}
              onChange={(e) => setAboutForm({ ...aboutForm, founderPhoto: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Director's Personal Message to Students & Parents
            </label>
            <textarea
              rows={4}
              value={aboutForm.founderMessage}
              onChange={(e) => setAboutForm({ ...aboutForm, founderMessage: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Layers className="w-4 h-4 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-[#0F172A]">
              5. Vision & Mission Statements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Institutional Vision
              </label>
              <textarea
                rows={4}
                value={aboutForm.vision}
                onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Institutional Mission
              </label>
              <textarea
                rows={4}
                value={aboutForm.mission}
                onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-6 z-20 bg-[#0F172A] text-white p-4 rounded-2xl shadow-xl flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
            Changes will immediately update on the public website.
          </span>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer ml-auto"
          >
            <Save className="w-4 h-4" />
            <span>Publish & Save Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
