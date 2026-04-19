import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
  createTestCase,
  deleteTestCase,
  updateTestCase,
} from "../services/api";
import { TestCase, TestStatus } from "../types";

export const useTestCasesManager = () => {
  const { showNotification } = useNotification();
  const [showTestCaseDialog, setShowTestCaseDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);
  const [activeTestCases, setActiveTestCases] = useState<TestCase[]>([]);

  const handleTestCaseCreation = async (
    testData: Partial<TestCase>,
    activeFolderId?: string | undefined,
  ) => {
    try {
      await createTestCase(
        activeFolderId!,
        testData.title!,
        testData.testSteps!,
        testData.expectedResults!,
        testData.status!,
      );
      setShowTestCaseDialog(false);
      showNotification("test case created successfully!", "success");
      //   if (activeFolderId) handleFolderClick(activeFolderId);
    } catch (err: any) {
      showNotification("failed to create test case!", "error");
    }
  };

  const handleStatusChange = async (
    testCaseId: string,
    newStatus: TestStatus,
  ) => {
    try {
      await updateTestCase(testCaseId, { status: newStatus });
      showNotification("test case status updated successfully!", "success");
      // if (activeFolderId) handleFolderClick(activeFolderId);
    } catch (error) {
      showNotification("failed to update test case status!", "error");
      console.error("Failed to update status", error);
    }
  };

  const handleSaveEdit = async (updatedData: Partial<TestCase>) => {
    if (!selectedTest) return;
    try {
      await updateTestCase(selectedTest.TestCaseId, updatedData);
      showNotification("test case updated successfully!", "success");
      //   if (activeFolderId) handleFolderClick(activeFolderId);
      setSelectedTest(null);
    } catch (error) {
      showNotification("failed to update test case!", "error");
      console.error("Failed to update test case", error);
    }
  };
  const handleDeleteTestCase = async (testCaseId: string) => {
    try {
      await deleteTestCase(testCaseId);
      showNotification("test case deleted successfully!", "success");
      // await onRefresh();
    } catch (err) {
      showNotification("failed to delete test case!", "error");
      console.error("Error deleting file", err);
    }
  };

  return {
    handleTestCaseCreation,
    setShowTestCaseDialog,
    showTestCaseDialog,
    handleStatusChange,
    handleSaveEdit,
    setSelectedTest,
    selectedTest,
    handleDeleteTestCase,
    activeTestCases,
    setActiveTestCases,
  };
};
