import React from 'react';
import {
  X,
  School,
  User,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code,
  Layers,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { schoolInfo } from '../../data/sampleData';

export const SystemInfoModal: React.FC = () => {
  const { isSystemInfoOpen, setIsSystemInfoOpen, t } = useApp();

  if (!isSystemInfoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white font-black text-sm shadow-md">
              JK
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('schoolName')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                School Management ERP • Phase 1
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSystemInfoOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* School Master Data */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <User className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                {t('principalTitle')}: {schoolInfo.principal}
              </span>
              <p className="text-slate-500">Executive Head & Institutional Administrator</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                School Campus Address
              </span>
              <p className="text-slate-500 leading-relaxed">
                {schoolInfo.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <School className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Grades & Curriculum Pattern
              </span>
              <p className="text-slate-500">
                {schoolInfo.classesRange} • CBSE Curriculum Pattern
              </p>
            </div>
          </div>
        </div>

        {/* Developer Attribution Box */}
        <div className="rounded-xl border border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-500/30 dark:from-amber-950/40 dark:to-orange-950/40">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
              Architect & Developer Credit
            </h4>
          </div>
          <p className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
            {t('creatorCredit')} ({t('developedBy')})
          </p>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1">
            Crafted for JK Montessori School with responsive desktop, tablet, and Android mobile design systems.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setIsSystemInfoOpen(false)}
            className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
          >
            {t('btnClose')}
          </button>
        </div>
      </div>
    </div>
  );
};
