<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Services\AuthService;
use App\Utils\Response;

/**
 * Authentication Middleware
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class AuthMiddleware {
    /**
     * Enforce active user session
     */
    public static function handle(): array {
        $user = AuthService::user();
        if (!$user) {
            Response::unauthorized('Session expired or not authenticated. Please log in.');
        }
        return $user;
    }
}
