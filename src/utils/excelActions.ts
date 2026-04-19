import * as XLSX from "xlsx";
import { TestCase } from "../types";

export const handleExportToExcel = (currentTestCases: TestCase[]) => {
  if (!currentTestCases || currentTestCases.length === 0) return;

  const dataToExport = currentTestCases.map((tc) => ({
    ID: `TG-${tc.serialId}`,
    Title: tc.title,
    "Test Steps": tc.testSteps,
    "Expected Results": tc.expectedResults,
    Status: tc.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "TestCases");

  XLSX.writeFile(
    workbook,
    `TestCases_Export_${new Date().toLocaleDateString()}.xlsx`,
  );
};
