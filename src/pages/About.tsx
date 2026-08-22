import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Award,
  CheckCircle2,
  GraduationCap,
  Users,
  BookOpen,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';
import { ACADEMY_INFO } from '../data/academyInfo';

interface AboutProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="bg-white">
      {/* Header Banner with Artistic Flair */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-amber-500/15 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Serving Academic Excellence Since {ACADEMY_INFO.foundedYear}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Nurturing Young Minds with <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-400">Knowledge, Discipline & Integrity</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Surbhi Coaching Academy is dedicated to shaping confident, high-achieving scholars through conceptual clarity and compassionate mentorship.
          </p>
        </div>
      </section>

      {/* Story & Background */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5">
                <div className="w-8 h-[1.5px] bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Our Institutional Story
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] leading-tight">
                Built on a Single Promise: <br />
                <span className="italic font-normal text-amber-600">Every Student Matters</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded over 15 years ago with just a handful of passionate educators, <strong>Surbhi Coaching Academy</strong> was created to counter the impersonal, mass-factory coaching models that leave struggling students behind.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe that true academic excellence is not born from rote memorization or fear of failure, but from deeply understanding core principles, developing intellectual curiosity, and receiving individualized encouragement from teachers who care.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Today, with over 12,500+ successful alumni studying at premier engineering colleges, medical institutes, top commerce universities, and board merit lists, our commitment to small batch sizes and dedicated daily doubt clinics remains unshakable.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-serif font-bold text-[#0F172A]">15+</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Years Experience</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-serif font-bold text-[#0F172A]">25-30</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Max Batch Size</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-2xl font-serif font-bold text-amber-600">98.4%</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Board Merit Rate</div>
                </div>
              </div>
            </div>

            {/* Right: Premium Academy Showcase Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                  alt="Surbhi Coaching Academy Campus Life"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-[#0F172A]/80 backdrop-blur-md rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg font-serif">
                      S
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-white">Central Academic Campus</h4>
                      <p className="text-xs text-slate-300">Modern Smartboards • Dedicated Doubt Clinics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our 4-Stage Approach / Timeline */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Surbhi Framework"
            title="Our 4-Stage Pedagogical"
            highlightText="Approach"
            description="How we transform average academic performance into consistent top-tier board exam scores and competitive confidence."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {ACADEMY_INFO.pedagogicalApproach.map((item, idx) => (
              <div
                key={item.step}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl font-serif font-extrabold text-amber-600 mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#0F172A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Phase {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Infrastructure & Environment Highlights */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Campus Environment"
            title="Infrastructure Designed for"
            highlightText="Deep Focus"
            description="Modern, comfortable, and resource-rich spaces crafted to facilitate undisturbed learning."
            dark
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-2xl">
              <div className="text-amber-400 font-serif font-bold text-xl mb-2">
                Smart Audio-Visual Classrooms
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Air-conditioned lecture halls equipped with high-resolution interactive digital screens for 3D scientific visualization and step-by-step math proofs.
              </p>
            </div>

            <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-2xl">
              <div className="text-amber-400 font-serif font-bold text-xl mb-2">
                Dedicated Reference Library
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Quiet self-study zone stocked with 3,000+ reference volumes, previous 15-year solved board compilations, and national Olympiad archives.
              </p>
            </div>

            <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-2xl">
              <div className="text-amber-400 font-serif font-bold text-xl mb-2">
                Daily 1-on-1 Doubt Clinics
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Designated faculty mentorship cabins where students can book personal 15-to-30 minute slots to resolve subject queries with zero hesitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
