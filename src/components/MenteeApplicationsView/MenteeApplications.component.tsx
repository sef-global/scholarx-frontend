import React, { useState } from 'react';

// Define the interface for a single applicant
interface Applicant {
  name: string;
  university: string;
  profilePicture: string;
}

// Define the props interface for the MenteeApplications component
interface MenteeApplicationsProps {
  mentees: Applicant[]; // Array of main mentees
  myMentees: Applicant[]; // Array of personal mentees
}

// Define the MenteeApplications component
const MenteeApplications: React.FC<MenteeApplicationsProps> = ({
  mentees,
  myMentees,
}) => {
  // State to manage the selected option ('available' or 'notAvailable')
  const [selectedOption, setSelectedOption] = useState<
    'available' | 'notAvailable'
  >('available');

  // Function to handle option change
  const handleOptionChange = (option: 'available' | 'notAvailable'): void => {
    setSelectedOption(option);
  };

  return (
    <div className="mb-8 px-2 md:px-4">
      {/* Section for main mentees */}
      <div className="flex items-center justify-between px-2 py-2 rounded-md">
        <span className="text-xl font-medium">Mentees</span>
        <div className="flex items-center">
          {/* Button for selecting 'available' */}
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
          {/* Button for selecting 'notAvailable' */}
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
      {/* Section for main mentees */}
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pb-5">
          These mentees are waiting for your response:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {/* Mapping through main mentees */}
          {mentees.map((mentee, index) => (
            <div
              key={index}
              className="border border-black rounded-md flex flex-col items-center py-8"
            >
              {/* Mentee profile picture */}
              <img
                src={mentee.profilePicture}
                alt="Mentee Profile"
                className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-2"
              />
              {/* Mentee name */}
              <p className="text-sm lg:text-md font-medium text-center">
                {mentee.name}
              </p>
              {/* Mentee university */}
              <p className="text-xs text-center">{mentee.university}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Section for my mentees */}
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pt-10 pb-5">My Mentees:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {/* Mapping through my mentees */}
          {myMentees.map((MyMentee, index) => (
            <div
              key={index}
              className="border border-black rounded-md flex flex-col items-center py-8"
            >
              {/* Mentee profile picture */}
              <img
                src={MyMentee.profilePicture}
                alt="Mentee Profile"
                className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-2"
              />
              {/* Mentee name */}
              <p className="text-sm lg:text-md font-medium text-center">
                {MyMentee.name}
              </p>
              {/* Mentee university */}
              <p className="text-xs text-center">{MyMentee.university}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenteeApplications;
