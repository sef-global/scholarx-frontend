import React, { type ChangeEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { usePublicMentors } from '../../hooks/usePublicMentors';
import { type MenteeApplication } from '../../types';
import { MenteeApplicationSchema } from '../../schemas';
import FormCheckbox from '../../components/FormFields/MenteeApplication/FormCheckbox';
import FormInput from '../../components/FormFields/MenteeApplication/FormInput';
import useProfile from '../../hooks/useProfile';

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

const MenteeRegistration: React.FC = () => {
  const { data: user, updateProfile } = useProfile();
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<MenteeApplication>({
    resolver: zodResolver(MenteeApplicationSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.primary_email,
    },
  });
  const { error: mentorsError, data: mentors } = usePublicMentors();
  const [currentStep, setCurrentStep] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState(user?.image_url);

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setImage(file);
      setValue('profilePic', file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    document.getElementById('profilePic')?.click();
  };

  const handleNext = async (): Promise<void> => {
    let fields = steps[currentStep].fields;

    if (currentStep === 0 && !profilePic) {
      fields.push('profilePic');
    } else if (currentStep === 1) {
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
    applyForMentor(data);
    updateProfile({ profile: null, image });
  };

  const {
    mutate: applyForMentor,
    error: applicationError,
    isError: isApplicationError,
    isSuccess: applicationSuccess,
    isPending: isApplicationPending,
  } = useMutation({
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
    <div className="relative w-full">
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
            <div className="text-xl font-medium mb-2">Personal Information</div>
            <hr />
            <div className="relative">
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
                name="profilePic"
              />
              <div
                onClick={handleImageClick}
                className="cursor-pointer relative group mb-4"
              >
                {profilePic !== '' ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-[90px] h-[90px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-gray-400">+</span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 w-[90px] h-1/2 bg-black bg-opacity-40 rounded-b-full flex items-center p-5 justify-center">
                  <span className="text-white text-center text-xs">
                    Change Photo
                  </span>
                </div>
              </div>
              {errors != null && (
                <span className="text-red-500">
                  {errors.profilePic?.message}
                </span>
              )}
            </div>
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
                  <option key={mentor.uuid} value={mentor.uuid}>
                    {mentor.application.firstName} {mentor.application.lastName}
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
            <p>What is your expected end result at the end of this program?</p>
            <p>
              Would you be able to participate in the tasks/programs assigned by
              your mentor effectively with your current schedule?
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
              purposes. We are committed to protecting your privacy and will not
              use your video for any other activities, such as general AI
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
        {isApplicationError && applicationError instanceof AxiosError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            {applicationError.response?.data.message}
          </div>
        ) : null}
        {applicationSuccess ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            Successfully applied, You will be contacted shortly via email. Thank
            you!
          </div>
        ) : null}
        <hr className="border-t border-gray-300 my-6" />
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Previous
            </button>
          )}
          {currentStep < 2 && (
            <button
              type="button"
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {isApplicationPending ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MenteeRegistration;
