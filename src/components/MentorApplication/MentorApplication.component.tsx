import React from 'react';
import { type Mentor } from '../../types';

interface MentorApplicationProps {
  isLoading: boolean;
  mentor: Mentor | null | undefined;
  onStateChange: (newState: string) => void;
}

const MentorApplication: React.FC<MentorApplicationProps> = ({
  isLoading,
  mentor,
  onStateChange,
}) => {
  const handleStateChange = (newState: string) => {
    onStateChange(newState);
  };

  const getStateColor = (state: string | undefined) => {
    switch (state) {
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Skeleton</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <img
              src={mentor?.profile.image_url}
              alt=""
              className="w-28 rounded-full object-fill"
            />
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  {mentor?.application.firstName} {mentor?.application.lastName}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getStateColor(
                    mentor?.state
                  )}`}
                >
                  {mentor?.state}
                </span>
              </div>
              <span className="text-xl font-light">
                {mentor?.application.position},{' '}
                {mentor?.application.institution}
              </span>
            </div>
            <div className="ml-auto flex overflow-hidden">
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('approved');
                }}
              >
                Approve
              </button>
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('rejected');
                }}
              >
                Reject
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-12">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold">Category</h3>
                  <p>{mentor?.category.category}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Country</h3>
                  <p>{mentor?.application.country}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Expertise</h3>
                  <p>{mentor?.application.expertise}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Past Mentor</h3>
                  <p>
                    {mentor?.application.isPastMentor === true ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
                <a
                  href={mentor?.application.linkedin}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={mentor?.application.website}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  Website
                </a>
                <a
                  href={mentor?.application.cv}
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
                <h3 className="text-base font-bold">Mentee Expectations</h3>
                <p>{mentor?.application.menteeExpectations}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentoring Philosophy</h3>
                <p>{mentor?.application.mentoringPhilosophy}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Reason to Mentor</h3>
                <p>{mentor?.application.reasonToMentor}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Bio</h3>
                <p>{mentor?.application.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorApplication;
