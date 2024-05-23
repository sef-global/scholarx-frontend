import React from 'react';
import { Link } from 'react-router-dom';
import TwitterIcon from '../../../assets/svg/Icons/TwitterIcon';
import FacebookIcon from '../../../assets/svg/Icons/FacebookIcon';
import LinkedinIcon from '../../../assets/svg/Icons/LinkedinIcon';
import InstagramIcon from '../../../assets/svg/Icons/InstagramIcon';

interface MenuDrawerProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  handleMentorRegistration: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  openMenu,
  setOpenMenu,
  handleMentorRegistration,
}) => {
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
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <Link to="/" className="text-lg text-black">
            Home
          </Link>
          <Link to="/about" className="text-lg text-black">
            About
          </Link>
          <Link to="/initiatives" className="text-lg text-black">
            Initiatives
          </Link>
          <Link to="/join-us" className="text-lg text-black">
            Join Us
          </Link>
          <button
            className="mr-5 mb-5 w-40 h-9 font-sans text-black bg-gray-200 py-1 px-4 rounded"
            onClick={handleMentorRegistration}
          >
            Become a Mentor
          </button>
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
