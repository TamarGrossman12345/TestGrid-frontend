// src/pages/Dashboard.tsx
import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
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
  createTestCase,
  deleteTestCase,
  getTestCasesFromFile,
  updateTestCase,
} from "../services/api";
import AlertNotice from "../components/common/AlertNotice";

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

  const [activeTestCases, setActiveTestCases] = useState<TestCase[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showTestCaseDialog, setShowTestCaseDialog] = useState(false);

  const [openProject, setOpenProject] = useState<string | null>(null);

  const [activeFolderId, setActiveFolderId] = useState<string | undefined>();

  const [deleteConfig, setDeleteConfig] = useState<DeleteConfig>(null);
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);

  const triggerDeleteProject = (projectId: string) => {
    setDeleteConfig({
      isOpen: true,
      title: "Do you want to delete this project? ",
      message: "All folders and test cases inside will be lost forever.",
      onConfirm: () => projectManager.handleDeleteProject(projectId),
    });
  };

  const triggerDeleteFolder = (folderId: string) => {
    setDeleteConfig({
      isOpen: true,
      title: "Do you want to delete this folder? ",
      message: "All the test cases inside will be lost forever.",
      onConfirm: () => projectManager.handleDeleteFolder(folderId),
    });
  };
  const handleFolderClick = async (fileId: string) => {
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

  const handleTestCaseCreation = async (testData: Partial<TestCase>) => {
    try {
      await createTestCase(
        activeFolderId!,
        testData.title!,
        testData.testSteps!,
        testData.expectedResults!,
        testData.status!,
      );
      // אחרי יצירה מוצלחת, נשלוף מחדש את הטסטים כדי לעדכן את הטבלה
      if (activeFolderId) handleFolderClick(activeFolderId);
    } catch (err: any) {
      console.error(
        "Error creating test case:",
        err.response?.data || err.message,
      );
    }
  };

  const handleStatusChange = async (
    testCaseId: string,
    newStatus: TestStatus,
  ) => {
    try {
      await updateTestCase(testCaseId, { status: newStatus });
      if (activeFolderId) handleFolderClick(activeFolderId);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleSaveEdit = async (updatedData: Partial<TestCase>) => {
    if (!selectedTest) return;
    try {
      await updateTestCase(selectedTest.TestCaseId, updatedData);
      if (activeFolderId) handleFolderClick(activeFolderId);
      setSelectedTest(null);
    } catch (error) {
      console.error("Failed to update test case", error);
    }
  };

  const triggerDeleteTestCase = (testCaseId: string) => {
    setDeleteConfig({
      isOpen: true,
      title: "Do you want to delete this test case? ",
      message: "All the information inside will be lost forever.",
      onConfirm: async () => {
        await deleteTestCase(testCaseId);
        setSelectedTest(null);
        if (activeFolderId) handleFolderClick(activeFolderId);
      },
    });
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
            handleDeleteFolder={triggerDeleteFolder}
            handleDeleteProject={triggerDeleteProject}
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
            onNewTest={() => setShowTestCaseDialog(true)}
          />

          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
            <TestGrid
              testCases={filteredTestCases}
              onStatusChange={handleStatusChange}
              onEditTest={setSelectedTest}
              isFolderActive={activeFolderId}
            />
          </Box>

          <StatsFooter {...stats} />
        </Box>
        {showTestCaseDialog && (
          <TestCaseDialog
            onClose={() => setShowTestCaseDialog(false)}
            onSave={handleTestCaseCreation}
          />
        )}
        {selectedTest && (
          <TestCaseDialog
            initialTestData={selectedTest}
            onClose={() => setSelectedTest(null)}
            onSave={handleSaveEdit}
            onDelete={() => triggerDeleteTestCase(selectedTest.TestCaseId)}
          />
        )}
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
