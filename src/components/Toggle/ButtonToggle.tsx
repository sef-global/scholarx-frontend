import React, { ReactElement } from 'react';
import NotificationBadge from '../NotificationBadge';
import ArrowDownIcon from '../../assets/svg/Icons/ArrowDownIcon';
import ArrowRightIcon from '../../assets/svg/Icons/ArrowRightIcon';

interface ToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
  icon?: ReactElement;
  text: string;
  badgeCount?: number;
  useNotificationBadge?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  toggle,
  text,
  badgeCount,
  useNotificationBadge = false,
}) => (
  <button
    onClick={toggle}
    className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 mb-4 focus:outline-none hover:text-blue-600 transition-colors duration-200"
  >
    <span className="flex items-center">
      {text}
      {badgeCount !== undefined &&
        badgeCount >= 0 &&
        (useNotificationBadge ? (
          <NotificationBadge count={badgeCount} className="ml-2" />
        ) : (
          <span className="bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 ml-2 rounded-full">
            {badgeCount > 99 ? '99+' : `(${badgeCount})`}
          </span>
        ))}
    </span>

    {isOpen ? (
      <>
        <ArrowDownIcon />
      </>
    ) : (
      <>
        <ArrowRightIcon />
      </>
    )}
  </button>
);

export default ToggleButton;
