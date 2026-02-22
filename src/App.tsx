import { Button, Container, Typography } from "@mui/material";
import {WorkSpace} from "./pages/WorkSpace";
import { mockTestCases, mockUsers, MOCK_PROJECTS } from "./data/mockData";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <WorkSpace
          testCases={mockTestCases}
          users={mockUsers}
          projects={MOCK_PROJECTS}
        />
    </ThemeProvider>
  );
}

export default App;
