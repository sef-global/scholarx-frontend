import React, { useState } from 'react';
import { useMentees } from '../../hooks/useMentees';
import { type Mentee } from '../../types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../constants';
import { ApplicationStatus } from '../../enums';

const MyMentees: React.FC = () => {
  const { data: menteeApplications } = useMentees();
  const [selectedMentee, setSelectedApplication] = useState<Mentee | null>(
    null
  );

  const handleApplicationClick = (applicant: Mentee): void => {
    setSelectedApplication(applicant);
  };

  const handleBack = (): void => {
    setSelectedApplication(null);
  };

  const updateMenteeStatus = useMutation({
    mutationFn: async ({
      menteeId,
      state,
    }: {
      menteeId: string;
      state: ApplicationStatus;
    }) => {
      await axios.put(
        `${API_URL}/mentees/${menteeId}/status`,
        {
          state,
        },
        { withCredentials: true }
      );
    },
  });

  const handleStateUpdate = (state: ApplicationStatus) => {
    if (selectedMentee !== null) {
      updateMenteeStatus.mutate({ menteeId: selectedMentee.uuid, state });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/5 p-4 border-r border-sky-100 bg-blue-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Mentee Applications</h2>
        </div>
        <h3 className="text-sm font-bold mb-4">
          {menteeApplications?.length} Applications
        </h3>
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {menteeApplications?.map((applicant) => (
            <div
              key={applicant?.uuid}
              className="bg-white border-sky-100 rounded-md border p-1 text-black flex items-center cursor-pointer"
              onClick={() => {
                handleApplicationClick(applicant);
              }}
            >
              <div>
                <p className="font-bold mt-2 mb-1">
                  {applicant.application.firstName}{' '}
                  {applicant.application.lastName}
                </p>
                <p className="text-sm mb-2">{applicant.application.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5 p-4 bg-gray-50">
        <div className="flex items-center mb-10 pb-7 justify-between">
          <div className="flex items-center">
            <span className="text-3xl">&#8592;</span>
            <button
              onClick={handleBack}
              className="text-xl font-semibold mr-2  bg-transparent px-3 py-1 rounded-md mt-1"
            >
              Back
            </button>
          </div>
        </div>
        {selectedMentee != null ? (
          <div>
            <div className="flex flex-col md:flex-row items-center md:items-start md:mb-4">
              <div className="flex-grow">
                <p className="font-bold mt-2 mb-1 text-center md:text-left">
                  {selectedMentee.application.firstName}{' '}
                  {selectedMentee.application.lastName}
                </p>
                <p className="text-sm mb-2 text-center md:text-left">
                  {selectedMentee.application.company}
                </p>
              </div>
              <button className="border border-gray-400 rounded-full px-4 py-2 md:ml-auto ml-0">
                Pending
              </button>
            </div>
            {/* Additional details */}
            <div className="flex flex-col md:flex-row mt-10 md:mt-0">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <div className="flex justify-between mb-4">
                  <div className="mr-5">
                    <p className="font-bold">Course:</p>
                    <p>{selectedMentee.application.course}</p>
                  </div>
                  <div className="ml-5">
                    <p className="font-bold text-right">Year</p>
                    <p className="text-right">
                      {selectedMentee.application.yearOfStudy}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="mr-5">
                    <p className="font-bold">Company</p>
                    <p>{selectedMentee.application.company}</p>
                  </div>
                  <div className="ml-5">
                    <p className="font-bold text-right">Position</p>
                    <p className="text-right">
                      {selectedMentee.application.position}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l border-gray-300 md:mx-6"></div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mb-4">
                  <div className="mt-8 mb-10">
                    <p className="font-bold">Resume</p>
                    <p className="overflow-auto max-w-xs">
                      {selectedMentee.application.cv}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-bold">Email</p>
                    <p>{selectedMentee.application.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pb-10">
              <h3 className="font-bold text-lg">Video Submission</h3>
              <p className="mt-2 pb-10">
                {selectedMentee.application.submission}
              </p>
            </div>
            <div className="flex justify-end mt-10 pt-10 mr-5 pb-10">
              <button
                className="bg-blue-700 text-white px-9 py-1 mr-2 rounded-full"
                onClick={() => {
                  handleStateUpdate(ApplicationStatus.APPROVED);
                }}
              >
                {updateMenteeStatus.isPending ? 'Loading' : 'Accept'}
              </button>
              <button
                className="bg-red-600 text-white px-9 py-1 rounded-full"
                onClick={() => {
                  handleStateUpdate(ApplicationStatus.REJECTED);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="text-lg font-bold text-gray-600">
            Select an application to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMentees;
