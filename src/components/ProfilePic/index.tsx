import React, { useState } from 'react';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const ProfilePic: React.FC<{
  src: string | undefined;
  alt: string;
  size: string;
  width?: string;
  availability?: boolean;
  circular?: boolean; 
}> = ({ src, alt, size, width, availability = true, circular = true }) => { 
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const appliedWidth = width || size;
  
  return (
    <div
      className="relative inline-block"
      style={{ height: size, width: appliedWidth }}
    >
      {isLoading && !isError && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-skeleton bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${circular ? 'rounded-full' : 'rounded-custom-5'}`} // Conditional rounded class
          style={{ height: size, width: appliedWidth }}
        />
      )}
      {isError ? (
        <div
          className={`inline-block bg-gray-200 ring-2 ring-white flex items-center justify-center ${circular ? 'rounded-full' : 'rounded-custom-5'}`} // Conditional rounded class
          style={{ height: size, width: appliedWidth }}
        >
          <UserIcon />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`inline-block ring-2 ring-white object-cover ${circular ? 'rounded-full' : 'rounded-custom-5'} ${
            !availability ? 'opacity-60' : ''
          } max-w-full`} 
          style={{ height: size, width: appliedWidth }}
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          
        />
      )}
    </div>
  );
};

export default ProfilePic;
