import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import {
  FolderOpen,
  Folder,
  Lock,
  Unlock,
  ChevronRight,
  ChevronDown,
  Plus,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  onOpenUserManagement: () => void;
  onLogout: () => void;
}

const DRAWER_WIDTH = 260;

export function Sidebar({ projects, onOpenUserManagement, onLogout }: SidebarProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(['p1', 'p2']));
  const [selectedProject, setSelectedProject] = useState<string>('p1-1');

  const toggleProject = (id: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedProjects(newExpanded);
  };

  const renderProject = (project: Project, level: number = 0) => {
    const hasChildren = project.children && project.children.length > 0;
    const isExpanded = expandedProjects.has(project.id);
    const isSelected = selectedProject === project.id;

    return (
      <Box key={project.id}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              toggleProject(project.id);
            }
            setSelectedProject(project.id);
          }}
          selected={isSelected}
          sx={{
            pl: 1.5 + level * 2,
            borderRadius: 1,
            mb: 0.25,
            '&.Mui-selected': {
              bgcolor: 'primary.50',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.100',
              },
            },
          }}
        >
          {hasChildren && (
            <ListItemIcon sx={{ minWidth: 28 }}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </ListItemIcon>
          )}
          {!hasChildren && <Box sx={{ width: 28 }} />}

          <ListItemIcon sx={{ minWidth: 28 }}>
            {isExpanded && hasChildren ? <FolderOpen size={16} /> : <Folder size={16} />}
          </ListItemIcon>

          <ListItemText
            primary={project.name}
            primaryTypographyProps={{
              variant: 'body2',
              noWrap: true,
            }}
          />

          <ListItemIcon sx={{ minWidth: 20 }}>
            {project.isPrivate ? <Lock size={14} /> : <Unlock size={14} />}
          </ListItemIcon>
        </ListItemButton>

        {hasChildren && isExpanded && (
          <Collapse in={isExpanded} timeout="auto">
            {project.children!.map((child) => renderProject(child, level + 1))}
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={18} color="white" />
          </Box>
          <Typography variant="h6">TestGrid</Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1.5 }}>
        <List disablePadding sx={{ mb: 3 }}>
          <ListItemButton
            sx={{
              borderRadius: 1,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'white' }}>
              <LayoutDashboard size={16} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'body2' }} />
          </ListItemButton>
        </List>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, mb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Projects
          </Typography>
          <IconButton size="small">
            <Plus size={16} />
          </IconButton>
        </Box>

        <List disablePadding>
          {projects.map((project) => renderProject(project))}
        </List>
      </Box>

      {/* Footer */}
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
    </Drawer>
  );
}
