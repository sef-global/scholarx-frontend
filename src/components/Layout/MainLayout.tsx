import React, { type ReactNode } from 'react';

import { Layout } from 'antd';

import FooterComponent from './Footer/Footer';
// import styles from './MainLayout.module.css';
import Navbar from './Navbar/Navbar';

const { Header, Footer, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <Layout>
    <Header className="bg-white z-[1000] shadow-sm ">
      <Navbar />
    </Header>
    <Content className=" bg-white">{children}</Content>
    <Footer className=" bg-['#F8FDFF']">
      <FooterComponent />
    </Footer>
  </Layout>
);
export default MainLayout;
