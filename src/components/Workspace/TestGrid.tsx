import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import { TestCase, TestStatus } from "../../types";
import { getTestCasesFromFile, updateTestCase } from "../../services/api";

interface TestGridProps {
  testCases: TestCase[];
  refreshTable: (folderId: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pass":
      return "success.main"; // ירוק של ה-Theme
    case "fail":
      return "error.main"; // אדום של ה-Theme
    case "in-progress":
      return "secondary.dark"; // כחול של ה-Theme
    default:
      return "text.secondary"; // אפור ברירת מחדל
  }
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    "in-progress": "In Progress",
    pass: "Pass",
    fail: "Fail",
    pending: "Pending",
  };
  return labels[status] || status;
};

const handleStatusChange = async (
  testCaseId: string,
  newStatus: string,
  refreshTable: (folderId: string) => void
) => {
  try {
    // אנחנו "מאלצים" את הטיפוס להיות נכון
    const updated = await updateTestCase(testCaseId, {
      status: newStatus as TestStatus,
    });
    refreshTable(updated.data.fileId);


    // עדכון ה-State המקומי (לדוגמה)
    // setTestCases(prev => prev.map(tc => tc.TestCaseId === id ? updated : tc));
  } catch (error) {
    console.error("Failed to update status", error);
  }
};

const TestGrid = ({ testCases , refreshTable}: TestGridProps) => {
  const columnDivider = {
    borderRight: "1px solid",
    borderColor: "grey.200",
    "&:last-child": {
      borderRight: "none",
      wordBreak: "break-word",
    },
  };

  return testCases.length > 0 ? (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", bgcolor: "transparent" }}
    >
      <Table
        stickyHeader
        sx={{
          tableLayout: "fixed", // ה מקבע את רוחב העמודות
          width: "100%",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                ...columnDivider,
                bgcolor: "grey.50",
                fontWeight: 600,
                width: 80,
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                ...columnDivider,
                bgcolor: "grey.50",
                fontWeight: 600,
                minWidth: 200,
              }}
            >
              Title
            </TableCell>
            <TableCell
              sx={{
                ...columnDivider,
                bgcolor: "grey.50",
                fontWeight: 600,
                minWidth: 250,
              }}
            >
              Test Steps
            </TableCell>
            <TableCell
              sx={{
                ...columnDivider,
                bgcolor: "grey.50",
                fontWeight: 600,
                minWidth: 250,
              }}
            >
              Expected Result
            </TableCell>
            <TableCell
              sx={{
                ...columnDivider,
                bgcolor: "grey.50",
                fontWeight: 600,
                width: 120,
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow
              key={testCase.TestCaseId}
              sx={{ "&:hover": { bgcolor: "action.hover" } }}
            >
              <TableCell sx={columnDivider}>
                <Typography variant="body2">{`TG - ${testCase.serialId}`}</Typography>
              </TableCell>

              <TableCell sx={columnDivider} align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {testCase.title}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell sx={{ ...columnDivider, textAlign: "right" }}>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "pre-line",
                    color: "text.secondary",
                    display: "block",
                    direction: "rtl", // הופך את כיוון הקריאה (המספר יופיע בצד ימין)
                    unicodeBidi: "plaintext",
                  }}
                >
                  {testCase.testSteps}
                </Typography>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center", // מרכוז אופקי
                    alignItems: "center", // מרכוז אנכי
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {testCase.expectedResults}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center", // מרכוז אופקי
                    alignItems: "center", // מרכוז אנכי
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Select
                    value={testCase.status}
                    onChange={(e) =>
                      handleStatusChange(
                        testCase.TestCaseId,
                        e.target.value,
                        refreshTable
                      )
                    }
                    size="small"
                    sx={{
                      color: getStatusColor(testCase.status),
                      fontWeight: 600,
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiSelect-icon": {
                        color: "primary.main",
                      }, // צובע גם את החץ
                    }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="pass">Pass</MenuItem>
                    <MenuItem value="fail">Fail</MenuItem>
                  </Select>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        textAlign: "center",
        opacity: 0.6,
      }}
    >
      <Typography variant="h6" fontWeight="600">
        No Test Cases Yet
      </Typography>

      <Typography variant="body2">
        This folder is empty. Start by creating your first test case!
      </Typography>
    </Box>
  );
};

export default TestGrid;
