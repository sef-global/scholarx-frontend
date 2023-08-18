import React from 'react';
import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import UserLogin from './components/UserLogin/UserLogin.component';

const App: React.FC = () => (
  <MainLayout>
    <Home />
  </MainLayout>
);

export default App;
