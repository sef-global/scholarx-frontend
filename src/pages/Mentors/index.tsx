import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useCategories from '../../hooks/useCategories';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import { type Mentor, type Category } from '../../types';
import MentorCard from '../../components/MentorCard/MentorCard.component';
import Loading from '../../assets/svg/Loading';
import { ApplicationStatus } from '../../enums';

const Mentors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedAvailableSlots, setSelectedAvailableSlots] = useState<number[]>([]);
  const [sortedMentors, setSortedMentors] = useState<Mentor[]>([]);
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [uniqueAvailableSlots, setUniqueAvailableSlots] = useState<number[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSlotsDropdownOpen, setIsSlotsDropdownOpen] = useState(false);
  const pageSize = 10;

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePublicMentors(selectedCategory, pageSize);

  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (data) {
      const allMentors = data.pages.flatMap((page) => page.items);

      const countries = allMentors
        .map((mentor) => mentor.application?.country)
        .filter((country): country is string => !!country);
      setUniqueCountries([...new Set(countries)]);

      const availableSlots = allMentors
        .map((mentor) => {
          const approvedMenteesCount = mentor?.mentees
            ? mentor.mentees.filter(
                (mentee) => mentee.state === ApplicationStatus.APPROVED
              ).length
            : 0;
          const availableSlots = mentor?.application.noOfMentees
            ? Math.max(0, mentor.application.noOfMentees - approvedMenteesCount)
            : 0;
          return availableSlots;
        })
        .filter((slots, index, self) => self.indexOf(slots) === index);
      setUniqueAvailableSlots(availableSlots);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      let allMentors = data.pages.flatMap((page) => page.items);

      if (selectedCountries.length > 0) {
        allMentors = allMentors.filter((mentor) =>
          selectedCountries.includes(mentor.application.country)
        );
      }

      if (selectedAvailableSlots.length > 0) {
        allMentors = allMentors.filter((mentor) => {
          const approvedMenteesCount = mentor?.mentees
            ? mentor.mentees.filter(
                (mentee) => mentee.state === ApplicationStatus.APPROVED
              ).length
            : 0;
          const availableSlots = mentor?.application.noOfMentees
            ? Math.max(0, mentor.application.noOfMentees - approvedMenteesCount)
            : 0;
          return selectedAvailableSlots.includes(availableSlots);
        });
      }

      setSortedMentors(allMentors);
    }
  }, [data, selectedCountries, selectedAvailableSlots]);

  const handleSortAZ = () => {
    const sorted = [...sortedMentors].sort((a, b) =>
      (a.application?.firstName || '').localeCompare(
        b.application?.firstName || ''
      )
    );
    setSortedMentors(sorted);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountries((prevCountries) => {
      if (prevCountries.includes(country)) {
        return prevCountries.filter((c) => c !== country);
      } else {
        return [...prevCountries, country];
      }
    });
  };

  const handleAvailableSlotsChange = (slots: number) => {
    setSelectedAvailableSlots((prevSlots) => {
      if (prevSlots.includes(slots)) {
        return prevSlots.filter((s) => s !== slots);
      } else {
        return [...prevSlots, slots];
      }
    });
  };

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const toggleSlotsDropdown = () => {
    setIsSlotsDropdownOpen(!isSlotsDropdownOpen);
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
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 bg-white rounded-lg p-6 self-start">
          <p className="text-xl font-semibold mb-4 text-gray-800">Filters</p>

          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700">Categories</p>
            <div className="flex flex-col gap-3 text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === null}
                  onChange={() => handleCategoryChange(null)}
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <span className="text-gray-700">All</span>
              </label>

              {allCategories.map((category: Category) => (
                <label
                  key={category.uuid}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === category.uuid}
                    onChange={() => handleCategoryChange(category.uuid)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">{category.category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700 flex items-center">
              <button
                className=" text-gray-700 hover:text-blue-500"
                onClick={toggleCountryDropdown}
              >
                Countries {isCountryDropdownOpen ? '-' : ' +'}
              </button>
            </p>

            {isCountryDropdownOpen && (
              <div className="flex flex-col gap-3 text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCountries.length === 0}
                    onChange={() => setSelectedCountries([])}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">All</span>
                </label>
                {uniqueCountries.map((country) => (
                  <label key={country} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountryChange(country)}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span className="text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-700 flex items-center">
              <button
                className=" text-gray-700 hover:text-blue-500"
                onClick={toggleSlotsDropdown}
              >
                Available Slots {isSlotsDropdownOpen ? '-' : ' +'}
              </button>
            </p>

            {isSlotsDropdownOpen && (
              <div className="flex flex-col gap-3 text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAvailableSlots.length === 0}
                    onChange={() => setSelectedAvailableSlots([])}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                  <span className="text-gray-700">All</span>
                </label>
                {uniqueAvailableSlots.map((slots) => (
                  <label key={slots} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAvailableSlots.includes(slots)}
                      onChange={() => handleAvailableSlotsChange(slots)}
                      className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span className="text-gray-700">
                      {slots} Slots Available
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleSortAZ}
              className="bg-blue-500 text-white px-2 py-1 rounded border border-blue-500 text-xs mr-6"
            >
              Sort A-Z
            </button>
          </div>
        </div>

        <div className="w-full flex-grow bg-white rounded-lg p-6">
          <div>
            <p className="text-2xl font-semibold mb-4">Mentors</p>
            <hr className="mb-6" />

            {sortedMentors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedMentors.map((mentor) => (
                  <MentorCard key={mentor.uuid} mentor={mentor} />
                ))}
              </div>
            ) : (
              <p>No mentors found for this filter.</p>
            )}

            {isFetchingNextPage && (
              <div className="flex justify-center mt-6">
                <Loading />
              </div>
            )}

            <div ref={ref} style={{ height: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
