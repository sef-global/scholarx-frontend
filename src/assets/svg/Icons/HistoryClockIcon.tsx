import React from 'react';

interface HistoryClockIconProps {
  className?: string;
}

const HistoryClockIcon: React.FC<HistoryClockIconProps> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <path d="M12 22V18" />
    <path d="M10 22H14" />
  </svg>
);

export default HistoryClockIcon;
