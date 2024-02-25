import React, { useState } from 'react';

// Define the interface for an Applicant
interface Applicant {
  id: number;
  name: string;
  university: string;
  profilePicture: string; // Provide a URL or any source for the profile picture
  course: string;
  year: string;
  Lorem1: string;
  Lorem2: string;
  linkedin: string;
  resumeUrl: string;
  website: string;
  intention: string;
  reasonForChoice: string;
}

// Define the interface for the props of the MyMentees component
interface MenteeApplicationsProps {
  menteeApplications: Applicant[];
}

const MyMentees: React.FC<MenteeApplicationsProps> = ({
  menteeApplications,
}) => {
  // Initialize state to store the selected application, defaulting to the first application in the array
  const [selectedApplication, setSelectedApplication] =
    useState<Applicant | null>(
      menteeApplications.length > 0 ? menteeApplications[0] : null
    );

  // Function to handle click on an application
  const handleApplicationClick = (applicant: Applicant): void => {
    setSelectedApplication(applicant);
  };

  // Function to handle click on the back button
  const handleBack = (): void => {
    setSelectedApplication(null);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side panel showing list of applications */}
      <div className="w-full md:w-1/4 p-4 border-r border-sky-200 bg-blue-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Mentee Applications</h2>
        </div>
        {/* Display the number of applications */}
        <h3 className="text-sm font-bold mb-4">
          {menteeApplications.length} Applications
        </h3>
        {/* Render the list of applications */}
        <div className="h-96 overflow-y-auto md:overflow-y-visible">
          {menteeApplications.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white border-sky-100 rounded-md border p-1 text-black flex items-center cursor-pointer"
              onClick={() => {
                handleApplicationClick(applicant);
              }}
            >
              <img
                src={applicant.profilePicture}
                className="w-16 h-16 object-cover mb-1 mt-1 rounded-full mr-4 ml-4 bg-gray-300"
                alt={applicant.name}
              />
              <div>
                <p className="font-bold mt-2 mb-1">{applicant.name}</p>
                <p className="text-sm mb-2">{applicant.university}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side panel showing details of selected application */}
      <div className="w-full md:w-3/4 p-4 bg-gray-50">
        {/* Header section with back button */}
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
        {/* Render details of the selected application */}
        {selectedApplication != null ? (
          <div>
            {/* Applicant details */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:mb-4">
              <img
                src={selectedApplication.profilePicture}
                className="w-16 h-16 object-cover rounded-full bg-gray-200 md:mr-6 md:mb-0 mb-4"
                alt={selectedApplication.name}
              />
              <div className="flex-grow">
                <p className="font-bold mt-2 mb-1 text-center md:text-left">
                  {selectedApplication.name}
                </p>
                <p className="text-sm mb-2 text-center md:text-left">
                  {selectedApplication.university}
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
                    <p>{selectedApplication.course}</p>
                  </div>
                  <div className="ml-5">
                    <p className="font-bold text-right">Year</p>
                    <p className="text-right">{selectedApplication.year}</p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="mr-5">
                    <p className="font-bold">Lorem Ipsum1</p>
                    <p>{selectedApplication.Lorem1}</p>
                  </div>
                  <div className="ml-5">
                    <p className="font-bold text-right">Lorem Ipsum2</p>
                    <p className="text-right">{selectedApplication.Lorem2}</p>
                  </div>
                </div>
              </div>
              <div className="border-l border-gray-300 md:mx-6"></div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mb-4">
                  <div>
                    <p className="font-bold">Linkedin</p>
                    <p>{selectedApplication.linkedin}</p>
                  </div>
                  <div className="mt-8 mb-10">
                    <p className="font-bold">Resume</p>
                    {/* Display resume URL */}
                    <p className="overflow-auto max-w-xs">
                      {selectedApplication.resumeUrl}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-bold">Website</p>
                    <p>{selectedApplication.website}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Intention and reason for choice */}
            <div className="mt-8 mb-10">
              <h3 className="font-bold text-lg">Intention</h3>
              <p className="mt-1">{selectedApplication.intention}</p>
            </div>
            <div className="mt-10 pb-10">
              <h3 className="font-bold text-lg">Reason for choice</h3>
              <p className="mt-2 pb-10">
                {selectedApplication.reasonForChoice}
              </p>
            </div>
            {/* Accept and reject buttons */}
            <div className="flex justify-end mt-10 pt-10 mr-5 pb-10">
              <button className="bg-blue-700 text-white px-9 py-1 mr-2 rounded-full">
                Accept
              </button>
              <button className="bg-red-600 text-white px-9 py-1 rounded-full">
                Reject
              </button>
            </div>
          </div>
        ) : (
          // If no application is selected, display a message
          <div className="text-lg font-bold text-gray-600">
            Select an application to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMentees;
