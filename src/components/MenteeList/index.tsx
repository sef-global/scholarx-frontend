import React from 'react';
import { Mentee } from '../../types';
import ProfilePic from '../ProfilePic';

const MenteesList: React.FC<{ mentees: Mentee[] }> = ({ mentees }) => (
  <div className="flex flex-wrap gap-1">
    {mentees?.map((mentee, index) => (
      <div key={index} className="relative group">
        <ProfilePic
          src={mentee.application?.profilePic}
          alt={`${mentee.application.firstName} ${mentee.application.lastName}`}
          size={'2.5rem'}
        />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
          {`${mentee.application.firstName} ${mentee.application.lastName}`}
        </div>
      </div>
    ))}
  </div>
);

export default MenteesList;
