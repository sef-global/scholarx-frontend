import React, { useState } from 'react';
import { ApplicationStatus } from '../../enums';
import useMyApplications from '../../hooks/useMyApplications';
import MentorCard from '../../components/MentorCard/MentorCard.component';
import MonthlyCheckInHeader from '../../components/MonthlyChecking/MonthlyCheckingHeader';
import MenteeMonthlyChecking from '../../components/MonthlyChecking/MenteeMonthlyChecking';
import MonthlyCheckInModal from '../../components/MonthlyChecking/MenteeCheckInFormModal.component';

const MenteeDashboard: React.FC = () => {
  const [showGuidelines, setShowGuidelines] = useState(true);

  const { data: mentees } = useMyApplications('mentee');
  const approvedApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED) ??
    [];
  const pendingApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.PENDING) ??
    [];

  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const isApproved = approvedApplications.length > 0;

  const menteeId = isApproved ? approvedApplications[0].uuid : '';

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full">
            {isApproved ? (
              <>
                <div className="bg-blue-100 rounded-lg p-4 mt-4 mb-4 flex-grow overflow-auto">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 text-center items-center">
                    Monthly Check-Ins
                  </h2>
                  <div className="flex justify-end">
                    <button
                      onClick={openModal}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                    >
                      Submit Your Monthly Check-In
                    </button>
                  </div>
                  <MonthlyCheckInHeader
                    isMentorView={false}
                    toggleGuidelines={toggleGuidelines}
                    showGuidelines={showGuidelines}
                  />
                  <MenteeMonthlyChecking menteeId={menteeId} />
                </div>
              </>
            ) : (
              <div className="px-2 py-2 mt-4 bg-blue-100 rounded-lg">
                <p className="text-lg font-medium mb-2 pb-5">
                  Your pending mentee applications:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
                  {pendingApplications.length > 0
                    ? pendingApplications.map(({ mentor, uuid }) => (
                        <MentorCard key={uuid} mentor={mentor} />
                      ))
                    : 'No mentors'}
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="px-2 py-2 mt-4">
              <p className="text-lg font-medium mb-2 pb-5">
                Your approved mentee applications:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
                {approvedApplications.length > 0
                  ? approvedApplications.map(({ mentor, uuid }) => (
                      <MentorCard key={uuid} mentor={mentor} />
                    ))
                  : 'No mentors'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MonthlyCheckInModal
        isOpen={isModalOpen}
        onClose={closeModal}
        menteeId={menteeId}
      />
    </>
  );
};

export default MenteeDashboard;
