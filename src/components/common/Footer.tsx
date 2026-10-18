import React from 'react';
import { MapPin, User, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setIsSystemInfoOpen } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-6 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: School Info & Principal */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-900 text-[10px] font-black text-white">
              JK
            </span>
            <span>{t('schoolName')}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>{t('schoolAddress')}</span>
          </div>
        </div>

        {/* Right: Principal & Creator Credit */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span>{t('principalTitle')}: <strong>{t('principalName')}</strong></span>
          </div>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>

          {/* Special user instruction: "Always Write on app developed by Bhaskar or created by Bhaskar" */}
          <button
            type="button"
            onClick={() => setIsSystemInfoOpen(true)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 text-[11px] font-bold text-amber-900 shadow-sm transition hover:border-amber-400 hover:shadow dark:border-amber-500/40 dark:from-amber-950/40 dark:to-orange-950/40 dark:text-amber-300"
          >
            <Sparkles className="h-3 w-3 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>{t('creatorCredit')}</span>
            <span className="text-[10px] opacity-75 font-normal">| {t('developedBy')}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>{t('footerCopyright')} {t('footerAllRights')}</p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t('systemStatus')}
          </span>
          <span>•</span>
          <span>Nursery to Class 12</span>
        </div>
      </div>
    </footer>
  );
};
