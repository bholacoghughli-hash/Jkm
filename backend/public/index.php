<?php
declare(strict_types=1);

/**
 * JK Montessori School ERP — API Entry Point & Front Controller
 * School: JK Montessori School, Subhash Chowk, Ghughli, Maharajganj, UP
 * Principal: Mr. Sanjay Kumar Mishra
 * Developed by Bhaskar Gautam
 */

// Error handling configuration
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// PSR-4 Style Autoloader for App\* namespace
spl_autoload_register(function (string $class) {
    $prefix = 'App\\';
    $baseDir = dirname(__DIR__) . '/';

    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    
    // Check config/
    if (str_starts_with($relativeClass, 'Config\\')) {
        $file = $baseDir . 'config/' . substr($relativeClass, 7) . '.php';
    } else {
        $file = $baseDir . 'src/' . str_replace('\\', '/', $relativeClass) . '.php';
    }

    if (file_exists($file)) {
        require_once $file;
    }
});

use App\Config\Cors;
use App\Config\SessionManager;
use App\Controllers\AuthController;
use App\Controllers\AcademicController;
use App\Controllers\SystemController;
use App\Middleware\CsrfMiddleware;
use App\Utils\Response;

// 1. Handle CORS immediately for pre-flight and regular requests
Cors::handle();

// 2. Start Secure Session
SessionManager::start();

// 3. Parse incoming route URI
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Normalize path by stripping base script directory or public prefixes if running under subdirectory
$scriptName = dirname($_SERVER['SCRIPT_NAME'] ?? '');
if ($scriptName !== '/' && !empty($scriptName) && str_starts_with($requestUri, $scriptName)) {
    $requestUri = substr($requestUri, strlen($scriptName));
}
$path = '/' . trim($requestUri, '/');

// Router Dispatcher
try {
    // Health & System Probe
    if ($path === '/api/v1/health' && $method === 'GET') {
        (new SystemController())->health();
        exit;
    }

    // CSRF Token retrieval
    if ($path === '/api/v1/auth/csrf' && $method === 'GET') {
        (new AuthController())->csrf();
        exit;
    }

    // Login (Public, Throttled, Rate-Limited)
    if ($path === '/api/v1/auth/login' && $method === 'POST') {
        (new AuthController())->login();
        exit;
    }

    // Logout (Session Invalidation)
    if ($path === '/api/v1/auth/logout' && $method === 'POST') {
        CsrfMiddleware::handle();
        (new AuthController())->logout();
        exit;
    }

    // Current Session Profile
    if ($path === '/api/v1/auth/me' && $method === 'GET') {
        (new AuthController())->me();
        exit;
    }

    // Academic Classes & Sections
    if ($path === '/api/v1/academic/classes' && $method === 'GET') {
        (new AcademicController())->getClasses();
        exit;
    }

    // Academic Sessions
    if ($path === '/api/v1/academic/sessions' && $method === 'GET') {
        (new AcademicController())->getSessions();
        exit;
    }

    // Audit Logs (Protected)
    if ($path === '/api/v1/audit-logs' && $method === 'GET') {
        (new SystemController())->auditLogs();
        exit;
    }

    // Fallback: 404 Not Found
    Response::notFound("Endpoint not found: [{$method}] {$path}");

} catch (\Throwable $e) {
    error_log("Unhandled Application Exception: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    Response::serverError('An unexpected server error occurred.');
}
