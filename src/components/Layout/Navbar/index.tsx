import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLoginModalContext } from '../../../contexts/LoginModalContext';
import { UserContext, UserContextType } from '../../../contexts/UserContext';
import StickyBanner from '../../Banner/StickyBanner';
import ForgotPasswordModal from '../../ForgotPasswordModal';
import LoginModal from '../../LoginModal';
import LogoutModal from '../../LogoutModal';
import RegisterModal from '../../RegisterModal';
import MenuDrawer from '../MenuDrawer';

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const {
    isLoginModalVisible,
    isRegisterModalVisible,
    isLogoutModalVisible,
    isForgotPasswordModalVisible,
    handleLoginModalClose,
    handleLoginModalOpen,
    handleRegisterModalClose,
    handleRegisterModalOpen,
    handleLogoutModalClose,
    handleLogoutModalOpen,
    handleForgotPasswordModalOpen,
    handleForgotPasswordModalClose,
  } = useLoginModalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isUserMentor, isUserAdmin, isUserMentee } = useContext(
    UserContext
  ) as UserContextType;

  const logoutModalOpen = (): void => {
    handleLogoutModalOpen();
    toggleDropdown();
  };

  const handleMentorRegistration = (): void => {
    if (user === null) {
      handleLoginModalOpen();
    } else {
      navigate('/mentor-registration');
    }
    setOpenMenu(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: React.MouseEvent<Document>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  return (
    <div className="fixed top-0 start-0 flex justify-between w-full z-20">
      <nav className="bg-white border-gray-200 container mx-auto">
        <div className="flex gap-1  flex-nowrap items-center justify-between p-4">
          <Link to="/">
            <img
              src="/scholarx-logo.png"
              className="md:h-12 h-10"
              alt="ScholarX Logo"
            />
          </Link>
          <div className="flex items-center">
            <ul className="items-center hidden md:flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 text-nowrap rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  className="py-2 lg:px-3 md:text-sm md:px-1 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                  to="/mentors"
                >
                  Find a mentor
                </Link>
              </li>
              <li>
                <a
                  href="https://handbook.sefglobal.org/"
                  className="py-2 lg:px-3 md:text-sm md:px-1 text-gray-900 rounded hover:bg-gray-100 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://sefglobal.org/#projects"
                  className="py-2 lg:px-3 md:text-sm md:px-1 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Initiatives
                </a>
              </li>
              <li>
                <a
                  href="https://sefglobal.org/join-us.html"
                  className="py-2 lg:px-3 md:text-sm md:px-1 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Join Us
                </a>
              </li>
              {!isUserMentor && (
                <li className='items-center flex justify-center'>
                  <button
                    type="button"
                    onClick={handleMentorRegistration}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 lg:me-2 mb-2"
                  >
                    Become a Mentor
                  </button>
                </li>
              )}

              <li>
                {user === null && (
                  <button
                    type="button"
                    onClick={handleLoginModalOpen}
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 lg:me-2 mb-2 text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
            {user != null && (
              <div
                className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="flex mr-3 w-8 md:w-10 h-8 md:h-10  justify-center items-center text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                  onClick={toggleDropdown}
                >
                  {user?.image_url !== '' ? (
                    <img
                      className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                      src={user?.image_url}
                      alt="user photo"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-user"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </button>
                {/* Dropdown menu */}
                <div
                  className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'
                    } my-4 text-base list-none top-5 md:right-5 right-0 bg-white divide-y absolute divide-gray-100 rounded-lg shadow`}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">
                      {user?.first_name} {user?.last_name}
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
                          } else if (isUserAdmin) {
                            navigate('/admin/dashboard/mentor-applications');
                          } else {
                            navigate('/mentee/dashboard');
                          }
                          setIsDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Dashboard
                      </p>
                    </li>
                    {!isUserAdmin && isUserMentor && (
                      <li>
                        <a
                          href="https://docs.google.com/document/d/1uMMcGWJ35nblOj1zZ1XzJuYm-LOi1Lyj02yYRNsaOkY/edit?usp=sharing"
                          target="_blank"
                          rel="noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Mentor Guide
                        </a>
                      </li>
                    )}
                    {!isUserAdmin && isUserMentee && (
                      <li>
                        <a
                          href="https://docs.google.com/document/d/1gIYte14FIQtqUhGiMErZRovhNErdUrFdQ0LnCFFnfag/edit?usp=sharing"
                          target="_blank"
                          rel="noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Mentee Guide
                        </a>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/settings"
                        onClick={toggleDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>

                    <li>
                      <p
                        onClick={logoutModalOpen}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Log out
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {user === null && (
              <button
                type="button"
                onClick={handleLoginModalOpen}
                className="text-blue-700 md:hidden hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Login
              </button>
            )}
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
              <svg
                className="w-6 h-6"
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
        </div>
        {location.pathname === '/' && !isUserAdmin && (
          <>
            {isUserMentor && (
              <StickyBanner>
                <p className="flex items-center text-md font-normal text-gray-500">
                  <span>
                    Please checkout our{' '}
                    <a
                      href="https://docs.google.com/document/d/1uMMcGWJ35nblOj1zZ1XzJuYm-LOi1Lyj02yYRNsaOkY/edit?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline py-2 cursor-pointer"
                    >
                      Mentor Guide
                    </a>
                  </span>
                </p>
              </StickyBanner>
            )}
            {isUserMentee && (
              <StickyBanner>
                <p className="flex items-center text-md font-normal text-gray-500">
                  <span>
                    Please checkout our{' '}
                    <a
                      href="https://docs.google.com/document/d/1gIYte14FIQtqUhGiMErZRovhNErdUrFdQ0LnCFFnfag/edit?usp=sharing"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline py-2 cursor-pointer"
                    >
                      Mentee Guide
                    </a>
                  </span>
                </p>
              </StickyBanner>
            )}
          </>
        )}
      </nav>

      <MenuDrawer
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        handleMentorRegistration={handleMentorRegistration}
      />

      {isLoginModalVisible ? (
        <LoginModal
          handleClose={handleLoginModalClose}
          onRegistrationClick={handleRegisterModalOpen}
          onForgotPasswordClick={handleForgotPasswordModalOpen}
        />
      ) : null}
      {isRegisterModalVisible ? (
        <RegisterModal
          handleClose={handleRegisterModalClose}
          onLoginClick={handleLoginModalOpen}
        />
      ) : null}
      {isLogoutModalVisible && <LogoutModal onClose={handleLogoutModalClose} />}
      {isForgotPasswordModalVisible ? (
        <ForgotPasswordModal handleClose={handleForgotPasswordModalClose} />
      ) : null}
    </div>
  );
};

export default Navbar;
