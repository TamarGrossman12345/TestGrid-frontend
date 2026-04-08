export type TestStatus = 'pass' | 'fail' | 'in-progress' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'qa-engineer' | 'viewer';
  avatar: string;
  color: string;
}

export interface TestCase {
  TestCaseId : string;
  title: string;
  testSteps: string;
  expectedResults: string;
  assignee: User;
  status: TestStatus;
}

export interface TestFile {
  TestFileId: string;
  name: string;
  testCases: TestCase[];
}

export interface Project {
  projectId: string;
  projectName: string;
  description?: string;
  files: TestFile[]; 
  isPrivate?: boolean; 
}

export interface ActiveUser {
  user: User;
  cell: { rowId: string; columnId: string };
}
