import React, { useContext } from 'react';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import axios from 'axios';
import { API_URL } from '../../constants';

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const { setUserContext } = useContext(UserContext) as UserContextType;

  const handleLogoutConfirm = (): void => {
    axios
      .get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setUserContext(null);
        onClose();
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.error({
            message: 'Something went wrong during logout',
            description: error.toString(),
          });
        } else {
          setUserContext(null);
          onClose();
        }
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout from ScholarX?
            </h3>
            <button
              onClick={handleLogoutConfirm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
