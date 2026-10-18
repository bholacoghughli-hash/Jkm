import React from 'react';
import {
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
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

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    isSidebarCollapsed,
    toggleSidebar,
    setIsSystemInfoOpen,
    t,
  } = useApp();

  const categories = [
    { key: 'core', labelKey: 'navCategoryCore' },
    { key: 'academics', labelKey: 'navCategoryAcademics' },
    { key: 'finance', labelKey: 'navCategoryFinance' },
    { key: 'campus', labelKey: 'navCategoryCampus' },
    { key: 'system', labelKey: 'navCategorySystem' },
  ];

  return (
    <aside
      className={`relative hidden lg:flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 z-20 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
        {!isSidebarCollapsed ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-white font-black text-xs shadow-sm">
              JK
            </div>
            <div className="overflow-hidden">
              <span className="block font-bold text-sm tracking-tight text-blue-950 dark:text-white truncate">
                JK Montessori
              </span>
              <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                School ERP • Ghughli
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-blue-900 text-white font-black text-xs">
            JK
          </div>
        )}

        {/* Toggle Collapse Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {categories.map((category) => {
          const itemsInCategory = navItems.filter((item) => item.category === category.key);
          if (itemsInCategory.length === 0) return null;

          return (
            <div key={category.key} className="space-y-1">
              {!isSidebarCollapsed && (
                <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {t(category.labelKey)}
                </p>
              )}

              <div className="space-y-0.5">
                {itemsInCategory.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = activeModule === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveModule(item.id as ModuleId)}
                      title={isSidebarCollapsed ? t(item.labelKey) : undefined}
                      className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white shadow-sm dark:bg-blue-600 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-105 ${
                          isActive
                            ? 'text-amber-300'
                            : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'
                        }`}
                      />

                      {!isSidebarCollapsed && (
                        <div className="flex flex-1 items-center justify-between overflow-hidden">
                          <span className="truncate">{t(item.labelKey)}</span>
                          {item.badge && (
                            <span
                              className={`ml-2 rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                                isActive
                                  ? 'bg-blue-800 text-amber-300'
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer / System Credit Card */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
        {!isSidebarCollapsed ? (
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/90 to-indigo-50/70 p-3 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-indigo-950/20">
            <div className="flex items-center justify-between mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 dark:text-blue-300">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Phase 1 Foundation
              </span>
              <button
                type="button"
                onClick={() => setIsSystemInfoOpen(true)}
                className="text-slate-400 hover:text-blue-700 dark:hover:text-blue-300"
                aria-label="System Information"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              JK Montessori School
            </p>
            <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
              Principal: Mr. Sanjay Kumar Mishra
            </p>
            <div className="mt-2 pt-2 border-t border-blue-200/60 dark:border-blue-900/50 flex items-center justify-between text-[10px] text-blue-950 dark:text-blue-200 font-semibold">
              <span>Created by Bhaskar</span>
              <span className="text-[9px] font-normal text-slate-500 dark:text-slate-400">v1.0</span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsSystemInfoOpen(true)}
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300"
            title="Created by Bhaskar Gautam • JK Montessori School"
          >
            <Info className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
