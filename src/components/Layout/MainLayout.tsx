import React, { ReactNode } from 'react';

import { Layout } from 'antd';

import FooterComponent from './Footer/FooterComponent';
import styles from './MainLayout.css';
import NavBar from './NavBar/NavBar';

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
