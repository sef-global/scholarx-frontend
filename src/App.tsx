import React, { useContext } from 'react';

import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserContext } from './contexts/UserContext';

const App: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  user !== null && console.log('user is authenticated');

  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default App;
