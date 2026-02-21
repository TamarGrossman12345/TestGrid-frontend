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
  id: string;
  title: string;
  testSteps: string;
  expectedResult: string;
  assignee: User;
  status: TestStatus;
}

export interface Project {
  id: string;
  name: string;
  isPrivate: boolean;
  children?: Project[];
}

export interface ActiveUser {
  user: User;
  cell: { rowId: string; columnId: string };
}
