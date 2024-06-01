import React from 'react';
import { type Mentee } from '../../types.ts';
import { Link } from 'react-router-dom';
import UserIcon from '../../assets/svg/Icons/UserIcon.tsx';

interface MenteeCardProps {
  mentee: Mentee;
}

const MenteeCard: React.FC<MenteeCardProps> = ({ mentee }) => {
  return (
    <Link
      className="border border-gray-200 p-4 rounded-md shadow-sm w-52"
      to={`/mentor/my-mentees/${mentee.uuid}`}
    >
      {mentee.profile.image_url !== '' ? (
        <img
          src={mentee.profile.image_url}
          alt="Mentee Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
      <div className="text-center">
        <h5 className="text-lg font-bold">
          {mentee.application.firstName} {mentee.application.lastName}
        </h5>
        <p className="text-sm">{mentee.application.position}</p>
        <p className="text-xs text-gray-500">{mentee.application.company}</p>
        <p className="text-xs text-gray-500">{mentee.application.university}</p>
      </div>
    </Link>
  );
};

export default MenteeCard;
