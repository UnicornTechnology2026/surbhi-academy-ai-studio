import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  onNavigate: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  currentItem,
  items,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !currentItem) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentItem, items]);

  if (!isOpen || !currentItem) return null;

  const currentIndex = items.findIndex((it) => it.id === currentItem.id);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[items.length - 1]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next Navigation */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Modal Card Content */}
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full max-h-[65vh] object-contain"
          />
        </div>

        <div className="p-6 bg-slate-900 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {currentItem.categoryLabel || currentItem.category}
              </span>
              {currentItem.date && (
                <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentItem.date}
                </span>
              )}
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Image {currentIndex + 1} of {items.length}
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-white mb-2">
            {currentItem.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentItem.description}
          </p>
        </div>
      </div>
    </div>
  );
};
