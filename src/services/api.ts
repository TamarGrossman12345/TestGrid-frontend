import axios from "axios";

const baseURL = "http://localhost:5000";

export const getAllProjects = () => {
  return axios({
    method: "GET",
    url: `${baseURL}/projects`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTestCasesFromFile = (fileId: string) => {
  return axios({
    method: "GET",
    url: `${baseURL}/testCase/${fileId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProject = (projectId: string) => {
  return axios({
    method: "DELETE",
    url: `${baseURL}/projects/${projectId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteFile = (testFileId: string) => {
  return axios({
    method: "DELETE",
    url: `${baseURL}/files/${testFileId}`,
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
  const url = projectId ? `${baseURL}/files` : `${baseURL}/projects`;

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
  fileId: string,
  title: string,
  testSteps: string,
  expectedResults: string,
  status: string
) => {
  const bodyData = { title, testSteps, expectedResults, status };

  return axios({
    method: "POST",
    url: `${baseURL}/testCases/newTestCase/${fileId}`,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
