import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

export default function PropertyGallery({ images = [], title = 'Property' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-slate-200 rounded-3xl flex items-center justify-center text-slate-400">
        No images available
      </div>
    );
  }

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main Display Image */}
        <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden bg-slate-900 shadow-md group cursor-pointer">
          <img
            src={images[activeIndex]}
            alt={`${title} - view ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md shadow-lg transition active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-900 backdrop-blur-md shadow-lg transition active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Lightbox Trigger & Count */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
              {activeIndex + 1} / {images.length} Photos
            </span>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-md shadow-md transition"
              title="View Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thumbnail Row */}
        {images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-24 sm:w-32 aspect-16/10 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                  activeIndex === idx
                    ? 'border-indigo-600 ring-2 ring-indigo-600/30 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between text-white pb-4">
            <div className="text-sm font-semibold truncate max-w-md">
              {title} • <span className="text-slate-400">Photo {activeIndex + 1} of {images.length}</span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main modal image */}
          <div className="relative flex-1 flex items-center justify-center max-h-[80vh]">
            <img
              src={images[activeIndex]}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                  activeIndex === idx ? 'border-indigo-500 scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
