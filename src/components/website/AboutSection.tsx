import React from 'react';
import {
  BookOpen,
  Target,
  Compass,
  Award,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
  CheckCircle2,
  Quote,
  School,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutSection: React.FC = () => {
  const { t } = useApp();

  const values = [
    {
      title: t('valIntegrity'),
      desc: t('valIntegrityDesc'),
      icon: Shield,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300',
    },
    {
      title: t('valExcellence'),
      desc: t('valExcellenceDesc'),
      icon: Award,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300',
    },
    {
      title: t('valDiscipline'),
      desc: t('valDisciplineDesc'),
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      title: t('valCreativity'),
      desc: t('valCreativityDesc'),
      icon: Lightbulb,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300',
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('aboutBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('aboutTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* 2-Column: Institutional Story & Montessori Advantage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Story Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-8 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white shadow-sm">
                  <School className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                    {t('aboutStoryTitle')}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    Subhash Chowk, Block Ghughli, Maharajganj (UP)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {t('aboutStoryP1')}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {t('aboutStoryP2')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-blue-900 dark:text-blue-300">
                Affiliation Pattern: CBSE Curriculum
              </span>
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                Grades: Nursery to Class 12
              </span>
            </div>
          </div>

          {/* Montessori Advantage Card */}
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-8 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/20 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                    {t('aboutPhilosophyTitle')}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    Child-Centred Foundation
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {t('aboutPhilosophyDesc')}
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sensory tactile apparatus including cylinder blocks and sandpaper phonics.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Self-discipline and natural concentration fostered without punitive pressure.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Smooth progressive transition to high school analytical rigor in Classes 9 to 12.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200/60 dark:border-blue-900/50 text-[11px] font-semibold text-blue-950 dark:text-blue-200">
              {t('developedBy')}
            </div>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-300">
              <Target className="h-5 w-5 text-blue-600" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {t('aboutMissionTitle')}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('aboutMissionDesc')}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300">
              <Compass className="h-5 w-5 text-amber-500" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                {t('aboutVisionTitle')}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('aboutVisionDesc')}
            </p>
          </div>
        </div>

        {/* Principal's Desk Message Section */}
        <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 p-8 lg:p-10 dark:border-amber-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Principal Visual Badge */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-xl ring-4 ring-amber-400/50">
                  <UserCheck className="h-12 w-12 text-amber-300" />
                </div>
                <span className="absolute -bottom-2 -right-2 rounded-full bg-amber-500 p-1.5 text-white shadow">
                  <Award className="h-4 w-4" />
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-950 dark:text-white">
                  {t('principalName')}
                </h4>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  {t('principalTitle')}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  JK Montessori School, Subhash Chowk, Ghughli
                </p>
              </div>
            </div>

            {/* Principal Welcome Message */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Quote className="h-6 w-6 text-amber-500 opacity-60" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {t('principalDeskTitle')}
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic leading-relaxed">
                "{t('principalMessage')}"
              </blockquote>

              <div className="pt-2 text-xs font-bold text-blue-950 dark:text-blue-300">
                — {t('principalName')}, {t('principalSignoff')}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-blue-950 dark:text-white">
              Institutional Core Values
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Guiding principles instilled in every classroom from Nursery through Class 12.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition hover:border-blue-400"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${v.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
