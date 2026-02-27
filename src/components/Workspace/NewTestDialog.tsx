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
} from '@mui/material';

import { X, CheckCircle2 } from 'lucide-react';
import { TestCase } from '../../types';

interface NewTestDialogProps {
  onClose: () => void;
  onSave?: (testData: TestCase) => void;
}
// צריך להוסיף פונקציה לשמירה כשנוסיף את הבאקקק
const NewTestDialog = ({ onClose, onSave }: NewTestDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    testSteps: '',
    expectedResult: '',
  });
  
  // בהמשך אצטרך לשנות ככה שהמזהה יהיה מתוך הרשימה הקיימת שלא ייצא מצב שיש לנו טסט עם אותו מזהה יותר מפעם אחת
  const [previewId] = useState(`TC-${Math.floor(1000 + Math.random() * 9000)}`);

  // צריך להוסיף שליחה לבאק אחרי ששומרים טסט קייס חדש 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTest: TestCase = {
      id: previewId,
      title: formData.title,
      testSteps: formData.testSteps,
      expectedResult: formData.expectedResult,
      status: 'pending', 
      assignee: { name: 'Unassigned', avatar: '?', color: '#9e9e9e' } as any 
    };

    // onSave(newTest);
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
    
      PaperProps={{
        sx: { borderRadius: 3, px: 1 }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 0, pt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="overline" color="primary.main" fontWeight="bold">
                   Test ID
                </Typography>
                <Typography variant="caption" sx={{ bgcolor: 'primary.50', px: 1, borderRadius: 1, color: 'primary.700', fontWeight: 600 }}>
                  {previewId}
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight="700">Create Test Case</Typography>
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            
            <TextField
              fullWidth
              label="Title"
              placeholder="e.g., Validate user Login to the system"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Test Steps"
              placeholder="1. Step one...&#10;2. Step two..."
              value={formData.testSteps}
              onChange={(e) => setFormData({ ...formData, testSteps: e.target.value })}
              multiline
              rows={4}
              required
            />

            <TextField
              fullWidth
              label="Expected Result"
              placeholder="What is the successful outcome?"
              value={formData.expectedResult}
              onChange={(e) => setFormData({ ...formData, expectedResult: e.target.value })}
              multiline
              rows={2}
              required
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Discard
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disableElevation
            startIcon={<CheckCircle2 size={18} />}
            sx={{ px: 4, borderRadius: 2, fontWeight: 600, textTransform: 'none' }}
          >
            Create New Test Case
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewTestDialog;