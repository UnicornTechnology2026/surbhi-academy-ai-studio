import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  Target,
  Heart,
  CheckCircle2,
  BookOpen,
  Users,
  GraduationCap,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const { aboutContent, siteSettings } = useAcademy();

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Journey & Academic Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Nurturing Curiosity, Building Strong Foundations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {aboutContent.tagline}
          </p>
        </div>
      </section>

      {/* 2. Academy Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Image grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                alt="Classroom at Surbhi Academy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Since 2011
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  15+ Years of Proven Excellence
                </h3>
              </div>
            </div>
            {/* Small stats pill */}
            <div className="absolute -bottom-6 -right-6 bg-[#0F172A] text-white p-5 rounded-2xl shadow-xl border border-slate-800 hidden sm:block">
              <div className="text-3xl font-serif font-bold text-amber-400">12,500+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Successful Alumni</div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              About Surbhi Academy
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">
              {aboutContent.storyTitle}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {aboutContent.storyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Small Batches (25-30 Max)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Rote Learning</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Daily 1-on-1 Doubts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Director / Founder Message */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center lg:text-left">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-amber-500/20 shadow-md mx-auto lg:mx-0">
                  <img
                    src={aboutContent.founderMessage.photo}
                    alt={aboutContent.founderMessage.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mt-4">
                  {aboutContent.founderMessage.name}
                </h3>
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
                  {aboutContent.founderMessage.role}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Ph.D. Applied Mathematics • 18+ Yrs Experience
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-10">
                <div className="text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Director's Message to Students & Parents</span>
                </div>
                <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed font-serif">
                  "{aboutContent.founderMessage.message}"
                </p>
                <div className="pt-2 text-xs text-slate-500 font-semibold tracking-wider uppercase">
                  — {aboutContent.founderMessage.signatureText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Values"
          title="The Pillars That Guide Our Teaching"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {aboutContent.coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F172A] flex items-center justify-center font-serif font-bold text-sm">
                0{idx + 1}
              </div>
              <h4 className="text-base font-serif font-bold text-[#0F172A]">
                {val.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Infrastructure & Campus Highlights */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Campus Environment"
            title="Modern Infrastructure Built for Focus"
            subtitle="Explore our air-conditioned smart lecture rooms, reference library, and peaceful student study zones."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                  alt="Smart Classrooms"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-base font-serif font-bold text-[#0F172A]">
                  Smart Interactive Classrooms
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipped with 4K digital smart interactive panels for visual derivations, 3D biological models, and audio clarity.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
                  alt="Reference Library"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-base font-serif font-bold text-[#0F172A]">
                  Dedicated Reference Library
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 2,500 reference titles, NCERT exemplars, past 20-year papers, and quiet individual study carrels.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                  alt="Doubt Clearing Cabins"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-base font-serif font-bold text-[#0F172A]">
                  1-on-1 Doubt Clearing Pods
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Private discussion pods where students sit directly with subject heads to review homework and resolve conceptual hurdles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Experience the Surbhi Difference"
        subtitle="Visit our campus or book a 2-day complimentary classroom pass for your child."
      />
    </div>
  );
};
