import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  ShieldCheck,
  Server,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  KeyRound,
  ArrowLeft,
  Smartphone,
  Info,
  Globe2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthService } from '../../services/authService';
import { getApiBaseUrl, setApiBaseUrl } from '../../services/api';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    backendHealth,
    checkHealth,
    setCurrentUser,
    setUserRole,
    setViewMode,
    language,
    t,
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [customApiUrl, setCustomApiUrl] = useState(getApiBaseUrl());
  const [showConfig, setShowConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoginModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      checkHealth();
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleTestConnection = async () => {
    setIsTestingConn(true);
    setErrorMessage(null);
    setApiBaseUrl(customApiUrl);
    const health = await checkHealth();
    setIsTestingConn(false);

    if (health.isOnline) {
      setSuccessMessage(
        language === 'en'
          ? `Connected successfully to PHP ${health.phpVersion || '8+'} (${health.statusText})`
          : `PHP ${health.phpVersion || '8+'} सर्वर से सफलतापूर्वक जुड़ाव स्थापित हो गया (${health.statusText})`
      );
    } else {
      setErrorMessage(
        language === 'en'
          ? 'Backend server unreachable. The PHP backend and MySQL database are currently offline.'
          : 'बैकएंड सर्वर से सम्पर्क नहीं हो सका। PHP एवं MySQL डेटाबेस अभी ऑफलाइन हैं।'
      );
    }
  };

  const handleRealLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage(
        language === 'en'
          ? 'Please enter both username/email and password.'
          : 'कृपया यूजरनेम/ईमेल तथा पासवर्ड दोनों दर्ज करें।'
      );
      return;
    }

    // Beginner-friendly error when backend is offline
    if (!backendHealth?.isOnline) {
      setErrorMessage(t('authServerOfflineError'));
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await AuthService.login({ identifier, password });
    setIsLoading(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
      setUserRole(result.user.roleName);
      setViewMode('erp');
      setSuccessMessage(
        language === 'en'
          ? `Authenticated successfully as ${result.user.fullName} (${result.user.roleDisplayName})`
          : `सफलतापूर्वक लॉगिन हो गया: ${result.user.fullName} (${result.user.roleDisplayName})`
      );
      setTimeout(() => {
        setIsLoginModalOpen(false);
      }, 1200);
    } else {
      setErrorMessage(
        result.error ||
          (language === 'en'
            ? 'Invalid credentials or server unreachable. Please verify.'
            : 'अमान्य क्रेडेंशियल्स अथवा सर्वर अनुपलब्ध। कृपया पुनः जाँचें।')
      );
    }
  };

  const handleReturnToWebsite = () => {
    setIsLoginModalOpen(false);
    setViewMode('website');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-md ring-1 ring-amber-400/30">
              <Lock className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('authModalTitle')}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t('authModalSubtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            aria-label="Close login dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Honest Backend Status Banner */}
          <div
            className={`rounded-2xl border p-4 text-xs transition-colors ${
              backendHealth?.isOnline
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200'
                : 'border-amber-200 bg-amber-50/80 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                {backendHealth?.isOnline ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                ) : (
                  <Server className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {backendHealth?.isOnline
                        ? 'PHP 8+ & MySQL Backend Online'
                        : t('authPhpRequiredTitle')}
                    </span>
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: backendHealth?.isOnline ? '#10b981' : '#f59e0b' }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed opacity-90 font-normal">
                    {backendHealth?.isOnline
                      ? `Connected to MySQL database (${backendHealth.databaseName}) at ${backendHealth.apiUrl}`
                      : t('authPhpRequiredDesc')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingConn}
                className="shrink-0 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 flex items-center gap-1 shadow-xs"
                title="Ping PHP API endpoint"
              >
                <RefreshCw className={`h-3 w-3 ${isTestingConn ? 'animate-spin' : ''}`} />
                <span>{isTestingConn ? 'Checking...' : 'Check Status'}</span>
              </button>
            </div>
          </div>

          {/* Special Beginner-Friendly Mobile Phone / Cloud Preview Explanation */}
          {!backendHealth?.isOnline && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/50 dark:bg-blue-950/40 text-xs text-blue-950 dark:text-blue-200 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300">
                <Smartphone className="h-4 w-4 text-blue-700 dark:text-amber-400 shrink-0" />
                <span>{t('authMobileNoticeTitle')}</span>
              </div>
              <p className="text-[11px] leading-relaxed font-normal opacity-90">
                {t('authMobileNoticeDesc')}
              </p>
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/50 flex items-center gap-1.5 text-[10px] text-blue-900/80 dark:text-blue-300 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-700 dark:text-amber-400 shrink-0" />
                <span>{t('authSecurityNotice')}</span>
              </div>
            </div>
          )}

          {/* Configurable API Base URL Accordion */}
          <div className="text-xs">
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium flex items-center gap-1"
            >
              <span>{showConfig ? '▼ Hide' : '▶ Configure'} Backend API Target URL</span>
            </button>

            {showConfig && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60 space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Target PHP Endpoint
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customApiUrl}
                    onChange={(e) => setCustomApiUrl(e.target.value)}
                    placeholder="http://localhost/jkmontessori_erp/backend/public"
                    className="flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    className="rounded-md bg-blue-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                  >
                    Apply & Ping
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Default: <code>http://localhost/jkmontessori_erp/backend/public</code>
                </p>
              </div>
            )}
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 dark:bg-rose-950/50 dark:border-rose-900/50 dark:text-rose-200 flex items-start gap-2.5 leading-relaxed animate-fade-in">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-900/50 dark:text-emerald-200 flex items-start gap-2.5 leading-relaxed animate-fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Real Credentials Login Form */}
          <form onSubmit={handleRealLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Username or Official Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. principal_admin or admin@jkmontessori.org"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 py-3 text-xs font-bold text-white shadow-md hover:from-blue-800 hover:to-indigo-800 active:scale-95 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Credentials with PHP...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-amber-300" />
                  <span>Sign In via PHP Backend Session</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Return to Public Website Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReturnToWebsite}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
            >
              <ArrowLeft className="h-4 w-4 text-blue-600" />
              <span>{t('btnBackToWebsite')}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-3 dark:border-slate-800 dark:bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Developed by Bhaskar Gautam</span>
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
