import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserContext, type UserContextType } from './contexts/UserContext';
import MentorRegistrationPage from './components/MentorRegistrationPage';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import PublicMentorPage from './components/PublicMentorPage/PublicMentorPage.tsx';

const App: React.FC = () => {
  const { user, getUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    getUser();
  }, []);

  user !== null &&
    console.log(`user is authenticated as ${user.primary_email}`);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mentor-registration"
            element={<MentorRegistrationPage />}
          />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/mentors" element={<PublicMentorPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
