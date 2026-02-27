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
import { NewProjectDialog } from "../components/Workspace/NewProjectDialog";

interface WorkSpaceProps {
  testCases: TestCase[];
  users: User[];
  projects: Project[];
}

export const WorkSpace = ({ testCases, users, projects }: WorkSpaceProps) => {
  const [NewTestCases, setNewTestCases] = useState(testCases); // סטייט שנועד כדי לסנכרן את הטבלה כשמוסיפים טסט חדש בדילאוגג
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showNewTestDialog, setShowNewTestDialog] = useState(false);

  const [openProject, setOpenProject] = useState<string | null>(null);

  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<string | undefined>(
    undefined,
  );

  const handleOpenProjectDialog = (parentId?: string) => {
    setCurrentParentId(parentId);
    setIsProjectDialogOpen(true);
  };

  const handleProjectClick = (id: string) => {
    setOpenProject(openProject === id ? null : id);
  };

  const filteredTestCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchesSearch =
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || tc.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [testCases, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: testCases.length,
      pass: testCases.filter((t) => t.status === "pass").length,
      fail: testCases.filter((t) => t.status === "fail").length,
      inProgress: testCases.filter((t) => t.status === "in-progress").length,
    };
  }, [testCases]);

  const activeProjectName = useMemo(() => {
    if (!openProject) return "All Projects";
    const project = projects.find((p) => p.id === openProject);
    return project?.name || "Unknown Project";
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
          onAddNewProject={() => handleOpenProjectDialog()}
          onAddNewFolder={(id) => handleOpenProjectDialog(id)}
        />
        {isProjectDialogOpen && (
          <NewProjectDialog
            parentId={currentParentId}
            onClose={() => setIsProjectDialogOpen(false)}
            onSave={(data) => {
              // כאן את מוסיפים את הפרויקט/תיקייה לבסיס נתונים (שולחים לבאק)
              console.log("Saving:", data);
              setIsProjectDialogOpen(false);
            }}
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
