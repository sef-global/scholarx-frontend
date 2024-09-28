import React from 'react';
import { format } from 'date-fns';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';

interface MenteeMonthlyCheckingProps {
  menteeId: string;
}

const MenteeMonthlyChecking: React.FC<MenteeMonthlyCheckingProps> = ({
  menteeId,
}) => {
  const { data: checkInHistory = [], isLoading } = useMonthlyCheckIns(menteeId);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  }

  if (checkInHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <NoCheckInsIcon />
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          No monthly check-ins yet
        </h3>
        <p className="text-gray-600">
          Start by submitting your first monthly check-in!
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {checkInHistory.map((checkIn) => (
        <div
          key={checkIn.uuid}
          className="p-4 hover:bg-gray-50 transition-colors duration-150"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mt-2 mb-4">
                Month: {checkIn.title}
              </h3>
              <div className="mt-2">
                <h4 className="font-medium text-gray-700">General Updates:</h4>
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
              <h4 className="font-medium text-gray-700">My Submissions,</h4>
              {checkIn.mediaContentLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mb-1 underline"
                >
                  Click Media Link {index + 1}
                </a>
              ))}
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Submitted on{' '}
                  {format(
                    new Date(checkIn.checkInDate),
                    'MMMM dd, yyyy, hh:mm a'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 bg-gray-50 p-3 rounded-md">
            <h4 className="mt-2 text-lg text-gray-600 font-bold p-1 rounded">
              Mentor Feedback:
            </h4>
            {checkIn.mentorFeedback ? (
              <p className="text-md text-gray-600">{checkIn.mentorFeedback}</p>
            ) : (
              <p className="text-sm text-gray-600">No feedback yet</p>
            )}
            <div className="text-right">
              <span
                className={`text-sm font-medium ${
                  checkIn.isCheckedByMentor
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {checkIn.isCheckedByMentor
                  ? `✓ Checked by mentor on ${format(
                      new Date(checkIn.mentorCheckedDate ?? ''),
                      'MMM dd, yyyy, hh:mm a'
                    )}`
                  : '⏳ Pending review'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenteeMonthlyChecking;
