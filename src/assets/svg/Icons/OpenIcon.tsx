import React from 'react';

const OpenIcon: React.FC = () => {
  return (
    <div>
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          className="stroke-gray-500"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2 8-8m0 0v5m0-5h-5"
        />
      </svg>
    </div>
  );
};

export default OpenIcon;
