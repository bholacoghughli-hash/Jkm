import React from 'react';
import {
  Menu,
  Sun,
  Moon,
  Search,
  PlusCircle,
  GraduationCap,
  ShieldAlert,
  Info,
  Globe2,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    userRole,
    setUserRole,
    setIsMobileNavOpen,
    searchTerm,
    setSearchTerm,
    setIsQuickActionOpen,
    setQuickActionType,
    setIsSystemInfoOpen,
    currentUser,
    backendHealth,
    setIsLoginModalOpen,
    setViewMode,
    logout,
    t,
  } = useApp();

  const roles: { id: UserRole; labelKey: string }[] = [
    { id: 'principal', labelKey: 'rolePrincipal' },
    { id: 'admin', labelKey: 'roleAdmin' },
    { id: 'teacher', labelKey: 'roleTeacher' },
    { id: 'accountant', labelKey: 'roleAccountant' },
    { id: 'parent', labelKey: 'roleParent' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-3 sm:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      {/* Left: Mobile hamburger & School Logo & Branding */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          {/* School Emblem / Logo Placeholder */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-md shadow-blue-950/20 ring-1 ring-amber-400/30">
            <GraduationCap className="h-5 w-5 text-amber-300" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950">
              JK
            </span>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-blue-950 dark:text-white sm:text-base">
                {t('schoolName')}
              </h1>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-950/70 dark:text-blue-300 dark:ring-blue-400/20">
                Nursery - 12
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[260px] md:max-w-[340px]">
              Ghughli, Maharajganj • {t('principalTitle')}: {t('principalName')}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder-slate-500"
            aria-label="Search ERP"
          />
        </div>
      </div>

      {/* Right Controls: Creator Tag, Role Selector, Language, Theme, Quick Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Creator Attribution Badge */}
        <button
          type="button"
          onClick={() => setIsSystemInfoOpen(true)}
          className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-amber-300/40 bg-gradient-to-r from-amber-50 to-orange-50 px-2.5 py-1 text-xs font-semibold text-amber-900 hover:border-amber-400 transition dark:border-amber-500/30 dark:from-amber-950/40 dark:to-orange-950/40 dark:text-amber-300"
          title="Click to view full school system info & author credits"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span>{t('creatorCredit')}</span>
          <Info className="h-3 w-3 opacity-70" />
        </button>

        {/* Backend Status Indicator */}
        <button
          type="button"
          onClick={() => setIsLoginModalOpen(true)}
          className={`hidden md:inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
            backendHealth?.isOnline
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
          }`}
          title="Click to check PHP/MySQL backend status & credentials"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: backendHealth?.isOnline ? '#10b981' : '#f59e0b' }}
          />
          <span>{backendHealth?.isOnline ? 'PHP: Online' : 'PHP: Offline (XAMPP)'}</span>
        </button>

        {/* Authenticated User / Login Button */}
        {currentUser ? (
          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[120px]">
                {currentUser.fullName}
              </span>
              <span className="text-[9px] font-medium text-blue-700 dark:text-blue-300 uppercase">
                {currentUser.roleDisplayName}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:border-slate-800 dark:bg-slate-950 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
              title="Log out of session"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-blue-900/30 bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-950 hover:bg-blue-100 dark:border-blue-700/40 dark:bg-blue-950/60 dark:text-blue-200 dark:hover:bg-blue-900/40 transition"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-blue-800 dark:text-amber-400" />
            <span className="hidden sm:inline">Admin Login</span>
          </button>
        )}

        {/* Switch to Public Website Button */}
        <button
          type="button"
          onClick={() => setViewMode('website')}
          className="flex items-center gap-1.5 rounded-lg border border-blue-900/20 bg-blue-50/80 px-2.5 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-100 dark:border-blue-700/40 dark:bg-blue-950/60 dark:text-blue-200 dark:hover:bg-blue-900/40 transition"
          title="Switch to Public School Website"
        >
          <Globe2 className="h-3.5 w-3.5 text-blue-700 dark:text-amber-400" />
          <span className="hidden lg:inline">{t('btnViewWebsite')}</span>
        </button>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          aria-label="Switch Language (English / हिन्दी)"
          title="Switch Language / भाषा बदलें"
        >
          <Globe2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>{language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          aria-label={t('themeToggle')}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="h-4 w-4 text-slate-700" /> : <Sun className="h-4 w-4 text-amber-400" />}
        </button>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => {
            setQuickActionType(null);
            setIsQuickActionOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:from-blue-800 hover:to-blue-700 active:scale-95 transition"
        >
          <PlusCircle className="h-3.5 w-3.5 text-amber-300" />
          <span className="hidden sm:inline">{t('quickActionBtn')}</span>
        </button>
      </div>
    </header>
  );
};
