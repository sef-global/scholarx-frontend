import React from 'react';
import useMentor from '../../hooks/useMentor';
import { useNavigate, useParams } from 'react-router';

const MentorProfileView: React.FC = () => {
  const { mentorId } = useParams();
  const { data: mentor } = useMentor(mentorId);
  const navigate = useNavigate();

  const apply = () => {
    if (mentorId != null) navigate(`/mentee-application/${mentorId}`);
  };

  return (
    <div className="w-screen px-16">
      {/* Bio Section */}
      <div className="flex flex-row gap-2 ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Andrew_Tate_on_%27Anything_Goes_With_James_English%27_in_2021.jpg"
          alt="find-mentor"
          className="w-36 h-36 rounded-full object-cover my-auto"
        />
        <div className="w-full h-1/2 mt-20">
          <h1 className="text-5xl font-extrabold font-sans mb-2 tracking-wider">
            {mentor?.application.firstName} {mentor?.application.lastName}
          </h1>
          <div className="flex flex-row place-content-between w-full">
            <p className="text-sm font-sans">
              {mentor?.application.position},{' '}
              <span className="text-gray-500">
                {mentor?.application.institution}
              </span>
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-12 rounded text-lg font-medium mb-3"
              onClick={apply}
            >
              Apply
            </button>
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
            <h2 className="text-xl font-semibold font-sans mt-5">
              Fields Of interests
            </h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>Machine Learning</li>
              <li>Big Data</li>
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
            Google scholar
          </a>
          <a href="#" className="text-blue-500 underline">
            Website
          </a>
        </div>
      </div>
      <div className="pb-9 ">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="font-light">{mentor?.application.bio}</p>
      </div>
    </div>
  );
};

export default MentorProfileView;
