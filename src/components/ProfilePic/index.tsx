import React, { useState } from 'react';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const ProfilePic: React.FC<{
  src: string | undefined;
  alt: string;
  size: string;
  availability?: boolean;
}> = ({ src, alt, size, availability = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <div
      className="relative inline-block"
      style={{ height: size, width: size }}
    >
      {isLoading && !isError && (
        <div
          className="absolute inset-0 bg-gray-200 rounded-full animate-skeleton bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
          style={{ height: size, width: size }}
        />
      )}
      {isError ? (
        <div
          className="inline-block bg-gray-200 rounded-full ring-2 ring-white flex items-center justify-center"
          style={{ height: size, width: size }}
        >
          <UserIcon />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`inline-block rounded-full ring-2 ring-white object-cover ${
            !availability ? 'opacity-60' : ''
          }`}
          style={{ height: size, width: size }}
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default ProfilePic;
