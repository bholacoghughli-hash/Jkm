<?php
declare(strict_types=1);

namespace App\Config;

/**
 * Secure Session Configuration
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class SessionManager {
    public static function start(): void {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        $lifetime = (int)(getenv('SESSION_LIFETIME') ?: 7200); // 2 hours default
        $isSecure = filter_var(getenv('SESSION_SECURE_COOKIE') ?: false, FILTER_VALIDATE_BOOLEAN);
        $sameSite = getenv('SESSION_SAME_SITE') ?: 'Lax';

        // Set session parameters before starting
        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');
        ini_set('session.cookie_httponly', '1');
        
        session_set_cookie_params([
            'lifetime' => $lifetime,
            'path'     => '/',
            'domain'   => '', // default host
            'secure'   => $isSecure,
            'httponly' => true,
            'samesite' => $sameSite,
        ]);

        session_name('JKM_SESSION');
        session_start();

        // Initialize CSRF token if not already generated
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
    }

    /**
     * Regenerates the session ID to prevent session fixation attacks
     */
    public static function regenerate(): void {
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_regenerate_id(true);
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
    }

    /**
     * Completely invalidates and destroys current session
     */
    public static function destroy(): void {
        if (session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = [];
            if (ini_get('session.use_cookies')) {
                $params = session_get_cookie_params();
                setcookie(
                    session_name(),
                    '',
                    time() - 42000,
                    $params['path'],
                    $params['domain'],
                    $params['secure'],
                    $params['httponly']
                );
            }
            session_destroy();
        }
    }
}
