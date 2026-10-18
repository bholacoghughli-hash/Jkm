import React from 'react';
import {
  GraduationCap,
  MapPin,
  User,
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Heart,
  Sparkles,
  Info,
  ArrowUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WebsiteFooter: React.FC = () => {
  const { t, setIsLoginModalOpen, setViewMode, setIsSystemInfoOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1 (5 cols): School Crest & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white shadow-md ring-2 ring-amber-400/30">
                <GraduationCap className="h-6 w-6 text-amber-300" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-slate-950">
                  JK
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  {t('schoolName')}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  Nursery to Class 12 • Subhash Chowk, Ghughli
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              Providing holistic, child-centred foundational education through Montessori sensorial methods alongside rigorous high school CBSE-pattern curriculum in Maharajganj, UP.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Subhash Chowk, Block Ghughli, Maharajganj, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>{t('principalTitle')}: {t('principalName')}</span>
              </div>
            </div>
          </div>

          {/* Col 2 (3 cols): Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (4 cols): Administrative Portals & Author Credits */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Institutional Portals
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Administrative officers, teachers, and accounting staff can access the secure school management system.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-blue-700/60 bg-blue-950/60 py-2.5 px-4 text-xs font-bold text-blue-200 hover:bg-blue-900/60 transition shadow-sm"
              >
                <Lock className="h-3.5 w-3.5 text-amber-300" />
                <span>{t('btnAdminLogin')} (Staff Access)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('erp')}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-800 to-indigo-800 py-2.5 px-4 text-xs font-bold text-white hover:from-blue-700 hover:to-indigo-700 transition shadow-sm"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-amber-300" />
                <span>{t('btnErpPortal')} (ERP View)</span>
              </button>
            </div>

            {/* Developer Credit Tag */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>{t('developedBy')}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsSystemInfoOpen(true)}
                className="text-slate-400 hover:text-white underline"
              >
                System Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 JK Montessori School. All Rights Reserved. Subhash Chowk, Block Ghughli, District Maharajganj, UP.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-400">Created by Bhaskar Gautam</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
