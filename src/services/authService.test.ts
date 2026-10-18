import test from 'node:test';
import assert from 'node:assert/strict';
import { getApiBaseUrl, setApiBaseUrl, getCsrfToken, setCsrfToken } from './api.ts';
import { AuthService } from './authService.ts';

test('getApiBaseUrl and setApiBaseUrl maintain configured backend endpoint without trailing slash', () => {
  const original = getApiBaseUrl();
  setApiBaseUrl('http://localhost/jkmontessori_erp/backend/public/');
  assert.equal(getApiBaseUrl(), 'http://localhost/jkmontessori_erp/backend/public');

  setApiBaseUrl('http://127.0.0.1:8000///');
  assert.equal(getApiBaseUrl(), 'http://127.0.0.1:8000');

  // restore
  setApiBaseUrl(original);
});

test('getCsrfToken and setCsrfToken properly store and clear session tokens in memory without localStorage', () => {
  assert.equal(getCsrfToken(), null);

  const mockToken = '4f8d9a2b6e1c3f5a7e9b0d2f4a6c8e0b1d3f5a7e9b0d2f4a6c8e0b1d3f5a7e9b';
  setCsrfToken(mockToken);
  assert.equal(getCsrfToken(), mockToken);

  setCsrfToken(null);
  assert.equal(getCsrfToken(), null);
});

test('checkBackendHealth safely handles unreachable server and reports offline status without throwing', async () => {
  // Point to a non-existent port to test network failure handling
  const original = getApiBaseUrl();
  setApiBaseUrl('http://127.0.0.1:54321');

  const health = await AuthService.checkBackendHealth();
  assert.equal(health.isOnline, false);
  assert.ok(health.statusText.includes('Offline'));
  assert.ok(health.error);

  setApiBaseUrl(original);
});

test('login rejects gracefully when server is offline without claiming false success', async () => {
  const original = getApiBaseUrl();
  setApiBaseUrl('http://127.0.0.1:54321');

  const result = await AuthService.login({
    identifier: 'admin',
    password: 'WrongPassword123!',
  });

  assert.equal(result.success, false);
  assert.ok(result.error);

  setApiBaseUrl(original);
});
