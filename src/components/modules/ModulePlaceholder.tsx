import React from 'react';
import {
  Sparkles,
  Database,
  ShieldCheck,
  Server,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { moduleArchitecturePlans } from '../../data/sampleData';
import { ModuleId } from '../../types';

interface ModulePlaceholderProps {
  moduleId: ModuleId;
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({ moduleId }) => {
  const { t, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();

  const plan = moduleArchitecturePlans[moduleId] || {
    moduleId,
    titleKey: `nav${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`,
    descriptionKey: 'Scheduled for complete relational integration with PHP 8+ PDO and MySQL backend services in Phase 2.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: `module_${moduleId.replace('-', '_')}_records`,
        description: `Primary transactional and master data entities for ${moduleId}`,
        columns: ['id (BIGINT UNSIGNED PK)', 'school_id (INT FK)', 'reference_code (VARCHAR UNIQUE)', 'metadata (JSON)', 'status (ENUM)', 'created_by (INT FK)', 'created_at (TIMESTAMP)'],
      },
    ],
    endpoints: [
      {
        method: 'GET' as const,
        path: `/api/v1/${moduleId.replace('-', '_')}.php`,
        description: `Query paginated records with role-based row-level filtering`,
      },
      {
        method: 'POST' as const,
        path: `/api/v1/${moduleId.replace('-', '_')}.php`,
        description: `Create record with strict server-side validation and prepared statement insert`,
      },
    ],
    keyFeatures: [
      'Zero client-side trust with server-side validation',
      'Parameterized PDO prepared statements to block SQL injection',
      'Immutable audit logging of data modifications',
      'Responsive data tables with Excel/PDF export capabilities',
    ],
    rolePermissions: {
      principal: 'Full SuperAdmin permissions (Create, Read, Update, Delete, Audit)',
      admin: 'Administrative access and report extraction',
      teacher: 'Scoped access to assigned students and classes',
      accountant: 'Financial & transaction ledger permissions',
      parent: 'Self-service read-only access for ward records',
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActiveModule('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('navDashboard')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-3 w-3 text-amber-500" />
            {t('futurePhaseBadge')}
          </span>
          <button
            type="button"
            onClick={() => setActiveModule('backend-plan')}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <Database className="h-3.5 w-3.5 text-blue-600" />
            <span>{t('navBackendPlan')}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t(plan.titleKey)}
              </h2>
              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                Phase 2 Roadmap
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {plan.descriptionKey}
            </p>
          </div>

          {/* Quick interactive action shortcut for relevant modules */}
          {(moduleId === 'fees' || moduleId === 'attendance' || moduleId === 'admissions') && (
            <button
              type="button"
              onClick={() => {
                const actionType = moduleId === 'admissions' ? 'admission' : (moduleId as any);
                setQuickActionType(actionType);
                setIsQuickActionOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-800 active:scale-95 transition shrink-0"
            >
              <PlusCircle className="h-4 w-4 text-amber-300" />
              <span>Test Interactive Action</span>
            </button>
          )}
        </div>

        {/* Phase Statement Notice */}
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-950 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200 flex items-start gap-3">
          <Layers className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Honest Architecture Boundary (Phase 1 Foundation):</p>
            <p className="text-blue-900/90 dark:text-blue-300/90 leading-relaxed">
              In accordance with project specifications, Phase 1 establishes the design system, complete responsive navigation, dashboard KPIs, and security architecture. This module’s business logic and database connectivity will be activated in Phase 2 with our PHP 8+ and MySQL stack.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Database Schema & API Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned MySQL Database Schema */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <Database className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('plannedDbTables')}
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              {plan.databaseTables.map((tbl, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-900 dark:text-blue-300">
                      `{tbl.name}`
                    </span>
                    <span className="text-[10px] text-slate-400">InnoDB utf8mb4</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {tbl.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tbl.columns.map((col, cIdx) => (
                      <span
                        key={cIdx}
                        className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-700 shadow-2xs border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Planned PHP PDO REST Endpoints */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <Server className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('plannedEndpoints')}
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              {plan.endpoints.map((ep, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : ep.method === 'POST'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    {ep.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t('roleAccessControl')}
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(plan.rolePermissions).map(([role, perm]) => (
            <div
              key={role}
              className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/40"
            >
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 block mb-1">
                {role}
              </span>
              <p className="text-[11px] text-slate-700 dark:text-slate-300">
                {perm}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
