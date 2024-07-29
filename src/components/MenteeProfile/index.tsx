import React from 'react';
import { useParams } from 'react-router-dom';

import UserIcon from '../../assets/svg/Icons/UserIcon';
import { ApplicationStatus } from '../../enums';
import useMentee from '../../hooks/useMentee';
import { useMentees } from '../../hooks/useMentees';
import { getStateColor } from '../../utils';
import Toast from '../Toast';
import ActionButtons from '../ActionButtons';

const MenteeProfile: React.FC = () => {
  const { menteeId } = useParams();
  const { data: mentee } = useMentee(menteeId);
  const { updateMenteeStatus, isSuccess, isError } = useMentees();

  const handleStateUpdate = async (state: ApplicationStatus) => {
    if (mentee != null) {
      await updateMenteeStatus({ menteeId: mentee.uuid, state });
    }
  };

  return (
    <>
      {isSuccess && (
        <Toast message={'Status updated successfully'} type={'success'} />
      )}
      {isError && (
        <Toast message={'Oops something went wrong'} type={'error'} />
      )}
      <div className="w-full space-y-5">
        <div className="md:flex items-center">
          <div className="flex">
            {mentee?.profile.image_url !== '' ? (
              <img
                src={mentee?.profile.image_url}
                alt="Mentee Avatar"
                className="w-12 h-12 md:w-24 md:h-24 rounded-full mx-auto mb-4 object-cover"
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
                {mentee?.state !== ApplicationStatus.PENDING &&
                  mentee?.status_updated_date && (
                    <span>
                      {mentee?.status_updated_by === 'admin'
                        ? 'by ScholarX team'
                        : ''}{' '}
                      on {new Date(mentee?.status_updated_date).toDateString()}
                    </span>
                  )}
              </div>
              {mentee?.application.isUndergrad ? (
                <span className="text-xl font-light">
                  {mentee?.application.university}
                </span>
              ) : (
                <span className="text-md md:text-xl font-light">
                  {mentee?.application.position}, {mentee?.application.company}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="ml-auto flex overflow-hidden mt-4 md:mt-0">
          <ActionButtons
            state={mentee?.state}
            handleApprove={async () => {
              await handleStateUpdate(ApplicationStatus.APPROVED);
            }}
            handleReject={async () => {
              await handleStateUpdate(ApplicationStatus.REJECTED);
            }}
          />
        </div>
        <div className="md:hidden">
          <a
            href={mentee?.application.email}
            target="_blank"
            rel="noreferrer"
            className="underline mb-2"
          >
            {mentee?.application.email}
          </a>
          <br />
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
              {mentee?.application.isUndergrad ? (
                <>
                  <div>
                    <h3 className="text-base font-semibold">Year of Study</h3>
                    <p>{mentee?.application.yearOfStudy}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Course</h3>
                    <p>{mentee?.application.course}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">University</h3>
                    <p>{mentee?.application.university}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Contact No</h3>
                    <p>{mentee?.application.contactNo}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-base font-semibold">Company</h3>
                    <p>{mentee?.application.company}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Position</h3>
                    <p>{mentee?.application.position}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Contact No</h3>
                    <p>{mentee?.application.contactNo}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Graduated year</h3>
                    <p>{mentee?.application.graduatedYear}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-2 pl-8 border-l">
            <div className="hidden md:grid gap-1">
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
                Click here to view
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
