import React from 'react';
import {
  Monitor,
  FlaskConical,
  BookOpen,
  Trophy,
  Shapes,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleFacilities } from '../../data/sampleData';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  FlaskConical,
  BookOpen,
  Trophy,
  Shapes,
  ShieldCheck,
};

export const FacilitiesSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="facilities" className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>{t('facBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('facTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('facSubtitle')}
          </p>
        </div>

        {/* 6 Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleFacilities.map((fac) => {
            const Icon = iconMap[fac.icon] || Monitor;

            return (
              <div
                key={fac.id}
                className="group rounded-3xl border border-slate-200/90 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60 flex flex-col justify-between hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-amber-300 shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-blue-950 dark:text-white">
                        {t(fac.titleKey)}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Ghughli Campus
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {t(fac.descKey)}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                    {fac.highlightsKey.map((highKey, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">{t(highKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity & Co-Curricular Banner */}
        <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8 dark:border-amber-900/40 dark:bg-amber-950/20 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-block rounded-full bg-amber-200/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-900/60 dark:text-amber-300">
                Holistic Co-Curricular Development
              </span>
              <h4 className="text-lg font-bold text-blue-950 dark:text-white">
                Debates, Cultural Celebrations, Yoga, and Science Exhibitions
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                Education at JK Montessori School goes beyond textbooks. Every student participates in weekly co-curricular assemblies, art & craft, sports leagues, and national festival celebrations.
              </p>
            </div>

            <div className="shrink-0 text-center sm:text-right">
              <div className="text-xs font-bold text-blue-950 dark:text-white">
                Subhash Chowk, Ghughli
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {t('developedBy')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
