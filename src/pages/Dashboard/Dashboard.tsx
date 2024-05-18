import React from 'react';
import { Menu, Layout } from 'antd';

import { Link, Route, Routes } from 'react-router-dom';
import ManageMentorApplications from './scenes/ManageMentorApplications/ManageMentorApplications.tsx';
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
          <Menu.Item key="2">
            <Link to={`/admin/dashboard/mentor-applications`}>
              Mentor Applications
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/admin/dashboard/mentee-applications`}>
              Mentee Applications
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/admin/dashboard/ongoing-mentorship-programs`}>
              Ongoing Mentorship Programs
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`/admin/dashboard/platform-settings`}>
              Platform Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={`/admin/dashboard/manage-users`}>Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={`/admin/dashboard/emails`}>Emails</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content className="h-screen">
        <Routes>
          <Route
            path="/mentor-applications"
            element={<ManageMentorApplications />}
          />
          <Route path="/mentee-applications" element={<MenteeApplications />} />
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
  );
};

export default Dashboard;
