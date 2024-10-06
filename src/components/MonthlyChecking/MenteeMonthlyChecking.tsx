import React, { useState } from 'react';
import { format } from 'date-fns';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';
import { MonthlyCheckIn } from '../../types';
import NewSubmissionsToggle from '../Toggle/NewSubmissionToggle';
import HistoryToggle from '../Toggle/HistoryToggle';
import ArrowIcon from '../../assets/svg/Icons/ArrowIcon';

interface MenteeMonthlyCheckingProps {
  menteeId: string;
}

interface CheckInItemProps {
  checkIn: MonthlyCheckIn;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-700 truncate flex-1">
            {checkIn.title}
          </h4>
          <ArrowIcon isExpanded={isExpanded} />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Submitted on {format(new Date(checkIn.checkInDate), 'MMM dd, yyyy')}
        </p>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 md:flex md:space-x-4">
          <div className="md:w-2/3">
            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">
                General Updates:
              </h5>
              <p className="text-sm text-gray-600">
                {checkIn.generalUpdatesAndFeedback ?? 'No updates provided'}
              </p>
            </div>
            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">
                Progress Towards Goals:
              </h5>
              <p className="text-sm text-gray-600">
                {checkIn.progressTowardsGoals ?? 'No progress updates provided'}
              </p>
            </div>
            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">Submissions:</h5>
              {checkIn.mediaContentLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 text-sm mb-1 underline"
                >
                  Media Link {index + 1}
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-3 rounded-md">
              <h5 className="font-medium text-gray-700 mb-2">
                Mentor Feedback:
              </h5>
              {checkIn.mentorFeedback ? (
                <p className="text-sm text-gray-600">
                  {checkIn.mentorFeedback}
                </p>
              ) : (
                <p className="text-sm text-gray-600">No feedback yet</p>
              )}
              <div className="text-right mt-2">
                <span
                  className={`text-sm font-medium ${
                    checkIn.isCheckedByMentor
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {checkIn.isCheckedByMentor
                    ? `✓ Checked on ${format(
                        new Date(checkIn.mentorCheckedDate ?? ''),
                        'MMM dd, yyyy'
                      )}`
                    : '⏳ Pending review'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MenteeMonthlyChecking: React.FC<MenteeMonthlyCheckingProps> = ({
  menteeId,
}) => {
  const { data: checkInHistory = [], isLoading } = useMonthlyCheckIns(menteeId);
  const [isNewSubmissionOpen, setNewSubmissionOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
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

  const uncheckedCheckIns = checkInHistory.filter(
    (checkIn: MonthlyCheckIn) => !checkIn.isCheckedByMentor
  );
  const checkedCheckIns = checkInHistory.filter(
    (checkIn: MonthlyCheckIn) => checkIn.isCheckedByMentor
  );

  return (
    <div className="space-y-6">
      <NewSubmissionsToggle
        isNewSubmissionOpen={isNewSubmissionOpen}
        toggleNewSubmission={() => {
          setNewSubmissionOpen(!isNewSubmissionOpen);
        }}
        newSubmissionsCount={uncheckedCheckIns.length}
      />
      {isNewSubmissionOpen && (
        <div className="bg-white shadow overflow-hidden rounded-md">
          {uncheckedCheckIns.length > 0 ? (
            uncheckedCheckIns.map((checkIn) => (
              <CheckInItem key={checkIn.uuid} checkIn={checkIn} />
            ))
          ) : (
            <div className="text-center py-8">
              <NoCheckInsIcon />
              <p className="text-gray-600">No new check-ins to display.</p>
            </div>
          )}
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
        <div className="bg-white shadow overflow-hidden rounded-md">
          {checkedCheckIns.length > 0 ? (
            checkedCheckIns.map((checkIn) => (
              <CheckInItem key={checkIn.uuid} checkIn={checkIn} />
            ))
          ) : (
            <p className="p-4 text-gray-600">No feedback history available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MenteeMonthlyChecking;
