import { useState } from "react";
import {
  createProjectAndFolder,
  deleteFile,
  deleteProject,
  deleteTestCase,
} from "../services/api";
import { useNotification } from "../components/common/NotificationContext";

export const useSideBarManager = (onRefresh: () => Promise<void>) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();

  const { showNotification } = useNotification();



  const handleOpenProjectDialog = (projectId?: string) => {
    setActiveProjectId(projectId);
    setIsProjectDialogOpen(true);
  };

  const handleCloseProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setActiveProjectId(undefined);
  };

  const handleCreateProjectAndFolder = async (
    name: string,
    description: string,
    projectId?: string,
  ) => {
    try {
      await createProjectAndFolder(name, description, projectId);
      handleCloseProjectDialog();
      showNotification("project/folder created successfully!", "success");
      await onRefresh();
    } catch (err: any) {
      showNotification("failed to create project/folder!", "error");
      console.error(
        "Error creating folder/project",
        err.response?.data || err.message,
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      showNotification("project deleted successfully!", "success");
      await onRefresh();
    } catch (err) {
      showNotification("failed to delete project!", "error");
      console.error("Error deleting project", err);
    }
  };

  const handleDeleteFolder = async (testFileId: string) => {
    try {
      await deleteFile(testFileId);
      showNotification("folder deleted successfully!", "success");
      await onRefresh();
    } catch (err) {
      showNotification("failed to delete folder!", "error");
      console.error("Error deleting file", err);
    }
  };

  const handleDeleteTestCase = async (testCaseId: string) => {
    try {
      await deleteTestCase(testCaseId);
      showNotification("test case deleted successfully!", "success");
      await onRefresh();
    } catch (err) {
      showNotification("failed to delete test case!", "error");
      console.error("Error deleting file", err);
    }
  };

  return {
    isProjectDialogOpen,
    activeProjectId,
    handleOpenProjectDialog,
    handleCloseProjectDialog,
    handleCreateProjectAndFolder,
    handleDeleteProject,
    handleDeleteFolder,
    handleDeleteTestCase,
  };
};
