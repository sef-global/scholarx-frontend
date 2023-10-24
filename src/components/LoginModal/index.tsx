import React, { useState, useContext } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { API_URL } from '../../constants';
import { type Profile } from '../../types';
import { UserContext, type UserContextType } from '../../contexts/UserContext';

const LoginModal: React.FC<{
  isLoginModalVisible: boolean;
  onClose: () => void;
}> = ({ isLoginModalVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserContext } = useContext(UserContext) as UserContextType;

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    try {
      axios
        .post(
          `${API_URL}/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response: AxiosResponse<Profile>) => {
          setUserContext(response.data);
          onClose();
        })
        .catch((error) => {
          if (error.response.status !== 401) {
            console.error({
              message: 'Something went wrong when fetching the user',
              description: error.toString(),
            });
          } else {
            setUserContext(null);
          }
        });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!isLoginModalVisible) return null;

  return isLoginModalVisible ? (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <button
            className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="bg-white p-6 space-y-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Log in to ScholarX
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  // type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    name="remember"
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    // required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-500"
                  >
                    Remember this device
                  </label>
                </div>
                <a
                  href="#"
                  className="ml-auto text-sm font-medium text-blue-600 hover:underline"
                >
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-900">
                Not registered yet?{' '}
                <a className="text-blue-600 hover:underline">Create account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
