import React from 'react';

import { Layout } from 'antd';
import ReactDOM from 'react-dom';

import FooterComponent from './components/Footer/FooterComponent';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header>
      <NavBar />
    </Header>
    <Content>
      <Home />
    </Content>
    <Footer>
      <FooterComponent />
    </Footer>
  </Layout>
);
ReactDOM.render(<App />, document.getElementById('root'));
