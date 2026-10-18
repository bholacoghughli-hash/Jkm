-- ========================================================================
-- JK Montessori School ERP — Database Migration 002: Seed Initial Data
-- School: JK Montessori School, Subhash Chowk, Ghughli, Maharajganj, UP
-- Principal: Mr. Sanjay Kumar Mishra
-- Developer: Bhaskar Gautam
-- Note: Super Admin credentials are NOT hardcoded here.
-- Use `php cli/create_super_admin.php` to initialize the first administrator.
-- ========================================================================

USE `jkmontessori_erp`;

-- 1. Insert Base Roles
INSERT INTO `roles` (`id`, `name`, `display_name`, `description`) VALUES
(1, 'super_admin', 'Super Administrator', 'Full unrestricted administrative access to entire ERP system'),
(2, 'principal', 'Principal (Head of School)', 'Executive oversight, academic and financial approvals'),
(3, 'admin', 'Administrative Officer', 'Daily operational administration, admissions, and student records'),
(4, 'teacher', 'Faculty / Teacher', 'Classroom attendance, examinations, and subject grade recording'),
(5, 'accountant', 'Accounts Officer', 'Fee billing, collection receipts, and ledger maintenance'),
(6, 'parent', 'Parent / Student', 'Read-only access for student progress, attendance, and fee status')
ON DUPLICATE KEY UPDATE `display_name` = VALUES(`display_name`);

-- 2. Insert Permissions
INSERT INTO `permissions` (`id`, `name`, `module`, `description`) VALUES
(1, 'dashboard.view', 'dashboard', 'Access main school dashboard KPIs'),
(2, 'users.manage', 'users', 'Create and manage staff accounts and roles'),
(3, 'audit.view', 'audit', 'View administrative system audit logs'),
(4, 'students.view', 'students', 'View student directories and profiles'),
(5, 'students.manage', 'students', 'Add and update student records'),
(6, 'admissions.manage', 'admissions', 'Process admission inquiries and enrollments'),
(7, 'attendance.view', 'attendance', 'View daily student and staff attendance'),
(8, 'attendance.mark', 'attendance', 'Mark daily student attendance registers'),
(9, 'fees.view', 'fees', 'View fee ledgers and defaulter registers'),
(10, 'fees.collect', 'fees', 'Record fee payments and issue official receipts'),
(11, 'exams.manage', 'exams', 'Manage examination marks and report cards'),
(12, 'classes.manage', 'classes', 'Configure class sections and subject allocations'),
(13, 'settings.manage', 'settings', 'Configure institutional settings and academic calendar')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 3. Assign All Permissions to Super Admin & Principal
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 1, `id` FROM `permissions`;

INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 2, `id` FROM `permissions`;

-- Role permissions for Accountant
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(5, 1), (5, 4), (5, 9), (5, 10);

-- Role permissions for Teacher
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(4, 1), (4, 4), (4, 7), (4, 8), (4, 11);

-- 4. Academic Session 2026-2027
INSERT INTO `academic_sessions` (`id`, `session_name`, `start_date`, `end_date`, `is_current`) VALUES
(1, '2026-2027', '2026-04-01', '2027-03-31', 1)
ON DUPLICATE KEY UPDATE `is_current` = 1;

-- 5. Seed 14 Classes (Nursery to Class 12)
INSERT INTO `classes` (`id`, `class_code`, `class_name`, `wing`, `display_order`) VALUES
(1, 'NURSERY', 'Nursery', 'primary', 1),
(2, 'LKG', 'Lower Kindergarten (LKG)', 'primary', 2),
(3, 'UKG', 'Upper Kindergarten (UKG)', 'primary', 3),
(4, 'CLASS_1', 'Class 1', 'primary', 4),
(5, 'CLASS_2', 'Class 2', 'primary', 5),
(6, 'CLASS_3', 'Class 3', 'primary', 6),
(7, 'CLASS_4', 'Class 4', 'primary', 7),
(8, 'CLASS_5', 'Class 5', 'primary', 8),
(9, 'CLASS_6', 'Class 6', 'middle', 9),
(10, 'CLASS_7', 'Class 7', 'middle', 10),
(11, 'CLASS_8', 'Class 8', 'middle', 11),
(12, 'CLASS_9', 'Class 9', 'secondary', 12),
(13, 'CLASS_10', 'Class 10', 'secondary', 13),
(14, 'CLASS_11', 'Class 11', 'senior_secondary', 14),
(15, 'CLASS_12', 'Class 12', 'senior_secondary', 15)
ON DUPLICATE KEY UPDATE `class_name` = VALUES(`class_name`);

-- 6. Seed Sections
INSERT IGNORE INTO `sections` (`class_id`, `section_name`, `max_capacity`, `room_number`) VALUES
(1, 'Montessori Rose', 30, 'Ground Floor - Room 101'),
(1, 'Montessori Lotus', 30, 'Ground Floor - Room 102'),
(2, 'Section A', 35, 'Room 103'),
(3, 'Section A', 35, 'Room 104'),
(4, 'Section A', 40, 'Room 105'),
(5, 'Section A', 40, 'Room 106'),
(6, 'Section A', 40, 'Room 107'),
(7, 'Section A', 40, 'Room 108'),
(8, 'Section A', 40, 'Room 109'),
(9, 'Section A', 40, 'First Floor - Room 201'),
(10, 'Section A', 40, 'First Floor - Room 202'),
(11, 'Section A', 40, 'First Floor - Room 203'),
(12, 'Section A', 40, 'Second Floor - Room 301'),
(13, 'Section A', 40, 'Second Floor - Room 302'),
(14, 'Science (PCM/PCB)', 45, 'Senior Wing - Lab Block 401'),
(14, 'Commerce', 45, 'Senior Wing - Room 402'),
(15, 'Science (PCM/PCB)', 45, 'Senior Wing - Lab Block 403'),
(15, 'Commerce', 45, 'Senior Wing - Room 404');
