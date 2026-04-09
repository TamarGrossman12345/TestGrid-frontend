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
} from "@mui/material";
import { TestCase } from "../../types";

interface TestGridProps {
  testCases: TestCase[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pass":
      return "success";
    case "fail":
      return "error";
    case "in-progress":
      return "primary";
    default:
      return "default";
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

const TestGrid = ({ testCases }: TestGridProps) => {
  const columnDivider = {
    borderRight: "1px solid",
    borderColor: "grey.200",
    "&:last-child": {
      borderRight: "none",
      wordBreak: "break-word",
    },
  };

  return (
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
                    justifyContent: "center", // מרכוז אופקי
                    alignItems: "center", // מרכוז אנכי
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
                  <Typography
                    variant="body2"
                    color={getStatusColor(testCase.status) as any}
                    sx={{ fontWeight: 600, fontSize: "1rem" }}
                  >
                    {getStatusLabel(testCase.status)}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestGrid;
