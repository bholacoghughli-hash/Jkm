<?php
declare(strict_types=1);

namespace App\Services;

use App\Config\Database;
use App\Utils\Validator;

/**
 * Audit Logging Service
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class AuditService {
    /**
     * Records an immutable administrative or authentication event
     */
    public static function log(
        string $action,
        ?int $userId = null,
        ?string $entityType = null,
        ?string $entityId = null,
        array $details = []
    ): void {
        try {
            $pdo = Database::getConnection();
            $ip = Validator::getClientIp();
            $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 255);
            $jsonDetails = !empty($details) ? json_encode($details, JSON_UNESCAPED_UNICODE) : null;

            $stmt = $pdo->prepare("
                INSERT INTO audit_logs (user_id, action, entity_type, entity_id, ip_address, user_agent, details, created_at)
                VALUES (:user_id, :action, :entity_type, :entity_id, :ip, :user_agent, :details, NOW())
            ");

            $stmt->execute([
                ':user_id'     => $userId,
                ':action'      => $action,
                ':entity_type' => $entityType,
                ':entity_id'   => $entityId,
                ':ip'          => $ip,
                ':user_agent'  => $userAgent,
                ':details'     => $jsonDetails,
            ]);
        } catch (\Throwable $e) {
            error_log("AuditService Error: " . $e->getMessage());
        }
    }

    /**
     * Retrieve recent audit logs for Super Admin inspection
     */
    public static function getRecent(int $limit = 50): array {
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->prepare("
                SELECT a.id, a.action, a.entity_type, a.entity_id, a.ip_address, a.details, a.created_at,
                       u.username, u.full_name, r.name AS role_name
                FROM audit_logs a
                LEFT JOIN users u ON a.user_id = u.id
                LEFT JOIN roles r ON u.role_id = r.id
                ORDER BY a.id DESC
                LIMIT :limit
            ");
            $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (\Throwable $e) {
            error_log("AuditService getRecent Error: " . $e->getMessage());
            return [];
        }
    }
}
