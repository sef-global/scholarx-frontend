import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../constants';
import { z } from 'zod';
import useCategories from '../../hooks/useCategories';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../FormFields/MentorApplication/FormInput';
import { useMutation } from '@tanstack/react-query';
import FormTextarea from '../FormFields/MentorApplication/FormTextarea';
import FormCheckbox from '../FormFields/MentorApplication/FormCheckbox';

const MentorApplicationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, { message: 'Contact number cannot be empty' }),
  country: z.string().min(1, { message: 'Country cannot be empty' }),
  position: z.string().min(1, { message: 'Position cannot be empty' }),
  expertise: z.string().min(1, { message: 'Expertise cannot be empty' }),
  bio: z.string().min(1, { message: 'Bio cannot be empty' }).max(200),
  isPastMentor: z.boolean(),
  reasonToMentor: z.string().optional(),
  motivation: z.string().optional(),
  cv: z.string().min(1, { message: 'CV cannot be empty' }),
  menteeExpectations: z
    .string()
    .min(1, { message: 'Mentee expectations cannot be empty' }),
  mentoringPhilosophy: z
    .string()
    .min(1, { message: 'Mentoring philosophy cannot be empty' }),
  noOfMentees: z.number().min(0, {
    message: 'Number of mentees must be greater than or equal to 0',
  }),
  canCommit: z.boolean(),
  mentoredYear: z.number().optional().or(z.number().min(0)),
  category: z.string().min(1, { message: 'Category cannot be empty' }),
  institution: z.string().min(1, { message: 'Institution cannot be empty' }),
  linkedin: z
    .string()
    .url({ message: 'Invalid LinkedIn URL' })
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url({ message: 'Invalid website URL' })
    .optional()
    .or(z.literal('')),
});

const steps = [
  {
    id: 'Step 1',
    fields: ['firstName', 'lastName', 'email', 'contactNo', 'country'],
  },
  {
    id: 'Step 2',
    fields: ['position', 'institution', 'expertise', 'cv', 'bio'],
  },
];

export type MentorApplication = z.infer<typeof MentorApplicationSchema>;

const MentorRegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<MentorApplication>({
    resolver: zodResolver(MentorApplicationSchema),
  });
  const { error: categoryError, data: categories } = useCategories();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async (): Promise<void> => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as [keyof MentorApplication], {
      shouldFocus: true,
    });

    if (!output) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (): void => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit: SubmitHandler<MentorApplication> = async (data) => {
    createMentorApplication.mutate(data);
  };

  const createMentorApplication = useMutation({
    mutationFn: async (data: MentorApplication) => {
      await axios.post(
        `${API_URL}/mentors`,
        {
          application: data,
          categoryId: data.category,
        },
        { withCredentials: true }
      );
    },
  });

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
              <FormInput
                type="text"
                placeholder="United States"
                name="country"
                label="Country"
                register={register}
                error={errors.country}
              />
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="text-xl font-medium mb-2">
                Professional Information
              </div>
              <FormInput
                type="text"
                placeholder="Institute of Technology"
                name="institution"
                label="Institution"
                register={register}
                error={errors.institution}
              />
              <FormInput
                type="text"
                placeholder="Founder & CEO"
                name="position"
                label="Current Position"
                register={register}
                error={errors.position}
              />
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
              <FormTextarea
                placeholder="Engineering, Mechanical Engineering, Mechanical designing"
                name="expertise"
                label="Areas of Expertise"
                register={register}
                error={errors.expertise}
              />
              <FormTextarea
                placeholder="I am a seasoned mechanical engineer with over 15 years of experience in the industry. I founded XYZ Engineering Solutions, a company specializing in innovative mechanical designs."
                name="bio"
                label="Brief Bio (max. 200 characters)"
                register={register}
                error={errors.bio}
              />
              <FormInput
                type="text"
                placeholder="https://linkedin.com/in/janesmith"
                name="linkedin"
                label="Linkedin"
                register={register}
                error={errors.linkedin}
              />
              <FormInput
                type="text"
                placeholder="https://xyzengineeringsolutions.com"
                name="website"
                label="Website"
                register={register}
                error={errors.website}
              />
              <FormInput
                type="text"
                placeholder=""
                name="cv"
                label="CV"
                register={register}
                error={errors.cv}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="text-xl font-medium mb-2">Mentorship Details</div>
              <FormCheckbox
                name="isPastMentor"
                label="Are you a past mentor?"
                register={register}
                error={errors.isPastMentor}
              />
              {watch('isPastMentor') && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Which year?
                    </label>
                    <input
                      type="number"
                      min={2015}
                      {...register('mentoredYear', { valueAsNumber: true })}
                      className="mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <FormTextarea
                    placeholder="Seeing mentees succeed and make meaningful contributions to the field inspires me."
                    name="motivation"
                    label="What was your motivation for joining the program? Has it changed, if yes, how?"
                    register={register}
                    error={errors.motivation}
                  />
                  <FormTextarea
                    placeholder="I believe in nurturing the next generation of engineers and entrepreneurs."
                    name="reasonToMentor"
                    label="Why would like to be a ScholarX mentor?"
                    register={register}
                    error={errors.reasonToMentor}
                  />
                </>
              )}
              <FormTextarea
                placeholder="I expect mentees to be passionate about engineering and committed to learning."
                name="menteeExpectations"
                label="Mentee Expectations (short description: who is your ideal mentee?)"
                register={register}
                error={errors.menteeExpectations}
              />
              <FormTextarea
                placeholder="I believe in fostering a collaborative learning environment where mentees can explore and innovate."
                name="mentoringPhilosophy"
                label="What is your mentoring philosophy?"
                register={register}
                error={errors.mentoringPhilosophy}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  How many mentees can you accommodate?
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={1}
                  {...register('noOfMentees', { valueAsNumber: true })}
                  className="mt-1 p-2 border rounded-md"
                />
                {errors.noOfMentees != null && (
                  <span className="text-red-500">
                    {errors.noOfMentees.message}
                  </span>
                )}
              </div>
              <FormCheckbox
                name="canCommit"
                label="Are you able to commit to a period of 6 months for the
                program? (We expect a minimum of 6 calls
                with a mentee in a span of 6 month period)"
                register={register}
                error={errors.canCommit}
              />
            </>
          )}
          {categoryError !== null ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {categoryError.message}
            </div>
          ) : null}
          {createMentorApplication.isError &&
          createMentorApplication?.error instanceof AxiosError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              {createMentorApplication.error.response?.data.message}
            </div>
          ) : null}
          {createMentorApplication.isSuccess ? (
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
                {createMentorApplication.isPending ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistrationPage;
