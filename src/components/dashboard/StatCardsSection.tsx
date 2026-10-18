import React from 'react';
import {
  GraduationCap,
  Users,
  ClipboardCheck,
  CreditCard,
  School,
  Activity,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyINR } from '../../utils/erpCalculations';
import { ModuleId } from '../../types';

export const StatCardsSection: React.FC = () => {
  const { t, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();

  const cards = [
    {
      id: 'students',
      titleKey: 'statTotalStudents',
      value: '1,420',
      change: '+42 this session',
      isPositive: true,
      subtextKey: 'statTotalStudentsSub',
      icon: GraduationCap,
      targetModule: 'students' as ModuleId,
      accent: 'from-blue-600 to-indigo-700',
      borderAccent: 'border-blue-200 dark:border-blue-900/40',
      iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    },
    {
      id: 'teachers',
      titleKey: 'statTotalTeachers',
      value: '68',
      change: '1:21 ratio',
      isPositive: true,
      subtextKey: 'statTotalTeachersSub',
      icon: Users,
      targetModule: 'teachers' as ModuleId,
      accent: 'from-emerald-600 to-teal-700',
      borderAccent: 'border-emerald-200 dark:border-emerald-900/40',
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'attendance',
      titleKey: 'statAttendance',
      value: '94.2%',
      change: '1,338 present',
      isPositive: true,
      subtextKey: 'statAttendanceSub',
      icon: ClipboardCheck,
      targetModule: 'attendance' as ModuleId,
      accent: 'from-sky-600 to-cyan-700',
      borderAccent: 'border-sky-200 dark:border-sky-900/40',
      iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
    },
    {
      id: 'fees',
      titleKey: 'statPendingFees',
      value: formatCurrencyINR(342500),
      change: '38 accounts due',
      isPositive: false,
      subtextKey: 'statPendingFeesSub',
      icon: CreditCard,
      targetModule: 'fees' as ModuleId,
      accent: 'from-amber-600 to-orange-700',
      borderAccent: 'border-amber-200 dark:border-amber-900/40',
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'classes',
      titleKey: 'statTotalClasses',
      value: '14',
      change: 'Nursery to 12th',
      isPositive: true,
      subtextKey: 'statTotalClassesSub',
      icon: School,
      targetModule: 'classes' as ModuleId,
      accent: 'from-purple-600 to-indigo-700',
      borderAccent: 'border-purple-200 dark:border-purple-900/40',
      iconBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    },
    {
      id: 'activities',
      titleKey: 'statRecentActivities',
      value: '6',
      change: 'Active today',
      isPositive: true,
      subtextKey: 'statRecentActivitiesSub',
      icon: Activity,
      targetModule: 'dashboard' as ModuleId,
      accent: 'from-rose-600 to-pink-700',
      borderAccent: 'border-rose-200 dark:border-rose-900/40',
      iconBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => {
              if (card.targetModule !== 'dashboard') {
                setActiveModule(card.targetModule);
              }
            }}
            className={`group relative flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-all cursor-pointer dark:bg-slate-900 ${card.borderAccent}`}
          >
            {/* Top row: Icon + Sample Data Tag */}
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} transition-transform group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>

              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {t('sampleDataPill')}
              </span>
            </div>

            {/* Metric Value */}
            <div className="mt-3">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </span>
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate mt-0.5">
                {t(card.titleKey)}
              </h3>
            </div>

            {/* Subtext and mini trend */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                {t(card.subtextKey)}
              </span>
              <span
                className={`font-semibold shrink-0 ${
                  card.isPositive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
