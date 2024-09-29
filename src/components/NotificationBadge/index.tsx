import React from 'react';

interface NotificationBadgeProps {
  count: number;
  className?: string;
  iconColor?: string;
  badgeColor?: string;
  textColor?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  className = '',
  iconColor = 'currentColor',
  badgeColor = '#EF4444',
  textColor = 'white',
}) => {
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fill="none"
          stroke={iconColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6.5V3m0 3.5a5 5 0 015 5v3.5c0 1 .5 2 1.5 2.5H5.5c1-.5 1.5-1.5 1.5-2.5V11.5a5 5 0 015-5zm-3.5 14h7"
        />
        {count > 0 && (
          <>
            <circle cx="18" cy="6" r="5.5" fill={badgeColor} />
            <text
              x="18"
              y="6"
              fontFamily="Arial, sans-serif"
              fontSize="7"
              fontWeight="bold"
              fill={textColor}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {displayCount}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default NotificationBadge;
