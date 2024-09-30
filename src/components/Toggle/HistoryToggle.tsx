import React from 'react';
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
    text="Submissions History"
    useNotificationBadge={false}
    badgeCount={checkingCount}
  />
);

export default HistoryToggle;
