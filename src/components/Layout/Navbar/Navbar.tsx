import React, { useContext, useState } from 'react';

import MenuDrawer from '../MenuDrawer/MenuDrawer';
import LoginModal from '../../LoginModal';
import RegisterModal from '../../RegisterModal';

import {
  UserContext,
  type UserContextType,
} from './../../../contexts/UserContext';
import LogoutModal from '../../LogoutModal';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const navigate = useNavigate();

  const { user, isUserMentor } = useContext(UserContext) as UserContextType;

  const handleLoginModalClose = (): void => {
    setIsLoginModalVisible(false);
  };

  const handleLoginModalOpen = (): void => {
    setIsLoginModalVisible(true);
  };

  const handleRegisterModalClose = (): void => {
    setIsRegisterModalVisible(false);
  };

  const handleRegisterModalOpen = (): void => {
    setIsRegisterModalVisible(true);
  };

  const handleLogoutModalClose = (): void => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutModalOpen = (): void => {
    setIsLogoutModalVisible(true);
  };

  const handleMentorRegistration = (): void => {
    if (user === null) {
      handleLoginModalOpen();
    } else {
      navigate('/mentor-registration');
    }
    setOpenMenu(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img
              src="./scholarx-logo.png"
              className="h-12"
              alt="ScholarX Logo"
            />
          </Link>
          <div
            className={`${
              user === null ? 'invisible' : 'visible'
            } flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative`}
          >
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={user?.image_url}
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={`z-50 ${
                isDropdownOpen ? 'block' : 'hidden'
              } my-4 text-base list-none top-5 right-5 bg-white divide-y absolute divide-gray-100 rounded-lg shadow`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  {user?.first_name}
                </span>
                <span className="block text-sm text-gray-500 truncate">
                  {user?.primary_email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <p
                    onClick={() => {
                      if (isUserMentor) {
                        navigate('/mentor/dashboard');
                        setIsDropdownOpen(false);
                      } else {
                        navigate('/mentee/dashboard');
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Dashboard
                  </p>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </a>
                </li>

                <li>
                  <p
                    onClick={handleLogoutModalOpen}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Log out
                  </p>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={() => {
                setOpenMenu(true);
              }}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ">
            <ul className=" align-middle flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                  to="/mentors"
                >
                  Mentors
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Initiatives
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Join Us
                </a>
              </li>
              {!isUserMentor && (
                <li>
                  <button
                    type="button"
                    onClick={handleMentorRegistration}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Become a Mentor
                  </button>
                </li>
              )}

              <li>
                {user === null && (
                  <>
                    <span
                      className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={handleLoginModalOpen}
                    >
                      Login
                    </span>{' '}
                    <span
                      className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={handleRegisterModalOpen}
                    >
                      Register
                    </span>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MenuDrawer
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        handleMentorRegistration={handleMentorRegistration}
      />

      {isLoginModalVisible ? (
        <LoginModal handleClose={handleLoginModalClose} />
      ) : null}
      {isRegisterModalVisible ? (
        <RegisterModal handleClose={handleRegisterModalClose} />
      ) : null}
      {isLogoutModalVisible && <LogoutModal onClose={handleLogoutModalClose} />}
    </>
  );
};

export default Navbar;
