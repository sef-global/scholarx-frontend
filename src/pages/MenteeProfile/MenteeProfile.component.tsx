import React from 'react';
import { Link, useParams } from 'react-router-dom';

import useMentee from '../../hooks/useMentee';
import { getStateColor } from '../../utils';
import ProfilePic from '../../components/ProfilePic';
import ChevronRightIcon from '../../assets/svg/Icons/ChevronRightIcon';

const MenteeProfile: React.FC = () => {
  const { menteeId } = useParams();
  const { data: mentee } = useMentee(menteeId);

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
            <Link
              to={`/mentors/${mentee?.mentor.uuid ?? ''}`}
              className="block transition hover:text-gray-700"
            >
              <span className="block transition">
                {mentee?.mentor?.profile?.first_name}{' '}
                {mentee?.mentor?.profile?.last_name}
              </span>
            </Link>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <span className="block transition">Mentees</span>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <span className="block transition">
              {mentee?.application.firstName} {mentee?.application.lastName}
            </span>
          </li>
        </ol>
      </nav>
      <div className="w-full space-y-5">
        <div className="md:flex items-center">
          <div className="flex mt-10">
            <div className="mx-auto mb-4">
              <ProfilePic
                src={
                  mentee?.profile?.image_url ?? mentee?.application?.profilePic
                }
                alt="Mentee Avatar"
                size="7rem"
              />
            </div>
            <div className="ml-5">
              <div className="flex items-center space-x-3 mb-1">
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
        <hr className="w-full pb-10" />
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
                    <h3 className="text-base font-semibold">Graduated year</h3>
                    <p>{mentee?.application.graduatedYear}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
