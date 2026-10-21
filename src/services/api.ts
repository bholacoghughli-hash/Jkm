/**
 * API Client for JK Montessori School ERP
 *
 * Rules:
 * 1. Uses secure HTTP cookies for PHP sessions.
 * 2. Sends CSRF tokens with state-changing requests.
 * 3. Never stores session tokens in localStorage.
 * 4. Requires an explicit API base URL.
 */

const configuredApiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL;

let apiBaseUrl: string = typeof configuredApiBaseUrl === "string"
  ? configuredApiBaseUrl.replace(/\/+$/, "")
  : "";

let currentCsrfToken: string | null = null;

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}

export function setApiBaseUrl(url: string): void {
  apiBaseUrl = url.trim().replace(/\/+$/, "");
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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  status: number;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
  const method = (options.method || "GET").toUpperCase();

  // Do not accidentally send requests to the frontend hosting URL.
  if (!apiBaseUrl) {
    return {
      success: false,
      error:
        "API base URL is not configured. Set VITE_API_BASE_URL to your PHP backend URL.",
      code: "API_BASE_URL_MISSING",
      status: 0,
    };
  }

  // Only allow HTTP(S) endpoints on the configured backend origin.
  let baseUrl: URL;

  try {
    baseUrl = new URL(apiBaseUrl);
  } catch {
    return {
      success: false,
      error: "The configured API base URL is invalid.",
      code: "INVALID_API_BASE_URL",
      status: 0,
    };
  }

  if (
    !["http:", "https:"].includes(baseUrl.protocol) ||
    (import.meta.env.PROD && baseUrl.protocol !== "https:")
  ) {
    return {
      success: false,
      error: "Production API must use a valid HTTPS URL.",
      code: "INSECURE_API_BASE_URL",
      status: 0,
    };
  }

  const cleanEndpoint = endpoint.replace(/^\/+/, "");

  // Reject absolute URLs and path traversal.
  if (
    !cleanEndpoint ||
    /^[a-z][a-z\d+.-]*:/i.test(cleanEndpoint) ||
    cleanEndpoint.startsWith("//") ||
    cleanEndpoint.split("/").some((part) => part === "..")
  ) {
    return {
      success: false,
      error: "Invalid API endpoint.",
      code: "INVALID_ENDPOINT",
      status: 0,
    };
  }

  const url = `${apiBaseUrl}/${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  if (
    options.body &&
    typeof options.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isMutation && !options.skipCsrf) {
    if (!currentCsrfToken) {
      return {
        success: false,
        error:
          "CSRF token is missing. Obtain a token from the backend before submitting this request.",
        code: "CSRF_TOKEN_MISSING",
        status: 0,
      };
    }

    headers.set("X-CSRF-Token", currentCsrfToken);
  }

  try {
    const response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: "include",
      redirect: "error",
    });

    const contentType = response.headers.get("content-type") || "";
    const json = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (json?.csrf_token && typeof json.csrf_token === "string") {
      setCsrfToken(json.csrf_token);
    }

    if (!response.ok) {
      return {
        success: false,
        error: json?.error || `Request failed (${response.status}).`,
        code: json?.code || "HTTP_ERROR",
        status: response.status,
      };
    }

    return {
      success: true,
      data: json as T,
      status: response.status,
    };
  } catch {
    return {
      success: false,
      error:
        "Could not connect to the PHP backend. Check the backend URL, server status, HTTPS, and CORS/session-cookie settings.",
      code: "NETWORK_ERROR",
      status: 0,
    };
  }
}
