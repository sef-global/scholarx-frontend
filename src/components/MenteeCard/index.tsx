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
      className="border border-gray-200 p-4 rounded-md shadow-sm w-52 flex flex-col h-full"
      to={
        showPublicProfile
          ? `/mentees/${mentee.uuid}`
          : `/mentor/my-mentees/${mentee.uuid}`
      }
    >
      <div className="mx-auto mb-4">
        <ProfilePic
          src={mentee.profile?.image_url}
          alt="Mentee Avatar"
          size="6rem"
        />
      </div>
      <div className="text-center">
        <h5 className="text-lg font-bold">
          {mentee.application.firstName} {mentee.application.lastName}
        </h5>
        {mentee.application.isUndergrad ? (
          <p className="text-xs text-gray-500">
            {mentee.application.university}
          </p>
        ) : (
          <>
            <p className="text-sm">{mentee.application.position}</p>
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
