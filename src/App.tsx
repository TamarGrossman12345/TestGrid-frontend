import { WorkSpace } from "./pages/WorkSpace";

import { useEffect, useState } from "react";
import { getAllProjects } from "./services/api";
import { NotificationProvider } from "./components/common/NotificationContext";

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
    <NotificationProvider>
      <WorkSpace projects={projects} onRefreshProjects={fetchProjects} />
    </NotificationProvider>
  );
}

export default App;
