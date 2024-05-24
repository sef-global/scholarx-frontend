import React, { type ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <section className="min-h-[80vh] m-4 md:mx-[100px] md:my-[30px]">
      {children}
    </section>
    <Footer />
  </>
);
export default MainLayout;
