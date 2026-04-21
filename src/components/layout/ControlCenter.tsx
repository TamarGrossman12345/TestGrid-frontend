import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Users, Settings, LogOut } from "lucide-react";
import { AlertNoticeConfig } from "../../types";
import { useState } from "react";
import AlertNotice from "../common/AlertNotice";
import { useNavigate } from "react-router-dom";

interface ControlCenterProps {
  onOpenUserManagement?: () => void;
  onLogout?: () => void;
}

const ControlCenter = ({
  onOpenUserManagement,
  onLogout,
}: ControlCenterProps) => {
  const [isSignoutOpen, setIsSignoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setIsSignoutOpen(false);
    navigate("/login");
    // if (onLogout) onLogout(); // ביצוע ההתנתקות בתכלס
  };

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      <List disablePadding sx={{ p: 1.5 }}>
        <ListItemButton
          onClick={onOpenUserManagement}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Users size={16} />
          </ListItemIcon>
          <ListItemText
            primary="Team Members"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItemButton>

        <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Settings size={16} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={() => setIsSignoutOpen(true)}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogOut size={16} />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItemButton>
      </List>
      <AlertNotice
        open={isSignoutOpen}
        onClose={() => setIsSignoutOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of TestGrid?"
        confirmText="Sign Out"
      />
    </Box>
  );
};

export default ControlCenter;
