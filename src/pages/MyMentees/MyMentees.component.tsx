import React, { useState, useEffect } from 'react';
import { useMentees } from '../../hooks/useMentees';
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredApplications =
    menteeApplications?.filter((mentee) => mentee.state === activeTab) || [];

  const tabData = [
    { status: ApplicationStatus.APPROVED, label: 'Approved' },
    { status: ApplicationStatus.PENDING, label: 'Pending' },
  ];

  const renderMenteeLink = (mentee: Mentee) => (
    <Link
      key={mentee.uuid}
      className="bg-white border-sky-100 rounded border p-2 text-black flex items-center cursor-pointer mb-2 hover:bg-gray-50 transition-colors duration-200"
      to={`/mentor/dashboard/${mentee.uuid}`}
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

  const renderMenteeList = () => (
    <div
      className={`${isMobile ? 'w-full' : 'w-1/5'} p-4 bg-blue-50 rounded-lg`}
    >
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
            <span className="px-1 py-1 ml-1 p-1 text-xs font-semibold rounded-full bg-opacity-20 bg-gray-700 text-gray-700">
              {menteeApplications?.filter((m) => m.state === tab.status)
                .length || 0}
            </span>
          </button>
        ))}
      </div>
      <div className={`${isMobile ? '' : 'h-96'} overflow-y-auto`}>
        {filteredApplications.map(renderMenteeLink)}
        {filteredApplications.length === 0 && (
          <p className="text-gray-600">No mentee applications available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} min-h-screen`}>
      {isMobile ? (
        <Routes>
          <Route path="/" element={renderMenteeList()} />
          <Route
            path=":menteeId"
            element={
              <MenteeDetails
                onBack={() => {
                  navigate('/mentor/dashboard');
                }}
                isMobile={isMobile}
              />
            }
          />
        </Routes>
      ) : (
        <>
          {renderMenteeList()}
          <div className="w-4/5 p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<WelcomeMessage />} />
              <Route
                path=":menteeId"
                element={
                  <MenteeDetails onBack={() => {}} isMobile={isMobile} />
                }
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

const WelcomeMessage: React.FC = () => (
  <div className="p-6 mb-6">
    <h1 className="text-2xl font-semibold mb-4 text-gray-800">
      Welcome to the ScholarX Mentee Dashboard!
    </h1>
    <p className="text-gray-600">
      Here, you can view your mentees and provide feedback on their monthly
      check-ins. Click on a mentee to view their profile and their monthly
      check-in submissions.
    </p>
  </div>
);

const MenteeDetails: React.FC<{ onBack: () => void; isMobile: boolean }> = ({
  onBack,
  isMobile,
}) => {
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
    <div className="flex flex-col h-full">
      {isMobile && (
        <button
          onClick={onBack}
          className="text-blue-500 hover:text-blue-700 mb-4 text-left"
        >
          ← Back to Mentee List
        </button>
      )}
      <MenteeProfile />
      <hr className="w-full pb-10 mt-10" />
      <div className=" rounded-lg p-4 mt-4 mb-4 flex-grow overflow-auto -webkit-overflow-scrolling-touch">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Monthly Check-Ins
          </h2>
        </div>
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
