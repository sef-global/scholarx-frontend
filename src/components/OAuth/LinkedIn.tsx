import React from 'react';
import { API_URL } from '../../constants';
import LinkedinColorIcon from '../../assets/svg/Icons/LinkedInColorIcon';

const handleLoginLinkedIn = (e: React.FormEvent): void => {
  e.preventDefault();
  window.location.href = `${API_URL}/auth/linkedin`;
};

const LinkedInLoginButton = () => {
  return (
    <>
      <div className="m-0 items-center flex justify-center">
        <button
          onClick={handleLoginLinkedIn}
          className="px-10 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-black hover:border-gray-400 daDon't have an account? Sign Uprk:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:shadow transition duration-150 flex items-center gap-2"
        >
          <LinkedinColorIcon />
          <span>Continue with LinkedIn</span>
        </button>
      </div>
    </>
  );
};

export default LinkedInLoginButton;
