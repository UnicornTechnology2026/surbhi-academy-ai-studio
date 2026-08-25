import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
  ArrowRight,
  Quote
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const { aboutContent, siteSettings } = useAcademy();

  const corePillars = [
    {
      title: "No Factory Batches",
      desc: "We strictly cap every batch at 25-30 students so every learner gets noticed and encouraged.",
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      title: "Daily Doubt Desk",
      desc: "Teachers stay back every evening for 1-on-1 problem-solving sessions with students.",
      icon: Target,
      color: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      title: "Concept Over Cramming",
      desc: "We use physical demonstrations, diagrams, and real-life analogies before formulas.",
      icon: BookOpen,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      title: "Honest Parent Updates",
      desc: "Weekly WhatsApp reports and direct teacher calls so there are no year-end surprises.",
      icon: ShieldCheck,
      color: "text-purple-700 bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Teaching with heart, rigor, and genuine care.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Since 1997, Surabhi Coaching Academy has helped over 12,500 students in Nagpur conquer their academic fear and achieve board exam distinction.
          </p>
        </motion.div>
      </section>

      {/* 2. Founder / Director Note (Conversational) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Director Photo */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-amber-400/40 shadow-lg mx-auto lg:mx-0">
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
            </div>

            {/* Conversational Quote */}
            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-10">
              <Quote className="w-10 h-10 text-amber-500/30" />
              <p className="text-base sm:text-xl text-slate-800 leading-relaxed font-serif italic">
                "When I started teaching 29 years ago, I realized children don't dislike Math or Science — they only dislike feeling confused. When you break a concept down step-by-step with warmth and patience, any student can score 90%+. That remains our only promise."
              </p>
              <div className="pt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                — {aboutContent.founderMessage.name}, Founder & Academic Mentor
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. 4 Core Pillars (Talkative Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What Guides Us"
          title="The 4 Rules We Never Compromise On"
          subtitle="Simple values that keep our classrooms friendly, focused, and high-achieving."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0F172A]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Academy Journey in Numbers */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Journey"
            title="29 Years in 4 Numbers"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mt-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">1997</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Year Established</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-600">12,500+</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Students Coached</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A]">100%</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Board Pass Track Record</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-600">25-30</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Strict Batch Limit</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={onOpenEnquiry}
        title="Come meet our teachers in person"
        subtitle="Book a free 2-day trial class for your child and experience the Surabhi difference firsthand."
      />
    </div>
  );
};
