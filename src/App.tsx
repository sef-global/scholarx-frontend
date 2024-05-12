import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserContext, type UserContextType } from './contexts/UserContext';
import MenteeApplications from './components/MenteeApplicationsView/MenteeApplications.component.tsx';
import MentorProfileView from './pages/MentorProfileView/MentorProfileView.component.tsx';
import PublicMentorPage from './pages/PublicMentorPage/PublicMentorPage.tsx';
import MenteeRegistrationPage from './pages/MenteeApplicationPage/index.tsx';
import MentorRegistrationPage from './pages/MentorRegistrationPage/index.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import MyMentees from './pages/MyMenteesView/MyMentees.component.tsx';

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
              element={<MenteeRegistrationPage />}
            />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/mentor/dashboard" element={<MenteeApplications />} />
            <Route path="/mentor/my-mentees" element={<MyMentees />} />
            <Route path="/mentors" element={<PublicMentorPage />} />
            <Route path="/mentors/:mentorId" element={<MentorProfileView />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
