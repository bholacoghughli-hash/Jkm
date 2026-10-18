<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Services\AuthService;
use App\Utils\Response;

/**
 * Role and Permission Authorization Middleware
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class RoleMiddleware {
    /**
     * Enforce specific role
     */
    public static function requireRole(string ...$allowedRoles): array {
        $user = AuthMiddleware::handle();
        $userRole = $user['role_name'] ?? '';

        if (!in_array($userRole, $allowedRoles, true)) {
            Response::forbidden('Access denied. Role not authorized for this resource.');
        }

        return $user;
    }

    /**
     * Enforce specific permission
     */
    public static function requirePermission(string $permission): array {
        $user = AuthMiddleware::handle();

        if (!AuthService::hasPermission($permission)) {
            Response::forbidden("Access denied. Missing permission: {$permission}");
        }

        return $user;
    }
}
