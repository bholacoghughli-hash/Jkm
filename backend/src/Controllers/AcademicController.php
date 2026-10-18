<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Config\Database;
use App\Utils\Response;
use PDO;

/**
 * Academic Controller
 * JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */
final class AcademicController {
    /**
     * GET /api/v1/academic/classes
     */
    public function getClasses(): void {
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->query("
                SELECT c.id, c.class_code, c.class_name, c.wing, c.display_order,
                       COALESCE(
                           JSON_ARRAYAGG(
                               IF(s.id IS NOT NULL, JSON_OBJECT(
                                   'id', s.id,
                                   'name', s.section_name,
                                   'max_capacity', s.max_capacity,
                                   'room', s.room_number
                               ), NULL)
                           ),
                           JSON_ARRAY()
                       ) AS sections
                FROM classes c
                LEFT JOIN sections s ON c.id = s.class_id
                GROUP BY c.id
                ORDER BY c.display_order ASC
            ");

            $rows = $stmt->fetchAll();
            $classes = array_map(function($row) {
                $row['sections'] = json_decode($row['sections'] ?? '[]', true);
                if (is_array($row['sections'])) {
                    $row['sections'] = array_values(array_filter($row['sections']));
                }
                return $row;
            }, $rows);

            Response::success('Classes retrieved.', ['classes' => $classes]);
        } catch (\Throwable $e) {
            error_log("AcademicController getClasses error: " . $e->getMessage());
            Response::serverError('Could not load academic classes from database.');
        }
    }

    /**
     * GET /api/v1/academic/sessions
     */
    public function getSessions(): void {
        try {
            $pdo = Database::getConnection();
            $stmt = $pdo->query("SELECT * FROM academic_sessions ORDER BY id DESC");
            $sessions = $stmt->fetchAll();
            Response::success('Academic sessions retrieved.', ['sessions' => $sessions]);
        } catch (\Throwable $e) {
            error_log("AcademicController getSessions error: " . $e->getMessage());
            Response::serverError('Could not load academic sessions from database.');
        }
    }
}
