import React from 'react';
import useMentor from '../../hooks/useMentor';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserIcon from '../../assets/svg/Icons/UserIcon';

const MentorProfile: React.FC = () => {
  const { mentorId } = useParams();
  const { data: mentor } = useMentor(mentorId);
  return (
    <>
      <div className="flex items-center gap-4 w-full">
        <div className="w-1/3 md:w-28">
          {mentor?.profile.image_url !== '' ? (
            <img
              src={mentor?.profile.image_url}
              alt="Mentor Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserIcon />
            </div>
          )}
        </div>
        <div className="w-3/5 md:w-full">
          <h1 className="text-lg md:text-3xl font-semibold mb-2">
            {mentor?.application.firstName} {mentor?.application.lastName}
          </h1>
          <div className="flex flex-row place-content-between w-full">
            <p className="text-sm ">
              {mentor?.application.position},{' '}
              <span className="text-gray-500">
                {mentor?.application.institution}
              </span>
            </p>
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              to={`/mentee-application/${mentorId as string}`}
            >
              Apply
            </Link>
          </div>
          <hr className="w-full" />
        </div>
      </div>
      <div className="md:flex flex-row h-1/3 py-9">
        <div className="grid md:grid-cols-4 md:gap-9 md:w-2/3">
          <div>
            <h2 className="text-lg font-medium  mt-5">Category</h2>
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
          <a href="#" className="text-blue-500 underline">
            Linkedin
          </a>
          <a href="#" className="text-blue-500 underline">
            Website
          </a>
        </div>
      </div>
      <div className="pb-9">
        <h2 className="text-lg font-medium ">Mentoring Philosophy</h2>
        <p className="font-light">{mentor?.application.mentoringPhilosophy}</p>
      </div>
      <div className="pb-9">
        <h2 className="text-lg font-medium ">Mentee Expectations</h2>
        <p className="font-light">{mentor?.application.menteeExpectations}</p>
      </div>
      <div className="pb-9">
        <h2 className="text-lg font-medium ">Bio</h2>
        <p className="font-light">{mentor?.application.bio}</p>
      </div>
    </>
  );
};

export default MentorProfile;
