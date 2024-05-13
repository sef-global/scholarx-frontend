import React, { useState } from 'react';
import { type Mentor } from '../../../../types';
import { useMentors } from '../../../../hooks/useMentors';
import useCategories from '../../../../hooks/useCategories';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ManageMentorApplications: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: categories } = useCategories();
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const queryClient = useQueryClient();
  const { isLoading, data: mentors, updateStatus } = useMentors(categoryFilter);

  const handleStatusUpdate = async (mentorId: string, newStatus: string) => {
    try {
      await updateStatus({ mentorId, newStatus });
    } catch (error) {
      console.error('Error updating mentor status:', error);
    }
  };

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    await queryClient.refetchQueries({
      queryKey: ['mentors', selectedCategory],
    });
  };

  const renderFilters = () => {
    const filters = [
      { label: 'All', status: '' },
      { label: 'Approved', status: 'approved' },
      { label: 'Pending', status: 'pending' },
      { label: 'Rejected', status: 'rejected' },
    ];

    return (
      <>
        {mentors !== undefined && (
          <div className="flex mb-3">
            {filters.map(({ label, status }) => {
              const count = mentors.filter((mentor) =>
                status.length > 0 ? mentor.state === status : true
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
                      : label === 'Rejected'
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
      mentors != null
        ? filter !== ''
          ? mentors.filter((mentor) => mentor.state === filter)
          : mentors
        : [];

    const filteredMentorsByCategory =
      categoryFilter !== ''
        ? filteredMentors.filter(
            (mentor) => mentor.category.uuid === categoryFilter
          )
        : filteredMentors;

    const filteredMentorsByName = filteredMentorsByCategory.filter(
      (mentor: Mentor) =>
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
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="p-2 mb-4 border border-gray-300 rounded-md ml-4"
        >
          <option value="">All Categories</option>
          {categories.map((category: { uuid: string; category: string }) => (
            <option key={category.uuid} value={category.uuid}>
              {category.category}
            </option>
          ))}
        </select>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider  w-1/4">
                Name
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider  w-1/4">
                Profession
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider  w-1/4">
                Category
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider  w-1/4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredMentorsByName.map((mentor) => (
              <tr key={mentor.uuid}>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  <Link
                    to={`/dashboard/manage-mentor-application/${mentor.uuid}`}
                  >
                    {mentor.application.firstName} {mentor.application.lastName}
                  </Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  {mentor.application.position}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  {mentor.category.category}
                </td>
                <td className="py-2 whitespace-no-wrap border-b border-gray-200 w-1/4">
                  <select
                    value={mentor.state}
                    onChange={async (e) => {
                      await handleStatusUpdate(mentor.uuid, e.target.value);
                    }}
                    className="py-1.5 px-5 border border-gray-300 rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="approved">Approved</option>
                  </select>
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
      <h1 className="text-2xl font-medium my-4">Manage Mentor Applications</h1>
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
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        renderMentorTable()
      )}
    </div>
  );
};

export default ManageMentorApplications;
