import React from 'react';
import { type Mentor } from '../../types.ts';
import ProfilePic from '../ProfilePic/index.tsx';

interface MentorCardProps {
  mentor: Mentor|undefined;
}

const MentorCardHorizontal: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <div className="rounded-xl border-2 mt-2 border-gray-100 bg-white flex items-start gap-4 p-4">
    <div className="mx-auto mb-4">
        <ProfilePic
          src={mentor?.profile.image_url}
          alt="Mentee Avatar"
          size="6rem"
          availability={mentor?.availability}
        />
      </div>
    <div>
      <h3 className="font-medium sm:text-lg">
        <a
          href="#"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {mentor?.application.firstName}{' '}
          {mentor?.application.lastName}
        </a>
      </h3>
      <p className="line-clamp-2 text-sm text-gray-700">
        {mentor?.application.position},{' '}
        {mentor?.application.institution}
      </p>
    </div>
  </div>
  );
};

export default MentorCardHorizontal;
