import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface FAQPageProps {
  onOpenEnquiry: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenEnquiry }) => {
  const { faqs, siteSettings } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'Admissions', label: 'Admissions & Trial' },
    { key: 'Academics', label: 'Curriculum & Doubts' },
    { key: 'Fees', label: 'Fee Structure' },
    { key: 'Batches', label: 'Timings & Batches' }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (faq.status !== 'active') return false;
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We’re Here to Help</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Find immediate answers regarding batch schedules, 1-on-1 doubt clearing, trial classes, syllabus completion timelines, and fee payment plans.
          </p>
        </div>
      </section>

      {/* 3. Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-slate-700">No questions found</h3>
            <p className="text-xs text-slate-500">Try searching for a different keyword.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-[#0F172A]">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-100 text-amber-900' : ''
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Still Have Questions Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-white">
              Still have a specific question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our senior academic counselors directly for personalized advice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, '')}`}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Ready to Experience the Surbhi Classroom?"
        subtitle="Book a complimentary 2-day trial class for any course of your choice."
      />
    </div>
  );
};
