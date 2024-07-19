import React, { useContext, useEffect, useRef, useState } from 'react';
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

const MentorProfile: React.FC = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { handleLoginModalOpen } = useLoginModalContext();
  const { user, isUserMentor, pendingMenteeApplication } = useContext(UserContext) as UserContextType;
  const [isURLCopied, setIsURLCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareUrl = `${window.location.origin}${location.pathname}`;

  const onApply = () => {
    if (user) {
      navigate(`/mentee-application/${mentorId as string}`);
    } else {
      handleLoginModalOpen();
    }
  };

  const { data: mentor } = useMentor(mentorId as string);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setIsURLCopied(true);
      })
      .catch(() => { });
  };

  const handleMouseEnter = () => {
    if (pendingMenteeApplication) {
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
                <>
                  <div className="relative inline-block" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>

                    <button
                      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                        ${pendingMenteeApplication
                          ? 'bg-gray-400'
                          : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
                        }`}
                      onClick={onApply}
                      disabled={pendingMenteeApplication}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      Apply
                    </button>
                    {showTooltip && pendingMenteeApplication && (
                      <>
                        <div className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap -top-12 left-[-90%] transform -translate-x-1/2 transition-opacity duration-300 opacity-100 max-w-xs overflow-hidden text-ellipsis">
                          You can apply only for one mentor at a time
                        </div>
                        <div className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900 -top-3 left-1/2 transform -translate-x-1/2"></div>
                      </>
                    )}
                  </div>
                </>
              )}
              <span className="text-red-400">
                {!mentor?.availability && 'Mentor is not currently available'}
              </span>
            </div>
          </div>
          <hr className="w-full mt-5" />
        </div>
      </div>
      <div className="md:flex flex-row h-1/3 py-4 md:py-9">
        <div className="grid md:grid-cols-3 md:gap-9 md:w-3/4">
          <div>
            <h2 className="text-lg font-medium mt-5">Category</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.category.category}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-medium  mt-5">Expertise</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.application.expertise}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-medium  mt-5">Country</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.application.country}</li>
            </ul>
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
