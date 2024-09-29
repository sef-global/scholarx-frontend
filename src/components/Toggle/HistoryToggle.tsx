import React from 'react';
import HistoryClockIcon from '../../assets/svg/Icons/HistoryClockIcon';
import ToggleButton from './ButtonToggle';

interface HistoryToggleProps {
  isHistoryOpen: boolean;
  toggleHistory: () => void;
  checkingCount: number;
}

const HistoryToggle: React.FC<HistoryToggleProps> = ({
  isHistoryOpen,
  toggleHistory,
  checkingCount,
}) => (
  <ToggleButton
    isOpen={isHistoryOpen}
    toggle={toggleHistory}
    icon={<HistoryClockIcon />}
    openText="Hide Feedback History"
    closedText="Feedback History"
    useNotificationBadge={false}
    badgeCount={checkingCount}
  />
);

export default HistoryToggle;
