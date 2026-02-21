import { User, TestCase, Project } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@testgrid.io',
    role: 'admin',
    avatar: 'SC',
    color: '#ec4899'
  },
  {
    id: 'u2',
    name: 'Marcus Johnson',
    email: 'marcus.j@testgrid.io',
    role: 'qa-engineer',
    avatar: 'MJ',
    color: '#8b5cf6'
  },
  {
    id: 'u3',
    name: 'Emma Rodriguez',
    email: 'emma.r@testgrid.io',
    role: 'qa-engineer',
    avatar: 'ER',
    color: '#06b6d4'
  },
  {
    id: 'u4',
    name: 'Alex Kim',
    email: 'alex.kim@testgrid.io',
    role: 'viewer',
    avatar: 'AK',
    color: '#f59e0b'
  },
  {
    id: 'u5',
    name: 'Jordan Taylor',
    email: 'jordan.t@testgrid.io',
    role: 'qa-engineer',
    avatar: 'JT',
    color: '#10b981'
  }
];

export const mockTestCases: TestCase[] = [
  {
    id: 'TC-001',
    title: 'User Login - Valid Credentials',
    testSteps: '1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click login button',
    expectedResult: 'User should be redirected to dashboard with welcome message',
    assignee: mockUsers[0],
    status: 'pass'
  },
  {
    id: 'TC-002',
    title: 'User Login - Invalid Password',
    testSteps: '1. Navigate to login page\n2. Enter valid email\n3. Enter invalid password\n4. Click login button',
    expectedResult: 'Error message "Invalid credentials" should appear',
    assignee: mockUsers[1],
    status: 'pass'
  },
  {
    id: 'TC-003',
    title: 'Create New Test Case',
    testSteps: '1. Click "New Test" button\n2. Fill in test details\n3. Assign to team member\n4. Save test case',
    expectedResult: 'Test case should be created and appear in the grid',
    assignee: mockUsers[2],
    status: 'in-progress'
  },
  {
    id: 'TC-004',
    title: 'Import Excel Test Cases',
    testSteps: '1. Click Import Excel button\n2. Select valid .xlsx file\n3. Map columns\n4. Confirm import',
    expectedResult: 'All test cases from Excel should be imported successfully',
    assignee: mockUsers[1],
    status: 'fail'
  },
  {
    id: 'TC-005',
    title: 'Export Test Cases to Excel',
    testSteps: '1. Select test cases\n2. Click Export Excel button\n3. Choose location\n4. Save file',
    expectedResult: 'Excel file should download with all selected test cases',
    assignee: mockUsers[3],
    status: 'pass'
  },
  {
    id: 'TC-006',
    title: 'Assign Test Case to Multiple Users',
    testSteps: '1. Select test case\n2. Open assignee dropdown\n3. Select multiple users\n4. Save changes',
    expectedResult: 'Test case should show all assigned users',
    assignee: mockUsers[4],
    status: 'in-progress'
  },
  {
    id: 'TC-007',
    title: 'Filter Test Cases by Status',
    testSteps: '1. Click status filter\n2. Select "In Progress"\n3. View filtered results',
    expectedResult: 'Only in-progress test cases should be visible',
    assignee: mockUsers[0],
    status: 'pass'
  },
  {
    id: 'TC-008',
    title: 'Real-time Collaboration Test',
    testSteps: '1. Open test case\n2. Edit test steps\n3. Verify other users see changes\n4. Check for conflicts',
    expectedResult: 'Changes should appear instantly for all users',
    assignee: mockUsers[2],
    status: 'in-progress'
  },
  {
    id: 'TC-009',
    title: 'User Permission - Viewer Role',
    testSteps: '1. Login as viewer\n2. Attempt to edit test case\n3. Attempt to delete test case',
    expectedResult: 'Viewer should only be able to view, not edit',
    assignee: mockUsers[3],
    status: 'pending'
  },
  {
    id: 'TC-010',
    title: 'Dashboard Load Performance',
    testSteps: '1. Navigate to dashboard\n2. Measure load time\n3. Check for 1000+ test cases\n4. Verify smooth scrolling',
    expectedResult: 'Dashboard should load in under 2 seconds',
    assignee: mockUsers[1],
    status: 'fail'
  }
];

// אפשר לשים את זה בקובץ נפרד בשם mockData.ts או פשוט בתוך App.tsx
export const MOCK_PROJECTS = [
  {
    id: 'p1',
    name: 'מערכת ניהול לקוחות (CRM)',
    files: [
      { id: 'f1', name: 'בדיקות לוגין ואבטחה' },
      { id: 'f2', name: 'ניהול רשימת אנשי קשר' },
      { id: 'f3', name: 'ייצוא דוחות אקסל' },
    ],
  },
  {
    id: 'p2',
    name: 'אפליקציית Mobile - iOS',
    files: [
      { id: 'f4', name: 'תהליך הרשמה (Onboarding)' },
      { id: 'f5', name: 'התראות פוש (Push Notifications)' },
    ],
  },
  {
    id: 'p3',
    name: 'API - שרת תשלומים',
    files: [
      { id: 'f6', name: 'סליקת כרטיסי אשראי' },
      { id: 'f7', name: 'בדיקות שגיאות שרת' },
    ],
  },
  {
    id: 'p4',
    name: 'מערכת ניהול לקוחות (CRM)',
    files: [
      { id: 'f1', name: 'בדיקות לוגין ואבטחה' },
      { id: 'f2', name: 'ניהול רשימת אנשי קשר' },
      { id: 'f3', name: 'ייצוא דוחות אקסל' },
    ],
  },
    {
    id: 'p5',
    name: 'מערכת ניהול לקוחות (CRM)',
    files: [
      { id: 'f1', name: 'בדיקות לוגין ואבטחה' },
      { id: 'f2', name: 'ניהול רשימת אנשי קשר' },
      { id: 'f3', name: 'ייצוא דוחות אקסל' },
    ],
  },
];