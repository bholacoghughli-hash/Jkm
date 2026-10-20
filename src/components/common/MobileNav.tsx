import React from 'react';
import {
  X,
  LayoutDashboard,
  GraduationCap,
  UserPlus,
  Users,
  School,
  ClipboardCheck,
  CreditCard,
  FileSpreadsheet,
  CalendarDays,
  BookOpenCheck,
  HeartHandshake,
  Library,
  Bus,
  Landmark,
  Package,
  Megaphone,
  Award,
  BarChart3,
  Globe,
  ShieldCheck,
  Settings,
  Database,
  Globe2,
  Moon,
  Sun,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { navItems } from '../../data/sampleData';
import { ModuleId } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  GraduationCap,
  UserPlus,
  Users,
  School,
  ClipboardCheck,
  CreditCard,
  FileSpreadsheet,
  CalendarDays,
  BookOpenCheck,
  HeartHandshake,
  Library,
  Bus,
  Landmark,
  Package,
  Megaphone,
  Award,
  BarChart3,
  Globe,
  ShieldCheck,
  Settings,
  Database,
};

export const MobileNav: React.FC = () => {
  const {
    isMobileNavOpen,
    setIsMobileNavOpen,
    activeModule,
    setActiveModule,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsSystemInfoOpen,
    backendHealth,
    setIsLoginModalOpen,
    currentUser,
    logout,
    t,
  } = useApp();

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-900 text-white font-black text-xs">
              JK
            </div>
            <div>
              <h2 className="text-sm font-bold text-blue-950 dark:text-white">
                {t('schoolName')}
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Ghughli • Phase 1
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language and Theme Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-2.5 bg-slate-50 dark:bg-slate-950/40">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Globe2 className="h-3.5 w-3.5 text-blue-600" />
            <span>{language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === 'light' ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>

        {/* Backend Status and Login */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsLoginModalOpen(true);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: backendHealth?.isOnline
                  ? '#10b981'
                  : '#f59e0b',
              }}
            />
            <span>
              {backendHealth?.isOnline
                ? 'PHP: Online'
                : 'PHP: Offline (XAMPP)'}
            </span>
          </button>

          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                void logout();
                setIsMobileNavOpen(false);
              }}
              className="rounded bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
            >
              Logout ({currentUser.roleDisplayName})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="rounded bg-blue-900 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-blue-800"
            >
              Admin Login
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveModule(item.id as ModuleId);
                  setIsMobileNavOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-900 text-white dark:bg-blue-600'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  />
                  <span>{t(item.labelKey)}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                      isActive
                        ? 'bg-blue-800 text-amber-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">
            <span>{t('creatorCredit')}</span>
            <button
              type="button"
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsSystemInfoOpen(true);
              }}
              className="text-blue-600 dark:text-blue-400 underline text-[10px]"
            >
              Info
            </button>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            {t('principalTitle')}: {t('principalName')}
          </p>
        </div>
      </div>
    </div>
  );
};
