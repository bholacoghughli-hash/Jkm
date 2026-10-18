import { apiFetch, getApiBaseUrl, getCsrfToken, setCsrfToken } from './api.ts';
import type { AuthUser, BackendHealth, LoginCredentials } from '../types/index.ts';

/**
 * Authentication Service for JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */

export class AuthService {
  /**
   * Probes the PHP backend to check if local XAMPP is running and database is connected
   */
  static async checkBackendHealth(): Promise<BackendHealth> {
    const res = await apiFetch('/api/v1/health', { method: 'GET', skipCsrf: true });

    if (!res.success || !res.data) {
      return {
        isOnline: false,
        statusText: 'PHP Backend Offline (XAMPP Server Unreachable)',
        apiUrl: getApiBaseUrl(),
        error: res.error || 'Connection refused. Start Apache & MySQL in XAMPP.',
      };
    }

    const payload = res.data;
    const db = payload.database;

    return {
      isOnline: true,
      statusText: db?.connected ? 'Online & MySQL Connected' : 'Online (MySQL Disconnected)',
      phpVersion: payload.php_version,
      databaseConnected: db?.connected ?? false,
      databaseName: db?.database ?? 'jkmontessori_erp',
      serverTime: payload.server_time,
      apiUrl: getApiBaseUrl(),
    };
  }

  /**
   * Fetches fresh CSRF token from active PHP session
   */
  static async fetchCsrfToken(): Promise<string | null> {
    const res = await apiFetch('/api/v1/auth/csrf', { method: 'GET', skipCsrf: true });
    if (res.success && res.data?.csrf_token) {
      setCsrfToken(res.data.csrf_token);
      return res.data.csrf_token;
    }
    return null;
  }

  /**
   * Authenticates against PHP session backend
   */
  static async login(credentials: LoginCredentials): Promise<{
    success: boolean;
    user?: AuthUser;
    error?: string;
    code?: string;
    isSimulation?: boolean;
  }> {
    // 1. Ensure fresh CSRF token is loaded if available
    await this.fetchCsrfToken();

    // 2. Perform credentialed POST request
    const res = await apiFetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (res.success && res.data?.user) {
      const u = res.data.user;
      const user: AuthUser = {
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.full_name,
        phone: u.phone,
        roleName: u.role_name,
        roleDisplayName: u.role_display_name,
        permissions: u.permissions || [],
        loggedInAt: u.logged_in_at || Date.now(),
      };
      return { success: true, user };
    }

    // 3. Return real server rejection error
    return {
      success: false,
      error: res.error || 'Authentication failed. Please verify credentials.',
      code: res.code || 'AUTH_FAILED',
    };
  }

  /**
   * Log out active session
   */
  static async logout(): Promise<boolean> {
    const res = await apiFetch('/api/v1/auth/logout', { method: 'POST' });
    setCsrfToken(null);
    return res.success;
  }

  /**
   * Verify if currently authenticated in PHP session
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    const res = await apiFetch('/api/v1/auth/me', { method: 'GET', skipCsrf: true });
    if (res.success && res.data?.user) {
      const u = res.data.user;
      return {
        id: u.id,
        username: u.username,
        email: u.email,
        fullName: u.full_name,
        phone: u.phone,
        roleName: u.role_name,
        roleDisplayName: u.role_display_name,
        permissions: u.permissions || [],
        loggedInAt: u.logged_in_at,
      };
    }
    return null;
  }
}
