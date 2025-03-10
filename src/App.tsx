import { useEffect, useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  CircularProgress, 
  Box, 
  Typography, 
  Alert,
  Fade
} from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const initStudio = async () => {
      if (!studio) {
        try {
          await initializeStudio('Universal Dreams Studio');
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to initialize studio. Please refresh the page.');
          console.error('Failed to initialize studio:', e);
        }
      }
      setIsLoading(false);
    };

    initStudio();

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, [studio, initializeStudio]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
        {/* Render loading, error, or main content */}
        {isLoading && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="background.default"
          >
            <CircularProgress size={60} />
            <Typography variant="h6" style={{ marginTop: 20 }}>
              Initializing Universe Architect...
            </Typography>
          </Box>
        )}
        {!isLoading && error && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            bgcolor="background.default"
          >
            <Alert severity="error" style={{ maxWidth: 400 }}>
              {error instanceof Error ? error.message : String(error)}
            </Alert>
          </Box>
        )}
        {!isLoading && !error && (
          <>
            <StudioLot />
            <Fade in={showWelcome} timeout={1000}>
              <Box
                position="absolute"
                top={32}
                left="50%"
                style={{ transform: 'translateX(-50%)' }}
                zIndex={1000}
              >
                <Alert severity="success" style={{ minWidth: 300 }}>
                  Welcome to Universe Architect! Build your cinematic empire.
                </Alert>
              </Box>
            </Fade>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
