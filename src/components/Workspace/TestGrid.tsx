import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TestCase, TestStatus } from "../../types";
import EmptyNotice from "../common/EmptyNotice";
import TestCaseRow from "./TestCaseRow";

interface TestGridProps {
  testCases: TestCase[];
  onStatusChange: (testCaseId: string, newStatus: TestStatus) => Promise<void>;
  onEditTest: (testCase: TestCase) => void;
  isFolderActive: string | undefined;
}

const TestGrid = ({
  testCases,
  onStatusChange,
  onEditTest,
  isFolderActive,
}: TestGridProps) => {
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
              <TestCaseRow
                key={testCase.TestCaseId}
                testCase={testCase}
                onEdit={onEditTest}
                onStatusChange={onStatusChange}
                columnDivider={columnDivider}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TestGrid;
