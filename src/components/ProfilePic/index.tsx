import React, { useState } from 'react';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const ProfilePic: React.FC<{ src: string; alt: string; size: string }> = ({
  src,
  alt,
  size,
}) => {
  const [isError, setIsError] = useState(false);

  return isError || !src ? (
    <div
      style={{ height: size, width: size }}
      className="inline-block bg-gray-200 rounded-full ring-2 ring-white flex items-center justify-center"
    >
      <UserIcon />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className="inline-block rounded-full ring-2 ring-white"
      style={{ height: size, width: size }}
      referrerPolicy="no-referrer"
      onError={() => {
        setIsError(true);
      }}
    />
  );
};

export default ProfilePic;
