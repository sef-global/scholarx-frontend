import React from 'react';
import { useMentees } from '../../hooks/useMentees';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import MenteeProfile from '../../components/MenteeProfile';
import UserIcon from '../../assets/svg/Icons/UserIcon';
import MentorMonthlyChecking from '../../components/MonthlyChecking/MentorMonthlyChecking';
import { ApplicationStatus } from '../../enums';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';
import { Mentee } from '../../types';

const AdminMenteeView: React.FC = () => {
  const { data: mentees } = useMentees();

  const approvedMentees =
    mentees?.filter((mentee) => mentee.state === ApplicationStatus.APPROVED) ||
    [];

  const renderMenteeLink = (mentee: Mentee) => (
    <Link
      key={mentee.uuid}
      className="bg-white border-sky-100 rounded border p-2 text-black flex items-center cursor-pointer mb-2 hover:bg-gray-50 transition-colors duration-200"
      to={`/admin/dashboard/ongoing-mentorship-programs/${mentee.uuid}`}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 mr-3">
          {mentee.profile.image_url ? (
            <img
              src={mentee.profile.image_url}
              alt={`${mentee.application.firstName} ${mentee.application.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <UserIcon />
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {mentee.application.firstName} {mentee.application.lastName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/4 p-4 bg-blue-50">
        <h2 className="text-2xl font-semibold mb-4">Approved Mentees</h2>
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {approvedMentees.map(renderMenteeLink)}
          {approvedMentees.length === 0 && (
            <p className="text-gray-600">No approved mentees available.</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4 bg-gray-50">
        <Routes>
          <Route path=":menteeId" element={<AdminMenteeDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminMenteeDetails: React.FC = () => {
  const { menteeId } = useParams<{ menteeId: string }>();

  const {
    data: checkInHistory = [],
    isLoading,
    refetch,
  } = useMonthlyCheckIns(menteeId ?? '');

  return (
    <div>
      <MenteeProfile />
      <div className="bg-blue-100 rounded-lg p-4 mt-4 mb-4">
        <MentorMonthlyChecking
          menteeId={menteeId ?? ''}
          checkInHistory={checkInHistory}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default AdminMenteeView;
