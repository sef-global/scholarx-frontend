import React from 'react';
import { Menu, Layout } from 'antd';

import { Link, Route, Routes } from 'react-router-dom';
import ManageMentorApplications from './scenes/ManageMentorApplications/ManageMentorApplication.tsx';
import ManageMentors from './scenes/ManageMentors/ManageMentors.tsx';
import OngoingMentorshipPrograms from './scenes/OngoingMentorshipPrograms/OngoingMentorshipPrograms.tsx';
import PlatformSettings from './scenes/PlatformSettings/PlatformSettings.tsx';
import MenteeApplications from './scenes/MenteeApplications/MenteeApplications.tsx';
import ManageUsers from './scenes/ManageUsers/ManageUsers.tsx';
import Emails from './scenes/Emails/Emails.tsx';

const { Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" width="250" theme="light">
        <Menu mode="inline">
          <Menu.Item key="1">
            <Link to={`/dashboard/manage-mentors`}>Manage Mentors</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/dashboard/manage-mentor-application`}>
              Manage Mentor Applications
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/dashboard/mentee-applications`}>
              Mentee Applications
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/dashboard/ongoing-mentorship-programs`}>
              Ongoing Mentorship Programs
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`/dashboard/platform-settings`}>Platform Settings</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={`/dashboard/manage-users`}>Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={`/dashboard/emails`}>Emails</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="h-screen">
          <Routes>
            <Route path="/manage-mentors" element={<ManageMentors />} />
            <Route
              path="/manage-mentor-application"
              element={<ManageMentorApplications />}
            />
            <Route
              path="/mentee-applications"
              element={<MenteeApplications />}
            />
            <Route
              path="/ongoing-mentorship-programs"
              element={<OngoingMentorshipPrograms />}
            />
            <Route path="/platform-settings" element={<PlatformSettings />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/emails" element={<Emails />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
