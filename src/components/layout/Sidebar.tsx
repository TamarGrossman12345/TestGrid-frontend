
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { LayoutGrid, LayoutDashboard, Plus } from "lucide-react";
import ControlCenter from "./ControlCenter";
import { DRAWER_WIDTH } from "../../theme/theme";
import { Project } from "../../types/index";
import ProjectAndFolderItem from "./ProjectAndFolderItem";

interface SidebarProps {
  projects: Project[];
  openProject: string | null;
  handleProjectClick: (id: string) => void;
  onAddNewProject: () => void;
  onAddNewFolder: (projectId: string) => void;
  handleDeleteFolder: (testFileId: string) => void;
  handleDeleteProject: (projectId: string) => void;
}

const Sidebar = ({
  projects,
  openProject,
  handleProjectClick,
  onAddNewProject,
  onAddNewFolder,
  handleDeleteProject,
  handleDeleteFolder,
}: SidebarProps) => {
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
            <ProjectAndFolderItem
              key={project.projectId}
              project={project}
              isOpen={openProject === project.projectId}
              onClick={() => handleProjectClick(project.projectId)}
              onAddFolder={onAddNewFolder}
              onDeleteProject={handleDeleteProject}
              onDeleteFolder={handleDeleteFolder}
            />
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
