import React, { useState } from 'react';
import UserIcon from '../../assets/svg/Icons/UserIcon';
import { Mentee } from '../../types';

const MenteeProfilePic: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => {
  const [isError, setIsError] = useState(false);

  return isError || !src ? (
    <div className="inline-block h-10 w-10 bg-gray-200 rounded-full ring-2 ring-white flex items-center justify-center">
      <UserIcon />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
      referrerPolicy="no-referrer"
      onError={() => {
        setIsError(true);
      }}
    />
  );
};

const MenteesList: React.FC<{ mentees: Mentee[] }> = ({ mentees }) => (
  <div className="flex flex-wrap gap-1">
    {mentees &&
      mentees.map((mentee, index) => (
        <div key={index} className="relative group">
          <MenteeProfilePic
            src={mentee.application?.profilePic}
            alt={`${mentee.application.firstName} ${mentee.application.lastName}`}
          />
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100">
            {`${mentee.application.firstName} ${mentee.application.lastName}`}
          </div>
        </div>
      ))}
  </div>
);

export default MenteesList;
