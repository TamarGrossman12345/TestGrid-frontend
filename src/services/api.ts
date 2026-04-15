import axios from "axios";

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

export const getTestCasesFromFile = (fileId: string) => {
  return axios({
    method: "GET",
    url: `${baseURL}/api/testCases/get-testCases/${fileId}`,
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
  fileId: string,
  title: string,
  testSteps: string,
  expectedResults: string,
  status: string,
) => {
  const bodyData = { title, testSteps, expectedResults, status };

  return axios({
    method: "POST",
    url: `${baseURL}/api/testCases/create-newTestCase/${fileId}`,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
