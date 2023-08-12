import React, { ReactNode } from 'react';

import { Layout } from 'antd';

import FooterComponent from './Footer/Footer';
import styles from './MainLayout.module.css';
import NavBar from './Navbar/Navbar';

const { Header, Footer, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <Layout>
    <Header className={styles.antLayoutHeader}>
      <NavBar />
    </Header>
    <Content className={styles.antLayoutContent}>{children}</Content>
    <Footer className={styles.antLayoutFooter}>
      <FooterComponent />
    </Footer>
  </Layout>
);
export default MainLayout;
