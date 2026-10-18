<?php
declare(strict_types=1);

namespace App\Config;

use PDO;
use PDOException;

/**
 * Database Connection Manager (PDO Singleton)
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class Database {
    private static ?PDO $instance = null;

    private function __construct() {}
    private function __clone() {}

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            // Read environment variables or load defaults
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $db   = getenv('DB_NAME') ?: 'jkmontessori_erp';
            $user = getenv('DB_USER') ?: 'root';
            $pass = getenv('DB_PASSWORD') !== false ? getenv('DB_PASSWORD') : '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                // Crucial security control: forces native database prepared statements
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::ATTR_PERSISTENT         => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                error_log("Database Connection Failure: " . $e->getMessage());
                http_response_code(500);
                header('Content-Type: application/json; charset=UTF-8');
                echo json_encode([
                    'success' => false,
                    'error' => 'Database connection failed. Verify MySQL service is active in XAMPP.',
                    'code' => 'DB_CONNECTION_FAILED'
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }
        }

        return self::$instance;
    }

    /**
     * Checks if the database is reachable without terminating execution
     */
    public static function testConnection(): array {
        try {
            $pdo = self::getConnection();
            $stmt = $pdo->query("SELECT 1 AS alive, DATABASE() AS db_name, VERSION() AS version");
            $result = $stmt->fetch();
            return [
                'connected' => true,
                'database' => $result['db_name'] ?? 'unknown',
                'version' => $result['version'] ?? 'unknown',
            ];
        } catch (\Throwable $e) {
            return [
                'connected' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
