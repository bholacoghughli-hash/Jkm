import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  X,
  Maximize2,
  Shapes,
  FlaskConical,
  School,
  Trophy,
  BookOpen,
  Users,
  Monitor,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleGalleryItems } from '../../data/sampleData';
import { GalleryItem } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  Shapes,
  FlaskConical,
  School,
  Trophy,
  Sparkles,
  BookOpen,
  Users,
  Monitor,
};

export const GallerySection: React.FC = () => {
  const { t } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'campus' | 'montessori' | 'science' | 'sports' | 'cultural'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const tabs = [
    { id: 'all', labelKey: 'galCatAll' },
    { id: 'campus', labelKey: 'galCatCampus' },
    { id: 'montessori', labelKey: 'galCatMontessori' },
    { id: 'science', labelKey: 'galCatScience' },
    { id: 'sports', labelKey: 'galCatSports' },
    { id: 'cultural', labelKey: 'galCatCultural' },
  ];

  const filteredItems = sampleGalleryItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-900 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
            <ImageIcon className="h-3.5 w-3.5 text-purple-600" />
            <span>{t('galBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('galTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('galSubtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow dark:bg-blue-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const Icon = iconMap[item.icon] || ImageIcon;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all transform hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Visual Placeholder Graphic Header */}
                <div
                  className={`relative h-44 w-full bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white overflow-hidden`}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className="rounded-full bg-black/30 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs group-hover:scale-110 transition-transform">
                      <Maximize2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>

                  {/* Centered Large Theme Icon */}
                  <div className="flex items-center justify-center my-auto z-10">
                    <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/30 pointer-events-none" />
                </div>

                {/* Card Text Info */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-blue-950 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(item.titleKey)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                      {t(item.captionKey)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Ghughli Campus</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-300">Click to enlarge</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Enlarged View Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Graphic Header */}
            <div
              className={`relative h-64 sm:h-72 w-full bg-gradient-to-br ${activeItem.gradient} p-6 flex flex-col justify-between text-white`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="rounded-full bg-black/40 backdrop-blur-xs px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {activeItem.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                  aria-label="Close photo view"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="my-auto flex flex-col items-center justify-center z-10 space-y-3">
                {(() => {
                  const ModalIcon = iconMap[activeItem.icon] || ImageIcon;
                  return (
                    <div className="p-4 rounded-3xl bg-white/20 backdrop-blur-md ring-2 ring-white/40 shadow-xl">
                      <ModalIcon className="h-16 w-16 text-white" />
                    </div>
                  );
                })()}
                <span className="text-xs font-bold tracking-wider uppercase text-amber-300 drop-shadow">
                  JK Montessori School • Campus Life
                </span>
              </div>
            </div>

            {/* Modal Info */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                  {t(activeItem.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {t(activeItem.captionKey)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Subhash Chowk, Block Ghughli, Maharajganj, UP</span>
                <span className="font-semibold">{t('developedBy')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
