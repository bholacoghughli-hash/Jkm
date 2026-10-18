import React, { useState, useEffect } from 'react';
import { WebsiteNavbar } from './WebsiteNavbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ClassesSection } from './ClassesSection';
import { FacilitiesSection } from './FacilitiesSection';
import { AdmissionsSection } from './AdmissionsSection';
import { NoticesSection } from './NoticesSection';
import { GallerySection } from './GallerySection';
import { ContactSection } from './ContactSection';
import { WebsiteFooter } from './WebsiteFooter';
import {
  ArrowUp,
  LayoutDashboard,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SchoolWebsite: React.FC = () => {
  const { setViewMode, setIsLoginModalOpen, t } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors font-sans selection:bg-blue-600 selection:text-white">
      {/* Public Navigation Bar */}
      <WebsiteNavbar />

      {/* Main Public Website Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About School, Educational Mission & Principal Message */}
        <AboutSection />

        {/* Classes: Nursery to Class 12 */}
        <ClassesSection />

        {/* Facilities and Activities */}
        <FacilitiesSection />

        {/* Admissions Information & Inquiry Form */}
        <AdmissionsSection />

        {/* Notices & Announcements (Clearly labelled sample content) */}
        <NoticesSection />

        {/* Photo Gallery with curated placeholder visual items */}
        <GallerySection />

        {/* Contact Section with known Subhash Chowk, Ghughli address */}
        <ContactSection />
      </main>

      {/* Public Footer */}
      <WebsiteFooter />

      {/* Floating Quick Action Hub (Bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating ERP Portal Quick Switch */}
        <button
          type="button"
          onClick={() => setViewMode('erp')}
          className="flex items-center gap-2 rounded-full bg-blue-900/90 hover:bg-blue-900 text-white px-3.5 py-2 text-xs font-bold shadow-lg backdrop-blur-sm border border-amber-400/30 hover:scale-105 active:scale-95 transition"
          title="Switch to ERP Management Dashboard"
        >
          <LayoutDashboard className="h-4 w-4 text-amber-300" />
          <span className="hidden sm:inline">ERP Portal</span>
        </button>

        {/* Floating Scroll to Top */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
