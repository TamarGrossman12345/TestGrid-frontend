import { useState } from "react";
import {
  createProjectAndFolder,
  deleteFile,
  deleteProject,
} from "../services/api";

export const useSideBarManager = (onRefresh: () => Promise<void>) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | undefined>();

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
      await onRefresh();
    } catch (err: any) {
      console.error(
        "Error creating folder/project",
        err.response?.data || err.message,
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      await onRefresh();
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  const handleDeleteFolder = async (testFileId: string) => {
    try {
      await deleteFile(testFileId);
      await onRefresh();
    } catch (err) {
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
  };
}


