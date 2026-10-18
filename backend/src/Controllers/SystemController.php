<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Middleware\RoleMiddleware;
use App\Services\AuditService;
use App\Utils\Response;

/**
 * System Controller
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class SystemController {
    /**
     * GET /api/v1/health
     */
    public function health(): void {
        $dbStatus = Database::testConnection();

        Response::json([
            'success'     => true,
            'status'      => 'online',
            'app_name'    => 'JK Montessori School ERP Backend',
            'principal'   => 'Mr. Sanjay Kumar Mishra',
            'developer'   => 'Bhaskar Gautam',
            'php_version' => PHP_VERSION,
            'server_time' => date('Y-m-d H:i:s T'),
            'database'    => $dbStatus,
        ]);
    }

    /**
     * GET /api/v1/audit-logs (SuperAdmin / Principal only)
     */
    public function auditLogs(): void {
        RoleMiddleware::requireRole('super_admin', 'principal');
        $logs = AuditService::getRecent(50);
        Response::success('Audit logs retrieved.', ['logs' => $logs]);
    }
}
