import type React from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { refetch } = useProfile();

  const handleLogoutConfirm = (): void => {
    axios
      .get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      })
      .then(async () => {
        navigate('/');
      })
      .catch(async (error) => {
        if (error.response.status !== 401) {
          console.error({
            message: 'Something went wrong during logout',
            description: error.toString(),
          });
        }
      })
      .finally(async () => {
        await refetch();
        onClose();
      });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 flex-col items-center justify-center h-screen w-full p-5 ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="p-4 sm:p-10 bg-gray-50 rounded-md  w-[300px] md:w-[500px] text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
            </span>

            <h3 className="mb-2 text-2xl font-bold text-gray-800">Log out</h3>
            <p className="text-gray-500">
              Are you sure you would like to log out of your account?
            </p>

            <div className="mt-6 flex justify-center gap-x-4">
              <button
                className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                onClick={handleLogoutConfirm}
              >
                Log out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
