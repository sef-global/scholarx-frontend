import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import { type Mentor, type Category } from '../../types';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import MentorCard from '../../components/MentorCard/MentorCard.component';

const Mentors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam =
    queryParams.get('category') !== null ? queryParams.get('category') : '';

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryParam !== null ? categoryParam : undefined
  );
  const [sortedMentors, setSortedMentors] = useState<Mentor[] | undefined>(
    undefined
  );
  const {
    data: mentors,
    isLoading: mentorsLoading,
    error: mentorsError,
  } = usePublicMentors(selectedCategory);
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  useEffect(() => {
    if (categoryParam !== selectedCategory && categoryParam !== null) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, selectedCategory]);

  const handleSortAZ = () => {
    if (mentors !== undefined) {
      const sortedMentors = [...mentors].sort((a, b) =>
        a.profile.first_name.localeCompare(b.profile.first_name)
      );
      setSortedMentors(sortedMentors);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category !== null ? category : undefined);
    setSortedMentors(undefined); // Reset sorted mentors when category changes
    navigate({ search: category !== null ? `?category=${category}` : '' });
  };

  const isLoading = mentorsLoading || categoriesLoading;
  const error = mentorsError != null || categoriesError;

  return (
    <div className="w-full">
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
                  selectedCategory === undefined ? 'bg-blue-500 text-white' : ''
                }`}
                style={{ fontSize: '12px' }}
              >
                All
              </button>
              {categories?.map((category: Category) => (
                <button
                  key={category.uuid}
                  onClick={() => {
                    handleCategoryChange(category.uuid);
                  }}
                  className={`bg-blue text-black px-2 py-1 rounded border border-blue-500 ${
                    selectedCategory === category.category
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  {category.category}
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

          {error !== undefined && error !== null && (
            <p>{'An error occurred.'}</p>
          )}

          {(error === undefined || error === null) && (
            <>
              {sortedMentors !== undefined && sortedMentors.length > 0 && (
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
                  {sortedMentors.map((mentor) => (
                    <MentorCard key={mentor.uuid} mentor={mentor} />
                  ))}
                </div>
              )}

              {(sortedMentors === undefined || sortedMentors.length === 0) &&
                mentors !== undefined &&
                mentors.length > 0 && (
                  <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 items-start">
                    {mentors.map((mentor) => (
                      <MentorCard key={mentor?.uuid} mentor={mentor} />
                    ))}
                  </div>
                )}

              {(sortedMentors?.length === 0 ||
                (mentors !== undefined && mentors.length === 0)) && (
                <p>No mentors found for this category.</p>
              )}
            </>
          )}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Mentors;
