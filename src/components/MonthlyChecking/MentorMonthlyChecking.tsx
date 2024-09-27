import React, { useState } from 'react';
import { format } from 'date-fns';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';
import MentorFeedbackForm from './MentorFeedbackForm.component';
import { Mentee } from '../../types';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';

interface MentorMonthlyCheckingProps {
  mentee: Mentee;
}

const MentorMonthlyChecking: React.FC<MentorMonthlyCheckingProps> = ({
  mentee,
}) => {
  const [submittingFeedback, setSubmittingFeedback] = useState<
    Record<string, boolean>
  >({});
  const {
    data: checkInHistory = [],
    isLoading,
    refetch,
  } = useMonthlyCheckIns(mentee.uuid);

  const handleFeedbackSubmit = async (checkInId: string) => {
    setSubmittingFeedback((prev) => ({ ...prev, [checkInId]: true }));
    await refetch();
    setSubmittingFeedback((prev) => ({ ...prev, [checkInId]: false }));
  };

  return (
    <div className="divide-y divide-gray-200">
      {isLoading ? (
        <div className="text-center py-4">
          <Spinner />
        </div>
      ) : checkInHistory.length === 0 ? (
        <div className="text-center py-8">
          <NoCheckInsIcon />
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            No monthly check-ins yet
          </h3>
          <p className="text-gray-600">
            Start by submitting your first monthly check-in!
          </p>
        </div>
      ) : (
        checkInHistory.map((checkIn) => (
          <div
            key={checkIn.uuid}
            className="p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Mentee:{' '}
                  {`${checkIn.mentee.application.firstName} ${checkIn.mentee.application.lastName}`}
                </h3>
                <h4 className="text-lg font-medium text-gray-700 mt-2 mb-4">
                  Month: {checkIn.title}
                </h4>
                <div className="mt-2">
                  <h4 className="font-medium text-gray-700">
                    General Updates:
                  </h4>
                  <p className="text-sm text-gray-600">
                    {checkIn.generalUpdatesAndFeedback ?? 'No updates provided'}
                  </p>
                </div>
                <div className="mt-2">
                  <h4 className="font-medium text-gray-700">
                    Progress Towards Goals:
                  </h4>
                  <p className="text-sm text-gray-600">
                    {checkIn.progressTowardsGoals ??
                      'No progress updates provided'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <h4 className="font-medium text-gray-700">
                  Mentee&apos;s Submissions,
                </h4>
                {checkIn.mediaContentLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-md mb-1"
                  >
                    Submission {index + 1}
                  </a>
                ))}
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Submitted on{' '}
                    {format(new Date(checkIn.checkInDate), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3">
              {checkIn.isCheckedByMentor ? (
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="mt-2 text-lg text-gray-600 font-bold p-1 rounded">
                    Your Given Feedback:
                  </p>
                  <p className="mt-2 text-md text-gray-600">
                    {checkIn.mentorFeedback}
                  </p>
                  <p className="text-sm text-green-600 text-right">
                    ✓ Checked by you on{' '}
                    {format(
                      new Date(checkIn.mentorCheckedDate ?? ''),
                      'MMM dd, yyyy'
                    )}
                  </p>
                </div>
              ) : (
                <>
                  {submittingFeedback[checkIn.uuid] ? (
                    <div className="text-center py-4">
                      <Spinner />
                    </div>
                  ) : (
                    <MentorFeedbackForm
                      menteeId={mentee.uuid}
                      checkInId={checkIn.uuid}
                      onSubmit={async () => {
                        await handleFeedbackSubmit(checkIn.uuid);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorMonthlyChecking;
