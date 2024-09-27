import React, { useState } from 'react';
import ArrowRightIcon from '../../assets/svg/Icons/ArrowRightIcon';
import ArrowDownIcon from '../../assets/svg/Icons/ArrowDownIcon';
import MonthlyCheckInModal from '../../pages/MenteeCheckIn/MenteeCheckIn.component';

interface MonthlyCheckingHeaderProps {
  isMentorView: boolean;
  handleAddCheckIn?: () => void;
  toggleGuidelines: () => void;
  menteeId?: string;
  showGuidelines: boolean;
}

const MonthlyCheckInHeader: React.FC<MonthlyCheckingHeaderProps> = ({
  isMentorView,
  toggleGuidelines,
  showGuidelines,
  menteeId = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Check-Ins</h2>
        {!isMentorView && (
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 text-sm font-medium"
          >
            Submit Monthly Check-In
          </button>
        )}
      </div>
      <div className="p-4 border-b rounded-full border-gray-200">
        <button
          onClick={toggleGuidelines}
          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none text-sm flex items-center"
        >
          {showGuidelines ? (
            <>
              <ArrowDownIcon />
              Hide Guidelines
            </>
          ) : (
            <>
              <ArrowRightIcon />
              View Guidelines
            </>
          )}
        </button>
      </div>
      {showGuidelines && (
        <div className="bg-white shadow-md overflow-hidden">
          <div className="p-4 bg-blue-50 text-sm">
            <h3 className="font-semibold text-blue-800 mb-4 text-center text-lg">
              Monthly Check-in Guidelines
            </h3>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Guidelines:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                  {isMentorView ? (
                    <>
                      <li>Review monthly updates submitted by your mentees.</li>
                      <li>Provide constructive feedback on their progress.</li>
                      <li>
                        Ensure mentees are meeting their submission
                        requirements.
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        Submit monthly updates on your progress via the ScholarX
                        platform.
                      </li>
                      <li>
                        Make at least 3 media submissions during the 6-month
                        period.
                      </li>
                      <li>
                        Include links to your media submissions in the monthly
                        check-ins.
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Types of Media:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-700">
                  <li>📝 Written: Blogs, Medium</li>
                  <li>🎥 Video: YouTube, Facebook</li>
                  <li>🎙️ Audio: Podcasts, Anchor</li>
                  <li>💻 Code: GitHub repositories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <MonthlyCheckInModal
        isOpen={isModalOpen}
        onClose={closeModal}
        menteeId={menteeId}
      />
    </>
  );
};

export default MonthlyCheckInHeader;
