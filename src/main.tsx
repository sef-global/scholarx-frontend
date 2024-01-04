import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';

import { UserProvider } from './contexts/UserContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
