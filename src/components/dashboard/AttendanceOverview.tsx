import React from 'react';
import { ClipboardCheck, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleAttendanceWings } from '../../data/sampleData';
import { aggregateAttendance } from '../../utils/erpCalculations';

export const AttendanceOverview: React.FC = () => {
  const { t, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();

  const aggregate = aggregateAttendance(sampleAttendanceWings);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              {t('sectionAttendanceOverview')}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t('sampleDataPill')}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('sectionAttendanceDesc')}
          </p>
        </div>

        {/* Overall summary badge */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 px-3 py-1.5 dark:bg-blue-950/60 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
              {t('statAttendance')}
            </span>
            <span className="text-lg font-black text-blue-950 dark:text-white">
              {aggregate.percentage}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setQuickActionType('attendance');
              setIsQuickActionOpen(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-blue-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 active:scale-95 transition"
          >
            <span>{t('btnMarkAttendance')}</span>
          </button>
        </div>
      </div>

      {/* Wings Attendance Breakdown */}
      <div className="mt-5 space-y-4">
        {sampleAttendanceWings.map((wing) => {
          return (
            <div key={wing.wingNameKey} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {t(wing.wingNameKey)}
                  </span>
                  <span className="ml-2 text-[11px] text-slate-400">
                    ({wing.classes})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {wing.present} / {wing.total}
                  </span>
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {wing.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${wing.percentage}%`,
                    backgroundColor: wing.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Shortcut */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
          {aggregate.totalPresent} students verified on campus
        </span>
        <button
          type="button"
          onClick={() => setActiveModule('attendance')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
