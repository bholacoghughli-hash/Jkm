import React, { useState } from 'react';
import {
  GraduationCap,
  Globe2,
  Moon,
  Sun,
  Menu,
  X,
  Lock,
  LayoutDashboard,
  Info,
  PhoneCall,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WebsiteNavbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsLoginModalOpen,
    setViewMode,
    setIsSystemInfoOpen,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t('navHome') },
    { href: '#about', label: t('navAbout') },
    { href: '#classes', label: t('navClassesWeb') },
    { href: '#facilities', label: t('navFacilitiesWeb') },
    { href: '#admissions', label: t('navAdmissionsWeb') },
    { href: '#notices', label: t('navNoticesWeb') },
    { href: '#gallery', label: t('navGalleryWeb') },
    { href: '#contact', label: t('navContactWeb') },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-semibold text-amber-300 shrink-0">
              {language === 'en' ? 'Admission 2026-27:' : 'प्रवेश सूचना 2026-27:'}
            </span>
            <span className="truncate opacity-90">{t('bannerNotice')}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[10px] sm:text-xs font-medium">
            <button
              type="button"
              onClick={() => setIsSystemInfoOpen(true)}
              className="hover:text-amber-300 transition flex items-center gap-1 opacity-90 hover:opacity-100"
              title="Developed by Bhaskar Gautam"
            >
              <span>{t('developedBy')}</span>
              <Info className="h-3 w-3" />
            </button>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="h-3 w-3 text-amber-400" />
              <span>Ghughli, Maharajganj</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & School Branding */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-md shadow-blue-950/20 ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6 text-amber-300" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950 ring-2 ring-white dark:ring-slate-900">
                  JK
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-950 dark:text-white leading-tight">
                    {t('schoolName')}
                  </span>
                  <span className="hidden md:inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 ring-1 ring-inset ring-blue-700/20 dark:bg-blue-950 dark:text-blue-300">
                    Nursery - 12
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Subhash Chowk, Ghughli • {t('principalTitle')}: {t('principalName')}
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Controls */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                aria-label="Switch Language / भाषा बदलें"
              >
                <Globe2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>{language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                aria-label={t('themeToggle')}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 text-slate-700" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-400" />
                )}
              </button>

              {/* Admin Login Button (Opens LoginModal) */}
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-blue-900/30 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-950 hover:bg-blue-100 dark:border-blue-700/40 dark:bg-blue-950/60 dark:text-blue-200 dark:hover:bg-blue-900/40 transition shadow-sm"
              >
                <Lock className="h-3.5 w-3.5 text-blue-800 dark:text-amber-400" />
                <span>{t('btnAdminLogin')}</span>
              </button>

              {/* ERP Portal Switch Button */}
              <button
                type="button"
                onClick={() => setViewMode('erp')}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:from-blue-800 hover:to-indigo-800 active:scale-95 transition"
                title="Open ERP Management Dashboard"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-amber-300" />
                <span>{t('btnErpPortal')}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="rounded-lg border border-slate-200 p-1.5 text-xs font-semibold dark:border-slate-800"
              >
                {language === 'en' ? 'HI' : 'EN'}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-800"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            <nav className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-900/30 bg-blue-50 py-2.5 text-xs font-bold text-blue-950 dark:border-blue-700/40 dark:bg-blue-950/60 dark:text-blue-200"
              >
                <Lock className="h-4 w-4 text-blue-800 dark:text-amber-400" />
                <span>{t('btnAdminLogin')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setViewMode('erp');
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 py-2.5 text-xs font-bold text-white shadow"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-300" />
                <span>{t('btnErpPortal')}</span>
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-500 font-medium">
                {t('developedBy')} • {t('schoolAddress')}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
