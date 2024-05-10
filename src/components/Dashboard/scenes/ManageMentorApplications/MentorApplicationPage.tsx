import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MentorApplication from '../../../MentorApplication/MentorApplication.component';
import { mentors } from '../../../../__mocks__/mentors';
import { type Mentor } from '../../../../types';

const MentorApplicationPage = () => {
  const { mentorUuid } = useParams();
  const [mentor, setMentor] = React.useState<Mentor>();

  const fetchData = async () => {
    try {
      // use mock data for now
      setMentor(mentors.find((mentor) => mentor.uuid === mentorUuid));
    } catch (error) {
      console.error('Error fetching mentor data:', error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [mentorUuid]);

  return (
    <div className="mx-auto p-8 max-w-4xl">
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
            <span className="block transition">{mentorUuid}</span>
          </li>
        </ol>
      </nav>
      <div className="mt-10 flex justify-center">
        <MentorApplication
          mentor={mentor}
          onApprove={(mentorUuid) => {
            console.log('Approved:', mentorUuid);
          }}
          onReject={(mentorUuid) => {
            console.log('Rejected:', mentorUuid);
          }}
        />
      </div>
    </div>
  );
};

export default MentorApplicationPage;
