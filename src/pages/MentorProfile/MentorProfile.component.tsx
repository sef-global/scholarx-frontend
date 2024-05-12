import React from 'react';
import useMentor from '../../hooks/useMentor';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const MentorProfile: React.FC = () => {
  const { mentorId } = useParams();
  const { data: mentor } = useMentor(mentorId);
  return (
    <div className="w-screen px-16">
      <div className="flex flex-row gap-2">
        <img
          src="https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png"
          alt="find-mentor"
          className="w-36 h-36 rounded-full object-cover my-auto"
        />
        <div className="w-full h-1/2 mt-20">
          <h1 className="text-3xl font-extrabold font-sans mb-2 tracking-wider">
            {mentor?.application.firstName} {mentor?.application.lastName}
          </h1>
          <div className="flex flex-row place-content-between w-full">
            <p className="text-sm font-sans">
              {mentor?.application.position},{' '}
              <span className="text-gray-500">
                {mentor?.application.institution}
              </span>
            </p>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white px-12 rounded text-lg font-medium mb-3"
              to={`/mentee-application/${mentorId as string}`}
            >
              Apply
            </Link>
          </div>
          <hr className="w-full" />
        </div>
      </div>
      <div className="flex flex-row h-1/3 py-9">
        <div className="grid grid-cols-4 gap-9 w-2/3">
          <div>
            <h2 className="text-xl font-semibold font-sans mt-5">Category</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.category.category}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold font-sans mt-5">Expertise</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.application.expertise}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold font-sans mt-5">Country</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>{mentor?.application.country}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-9 m-5">
          <span className="w-0.5 h-24 bg-gray-300"></span>
          <a href="#" className="text-blue-500 underline">
            Linkedin
          </a>
          <a href="#" className="text-blue-500 underline">
            Website
          </a>
        </div>
      </div>
      <div className="pb-9">
        <h2 className="text-xl font-semibold">Mentoring Philosophy</h2>
        <p className="font-light">{mentor?.application.mentoringPhilosophy}</p>
      </div>
      <div className="pb-9">
        <h2 className="text-xl font-semibold">Mentee Expectations</h2>
        <p className="font-light">{mentor?.application.menteeExpectations}</p>
      </div>
      <div className="pb-9">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="font-light">{mentor?.application.bio}</p>
      </div>
    </div>
  );
};

export default MentorProfile;
