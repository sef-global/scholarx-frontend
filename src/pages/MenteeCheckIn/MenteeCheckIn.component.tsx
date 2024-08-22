import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const MenteeCheckInSchema = z.object({
  generalUpdate: z.string().min(1, 'Please provide general updates'),
  progressUpdate: z.string().min(1, 'Please summarize your progress'),
  mediaLink: z
    .string()
    .url('Please provide a valid URL')
    .min(1, 'Please provide a media link'),
});

type MenteeCheckInForm = z.infer<typeof MenteeCheckInSchema>;

const MenteeCheckIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenteeCheckInForm>({
    resolver: zodResolver(MenteeCheckInSchema),
  });

  const onSubmit = async (data: MenteeCheckInForm) => {
    console.log(data);
    // TODO: Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 md:text-center">
        Monthly Progress
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="generalUpdate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            General Updates and Feedback
          </label>
          <textarea
            {...register('generalUpdate')}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={6}
            placeholder="Please provide general updates on your mentorship so far and any feedback.  (Is communication regular? How often do you meet? How productive is your meeting time? Anything that stands out in particular?)"
          />
          {errors.generalUpdate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.generalUpdate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="progressUpdate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Progress Towards Goals
          </label>
          <textarea
            {...register('progressUpdate')}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={7}
            placeholder="How have you progressed towards your goals within the duration spent as a ScholarX mentee. (Summarize in 2-3 sentences)"
          />
          {errors.progressUpdate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.progressUpdate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="mediaLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Media Content Link{' '}
            <span className="text-gray-400">
              (Link to your media content. A minimum of three submissions are
              required, as detailed in the mentee guide.)
            </span>
          </label>
          <div className="relative">
            <input
              {...register('mediaLink')}
              type="text"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-20"
              placeholder="https://example.com/your-media-content"
            />
            <button
              type="button"
              onClick={() => {
                setValue('mediaLink', '', { shouldValidate: true });
              }}
              className="absolute right-2 top-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
            >
              Clear
            </button>
          </div>
          {errors.mediaLink && (
            <p className="mt-1 text-sm text-red-600">
              {errors.mediaLink.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Check-In
        </button>
      </form>
    </div>
  );
};

export default MenteeCheckIn;
