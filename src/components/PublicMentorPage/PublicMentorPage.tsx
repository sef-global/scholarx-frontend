import React, { type FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MentorCard from '../MentorCard/MentorCard.component';
import { type MentorCardType } from '../../types';
import { API_URL } from '../../constants';

const PublicMentorPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [mentors, setMentors] = useState<MentorCardType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const mentorsUrl = `${API_URL}/mentors`;
    const categoriesUrl = `${API_URL}/categories`;

    Promise.all([
      fetch(mentorsUrl).then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }),
      fetch(categoriesUrl).then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      }),
    ])
      .then(([mentorsData, categoriesData]) => {
        setMentors(mentorsData.mentors);

        const categoryNames: string[] = categoriesData.categories.map(
          (category: { category: string }) => category.category
        );
        const uniqueCategories: string[] = Array.from(new Set(categoryNames));
        setCategories(uniqueCategories);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSortAZ = (): void => {
    setIsLoading(true);
    const sortedMentors = [...mentors].sort((a, b) =>
      a.profile.first_name.localeCompare(b.profile.first_name)
    );
    setMentors(sortedMentors);
    setIsLoading(false);
  };

  const handleCategoryChange = (category: string | null): void => {
    setSelectedCategory(category);
    setIsLoading(true);
    const apiUrl = `${API_URL}/mentors${
      category !== null ? `?category=${category}` : ''
    }`;
    fetch(apiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      })
      .then((data) => {
        setMentors(data.mentors);
        setError(null);
        setIsLoading(false);
        navigate({ search: category !== null ? `?category=${category}` : '' });
      })
      .catch((error) => {
        if (error.message === 'Mentors not found') {
          setError('No mentors found for this category.');
        } else {
          setError('No mentors found for this category.');
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-8">
      <div className="max-w-screen-lg w-full">
        {!isLoading && (
          <div>
            <div className="mb-4 w-full flex items-center justify-between">
              <div className="text-xl font-bold" style={{ fontSize: '25px' }}>
                Mentors
              </div>
            </div>
            <hr className="mb-8" />
            <div className="mb-4 w-full flex items-center justify-between">
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => {
                    handleCategoryChange(null);
                  }}
                  className={`bg-blue text-black px-2 py-1 rounded border border-blue-500 ${
                    selectedCategory === null ? 'bg-blue-500 text-white' : ''
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                    }}
                    className={`bg-blue text-black px-2 py-1 rounded border border-blue-500 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : ''
                    }`}
                    style={{ fontSize: '12px' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 w-full flex justify-end">
              <button
                onClick={handleSortAZ}
                className={`bg-blue-500 text-white px-2 py-1 rounded border border-blue-500 text-xs mr-6`}
              >
                Sort A-Z
              </button>
            </div>

            {error !== null && error !== undefined && <p>{error}</p>}

            {(error === undefined || error === null) && mentors.length > 0 && (
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor?.mentorId} mentor={mentor} />
                ))}
              </div>
            )}

            {mentors.length === 0 &&
              (error === undefined || error === null) && (
                <p>No mentors found for this category.</p>
              )}
          </div>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PublicMentorPage;
