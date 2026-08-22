import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  ZoomIn, 
  Calendar, 
  Image as ImageIcon, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { LightboxModal } from '../components/LightboxModal';
import { GalleryItem } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';

interface GalleryPageProps {
  onOpenEnquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  const { gallery } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Photos' },
    { key: 'classroom', label: 'Smart Classrooms' },
    { key: 'felicitation', label: 'Toppers Felicitation' },
    { key: 'events', label: 'Seminars & Workshops' },
    { key: 'campus', label: 'Campus & Library' }
  ];

  const filteredItems = gallery.filter((item) => {
    if (item.status !== 'active') return false;
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveItem(item);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-widest font-bold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Life & Achievements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F172A] leading-tight">
            Moments of Learning, Focus & Celebrations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a visual tour inside our interactive smart classrooms, student felicitation galas, career counselling seminars, and dedicated study libraries.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Photo Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-[#0F172A]/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.categoryLabel || item.category}
                </span>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                {item.date && (
                  <div className="text-[10px] text-amber-400/80 pt-1 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Campus Tour Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Visit In Person
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#0F172A]">
              Want a Personal Campus Walkthrough?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Parents and students are welcome to visit our main branch during counselor hours (08:00 AM – 08:30 PM) to inspect smart classrooms and review course literature.
            </p>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="shrink-0 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Schedule Campus Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        onOpenEnquiry={() => onOpenEnquiry()}
        title="Be Part of Our Next Success Story"
        subtitle="Book a complimentary 2-day trial class and experience the vibrant learning atmosphere firsthand."
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentItem={activeItem}
        items={filteredItems}
        onNavigate={(newItem) => setActiveItem(newItem)}
      />
    </div>
  );
};
