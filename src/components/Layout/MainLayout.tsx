import React from 'react';
import { type ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <section className="min-h-[80vh] p-4 container mx-auto">{children}</section>
    <Footer />
  </>
);
export default MainLayout;
