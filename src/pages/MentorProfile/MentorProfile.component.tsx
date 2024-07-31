import React, { useContext, useState } from 'react';
import useMentor from '../../hooks/useMentor';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../../assets/svg/Icons/UserIcon';
import { useLoginModalContext } from '../../contexts/LoginModalContext';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import Toast from '../../components/Toast';
import ShareIcon from '../../assets/svg/Icons/ShareIcon';
import ChevronRightIcon from '../../assets/svg/Icons/ChevronRightIcon';
import { ApplicationStatus } from '../../enums';
import Tooltip from '../../components/Tooltip';
import Loading from '../../assets/svg/Loading';

const MentorProfile: React.FC = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { handleLoginModalOpen } = useLoginModalContext();
  const { user, isUserMentor, isMenteeApplicationsDisabled } = useContext(
    UserContext
  ) as UserContextType;
  const [isURLCopied, setIsURLCopied] = useState(false);
  const shareUrl = `${window.location.origin}${location.pathname}`;

  const onApply = () => {
    if (user) {
      navigate(`/mentee-application/${mentorId as string}`);
    } else {
      handleLoginModalOpen();
    }
  };

  const { data: mentor, isLoading } = useMentor(mentorId as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setIsURLCopied(true);
      })
      .catch(() => {});
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <Link
              to="/mentors"
              className="block transition hover:text-gray-700"
            >
              Mentors
            </Link>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <span className="block transition">
              {mentor?.application.firstName} {mentor?.application.lastName}
            </span>
          </li>
        </ol>
      </nav>
      {isURLCopied && (
        <Toast message={'Profile link copied successfully'} type={'success'} />
      )}

      <div className="flex items-center gap-4 w-full mt-4">
        <div className="w-16 md:w-28">
          {mentor?.profile.image_url !== '' ? (
            <img
              src={mentor?.profile.image_url}
              alt="Mentor Avatar"
              className="w-12 h-12 md:w-24 md:h-24 rounded-full mb-4 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-12 h-12 md:w-24 md:h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserIcon />
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex flex-row place-content-between w-full">
            <div>
              <div className="flex gap-4 items-center mb-2">
                <h1 className="text-lg md:text-3xl font-semibold">
                  {mentor?.application.firstName} {mentor?.application.lastName}
                </h1>
                <span onClick={copyToClipboard}>
                  <ShareIcon />
                </span>
              </div>

              <p className="text-sm ">
                {mentor?.application.position},{' '}
                <span className="text-gray-500">
                  {mentor?.application.institution}
                </span>
              </p>
            </div>
            <div className="self-center">
              {!isUserMentor && mentor?.availability && (
                <Tooltip
                  isVisible={isMenteeApplicationsDisabled}
                  content="You can apply only for one mentor at a time"
                >
                  <button
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                    ${
                      isMenteeApplicationsDisabled
                        ? 'bg-gray-400'
                        : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                    }`}
                    onClick={onApply}
                    disabled={isMenteeApplicationsDisabled}
                  >
                    Apply
                  </button>
                </Tooltip>
              )}
              {!mentor?.availability && (
                <span className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
                  This mentor is not accepting new applications at the moment.
                </span>
              )}
            </div>
          </div>
          <hr className="w-full mt-5" />
        </div>
      </div>
      <div className="md:flex flex-row h-1/3 py-4 md:py-9">
        <div className="grid md:grid-cols-3 md:gap-9 md:w-3/4">
          <div>
            <h2 className="text-lg font-medium mt-5">Category</h2>
            <p className="text-sm font-light">{mentor?.category.category}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium  mt-5">Expertise</h2>
            <p className="text-sm font-light">
              {mentor?.application.expertise}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium  mt-5">Country</h2>
            <p className="text-sm font-light">{mentor?.application.country}</p>
          </div>
        </div>
        <div className="flex flex-row md:gap-9 md:m-5 gap-4 mt-4">
          <span className="w-0.5 h-24 bg-gray-300 md:block hidden"></span>
          <a
            href={mentor?.application.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Linkedin
          </a>
          <a
            href={mentor?.application.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            Website
          </a>
        </div>
      </div>
      <div className="pb-4">
        <h2 className="text-lg font-medium ">Mentoring Philosophy</h2>
        <p className="font-light">{mentor?.application.mentoringPhilosophy}</p>
      </div>
      <div className="pb-4">
        <h2 className="text-lg font-medium ">Mentee Expectations</h2>
        <p className="font-light">{mentor?.application.menteeExpectations}</p>
      </div>
      <div className="pb-4">
        <h2 className="text-lg font-medium ">Bio</h2>
        <p className="font-light">{mentor?.application.bio}</p>
      </div>
      <div className="pb-4">
        <h2 className="text-lg font-medium ">Available mentee slots</h2>
        <p className="font-light">
          {mentor?.application.noOfMentees && mentor.mentees
            ? Math.max(
                0,
                mentor.application.noOfMentees -
                  mentor.mentees.filter(
                    (mentee) => mentee.state === ApplicationStatus.APPROVED
                  ).length
              )
            : 'Not mentioned'}
        </p>
      </div>
    </>
  );
};

export default MentorProfile;
