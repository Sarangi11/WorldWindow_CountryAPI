// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <React.StrictMode>
     
    <AuthProvider>
  
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
     
    </AuthProvider>
   
  </React.StrictMode>
  </ThemeProvider>
);
