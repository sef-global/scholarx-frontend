import React from 'react';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  className = '',
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-gray-600"
      >
        <path
          fill="none"
          stroke="#4B5563"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
        />
        {count >= 0 && (
          <>
            <circle cx="18" cy="6" r="5" fill="#EF4444" />
            <text
              x="18"
              y="8"
              fontFamily="Arial, sans-serif"
              fontSize="6"
              fill="white"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {count > 99 ? '99+' : count}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default NotificationBadge;
