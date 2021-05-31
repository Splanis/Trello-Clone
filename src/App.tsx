import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NavigationBar } from './navigation/NavigationBar';
import { store } from './redux/store';
import { Routes } from './router/Routes';
import { GlobalStyle } from './ui-components/GlobalStyle';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <NavigationBar />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}
