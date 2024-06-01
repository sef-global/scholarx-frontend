import React, { useContext, useState } from 'react';
import useMyMentees from '../../hooks/useMyMentees';
import { ApplicationStatus } from '../../enums';
import useMentor from '../../hooks/useMentor';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import MenteeCard from '../../components/MenteeCard';

const MenteeApplications: React.FC = () => {
  const { mentor } = useContext(UserContext) as UserContextType;
  const { data: mentees } = useMyMentees();
  const [isAvailable, setIsAvailable] = useState(mentor?.availability);
  const { updateAvailability } = useMentor(mentor?.uuid);

  const handleAvailability = (availability: boolean) => {
    updateAvailability(availability);
    setIsAvailable(availability);
  };

  return (
    <div className="mb-8 px-2 md:px-4">
      <div className="flex items-center justify-between px-2 py-2 rounded-md">
        <p className="text-xl md:text-2xl font-semibold">Mentees</p>
        <div className="flex items-center justify-center">
          {isAvailable !== undefined && (
            <div className="flex">
              <button
                className={`px-4 py-2 rounded-l-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  isAvailable
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
                onClick={() => {
                  handleAvailability(true);
                }}
              >
                Available
              </button>
              <button
                className={`px-4 py-2 rounded-r-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  !isAvailable
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
                onClick={() => {
                  handleAvailability(false);
                }}
              >
                Not Available
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-md md:text-lg font-medium mb-2 pb-5">
          These mentees are waiting for your response:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-4 px-2 md:px-6">
          {mentees
            ?.filter((mentee) => mentee.state === ApplicationStatus.PENDING)
            .map((mentee) => (
              <MenteeCard key={mentee.uuid} mentee={mentee} />
            ))}
        </div>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pt-10 pb-5">My Mentees:</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-4 px-2 md:px-6">
          {mentees
            ?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED)
            .map((mentee) => (
              <MenteeCard key={mentee.uuid} mentee={mentee} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenteeApplications;
