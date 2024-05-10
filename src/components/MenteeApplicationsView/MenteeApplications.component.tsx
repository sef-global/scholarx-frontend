import React, { useState } from 'react';
import useMyMentees from '../../hooks/useMyMentees';
import { ApplicationStatus } from '../../enums';

const MenteeApplications: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    'available' | 'notAvailable'
  >('available');

  const { data: mentees } = useMyMentees();

  const handleOptionChange = (option: 'available' | 'notAvailable'): void => {
    setSelectedOption(option);
  };

  return (
    <div className="mb-8 px-2 md:px-4">
      <div className="flex items-center justify-between px-2 py-2 rounded-md">
        <span className="text-xl font-medium">Mentees</span>
        <div className="flex items-center">
          <button
            className={`px-2 py-1 rounded-l-md text-xs md:text-sm ${
              selectedOption === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-black'
            }`}
            onClick={() => {
              handleOptionChange('available');
            }}
          >
            Available
          </button>
          <button
            className={`px-2 py-1 rounded-r-md text-xs md:text-sm ${
              selectedOption === 'notAvailable'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-black'
            }`}
            onClick={() => {
              handleOptionChange('notAvailable');
            }}
          >
            Not Available
          </button>
        </div>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pb-5">
          These mentees are waiting for your response:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {mentees
            ?.filter((mentee) => mentee.state === ApplicationStatus.PENDING)
            .map((mentee) => (
              <div
                key={mentee.uuid}
                className="border border-black rounded-md flex flex-col items-center py-8"
              >
                <img
                  src={mentee.profile.image_url}
                  alt="Mentee Profile"
                  className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-2"
                />
                <p className="text-sm lg:text-md font-medium text-center">
                  {mentee.application.firstName}
                </p>
                <p className="text-xs text-center">
                  {mentee.application.university} {mentee.application.company}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pt-10 pb-5">My Mentees:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {mentees
            ?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED)
            .map((mentee) => (
              <div
                key={mentee.uuid}
                className="border border-black rounded-md flex flex-col items-center py-8"
              >
                <img
                  src={mentee.profile.image_url}
                  alt="Mentee Profile"
                  className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-2"
                />
                <p className="text-sm lg:text-md font-medium text-center">
                  {mentee.application.firstName} {mentee.application.lastName}
                </p>
                <p className="text-xs text-center">
                  {mentee.application.university} {mentee.application.company}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenteeApplications;
