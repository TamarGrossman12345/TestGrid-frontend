import React, { useEffect, useState } from "react";
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
  open: boolean;
  onClose: () => void;
  onSave?: (testData: Partial<TestCase>) => void;
  initialTestData?: TestCase | null;
  onDelete?: () => void;
}

const TestCaseDialog = ({
  onClose,
  onSave,
  initialTestData,
  onDelete,
  open,
}: TestCaseDialogProps) => {
  const [dialogTitle, setDialogTitle] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const [formData, setFormData] = useState({
    title: initialTestData?.title || "",
    testSteps: initialTestData?.testSteps || "",
    expectedResults: initialTestData?.expectedResults || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSave) {
      onSave({
        title: formData.title.trim(),
        testSteps: formData.testSteps.trim(),
        expectedResults: formData.expectedResults.trim(),
        status: initialTestData?.status || "pending",
      });
    }

    // הערה: עדיף שה-onClose יקרה ב-WorkSpace רק אחרי שה-API מחזיר תשובה חיובית,
    // אבל כרגע אפשר להשאיר אותו פה כדי שהדיאלוג ייסגר מיד.
    onClose();
  };

  useEffect(() => {
    if (open) {
      const isEdit = Boolean(initialTestData);

      setDialogTitle(isEdit ? "Edit Test Case" : "Create Test Case");
      setSubmitButtonText(isEdit ? "Save Changes" : "Create New Test Case");
      setShowDelete(isEdit);

      setFormData({
        title: initialTestData?.title || "",
        testSteps: initialTestData?.testSteps || "",
        expectedResults: initialTestData?.expectedResults || "",
      });
    }
  }, [open, initialTestData]);
  return (
    <Dialog
      open={open}
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
                {dialogTitle}
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
          {showDelete && onDelete && (
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
            {submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TestCaseDialog;
