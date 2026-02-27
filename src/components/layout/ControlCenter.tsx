import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

interface ControlCenterProps {
  onOpenUserManagement?: () => void;
  onLogout?: () => void;
}

 const ControlCenter = ({ onOpenUserManagement, onLogout }: ControlCenterProps) => {
  return (
    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <List disablePadding sx={{ p: 1.5 }}>
          <ListItemButton onClick={onOpenUserManagement} sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Users size={16} />
            </ListItemIcon>
            <ListItemText primary="Team Members" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Settings size={16} />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>

          <ListItemButton onClick={onLogout} sx={{ borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogOut size={16} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        </List>
      </Box>
  );
};

export default ControlCenter;