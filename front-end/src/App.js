import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <h2>Oi</h2>
      <Outlet />
    </>
  );
}

export default App;
