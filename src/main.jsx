import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </HeroUIProvider>
  </React.StrictMode>
);