import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MentorFeedbackSchema } from '../../schemas';
import { useMentorFeedback } from '../../hooks/useSubmitCheckIn';
import Spinner from '../Spinner/Spinner.component';

interface MentorFeedbackFormData {
  menteeId: string;
  checkInId: string;
  mentorFeedback: string;
  isCheckedByMentor: boolean;
}

interface MentorFeedbackFormProps {
  menteeId: string;
  checkInId: string;
  onSubmit: () => Promise<void>;
}

const MentorFeedbackForm: React.FC<MentorFeedbackFormProps> = ({
  menteeId,
  checkInId,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MentorFeedbackFormData>({
    resolver: zodResolver(MentorFeedbackSchema),
    defaultValues: {
      menteeId,
      checkInId,
      mentorFeedback: '',
      isCheckedByMentor: false,
    },
  });
  const { submitMentorFeedback, isSuccess, isError, error } =
    useMentorFeedback();

  const handleSubmitFeedback = async (data: MentorFeedbackFormData) => {
    try {
      await submitMentorFeedback(data);
      await onSubmit();
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitFeedback)} className="mt-3">
      <input type="hidden" {...register('menteeId')} />
      <input type="hidden" {...register('checkInId')} />
      <textarea
        {...register('mentorFeedback')}
        className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        placeholder="Add feedback for your mentee"
      ></textarea>
      {errors.mentorFeedback && (
        <div className="text-red-600 text-sm mt-1">
          {errors.mentorFeedback.message}
        </div>
      )}

      <div className="flex mt-2 justify-between">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('isCheckedByMentor')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Mark as checked</span>
          {errors.isCheckedByMentor && (
            <div className="text-red-600 text-sm mt-1 ml-7">
              {errors.isCheckedByMentor.message}
            </div>
          )}
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Spinner />
              <span>Submitting...</span>
            </span>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </div>
      {isSuccess && (
        <div className="text-green-600 text-sm mt-1">
          Feedback submitted successfully 🎉
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">
          Error submitting feedback: {error?.message}
        </div>
      )}
    </form>
  );
};

export default MentorFeedbackForm;
