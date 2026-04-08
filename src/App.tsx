import { Button, Container, Typography } from "@mui/material";
import { WorkSpace } from "./pages/WorkSpace";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAllProjects } from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <WorkSpace
        projects={projects}
        onRefreshProjects={fetchProjects}
      />
    </ThemeProvider>
  );
}

export default App;
