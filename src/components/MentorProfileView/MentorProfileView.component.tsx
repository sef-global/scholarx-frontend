import React from 'react';

const MentorProfileView: React.FC = () => {
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
            John Doe
          </h1>
          <div className="flex flex-row place-content-between w-full">
            <p className="text-sm font-sans">
              Software Engineer, <span className="text-gray-500">Google</span>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-12 rounded text-lg font-medium mb-3">
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
              <li>Computer Science</li>
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
            <h2 className="text-xl font-semibold font-sans mt-5">Projects</h2>
            <ul className="text-sm list-disc ml-4 font-light">
              <li>Lorem ipsum</li>
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
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default MentorProfileView;
