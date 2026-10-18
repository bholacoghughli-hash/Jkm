import React, { useState } from 'react';
import {
  Megaphone,
  Calendar,
  AlertCircle,
  Tag,
  ArrowRight,
  X,
  FileText,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleWebsiteNotices } from '../../data/sampleData';
import { WebsiteNotice } from '../../types';

export const NoticesSection: React.FC = () => {
  const { t } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'admission' | 'sports' | 'events'>('all');
  const [selectedNotice, setSelectedNotice] = useState<WebsiteNotice | null>(null);

  const categories = [
    { id: 'all', labelKey: 'noticeCatAll' },
    { id: 'admission', labelKey: 'noticeCatAdmission' },
    { id: 'academic', labelKey: 'noticeCatAcademic' },
    { id: 'sports', labelKey: 'noticeCatSports' },
    { id: 'events', labelKey: 'noticeCatEvents' },
  ];

  const filteredNotices = sampleWebsiteNotices.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  return (
    <section id="notices" className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300">
            <Megaphone className="h-3.5 w-3.5 text-amber-600" />
            <span>{t('noticesBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('noticesTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('noticesSubtitle')}
          </p>

          {/* Prominent Sample Content Disclaimer */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
            <Info className="h-4 w-4 shrink-0 text-amber-600" />
            <span className="font-medium text-left">{t('noticesDisclaimer')}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-900 text-white shadow dark:bg-blue-600'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Notices Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-3xl border border-slate-200/90 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60 flex flex-col justify-between hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Meta row: Category & Sample Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-900 uppercase dark:bg-blue-950 dark:text-blue-300">
                    {notice.category}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Sample Notice
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{notice.date}</span>
                </div>

                {/* Notice Title */}
                <h3 className="text-base font-bold text-blue-950 dark:text-white leading-snug">
                  {t(notice.titleKey)}
                </h3>

                {/* Notice Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t(notice.summaryKey)}
                </p>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">
                  Ref: JK/{notice.id}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(notice)}
                  className="flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Detail Reader Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-900 text-amber-300">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Circular • {selectedNotice.date}
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    Sample Demonstration Content
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                aria-label="Close notice modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <h3 className="text-lg font-bold text-blue-950 dark:text-white leading-tight">
                {t(selectedNotice.titleKey)}
              </h3>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 dark:bg-slate-800/60 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                {t(selectedNotice.contentKey)}
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-[11px] text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300 space-y-1">
                <span className="font-bold block">JK Montessori School Administrative Office</span>
                <span>Subhash Chowk, Block Ghughli, District Maharajganj, UP</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-3.5 dark:border-slate-800 dark:bg-slate-950/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t('developedBy')}</span>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-800"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
