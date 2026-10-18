<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Config\SessionManager;
use App\Services\AuthService;
use App\Utils\Response;
use App\Utils\Validator;

/**
 * Authentication Controller
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class AuthController {
    /**
     * POST /api/v1/auth/login
     */
    public function login(): void {
        $body = Validator::getJsonBody();
        $identifier = Validator::sanitizeString($body['identifier'] ?? $body['username'] ?? '');
        $password = $body['password'] ?? '';

        if (empty($identifier) || empty($password)) {
            Response::error('Username or email and password are required.', 'VALIDATION_ERROR', 422, [
                'identifier' => empty($identifier) ? 'Required' : null,
                'password'   => empty($password) ? 'Required' : null,
            ]);
        }

        $result = AuthService::attempt($identifier, $password);

        if (!$result['success']) {
            Response::error(
                $result['error'],
                $result['code'] ?? 'LOGIN_FAILED',
                $result['status'] ?? 401
            );
        }

        Response::success('Authentication successful.', [
            'user'       => $result['user'],
            'csrf_token' => $result['csrf_token'],
        ]);
    }

    /**
     * POST /api/v1/auth/logout
     */
    public function logout(): void {
        AuthService::logout();
        Response::success('Logged out successfully.');
    }

    /**
     * GET /api/v1/auth/me
     */
    public function me(): void {
        $user = AuthService::user();
        if (!$user) {
            Response::unauthorized('Not authenticated.');
        }

        Response::success('Active user session retrieved.', [
            'user'       => $user,
            'csrf_token' => $_SESSION['csrf_token'] ?? null,
        ]);
    }

    /**
     * GET /api/v1/auth/csrf
     */
    public function csrf(): void {
        SessionManager::start();
        Response::success('CSRF token retrieved.', [
            'csrf_token' => $_SESSION['csrf_token'],
        ]);
    }
}
