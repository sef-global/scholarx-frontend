import React, { useState } from 'react';
import MentorFeedbackForm from './MentorFeedbackForm.component';
import { MonthlyCheckIn } from '../../types';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';
import HistoryToggle from '../Toggle/HistoryToggle';
import { formatDate } from '../../utils';
import NewSubmissionsToggle from '../Toggle/NewSubmissionToggle';

interface MentorMonthlyCheckingProps {
  menteeId: string;
  checkInHistory: MonthlyCheckIn[];
  isLoading: boolean;
  refetch: () => Promise<unknown>;
  isAdmin?: boolean;
}

const MentorMonthlyChecking: React.FC<MentorMonthlyCheckingProps> = ({
  menteeId,
  checkInHistory,
  isLoading,
  refetch,
  isAdmin,
}) => {
  const [submittingFeedback, setSubmittingFeedback] = useState<
    Record<string, boolean>
  >({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isNewSubmissionOpen, setNewSubmissionOpen] = useState(false);

  const handleFeedbackSubmit = async (checkInId: string) => {
    setSubmittingFeedback((prev) => ({ ...prev, [checkInId]: true }));
    await refetch();
    setSubmittingFeedback((prev) => ({ ...prev, [checkInId]: false }));
  };

  const checkedCheckIns = checkInHistory.filter(
    (checkIn) => checkIn.isCheckedByMentor
  );
  const uncheckedCheckIns = checkInHistory.filter(
    (checkIn) => !checkIn.isCheckedByMentor
  );

  const renderCheckIn = (checkIn: MonthlyCheckIn, isHistory = false) => (
    <div
      key={checkIn.uuid}
      className="p-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200 last:border-b-0"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mt-2 mb-4 bg-blue-100 p-2 rounded-md w-30 h-12 flex items-center justify-center">
            {checkIn.title}
          </h4>
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
              {checkIn.progressTowardsGoals ?? 'No progress updates provided'}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h4 className="font-medium text-gray-700">Submissions</h4>
          {checkIn.mediaContentLinks.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline mb-1"
            >
              Click Media Link {index + 1}
            </a>
          ))}
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Submitted on {formatDate(checkIn.checkInDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        {isHistory ? (
          <div className="bg-green-50 p-3 rounded-md">
            <p className="mt-2 text-lg text-gray-600 font-bold p-1 rounded">
              Given Feedback:
            </p>
            <p className="mt-2 text-md text-gray-600">
              {checkIn.mentorFeedback}
            </p>
            <p className="text-sm text-green-600 text-right">
              ✓ Checked by on {formatDate(checkIn.mentorCheckedDate)}
            </p>
          </div>
        ) : (
          <>
            {submittingFeedback[checkIn.uuid] ? (
              <div className="text-center py-4">
                <Spinner />
              </div>
            ) : (
              !isAdmin && (
                <MentorFeedbackForm
                  menteeId={menteeId}
                  checkInId={checkIn.uuid}
                  onSubmit={async () => {
                    await handleFeedbackSubmit(checkIn.uuid);
                  }}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
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
            No Check-ins Found
          </h3>
          <p className="text-gray-600">
            Mentee has not submitted any monthly check-ins yet.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <NewSubmissionsToggle
          isNewSubmissionOpen={isNewSubmissionOpen}
          toggleNewSubmission={() => {
            setNewSubmissionOpen(!isNewSubmissionOpen);
          }}
          newSubmissionsCount={uncheckedCheckIns.length}
        />

        {isNewSubmissionOpen && (
          <div>
            <div className="bg-white mt-8 shadow overflow-hidden rounded-md sm:rounded-md">
              {uncheckedCheckIns.length > 0 ? (
                uncheckedCheckIns.map((checkIn) =>
                  renderCheckIn(checkIn, false)
                )
              ) : (
                <div className="text-center py-8">
                  <NoCheckInsIcon />
                  <p className="text-gray-600">
                    Mentee has not submitted new monthly check-ins yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <HistoryToggle
          isHistoryOpen={isHistoryOpen}
          toggleHistory={() => {
            setIsHistoryOpen(!isHistoryOpen);
          }}
          checkingCount={checkedCheckIns.length}
        />

        {isHistoryOpen && (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden sm:rounded-md">
              {checkedCheckIns.length > 0 ? (
                checkedCheckIns.map((checkIn) => renderCheckIn(checkIn, true))
              ) : (
                <p className="p-4 text-gray-600">
                  No feedback history available.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default MentorMonthlyChecking;
