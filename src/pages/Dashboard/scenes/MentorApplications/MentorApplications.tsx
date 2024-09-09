import React, { useEffect, useMemo, useState } from 'react';
import { type Mentor } from '../../../../types';
import { useMentors } from '../../../../hooks/admin/useMentors';
import useCategories from '../../../../hooks/useCategories';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Loading from '../../../../assets/svg/Loading';

const MentorApplications: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const { ref, inView } = useInView();

  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const queryClient = useQueryClient();

  const {
    data: mentors,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: mentorsStatus,
  } = useMentors(categoryFilter, filter, pageSize);

  const { status: allMentorsStatus, totalItemCount: totalAllItemCount } =
    useMentors(categoryFilter, null, 1);
  const {
    status: approvedMentorsStatus,
    totalItemCount: totalApprovedItemCount,
  } = useMentors(categoryFilter, 'approved', 1);
  const {
    status: pendingMentorsStatus,
    totalItemCount: totalPendingItemCount,
  } = useMentors(categoryFilter, 'pending', 1);
  const {
    status: rejectedMentorsStatus,
    totalItemCount: totalRejectedItemCount,
  } = useMentors(categoryFilter, 'rejected', 1);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    await queryClient.refetchQueries({
      queryKey: ['mentors', selectedCategory],
    });
  };

  const totalMentees = useMemo(() => {
    let total = 0;
    if (mentors?.length) {
      for (const mentor of mentors.filter(
        (mentor) => mentor.state === 'approved' && mentor.availability
      )) {
        total += mentor.application.noOfMentees;
      }
    }
    return total;
  }, [mentors]);

  const renderFilters = () => {
    const filters = [
      {
        label: 'All',
        status: '',
        count: totalAllItemCount,
        isLoaded: allMentorsStatus === 'success',
      },
      {
        label: 'Approved',
        status: 'approved',
        count: totalApprovedItemCount,
        isLoaded: approvedMentorsStatus === 'success',
      },
      {
        label: 'Pending',
        status: 'pending',
        count: totalPendingItemCount,
        isLoaded: pendingMentorsStatus === 'success',
      },
      {
        label: 'Rejected',
        status: 'rejected',
        count: totalRejectedItemCount,
        isLoaded: rejectedMentorsStatus === 'success',
      },
    ];

    return (
      <>
        {mentors && (
          <div className="flex mb-3">
            {filters.map(({ label, status, count, isLoaded }) => {
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
                  {label} {isLoaded ? `(${count})` : ''}
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
        <div className="flex justify-between items-center">
          <div>
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
              {categoriesData?.map((category: { uuid: string; category: string }) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.category}
                  </option>
                ))}
            </select>
          </div>
          <p className="text-md m-4">Total Mentee Slots: {totalMentees}</p>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/3">
                Name
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/3">
                Profession
              </th>
              <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 w-1/3">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredMentorsByName.map((mentor) => (
              <tr key={mentor.uuid}>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/3 text-blue-500">
                  <Link
                    to={`/admin/dashboard/mentor-applications/${mentor.uuid}`}
                  >
                    {mentor.application.firstName} {mentor.application.lastName}
                  </Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/3">
                  {mentor.application.position}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/3">
                  {mentor.category.category}
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
      <h1 className="text-2xl font-medium my-4">Manage Mentor Applications</h1>
      <hr className="my-4" />
      {renderFilters()}
      {mentorsStatus === 'pending' ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : mentorsStatus === 'error' ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">
            Failed to load mentors. Please try again later.
          </p>
        </div>
      ) : (
        renderMentorTable()
      )}

      {categoriesLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : categoriesError ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">
            Failed to load categories. Please try again later.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MentorApplications;
