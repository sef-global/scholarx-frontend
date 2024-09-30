import React, { useState } from 'react';
import { format } from 'date-fns';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';
import { MonthlyCheckIn } from '../../types';
import NewSubmissionsToggle from '../Toggle/NewSubmissionToggle';
import HistoryToggle from '../Toggle/HistoryToggle';

interface MenteeMonthlyCheckingProps {
  menteeId: string;
}
interface CheckInItemProps {
  checkIn: MonthlyCheckIn;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn }) => (
  <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-lg font-medium text-gray-700 mt-2 mb-4 bg-blue-100 p-2 rounded w-30 h-12 flex items-center justify-center">
          {' '}
          {checkIn.title}
        </h4>
        <div className="mt-2">
          <h4 className="font-medium text-gray-700">General Updates:</h4>
          <p className="text-sm text-gray-600">
            {checkIn.generalUpdatesAndFeedback ?? 'No updates provided'}
          </p>
        </div>
        <div className="mt-2">
          <h4 className="font-medium text-gray-700">Progress Towards Goals:</h4>
          <p className="text-sm text-gray-600">
            {checkIn.progressTowardsGoals ?? 'No progress updates provided'}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h4 className="font-medium text-gray-700">My Submissions</h4>
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
            {format(new Date(checkIn.checkInDate), 'MMMM dd, yyyy, hh:mm a')}
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
            checkIn.isCheckedByMentor ? 'text-green-600' : 'text-yellow-600'
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
);

const MenteeMonthlyChecking: React.FC<MenteeMonthlyCheckingProps> = ({
  menteeId,
}) => {
  const { data: checkInHistory = [], isLoading } = useMonthlyCheckIns(menteeId);
  const [isNewSubmissionOpen, setNewSubmissionOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

  const uncheckedCheckIns = checkInHistory.filter(
    (checkIn: MonthlyCheckIn) => !checkIn.isCheckedByMentor
  );
  const checkedCheckIns = checkInHistory.filter(
    (checkIn: MonthlyCheckIn) => checkIn.isCheckedByMentor
  );

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
