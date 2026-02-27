import React, { useState } from 'react';
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
  Slide,
} from '@mui/material';
import { X, FolderPlus, Folder } from 'lucide-react';
import { Project } from '../../types';

interface NewProjectDialogProps {
  onClose: () => void;
  onSave: (projectData: Project) => void;
  parentId?: string; // אם קיים, אנחנו יוצרים תיקייה בתוך פרויקט
}


export function NewProjectDialog({ onClose, onSave, parentId }: NewProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const isFolder = Boolean(parentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: `p${Math.floor(Math.random() * 10000)}`,
      name,
      description,
      isPrivate: false,
      files: [],
      // כאן השרת שלך ידע לשייך ל-parentId אם הוא קיים
    };
    onSave(newProject);
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xs" // צר יותר, מושלם לשדות בודדים
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                p: 1, 
                bgcolor: isFolder ? 'secondary.light' : 'primary.light', 
                borderRadius: 1.5,
                color: 'white',
                display: 'flex' 
              }}>
                {isFolder ? <Folder size={20} /> : <FolderPlus size={20} />}
              </Box>
              <Typography variant="h6" fontWeight="700">
                {isFolder ? 'Add New Folder' : 'New Project'}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small"><X size={18} /></IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
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
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disableElevation
            sx={{ borderRadius: 2, px: 3, textTransform: 'none', fontWeight: 600 }}
          >
            {isFolder ? 'Create Folder' : 'Create Project'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}