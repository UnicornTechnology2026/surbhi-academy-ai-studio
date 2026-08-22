import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CTASection } from '../components/CTASection';
import { GALLERY_DATA } from '../data/gallery';
import { GalleryItem } from '../types';

interface GalleryProps {
  onOpenEnquiry: (courseSlug?: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'classroom', label: 'Smart Classrooms' },
    { id: 'sessions', label: 'Teaching Sessions & Labs' },
    { id: 'activities', label: 'Student Activities' },
    { id: 'achievements', label: 'Achievements & Trophies' },
    { id: 'events', label: 'Workshops & Events' },
    { id: 'ceremonies', label: 'Award Ceremonies' }
  ];

  const filteredGallery = GALLERY_DATA.filter((item) => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightbox) return;
    const currentIndex = filteredGallery.findIndex((i) => i.id === activeLightbox.id);
    const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setActiveLightbox(filteredGallery[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeLightbox) return;
    const currentIndex = filteredGallery.findIndex((i) => i.id === activeLightbox.id);
    const nextIndex = (currentIndex + 1) % filteredGallery.length;
    setActiveLightbox(filteredGallery[nextIndex]);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Campus Life & <br />
            <span className="italic font-normal text-amber-400">Academy Gallery</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our smart classrooms, laboratory demonstrations, felicitation ceremonies, and everyday student life.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F172A] text-amber-400 shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 bg-slate-100 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0F172A]/90 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </div>

                    {/* Title & info on bottom */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      {item.date && (
                        <div className="text-[11px] text-amber-400/90 mt-0.5">
                          {item.date}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t border-slate-100">
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto p-8">
              <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-[#0F172A] mb-1">
                No Photos Found
              </h3>
              <p className="text-slate-500 text-xs mb-4">
                Please select another gallery category.
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-[#0F172A] text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Show All Photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <span className="text-amber-400 text-xs uppercase tracking-widest font-bold">
                  {activeLightbox.categoryLabel}
                </span>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                  {activeLightbox.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 transition-colors shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 transition-colors shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="p-4 bg-slate-900 text-slate-300 text-xs sm:text-sm border-t border-slate-800">
              <p className="leading-relaxed">{activeLightbox.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
