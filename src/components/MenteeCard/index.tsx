import React from 'react';
import { Link } from 'react-router-dom';

import { Mentee } from '../../types.ts';
import ProfilePic from '../ProfilePic/index.tsx';

interface MenteeCardProps {
  mentee: Mentee;
  showPublicProfile?: boolean;
}

const MenteeCard: React.FC<MenteeCardProps> = ({
  mentee,
  showPublicProfile = false,
}) => {
  return (
    <Link
      className="border-2 border-light-gray p-2.5 pb-[12px] rounded-md shadow-sm max-w-full flex flex-col h-full"
      to={
        showPublicProfile
          ? `/mentees/${mentee.uuid}`
          : `/mentor/my-mentees/${mentee.uuid}`
      }
    >
      <div className="mx-auto mb-2">
        <ProfilePic
          src={mentee.profile?.image_url}
          alt="Mentee Avatar"
          size="11.6875rem"
          width="16.25rem"
          circular={false}
        />
      </div>
      <div className="text-left p-0.5">
        <h5 className="text-lg font-bold">
          {mentee.application.firstName} {mentee.application.lastName}
        </h5>
        {mentee.application.isUndergrad ? (
          <p className="text-sm text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z"></path>
              <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z"></path>
            </svg>
            <span> {mentee.application.university} </span>
          </p>
        ) : (
          <>
            <p className="text-sm">{mentee.application.position}</p>,
            <p className="text-xs text-gray-500">
              {mentee.application.company}
            </p>
          </>
        )}
      </div>
    </Link>
  );
};

export default MenteeCard;
