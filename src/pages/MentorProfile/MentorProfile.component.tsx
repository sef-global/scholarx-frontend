import React, { useContext, useState } from 'react';
import useMentor from '../../hooks/useMentor';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginModalContext } from '../../contexts/LoginModalContext';
import { UserContext, type UserContextType } from '../../contexts/UserContext';
import Toast from '../../components/Toast';
import ShareIcon from '../../assets/svg/Icons/ShareIcon';
import ChevronRightIcon from '../../assets/svg/Icons/ChevronRightIcon';
import { ApplicationStatus } from '../../enums';
import Tooltip from '../../components/Tooltip';
import Loading from '../../assets/svg/Loading';
import MenteeCard from '../../components/MenteeCard';
import ProfilePic from '../../components/ProfilePic';
import InformationModal from '../../components/InformationModal';
import useModal from '../../hooks/useModal';
import useMentee from '../../hooks/useMentee';

const MentorProfile: React.FC = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const { handleLoginModalOpen } = useLoginModalContext();
  const { user, isUserMentor, isMenteeApplicationsDisabled, isUserMentee } =
    useContext(UserContext) as UserContextType;
  const [isURLCopied, setIsURLCopied] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const shareUrl = `${window.location.origin}${location.pathname}`;

  const onApply = () => {
    if (user) {
      navigate(`/mentee-application/${mentorId as string}`);
    } else {
      handleLoginModalOpen();
    }
  };

  const { data: mentor, isLoading } = useMentor(mentorId as string);
  const { revokeApplication } = useMentee();

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

  const approvedMenteesCount = mentor?.mentees
    ? mentor.mentees.filter(
        (mentee) => mentee.state === ApplicationStatus.APPROVED
      ).length
    : 0;

  const availableSlots = mentor?.application.noOfMentees
    ? Math.max(0, mentor.application.noOfMentees - approvedMenteesCount)
    : 0;

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

      <div className="flex flex-col md:flex-row flex-wrap items-center mt-6 md:mt-7 gap-4">
        <div className="flex flex-col md:flex-row items-center flex-grow gap-4 text-center md:text-left">
          <div className="flex-shrink-0">
            <ProfilePic
              src={mentor?.profile.image_url}
              alt="Mentor Avatar"
              size="6rem"
              availability={mentor?.availability}
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
              <h1 className="text-lg md:text-3xl font-semibold">
                {mentor?.application.firstName} {mentor?.application.lastName}
              </h1>
              <span onClick={copyToClipboard}>
                <ShareIcon />
              </span>
            </div>
            <p className="text-sm mb-0 md:mb-2 lg:mb-2">
              {mentor?.application.position},{' '}
              <span className="text-gray-500">
                {mentor?.application.institution}
              </span>
            </p>
            <p className="text-md flex flex-wrap items-center justify-center sm:justify-start">
              {mentor?.application.noOfMentees && mentor.mentees ? (
                <span
                  className={`inline-block text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0 mr-2 ${
                    availableSlots === 0
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {availableSlots} {availableSlots <= 1 ? 'Slot' : 'Slots'}{' '}
                  Available
                </span>
              ) : (
                'Not mentioned'
              )}
              {mentor?.mentees &&
                mentor?.mentees.some(
                  (mentee) => mentee.state === ApplicationStatus.APPROVED
                ) && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0">
                    {mentor.mentees.length} Applied
                  </span>
                )}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 md:mt-4 md:mt-0">
          {!isUserMentor && mentor?.availability && (
            <Tooltip
              isVisible={isUserMentee}
              content="You can apply only for one mentor at a time"
            >
              <button
                className={`text-white font-medium rounded-lg text-sm px-20 md:px-5 py-2.5
                            ${
                              isUserMentee
                                ? 'bg-gray-400'
                                : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                            }`}
                onClick={isMenteeApplicationsDisabled ? openModal : onApply}
              >
                {isMenteeApplicationsDisabled
                  ? 'Withdraw application'
                  : 'Apply'}
              </button>
            </Tooltip>
          )}
          {!mentor?.availability && (
            <span className="p-4 text-xs sm:text-sm text-yellow-800 rounded-lg bg-yellow-50">
              This mentor is not accepting new applications at the moment.
            </span>
          )}
        </div>
        <hr className="w-full mt-5" />
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
      {mentor?.mentees &&
        mentor?.mentees.some(
          (mentee) => mentee.state === ApplicationStatus.APPROVED
        ) && (
          <div className="pb-4">
            <div className="flex flex-wrap gap-2 items-baseline">
              <h2 className="text-lg font-medium mb-2 ">Mentees</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentor.mentees
                ?.filter(
                  (mentee) => mentee.state === ApplicationStatus.APPROVED
                )
                .map((mentee) => (
                  <MenteeCard
                    key={mentee?.uuid}
                    mentee={mentee}
                    showPublicProfile={true}
                  />
                ))}
            </div>
          </div>
        )}
      <InformationModal
        isOpen={isOpen}
        headline="Withdraw your current application"
        body={`Are you sure you want to withdraw your current application and apply for ${
          mentor?.application.firstName ?? ''
        } ${mentor?.application.lastName ?? ''}?`}
        onConfirm={revokeApplication}
        onClose={closeModal}
      />
    </>
  );
};

export default MentorProfile;
