import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Baby,
  ArrowRight,
  School,
  CheckCircle2,
  Atom,
  Building2,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleClassStages } from '../../data/sampleData';

const stageIcons: Record<string, React.ElementType> = {
  foundational: Baby,
  primary: School,
  middle: BookOpen,
  secondary: GraduationCap,
};

const stageColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  foundational: {
    bg: 'from-amber-500/10 via-orange-500/5 to-transparent',
    border: 'border-amber-200 dark:border-amber-900/40',
    text: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300',
  },
  primary: {
    bg: 'from-blue-500/10 via-sky-500/5 to-transparent',
    border: 'border-blue-200 dark:border-blue-900/40',
    text: 'text-blue-700 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-300',
  },
  middle: {
    bg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    border: 'border-emerald-200 dark:border-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300',
  },
  secondary: {
    bg: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    border: 'border-purple-200 dark:border-purple-900/40',
    text: 'text-purple-700 dark:text-purple-400',
    badge: 'bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-300',
  },
};

export const ClassesSection: React.FC = () => {
  const { t } = useApp();

  const scrollToAdmissions = () => {
    const el = document.querySelector('#admissions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="classes" className="py-16 lg:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
            <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
            <span>{t('classesBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('classesTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('classesSubtitle')}
          </p>
        </div>

        {/* 4 Academic Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {sampleClassStages.map((stage) => {
            const Icon = stageIcons[stage.id] || School;
            const style = stageColors[stage.id] || stageColors.primary;

            return (
              <div
                key={stage.id}
                className={`rounded-3xl border bg-gradient-to-b ${style.bg} to-white dark:to-slate-900 p-8 shadow-sm ${style.border} flex flex-col justify-between hover:shadow-md transition-shadow`}
              >
                <div className="space-y-4">
                  {/* Card Header with Icon & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                        <Icon className={`h-6 w-6 ${style.text}`} />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-blue-950 dark:text-white leading-tight">
                          {t(stage.stageKey)}
                        </h3>
                        <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${style.badge}`}>
                          {t(stage.classesKey)}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-bold text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      {t(stage.ageRangeKey)}
                    </span>
                  </div>

                  {/* Stage Description */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pt-1">
                    {t(stage.descKey)}
                  </p>

                  {/* Curriculum & Pedagogy */}
                  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      Teaching Approach & Curriculum:
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                      {t(stage.curriculumKey)}
                    </p>
                  </div>

                  {/* Subjects Offered */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      Core Subjects & Learning Spheres:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      {t(stage.subjectsKey)}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    Admission Session 2026-27 Open
                  </span>
                  <button
                    type="button"
                    onClick={scrollToAdmissions}
                    className="flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    <span>Apply for this Class</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic Overview Summary Box */}
        <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 sm:p-8 text-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                14 Academic Levels
              </span>
              <h4 className="text-lg font-extrabold text-white">
                Nursery to Class 12 Under One Roof
              </h4>
              <p className="text-xs text-blue-100">
                Continuous educational journey preventing frequent school migrations for children in Ghughli.
              </p>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-blue-700/60 pt-4 md:pt-0 md:pl-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                CBSE Pattern Stream
              </span>
              <h4 className="text-lg font-extrabold text-white">
                Science, Commerce & Arts
              </h4>
              <p className="text-xs text-blue-100">
                Dedicated subject teachers with modern laboratory practicals and career mentoring.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <button
                type="button"
                onClick={scrollToAdmissions}
                className="rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-300 active:scale-95 transition shadow-md"
              >
                Inquire for Admission 2026-27
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
