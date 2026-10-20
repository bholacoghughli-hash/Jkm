import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { StatCardsSection } from './components/dashboard/StatCardsSection';
import { AttendanceOverview } from './components/dashboard/AttendanceOverview';
import { FeeSummaryCard } from './components/dashboard/FeeSummaryCard';
import { RecentAdmissions } from './components/dashboard/RecentAdmissions';
import { UpcomingEvents } from './components/dashboard/UpcomingEvents';
import { RecentActivities } from './components/dashboard/RecentActivities';
import { ModulePlaceholder } from './components/modules/ModulePlaceholder';
import { BackendPlanView } from './components/backend/BackendPlanView';
import { QuickActionModal } from './components/dashboard/QuickActionModal';
import { SystemInfoModal } from './components/common/SystemInfoModal';
import { LoginModal } from './components/auth/LoginModal';
import { SchoolWebsite } from './components/website/SchoolWebsite';

const MainLayout: React.FC = () => {
  const { activeModule } = useApp();

  React.useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTop = 0;
    }
  }, [activeModule]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MobileNav />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
          {activeModule === 'dashboard' ? (
            <div className="space-y-6 max-w-7xl mx-auto">
              <HeroBanner />
              <StatCardsSection />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <AttendanceOverview />
                  <RecentAdmissions />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <FeeSummaryCard />
                  <UpcomingEvents />
                  <RecentActivities />
                </div>
              </div>
            </div>
          ) : activeModule === 'backend-plan' ? (
            <div className="max-w-7xl mx-auto">
              <BackendPlanView />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <ModulePlaceholder moduleId={activeModule} />
            </div>
          )}
        </main>
      </div>

      <Footer />
      <QuickActionModal />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { viewMode, currentUser } = useApp();

  // Never render the ERP interface without an authenticated user.
  // Backend APIs must still enforce authentication and permissions.
  const canViewERP = viewMode !== 'website' && currentUser !== null;

  return (
    <>
      {canViewERP ? <MainLayout /> : <SchoolWebsite />}

      <SystemInfoModal />
      <LoginModal />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
