import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MentorFeedbackSchema } from '../../schemas';
import Spinner from '../Spinner/Spinner.component';

type MentorFeedbackFormData = z.infer<typeof MentorFeedbackSchema>;

interface MentorFeedbackFormProps {
  menteeId: string;
  checkInId: string;
  onSubmit: (data: MentorFeedbackFormData) => Promise<void>;
  isSubmitting: boolean;
}

const MentorFeedbackForm: React.FC<MentorFeedbackFormProps> = ({
  menteeId,
  checkInId,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MentorFeedbackFormData>({
    resolver: zodResolver(MentorFeedbackSchema),
    defaultValues: {
      menteeId,
      checkInId,
      mentorFeedback: '',
      isCheckedByMentor: false,
    },
  });

  const handleFormSubmit = async (data: MentorFeedbackFormData) => {
    try {
      console.log(data);
      console.log('submitting feedback');
      await onSubmit(data);
      reset({ mentorFeedback: '', isCheckedByMentor: false });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const getButtonClass = () => {
    const baseClass =
      'px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 text-sm font-medium ';
    if (isSubmitting) {
      return baseClass + 'bg-gray-400 text-white cursor-not-allowed';
    }
    return (
      baseClass + 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-3">
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

      <div className="flex items-center mt-2 justify-between">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('isCheckedByMentor')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Mark as checked</span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className={getButtonClass()}
        >
          {isSubmitting ? <Spinner /> : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default MentorFeedbackForm;
