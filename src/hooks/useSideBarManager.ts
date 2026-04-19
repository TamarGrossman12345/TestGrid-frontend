import { useState } from "react";
import {
  createProjectAndFolder,
  deleteFile,
  deleteProject,
  deleteTestCase,
} from "../services/api";

export const useSideBarManager = (onRefresh: () => Promise<void>) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const triggerSnackbar = (
    message: string,
    severity: "success" | "error" = "success",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
      triggerSnackbar("project/folder created successfully!");
      await onRefresh();
    } catch (err: any) {
      triggerSnackbar(" error in creating project/folder");
      console.error(
        "Error creating folder/project",
        err.response?.data || err.message,
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      triggerSnackbar("project deleted successfully!");
      await onRefresh();
    } catch (err) {
      triggerSnackbar("failed to delete project!");
      console.error("Error deleting project", err);
    }
  };

  const handleDeleteFolder = async (testFileId: string) => {
    try {
      await deleteFile(testFileId);
      triggerSnackbar("folder deleted successfully!");
      await onRefresh();
    } catch (err) {
      triggerSnackbar("failed to delete folder!");
      console.error("Error deleting file", err);
    }
  };

    const handleDeleteTestCase = async (testCaseId: string) => {
    try {
      await deleteTestCase(testCaseId);
      triggerSnackbar("test case deleted successfully!");
      await onRefresh();
    } catch (err) {
      triggerSnackbar("failed to delete test case!");
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
    handleCloseSnackbar,
    snackbar,
    triggerSnackbar,
    handleDeleteTestCase,
  };
}


