/**
 * API Client for JK Montessori School ERP
 * Developed by Bhaskar Gautam
 * 
 * Rules:
 * 1. Always uses credentials: "include" for secure HTTP cookies.
 * 2. Attaches X-CSRF-Token for state-changing operations.
 * 3. Never stores secrets or session tokens in localStorage.
 */

let apiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost/jkmontessori_erp/backend/public';
let currentCsrfToken: string | null = null;

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}

export function setApiBaseUrl(url: string): void {
  apiBaseUrl = url.replace(/\/+$/, '');
}

export function getCsrfToken(): string | null {
  return currentCsrfToken;
}

export function setCsrfToken(token: string | null): void {
  currentCsrfToken = token;
}

export interface ApiFetchOptions extends RequestInit {
  skipCsrf?: boolean;
}

/**
 * Perform an HTTP request to the PHP backend
 */
export async function apiFetch<T = any>(endpoint: string, options: ApiFetchOptions = {}): Promise<{
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  status: number;
}> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${apiBaseUrl}${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Attach CSRF Token for mutating requests
  const method = (options.method || 'GET').toUpperCase();
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && !options.skipCsrf && currentCsrfToken) {
    headers.set('X-CSRF-Token', currentCsrfToken);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Essential for PHP session cookies
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const json = isJson ? await response.json() : null;

    if (json?.csrf_token) {
      setCsrfToken(json.csrf_token);
    }

    if (!response.ok) {
      return {
        success: false,
        error: json?.error || `Request failed with status ${response.status}`,
        code: json?.code || 'HTTP_ERROR',
        status: response.status,
      };
    }

    return {
      success: true,
      data: json,
      status: response.status,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error: could not connect to PHP server. Verify XAMPP is running.',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  }
}
