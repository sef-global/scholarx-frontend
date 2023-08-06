import React from 'react';

import ReactDOM from 'react-dom';

import Home from './components/Home/Home';
import LayoutComponent from './components/Layout/LayoutComponent';

const App: React.FC = () => (
  <LayoutComponent>
    <Home />
  </LayoutComponent>
);
ReactDOM.render(<App />, document.getElementById('root'));
