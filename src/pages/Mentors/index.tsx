import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useCategories from '../../hooks/useCategories';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import { type Mentor, type Category } from '../../types';
import MentorCard from '../../components/MentorCard/MentorCard.component';
import Loading from '../../assets/svg/Loading';

const Mentors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortedMentors, setSortedMentors] = useState<Mentor[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const pageSize = 10;

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePublicMentors(selectedCategory, pageSize);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
    fetchNextPage: fetchNextCategories,
    hasNextPage: hasNextCategoriesPage,
  } = useCategories(100);

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (data) {
      const allMentors = data.pages.flatMap((page) => page.items);
      setSortedMentors(allMentors);
    }
  }, [data]);

  useEffect(() => {
    if (categoriesData) {
      const fetchedCategories = categoriesData.pages.flatMap(
        (page) => page.items
      );
      setAllCategories((prevCategories) => {
        const uniqueCategories = [...prevCategories];
        fetchedCategories.forEach((category) => {
          if (!uniqueCategories.some((c) => c.uuid === category.uuid)) {
            uniqueCategories.push(category);
          }
        });
        return uniqueCategories;
      });

      if (hasNextCategoriesPage) {
        void fetchNextCategories();
      }
    }
  }, [categoriesData, hasNextCategoriesPage, fetchNextCategories]);

  const handleSortAZ = () => {
    const sorted = [...sortedMentors].sort((a, b) =>
      a.application.firstName.localeCompare(b.application.firstName)
    );
    setSortedMentors(sorted);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  if (status === 'pending' || categoriesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (status === 'error' || categoriesError) {
    return <p>An error occurred.</p>;
  }

  return (
    <div className="w-full">
      <div>
        <div className="mb-4 w-full flex items-center justify-between">
          <p className="text-2xl font-semibold">Mentors</p>
        </div>
        <hr className="mb-8" />

        <div className="mb-4 w-full flex items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center text-sm">
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
            {allCategories.map((category: Category) => (
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
            className="bg-blue-500 text-white px-2 py-1 rounded border border-blue-500 text-xs mr-6"
          >
            Sort A-Z
          </button>
        </div>

        {sortedMentors.length > 0 ? (
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-start">
            {sortedMentors.map((mentor) => (
              <MentorCard key={mentor.uuid} mentor={mentor} />
            ))}
          </div>
        ) : (
          <p>No mentors found for this category.</p>
        )}

        {isFetchingNextPage && (
          <div className="flex justify-center mt-4">
            <Loading />
          </div>
        )}

        <div ref={ref} style={{ height: '20px' }} />
      </div>
    </div>
  );
};

export default Mentors;
