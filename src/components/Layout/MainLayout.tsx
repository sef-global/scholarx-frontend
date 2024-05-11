import React, { type ReactNode } from 'react';

import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <section>{children}</section>
    <Footer />
  </>
);
export default MainLayout;
