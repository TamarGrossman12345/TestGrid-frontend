import { Button, Container, Typography } from '@mui/material'

function App() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        TestGrid Dashboard
      </Typography>
      <Button variant="contained" color="primary">
      </Button>
      <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
      </Button>
    </Container>
  )
}

export default App