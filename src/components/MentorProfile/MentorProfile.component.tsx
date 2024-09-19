import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/index.tsx';
import { type Mentor } from '../../types.ts';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorProfileCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <Link
      className="border border-gray-200 p-2 rounded-md shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200"
      to={`/mentors/${mentor.uuid}`}
    >
      <div className="relative">
        <ProfilePic
          src={mentor.profile.image_url}
          alt="Mentor Avatar"
          size="2.5rem"
          availability={mentor.availability}
        />
        {!mentor.availability && (
          <div className="absolute -top-1 -right-1 bg-white bg-opacity-75 text-gray-600 px-1 rounded-full text-xs">
            ⏳
          </div>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h5 className="text-sm font-semibold text-slate-600 truncate">
          {mentor.application.firstName} {mentor.application.lastName}
        </h5>
        <p className="text-xs text-gray-500 truncate">
          {mentor.application.position}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {mentor.application.institution}
        </p>
      </div>
    </Link>
  );
};

export default MentorProfileCard;
