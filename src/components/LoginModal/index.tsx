import React, { useState, useContext } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { API_URL } from '../../constants';
import { type Profile } from '../../types';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import closeIcon from '../../assets/svg/closeIcon.svg';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  handleClose: () => void;
}

const handleLoginGoogle = (e: React.FormEvent): void => {
  e.preventDefault();
  window.location.href = `${API_URL}/auth/google`;
};

const LoginModal: React.FC<LoginModalProps> = ({ handleClose }) => {
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
          handleClose();
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 flex-col items-center justify-center h-screen w-full p-5 ">
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
            onClick={handleClose}
          >
            <img className="w-6 h-6" src={closeIcon} alt="Modal Close Icon" />
          </button>

          <div className="bg-white p-6 space-y-8 rounded-lg shadow-xl">
            <div className={styles.modalWrapper}>
              <h2 className="text-2xl font-bold text-gray-900 tracking-widest text-center">
                Welcome back!
              </h2>
              <div className={styles.scholarxLogoWrapper}>
                <img
                  src="../../../public/scholarx-logo.png"
                  alt="scholarx-logo"
                />
              </div>
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
                <div className="flex items-start">
                  <div className="flex items-center h-5">
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
                    className="ml-auto text-sm font-normal text-black hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-medium text-center text-white tracking-widest bg-primary-blue rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                >
                  Login
                </button>
                <div className="text-sm font-thin text-center text-gray-900">
                  Not registered yet?{' '}
                  <a className="font-medium text-black hover:underline">
                    Create account
                  </a>
                </div>
              </form>
              <div>
                <form className="mt-2 space-y-2" onSubmit={handleLoginGoogle}>
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:shadow transition duration-150 flex items-center gap-2">
                    <img
                      className="w-4 h-4"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Google</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
