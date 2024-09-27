import React from 'react';
import { getStateColor } from '../../utils';
import ProfilePic from '../ProfilePic';
import { useParams } from 'react-router-dom';
import useMentee from '../../hooks/admin/useMentee';
import Toast from '../Toast';
import { ApplicationStatus } from '../../enums';
import ActionButtons from '../ActionButtons';

const MenteeApplication: React.FC = () => {
  const { menteeId } = useParams();
  const {
    isLoading,
    data: mentee,
    changeState,
    isSuccess,
    isError,
  } = useMentee(menteeId);
  const handleStateChange = async (newState: string) => {
    await changeState(newState);
  };

  return (
    <>
      {isSuccess && (
        <Toast message={'Status updated successfully'} type={'success'} />
      )}
      {isError && (
        <Toast message={'Oops something went wrong'} type={'error'} />
      )}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <ProfilePic
              src={mentee?.profile.image_url}
              alt="Mentee Avatar"
              size="6rem"
            />
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
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
                      by {mentee?.status_updated_by} on{' '}
                      {new Date(mentee?.status_updated_date).toDateString()}
                    </span>
                  )}
              </div>
              <span className="text-lg font-light">
                {mentee?.application.isUndergrad ? (
                  <>{mentee?.application.university}</>
                ) : (
                  <>
                    {mentee?.application.position},{' '}
                    {mentee?.application.company}
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="ml-auto flex overflow-hidden">
            <ActionButtons
              state={mentee?.state}
              handleApprove={async () => {
                await handleStateChange(ApplicationStatus.APPROVED);
              }}
              handleReject={async () => {
                await handleStateChange(ApplicationStatus.REJECTED);
              }}
              handleComplete={async () => {
                await handleStateChange(ApplicationStatus.COMPLETED);
              }}
            />
          </div>
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold">Course</h3>
                  <p>{mentee?.application.course}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">University</h3>
                  <p>{mentee?.application.university}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    {mentee?.application.isUndergrad === true
                      ? 'Year of Study'
                      : 'Graduated Year'}
                  </h3>
                  <p>
                    {mentee?.application.isUndergrad === true
                      ? mentee?.application.yearOfStudy
                      : mentee?.application.graduatedYear}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
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
              <div className="mb-4">
                <h3 className="text-base font-bold">Submission</h3>
                <a
                  href={mentee?.application.submission}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Click here to view
                </a>
              </div>
            </div>
            <div className="col-span-3">
              <div className="mb-4">
                <h3 className="text-base font-bold">Applied Mentor</h3>
                {/* TODO: Make this a spearate component */}
                <div className="rounded-xl border-2 mt-2 border-gray-100 bg-white flex items-start gap-4 p-4">
                  <img
                    src={mentee?.mentor.profile.image_url}
                    className="w-14 h-14 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h3 className="font-medium sm:text-lg">
                      <a
                        href="#"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {mentee?.mentor.application.firstName}{' '}
                        {mentee?.mentor.application.lastName}
                      </a>
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-700">
                      {mentee?.mentor.application.position},{' '}
                      {mentee?.mentor.application.institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenteeApplication;
