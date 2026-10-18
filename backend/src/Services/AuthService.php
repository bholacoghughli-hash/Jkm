<?php
declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Config\SessionManager;
use App\Utils\Validator;
use PDO;

/**
 * Authentication and Authorization Service
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class AuthService {
    /**
     * Authenticate user credentials with bcrypt/argon2id verification
     */
    public static function attempt(string $identifier, string $password): array {
        $ip = Validator::getClientIp();
        $rateLimiter = new RateLimiter();

        // 1. Check rate limiter lockout status
        $lockoutCheck = $rateLimiter->isLockedOut($ip, $identifier);
        if ($lockoutCheck['locked']) {
            AuditService::log('auth.locked_out', null, 'users', null, [
                'identifier' => $identifier,
                'lockout_minutes' => $lockoutCheck['lockout_minutes'],
            ]);
            return [
                'success' => false,
                'error'   => "Account temporarily locked due to excessive failed attempts. Please retry in {$lockoutCheck['lockout_minutes']} minutes.",
                'code'    => 'RATE_LIMITED',
                'status'  => 429,
            ];
        }

        // 2. Query user by username or email with native prepared statement
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->prepare("
                SELECT u.id, u.role_id, u.username, u.email, u.password_hash, u.full_name,
                       u.phone, u.status, r.name AS role_name, r.display_name AS role_display_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE (u.username = :ident OR u.email = :ident)
                LIMIT 1
            ");
            $stmt->execute([':ident' => $identifier]);
            $user = $stmt->fetch();

            // Generic error message to prevent user enumeration
            $genericError = 'Invalid username/email or password.';

            if (!$user) {
                $rateLimiter->recordAttempt($ip, $identifier, false);
                AuditService::log('auth.failed_user_not_found', null, 'users', null, [
                    'identifier' => $identifier,
                ]);
                return [
                    'success' => false,
                    'error'   => $genericError,
                    'code'    => 'INVALID_CREDENTIALS',
                    'status'  => 401,
                ];
            }

            // 3. Verify account active status
            if ($user['status'] !== 'active') {
                AuditService::log('auth.failed_inactive', (int)$user['id'], 'users', (string)$user['id'], [
                    'account_status' => $user['status'],
                ]);
                return [
                    'success' => false,
                    'error'   => 'Account is inactive or suspended. Please contact the Principal.',
                    'code'    => 'ACCOUNT_INACTIVE',
                    'status'  => 403,
                ];
            }

            // 4. Verify password hash
            if (!password_verify($password, $user['password_hash'])) {
                $rateLimiter->recordAttempt($ip, $identifier, false);
                AuditService::log('auth.failed_password_mismatch', (int)$user['id'], 'users', (string)$user['id'], [
                    'username' => $user['username'],
                ]);
                return [
                    'success' => false,
                    'error'   => $genericError,
                    'code'    => 'INVALID_CREDENTIALS',
                    'status'  => 401,
                ];
            }

            // 5. Successful login: record in rate limiter & update last login
            $rateLimiter->recordAttempt($ip, $identifier, true);

            $upd = $pdo->prepare("
                UPDATE users
                SET last_login_at = NOW(), last_login_ip = :ip
                WHERE id = :id
            ");
            $upd->execute([':ip' => $ip, ':id' => $user['id']]);

            // 6. Fetch permissions for this role
            $permStmt = $pdo->prepare("
                SELECT p.name
                FROM permissions p
                JOIN role_permissions rp ON p.id = rp.permission_id
                WHERE rp.role_id = :role_id
            ");
            $permStmt->execute([':role_id' => $user['role_id']]);
            $permissions = $permStmt->fetchAll(PDO::FETCH_COLUMN);

            // 7. Session Fixation Defense: Regenerate session ID
            SessionManager::start();
            SessionManager::regenerate();

            // 8. Store user in session
            $_SESSION['user'] = [
                'id'                => (int)$user['id'],
                'username'          => $user['username'],
                'email'             => $user['email'],
                'full_name'         => $user['full_name'],
                'phone'             => $user['phone'],
                'role_id'           => (int)$user['role_id'],
                'role_name'         => $user['role_name'],
                'role_display_name' => $user['role_display_name'],
                'permissions'       => $permissions,
                'logged_in_at'      => time(),
            ];

            // 9. Log successful login
            AuditService::log('auth.login_success', (int)$user['id'], 'users', (string)$user['id'], [
                'username' => $user['username'],
                'role'     => $user['role_name'],
            ]);

            return [
                'success' => true,
                'user'    => $_SESSION['user'],
                'csrf_token' => $_SESSION['csrf_token'],
            ];

        } catch (\Throwable $e) {
            error_log("AuthService attempt error: " . $e->getMessage());
            return [
                'success' => false,
                'error'   => 'An internal error occurred during authentication.',
                'code'    => 'INTERNAL_ERROR',
                'status'  => 500,
            ];
        }
    }

    /**
     * Get currently authenticated session user
     */
    public static function user(): ?array {
        SessionManager::start();
        return $_SESSION['user'] ?? null;
    }

    /**
     * Check if user is logged in
     */
    public static function check(): bool {
        return self::user() !== null;
    }

    /**
     * Check if user has specific permission
     */
    public static function hasPermission(string $permission): bool {
        $user = self::user();
        if (!$user) return false;
        if ($user['role_name'] === 'super_admin') return true;
        return in_array($permission, $user['permissions'] ?? [], true);
    }

    /**
     * Log out current user and destroy session
     */
    public static function logout(): void {
        SessionManager::start();
        $user = $_SESSION['user'] ?? null;
        if ($user) {
            AuditService::log('auth.logout', (int)$user['id'], 'users', (string)$user['id'], [
                'username' => $user['username'],
            ]);
        }
        SessionManager::destroy();
    }
}
