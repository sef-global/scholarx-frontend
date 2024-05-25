import React, { useState } from 'react';
import { useMentees } from '../../hooks/useMentees';
import { type Mentee } from '../../types';
import { Link } from 'react-router-dom';
import MenteeProfile from '../../components/MenteeProfile';

const MyMentees: React.FC = () => {
  const { data: menteeApplications } = useMentees();
  const [selectedMentee, setSelectedApplication] = useState<Mentee | null>(
    menteeApplications[0] ?? null
  );

  const handleApplicationClick = (applicant: Mentee): void => {
    setSelectedApplication(applicant);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:w-1/5 p-4 border-r border-sky-100 bg-blue-50 md:block">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Mentee Applications</h2>
        </div>
        <h3 className="text-sm font-bold mb-4">
          {menteeApplications?.length} Application(s)
        </h3>
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {menteeApplications?.map((applicant) => (
            <div
              key={applicant?.uuid}
              className="bg-white border-sky-100 rounded border p-2 text-black flex items-center cursor-pointer"
              onClick={() => {
                handleApplicationClick(applicant);
              }}
            >
              <div>
                <p className="font-semibold mb-1">
                  {applicant.application.firstName}{' '}
                  {applicant.application.lastName}
                </p>
                {applicant.application.isUndergrad ? (
                  <p className="text-sm mb-2">
                    {applicant.application.university}
                  </p>
                ) : (
                  <p className="text-sm mb-2">
                    {applicant.application.position}
                    {', '}
                    {applicant.application.company}
                  </p>
                )}
              </div>
            </div>
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
        {selectedMentee != null ? (
          <MenteeProfile mentee={selectedMentee} />
        ) : (
          <div className="text-lg font-semibold text-gray-600">
            Select an application to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMentees;
