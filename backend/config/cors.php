<?php
declare(strict_types=1);

namespace App\Config;

/**
 * CORS Middleware Configuration
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class Cors {
    public static function handle(): void {
        $allowedOrigins = array_filter(array_map('trim', explode(',', getenv('CORS_ALLOWED_ORIGINS') ?: 'http://localhost:3000,http://127.0.0.1:3000')));
        
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (!empty($origin)) {
            // Check if origin is allowed or if in local development
            $isAllowed = in_array($origin, $allowedOrigins, true) ||
                         str_starts_with($origin, 'http://localhost:') ||
                         str_starts_with($origin, 'http://127.0.0.1:') ||
                         str_ends_with($origin, '.run.app'); // AI Studio cloud run previews

            if ($isAllowed) {
                header("Access-Control-Allow-Origin: {$origin}");
                header('Access-Control-Allow-Credentials: true');
                header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token, Accept');
                header('Access-Control-Max-Age: 86400');
            }
        }

        // Handle pre-flight OPTIONS request immediately
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
