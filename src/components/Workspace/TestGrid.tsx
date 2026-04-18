import React, { useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { TestCase, TestStatus } from "../../types";
import { deleteTestCase, updateTestCase } from "../../services/api";
import { getStatusColor } from "../../utils/testStatus";
import EmptyNotice from "../common/EmptyNotice";
import TestCaseDialog from "./TestCaseDialog";

interface TestGridProps {
  testCases: TestCase[];
  refreshTable: (folderId: string) => void;
  isFolderActive: string | undefined;
}

const TestGrid = ({
  testCases,
  refreshTable,
  isFolderActive,
}: TestGridProps) => {
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);

  const handleStatusChange = async (testCaseId: string, newStatus: string) => {
    try {
      const updated = await updateTestCase(testCaseId, {
        status: newStatus as TestStatus,
      });
      refreshTable(updated.data.fileId);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDeleteTestCase = async (testCaseId: string) => {
    try {
      await deleteTestCase(testCaseId);
      setSelectedTest(null);
      await refreshTable(isFolderActive!);
    } catch (err) {
      console.error("Error deleting file", err);
    }
  };

  const handleSaveEdit = async (updatedData: Partial<TestCase>) => {
    if (!selectedTest) return;
    try {
      await updateTestCase(selectedTest.TestCaseId, updatedData);
      refreshTable(isFolderActive!); // רענון הטבלה
      setSelectedTest(null); // סגירת הדיאלוג
    } catch (error) {
      console.error("Failed to update test case", error);
    }
  };

  if (isFolderActive === undefined) {
    return (
      <EmptyNotice
        title="No open folder Yet"
        description="Open a folder and start creating your test cases!"
      />
    );
  }

  if (testCases.length === 0) {
    return (
      <EmptyNotice
        title="No Test Cases Yet"
        description="This folder is empty. Start by creating your first test case!"
      />
    );
  }

  const columnDivider = {
    borderRight: "1px solid",
    borderColor: "grey.200",
    "&:last-child": { borderRight: "none" },
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", bgcolor: "transparent" }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
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
                  width: 150,
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
                onClick={() => setSelectedTest(testCase)}
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
                    // הוספת onClick כאן עוצרת את הביעבוע לשורה
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Select
                      IconComponent={() => null}
                      value={testCase.status}
                      onChange={(e) =>
                        handleStatusChange(testCase.TestCaseId, e.target.value)
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTest && (
        <TestCaseDialog
          initialTestData={selectedTest}
          onClose={() => setSelectedTest(null)}
          onSave={handleSaveEdit}
          onDelete={() => handleDeleteTestCase(selectedTest.TestCaseId)}
        />
      )}
    </>
  );
};

export default TestGrid;
