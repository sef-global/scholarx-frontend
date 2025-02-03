import React from 'react';
import { Link } from 'react-router-dom';

import FacebookIcon from '../../../assets/svg/Icons/FacebookIcon';
import InstagramIcon from '../../../assets/svg/Icons/InstagramIcon';
import LinkedinIcon from '../../../assets/svg/Icons/LinkedinIcon';
import TwitterIcon from '../../../assets/svg/Icons/TwitterIcon';

interface MenuDrawerProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  handleMentorRegistration: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ openMenu, setOpenMenu }) => {
  const handleOpenMenu = (): boolean => {
    return openMenu;
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        handleOpenMenu() ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out flex justify-end`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleCloseMenu}
      ></div>
      <div className="relative w-80 bg-white h-full shadow-lg p-6">
        <div className="flex flex-col items-center space-y-12">
          <Link to="/" className="text-lg text-black">
            Home
          </Link>
          <a
            href="https://handbook.sefglobal.org/"
            className="text-lg text-black"
          >
            About
          </a>
          <a
            href="https://sefglobal.org/#projects"
            className="text-lg text-black"
          >
            Initiatives
          </a>
          <a
            href="https://sefglobal.org/join-us.html"
            className="text-lg text-black"
          >
            Join Us
          </a>

          <div className="flex space-x-5">
            <a
              href="https://www.facebook.com/sustainableeducationfoundation/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <FacebookIcon />
              </div>
            </a>
            <a
              href="https://twitter.com/goasksef"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <TwitterIcon />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/sefglobal/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <LinkedinIcon />
              </div>
            </a>
            <a
              href="https://www.instagram.com/sefglobal/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                <InstagramIcon />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
