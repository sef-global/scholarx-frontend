import type React from 'react';

const InstagramIcon: React.FC = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
        </g>
      </svg>
    </div>
  );
};

export default InstagramIcon;
