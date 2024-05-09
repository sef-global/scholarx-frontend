import React from 'react';
import { type Mentor } from '../../types';

interface MentorApplicationProps {
  isLoading: boolean;
  mentor: Mentor;
  onAccept: (mentorUuid: string) => void;
}

const MentorApplication: React.FC<MentorApplicationProps> = ({
  isLoading,
  mentor,
  onAccept,
}) => {
  const handleAccept = () => {
    onAccept(mentor.uuid);
  };

  return (
    <>
      {isLoading ? (
        <div>Skeleton</div>
      ) : (
        <div className="space-y-8">
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
                className="inline-block rounded-l-full border-r px-10 py-2 my-2 ml-2 text-sm font-medium text-white bg-primary-blue focus:outline-none focus:ring"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="inline-block px-3 py-2 my-2 mr-2 rounded-r-full text-white bg-primary-blue focus:ring focus:outline-none"
                title="More"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
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
                <a href="#" className="underline mb-2">
                  LinkedIn
                </a>
                <a href="#" className="underline mb-2">
                  Website
                </a>
                <a href="#" className="underline mb-2">
                  Google Scholar
                </a>
                <a
                  href={mentor.application.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="underline mb-2"
                >
                  CV
                </a>
                <a href="#" className="underline mb-2">
                  ResearchGate
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
