import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Folder,
  FileText,
  ChevronRight,
  LayoutGrid,
  ChevronDown,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import ControlCenter from "./ControlCenter";
import { DRAWER_WIDTH } from "../../theme/theme";

interface TestFile {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  files: TestFile[];
}



interface SidebarProps {
  projects: Project[];
  openProject: string | null;
  handleProjectClick: (id: string) => void;
  onAddNewProject: () => void;
  onAddNewFolder: (projectId: string) => void;

}

const Sidebar = ({ projects, openProject, handleProjectClick, onAddNewProject, onAddNewFolder}: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          bgcolor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        },
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              p: 1,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <LayoutGrid color="white" size={22} />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            TestGrid
          </Typography>
        </Box>

        <ListItemButton
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
            <LayoutDashboard size={20} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: "bold",
              fontSize: "0.85rem",
            }}
          >
            PROJECTS
          </Typography>
          <IconButton
            onClick={onAddNewProject}
            size="small"
            sx={{
              "&:hover": { bgcolor: "primary.light", color: "white" },
              p: 0.5,
            }}
          >
            <Plus size={16} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, mb: 1 }}>
        <List disablePadding>
          {projects.map((project) => (
            <Box key={project.id} sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleProjectClick(project.id)}
                sx={{
                  borderRadius: 2,
                  p: 0.5,
                  "&:hover .add-folder-btn": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 35 }}>
                  {openProject === project.id ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </ListItemIcon>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <Folder size={20} />
                </ListItemIcon>

                <ListItemText primary={project.name} />

                <IconButton
                  className="add-folder-btn"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddNewFolder(project.id)
                    console.log("Create folder in:", project.name);
                  }}
                  sx={{
                    opacity: 0,
                    visibility: "hidden",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": { bgcolor: "primary.light", color: "white" },
                    p: 0.5,
                  }}
                >
                  <Plus size={14} />
                </IconButton>
              </ListItemButton>

              <Collapse
                in={openProject === project.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ pl: 5 }}>
                  {project.files.map((file) => (
                    <ListItemButton
                      key={file.id}
                      sx={{ borderRadius: 2, py: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <FileText size={16} />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        slotProps={{
                          primary: {
                            fontSize: "0.9rem",
                            color: "text.secondary",
                          },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <ControlCenter />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
