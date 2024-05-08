import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../constants';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../FormFields/MenteeApplication/FormInput';
import { useMutation } from '@tanstack/react-query';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import FormCheckbox from '../FormFields/MenteeApplication/FormCheckbox';
import { type MenteeApplication } from '../../types';
import { MenteeApplicationSchema } from '../../schemas';

const steps = [
  {
    id: 'Step 1',
    fields: ['firstName', 'lastName', 'email', 'contactNo'],
  },
  {
    id: 'Step 2',
    fields: ['isUndergrad'],
  },
];

const MenteeRegistrationPage: React.FC = () => {
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<MenteeApplication>({
    resolver: zodResolver(MenteeApplicationSchema),
  });
  const { error: mentorsError, data: mentors } = usePublicMentors();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async (): Promise<void> => {
    let fields = steps[currentStep].fields;

    if (currentStep === 1) {
      if (watch('isUndergrad')) {
        fields = ['course', 'university', 'yearOfStudy'];
        unregister(['graduatedYear', 'position', 'company']);
      } else {
        fields = ['company', 'graduatedYear', 'position'];
        unregister(['course', 'university', 'yearOfStudy']);
      }
    }

    const output = await trigger(fields as [keyof MenteeApplication], {
      shouldFocus: true,
    });

    if (!output) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (): void => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit: SubmitHandler<MenteeApplication> = async (data) => {
    applyForMentor.mutate(data);
  };

  const applyForMentor = useMutation({
    mutationFn: async (data: MenteeApplication) => {
      await axios.post(
        `${API_URL}/mentees`,
        {
          application: data,
          mentorId: data.mentorId,
        },
        { withCredentials: true }
      );
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="relative w-1/2 p-8">
        <div className="text-2xl font-semibold mb-2">Become a Mentee</div>
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <>
              <div className="text-xl font-medium mb-2">
                Personal Information
              </div>
              <hr />
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-1 mb-4 md:mb-0">
                  <FormInput
                    type="text"
                    placeholder="John"
                    name="firstName"
                    label="First Name"
                    register={register}
                    error={errors.firstName}
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-1">
                  <FormInput
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    label="Last Name"
                    register={register}
                    error={errors.lastName}
                  />
                </div>
              </div>
              <FormInput
                type="text"
                placeholder="john.doe@example.com"
                name="email"
                label="Email"
                register={register}
                error={errors.email}
              />
              <FormInput
                type="text"
                placeholder="+1234567890"
                name="contactNo"
                label="Contact No (Whatsapp)"
                register={register}
                error={errors.contactNo}
              />
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="text-xl font-medium mb-2">
                Professional Information
              </div>
              <FormCheckbox
                name="isUndergrad"
                label="Are you a university student?"
                register={register}
                error={errors.isUndergrad}
              />
              {watch('isUndergrad') ? (
                <>
                  <FormInput
                    type="text"
                    placeholder="MIT"
                    name="university"
                    label="University"
                    register={register}
                    error={errors.university}
                  />
                  <FormInput
                    type="text"
                    placeholder="Computer Science"
                    name="course"
                    label="Course / major"
                    register={register}
                    error={errors.course}
                  />
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Which year?
                    </label>
                    <input
                      type="number"
                      placeholder="2"
                      {...register('yearOfStudy', { valueAsNumber: true })}
                      className="mt-1 p-2 w-24 border rounded-md"
                    />
                    <br />
                    {errors != null && (
                      <span className="text-red-500">
                        {errors.yearOfStudy?.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Graduated year?
                    </label>
                    <input
                      placeholder="2024"
                      type="number"
                      {...register('graduatedYear', { valueAsNumber: true })}
                      className="mt-1 p-2 border rounded-md"
                    />
                    <br />
                    {errors != null && (
                      <span className="text-red-500">
                        {errors.graduatedYear?.message}
                      </span>
                    )}
                  </div>
                  <FormInput
                    type="text"
                    placeholder="Google"
                    name="company"
                    label="Company"
                    register={register}
                    error={errors.company}
                  />
                  <FormInput
                    type="text"
                    placeholder="Software Engineer"
                    name="position"
                    label="Current Position"
                    register={register}
                    error={errors.position}
                  />
                </>
              )}
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="text-xl font-medium mb-2">Mentee Application</div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Mentor
                </label>
                <select
                  className="mt-1 p-2 w-1/2 border rounded-md"
                  {...register('mentorId')}
                >
                  {mentors?.map((mentor) => (
                    <option key={mentor.mentorId} value={mentor.mentorId}>
                      {mentor.profile.first_name}
                    </option>
                  ))}
                </select>
              </div>
              <FormInput
                type="text"
                placeholder=""
                name="cv"
                label="CV"
                register={register}
                error={errors.cv}
              />
              <p className="text-md font-semibold">
                A video submission explaining the above (unlisted youtube
                video,google drive link)
              </p>
              <p>
                Why do you want to join this program?Reason for choosing this
                mentor?
              </p>
              <p>What makes you stand out from the rest of the mentees?</p>
              <p>What are your most defining characteristics?</p>
              <p>
                What is your expected end result at the end of this program?
              </p>
              <p>
                Would you be able to participate in the tasks/programs assigned
                by your mentor effectively with your current schedule?
              </p>
              <FormInput
                type="text"
                placeholder=""
                name="submission"
                label=""
                register={register}
                error={errors.submission}
              />
              <FormCheckbox
                name="consentGiven"
                label="I, hereby grant Sustainable Foundation Education permission to use my video submission solely for the internal evaluation of my application 
                to ScholarX. I understand that this video will not be used for any other purposes without my explicit consent."
                register={register}
                error={errors.consentGiven}
              />
              <p className="text-md font-semibold">Privacy Statement</p>
              <p>
                Sustainable Foundation Education assures that your video
                submission will be used exclusively for application evaluation
                purposes. We are committed to protecting your privacy and will
                not use your video for any other activities, such as general AI
                training or public distribution. Your personal information and
                video content will be handled with the utmost confidentiality.
              </p>
            </>
          )}
          {mentorsError !== null ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {mentorsError.message}
            </div>
          ) : null}
          {applyForMentor.isError &&
          applyForMentor?.error instanceof AxiosError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {applyForMentor.error.response?.data.message}
            </div>
          ) : null}
          {applyForMentor.isSuccess ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
              role="alert"
            >
              Successfully applied, You will be contacted shortly via email.
              Thank you!
            </div>
          ) : null}
          <hr className="border-t border-gray-300 my-6" />
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                Previous
              </button>
            )}
            {currentStep < 2 && (
              <button
                type="button"
                onClick={handleNext}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                Next
              </button>
            )}
            {currentStep === 2 && (
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-small rounded-md text-sm inline-flex items-center px-3 py-1.5 text-center me-2"
              >
                {applyForMentor.isPending ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenteeRegistrationPage;
