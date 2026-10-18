<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Config\SessionManager;
use App\Utils\Response;

/**
 * CSRF Protection Middleware
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class CsrfMiddleware {
    /**
     * Validates CSRF token for unsafe HTTP methods (POST, PUT, DELETE, PATCH)
     */
    public static function handle(): void {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        if (in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
            return;
        }

        SessionManager::start();
        $sessionToken = $_SESSION['csrf_token'] ?? '';

        // Extract token from HTTP header or request body
        $headerToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
        if (!$headerToken) {
            $input = json_decode(file_get_contents('php://input'), true);
            $headerToken = $input['csrf_token'] ?? null;
        }

        if (empty($sessionToken) || empty($headerToken) || !hash_equals($sessionToken, (string)$headerToken)) {
            Response::error('CSRF token validation failed. State-changing request rejected.', 'CSRF_INVALID', 403);
        }
    }
}
