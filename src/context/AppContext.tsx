import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, UserRole, ModuleId, AuthUser, BackendHealth, ViewMode } from '../types';
import { translations } from '../i18n/translations';
import { AuthService } from '../services/authService';

interface AppContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  backendHealth: BackendHealth | null;
  checkHealth: () => Promise<BackendHealth>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isQuickActionOpen: boolean;
  setIsQuickActionOpen: (open: boolean) => void;
  quickActionType: 'fee' | 'attendance' | 'admission' | 'notice' | null;
  setQuickActionType: (type: 'fee' | 'attendance' | 'admission' | 'notice' | null) => void;
  isSystemInfoOpen: boolean;
  setIsSystemInfoOpen: (open: boolean) => void;
  t: (key: string) => string;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#erp' || hash === '#portal' || hash === '#dashboard') {
        return 'erp';
      }
    }
    return 'website';
  });

  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeModule, setActiveModuleState] = useState<ModuleId>('dashboard');

  const [userRole, setUserRole] = useState<UserRole>('principal');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState<boolean>(false);
  const [quickActionType, setQuickActionType] = useState<'fee' | 'attendance' | 'admission' | 'notice' | null>(null);
  const [isSystemInfoOpen, setIsSystemInfoOpen] = useState<boolean>(false);

  // Sync viewMode with URL hash
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      if (mode === 'erp') {
        if (!window.location.hash.toLowerCase().includes('erp')) {
          window.location.hash = '#erp';
        }
      } else {
        if (window.location.hash.toLowerCase().includes('erp')) {
          window.location.hash = '#website';
        }
      }
    }
  };

  const setActiveModule = (module: ModuleId) => {
    if (module === 'website') {
      setViewMode('website');
      return;
    }
    setActiveModuleState(module);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#erp' || hash === '#portal' || hash === '#dashboard') {
        setViewModeState('erp');
      } else if (
        hash === '#website' ||
        hash === '#public' ||
        hash === '' ||
        hash.startsWith('#home') ||
        hash.startsWith('#about') ||
        hash.startsWith('#classes') ||
        hash.startsWith('#facilities') ||
        hash.startsWith('#admissions') ||
        hash.startsWith('#notices') ||
        hash.startsWith('#gallery') ||
        hash.startsWith('#contact')
      ) {
        setViewModeState('website');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync theme with DOM document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Initial check of backend health on mount
  const checkHealth = async (): Promise<BackendHealth> => {
    const health = await AuthService.checkBackendHealth();
    setBackendHealth(health);

    if (health.isOnline) {
      // Check if already authenticated in PHP session
      const user = await AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setUserRole(user.roleName);
      }
    }
    return health;
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const logout = async (): Promise<void> => {
    if (backendHealth?.isOnline) {
      await AuthService.logout();
    }
    setCurrentUser(null);
    setUserRole('principal');
  };

  // Safe translation resolver
  const t = (key: string): string => {
    const currentDict = translations[language] as Record<string, string>;
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    const enDict = translations.en as Record<string, string>;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return key;
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        activeModule,
        setActiveModule,
        userRole,
        setUserRole,
        currentUser,
        setCurrentUser,
        backendHealth,
        checkHealth,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
        searchTerm,
        setSearchTerm,
        isQuickActionOpen,
        setIsQuickActionOpen,
        quickActionType,
        setQuickActionType,
        isSystemInfoOpen,
        setIsSystemInfoOpen,
        t,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
