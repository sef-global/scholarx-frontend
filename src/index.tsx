import React from 'react';

import { Layout } from 'antd';
import ReactDOM from 'react-dom';

import FooterComponent from './components/Footer/FooterComponent';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import styles from './index.css';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header className={styles.antLayoutHeader}>
      <NavBar />
    </Header>
    <Content className={styles.antLayoutContent}>
      <Home />
    </Content>
    <Footer className={styles.antLayoutFooter}>
      <FooterComponent />
    </Footer>
  </Layout>
);
ReactDOM.render(<App />, document.getElementById('root'));
