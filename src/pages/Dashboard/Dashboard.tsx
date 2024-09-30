import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import OngoingMentorshipPrograms from './scenes/OngoingMentorshipPrograms/OngoingMentorshipPrograms';
import MenteeApplications from './scenes/MenteeApplications/MenteeApplications';
import ManageUsers from './scenes/ManageUsers/ManageUsers';
import Emails from './scenes/Emails/Emails';
import MentorApplications from './scenes/MentorApplications/MentorApplications';
import MentorApplicationPage from './scenes/MentorApplications/MentorApplicationPage';
import MenteeApplicationPage from './scenes/MenteeApplications/MenteeApplicationPage.tsx';

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-50 h-full">
        <nav className="h-full">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/admin/dashboard/mentor-applications"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Mentor Applications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/mentee-applications"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Mentee Applications
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/ongoing-mentorship-programs"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Ongoing Mentorship Programs
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/manage-users"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/emails"
                className="block py-2 px-4 rounded hover:bg-gray-200"
              >
                Emails
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/mentor-applications" element={<MentorApplications />} />
          <Route
            path="/mentor-applications/:mentorId"
            element={<MentorApplicationPage />}
          />
          <Route path="/mentee-applications" element={<MenteeApplications />} />
          <Route
            path="/mentee-applications/:menteeId"
            element={<MenteeApplicationPage />}
          />
          <Route
            path="/ongoing-mentorship-programs/*"
            element={<OngoingMentorshipPrograms />}
          />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/emails" element={<Emails />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
