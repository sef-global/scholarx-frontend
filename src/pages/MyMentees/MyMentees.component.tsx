import type React from 'react';
import { useMentees } from '../../hooks/useMentees';
import { Link, Route, Routes } from 'react-router-dom';
import MenteeProfile from '../../components/MenteeProfile';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const MyMentees: React.FC = () => {
  const { data: menteeApplications } = useMentees();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:w-1/5 p-4 bg-blue-50 md:block">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mentee Applications</h2>
        </div>
        <h3 className="text-sm font-bold mb-4">
          {menteeApplications?.length} Application(s)
        </h3>
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {menteeApplications?.map((mentee) => (
            <Link
              key={mentee?.uuid}
              className="bg-white border-sky-100 rounded border p-2 text-black flex items-center cursor-pointer"
              to={`/mentor/my-mentees/${mentee?.uuid}`}
            >
              <div className="flex items-center">
                <div>
                  {mentee.profile.image_url !== '' ? (
                    <img
                      src={mentee.profile.image_url}
                      alt="Mentee Avatar"
                      className="w-12 h-12 rounded-full mx-auto mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mr-3 flex items-center justify-center">
                      <UserIcon />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold mb-1">
                    {mentee.application.firstName} {mentee.application.lastName}
                  </p>
                  {mentee.application.isUndergrad ? (
                    <p className="text-sm mb-2">
                      {mentee.application.university}
                    </p>
                  ) : (
                    <p className="text-sm mb-2">
                      {mentee.application.position}
                      {', '}
                      {mentee.application.company}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5 p-4 bg-gray-50">
        <div className="flex items-center mb-5 md:mb-10 md:pb-7 justify-between">
          <Link to={'/mentor/dashboard'} className="flex items-center">
            <span className="text-xl md:text-3xl">&#8592;</span>
            <button className="text-md md:text-xl font-semibold mr-2  bg-transparent px-3 py-1 rounded-md mt-1">
              Back
            </button>
          </Link>
        </div>
        <Routes>
          <Route path={'/:menteeId'} element={<MenteeProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyMentees;
