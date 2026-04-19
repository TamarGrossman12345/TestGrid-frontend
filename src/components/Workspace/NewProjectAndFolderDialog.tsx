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
import { X, Folder, FileText } from "lucide-react";


interface NewProjectAndFolderDialogProps {
  onClose: () => void;
  onSave: (name: string, description: string, projectId?: string) => void;
  projectId?: string; 
  open: boolean;
}

function NewProjectAndFolderDialog({
  onClose,
  onSave,
  projectId,
  open,
}: NewProjectAndFolderDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const isFolder = Boolean(projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, description, projectId);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pt: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "primary.light",
                  borderRadius: 1.5,
                  color: "white",
                  display: "flex",
                }}
              >
                {isFolder ? <Folder size={20} /> : <FileText size={20} />}
              </Box>
              <Typography variant="h6" fontWeight="700">
                {isFolder ? "Add New Folder" : "New Project"}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <X size={18} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}
          >
            <TextField
              fullWidth
              label={isFolder ? "Folder Name" : "Project Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {isFolder ? "Create Folder" : "Create Project"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewProjectAndFolderDialog;
