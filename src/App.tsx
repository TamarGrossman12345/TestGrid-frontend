import { Button, Container, Typography } from '@mui/material'
import  Dashboard  from './components/Dashboard';
import { mockTestCases, mockUsers, MOCK_PROJECTS } from './data/mockData';
import { theme} from './theme'
import { ThemeProvider } from '@mui/material/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Container>
        <Dashboard
          testCases={mockTestCases}
          users={mockUsers}
          projects={MOCK_PROJECTS}
       />
    </Container>
    </ThemeProvider>
  )
}

export default App