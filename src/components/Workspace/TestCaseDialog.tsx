import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

import { X, CheckCircle2, Trash } from "lucide-react";
import { TestCase } from "../../types";

interface TestCaseDialogProps {
  onClose: () => void;
  onSave?: (testData: TestCase) => void;
  initialTestData?: TestCase;
  onDelete?: () => void;
}
// צריך להוסיף פונקציה לשמירה כשנוסיף את הבאקקק
const TestCaseDialog = ({
  onClose,
  onSave,
  initialTestData,
  onDelete,
}: TestCaseDialogProps) => {
  const [formData, setFormData] = useState({
    title: initialTestData?.title || "",
    testSteps: initialTestData?.testSteps || "",
    expectedResults: initialTestData?.expectedResults || "",
  });

  const isEditMode = !!initialTestData;

  // צריך להוסיף שליחה לבאק אחרי ששומרים טסט קייס חדש
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // בדיקה ש-onSave אכן הועבר כפרופ
    if (onSave) {
      onSave({
        title: formData.title,
        testSteps: formData.testSteps,
        expectedResults: formData.expectedResults,
        status: initialTestData?.status || "pending",
      } as TestCase);
    }

    // הערה: עדיף שה-onClose יקרה ב-WorkSpace רק אחרי שה-API מחזיר תשובה חיובית,
    // אבל כרגע אפשר להשאיר אותו פה כדי שהדיאלוג ייסגר מיד.
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, px: 1 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 0, pt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="700">
                {isEditMode ? "Edit Test Case" : "Create Test Case"}
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: "text.secondary" }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 1 }}>
            <TextField
              fullWidth
              label="Title"
              placeholder="e.g., Validate user Login to the system"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Test Steps"
              placeholder="1. Step one...&#10;2. Step two..."
              value={formData.testSteps}
              onChange={(e) =>
                setFormData({ ...formData, testSteps: e.target.value })
              }
              multiline
              rows={4}
              required
            />

            <TextField
              fullWidth
              label="Expected Result"
              placeholder="What is the successful outcome?"
              value={formData.expectedResults}
              onChange={(e) =>
                setFormData({ ...formData, expectedResults: e.target.value })
              }
              multiline
              rows={2}
              required
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1, display: "flex" }}>
          {isEditMode && (
            <IconButton
              onClick={onDelete}
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                mr: "auto",
                ":hover": {
                  color: "error.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              <Trash size={20} />
            </IconButton>
          )}

          <Button
            onClick={onClose}
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            startIcon={<CheckCircle2 size={18} />}
            sx={{
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {isEditMode ? "Save Changes" : "Create New Test Case"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TestCaseDialog;
