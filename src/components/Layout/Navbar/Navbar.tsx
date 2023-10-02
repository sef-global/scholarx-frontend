import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header>
      <div className="shadow-md border-b border-gray-50 flex item-center justify-between px-36 py-2 drop-shadow-lg">
        <div className="flex items-center">
          <div className="w-40 mr-16">
            <img className="" src="./scholarx-logo.png" />
          </div>
          <nav>
            <ul className="flex items-center text-sm gap-16 text-gray_1">
              <li>
                <a href="https://sefglobal.org/">Home</a>
              </li>
              <li>
                <a href="" target="_blank" rel="noreferrer">
                  About
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noreferrer">
                  Initiatives
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noreferrer">
                  Join Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/sustainableeducationfoundation/"
            target="_blank"
            rel="noreferrer"
            className="w-5"
          >
            <img src="/facebook-icon.png" alt="facebook" />
          </a>
          <a
            href="https://twitter.com/goasksef"
            target="_blank"
            rel="noreferrer"
            className="w-5"
          >
            <img src="/twitter-icon.png" alt="twitter" />
          </a>
          <a
            href="https://www.linkedin.com/company/sefglobal/"
            target="_blank"
            rel="noreferrer"
            className="w-5"
          >
            <img src="/linkedin-icon.png" alt="linkedin" />
          </a>
          <a
            href="https://www.instagram.com/sefglobal/"
            target="_blank"
            rel="noreferrer"
            className="w-5"
          >
            <img src="/instagram-icon.png" alt="instagram" />
          </a>
          <div className="border-2 px-4 py-1 rounded-md text-sm font-medium text-gray_1">
            Join Us
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
