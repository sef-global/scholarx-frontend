import React from 'react';
import { type Mentor } from '../../types.ts';
import { Link } from 'react-router-dom';
import UserIcon from '../../assets/svg/Icons/UserIcon.tsx';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <Link
      className="border border-gray-200 p-4 rounded-md shadow-md w-52"
      to={`/mentors/${mentor.uuid}`}
    >
      {mentor.profile.image_url !== '' ? (
        <img
          src={mentor.profile.image_url}
          alt="Mentor Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
      <div className="text-center">
        <h5 className="text-lg font-bold">
          {mentor.application.firstName} {mentor.application.lastName}
        </h5>
        <p className="text-sm">{mentor.application.position}</p>
        <p className="text-xs text-gray-500">
          {mentor.application.institution}
        </p>
      </div>
    </Link>
  );
};

export default MentorCard;
