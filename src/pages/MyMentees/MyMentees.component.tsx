import React, { useState } from 'react';
import { useMentees } from '../../hooks/useMentees';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import MenteeProfile from '../../components/MenteeProfile';
import UserIcon from '../../assets/svg/Icons/UserIcon';
import MonthlyCheckInHeader from '../../components/MonthlyChecking/MonthlyCheckingHeader';
import MentorMonthlyChecking from '../../components/MonthlyChecking/MentorMonthlyChecking';
import { ApplicationStatus } from '../../enums';
import { useMonthlyCheckIns } from '../../hooks/useSubmitCheckIn';
import { Mentee } from '../../types';

const MyMentees: React.FC = () => {
  const { data: menteeApplications } = useMentees();

  const [activeTab, setActiveTab] = useState<ApplicationStatus>(
    ApplicationStatus.APPROVED
  );

  const filteredApplications =
    menteeApplications?.filter((mentee) => mentee.state === activeTab) || [];

  const tabData = [
    { status: ApplicationStatus.APPROVED, label: 'Approved' },
    { status: ApplicationStatus.PENDING, label: 'Pending' },
    { status: ApplicationStatus.REJECTED, label: 'Rejected' },
  ];

  const renderMenteeLink = (mentee: Mentee) => (
    <Link
      key={mentee.uuid}
      className="bg-white border-sky-100 rounded border p-2 text-black flex items-center cursor-pointer mb-2 hover:bg-gray-50 transition-colors duration-200"
      to={`/mentor/my-mentees/${mentee.uuid}`}
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
      <div className="hidden md:w-1/5 p-4 bg-blue-50 md:block">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mentee Applications</h2>
        </div>
        <div className="mb-4 flex space-x-1 text-xs">
          {tabData.map((tab) => (
            <button
              key={tab.status}
              className={`px-1 py-1 rounded transition-colors duration-300 ${
                activeTab === tab.status
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setActiveTab(tab.status);
              }}
            >
              <span>{tab.label}</span>
              <span className="px-1 py-1 text-xs font-semibold rounded-full bg-opacity-20 bg-gray-700 text-gray-700">
                {menteeApplications?.filter((m) => m.state === tab.status)
                  .length || 0}
              </span>
            </button>
          ))}
        </div>
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {filteredApplications.map(renderMenteeLink)}
          {filteredApplications.length === 0 && (
            <p className="text-gray-600">No mentee applications available.</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-4/5 p-4 bg-gray-50">
        <div className="flex items-center mb-5 md:mb-10 md:pb-7 justify-between">
          <Link to={'/mentor/dashboard'} className="flex items-center">
            <span className="text-xl md:text-3xl">&#8592;</span>
            <button className="text-md md:text-xl font-semibold mr-2 bg-transparent px-3 py-1 rounded-md mt-1">
              Back
            </button>
          </Link>
        </div>
        <Routes>
          <Route
            index
            element={<MenteeList menteeApplications={filteredApplications} />}
          />
          <Route path=":menteeId" element={<MenteeDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const MenteeList: React.FC<{ menteeApplications: Mentee[] }> = ({
  menteeApplications,
}) => (
  <div>
    {menteeApplications.length === 0 ? (
      <p className="text-gray-600">No mentee applications available.</p>
    ) : (
      <ul>
        {menteeApplications.map((mentee) => (
          <li key={mentee.uuid} className="mb-2">
            <Link
              to={`/mentor/my-mentees/${mentee.uuid}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {mentee.application.firstName} {mentee.application.lastName}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const MenteeDetails: React.FC = () => {
  const { menteeId } = useParams<{ menteeId: string }>();
  const [showGuidelines, setShowGuidelines] = useState(true);

  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };

  const {
    data: checkInHistory = [],
    isLoading,
    refetch,
  } = useMonthlyCheckIns(menteeId ?? '');

  return (
    <div>
      <MenteeProfile />
      <div className="bg-blue-100 rounded-lg p-4 mt-4 mb-4">
        <MonthlyCheckInHeader
          isMentorView={true}
          toggleGuidelines={toggleGuidelines}
          showGuidelines={showGuidelines}
        />
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

export default MyMentees;
