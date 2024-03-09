import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MentorCard from '../MentorCard/MentorCard.component';
import { MentorCardType } from '../../types';

interface PublicMentorPageProps {}

const PublicMentorPage: FC<PublicMentorPageProps> = () => {
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

  useEffect(() => {
    setIsLoading(true);

    let apiUrl = 'http://localhost:8080/api/mentors';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: { mentors: MentorCardType[] }) => {
        setMentors(data.mentors);

        const uniqueCategories = [
          ...new Set(data.mentors.map((mentor) => mentor.category)),
        ];
        setCategories(uniqueCategories);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSortAZ = () => {
    setIsLoading(true);

    const sortedMentors = [...mentors].sort((a, b) =>
      a.profile.first_name.localeCompare(b.profile.first_name)
    );

    setMentors(sortedMentors);
    setIsLoading(false);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setIsLoading(true);

    let apiUrl = 'http://localhost:8080/api/mentors';

    if (category) {
      apiUrl += `?category=${category}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: { mentors: MentorCardType[] }) => {
        setMentors(data.mentors);
        setIsLoading(false);

        const newSearch = category ? `?category=${category}` : '';
        navigate({ search: newSearch });
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
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
                  onClick={() => handleCategoryChange(null)}
                  className={`bg-blue text-black px-2 py-1 rounded border border-blue-500 ${
                    !selectedCategory ? 'bg-blue-500 text-white' : ''
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
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
                className="bg-blue text-black px-2 py-1 rounded border border-blue-500"
                style={{ fontSize: '12px' }}
              >
                Sort A-Z
              </button>
            </div>

            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.mentorId} mentor={mentor} />
              ))}
            </div>
          </div>
        )}

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PublicMentorPage;
