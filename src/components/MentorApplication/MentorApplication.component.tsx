import React from 'react';
import { type Mentor } from '../../types';

interface MentorApplicationProps {
  mentor: Mentor | undefined;
  onApprove: (mentorUuid: string) => void;
  onReject: (mentorUuid: string) => void;
}

const MentorApplication: React.FC<MentorApplicationProps> = ({
  mentor,
  onApprove,
  onReject,
}) => {
  const handleApprove = () => {
    if (mentor != null) {
      onApprove(mentor.uuid);
    }
  };

  const handleReject = () => {
    if (mentor != null) {
      onReject(mentor.uuid);
    }
  };

  return (
    <>
      {mentor == null ? (
        <div>Skeleton</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <img
              src={mentor.profile.image_url}
              alt=""
              className="w-28 rounded-full object-fill"
            />
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  {mentor.application.firstName} {mentor.application.lastName}
                </span>
                <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700">
                  Pending
                </span>
              </div>
              <span className="text-xl font-light">
                {mentor.application.position}, {mentor.application.institution}
              </span>
            </div>
            <div className="ml-auto flex overflow-hidden">
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
                onClick={handleReject}
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
                  <p>{mentor.category.category}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Country</h3>
                  <p>{mentor.application.country}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Expertise</h3>
                  <p>{mentor.application.expertise}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Past Mentor</h3>
                  <p>{mentor.application.isPastMentor ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
                <a
                  href={mentor.application.linkedin}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={mentor.application.website}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  Website
                </a>
                <a
                  href={mentor.application.cv}
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
                <p>{mentor.application.menteeExpectations}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentoring Philosophy</h3>
                <p>{mentor.application.mentoringPhilosophy}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Reason to Mentor</h3>
                <p>{mentor.application.reasonToMentor}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Bio</h3>
                <p>{mentor.application.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorApplication;
