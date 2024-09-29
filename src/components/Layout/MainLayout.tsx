import { PropsWithChildren } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = ({ children }: PropsWithChildren) => (
  <>
    <Navbar />
    <section className="min-h-[80vh] p-4 container mx-auto mt-16">
      {children}
    </section>
    <Footer />
  </>
);
export default MainLayout;
