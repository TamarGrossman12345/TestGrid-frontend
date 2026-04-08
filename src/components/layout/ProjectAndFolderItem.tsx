
import { Box, ListItemButton, ListItemIcon, ListItemText, Collapse, List, IconButton } from "@mui/material";
import { ChevronDown, ChevronRight, FileText, Folder, Plus, Trash } from "lucide-react";
import { Project } from "../../types";

interface ProjectAndFolderItemProps {
  project: Project;
  isOpen: boolean;
  onClick: () => void;
  onAddFolder: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onDeleteFolder: (id: string) => void;
}

const ProjectAndFolderItem = ({ project, isOpen, onClick, onAddFolder, onDeleteProject, onDeleteFolder }: ProjectAndFolderItemProps) => {
  return (
    <Box sx={{ mb: 0.5 }}>
      <ListItemButton 
        onClick={onClick}
        sx={{ borderRadius: 2, p: 0.5, "&:hover .action-btns": { opacity: 1, visibility: "visible" } }}
      >
        <ListItemIcon sx={{ minWidth: 35 }}>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </ListItemIcon>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <FileText size={20} />
        </ListItemIcon>
        <ListItemText primary={project.projectName} />
        
        <Box className="action-btns" sx={{ opacity: 0, visibility: "hidden", transition: "0.2s" }}>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDeleteProject(project.projectId); }} sx={{ "&:hover": { bgcolor: "red", color: "white" } }}>
            <Trash size={14} />
          </IconButton>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onAddFolder(project.projectId); }} sx={{ "&:hover": { bgcolor: "primary.light", color: "white" } }}>
            <Plus size={14} />
          </IconButton>
        </Box>
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 5 }}>
          {project.files?.map((file) => (
            <ListItemButton key={file.TestFileId} sx={{ borderRadius: 2, py: 0.5, "&:hover .del-btn": { opacity: 1, visibility: "visible" } }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Folder size={16} />
              </ListItemIcon>
              <ListItemText primary={file.name} slotProps={{ primary: { fontSize: "0.9rem", color: "text.secondary" } }} />
              <IconButton className="del-btn" size="small" onClick={(e) => { e.stopPropagation(); onDeleteFolder(file.TestFileId); }} sx={{ opacity: 0, visibility: "hidden", "&:hover": { bgcolor: "red", color: "white" } }}>
                <Trash size={14} />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default ProjectAndFolderItem;