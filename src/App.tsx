import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home';
import MainLayout from './components/Layout/MainLayout';
import { UserProvider } from './contexts/UserContext';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Mentors from './pages/Mentors';
import MenteeRegistration from './pages/MenteeRegistration';
import MentorProfile from './pages/MentorProfile/MentorProfile.component.tsx';
import MentorRegistrationPage from './pages/MentorRegistration/MentorRegistration.component.tsx';
import MyMentees from './pages/MyMentees/MyMentees.component.tsx';
import EditProfileForm from './pages/EditProfileForm/EditProfileForm.component.tsx';
import MenteeDashboard from './pages/MenteeDashboard';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoginModalProvider } from './contexts/LoginModalContext.tsx';
import PasswordReset from './pages/PasswordReset/index.tsx';
import MenteeProfile from './pages/MenteeProfile/MenteeProfile.component.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginModalProvider>
        <UserProvider>
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
                  element={<MenteeRegistration />}
                />
                <Route path="/admin/dashboard/*" element={<Dashboard />} />
                <Route path="/mentor/dashboard/*" element={<MyMentees />} />
                <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
                <Route path="/mentors" element={<Mentors />} />
                <Route path="/mentors/:mentorId" element={<MentorProfile />} />
                <Route path="/mentees/:menteeId" element={<MenteeProfile />} />
                <Route path="/settings" element={<EditProfileForm />} />
                <Route path="/resetpassword" element={<PasswordReset />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </UserProvider>
      </LoginModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
