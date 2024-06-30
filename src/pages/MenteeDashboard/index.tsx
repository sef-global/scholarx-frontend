import type React from 'react';
import { ApplicationStatus } from '../../enums';
import useMyApplications from '../../hooks/useMyApplications';
import MentorCard from '../../components/MentorCard/MentorCard.component';

const MenteeDashboard: React.FC = () => {
  const { data: mentees } = useMyApplications('mentee');
  const approvedApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED) ??
    [];
  const pendingApplications =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.PENDING) ??
    [];

  return (
    <div className="mb-8 px-2 md:px-4">
      <div className="flex items-center justify-between px-2 py-2 rounded-md">
        <span className="text-xl font-medium">Mentors</span>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2">My Mentor:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {approvedApplications?.length > 0
            ? approvedApplications.map(({ mentor, uuid }) => (
                <MentorCard key={uuid} mentor={mentor} />
              ))
            : 'No mentors'}
        </div>
      </div>
      <div className="px-2 py-2 mt-4">
        <p className="text-lg font-medium mb-2 pb-5">
          Your pending mentee applications:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2 md:px-6">
          {pendingApplications?.length > 0
            ? pendingApplications.map(({ mentor, uuid }) => (
                <MentorCard key={uuid} mentor={mentor} />
              ))
            : 'No mentors'}
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
