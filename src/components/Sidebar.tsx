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
} from "@mui/material";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Users,
  Settings,
  Plus,
} from "lucide-react";

interface TestFile {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  files: TestFile[];
}

const DRAWER_WIDTH = 300;

export function Sidebar({ projects }: { projects: Project[] }) {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const handleProjectClick = (id: string) => {
    setOpenProject(openProject === id ? null : id);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": { width: DRAWER_WIDTH, bgcolor: "#fafafa" },
      }}
    >
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ bgcolor: "primary.main", p: 0.5, borderRadius: 1 }}>
          <FileText color="white" size={25} />
        </Box>
        <Typography variant="h5" fontWeight="bold">
          TestGrid
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
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

        <Typography
          variant="caption"
          sx={{
            px: 2,
            color: "text.secondary",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          PROJECTS
        </Typography>

        {projects.map((project) => (
          <Box key={project.id} sx={{ mt: 1 }}>
            <ListItemButton
              onClick={() => handleProjectClick(project.id)}
              sx={{ borderRadius: 2 }}
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
            </ListItemButton>

            {/* לופ פנימי על הקבצים - מופיע רק אם הפרויקט פתוח */}
            <Collapse
              in={openProject === project.id}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ pl: 4 }}>
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
                        primary: { fontSize: "0.9rem" },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
