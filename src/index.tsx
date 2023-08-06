import React from 'react';

import ReactDOM from 'react-dom';

import Home from './components/Home/Home';
import MainLayout from './components/Layout/MainLayout';

const App: React.FC = () => (
  <MainLayout>
    <Home />
  </MainLayout>
);
ReactDOM.render(<App />, document.getElementById('root'));
