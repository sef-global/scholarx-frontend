import React from 'react';
import { ApplicationStatus } from '../../enums';
import useMyApplications from '../../hooks/useMyApplications';
import MentorCard from '../../components/MentorCard/MentorCard.component';
import MonthlyChecking from '../../components/MonthlyChecking/MonthlyChecking.component';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';

const MenteeDashboard: React.FC = () => {
  const { data: mentees } = useMyApplications('mentee');
  const approvedApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED) ??
    [];
  const pendingApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.PENDING) ??
    [];

  const isApproved = approvedApplications.length > 0;

  const menteeId = isApproved ? approvedApplications[0].uuid : '';

  console.log('menteeId', menteeId);
  console.log('mentees', mentees);

  const {
    data: checkInHistory = [],
    isLoading,
    error,
  } = useMonthlyCheckIns(menteeId);

  console.log('checkInHistory', checkInHistory);
  // const checkInHistory = [
  //   {
  //     id: '1',
  //     menteeName: 'Jane Doe',
  //     title: 'Monthly Progress Report - August',
  //     date: '2024-08-15',
  //     links: [
  //       'https://example.com/submission/1',
  //       'https://example.com/submission/2',
  //       'https://example.com/submission/3',
  //     ],
  //     mentorChecked: false,
  //     mentorFeedback: null,
  //   },
  //   {
  //     id: '2',
  //     menteeName: 'John Smith',
  //     title: 'Monthly Progress Report - August',
  //     date: '2024-08-18',
  //     links: ['https://example.com/submission/2'],
  //     mentorChecked: false,
  //     mentorFeedback: null,
  //   },
  // ];
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-2">
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
        <div className="w-full">
          {isApproved ? (
            <MonthlyChecking
              checkInHistory={checkInHistory}
              isMentorView={false}
              menteeId={menteeId}
              isLoading={isLoading}
              error={error}
            />
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
      </div>
    </div>
  );
};

export default MenteeDashboard;
