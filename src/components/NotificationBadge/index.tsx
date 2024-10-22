import React from 'react';
import NotificationBell from '../../assets/svg/Icons/NotificationBell';
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
      <NotificationBell
        count={count}
        iconColor={iconColor}
        badgeColor={badgeColor}
        textColor={textColor}
      />
    </div>
  );
};

export default NotificationBadge;
