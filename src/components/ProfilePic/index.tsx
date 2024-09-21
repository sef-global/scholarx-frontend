import React, { useState } from 'react';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const ProfilePic: React.FC<{
  src: string | undefined;
  alt: string;
  size: string;
  availability?: boolean;
  circular?: boolean; // Add circular prop
}> = ({ src, alt, size, availability = true, circular = true }) => { // Default circular to true
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
      className="relative inline-block mt-2px"
      style={{ height: size, width: size }}
    >
      {isLoading && !isError && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-skeleton bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${circular ? 'rounded-full' : 'rounded-lg'}`} // Conditional rounded class
          style={{ height: size, width: size }}
        />
      )}
      {isError ? (
        <div
          className={`inline-block bg-gray-200 ring-2 ring-white flex items-center justify-center ${circular ? 'rounded-full' : 'rounded-lg'}`} // Conditional rounded class
          style={{ height: size, width: size }}
        >
          <UserIcon />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`inline-block ring-2 ring-white object-cover ${circular ? 'rounded-full' : 'rounded-lg'} ${
            !availability ? 'opacity-60' : ''
          }`} // Conditional rounded class
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
