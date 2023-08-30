import React, { type ReactNode } from 'react';

import { Layout, Col, Row } from 'antd';

import FooterComponent from './Footer/Footer';
import styles from './MainLayout.module.css';
import Navbar from './Navbar/Navbar';
import AdminNavigation from '../AdminNavigation/AdminNavigation.component';

const { Header, Footer, Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <Layout>
    <Header className={styles.antLayoutHeader}>
      <Navbar />
    </Header>
    <Row>
      <Col span={5} style={{ backgroundColor: 'white' }}>
        <Content className={styles.antLayoutContent}>
          <AdminNavigation />
        </Content>
      </Col>
      <Col span={19}>
        <Content className={styles.antLayoutContent}>{children}</Content>
      </Col>
    </Row>
    <Footer className={styles.antLayoutFooter}>
      <FooterComponent />
    </Footer>
  </Layout>
);
export default MainLayout;
