import React from 'react';

const Footer: React.FC = () => (
  <footer className="text-center">
    <div className="text-base text-darkmod-blue font-normal my-12">
      <p>
        © {new Date().getFullYear()}
        <a
          href="https://sefglobal.org/"
          className="active:text-darkmod-blue font-normal"
        >
          {' '}
          Sustainable Education Foundation - SEF
        </a>
      </p>
    </div>
  </footer>
);
export default Footer;
