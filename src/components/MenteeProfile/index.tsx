import React from 'react';
import { ApplicationStatus } from '../../enums';
import { useMentees } from '../../hooks/useMentees';
import UserIcon from '../../assets/svg/Icons/UserIcon';
import { getStateColor } from '../../utils';
import { useParams } from 'react-router-dom';
import useMentee from '../../hooks/useMentee';

const MenteeProfile: React.FC = () => {
  const { menteeId } = useParams();
  const { data: mentee } = useMentee(menteeId);
  const { isLoading, updateMenteeStatus } = useMentees();

  const handleStateUpdate = (state: ApplicationStatus) => {
    if (mentee != null) {
      updateMenteeStatus({ menteeId: mentee.uuid, state });
    }
  };

  return (
    <>
      <div className="w-full space-y-8">
        <div className="md:flex items-center">
          <div className="flex">
            {mentee?.profile.image_url !== '' ? (
              <img
                src={mentee?.profile.image_url}
                alt="Mentee Avatar"
                className="w-12 h-12 md:w-24 md:h-24 rounded-full mx-auto mb-4"
              />
            ) : (
              <div className="w-12 h-12 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
            )}
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-lg md:text-2xl font-semibold">
                  {mentee?.application.firstName} {mentee?.application.lastName}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getStateColor(
                    mentee?.state
                  )}`}
                >
                  {mentee?.state}
                </span>
              </div>
              {mentee?.application.isUndergrad ? (
                <span className="text-xl font-light">
                  {mentee?.application.yearOfStudy},{' '}
                  {mentee?.application.university}
                </span>
              ) : (
                <span className="text-md md:text-xl font-light">
                  {mentee?.application.position}, {mentee?.application.company}
                </span>
              )}
            </div>
          </div>
          <div className="ml-auto flex overflow-hidden mt-5 md:mt-0">
            <button
              className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
              onClick={() => {
                handleStateUpdate(ApplicationStatus.APPROVED);
              }}
            >
              {isLoading ? 'Loading...' : 'Approve'}
            </button>
            <button
              className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
              onClick={() => {
                handleStateUpdate(ApplicationStatus.REJECTED);
              }}
            >
              Reject
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 md:hidden">
          <a
            href={mentee?.application.email}
            target="_blank"
            rel="noreferrer"
            className="underline mb-2"
          >
            {mentee?.application.email}
          </a>
          <a
            href={mentee?.application.cv}
            target="_blank"
            rel="noreferrer"
            className="underline mb-2"
          >
            CV
          </a>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12">
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-semibold">Course</h3>
                <p>{mentee?.application.course}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold">Graduated Year</h3>
                <p>{mentee?.application.graduatedYear}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold">Contact No</h3>
                <p>{mentee?.application.contactNo}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold">Undergraduate</h3>
                <p>{mentee?.application.isUndergrad ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 pl-8 border-l">
            <div className="hidden md:grid grid-cols-2 gap-1">
              <a
                href={mentee?.application.email}
                target="_blank"
                rel="noreferrer"
                className="underline mb-2"
              >
                {mentee?.application.email}
              </a>
              <a
                href={mentee?.application.cv}
                target="_blank"
                rel="noreferrer"
                className="underline mb-2"
              >
                CV
              </a>
            </div>
          </div>
          <div className="col-span-5">
            <div className="mb-4 mt-8 md:mt-0">
              <h3 className="text-base font-semibold">Video Submission</h3>
              <a
                href={mentee?.application.submission}
                target="_blank"
                rel="noreferrer"
                className="underline mb-2"
              >
                Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
