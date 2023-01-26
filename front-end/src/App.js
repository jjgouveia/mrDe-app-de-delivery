import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import AppProvider from './context/app.provider';
// import Routes from './routes/routes';

function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export default App;
