export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type UserRole = 'super_admin' | 'principal' | 'admin' | 'teacher' | 'accountant' | 'parent';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  roleName: UserRole;
  roleDisplayName: string;
  permissions: string[];
  loggedInAt?: number;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface BackendHealth {
  isOnline: boolean;
  statusText: string;
  phpVersion?: string;
  databaseConnected?: boolean;
  databaseName?: string;
  serverTime?: string;
  apiUrl: string;
  error?: string;
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  principal: string;
  address: string;
  block: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  affiliatedBoard: string;
  classesRange: string;
  creator: string;
  academicYear: string;
}

export type ModuleId =
  | 'dashboard'
  | 'students'
  | 'admissions'
  | 'teachers'
  | 'classes'
  | 'attendance'
  | 'fees'
  | 'exams'
  | 'timetable'
  | 'homework'
  | 'parents'
  | 'library'
  | 'transport'
  | 'hr-payroll'
  | 'inventory'
  | 'notices'
  | 'certificates'
  | 'reports'
  | 'website'
  | 'users'
  | 'settings'
  | 'backend-plan';

export interface NavItem {
  id: ModuleId;
  labelKey: string;
  category: 'core' | 'academics' | 'finance' | 'campus' | 'system';
  icon: string;
  badge?: string;
}

export interface StatMetric {
  id: string;
  titleKey: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtextKey: string;
  icon: string;
  accentColor: string;
  isSampleData: boolean;
}

export interface AttendanceWing {
  wingNameKey: string;
  classes: string;
  present: number;
  total: number;
  percentage: number;
  color: string;
}

export interface FeeSummaryData {
  totalExpected: number;
  totalCollected: number;
  totalPending: number;
  collectionRate: number;
  thisMonthCollection: number;
  pendingDefaultersCount: number;
}

export interface AdmissionRecord {
  id: string;
  enrollmentNo: string;
  studentName: string;
  classGrade: string;
  parentName: string;
  contact: string;
  admissionDate: string;
  status: 'Approved' | 'Pending Verification' | 'Document Required';
  isSampleData: boolean;
}

export interface EventItem {
  id: string;
  titleKey: string;
  date: string;
  time?: string;
  category: 'exam' | 'holiday' | 'meeting' | 'sports' | 'activity';
  descriptionKey: string;
}

export interface ActivityItem {
  id: string;
  titleKey: string;
  timeAgoKey: string;
  actor: string;
  category: 'fee' | 'admission' | 'attendance' | 'exam' | 'system';
}

export interface ModuleArchitecturePlan {
  moduleId: ModuleId;
  titleKey: string;
  descriptionKey: string;
  plannedPhase: string;
  databaseTables: Array<{
    name: string;
    description: string;
    columns: string[];
  }>;
  endpoints: Array<{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
  }>;
  keyFeatures: string[];
  rolePermissions: Record<UserRole, string>;
}

export type ViewMode = 'website' | 'erp';

export interface WebsiteNotice {
  id: string;
  titleKey: string;
  date: string;
  category: 'academic' | 'admission' | 'sports' | 'events';
  summaryKey: string;
  contentKey: string;
  isImportant?: boolean;
  isSampleData: boolean;
}

export interface GalleryItem {
  id: string;
  titleKey: string;
  category: 'campus' | 'montessori' | 'science' | 'sports' | 'cultural';
  captionKey: string;
  gradient: string;
  icon: string;
}

export interface FacilityItem {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  highlightsKey: string[];
}

export interface ClassStageInfo {
  id: string;
  stageKey: string;
  classesKey: string;
  ageRangeKey: string;
  descKey: string;
  curriculumKey: string;
  subjectsKey: string;
}

