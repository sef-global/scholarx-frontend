import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MentorApplication from '../../../../components/MentorApplication/MentorApplication.component';
import useMentor from '../../../../hooks/admin/useMentor';
import ChevronRightIcon from '../../../../assets/svg/Icons/ChevronRightIcon';

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
            <ChevronRightIcon />
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
            <ChevronRightIcon />
          </li>
          <li>
            <span className="block transition">
              {mentor?.application.firstName} {mentor?.application.lastName}
            </span>
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
