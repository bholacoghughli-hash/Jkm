<?php
declare(strict_types=1);

/**
 * JK Montessori School ERP — Safe CLI Super Admin Initialization
 * School: JK Montessori School, Subhash Chowk, Ghughli, Maharajganj, UP
 * Principal: Mr. Sanjay Kumar Mishra
 * Developed by Bhaskar Gautam
 * 
 * Usage:
 *   php create_super_admin.php
 * Or:
 *   php create_super_admin.php --username=admin --email=principal@jkmontessori.org --name="Mr. Sanjay Kumar Mishra" --password="SecurePassword123"
 */

// SECURITY: Strictly forbid execution from a web browser
if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    echo "Forbidden: This script can only be executed via the command line (CLI).\n";
    exit(1);
}

// Autoloader setup
$baseDir = dirname(__DIR__) . '/';
require_once $baseDir . 'config/database.php';
require_once $baseDir . 'src/Utils/Validator.php';
require_once $baseDir . 'src/Services/AuditService.php';

use App\Config\Database;
use App\Utils\Validator;
use App\Services\AuditService;

echo "========================================================\n";
echo "  JK MONTESSORI SCHOOL ERP — SUPER ADMIN INITIALIZER\n";
echo "  Location: Subhash Chowk, Block Ghughli, Maharajganj\n";
echo "  Developed by Bhaskar Gautam\n";
echo "========================================================\n\n";

// Parse CLI options
$options = getopt('', ['username::', 'email::', 'name::', 'password::']);

$username = $options['username'] ?? null;
$email    = $options['email'] ?? null;
$name     = $options['name'] ?? null;
$password = $options['password'] ?? null;

// Helper to prompt if option not provided
function prompt(string $message): string {
    echo $message . ": ";
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    fclose($handle);
    return trim((string)$line);
}

if (empty($username)) {
    $username = prompt("Enter Super Admin Username [e.g. principal_admin]");
}
if (empty($email)) {
    $email = prompt("Enter Super Admin Email [e.g. principal@jkmontessori.org]");
}
if (empty($name)) {
    $name = prompt("Enter Administrator Full Name [e.g. Mr. Sanjay Kumar Mishra]");
}
if (empty($password)) {
    $password = prompt("Enter Super Admin Password (min 8 chars, 1 uppercase, 1 digit)");
}

// Validation
if (!Validator::validateUsername($username)) {
    echo "\n[ERROR] Invalid username. Must be 3-30 characters (letters, numbers, _ -).\n";
    exit(1);
}

if (!Validator::validateEmail($email)) {
    echo "\n[ERROR] Invalid email address format.\n";
    exit(1);
}

$pwErrors = Validator::validatePassword($password);
if (!empty($pwErrors)) {
    echo "\n[ERROR] Password does not meet security requirements:\n";
    foreach ($pwErrors as $err) {
        echo "  - {$err}\n";
    }
    exit(1);
}

try {
    $pdo = Database::getConnection();

    // Check if role 1 (super_admin) exists
    $roleStmt = $pdo->prepare("SELECT id FROM roles WHERE name = 'super_admin' LIMIT 1");
    $roleStmt->execute();
    $role = $roleStmt->fetch();

    if (!$role) {
        echo "\n[ERROR] The 'super_admin' role is missing. Please run database migrations first:\n";
        echo "  mysql -u root jkmontessori_erp < migrations/001_create_tables.sql\n";
        echo "  mysql -u root jkmontessori_erp < migrations/002_seed_initial_data.sql\n";
        exit(1);
    }

    $roleId = (int)$role['id'];

    // Check if user already exists
    $userCheck = $pdo->prepare("SELECT id, username FROM users WHERE username = :u OR email = :e LIMIT 1");
    $userCheck->execute([':u' => $username, ':e' => $email]);
    $existing = $userCheck->fetch();

    if ($existing) {
        echo "\n[ERROR] A user with this username or email already exists (User ID: {$existing['id']}).\n";
        echo "For security, existing Super Admins cannot be overwritten by this script.\n";
        exit(1);
    }

    // Hash password with bcrypt cost 12
    $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    $insert = $pdo->prepare("
        INSERT INTO users (role_id, username, email, password_hash, full_name, status, created_at)
        VALUES (:role_id, :username, :email, :password_hash, :name, 'active', NOW())
    ");

    $insert->execute([
        ':role_id'       => $roleId,
        ':username'      => $username,
        ':email'         => $email,
        ':password_hash' => $passwordHash,
        ':name'          => $name,
    ]);

    $newId = (int)$pdo->lastInsertId();

    AuditService::log('admin.initialized_via_cli', $newId, 'users', (string)$newId, [
        'username' => $username,
        'email'    => $email,
        'role'     => 'super_admin',
    ]);

    echo "\n[SUCCESS] Super Admin account created successfully!\n";
    echo "--------------------------------------------------------\n";
    echo "  User ID   : {$newId}\n";
    echo "  Username  : {$username}\n";
    echo "  Email     : {$email}\n";
    echo "  Full Name : {$name}\n";
    echo "  Role      : Super Administrator (Role ID: {$roleId})\n";
    echo "--------------------------------------------------------\n";
    echo "You can now log in through the ERP web interface or the API.\n\n";

} catch (\Throwable $e) {
    echo "\n[EXCEPTION] Failed to create Super Admin: " . $e->getMessage() . "\n";
    exit(1);
}
