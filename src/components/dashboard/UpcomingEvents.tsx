import React from 'react';
import { CalendarDays, Clock, Trophy, BookOpen, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleEvents } from '../../data/sampleData';

const categoryIcons = {
  exam: BookOpen,
  meeting: Users,
  activity: Trophy,
  sports: Trophy,
  holiday: CalendarDays,
};

const categoryColors = {
  exam: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
  meeting: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  activity: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  sports: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  holiday: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
};

export const UpcomingEvents: React.FC = () => {
  const { t, setActiveModule } = useApp();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t('sectionUpcomingEvents')}
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {t('sampleDataPill')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Academic Session 2026-27 Milestones
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {sampleEvents.map((evt) => {
            const Icon = categoryIcons[evt.category] || CalendarDays;
            const badgeColor = categoryColors[evt.category] || 'bg-slate-100 text-slate-700';

            return (
              <div
                key={evt.id}
                className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 hover:border-slate-200 hover:bg-slate-50/70 transition dark:border-slate-800/80 dark:hover:bg-slate-800/40"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${badgeColor}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {evt.titleKey}
                    </h4>
                    <span className="shrink-0 text-[10px] font-semibold text-blue-700 dark:text-blue-400">
                      {evt.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {evt.descriptionKey}
                  </p>
                  {evt.time && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{evt.time}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          4 upcoming academic milestones scheduled
        </span>
        <button
          type="button"
          onClick={() => setActiveModule('timetable')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
