import React from 'react';
import {
  Sparkles,
  ArrowRight,
  School,
  GraduationCap,
  Users,
  Shapes,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  ChevronRight,
  MapPin,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { t, setIsLoginModalOpen, setViewMode } = useApp();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20 pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-900/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTA buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Stage / Distinction Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{t('heroBadge')}</span>
              <span className="hidden sm:inline opacity-40">•</span>
              <span className="hidden sm:inline text-amber-600 dark:text-amber-400 font-extrabold">Nursery – 12th</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-950 dark:text-white leading-[1.15]">
              {t('heroTitle')}
            </h1>

            {/* Subtitle with address and mission */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('heroSubtitle')}
            </p>

            {/* Location & Principal Credential Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Subhash Chowk, Block Ghughli, Maharajganj, UP</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                <School className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{t('principalTitle')}: {t('principalName')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('#admissions')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/20 hover:from-blue-800 hover:to-indigo-800 active:scale-95 transition"
              >
                <span>{t('heroCtaAdmission')}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#facilities')}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
              >
                <span>{t('heroCtaFacilities')}</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3 text-sm font-bold text-blue-950 hover:bg-blue-100 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-900/40 transition"
                title="Open Administrative & Staff Login"
              >
                <Lock className="h-4 w-4 text-blue-700 dark:text-amber-400" />
                <span>{t('btnAdminLogin')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual School Identity Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/50 p-6 shadow-2xl shadow-blue-900/10 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 transition-all">
              {/* Card Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white shadow-md ring-2 ring-amber-400/40">
                    <GraduationCap className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-blue-950 dark:text-white block">
                      JK Montessori School
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      Academic Session 2026-27
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Admissions Open
                </span>
              </div>

              {/* Graphic Banner */}
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-6 text-white text-center space-y-3 shadow-inner relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-10">
                  <School className="w-36 h-36" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Subhash Chowk • Block Ghughli
                </p>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Excellence in Montessori & Higher Secondary Education
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Comprehensive academic spectrum from Nursery to Class 12 with CBSE curriculum alignment.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-xs">
                    Nursery – 5th Primary
                  </span>
                  <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-xs">
                    6th – 8th Middle
                  </span>
                  <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-xs">
                    9th – 12th Senior
                  </span>
                </div>
              </div>

              {/* Quick Details Highlights */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Hands-on sensory Montessori apparatus for kindergarten</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Practical science laboratories & smart digital classrooms</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Individual care with disciplined moral grounding</span>
                </div>
              </div>

              {/* Author & Creator Credit Ribbon */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {t('developedBy')}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('erp')}
                  className="font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Go to ERP Portal</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Highlight Stat Cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 transition hover:border-blue-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-3">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="text-xl font-extrabold text-blue-950 dark:text-white">
              {t('heroStatClasses')}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {t('heroStatClassesSub')}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 transition hover:border-blue-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-300 mb-3">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-xl font-extrabold text-blue-950 dark:text-white">
              {t('heroStatFaculty')}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {t('heroStatFacultySub')}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 transition hover:border-blue-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 mb-3">
              <Shapes className="h-5 w-5" />
            </div>
            <div className="text-xl font-extrabold text-blue-950 dark:text-white">
              {t('heroStatMontessori')}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {t('heroStatMontessoriSub')}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 transition hover:border-blue-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-xl font-extrabold text-blue-950 dark:text-white">
              {t('heroStatCampus')}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {t('heroStatCampusSub')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
