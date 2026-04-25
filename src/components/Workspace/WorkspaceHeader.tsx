import { Box, Typography, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Plus } from "lucide-react";

import { Project } from "../../types";

interface WorkspaceHeaderProps {
  activeProjectName: string;
  testCasesCount: number;
  activeFolderId: string | undefined;
  onSync: () => void;
  onNewTest: () => void;
  openProject: string | null;
  projects: Project[];
}

const WorkspaceHeader = ({
  activeProjectName,
  testCasesCount,
  activeFolderId,
  onSync,
  onNewTest,
  openProject,
  projects,
}: WorkspaceHeaderProps) => {
  const buttonDisableStyle = {
    "&.Mui-disabled": {
      color: "secondary.main",
      opacity: 0.7,
      borderColor: "secondary.main",
      border: "1px solid",
    },
  };

  const activeFolderName = useMemo(() => {
    if (!openProject || !activeFolderId) return "All Projects";
    const currentProject = projects.find((p) => p.projectId === openProject);
    const currentFolder = currentProject?.files?.find(
      (f) => f.TestFileId === activeFolderId,
    );
    return currentFolder?.name || "Unknown Folder";
  }, [openProject, activeFolderId, projects]);

  return (
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
            {activeFolderName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {testCasesCount} test cases found
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          onClick={onSync}
          variant="outlined"
          startIcon={<RefreshCw size={16} />}
          disabled={activeFolderId === undefined}
          sx={buttonDisableStyle}
        >
          Sync
        </Button>

        <Button
          variant="outlined"
          onClick={onNewTest}
          startIcon={<Plus size={16} />}
          disabled={activeFolderId === undefined}
          sx={buttonDisableStyle}
        >
          New Test
        </Button>
      </Box>
    </Box>
  );
};

export default WorkspaceHeader;
