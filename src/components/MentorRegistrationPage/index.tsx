import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

const MentorRegistrationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    linkedinUrl: '',
    researchGateUrl: '',
    googleScholarUrl: '',
    categoryId: '',
    country: '',
    expertise: '',
    mentoringStrategy: '',
  });
  const [categories, setCategories] = useState([]);

  const handleNext = (): void => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (): void => {
    setError(null);
    axios
      .post(
        `${API_URL}/mentors`,
        {
          application: [
            { question: 'First Name', answer: formData.firstName },
            { question: 'Last Name', answer: formData.lastName },
            { question: 'Linkedin Url', answer: formData.linkedinUrl },
            { question: 'ResearchGate Url', answer: formData.researchGateUrl },
            {
              question: 'GoogleScholar Url',
              answer: formData.googleScholarUrl,
            },
            { question: 'Country', answer: formData.country },
            { question: 'What is your expertise', answer: formData.expertise },
            {
              question: 'What is your mentoring Strategy',
              answer: formData.mentoringStrategy,
            },
          ],
          categoryId: formData.categoryId,
        },
        { withCredentials: true }
      )
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          setError(error.response.data.message);
          console.error({
            message:
              'Something went wrong with submitting the mentor application',
            description: error,
          });
        } else {
          console.error('Error submitting mentor application:', error);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        const categories = response.data.categories;
        setFormData((prevData) => ({
          ...prevData,
          categoryId: categories[0].id,
        }));
        setCategories(categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="relative max-w-lg w-full p-8">
        <div className="text-2xl font-semibold mb-2">Become a Mentor</div>
        <hr className="border-t border-gray-300 mb-6" />
        <div className="relative h-2 mb-10">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${(currentStep + 1) * 33.33}%` }}
          ></div>
          <div className="flex justify-start">
            <div className="pt-3">Step {currentStep + 1} of 3</div>
          </div>
        </div>
        <div className="space-y-4" onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-1 mb-4 md:mb-0">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="linkedinUrl"
                  className="block text-sm font-medium text-gray-600"
                >
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="researchGateUrl"
                  className="block text-sm font-medium text-gray-600"
                >
                  ResearchGate URL
                </label>
                <input
                  type="text"
                  id="researchGateUrl"
                  name="researchGateUrl"
                  value={formData.researchGateUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="googleScholarUrl"
                  className="block text-sm font-medium text-gray-600"
                >
                  GoogleScholar URL
                </label>
                <input
                  type="text"
                  id="googleScholarUrl"
                  name="googleScholarUrl"
                  value={formData.googleScholarUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category
                </label>
                <select
                  className="mt-1 p-2 w-1/2 border rounded-md"
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  {categories.map(
                    (category: { id: string; category: string }) => (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-600"
                >
                  What is your country?
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expertise"
                  className="block text-sm font-medium text-gray-600"
                >
                  What is your expertise?
                </label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="mentoringStrategy"
                  className="block text-sm font-medium text-gray-600"
                >
                  What is your mentoring strategy?
                </label>
                <textarea
                  id="mentoringStrategy"
                  name="mentoringStrategy"
                  value={formData.mentoringStrategy}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}
          {error !== null ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          <hr className="border-t border-gray-300 my-6" />
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCurrentStep((prevStep) => prevStep - 1);
                }}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistrationPage;
