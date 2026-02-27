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
  
} from "@mui/material";
import { TestCase } from "../../types";
import { Bold } from "lucide-react";

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

export function TestGrid({ testCases }: TestGridProps) {
  
  const columnDivider = {
    borderRight: '1px solid',
    borderColor: 'grey.200', 
    '&:last-child': {
      borderRight: 'none', 
    },
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", bgcolor: "transparent" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...columnDivider, bgcolor: "grey.50", fontWeight: 600, width: 80 }}>ID</TableCell>
            <TableCell sx={{ ...columnDivider, bgcolor: "grey.50", fontWeight: 600, minWidth: 200 }}>Title</TableCell>
            <TableCell sx={{ ...columnDivider, bgcolor: "grey.50", fontWeight: 600, minWidth: 250 }}>Test Steps</TableCell>
            <TableCell sx={{ ...columnDivider, bgcolor: "grey.50", fontWeight: 600, minWidth: 250 }}>Expected Result</TableCell>
            <TableCell sx={{ ...columnDivider, bgcolor: "grey.50", fontWeight: 600, width: 120 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow key={testCase.id} sx={{ "&:hover": { bgcolor: "action.hover" } }}>
              <TableCell sx={columnDivider}>
                <Typography variant="body2">{testCase.id}</Typography>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Typography variant="body2" fontWeight="medium">{testCase.title}</Typography>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line", color: "text.secondary" }}>
                  {testCase.testSteps}
                </Typography>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Typography variant="body2" color="text.secondary">{testCase.expectedResult}</Typography>
              </TableCell>

              <TableCell sx={columnDivider}>
                <Typography
                  variant="body2"
                  color={getStatusColor(testCase.status) as any}
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  {getStatusLabel(testCase.status)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}