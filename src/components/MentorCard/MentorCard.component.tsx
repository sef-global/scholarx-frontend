import React from 'react';
import { type Mentor } from '../../types.ts';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/index.tsx';
import { ApplicationStatus } from '../../enums';
import BusinessBag from '../../assets/svg/BusinessBag.tsx';

interface MentorCardProps {
  mentor: Mentor;
  variant?: 'default' | 'profile';
}

const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  variant = 'default',
}) => {
  if (variant === 'profile') {
    return (
      <Link
        className="border border-gray-200 p-2 rounded-md shadow-sm flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200"
        to={`/mentors/${mentor.uuid}`}
      >
        <div className="relative">
          <ProfilePic
            src={mentor.profile.image_url}
            alt="Mentor Avatar"
            size="2.5rem"
            availability={mentor.availability}
          />
          {!mentor.availability && (
            <div className="absolute -top-1 -right-1 bg-white bg-opacity-75 text-gray-600 px-1 rounded-full text-xs">
              ⏳
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h5 className="text-sm font-semibold text-slate-600 truncate">
            {mentor.application.firstName} {mentor.application.lastName}
          </h5>
          <p className="text-xs text-gray-500 truncate">
            {mentor.application.position}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {mentor.application.institution}
          </p>
        </div>
      </Link>
    );
  }

  const approvedMenteesCount = mentor?.mentees
    ? mentor.mentees.filter(
        (mentee) => mentee.state === ApplicationStatus.APPROVED
      ).length
    : 0;

  const availableSlots = mentor?.application?.noOfMentees
    ? Math.max(0, mentor.application.noOfMentees - approvedMenteesCount)
    : 0;

  const totalApplications = mentor?.mentees?.length ?? 0;

  return (
    <Link
      className="p-2.5 rounded-md shadow-md max-w-full flex flex-col h-full relative outline outline-2 outline-bd-gray"
      to={`/mentors/${mentor.uuid}`}
    >
      <div className="flex flex-col items-center">
        <ProfilePic
          src={mentor.profile?.image_url}
          alt="Mentee Avatar"
          size="11.6875rem"
          width="17.5rem"
          circular={false}
          availability={mentor.availability}
        />
      </div>
      {!mentor.availability && (
        <div className="absolute top-0 left-0 bg-white bg-opacity-75 text-gray-600 px-2 py-1 rounded-md">
          <span className="text-xs font-semibold">Unavailable</span>
        </div>
      )}
      <div className="text-left p-0.5 flex-1 font-sf-pro ">
        <h5 className="text-lg font-bold text-black-600 text-wrap pb-1">
          {mentor.application?.firstName} {mentor.application?.lastName}
        </h5>
        <p className="text-sm text-gray-500 flex items-center p-0">
        <span className="self-start"> 
      <BusinessBag />
    </span>
          <span className="align-top leading-snug " style={{ marginTop: '-0.15em' }}>
            {mentor.application?.position} | {mentor.application?.institution}
          </span>
        </p>
      </div>
      <hr className="my-4 border-gray-300" />

      <div className="flex justify-between text-left font-sf-pro">
        <div className="text-[10px]">
          <p className="text-gray-500">Available Mentee Slots</p>
          <p className="text-xs font-bold text-[12px]">
            {mentor?.application?.noOfMentees && mentor.mentees
              ? availableSlots
              : 0}
          </p>
        </div>
        <div className="text-[10px]">
          <p className="text-gray-500">Applications Received</p>
          <p className="text-xs font-bold text-[12px]">
            {mentor?.mentees &&
            mentor.mentees.some(
              (mentee) => mentee.state === ApplicationStatus.APPROVED
            )
              ? totalApplications
              : 0}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
