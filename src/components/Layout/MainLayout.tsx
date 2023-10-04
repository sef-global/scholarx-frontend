import React, { type ReactNode } from 'react';

import FooterComponent from './Footer/Footer';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <div>
      <Navbar />
    </div>
    <div>{children}</div>
    <div>
      <FooterComponent />
    </div>
  </div>
);
export default MainLayout;
