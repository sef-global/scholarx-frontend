import React from 'react';

const Footer: React.FC = () => (
  <footer className="text-center">
    <div className="text-center">
      <p className="text-xs my-12 mx-3">
        *Our mentors engage in mentoring voluntarily in their leisure time and
        we don&apos;t have a direct affiliation with the mentioned organisations
      </p>
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
    </div>
  </footer>
);
export default Footer;
