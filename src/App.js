import React from 'react';
import { RoleProvider } from './contexts/RoleContext';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <RoleProvider>
      <Dashboard />
    </RoleProvider>
  );
}

export default App;