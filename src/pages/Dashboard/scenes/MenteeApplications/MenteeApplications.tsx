import type React from 'react';
import { useState } from 'react';
import { type Mentee } from '../../../../types';
import useMentees from '../../../../hooks/admin/useMentees';
import { Link } from 'react-router-dom';

const MenteeApplications: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, data: mentees } = useMentees();

  const renderFilters = () => {
    const filters = [
      { label: 'All', status: '' },
      { label: 'Approved', status: 'approved' },
      { label: 'Pending', status: 'pending' },
      { label: 'Rejected', status: 'rejected' },
      { label: 'Completed', status: 'completed' },
    ];

    return (
      <>
        {mentees !== undefined && (
          <div className="flex mb-3">
            {filters.map(({ label, status }) => {
              const count = mentees?.filter((mentee) =>
                status.length > 0 ? mentee.state === status : true
              ).length;
              return (
                <button
                  key={label}
                  className={`px-4 py-1 font-medium  ${
                    filter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } ${
                    label === 'All'
                      ? 'rounded-l-md'
                      : label === 'Completed'
                      ? 'rounded-r-md'
                      : 'rounded-none'
                  }`}
                  onClick={() => {
                    setFilter(status);
                  }}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        )}
      </>
    );
  };

  const renderMentorTable = () => {
    const filteredMentors =
      mentees != null
        ? filter !== ''
          ? mentees.filter((mentee) => mentee.state === filter)
          : mentees
        : [];

    const filteredMentorsByName = filteredMentors.filter((mentor: Mentee) =>
      `${mentor.application.firstName} ${mentor.application.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="p-2 my-4 border border-gray-300 rounded-md"
        />

        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/4">
                Name
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/4">
                Company / University
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/4">
                Mentor
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/4">
                Video Submission
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredMentorsByName.map((mentee) => (
              <tr key={mentee.uuid}>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4 text-blue-500">
                  <Link
                    to={`/admin/dashboard/mentee-applications/${mentee.uuid}`}
                  >
                    {mentee.application.firstName} {mentee.application.lastName}
                  </Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  {mentee.application.company}
                  {mentee.application.university}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  {mentee.mentor.application.firstName}{' '}
                  {mentee.mentor.application.lastName}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  <a
                    href={mentee.application.submission}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-full min-w-full">
      <h1 className="text-2xl font-medium my-4">Manage Mentee Applications</h1>
      <hr className="my-4" />
      {renderFilters()}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        renderMentorTable()
      )}
    </div>
  );
};

export default MenteeApplications;
