import { Button, Container, Typography } from "@mui/material";
import {WorkSpace} from "./pages/WorkSpace";
import { mockTestCases, mockUsers } from "./data/mockData";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

function App() {

  const [projects, setProjects] = useState([]);

 
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data); 
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
          testCases={mockTestCases}
          users={mockUsers}
          projects={projects}
          onRefreshProjects={fetchProjects}
        />
    </ThemeProvider>
  );
}

export default App;
