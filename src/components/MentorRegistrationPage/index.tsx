import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../constants';
import useCategories from '../../hooks/useCategories';
import type { MentorApplication } from '../../types';

const MentorRegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MentorApplication>({ defaultValues: { isPastMentor: false } });
  const { error, data: categories } = useCategories();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = (): void => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const onSubmit: SubmitHandler<MentorApplication> = (data): void => {
    console.log(data);

    // axios
    //   .post(
    //     `${API_URL}/mentors`,
    //     {
    //       application: [
    //       ],
    //       categoryId: formData.categoryId,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then(() => {
    //     window.location.href = '/';
    //   })
    //   .catch((error) => {
    //     if (error.response.status !== 401) {
    //       console.error({
    //         message:
    //           'Something went wrong with submitting the mentor application',
    //         description: error,
    //       });
    //     } else {
    //       console.error('Error submitting mentor application:', error);
    //     }
    //   });
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="relative w-1/2 p-8">
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
        <div className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <>
              <div className="text-xl font-medium mb-2">
                Personal Information
              </div>
              <hr />
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-1">
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  {...register('email')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Contact No (Whatsapp)
                </label>
                <input
                  type="text"
                  {...register('contactNo')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Country
                </label>
                <input
                  type="text"
                  {...register('country')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="text-xl font-medium mb-2">
                Professional Information
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Institution
                </label>
                <input
                  type="text"
                  {...register('institution')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Current Position
                </label>
                <input
                  type="text"
                  {...register('position')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Category
                </label>
                <select
                  className="mt-1 p-2 w-1/2 border rounded-md"
                  {...register('category')}
                >
                  {categories.map(
                    (category: { uuid: string; category: string }) => (
                      <option key={category.uuid} value={category.uuid}>
                        {category.category}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Areas of Expertise
                </label>
                <input
                  type="text"
                  {...register('expertise')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Brief Bio (max. 200 characters)
                </label>
                <textarea
                  {...register('bio')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Linkedin
                </label>
                <input
                  type="text"
                  {...register('linkedin')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Website
                </label>
                <input
                  type="text"
                  {...register('website')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  CV
                </label>
                <input
                  type="text"
                  {...register('cv')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="text-xl font-medium mb-2">Mentorship Details</div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Are you a past mentor?
                </label>
                <input
                  type="checkbox"
                  {...register('isPastMentor')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              {watch('isPastMentor') && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Which year?
                    </label>
                    <input
                      type="number"
                      {...register('mentoredYear')}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      What was your motivation for joining the program? Has it
                      changed, if yes, how?
                    </label>
                    <input
                      type="text"
                      {...register('motivation')}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Why would like to be a ScholarX mentor
                    </label>
                    <input
                      type="text"
                      {...register('reasonToMentor')}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Reason to Mentor
                </label>
                <input
                  type="text"
                  {...register('reasonToMentor')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Mentee Expectations (short description: who is your ideal
                  mentee?)
                </label>
                <input
                  type="text"
                  {...register('menteeExpectations')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  What is your mentoring philosophy?
                </label>
                <textarea
                  {...register('mentoringPhilosophy')}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  How many mentees can you accommodate?
                </label>
                <input
                  type="number"
                  {...register('noOfMentees')}
                  className="mt-1 p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Are you able to commit to a period of 6 months for the
                  program? (Support description: We expect a minimum of 6 calls
                  with a mentee in a span of 6 month period)
                </label>
                <input
                  type="checkbox"
                  {...register('canCommit')}
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
              {error.message}
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
                type="submit"
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
