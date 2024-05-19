import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MentorApplication from '../../../../components/MentorApplication/MentorApplication.component';
import useMentor from '../../../../hooks/useMentor';

const MentorApplicationPage = () => {
  const { mentorId } = useParams();
  const { isLoading, data: mentor, changeState } = useMentor(mentorId);

  return (
    <div className="p-8 max-w-4xl">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <Link
              to="/dashboard"
              className="block transition hover:text-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>
            <Link
              to="/dashboard/manage-mentor-application"
              className="block transition hover:text-gray-700"
            >
              Manage Mentor Applications
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>
            <span className="block transition">{mentorId}</span>
          </li>
        </ol>
      </nav>
      <div className="mt-10 flex justify-center">
        <MentorApplication
          isLoading={isLoading}
          mentor={mentor}
          onStateChange={changeState}
        />
      </div>
    </div>
  );
};

export default MentorApplicationPage;
