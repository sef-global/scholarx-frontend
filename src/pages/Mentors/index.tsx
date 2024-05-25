import React, { useState, useEffect } from 'react';
import useCategories from '../../hooks/useCategories';
import { type Mentor, type Category } from '../../types';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import MentorCard from '../../components/MentorCard/MentorCard.component';

const Mentors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [sortedMentors, setSortedMentors] = useState<Mentor[]>([]);
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
    if (mentors) {
      setSortedMentors([...mentors]);
    }
  }, [mentors]);

  const handleSortAZ = () => {
    const sorted = [...sortedMentors].sort((a, b) =>
      b.profile.first_name.localeCompare(a.profile.first_name)
    );
    setSortedMentors(sorted);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const isLoading = mentorsLoading || categoriesLoading;
  const error = mentorsError != null || categoriesError;

  return (
    <div className="w-full">
      {!isLoading && (
        <div>
          <div className="mb-4 w-full flex items-center justify-between">
            <p className="text-2xl font-semibold">Mentors</p>
          </div>
          <hr className="mb-8" />
          <div className="mb-4 w-full flex items-center justify-between">
            <div className="flex space-x-2 items-center text-sm">
              <button
                onClick={() => {
                  handleCategoryChange(null);
                }}
                className={`bg-blue text-black px-4 py-1 rounded-full border border-blue-500 ${
                  selectedCategory === null ? 'bg-blue-500 text-white' : ''
                }`}
              >
                All
              </button>
              {categories?.map((category: Category) => (
                <button
                  key={category.uuid}
                  onClick={() => {
                    handleCategoryChange(category.uuid);
                  }}
                  className={`bg-blue text-black px-4 py-1 rounded-full border border-blue-500 ${
                    selectedCategory === category.uuid
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
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
              {sortedMentors.length > 0 && (
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-start">
                  {sortedMentors.map((mentor) => (
                    <MentorCard key={mentor.uuid} mentor={mentor} />
                  ))}
                </div>
              )}

              {sortedMentors.length === 0 && (
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
