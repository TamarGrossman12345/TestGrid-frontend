import { 

  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  Button 
} from "@mui/material";
import { AlertTriangle } from "lucide-react"; 

interface AlertNoticeProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const AlertNotice = ({ open, onClose, onConfirm, title = "Are you sure?", message }: AlertNoticeProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 3 }}>
        <AlertTriangle color="#ed25b1" size={24} />
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          disableElevation
          sx={{ borderRadius: 2 , bgcolor: "primary.main"}}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertNotice;