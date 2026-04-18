import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { TestCase, TestStatus } from "../../types";
import { getStatusColor } from "../../utils/testStatus";

interface TestCaseRowProps {
  testCase: TestCase;
  onEdit: (testCase: TestCase) => void;
  onStatusChange: (testCaseId: string, newStatus: TestStatus) => void;
  columnDivider: object;
}

const TestCaseRow = ({
  testCase,
  onEdit,
  onStatusChange,
  columnDivider,
}: TestCaseRowProps) => {
  return (
    <TableRow
      onClick={() => onEdit(testCase)}
      sx={{
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <TableCell sx={columnDivider}>
        <Typography variant="body2">{`TG - ${testCase.serialId}`}</Typography>
      </TableCell>

      <TableCell sx={columnDivider} align="center">
        <Typography variant="body2" fontWeight="medium">
          {testCase.title}
        </Typography>
      </TableCell>

      <TableCell
        sx={{
          ...columnDivider,
          textAlign: "right",
          direction: "rtl",
          unicodeBidi: "plaintext",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line" }}
        >
          {testCase.testSteps}
        </Typography>
      </TableCell>

      <TableCell sx={columnDivider} align="center">
        <Typography variant="body2" color="text.secondary">
          {testCase.expectedResults}
        </Typography>
      </TableCell>

      <TableCell sx={columnDivider} align="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Select
            IconComponent={() => null}
            value={testCase.status}
            onChange={(e) =>
              onStatusChange(testCase.TestCaseId, e.target.value as TestStatus)
            }
            size="small"
            sx={{
              color: getStatusColor(testCase.status),
              fontWeight: 600,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": { paddingX: "8px !important" },
              "&:hover": { bgcolor: "rgba(243, 170, 206, 0.25)" },
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
  );
};

export default TestCaseRow;
