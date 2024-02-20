import React from 'react';

const MentorProfileView: React.FC = () => {
  return (
    <div className="w-screen px-9">
      <div className="flex flex-row w- gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Andrew_Tate_on_%27Anything_Goes_With_James_English%27_in_2021.jpg"
          alt="find-mentor"
          className="w-36 h-36 rounded-full object-cover"
        />
        <div className="w-full h-1/2 mt-20">
          <h1 className="text-5xl font-extrabold font-sans mb-2">John Doe</h1>
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
            <h2 className="text-xl font-extrabold font-sans mt-5">Category</h2>
            <ul className="text-sm list-disc ml-4">
              <li>Computer Science</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-extrabold font-sans mt-5">
              Fields Of interests
            </h2>
            <ul className="text-sm list-disc ml-4">
              <li>Machine Learning</li>
              <li>Big Data</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-extrabold font-sans mt-5">Projects</h2>
            <ul className="text-sm list-disc ml-4">
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-9 m-5">
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
      <div className="py-9">
        <h2 className="text-xl font-extrabold">Bio</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div>
        <h1 className="text-xl font-extrabold mb-2">Success Stories</h1>
        <hr />
        <div className="h-1/3 flex flex-row gap-4 my-9 ">
          <div className="w-1/6  h-64 border-2"></div>
          <div className="w-1/6  h-64 border-2"></div>
          <div className="w-1/6  h-64 border-2"></div>
          <div className="w-1/6  h-64 border-2"></div>
          <div className="w-1/6  h-64 border-2"></div>
          <div className="w-1/6  h-64 border-2"></div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-extrabold">Past Mentees</h1>
        <hr />
        <div className="mt-9">
          <div className="flex flex-row gap-4">
            <div className="relative w-80">
              <input
                type="text"
                id="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type the keywords here to search"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
            <button>Advanced options</button>
          </div>
          <div className="w-full mt-9">
            <div className="w-full h-16 border-gray-200 border-2 grid grid-cols-6 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Andrew_Tate_on_%27Anything_Goes_With_James_English%27_in_2021.jpg"
                className="h-10 w-10 object-fill rounded-full my-auto mx-auto"
                alt="past mentee"
              />
              <h3 className="h-5 my-auto text-base font-bold">John Doe</h3>
              <p className="h-5 my-auto text-sm">University of Colombo</p>
            </div>

            <div className="w-full h-16 border-gray-200 border-2 grid grid-cols-6 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Andrew_Tate_on_%27Anything_Goes_With_James_English%27_in_2021.jpg"
                className="h-10 w-10 object-fill rounded-full my-auto mx-auto"
                alt="past mentee"
              />
              <h3 className="h-5 my-auto text-base font-bold">John Doe</h3>
              <p className="h-5 my-auto text-sm">University of Colombo</p>
            </div>

            <div className="w-full h-16 border-gray-200 border-2 grid grid-cols-6 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Andrew_Tate_on_%27Anything_Goes_With_James_English%27_in_2021.jpg"
                className="h-10 w-10 object-fill rounded-full my-auto mx-auto"
                alt="past mentee"
              />
              <h3 className="h-5 my-auto text-base font-bold">John Doe</h3>
              <p className="h-5 my-auto text-sm">University of Colombo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileView;
