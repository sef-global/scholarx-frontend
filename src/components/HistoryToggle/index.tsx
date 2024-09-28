import React from 'react';
import HistoryClockIcon from '../../assets/svg/Icons/HistoryClockIcon';

interface HistoryToggleProps {
  isHistoryOpen: boolean;
  toggleHistory: () => void;
}

const HistoryToggle: React.FC<HistoryToggleProps> = ({
  isHistoryOpen,
  toggleHistory,
}) => (
  <button
    onClick={toggleHistory}
    className="flex items-center justify-between w-full text-left text-xl font-bold text-gray-900 mb-4 focus:outline-none hover:text-blue-600 transition-colors duration-200"
  >
    <span className="flex items-center">
      <HistoryClockIcon
        className={`w-6 h-6 mr-2 ${
          isHistoryOpen ? 'transform rotate-180' : ''
        }`}
      />
      {isHistoryOpen ? 'Hide Feedback History' : 'View Feedback History'}
    </span>
    <span
      className={`transform transition-transform duration-200 ${
        isHistoryOpen ? 'rotate-180' : ''
      }`}
    >
      ▼
    </span>
  </button>
);

export default HistoryToggle;
