import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, Button, Box, Text } from '@vibe/core';
import VibeCardDemo from './pages/VibeCardDemo';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <nav style={{ padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
            <Link to="/vibe-demo" style={{ textDecoration: 'none', color: '#007bff', fontSize: '18px' }}>
              Vibe Card Demo
            </Link>
          </nav>
          
          <Routes>
            <Route path="/vibe-demo" element={<VibeCardDemo />} />
            <Route path="/" element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Welcome!</h1>
                <p>Go to <Link to="/vibe-demo">Vibe Card Demo</Link> to see the card component.</p>
                
                {/* Simple test */}
                <Box padding="large" margin="large" border backgroundColor="primaryBackgroundColor">
                  <Text>This is a simple Vibe test</Text>
                  <Button onClick={() => alert('Vibe button works!')}>
                    Test Vibe Button
                  </Button>
                </Box>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;