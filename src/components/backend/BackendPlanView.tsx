import React, { useState } from 'react';
import {
  Database,
  Server,
  Shield,
  FileCode2,
  CheckCircle2,
  ArrowLeft,
  Key,
  Layers,
  Terminal,
  Lock,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getApiBaseUrl, setApiBaseUrl } from '../../services/api';

export const BackendPlanView: React.FC = () => {
  const { t, setActiveModule, backendHealth, checkHealth, setIsLoginModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'xampp' | 'admin-cli' | 'schema' | 'security'>('overview');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState(getApiBaseUrl());

  const handlePing = async () => {
    setIsPinging(true);
    setPingResult(null);
    setApiBaseUrl(customUrl);
    const health = await checkHealth();
    setIsPinging(false);
    if (health.isOnline) {
      setPingResult(`Success! Connected to PHP ${health.phpVersion} & MySQL database '${health.databaseName}'.`);
    } else {
      setPingResult(`Offline: ${health.error || 'Server unreachable'}. Verify Apache and MySQL are running in XAMPP.`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Bar */}
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
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${
              backendHealth?.isOnline
                ? 'bg-emerald-50 text-emerald-800 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/60 dark:text-amber-300'
            }`}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: backendHealth?.isOnline ? '#10b981' : '#f59e0b' }}
            />
            {backendHealth?.isOnline ? 'PHP Backend Connected' : 'PHP Backend Offline (Local XAMPP)'}
          </span>

          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="rounded-lg bg-blue-900 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-800"
          >
            Test Admin Login
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-amber-300 shadow-md">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  PHP 8+ & MySQL Backend Foundation
                </h2>
                <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  Phase 2 Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                JK Montessori School ERP • Architect & Developer: Bhaskar Gautam
              </p>
            </div>
          </div>

          {/* Quick Endpoint Probe */}
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 dark:bg-slate-950 dark:border-slate-800">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="font-mono text-xs bg-white border border-slate-300 rounded px-2 py-1 dark:bg-slate-900 dark:border-slate-700 w-48 sm:w-64"
              placeholder="http://localhost/.../public"
            />
            <button
              type="button"
              onClick={handlePing}
              disabled={isPinging}
              className="flex items-center gap-1 rounded bg-blue-900 px-2.5 py-1 text-xs font-bold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isPinging ? 'animate-spin' : ''}`} />
              <span>Ping</span>
            </button>
          </div>
        </div>

        {pingResult && (
          <div
            className={`rounded-xl border p-3 text-xs flex items-center gap-2 ${
              pingResult.startsWith('Success')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
            }`}
          >
            {pingResult.startsWith('Success') ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            )}
            <span>{pingResult}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 scrollbar-none">
          {[
            { id: 'overview', label: '1. Architecture & Security', icon: Layers },
            { id: 'xampp', label: '2. XAMPP Setup (हिन्दी निर्देश)', icon: Server },
            { id: 'admin-cli', label: '3. Create Super Admin (CLI)', icon: Terminal },
            { id: 'schema', label: '4. MySQL Database Schema', icon: Database },
            { id: 'security', label: '5. Testing & Verification', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'border-blue-900 text-blue-950 dark:border-blue-400 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ARCHITECTURE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <p className="text-sm leading-relaxed">
              Phase 2 delivers the operational PHP 8+ and MySQL backend foundation inside the <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">/backend</code> directory. It incorporates zero-client-side trust, prepared statement PDO queries, session fixation countermeasures, and brute-force defenses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  1. Zero Hardcoded Passwords
                </span>
                <p className="text-slate-500 leading-relaxed">
                  Passwords use <code>password_hash(PASSWORD_BCRYPT, [cost =&gt; 12])</code>. No default production passwords exist in code or SQL migrations.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  2. Session Fixation & CSRF
                </span>
                <p className="text-slate-500 leading-relaxed">
                  <code>session_regenerate_id(true)</code> is invoked upon login. All state mutations require valid <code>X-CSRF-Token</code> matched in session.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  3. Brute Force Throttling
                </span>
                <p className="text-slate-500 leading-relaxed">
                  Accounts and IP addresses are automatically locked for 15 minutes after 5 consecutive failed login attempts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: XAMPP HINDI INSTRUCTIONS */}
        {activeTab === 'xampp' && (
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200 mb-1">
                Windows PC पर XAMPP के साथ बैकएंड चलाने के 5 आसान चरण
              </h3>
              <p className="text-blue-900/80 dark:text-blue-300/80">
                JK Montessori School ERP बैकएंड को अपने कम्प्यूटर पर चालू करने के लिए निम्न चरणों का पालन करें:
              </p>
            </div>

            <ol className="space-y-3 list-decimal list-inside pl-1 text-xs">
              <li className="font-medium">
                <strong>XAMPP में Apache और MySQL स्टार्ट करें:</strong> XAMPP Control Panel खोलें और Apache व MySQL दोनों के सामने <span className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-mono">Start</span> बटन दबाएं।
              </li>
              <li className="font-medium">
                <strong>प्रोजेक्ट को htdocs में रखें:</strong> प्रोजेक्ट के <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">backend</code> फ़ोल्डर को <code className="font-mono">C:\xampp\htdocs\jkmontessori_erp\backend</code> में कॉपी करें।
              </li>
              <li className="font-medium">
                <strong>डेटाबेस बनाएं:</strong> ब्राउज़र में <code className="font-mono">http://localhost/phpmyadmin</code> खोलें, <code className="font-mono">jkmontessori_erp</code> नाम का नया डेटाबेस बनाएं।
              </li>
              <li className="font-medium">
                <strong>SQL माइग्रेशन इम्पोर्ट करें:</strong> phpMyAdmin में Import टैब पर जाएं और क्रमानुसार दोनों माइग्रेशन फ़ाइलें रन करें:
                <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 font-mono text-[11px] text-blue-700 dark:text-blue-400">
                  <li>backend/migrations/001_create_tables.sql</li>
                  <li>backend/migrations/002_seed_initial_data.sql</li>
                </ul>
              </li>
              <li className="font-medium">
                <strong>सुपर एडमिन बनाएं और टेस्ट करें:</strong> Command Prompt में <code className="font-mono">php cli/create_super_admin.php</code> चलाकर पहला सुरक्षित एडमिन बनाएं।
              </li>
            </ol>
          </div>
        )}

        {/* TAB 3: ADMIN CLI */}
        {activeTab === 'admin-cli' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Safe CLI Tool (Never Exposed Publicly on the Web)
              </span>
              <span className="font-mono text-[11px]">backend/cli/create_super_admin.php</span>
            </div>

            <pre className="rounded-xl bg-slate-950 p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed border border-slate-800">
{`# 1. Open Terminal or Windows Command Prompt (CMD):
cd C:\\xampp\\htdocs\\jkmontessori_erp\\backend

# 2. Run the secure Super Admin creator:
php cli/create_super_admin.php

# Or pass parameters directly:
php cli/create_super_admin.php \\
  --username=principal_admin \\
  --email=principal@jkmontessori.org \\
  --name="Mr. Sanjay Kumar Mishra" \\
  --password="YourStrongPassword123!"`}
            </pre>

            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] text-slate-600 dark:text-slate-400">
              <strong>Security Guard:</strong> If invoked via HTTP browser request, the script immediately detects <code>php_sapi_name() !== 'cli'</code> and returns a <code>403 Forbidden</code> error.
            </div>
          </div>
        )}

        {/* TAB 4: MYSQL SCHEMA */}
        {activeTab === 'schema' && (
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Core Relational Tables in `jkmontessori_erp`:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'users', desc: 'Authentication, bcrypt password_hash, role_id, phone, status, last_login_ip' },
                { name: 'roles', desc: 'super_admin, principal, admin, teacher, accountant, parent' },
                { name: 'permissions', desc: 'Granular permissions (students.manage, fees.collect, etc.)' },
                { name: 'role_permissions', desc: 'Pivot table linking roles with assigned permissions' },
                { name: 'audit_logs', desc: 'Immutable security log of login, logout, and administrative updates' },
                { name: 'login_attempts', desc: 'IP address, username, attempted_at for 15-minute rate-limiting' },
                { name: 'academic_sessions', desc: '2026-2027 active session, start/end dates' },
                { name: 'classes & sections', desc: 'All 14 classes (Nursery to 12th) and classroom sections' },
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/40">
                  <span className="font-mono font-bold text-blue-900 dark:text-blue-300 block">
                    `{item.name}`
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TESTING & VERIFICATION */}
        {activeTab === 'security' && (
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Phase 2 Testing & Verification Procedures:
            </span>

            <div className="space-y-2 text-[11px]">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <strong>1. Successful Login Test:</strong> Execute <code>POST /api/v1/auth/login</code> with valid credentials. Verify HTTP 200, session cookie <code>JKM_SESSION</code> set with HttpOnly, and user role returned.
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <strong>2. Incorrect Password Rejection Test:</strong> Execute <code>POST /api/v1/auth/login</code> with invalid password. Verify HTTP 401 with generic message <code>"Invalid username/email or password."</code> to prevent username enumeration.
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <strong>3. Rate Limiter Lockout Test:</strong> Send 5 consecutive incorrect passwords. Verify attempt 6 returns HTTP 429 <code>RATE_LIMITED</code> with 15-minute lockout notification.
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <strong>4. CSRF Validation Test:</strong> Send <code>POST /api/v1/auth/logout</code> without <code>X-CSRF-Token</code> header. Verify request is rejected with HTTP 403 <code>CSRF_INVALID</code>.
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <strong>5. Database Connection Failure Test:</strong> Stop MySQL in XAMPP and ping <code>/api/v1/health</code>. Verify server catches <code>PDOException</code> gracefully and returns formatted 500 JSON without exposing database passwords.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
