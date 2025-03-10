import { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useGameStore } from './store/gameStore';
import StudioLot from './scenes/StudioLot';

// Create a dark theme instance for the game
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3', // Blue
    },
    secondary: {
      main: '#4CAF50', // Green
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

function App() {
  const { studio, initializeStudio } = useGameStore();

  useEffect(() => {
    // Initialize the studio if it doesn't exist
    if (!studio) {
      try {
        initializeStudio('Universal Dreams Studio');
      } catch (e) {
        console.error('Failed to initialize studio:', e);
      }
    }
  }, [studio, initializeStudio]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Provides consistent baseline styles */}
      <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <StudioLot />
      </div>
    </ThemeProvider>
  );
}

export default App;
