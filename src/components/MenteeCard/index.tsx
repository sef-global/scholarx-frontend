import React from 'react';
import { Link } from 'react-router-dom';

import { Mentee } from '../../types.ts';
import ProfilePic from '../ProfilePic/index.tsx';
import BusinessBag from '../../assets/svg/BusinessBag.tsx';

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
            <BusinessBag />
            <span>{mentee.application.university}</span>
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
