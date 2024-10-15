import React from 'react';
import { type Mentor } from '../../types.ts';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/index.tsx';

interface MentorCardProps {
  mentor: Mentor;
  variant?: 'default' | 'profile';
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  variant = 'default',
}) => {
  if (variant === 'profile') {
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
  }

  return (
    <Link
      className="border border-gray-200 p-4 rounded-md shadow-md w-52 flex flex-col h-full relative"
      to={`/mentors/${mentor.uuid}`}
    >
      <div className="mx-auto mb-4">
        <ProfilePic
          src={mentor.profile.image_url}
          alt="Mentee Avatar"
          size="6rem"
          availability={mentor.availability}
        />
      </div>
      {!mentor.availability && (
        <div className="absolute top-0 left-0 bg-white bg-opacity-75 text-gray-600 px-2 py-1 rounded-md">
          <span className="text-xs font-semibold">Unavailable</span>
        </div>
      )}
      <div className="text-center">
        <h5 className="text-lg font-semibold text-slate-600 text-wrap">
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
