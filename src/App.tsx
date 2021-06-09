import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavigationBar } from './navigation/NavigationBar';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { Routes } from './router/Routes';
import { GlobalStyle } from './ui-components/GlobalStyle';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <GlobalStyle />
          <NavigationBar />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
