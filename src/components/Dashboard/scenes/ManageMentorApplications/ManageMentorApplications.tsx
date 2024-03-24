import React, { useState, useEffect } from 'react';
import { type Mentor } from '../../../../types';
import { API_URL } from '../../../../constants';
import axios from 'axios';

export const ManageMentorApplications: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const renderFilters = () => {
    const filters = ['', 'pending', 'rejected', 'approved'];
    return (
      <div className="flex mb-4">
        {filters.map((f, index) => (
          <button
            key={f}
            className={`px-4 py-2 font-medium text-xs ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${
              index === 0
                ? 'rounded-l-md'
                : index === filters.length - 1
                ? 'rounded-r-md'
                : 'rounded-none'
            }`}
            onClick={() => {
              setFilter(f);
            }}
          >
            {f.length > 0 ? f.charAt(0).toUpperCase() + f.slice(1) : 'All'}
          </button>
        ))}
      </div>
    );
  };

  const handleStatusUpdate = async (mentorId: string, newStatus: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/mentors/${mentorId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMentors((prevMentors) =>
          prevMentors.map((mentor) =>
            mentor.uuid === mentorId ? { ...mentor, state: newStatus } : mentor
          )
        );
      } else {
        console.error('Failed to update mentor status');
      }
    } catch (error) {
      console.error('Error updating mentor status:', error);
    }
  };

  const renderMentorTable = () => {
    return (
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Profession
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {mentors.map((mentor) => (
            <tr key={mentor.uuid}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {mentor.application.firstName} {mentor.application.lastName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {mentor.application.position}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {mentor.category.category}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <select
                  value={mentor.state}
                  onChange={async (e) => {
                    await handleStatusUpdate(mentor.uuid, e.target.value);
                  }}
                  className="py-2 px-4 border border-gray-300 rounded-md"
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
    );
  };

  useEffect(() => {
    setLoading(true);
    const fetchMentors = async () => {
      const url =
        filter.length > 0
          ? `${API_URL}/admin/mentors?status=${filter}`
          : `${API_URL}/admin/mentors`;
      try {
        const response = await axios.get(url, { withCredentials: true });
        setMentors(response.data.mentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchMentors();
  }, [filter]);

  return (
    <div className="container mx-auto p-4 bg-white min-h-full">
      <h1 className="text-2xl font-medium my-4">Manage Mentor Applications</h1>
      <hr className="my-6" />
      {renderFilters()}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        renderMentorTable()
      )}
    </div>
  );
};
