import React from 'react';
import { Activity, Clock, Shield, CheckCircle, CreditCard, UserPlus, ClipboardCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleActivities } from '../../data/sampleData';

const activityCategoryIcons = {
  fee: CreditCard,
  admission: UserPlus,
  attendance: ClipboardCheck,
  exam: CheckCircle,
  system: Shield,
};

export const RecentActivities: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              {t('sectionRecentActivities')}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t('sampleDataPill')}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit logging for school operations & security compliance
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3.5">
        {sampleActivities.map((act) => {
          const Icon = activityCategoryIcons[act.category] || Activity;

          return (
            <div key={act.id} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                  {act.titleKey}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="font-medium text-slate-600 dark:text-slate-400">{act.actor}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {act.timeAgoKey}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
