import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../constants';
import closeIcon from '../../assets/svg/closeIcon.svg';
import useProfile from '../../hooks/useProfile';
import GoogleLoginButton from '../OAuth/Google';

interface LoginModalProps {
  handleClose: () => void;
  onRegistrationClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  handleClose,
  onRegistrationClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useProfile();

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      await axios
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
        .then(async () => {
          await refetch();
          handleClose();
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 flex-col items-center justify-center h-screen w-full p-5 ">
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
          <button
            className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={handleClose}
          >
            <img className="w-6 h-6" src={closeIcon} alt="Modal Close Icon" />
          </button>

          <div className="bg-white p-6 space-y-8 rounded-lg shadow-xl">
            <div className="m-5">
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                Welcome back!
              </h2>

              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-normal text-gray-500"
                    >
                      Remember this device
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-normal text-black hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                >
                  {isLoading ? 'Loading' : 'Login'}
                </button>
                <p className="text-red-600 text-center">{error}</p>
                <GoogleLoginButton />
                <div className="text-sm font-thin text-center text-gray-900">
                  Not registered yet?
                  <p
                    className="font-medium text-black hover:underline cursor-pointer"
                    onClick={() => {
                      onRegistrationClick();
                      handleClose();
                    }}
                  >
                    Create account
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
