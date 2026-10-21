import {
  apiFetch,
  getApiBaseUrl,
  getCsrfToken,
  setCsrfToken,
} from './api.ts';

import type {
  AuthUser,
  BackendHealth,
  LoginCredentials,
} from '../types/index.ts';

/**
 * Authentication Service for JK Montessori School ERP
 *
 * Uses the PHP backend session for authentication.
 * The backend must independently validate credentials,
 * CSRF tokens, permissions, and session security.
 */

export class AuthService {
  /**
   * Check PHP backend and database health.
   */
  static async checkBackendHealth(): Promise<BackendHealth> {
    const res = await apiFetch('/api/v1/health', {
      method: 'GET',
      skipCsrf: true,
    });

    if (!res.success || !res.data) {
      return {
        isOnline: false,
        statusText: 'PHP Backend Offline',
        apiUrl: getApiBaseUrl(),
        error:
          res.error ||
          'Cannot connect to the PHP backend. Check the server URL.',
      };
    }

    const payload = res.data;
    const db = payload.database;

    return {
      isOnline: true,
      statusText: db?.connected
        ? 'Online & MySQL Connected'
        : 'Online (MySQL Disconnected)',
      phpVersion: payload.php_version,
      databaseConnected: db?.connected ?? false,
      databaseName: db?.database ?? 'jkmontessori_erp',
      serverTime: payload.server_time,
      apiUrl: getApiBaseUrl(),
    };
  }

  /**
   * Fetch a CSRF token from the PHP session.
   */
  static async fetchCsrfToken(): Promise<string | null> {
    const res = await apiFetch('/api/v1/auth/csrf', {
      method: 'GET',
      skipCsrf: true,
    });

    const token = res.success ? res.data?.csrf_token : null;

    if (typeof token !== 'string' || token.length === 0) {
      setCsrfToken(null);
      return null;
    }

    setCsrfToken(token);
    return token;
  }

  /**
   * Authenticate using the PHP session backend.
   */
  static async login(
    credentials: LoginCredentials
  ): Promise<{
    success: boolean;
    user?: AuthUser;
    error?: string;
    code?: string;
    isSimulation?: boolean;
  }> {
    const identifier = credentials.identifier?.trim();

    if (!identifier || !credentials.password) {
      return {
        success: false,
        error: 'Enter your username/email and password.',
        code: 'MISSING_CREDENTIALS',
      };
    }

    // Obtain a valid CSRF token before sending the login POST.
    const csrfToken = await this.fetchCsrfToken();

    if (!csrfToken || !getCsrfToken()) {
      return {
        success: false,
        error:
          'Could not obtain a CSRF security token. Check the PHP backend and try again.',
        code: 'CSRF_TOKEN_MISSING',
      };
    }

    const res = await apiFetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        ...credentials,
        identifier,
      }),
    });

    if (!res.success || !res.data?.user) {
      return {
        success: false,
        error: res.error || 'Login failed. Check your credentials and server.',
        code: res.code || 'AUTH_FAILED',
      };
    }

    const u = res.data.user;

    const user: AuthUser = {
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.full_name,
      phone: u.phone,
      roleName: u.role_name,
      roleDisplayName: u.role_display_name,
      permissions: Array.isArray(u.permissions) ? u.permissions : [],
      loggedInAt: u.logged_in_at || Date.now(),
    };

    return {
      success: true,
      user,
    };
  }

  /**
   * Log out from the PHP session.
   */
  static async logout(): Promise<boolean> {
    try {
      // Fetch a token if the current session does not have one.
      if (!getCsrfToken()) {
        const token = await this.fetchCsrfToken();

        if (!token) {
          return false;
        }
      }

      const res = await apiFetch('/api/v1/auth/logout', {
        method: 'POST',
      });

      if (res.success) {
        setCsrfToken(null);
      }

      return res.success;
    } catch {
      return false;
    }
  }

  /**
   * Get the authenticated user from the PHP session.
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    const res = await apiFetch('/api/v1/auth/me', {
      method: 'GET',
      skipCsrf: true,
    });

    if (!res.success || !res.data?.user) {
      return null;
    }

    const u = res.data.user;

    return {
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.full_name,
      phone: u.phone,
      roleName: u.role_name,
      roleDisplayName: u.role_display_name,
      permissions: Array.isArray(u.permissions) ? u.permissions : [],
      loggedInAt: u.logged_in_at || Date.now(),
    };
  }
}
