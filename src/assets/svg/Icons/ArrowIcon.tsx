import React from 'react';

interface ArrowIconProps {
  isExpanded: boolean;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ isExpanded }) => {
  return (
    <svg
      className={`w-5 h-5 text-gray-500 transform transition-transform ${
        isExpanded ? 'rotate-180' : ''
      }`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default ArrowIcon;
