import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { RefreshCw, Plus } from "lucide-react";

interface WorkspaceHeaderProps {
  activeProjectName: string;
  testCasesCount: number;
  activeFolderId: string | undefined;
  onSync: () => void;
  onNewTest: () => void;
}

const WorkspaceHeader = ({
  activeProjectName,
  testCasesCount,
  activeFolderId,
  onSync,
  onNewTest,
}: WorkspaceHeaderProps) => {
  const buttonStyle = {
    "&.Mui-disabled": {
      color: "secondary.main",
      opacity: 0.7,
      borderColor: "secondary.main",
      border: "1px solid",
    },
  };

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
            {activeProjectName}
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
          sx={buttonStyle}
        >
          Sync
        </Button>

        <Button
          variant="outlined"
          onClick={onNewTest}
          startIcon={<Plus size={16} />}
          disabled={activeFolderId === undefined}
          sx={buttonStyle}
        >
          New Test
        </Button>
      </Box>
    </Box>
  );
};

export default WorkspaceHeader;
