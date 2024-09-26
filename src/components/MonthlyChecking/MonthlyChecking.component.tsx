import React, { useEffect, useState } from 'react';
import MonthlyCheckInModal from '../../pages/MenteeCheckIn/MenteeCheckIn.component';
import { MonthlyCheckingProps } from '../../types';
import { format } from 'date-fns';
import Spinner from '../Spinner/Spinner.component';
import NoCheckInsIcon from '../../assets/svg/Icons/NoCheckInsIcon';
import ArrowDownIcon from '../../assets/svg/Icons/ArrowDownIcon';
import ArrowRightIcon from '../../assets/svg/Icons/ArrowRightIcon';
import {
  useMentorFeedback,
  useMonthlyCheckIns,
} from '../../hooks/useSubmitCheckIn';
import { z } from 'zod';
import { MentorFeedbackSchema } from '../../schemas';
import MentorFeedbackForm from './MentorFeedbackForm.component';

type MentorFeedbackFormData = z.infer<typeof MentorFeedbackSchema>;

const MonthlyChecking: React.FC<MonthlyCheckingProps> = ({
  isMentorView,
  menteeId,
}) => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [submittingFeedbackId, setSubmittingFeedbackId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { submitMentorFeedback } = useMentorFeedback();

  const { data: checkInHistory = [], isLoading } = useMonthlyCheckIns(menteeId);

  console.log('checkInHistory', checkInHistory);
  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };

  const handleAddCheckIn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitFeedback = async (data: MentorFeedbackFormData) => {
    console.log('submitting feedback');
    setSubmittingFeedbackId(data.checkInId);
    try {
      await submitMentorFeedback(data);
    } catch (error) {
    } finally {
      setSubmittingFeedbackId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Check-Ins</h2>
        {!isMentorView && (
          <button
            onClick={handleAddCheckIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 text-sm font-medium"
          >
            Submit Monthly Check-In
          </button>
        )}
      </div>

      <div className="bg-white shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
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
          <div className="p-4 bg-blue-50 text-sm">
            <h3 className="font-semibold text-blue-800 mb-2">
              Monthly Check-in Guidelines:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>
                Submit monthly updates on your progress via the ScholarX
                platform.
              </li>
              <li>
                Make at least 3 media submissions during the 6-month period.
              </li>
              <li>
                Include links to your media submissions in the monthly
                check-ins.
              </li>
            </ul>
            <h4 className="font-semibold text-blue-800 mt-3 mb-1">
              Types of Media:
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-blue-700">
              <li>📝 Written: Blogs, Medium</li>
              <li>🎥 Video: YouTube, Facebook</li>
              <li>🎙️ Audio: Podcasts, Anchor</li>
              <li>💻 Code: GitHub repositories</li>
            </ul>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-4">
            <Spinner />
          </div>
        ) : checkInHistory.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {checkInHistory.map((checkIn) => (
              <div
                key={checkIn.id}
                className="p-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {isMentorView
                        ? `${checkIn.mentee.application.firstName} ${checkIn.mentee.application.lastName}`
                        : checkIn.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted on{' '}
                      {format(new Date(checkIn.checkInDate), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {checkIn.mediaContentLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mb-1"
                      >
                        Submission {index + 1}
                      </a>
                    ))}
                    {!isMentorView && (
                      <span
                        className={`text-xs font-medium ${
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
                    )}
                  </div>
                </div>

                {isMentorView && (
                  <div className="mt-3">
                    {checkIn.isCheckedByMentor ? (
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm text-green-600">
                          ✓ Checked by mentor on{' '}
                          {format(
                            new Date(checkIn.mentorCheckedDate ?? ''),
                            'MMM dd, yyyy'
                          )}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          {checkIn.mentorFeedback}
                        </p>
                      </div>
                    ) : (
                      <MentorFeedbackForm
                        menteeId={menteeId}
                        checkInId={checkIn.id}
                        isSubmitting={submittingFeedbackId === checkIn.id}
                        onSubmit={handleSubmitFeedback}
                      />
                    )}
                  </div>
                )}

                {!isMentorView && (
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-1">
                      Mentor Feedback:
                    </h4>
                    {checkIn.mentorFeedback ? (
                      <p className="text-sm text-gray-600">
                        {checkIn.mentorFeedback}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">No feedback yet</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <NoCheckInsIcon />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              No monthly check-ins yet
            </h3>
            <p className="text-gray-600">
              {isMentorView
                ? 'Mentees have not submitted any check-ins yet.'
                : 'Start by submitting your first monthly check-in!'}
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
