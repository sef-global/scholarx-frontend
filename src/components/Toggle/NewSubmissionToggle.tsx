import React from 'react';
import NewSubmissionsIcon from '../../assets/svg/Icons/NewSubmissionsIcon';
import ToggleButton from './ButtonToggle';

interface NewSubmissionsToggleProps {
  isNewSubmissionOpen: boolean;
  toggleNewSubmission: () => void;
  newSubmissionsCount: number;
}

const NewSubmissionsToggle: React.FC<NewSubmissionsToggleProps> = ({
  isNewSubmissionOpen,
  toggleNewSubmission,
  newSubmissionsCount,
}) => (
  <ToggleButton
    isOpen={isNewSubmissionOpen}
    toggle={toggleNewSubmission}
    icon={<NewSubmissionsIcon />}
    text="New Submissions"
    badgeCount={newSubmissionsCount}
    useNotificationBadge={true}
  />
);

export default NewSubmissionsToggle;
