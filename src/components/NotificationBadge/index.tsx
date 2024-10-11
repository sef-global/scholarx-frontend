import React from 'react';
import NotificationBellSVG from '../../assets/svg/Icons/NotificationBellSVG';
import { NotificationProps } from '../../types';

const NotificationBadge: React.FC<NotificationProps> = ({
  count,
  className = '',
  iconColor = 'currentColor',
  badgeColor = '#EF4444',
  textColor = 'white',
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <NotificationBellSVG
        count={count}
        iconColor={iconColor}
        badgeColor={badgeColor}
        textColor={textColor}
      />
    </div>
  );
};

export default NotificationBadge;
