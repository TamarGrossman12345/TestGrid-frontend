// src/pages/Dashboard.tsx
import React, { useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { RefreshCw, Plus } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import StatsFooter from "../components/Workspace/StatsFooter";
import FilterBar from "../components/Workspace/FilterBar";
import { TestCase, User, Project } from "../types";
import TestGrid from "../components/Workspace/TestGrid";
import NewTestDialog from "../components/Workspace/NewTestDialog";
import NewProjectAndFolderDialog from "../components/Workspace/NewProjectAndFolderDialog";
import { useSideBarManager } from "../hooks/useSideBarManager";
import { getTestCasesFromFile } from "../services/api";

interface WorkSpaceProps {
  projects: Project[];
  onRefreshProjects: () => Promise<void>;
}

export const WorkSpace = ({
  projects,
  onRefreshProjects,
}: WorkSpaceProps) => {
  const projectManager = useSideBarManager(onRefreshProjects);

  const [activeTestCases, setActiveTestCases] =useState<TestCase[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showNewTestDialog, setShowNewTestDialog] = useState(false);

  const [openProject, setOpenProject] = useState<string | null>(null);

  const [activeFolderId, setActiveFolderId] = useState<string | undefined>();

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
      inProgress: activeTestCases.filter((t) => t.status === "in-progress").length,
    };
  }, [activeTestCases]);

  const activeProjectName = useMemo(() => {
    if (!openProject) return "All Projects";
    const project = projects.find((p) => p.projectId === openProject);
    return project?.projectName || "Unknown Project";
  }, [openProject, projects]);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Box sx={{ display: "flex" }}>
        <Sidebar
          projects={projects}
          openProject={openProject}
          handleProjectClick={handleProjectClick}
          handleDeleteFolder={projectManager.handleDeleteFolder}
          handleDeleteProject={projectManager.handleDeleteProject}
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
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 1,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Test Cases
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Typography variant="body2" color="text.secondary">
                {activeProjectName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredTestCases.length} test cases found
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<RefreshCw size={16} />}>
              Sync
            </Button>

            <Button
              variant="contained"
              onClick={() => setShowNewTestDialog(true)}
              startIcon={<Plus size={16} />}
            >
              New Test
            </Button>
          </Box>
        </Box>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
          <TestGrid testCases={filteredTestCases} />
        </Box>

        <StatsFooter {...stats} />
      </Box>
      {showNewTestDialog && (
        <NewTestDialog onClose={() => setShowNewTestDialog(false)} />
      )}
    </Box>
  );
};
