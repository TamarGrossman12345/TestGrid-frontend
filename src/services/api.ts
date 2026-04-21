import axios from "axios";
import type { TestCase } from "../types";
const baseURL = "http://localhost:5000";

export const getAllProjects = () => {
  return axios({
    method: "GET",
    url: `${baseURL}/api/projects/get-all-projects`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTestCasesFromFile = (folderId: string) => {
  return axios({
    method: "GET",
    url: `${baseURL}/api/testCases/get-testCases/${folderId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const getFoldersByProjectId = (projectId: string) => {
  return axios({
    method: "GET",
    url: `${baseURL}/api/folders/get-folders/${projectId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProject = (projectId: string) => {
  return axios({
    method: "DELETE",
    url: `${baseURL}/api/projects/delete-project/${projectId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteFile = (testFileId: string) => {
  return axios({
    method: "DELETE",
    url: `${baseURL}/api/folders/delete-folder/${testFileId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteTestCase = (testCaseId: string) => {
  return axios({
    method: "DELETE",
    url: `${baseURL}/api/testCases/delete-testCase/${testCaseId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createProjectAndFolder = (
  name: string,
  description: string,
  projectId?: string,
) => {
  const url = projectId
    ? `${baseURL}/api/folders/create-folder`
    : `${baseURL}/api/projects/create-project`;

  const bodyData = projectId
    ? { name, description, projectId }
    : { projectName: name, description };

  return axios({
    method: "POST",
    url: url,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTestCase = (
  folderId: string,
  title: string,
  testSteps: string,
  expectedResults: string,
  status: string,
) => {
  const bodyData = { title, testSteps, expectedResults, status };

  return axios({
    method: "POST",
    url: `${baseURL}/api/testCases/create-newTestCase/${folderId}`,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTestCase = (testCaseId: string, data: Partial<TestCase>) => {
  return axios({
    method: "PATCH",
    url: `${baseURL}/api/testCases/update-testCase/${testCaseId}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
