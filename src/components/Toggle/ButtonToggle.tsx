import React, { ReactElement } from 'react';
import NotificationBadge from '../NotificationBadge';

interface ToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
  icon: ReactElement;
  openText: string;
  closedText: string;
  badgeCount?: number;
  useNotificationBadge?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  toggle,
  icon,
  openText,
  closedText,
  badgeCount,
  useNotificationBadge = false,
}) => (
  <button
    onClick={toggle}
    className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 mb-4 focus:outline-none hover:text-blue-600 transition-colors duration-200"
  >
    <span className="flex items-center">
      {React.cloneElement(icon, {
        className: `w-6 h-6 mr-2 ${isOpen ? 'transform rotate-180' : ''}`,
      })}
      {isOpen ? openText : closedText}
      {badgeCount !== undefined &&
        badgeCount >= 0 &&
        (useNotificationBadge ? (
          <NotificationBadge count={badgeCount} className="ml-2" />
        ) : (
          <span className=" bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {badgeCount > 99 ? '99+' : `(${badgeCount})`}
          </span>
        ))}
    </span>
    <span
      className={`transform transition-transform duration-200 ${
        isOpen ? 'rotate-180' : ''
      }`}
    >
      ▼
    </span>
  </button>
);

export default ToggleButton;
