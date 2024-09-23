import React, { useState } from 'react';
import MonthlyCheckInModal from '../../pages/MenteeCheckIn/MenteeCheckIn.component';
import { Mentee } from '../../types';
import { format } from 'date-fns';
import Spinner from '../Spinner/Spinner.component';

interface CheckIn {
  id: string;
  menteeName: string;
  title: string;
  checkInDate: string;
  mediaContentLinks: string[];
  isCheckedByMentor: boolean;
  mentorCheckedDate?: string;
  mentorFeedback?: string;
  generalUpdates?: string;
  progressTowardsGoals?: string;
  mentee: Mentee;
}

interface MonthlyCheckingProps {
  checkInHistory: CheckIn[];
  isMentorView: boolean;
  menteeId: string;
  isLoading: boolean;
  error: any;
}

const MonthlyChecking: React.FC<MonthlyCheckingProps> = ({
  checkInHistory,
  isMentorView,
  menteeId,
  isLoading,
  error,
}) => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [submittingFeedbackId, setSubmittingFeedbackId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };

  const handleAddCheckIn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">
          ⚠️ Failed to load check-ins. Please try again later.
        </p>
      </div>
    );
  }
  const handleFeedbackChange = (id: string, feedback: string) => {
    setFeedback((prev) => ({ ...prev, [id]: feedback }));
  };

  const handleMarkAsChecked = (id: string) => {
    // Logic to mark as checked
  };

  const handleSubmitFeedback = async (id: string) => {
    setSubmittingFeedbackId(id);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Add your logic to submit feedback here
    } finally {
      setSubmittingFeedbackId(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-center">Monthly Check-Ins</h2>
        {!isMentorView && (
          <button
            onClick={handleAddCheckIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 text-sm flex items-center justify-center min-w-[120px]"
          >
            Submit Your Monthly Check-In
          </button>
        )}
      </div>
      <div className="bg-white shadow rounded-lg p-3">
        <button
          onClick={toggleGuidelines}
          className="text-blue-600 hover:text-blue-800 font-medium mb-1 focus:outline-none text-sm"
        >
          {showGuidelines ? 'Hide Guidelines' : 'View Guidelines'}
        </button>
        {showGuidelines && (
          <div className="mb-3 p-2 bg-gray-100 rounded-md text-sm">
            <p className="font-semibold">Monthly Check-in Guidelines:</p>
            <ul className="list-disc pl-4 space-y-1 mt-1">
              <li>
                <strong>Monthly Check-ins:</strong> Submit monthly updates on
                your progress via the ScholarX platform.
              </li>
              <li>
                <strong>Public Sharing:</strong> Make at least 3 media
                submissions during the 6-month period. Include links in the
                monthly check-ins.
              </li>
            </ul>
            <p className="font-medium mt-1">Types of Media:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Written:</strong> Blogs on personal websites, Medium,
                Blogspot.
              </li>
              <li>
                <strong>Video:</strong> YouTube, Facebook.
              </li>
              <li>
                <strong>Audio:</strong> Anchor, YouTube, podcasts.
              </li>
            </ul>
          </div>
        )}
        {checkInHistory.length > 0 ? (
          checkInHistory.map((checkIn) => (
            <div
              key={checkIn.id}
              className="mb-2 last:mb-0 p-2 border-b last:border-b-0 text-sm flex justify-between items-start"
            >
              <div className="flex-grow">
                <h3 className="font-medium">
                  {isMentorView ? (
                    <>
                      Mentee Name:{' '}
                      {`${checkIn.mentee.application.firstName} ${checkIn.mentee.application.lastName}`}
                      <br />
                      Month: {checkIn.title}
                    </>
                  ) : (
                    'Month: ' + checkIn.title
                  )}
                </h3>
                <p className="text-gray-600">
                  {format(new Date(checkIn.checkInDate), 'MMMM dd, yyyy')}
                </p>
                {isMentorView && checkIn.isCheckedByMentor ? (
                  <p className="text-green-600">✓ Checked by mentor</p>
                ) : isMentorView ? (
                  <div>
                    <textarea
                      className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                      placeholder="Enter feedback here"
                      value={feedback[checkIn.id] || ''}
                      onChange={(e) => {
                        handleFeedbackChange(checkIn.id, e.target.value);
                      }}
                    />
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checkIn.isCheckedByMentor}
                        onChange={() => {
                          handleMarkAsChecked(checkIn.id);
                        }}
                      />
                      <span className="ml-2">Mark as Checked</span>
                    </label>
                    <button
                      onClick={async () => {
                        await handleSubmitFeedback(checkIn.id);
                      }}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm flex items-center justify-center min-w-[80px]"
                      disabled={submittingFeedbackId === checkIn.id}
                    >
                      {submittingFeedbackId === checkIn.id ? (
                        <Spinner />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium mt-2">Mentor Feedback:</p>
                    <p className="text-gray-700">
                      {checkIn.mentorFeedback ?? 'No feedback yet'}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                {checkIn.mediaContentLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mb-1"
                  >
                    View Submission {index + 1}
                  </a>
                ))}
                {!isMentorView && (
                  <p className="text-sm mt-1">
                    {checkIn.isCheckedByMentor ? (
                      <span className="text-green-600">
                        ✓ Checked by mentor on{' '}
                        {checkIn.mentorCheckedDate
                          ? format(
                              new Date(checkIn.mentorCheckedDate),
                              'MMMM dd, yyyy'
                            )
                          : 'N/A'}
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        Pending mentor review
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-xl mb-1">📝</p>
            <p className="font-medium">No monthly submissions yet</p>
            <p className="text-gray-600">
              {isMentorView
                ? 'The mentees have not submitted any check-ins yet.'
                : 'Add your progress to get started!'}
            </p>
          </div>
        )}
      </div>
      <MonthlyCheckInModal
        isOpen={isModalOpen}
        onClose={closeModal}
        menteeId={menteeId}
      />
    </div>
  );
};

export default MonthlyChecking;
