# JK Montessori School ERP — Backend Architecture & Integration Plan
**Project:** JK Montessori School (Nursery to Class 12)  
**Location:** Subhash Chowk, Block Ghughli, District Maharajganj, Uttar Pradesh, India  
**Principal:** Mr. Sanjay Kumar Mishra  
**Creator & Architect:** Bhaskar Gautam  
**Phase 1 Deliverable:** Phase 2 PHP 8+ & MySQL PDO Backend Blueprint  

---

## 1. Executive Summary & Design Principles

The intended production backend for the **JK Montessori School ERP** is built on **PHP 8.2+** and **MySQL 8.0+**, deployed on an Apache/Nginx web server or containerized micro-service architecture.

### Core Architectural Axioms
1. **Zero Client-Side Trust:** All inputs (admissions, fee transactions, attendance markers, grades) are strictly sanitized and validated server-side.
2. **Mandatory PDO Prepared Statements:** No SQL string concatenation is permitted anywhere in the codebase. Every database operation uses parameterized queries to eliminate SQL injection attacks completely.
3. **No Hardcoded Credentials:** Database credentials (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`), JWT secrets, and SMS gateway tokens are loaded exclusively from `.env` files outside the web root (`public_html`).
4. **Stateless JWT with HttpOnly Secure Cookies:** Sessions for Principals, Teachers, Staff, and Parents are token-based with CSRF protection and role-based access control (RBAC).
5. **Audit Trail (HIPAA/FERPA Equivalent for Indian Schools):** Sensitive mutations (fee concessions, exam mark alterations, student deletions) are logged immutably into `audit_logs` with actor IP and timestamp.

---

## 2. Directory Layout (PHP 8+ PSR-4 Standard)

```text
jk-montessori-backend/
├── config/
│   ├── database.php        # PDO connection pool singleton with SSL options
│   ├── app.php             # School global constants & timezone (Asia/Kolkata)
│   └── security.php        # CORS headers, rate limiting & CSRF validation
├── src/
│   ├── Controllers/        # Request handling & HTTP response codes
│   │   ├── AuthController.php
│   │   ├── StudentController.php
│   │   ├── FeeController.php
│   │   ├── AttendanceController.php
│   │   └── ExamController.php
│   ├── Middleware/
│   │   ├── AuthMiddleware.php        # JWT verification
│   │   ├── RoleMiddleware.php        # RBAC enforcer (Principal, Teacher, etc.)
│   │   └── RateLimiterMiddleware.php # Anti brute-force for login
│   ├── Models/             # Active PDO query builders with prepared statements
│   │   ├── Student.php
│   │   ├── FeeInvoice.php
│   │   ├── Attendance.php
│   │   └── User.php
│   └── Utils/
│       ├── Validator.php   # Rigorous input schemas
│       └── Logger.php      # Audit log writer
├── public/                 # Web server DocumentRoot
│   ├── index.php           # Front controller & router
│   ├── .htaccess           # URL rewriting & security headers
│   └── api/
│       └── v1/             # REST API routes
├── migrations/             # Idempotent SQL schema migrations
│   └── 001_initial_schema.sql
├── .env.example            # Environment blueprint (no secrets committed)
└── composer.json           # Autoloading & security packages
```

---

## 3. Database Connection: Secure PDO Singleton (`config/database.php`)

```php
<?php
declare(strict_types=1);

namespace App\Config;

use PDO;
use PDOException;

final class Database {
    private static ?PDO $instance = null;

    private function __construct() {}
    private function __clone() {}

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $db   = getenv('DB_DATABASE') ?: 'jk_montessori_erp';
            $user = getenv('DB_USERNAME') ?: 'jk_erp_user';
            $pass = getenv('DB_PASSWORD') ?: '';
            $charset = 'utf8mb4';

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false, // Forces true native prepared statements
                PDO::ATTR_PERSISTENT         => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // Never expose database passwords or system internals in error responses
                error_log("Database Connection Failure: " . $e->getMessage());
                http_response_code(500);
                echo json_encode(['error' => 'Service temporarily unavailable. Contact administrator.']);
                exit;
            }
        }
        return self::$instance;
    }
}
```

---

## 4. Key MySQL Relational Schemas (DDL Blueprint)

```sql
-- 1. Academic Classes & Sections (Nursery to Class 12)
CREATE TABLE classes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    class_code VARCHAR(20) NOT NULL UNIQUE, -- e.g. NURSERY, LKG, UKG, CLASS_1 ... CLASS_12
    class_name VARCHAR(50) NOT NULL,
    wing ENUM('primary', 'middle', 'secondary', 'senior_secondary') NOT NULL,
    display_order SMALLINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sections (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    class_id INT UNSIGNED NOT NULL,
    section_name VARCHAR(10) NOT NULL, -- 'A', 'B', 'Montessori Rose'
    max_capacity SMALLINT UNSIGNED DEFAULT 40,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY uk_class_section (class_id, section_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Students Master Table
CREATE TABLE students (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    admission_no VARCHAR(30) NOT NULL UNIQUE,
    enrollment_no VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    blood_group VARCHAR(5) NULL,
    current_class_id INT UNSIGNED NOT NULL,
    current_section_id INT UNSIGNED NOT NULL,
    parent_name VARCHAR(100) NOT NULL,
    parent_phone VARCHAR(15) NOT NULL,
    parent_email VARCHAR(100) NULL,
    address_line TEXT NOT NULL,
    district VARCHAR(50) DEFAULT 'Maharajganj',
    state VARCHAR(50) DEFAULT 'Uttar Pradesh',
    pin_code VARCHAR(10) DEFAULT '273151',
    status ENUM('active', 'inactive', 'transferred', 'alumni') DEFAULT 'active',
    admission_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (current_class_id) REFERENCES classes(id),
    FOREIGN KEY (current_section_id) REFERENCES sections(id),
    INDEX idx_student_search (admission_no, parent_phone, current_class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Fee Ledgers & Payments
CREATE TABLE fee_heads (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    head_name VARCHAR(50) NOT NULL, -- Tuition Fee, Exam Fee, Transport, Computer Lab
    is_recurring BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fee_invoices (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(40) NOT NULL UNIQUE,
    student_id INT UNSIGNED NOT NULL,
    academic_year VARCHAR(20) NOT NULL, -- e.g. '2026-2027'
    term_quarter ENUM('Q1', 'Q2', 'Q3', 'Q4') NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    concession_amount DECIMAL(10,2) DEFAULT 0.00,
    net_payable DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('unpaid', 'partially_paid', 'paid', 'overdue') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT,
    INDEX idx_invoice_status (student_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE fee_payments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    receipt_number VARCHAR(40) NOT NULL UNIQUE,
    invoice_id INT UNSIGNED NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_mode ENUM('cash', 'upi', 'cheque', 'bank_transfer') NOT NULL,
    transaction_reference VARCHAR(100) NULL,
    collected_by INT UNSIGNED NOT NULL, -- Staff/Accountant User ID
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks VARCHAR(255) NULL,
    FOREIGN KEY (invoice_id) REFERENCES fee_invoices(id),
    INDEX idx_receipt_num (receipt_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Daily Attendance
CREATE TABLE student_attendance (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id INT UNSIGNED NOT NULL,
    class_id INT UNSIGNED NOT NULL,
    section_id INT UNSIGNED NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('present', 'absent', 'late', 'half_day', 'excused') NOT NULL,
    marked_by INT UNSIGNED NOT NULL,
    remarks VARCHAR(150) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE KEY uk_student_day_att (student_id, attendance_date),
    INDEX idx_class_date (class_id, section_id, attendance_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 5. Sample Prepared Statement Implementation (`src/Controllers/FeeController.php`)

```php
<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use PDO;

class FeeController {
    /**
     * Records a fee payment with transaction isolation and prepares an official receipt
     */
    public function recordPayment(array $payload, int $staffUserId): array {
        $db = Database::getConnection();

        // 1. Rigorous server-side validation
        $invoiceId = filter_var($payload['invoice_id'] ?? null, FILTER_VALIDATE_INT);
        $amountPaid = filter_var($payload['amount_paid'] ?? null, FILTER_VALIDATE_FLOAT);
        $paymentMode = $payload['payment_mode'] ?? 'cash';
        $transactionRef = htmlspecialchars(trim($payload['transaction_ref'] ?? ''), ENT_QUOTES, 'UTF-8');

        if (!$invoiceId || !$amountPaid || $amountPaid <= 0) {
            http_response_code(422);
            return ['status' => false, 'error' => 'Invalid invoice or payment amount specified.'];
        }

        // 2. Execute within an ACID transaction
        try {
            $db->beginTransaction();

            // Check current invoice balance with FOR UPDATE lock
            $stmt = $db->prepare("
                SELECT id, net_payable, 
                       (SELECT COALESCE(SUM(amount_paid), 0) FROM fee_payments WHERE invoice_id = :inv_id) AS total_paid
                FROM fee_invoices
                WHERE id = :invoice_id
                FOR UPDATE
            ");
            $stmt->execute([
                ':inv_id' => $invoiceId,
                ':invoice_id' => $invoiceId
            ]);
            $invoice = $stmt->fetch();

            if (!$invoice) {
                $db->rollBack();
                http_response_code(404);
                return ['status' => false, 'error' => 'Invoice not found.'];
            }

            $currentBalance = (float)$invoice['net_payable'] - (float)$invoice['total_paid'];
            if ($amountPaid > $currentBalance) {
                $db->rollBack();
                http_response_code(400);
                return ['status' => false, 'error' => "Amount exceeds remaining balance of ₹{$currentBalance}."];
            }

            // Generate unique receipt number: JKM-REC-YYYYMMDD-XXXX
            $receiptNo = 'JKM-REC-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));

            // Insert payment ledger record using prepared statement
            $payStmt = $db->prepare("
                INSERT INTO fee_payments 
                    (receipt_number, invoice_id, amount_paid, payment_mode, transaction_reference, collected_by, payment_date)
                VALUES 
                    (:receipt_no, :invoice_id, :amount, :mode, :ref, :staff_id, NOW())
            ");
            $payStmt->execute([
                ':receipt_no' => $receiptNo,
                ':invoice_id' => $invoiceId,
                ':amount'     => $amountPaid,
                ':mode'       => $paymentMode,
                ':ref'        => $transactionRef ?: null,
                ':staff_id'   => $staffUserId,
            ]);

            // Update invoice status if fully settled
            $newPaidTotal = (float)$invoice['total_paid'] + $amountPaid;
            $newStatus = ($newPaidTotal >= (float)$invoice['net_payable']) ? 'paid' : 'partially_paid';

            $statusStmt = $db->prepare("UPDATE fee_invoices SET status = :status WHERE id = :id");
            $statusStmt->execute([':status' => $newStatus, ':id' => $invoiceId]);

            // Commit atomic transaction
            $db->commit();

            return [
                'status' => true,
                'message' => 'Fee recorded successfully.',
                'receipt_number' => $receiptNo,
                'amount_paid' => $amountPaid,
                'remaining_balance' => max(0, $currentBalance - $amountPaid),
            ];

        } catch (\Exception $e) {
            $db->rollBack();
            error_log("Fee Payment Error: " . $e->getMessage());
            http_response_code(500);
            return ['status' => false, 'error' => 'Transaction failed due to an internal server error.'];
        }
    }
}
```

---

## 6. Phase 2 Implementation Checklist

1. [ ] Install and configure PHP 8.2 with `pdo_mysql`, `mbstring`, `openssl`, and `gd` extensions.
2. [ ] Execute schema migrations on MySQL 8.0 instance with utf8mb4 collation.
3. [ ] Configure seed scripts for JK Montessori School classes (Nursery to Class 12).
4. [ ] Implement JWT token authentication with bcrypt/Argon2id password hashing.
5. [ ] Connect Vite/React frontend API client to `/api/v1` routes with CORS restrictions.
6. [ ] Deploy automated daily MySQL encrypted database backups with retention policies.

---
*Authored by: Bhaskar Gautam*  
*For: JK Montessori School, Subhash Chowk, Ghughli, Maharajganj, UP*
