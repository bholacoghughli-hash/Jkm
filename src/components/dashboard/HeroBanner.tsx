import React from 'react';
import {
  Sparkles,
  AlertCircle,
  Calendar,
  School,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { schoolInfo } from '../../data/sampleData';

export const HeroBanner: React.FC = () => {
  const { t, language, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();

  const todayDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(2026, 9, 18)); // Synchronized with container local time (October 18, 2026)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-5 sm:p-6 text-white shadow-xl ring-1 ring-white/10">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left: School Greeting & Meta */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 ring-1 ring-amber-400/30">
              <Sparkles className="h-3 w-3" />
              {t('phaseBadge')}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-blue-800/80 px-2.5 py-0.5 text-[11px] font-medium text-blue-200">
              <Calendar className="h-3 w-3" />
              {todayDate}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
              <CheckCircle2 className="h-3 w-3" />
              {t('academicYear')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            {t('schoolName')} <span className="text-amber-300 font-light">ERP</span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            {t('schoolTagline')} • {t('principalTitle')}: <strong>{t('principalName')}</strong>
          </p>

          <p className="text-[11px] text-blue-200/75">
            {schoolInfo.address}
          </p>
        </div>

        {/* Right: Quick Action Shortcuts & Blueprint Link */}
        <div className="flex flex-wrap items-center gap-2.5 lg:self-end">
          <button
            type="button"
            onClick={() => {
              setQuickActionType('fee');
              setIsQuickActionOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-300 active:scale-95 transition"
          >
            <span>{t('btnRecordFee')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setQuickActionType('admission');
              setIsQuickActionOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 ring-1 ring-white/15 transition active:scale-95"
          >
            <span>{t('btnNewAdmission')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('backend-plan')}
            className="flex items-center gap-1.5 rounded-xl bg-blue-800/80 px-3 py-2 text-xs font-semibold text-blue-100 hover:bg-blue-700/80 transition"
          >
            <span>{t('navBackendPlan')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mandatory Demonstration Data Notice Banner */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2 text-[11px] text-amber-200/90 bg-amber-950/40 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-3 sm:px-6">
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
        <p className="leading-tight">
          <strong>{t('sampleDataNotice')}:</strong> {t('sampleDataBanner')}
        </p>
      </div>
    </div>
  );
};
