import React from 'react';
import { CreditCard, ArrowUpRight, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleFeeSummary } from '../../data/sampleData';
import { formatCurrencyINR } from '../../utils/erpCalculations';

export const FeeSummaryCard: React.FC = () => {
  const { t, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                {t('sectionFeeSummary')}
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {t('sampleDataPill')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('sectionFeeDesc')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setQuickActionType('fee');
              setIsQuickActionOpen(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 active:scale-95 transition"
          >
            <span>{t('btnRecordFee')}</span>
          </button>
        </div>

        {/* 3 Main Financial Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('feeBilledTotal')}
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              {formatCurrencyINR(sampleFeeSummary.totalExpected)}
            </p>
            <span className="text-[10px] text-slate-500">Academic Year 2026-27</span>
          </div>

          <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3 dark:border-emerald-950/40 dark:bg-emerald-950/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              {t('feeCollectedTotal')}
            </span>
            <p className="text-base font-black text-emerald-900 dark:text-emerald-300 mt-1">
              {formatCurrencyINR(sampleFeeSummary.totalCollected)}
            </p>
            <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400">
              {sampleFeeSummary.collectionRate}% Recovered
            </span>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3 dark:border-amber-950/40 dark:bg-amber-950/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              {t('feePendingTotal')}
            </span>
            <p className="text-base font-black text-amber-900 dark:text-amber-300 mt-1">
              {formatCurrencyINR(sampleFeeSummary.totalPending)}
            </p>
            <span className="text-[10px] text-amber-700/80 dark:text-amber-400">
              {sampleFeeSummary.pendingDefaultersCount} Accounts Due
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {t('feeCollectionRate')}
            </span>
            <span className="font-bold text-blue-900 dark:text-blue-300">
              {sampleFeeSummary.collectionRate}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-700 to-emerald-500"
              style={{ width: `${sampleFeeSummary.collectionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          This month collection: <strong>{formatCurrencyINR(sampleFeeSummary.thisMonthCollection)}</strong>
        </span>
        <button
          type="button"
          onClick={() => setActiveModule('fees')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
