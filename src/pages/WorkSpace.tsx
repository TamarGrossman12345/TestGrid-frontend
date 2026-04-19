// src/pages/Dashboard.tsx
import React, { useState, useMemo, act } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import StatsFooter from "../components/Workspace/StatsFooter";
import FilterBar from "../components/Workspace/FilterBar";
import { TestCase, User, Project, TestStatus } from "../types";
import TestGrid from "../components/Workspace/TestGrid";
import TestCaseDialog from "../components/Workspace/TestCaseDialog";
import NewProjectAndFolderDialog from "../components/Workspace/NewProjectAndFolderDialog";
import { useSideBarManager } from "../hooks/useSideBarManager";
import WorkspaceHeader from "../components/Workspace/WorkspaceHeader";
import {
  getTestCasesFromFile,
} from "../services/api";
import AlertNotice from "../components/common/AlertNotice";
import { DELETE_CONFIGS } from "../constants/deleteConfigs";
import { useNotification } from "../components/common/NotificationContext";
import { useTestCasesManager } from "../hooks/useTestCasesManager";

interface WorkSpaceProps {
  projects: Project[];
  onRefreshProjects: () => Promise<void>;
}
export type DeleteConfig = {
  isOpen: boolean;
  message: string;
  title: string;
  onConfirm: () => Promise<void> | void;
} | null;

export const WorkSpace = ({ projects, onRefreshProjects }: WorkSpaceProps) => {
  const projectManager = useSideBarManager(onRefreshProjects);
  const testCasesManger = useTestCasesManager();

  const [activeTestCases, setActiveTestCases] = useState<TestCase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [openProject, setOpenProject] = useState<string | null>(null);

  const [activeFolderId, setActiveFolderId] = useState<string | undefined>();

  const [deleteConfig, setDeleteConfig] = useState<DeleteConfig>(null);

  const triggerDelete = (type: keyof typeof DELETE_CONFIGS, id: string) => {
    const { title, message } = DELETE_CONFIGS[type];

    setDeleteConfig({
      isOpen: true,
      title,
      message,
      onConfirm: async () => {
        try {
          if (type === "project") await projectManager.handleDeleteProject(id);
          if (type === "folder") await projectManager.handleDeleteFolder(id);
          if (type === "testCase") {
            await projectManager.handleDeleteTestCase(id);
            testCasesManger.setSelectedTest(null);
            if (activeFolderId) handleFolderClick(activeFolderId);
          }
        } catch (error) {
          console.error("Delete failed", error);
        }
      },
    });
  };

  const handleFolderClick = async (fileId: string) => {a se
    try {
      const response = await getTestCasesFromFile(fileId);
      setActiveTestCases(response.data);
      setActiveFolderId(fileId);
    } catch (error) {
      console.error("Error fetching test cases:", error);
    }
  };

  const handleProjectClick = (id: string) => {
    setOpenProject(openProject === id ? null : id);
  };

  const filteredTestCases = useMemo(() => {
    return activeTestCases.filter((tc) => {
      const matchesSearch =
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.TestCaseId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || tc.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [activeTestCases, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: activeTestCases.length,
      pass: activeTestCases.filter((t) => t.status === "pass").length,
      fail: activeTestCases.filter((t) => t.status === "fail").length,
      inProgress: activeTestCases.filter((t) => t.status === "in-progress")
        .length,
    };
  }, [activeTestCases]);

  const activeProjectName = useMemo(() => {
    if (openProject === null) return "All Projects";
    const project = projects.find((p) => p.projectId === openProject);
    return project?.projectName || "Unknown Project";
  }, [openProject]);

  // const activeFolderName = useMemo(() => {
  //   if (activeFolderId === undefined) return "All Folders";
  //   const folder = projects.find((p) => p.projectId === openProject);
  //   return project?.projectName || "Unknown Project";
  // }, [activeFolderId]);

  return (
    <>
      <Box
        sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
      >
        <Box sx={{ display: "flex" }}>
          <Sidebar
            projects={projects}
            openProject={openProject}
            handleProjectClick={handleProjectClick}
            handleDeleteFolder={(id) => triggerDelete("folder", id)}
            handleDeleteProject={(id) => triggerDelete("project", id)}
            onAddNewProject={() => projectManager.handleOpenProjectDialog()}
            onAddNewFolder={(id) => projectManager.handleOpenProjectDialog(id)}
            handleFolderClick={handleFolderClick}
          />
          {projectManager.isProjectDialogOpen && (
            <NewProjectAndFolderDialog
              projectId={projectManager.activeProjectId}
              onClose={projectManager.handleCloseProjectDialog}
              onSave={projectManager.handleCreateProjectAndFolder}
            />
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <WorkspaceHeader
            activeProjectName={activeProjectName}
            testCasesCount={filteredTestCases.length}
            activeFolderId={activeFolderId}
            onSync={() => activeFolderId && handleFolderClick(activeFolderId)}
            onNewTest={() => testCasesManger.setShowTestCaseDialog(true)}
          />

          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            activeFolderId={activeFolderId}
            currentTestCases={filteredTestCases}
          />

          <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
            <TestGrid
              testCases={filteredTestCases}
              onStatusChange={testCasesManger.handleStatusChange}
              onEditTest={testCasesManger.setSelectedTest}
              isFolderActive={activeFolderId}
            />
          </Box>

          <StatsFooter {...stats} />
        </Box>
        <TestCaseDialog
          open={
            testCasesManger.showTestCaseDialog ||
            Boolean(testCasesManger.selectedTest)
          }
          initialTestData={testCasesManger.selectedTest}
          onClose={() => {
            testCasesManger.setShowTestCaseDialog(false);
            testCasesManger.setSelectedTest(null);
          }}
          onSave={
            testCasesManger.selectedTest
              ? testCasesManger.handleSaveEdit
              : (testData) =>
                  testCasesManger.handleTestCaseCreation(
                    testData,
                    activeFolderId,
                  )
          }
          onDelete={
            testCasesManger.selectedTest
              ? () =>
                  triggerDelete(
                    "testCase",
                    testCasesManger.selectedTest!.TestCaseId,
                  )
              : undefined
          }
        />
      </Box>
      {deleteConfig && (
        <AlertNotice
          open={deleteConfig.isOpen}
          title={deleteConfig.title}
          message={deleteConfig.message}
          onClose={() => setDeleteConfig(null)}
          onConfirm={async () => {
            await deleteConfig.onConfirm();
            setDeleteConfig(null);
          }}
        />
      )}
    </>
  );
};

export default WorkSpace;
