<?php
declare(strict_types=1);

namespace App\Utils;

/**
 * Standardized JSON API Response Helper
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class Response {
    public static function json(array $data, int $statusCode = 200): void {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=UTF-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function success(string $message, array $extra = [], int $statusCode = 200): void {
        self::json(array_merge([
            'success' => true,
            'message' => $message,
        ], $extra), $statusCode);
    }

    public static function error(string $message, string $code = 'BAD_REQUEST', int $statusCode = 400, array $errors = []): void {
        $payload = [
            'success' => false,
            'error'   => $message,
            'code'    => $code,
        ];
        if (!empty($errors)) {
            $payload['validation_errors'] = $errors;
        }
        self::json($payload, $statusCode);
    }

    public static function unauthorized(string $message = 'Authentication required.'): void {
        self::error($message, 'UNAUTHORIZED', 401);
    }

    public static function forbidden(string $message = 'You do not have permission to perform this action.'): void {
        self::error($message, 'FORBIDDEN', 403);
    }

    public static function notFound(string $message = 'Resource not found.'): void {
        self::error($message, 'NOT_FOUND', 404);
    }

    public static function serverError(string $message = 'Internal server error occurred.'): void {
        self::error($message, 'INTERNAL_SERVER_ERROR', 500);
    }
}
