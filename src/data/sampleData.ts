import {
  SchoolInfo,
  NavItem,
  AttendanceWing,
  FeeSummaryData,
  AdmissionRecord,
  EventItem,
  ActivityItem,
  ModuleArchitecturePlan,
  ModuleId,
  WebsiteNotice,
  GalleryItem,
  FacilityItem,
  ClassStageInfo,
} from '../types';

export const schoolInfo: SchoolInfo = {
  name: 'JK Montessori School',
  tagline: 'Nursery to Class 12 • Subhash Chowk, Ghughli',
  principal: 'Mr. Sanjay Kumar Mishra',
  address: 'Subhash Chowk, Block Ghughli, District Maharajganj, Uttar Pradesh, India',
  block: 'Ghughli',
  district: 'Maharajganj',
  state: 'Uttar Pradesh',
  country: 'India',
  pinCode: '273151',
  affiliatedBoard: 'CBSE Curriculum Pattern',
  classesRange: 'Nursery to Class 12 (14 Classes)',
  creator: 'Created by Bhaskar Gautam',
  academicYear: '2026-2027',
};

export const navItems: NavItem[] = [
  // Core Management
  { id: 'dashboard', labelKey: 'navDashboard', category: 'core', icon: 'LayoutDashboard' },
  { id: 'students', labelKey: 'navStudents', category: 'core', icon: 'GraduationCap', badge: '1,420' },
  { id: 'admissions', labelKey: 'navAdmissions', category: 'core', icon: 'UserPlus', badge: 'New' },
  { id: 'teachers', labelKey: 'navTeachers', category: 'core', icon: 'Users', badge: '68' },
  { id: 'classes', labelKey: 'navClasses', category: 'core', icon: 'School', badge: '14' },

  // Academics & Teaching
  { id: 'attendance', labelKey: 'navAttendance', category: 'academics', icon: 'ClipboardCheck' },
  { id: 'exams', labelKey: 'navExams', category: 'academics', icon: 'FileSpreadsheet' },
  { id: 'timetable', labelKey: 'navTimetable', category: 'academics', icon: 'CalendarDays' },
  { id: 'homework', labelKey: 'navHomework', category: 'academics', icon: 'BookOpenCheck' },

  // Finance & Logistics
  { id: 'fees', labelKey: 'navFees', category: 'finance', icon: 'CreditCard' },
  { id: 'hr-payroll', labelKey: 'navHrPayroll', category: 'finance', icon: 'Landmark' },
  { id: 'inventory', labelKey: 'navInventory', category: 'finance', icon: 'Package' },
  { id: 'transport', labelKey: 'navTransport', category: 'finance', icon: 'Bus' },

  // Campus & Communication
  { id: 'parents', labelKey: 'navParents', category: 'campus', icon: 'HeartHandshake' },
  { id: 'library', labelKey: 'navLibrary', category: 'campus', icon: 'Library' },
  { id: 'notices', labelKey: 'navNotices', category: 'campus', icon: 'Megaphone', badge: 'Active' },
  { id: 'certificates', labelKey: 'navCertificates', category: 'campus', icon: 'Award' },

  // Administration & System
  { id: 'reports', labelKey: 'navReports', category: 'system', icon: 'BarChart3' },
  { id: 'website', labelKey: 'navWebsite', category: 'system', icon: 'Globe' },
  { id: 'users', labelKey: 'navUsers', category: 'system', icon: 'ShieldCheck' },
  { id: 'settings', labelKey: 'navSettings', category: 'system', icon: 'Settings' },
  { id: 'backend-plan', labelKey: 'navBackendPlan', category: 'system', icon: 'Database', badge: 'PHP/MySQL' },
];

export const sampleAttendanceWings: AttendanceWing[] = [
  {
    wingNameKey: 'wingPrimary',
    classes: 'Nursery, LKG, UKG, Classes 1 to 5',
    present: 480,
    total: 500,
    percentage: 96.0,
    color: '#3b82f6', // blue
  },
  {
    wingNameKey: 'wingMiddle',
    classes: 'Classes 6, 7 & 8',
    present: 375,
    total: 400,
    percentage: 93.8,
    color: '#0ea5e9', // sky
  },
  {
    wingNameKey: 'wingSecondary',
    classes: 'Classes 9 & 10 (High School)',
    present: 285,
    total: 300,
    percentage: 95.0,
    color: '#10b981', // emerald
  },
  {
    wingNameKey: 'wingSeniorSecondary',
    classes: 'Classes 11 & 12 (Science / Commerce / Arts)',
    present: 198,
    total: 220,
    percentage: 90.0,
    color: '#f59e0b', // amber
  },
];

export const sampleFeeSummary: FeeSummaryData = {
  totalExpected: 3850000,
  totalCollected: 3507500,
  totalPending: 342500,
  collectionRate: 91.1,
  thisMonthCollection: 485000,
  pendingDefaultersCount: 38,
};

export const sampleAdmissions: AdmissionRecord[] = [
  {
    id: 'ADM-2026-081',
    enrollmentNo: 'JKM/26/081',
    studentName: 'Aaradhya Tiwari',
    classGrade: 'Nursery - Montessori Rose',
    parentName: 'Rameshwar Tiwari',
    contact: '+91 98380 XXXXX',
    admissionDate: '15 Oct 2026',
    status: 'Approved',
    isSampleData: true,
  },
  {
    id: 'ADM-2026-082',
    enrollmentNo: 'JKM/26/082',
    studentName: 'Shaurya Pratap Singh',
    classGrade: 'Class 1 - Section A',
    parentName: 'Vikram Singh',
    contact: '+91 94520 XXXXX',
    admissionDate: '14 Oct 2026',
    status: 'Approved',
    isSampleData: true,
  },
  {
    id: 'ADM-2026-083',
    enrollmentNo: 'JKM/26/083',
    studentName: 'Ananya Mishra',
    classGrade: 'Class 6 - Section B',
    parentName: 'Dileep Mishra',
    contact: '+91 97950 XXXXX',
    admissionDate: '12 Oct 2026',
    status: 'Pending Verification',
    isSampleData: true,
  },
  {
    id: 'ADM-2026-084',
    enrollmentNo: 'JKM/26/084',
    studentName: 'Mohammad Zaid',
    classGrade: 'Class 9 - Section A',
    parentName: 'Irfan Ahmad',
    contact: '+91 91200 XXXXX',
    admissionDate: '10 Oct 2026',
    status: 'Approved',
    isSampleData: true,
  },
  {
    id: 'ADM-2026-085',
    enrollmentNo: 'JKM/26/085',
    studentName: 'Divyansh Gautam',
    classGrade: 'Class 11 - Science (PCM)',
    parentName: 'Santosh Gautam',
    contact: '+91 99190 XXXXX',
    admissionDate: '08 Oct 2026',
    status: 'Approved',
    isSampleData: true,
  },
  {
    id: 'ADM-2026-086',
    enrollmentNo: 'JKM/26/086',
    studentName: 'Priya Gupta',
    classGrade: 'Class 11 - Commerce',
    parentName: 'Subhash Gupta',
    contact: '+91 96210 XXXXX',
    admissionDate: '05 Oct 2026',
    status: 'Document Required',
    isSampleData: true,
  },
];

export const sampleEvents: EventItem[] = [
  {
    id: 'EVT-01',
    titleKey: 'Half-Yearly Evaluation & Assessment Cycle',
    date: 'Oct 24 - Nov 02, 2026',
    time: '09:00 AM - 12:30 PM',
    category: 'exam',
    descriptionKey: 'Nursery to Class 12 structured term evaluation adhering to educational standards.',
  },
  {
    id: 'EVT-02',
    titleKey: 'Parent-Teacher Consultative Meeting (PTM)',
    date: 'Nov 07, 2026',
    time: '08:30 AM - 01:30 PM',
    category: 'meeting',
    descriptionKey: 'Comprehensive progress review with class teachers and subject heads.',
  },
  {
    id: 'EVT-03',
    titleKey: 'Annual Montessori Science & Arts Exhibition',
    date: 'Nov 14, 2026',
    time: '10:00 AM - 03:00 PM',
    category: 'activity',
    descriptionKey: 'Innovative student prototypes, robotic demonstrations, and creative artwork.',
  },
  {
    id: 'EVT-04',
    titleKey: 'Inter-House Sports Meet & Athletic Championship',
    date: 'Nov 28, 2026',
    time: 'Full Day Event',
    category: 'sports',
    descriptionKey: 'Track events, volleyball, chess, badminton tournaments on campus grounds.',
  },
];

export const sampleActivities: ActivityItem[] = [
  {
    id: 'ACT-01',
    titleKey: 'Fee Receipt #JKM-REC-4892 generated (₹4,500) for Roll 1024',
    timeAgoKey: '12 minutes ago',
    actor: 'Accounts Desk',
    category: 'fee',
  },
  {
    id: 'ACT-02',
    titleKey: 'Daily Attendance register finalized by Class 10A Teacher',
    timeAgoKey: '45 minutes ago',
    actor: 'S. Sharma (TGT)',
    category: 'attendance',
  },
  {
    id: 'ACT-03',
    titleKey: 'New admission application verified for Nursery Grade',
    timeAgoKey: '2 hours ago',
    actor: 'Admission Cell',
    category: 'admission',
  },
  {
    id: 'ACT-04',
    titleKey: 'Principal approved circular for Diwali Academic Break',
    timeAgoKey: '3 hours ago',
    actor: 'Mr. Sanjay Kumar Mishra (Principal)',
    category: 'system',
  },
  {
    id: 'ACT-05',
    titleKey: 'Class 12 Pre-Board Chemistry Practical marks updated',
    timeAgoKey: '5 hours ago',
    actor: 'Lab In-Charge',
    category: 'exam',
  },
];

export const moduleArchitecturePlans: Record<string, ModuleArchitecturePlan> = {
  students: {
    moduleId: 'students',
    titleKey: 'navStudents',
    descriptionKey: 'Comprehensive student profile repository, bio-data, academic progression, class allocations, and guardian records.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'students',
        description: 'Primary student entity record',
        columns: ['id (UUID/INT PK)', 'admission_no (UNIQUE)', 'roll_number', 'full_name', 'dob', 'gender', 'blood_group', 'category', 'status', 'created_at'],
      },
      {
        name: 'student_guardians',
        description: 'Parents and emergency contact references',
        columns: ['id PK', 'student_id FK', 'guardian_name', 'relation', 'phone_primary', 'phone_alt', 'occupation', 'aadhaar_hash', 'address'],
      },
      {
        name: 'student_academic_records',
        description: 'Session-wise enrollment, section, and promotion tracking',
        columns: ['id PK', 'student_id FK', 'academic_year', 'class_id FK', 'section_id FK', 'roll_no', 'is_promoted'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/students.php?class_id={id}&status={status}', description: 'Fetch paginated student directory with filters' },
      { method: 'POST', path: '/api/v1/students.php', description: 'Create new student admission record with validation' },
      { method: 'GET', path: '/api/v1/students.php?id={student_id}', description: 'Retrieve detailed student profile and history' },
      { method: 'PUT', path: '/api/v1/students.php?id={student_id}', description: 'Update student demographics or address details' },
    ],
    keyFeatures: [
      'Comprehensive 360° student biographical & medical profile',
      'One-click student ID card & profile sheet generation',
      'Academic session promotion & section transfer workflow',
      'Aadhaar / Birth Certificate document vault with validation',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Full Access (View, Add, Edit, Delete, Promote, Archive)',
      admin: 'Manage Records (Add, Edit demographics, Generate ID)',
      teacher: 'Class View (View students of assigned class/sections only)',
      accountant: 'Billing View (View student profile linked with fee account)',
      parent: 'Self View (Access own child profile and reports)',
    },
  },
  admissions: {
    moduleId: 'admissions',
    titleKey: 'navAdmissions',
    descriptionKey: 'Online inquiry, entrance screening, document verification, seat reservation, and admission letter issuance.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'admission_inquiries',
        description: 'Prospective applicant inquiries and walk-ins',
        columns: ['id PK', 'inquiry_no UNIQUE', 'candidate_name', 'target_class', 'parent_phone', 'source', 'status', 'counselor_notes'],
      },
      {
        name: 'admission_applications',
        description: 'Detailed admission form submissions',
        columns: ['id PK', 'inquiry_id FK', 'application_fee_status', 'test_score', 'interview_status', 'allotted_class_id FK', 'approval_status'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/admissions.php?stage={pending|approved}', description: 'List applicant pipeline by status' },
      { method: 'POST', path: '/api/v1/admissions.php/inquiry', description: 'Register new admission walk-in inquiry' },
      { method: 'POST', path: '/api/v1/admissions.php/approve', description: 'Convert application to enrolled student with auto-gen enrollment ID' },
    ],
    keyFeatures: [
      'Inquiry pipeline kanban board from walk-in to enrollment',
      'Merit list & entrance test scorecard compiler',
      'Automatic SMS/WhatsApp alerts to prospective parents',
      'One-click enrollment conversion to student database',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Approver & Seat Allotment authority',
      admin: 'Form submission & verification desk',
      teacher: 'Interview evaluator',
      accountant: 'Registration fee receipt collector',
      parent: 'Online applicant inquiry portal',
    },
  },
  fees: {
    moduleId: 'fees',
    titleKey: 'navFees',
    descriptionKey: 'Tuition fees, transport charges, computer lab dues, scholarship concessions, automated receipts, and defaulter tracking.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'fee_structures',
        description: 'Class-wise and category-wise fee blueprints',
        columns: ['id PK', 'class_id FK', 'fee_head (Tuition, Lab, Exam, Transport)', 'amount', 'frequency (Monthly/Quarterly)', 'due_day'],
      },
      {
        name: 'fee_invoices',
        description: 'Generated student fee bills per term',
        columns: ['id PK', 'invoice_no UNIQUE', 'student_id FK', 'academic_year', 'term', 'total_amount', 'concession_amount', 'net_payable', 'due_date', 'status'],
      },
      {
        name: 'fee_payments',
        description: 'Receipt ledger of transactions with payment mode',
        columns: ['id PK', 'receipt_no UNIQUE', 'invoice_id FK', 'amount_paid', 'payment_mode (Cash, UPI, Cheque, NetBanking)', 'transaction_ref', 'collected_by FK', 'timestamp'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/fees.php?student_id={id}', description: 'Fetch student fee ledger and outstanding balance' },
      { method: 'POST', path: '/api/v1/fees.php/collect', description: 'Record payment transaction and generate 80G compliant print receipt' },
      { method: 'GET', path: '/api/v1/fees.php/defaulters', description: 'Export overdue fee list with contact numbers' },
    ],
    keyFeatures: [
      'Automated monthly/quarterly fee bill generation',
      'Instant thermal/A4 printable fee receipt with QR verification',
      'Integrated UPI QR code generator for direct parent payments',
      'SMS alerts for upcoming dues & overdue payment notices',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Fee structure approval, concession waiver authorization',
      admin: 'View financial aggregates and collection reports',
      teacher: 'No financial write access',
      accountant: 'Full billing, collection, receipt issuance, day-end cash tally',
      parent: 'View fee dues, payment history, and download receipts',
    },
  },
  attendance: {
    moduleId: 'attendance',
    titleKey: 'navAttendance',
    descriptionKey: 'Daily student and staff attendance recording, biometric/RFID device bridge, leave processing, and monthly muster rolls.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'attendance_daily',
        description: 'Per student daily attendance markers',
        columns: ['id PK', 'student_id FK', 'date', 'status (P, A, L, HD)', 'marked_by FK', 'remarks', 'created_at'],
      },
      {
        name: 'staff_attendance',
        description: 'Faculty and non-teaching punch records',
        columns: ['id PK', 'staff_id FK', 'date', 'check_in_time', 'check_out_time', 'punch_source (Manual/Biometric)', 'status'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/attendance.php?class_id={id}&date={Y-m-d}', description: 'Fetch daily class roster attendance status' },
      { method: 'POST', path: '/api/v1/attendance.php/bulk', description: 'Batch submit class daily attendance' },
      { method: 'GET', path: '/api/v1/attendance.php/student-monthly', description: 'Monthly muster roll percentage report' },
    ],
    keyFeatures: [
      'Fast 30-second teacher attendance roster with quick "Mark All Present"',
      'Automated SMS notification to parent upon unexcused student absence',
      'Monthly CBSE 75% attendance compliance analyzer',
      'Staff biometric device sync via secure webhook bridge',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Full oversight, attendance exception override',
      admin: 'Staff attendance audit and monthly muster generator',
      teacher: 'Mark & edit daily attendance for assigned class/section',
      accountant: 'Read-only access for payroll calculations',
      parent: 'Live real-time visibility into ward daily attendance',
    },
  },
  teachers: {
    moduleId: 'teachers',
    titleKey: 'navTeachers',
    descriptionKey: 'Faculty directory, qualifications, subject specialization, timetable workload, and performance evaluations.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'staff_profiles',
        description: 'Teacher and employee master records',
        columns: ['id PK', 'employee_code UNIQUE', 'full_name', 'designation', 'department', 'qualification', 'joining_date', 'salary_grade', 'contact_phone', 'status'],
      },
      {
        name: 'teacher_subject_allocations',
        description: 'Subject and class teaching assignments',
        columns: ['id PK', 'teacher_id FK', 'class_id FK', 'section_id FK', 'subject_id FK', 'weekly_periods'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/teachers.php', description: 'List faculty members with assigned subject workloads' },
      { method: 'POST', path: '/api/v1/teachers.php', description: 'Add new staff profile with document attachments' },
    ],
    keyFeatures: [
      'Faculty credential tracking (B.Ed, CTET, D.El.Ed, Post-Graduation)',
      'Weekly period workload balancing to prevent teacher burnout',
      'Teacher leave application and proxy/substitution allocator',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Staff recruitment, salary approval, appraisal review',
      admin: 'Staff document registry and identity card generation',
      teacher: 'Personal profile & assigned timetable view',
      accountant: 'Salary computation and bank disbursement',
      parent: 'View class teacher contact info and visiting hours',
    },
  },
  exams: {
    moduleId: 'exams',
    titleKey: 'navExams',
    descriptionKey: 'Examination schedules, question paper management, mark-sheets, grade card generation, and CBSE result analytics.',
    plannedPhase: 'Phase 2',
    databaseTables: [
      {
        name: 'exam_terms',
        description: 'Academic exam instances (UT-1, Mid-Term, Pre-Board, Annual)',
        columns: ['id PK', 'title', 'session', 'start_date', 'end_date', 'grading_scale'],
      },
      {
        name: 'exam_marks',
        description: 'Per student marks entry per subject',
        columns: ['id PK', 'exam_id FK', 'student_id FK', 'subject_id FK', 'max_theory', 'theory_marks', 'max_practical', 'practical_marks', 'grade', 'teacher_comment'],
      },
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/exams.php/schedule', description: 'Get exam datesheet and syllabus blueprint' },
      { method: 'POST', path: '/api/v1/exams.php/marks', description: 'Bulk marks entry by subject teacher with validation' },
      { method: 'GET', path: '/api/v1/exams.php/report-card?student_id={id}', description: 'Generate official PDF report card' },
    ],
    keyFeatures: [
      'CBSE compliant grading system with CGPA / percentage logic',
      'Automated student rank calculation and top performer badges',
      'Single-click bulk PDF Report Card generator with principal signature slot',
    ],
    rolePermissions: {
      super_admin: 'Full system privileges & unrestricted access',
      principal: 'Final result publishing & report card lockdown',
      admin: 'Datesheet drafting and hall ticket issuance',
      teacher: 'Subject marks entry and internal assessment grading',
      accountant: 'Verify no-dues clearance before hall ticket release',
      parent: 'Online digital progress report & subject marks view',
    },
  },
};

// ==========================================
// PUBLIC SCHOOL WEBSITE DATA
// ==========================================

export const sampleWebsiteNotices: WebsiteNotice[] = [
  {
    id: 'not-01',
    titleKey: 'noticeAdmission2026',
    date: '2026-03-15',
    category: 'admission',
    summaryKey: 'noticeAdmission2026Summary',
    contentKey: 'noticeAdmission2026Content',
    isImportant: true,
    isSampleData: true,
  },
  {
    id: 'not-02',
    titleKey: 'noticePTMMeeting',
    date: '2026-04-05',
    category: 'academic',
    summaryKey: 'noticePTMMeetingSummary',
    contentKey: 'noticePTMMeetingContent',
    isImportant: false,
    isSampleData: true,
  },
  {
    id: 'not-03',
    titleKey: 'noticeSportsDay',
    date: '2026-04-18',
    category: 'sports',
    summaryKey: 'noticeSportsDaySummary',
    contentKey: 'noticeSportsDayContent',
    isImportant: false,
    isSampleData: true,
  },
  {
    id: 'not-04',
    titleKey: 'noticeExamsSchedule',
    date: '2026-05-02',
    category: 'academic',
    summaryKey: 'noticeExamsScheduleSummary',
    contentKey: 'noticeExamsScheduleContent',
    isImportant: true,
    isSampleData: true,
  },
  {
    id: 'not-05',
    titleKey: 'noticeSummerTiming',
    date: '2026-05-15',
    category: 'events',
    summaryKey: 'noticeSummerTimingSummary',
    contentKey: 'noticeSummerTimingContent',
    isImportant: false,
    isSampleData: true,
  },
];

export const sampleClassStages: ClassStageInfo[] = [
  {
    id: 'foundational',
    stageKey: 'stageFoundational',
    classesKey: 'classesFoundational',
    ageRangeKey: 'ageFoundational',
    descKey: 'descFoundational',
    curriculumKey: 'curriculumFoundational',
    subjectsKey: 'subjectsFoundational',
  },
  {
    id: 'primary',
    stageKey: 'stagePrimary',
    classesKey: 'classesPrimary',
    ageRangeKey: 'agePrimary',
    descKey: 'descPrimary',
    curriculumKey: 'curriculumPrimary',
    subjectsKey: 'subjectsPrimary',
  },
  {
    id: 'middle',
    stageKey: 'stageMiddle',
    classesKey: 'classesMiddle',
    ageRangeKey: 'ageMiddle',
    descKey: 'descMiddle',
    curriculumKey: 'curriculumMiddle',
    subjectsKey: 'subjectsMiddle',
  },
  {
    id: 'secondary',
    stageKey: 'stageSecondary',
    classesKey: 'classesSecondary',
    ageRangeKey: 'ageSecondary',
    descKey: 'descSecondary',
    curriculumKey: 'curriculumSecondary',
    subjectsKey: 'subjectsSecondary',
  },
];

export const sampleFacilities: FacilityItem[] = [
  {
    id: 'fac-smart-classes',
    titleKey: 'facSmartClassTitle',
    descKey: 'facSmartClassDesc',
    icon: 'Monitor',
    highlightsKey: ['facSmartHigh1', 'facSmartHigh2', 'facSmartHigh3'],
  },
  {
    id: 'fac-science-lab',
    titleKey: 'facScienceLabTitle',
    descKey: 'facScienceLabDesc',
    icon: 'FlaskConical',
    highlightsKey: ['facScienceHigh1', 'facScienceHigh2', 'facScienceHigh3'],
  },
  {
    id: 'fac-library',
    titleKey: 'facLibraryTitle',
    descKey: 'facLibraryDesc',
    icon: 'BookOpen',
    highlightsKey: ['facLibraryHigh1', 'facLibraryHigh2', 'facLibraryHigh3'],
  },
  {
    id: 'fac-sports',
    titleKey: 'facSportsTitle',
    descKey: 'facSportsDesc',
    icon: 'Trophy',
    highlightsKey: ['facSportsHigh1', 'facSportsHigh2', 'facSportsHigh3'],
  },
  {
    id: 'fac-montessori-lab',
    titleKey: 'facMontessoriTitle',
    descKey: 'facMontessoriDesc',
    icon: 'Shapes',
    highlightsKey: ['facMontessoriHigh1', 'facMontessoriHigh2', 'facMontessoriHigh3'],
  },
  {
    id: 'fac-safety-water',
    titleKey: 'facSafetyTitle',
    descKey: 'facSafetyDesc',
    icon: 'ShieldCheck',
    highlightsKey: ['facSafetyHigh1', 'facSafetyHigh2', 'facSafetyHigh3'],
  },
];

export const sampleGalleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    titleKey: 'galItemMontessoriTitle',
    category: 'montessori',
    captionKey: 'galItemMontessoriCaption',
    gradient: 'from-amber-600 via-orange-600 to-rose-700',
    icon: 'Shapes',
  },
  {
    id: 'gal-02',
    titleKey: 'galItemScienceTitle',
    category: 'science',
    captionKey: 'galItemScienceCaption',
    gradient: 'from-blue-700 via-indigo-700 to-purple-800',
    icon: 'FlaskConical',
  },
  {
    id: 'gal-03',
    titleKey: 'galItemCampusTitle',
    category: 'campus',
    captionKey: 'galItemCampusCaption',
    gradient: 'from-emerald-700 via-teal-800 to-cyan-900',
    icon: 'School',
  },
  {
    id: 'gal-04',
    titleKey: 'galItemSportsTitle',
    category: 'sports',
    captionKey: 'galItemSportsCaption',
    gradient: 'from-orange-600 via-amber-600 to-yellow-600',
    icon: 'Trophy',
  },
  {
    id: 'gal-05',
    titleKey: 'galItemCulturalTitle',
    category: 'cultural',
    captionKey: 'galItemCulturalCaption',
    gradient: 'from-rose-600 via-pink-600 to-purple-700',
    icon: 'Sparkles',
  },
  {
    id: 'gal-06',
    titleKey: 'galItemLibraryTitle',
    category: 'campus',
    captionKey: 'galItemLibraryCaption',
    gradient: 'from-blue-800 via-sky-800 to-indigo-900',
    icon: 'BookOpen',
  },
  {
    id: 'gal-07',
    titleKey: 'galItemAssemblyTitle',
    category: 'cultural',
    captionKey: 'galItemAssemblyCaption',
    gradient: 'from-violet-700 via-purple-700 to-indigo-800',
    icon: 'Users',
  },
  {
    id: 'gal-08',
    titleKey: 'galItemSmartClassTitle',
    category: 'montessori',
    captionKey: 'galItemSmartClassCaption',
    gradient: 'from-cyan-700 via-blue-700 to-indigo-800',
    icon: 'Monitor',
  },
];

