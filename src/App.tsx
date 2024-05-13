import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserContext, type UserContextType } from './contexts/UserContext';
import MenteeApplications from './components/MenteeApplicationsView/MenteeApplications.component.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Mentors from './pages/Mentors/index.tsx';
import MenteeApplicationForm from './pages/MenteeApplication/index.tsx';
import MentorProfile from './pages/MentorProfile/MentorProfile.component.tsx';
import MentorRegistrationPage from './pages/MentorRegistration/MentorRegistration.component.tsx';
import MyMentees from './pages/MyMentees/MyMentees.component.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { getUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/mentor-registration"
              element={<MentorRegistrationPage />}
            />
            <Route
              path="/mentee-application/:mentorId"
              element={<MenteeApplicationForm />}
            />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/mentor/dashboard" element={<MenteeApplications />} />
            <Route path="/mentor/my-mentees" element={<MyMentees />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/:mentorId" element={<MentorProfile />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
