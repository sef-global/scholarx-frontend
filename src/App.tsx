import React, { useContext, useEffect } from 'react';

import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserContext, type UserContextType } from './contexts/UserContext';

const App: React.FC = () => {
  const { user, getUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    getUser();
  }, []);

  user !== null &&
    console.log(`user is authenticated as ${user.primary_email}`);

  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default App;
