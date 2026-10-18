<?php
declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use PDO;

/**
 * Login Rate Limiting & Brute Force Defense
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class RateLimiter {
    private int $maxAttempts;
    private int $lockoutMinutes;

    public function __construct(int $maxAttempts = 5, int $lockoutMinutes = 15) {
        $this->maxAttempts = (int)(getenv('LOGIN_MAX_ATTEMPTS') ?: $maxAttempts);
        $this->lockoutMinutes = (int)(getenv('LOGIN_LOCKOUT_MINUTES') ?: $lockoutMinutes);
    }

    /**
     * Checks if IP or username is currently locked out
     */
    public function isLockedOut(string $ipAddress, string $username): array {
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->prepare("
                SELECT COUNT(*) AS failed_count,
                       MAX(attempted_at) AS last_attempt
                FROM login_attempts
                WHERE (ip_address = :ip OR username = :username)
                  AND success = 0
                  AND attempted_at >= NOW() - INTERVAL :minutes MINUTE
            ");

            $stmt->bindValue(':ip', $ipAddress);
            $stmt->bindValue(':username', $username);
            $stmt->bindValue(':minutes', $this->lockoutMinutes, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch();

            $failedCount = (int)($row['failed_count'] ?? 0);

            if ($failedCount >= $this->maxAttempts) {
                return [
                    'locked' => true,
                    'remaining_attempts' => 0,
                    'lockout_minutes' => $this->lockoutMinutes,
                ];
            }

            return [
                'locked' => false,
                'remaining_attempts' => max(0, $this->maxAttempts - $failedCount),
            ];
        } catch (\Throwable $e) {
            // Fail open on rate limiter DB exception so system stays usable
            error_log("RateLimiter error: " . $e->getMessage());
            return ['locked' => false, 'remaining_attempts' => $this->maxAttempts];
        }
    }

    /**
     * Records a login attempt result
     */
    public function recordAttempt(string $ipAddress, string $username, bool $success): void {
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->prepare("
                INSERT INTO login_attempts (ip_address, username, success, attempted_at)
                VALUES (:ip, :username, :success, NOW())
            ");
            $stmt->execute([
                ':ip'       => $ipAddress,
                ':username' => $username,
                ':success'  => $success ? 1 : 0,
            ]);

            // If successful, clear previous failures for this username and IP
            if ($success) {
                $del = $pdo->prepare("
                    DELETE FROM login_attempts
                    WHERE (ip_address = :ip OR username = :username)
                      AND success = 0
                ");
                $del->execute([':ip' => $ipAddress, ':username' => $username]);
            }
        } catch (\Throwable $e) {
            error_log("RateLimiter record error: " . $e->getMessage());
        }
    }
}
