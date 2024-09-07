import React, { useEffect, useState } from 'react';
import { type Mentee } from '../../../../types';
import useMentees from '../../../../hooks/admin/useMentees';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../../assets/svg/Loading';

const MenteeApplications: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const { ref, inView } = useInView();

  const {
    data: mentees,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: menteesStatus,
  } = useMentees(filter, pageSize);

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
    const filteredMentees =
      mentees != null
        ? filter !== ''
          ? mentees.filter((mentee) => mentee.state === filter)
          : mentees
        : [];

    const filteredMenteesByName = filteredMentees.filter((mentor: Mentee) =>
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
            {filteredMenteesByName.map((mentee) => (
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

            {isFetchingNextPage && (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <Loading />
                </td>
              </tr>
            )}

            <tr ref={ref} style={{ height: '20px' }} />
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
      {menteesStatus === 'pending' ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        renderMentorTable()
      )}
    </div>
  );
};

export default MenteeApplications;
