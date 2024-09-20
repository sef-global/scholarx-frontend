import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MenteeCheckInSchema } from '../../schemas';
import { useSubmitCheckIn } from '../../hooks/useSubmitCheckIn';
import Loading from '../../assets/svg/Loading';
import closeIcon from '../../assets/svg/closeIcon.svg';

type MenteeCheckInForm = z.infer<typeof MenteeCheckInSchema>;

const MonthlyCheckInModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  menteeId: string;
}> = ({ onClose, isOpen, menteeId }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MenteeCheckInForm>({
    resolver: zodResolver(MenteeCheckInSchema),
    defaultValues: { mediaContentLinks: [''] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mediaContentLinks',
  });
  const { submitCheckIn, isSuccess } = useSubmitCheckIn();

  const onSubmit = async (data: MenteeCheckInForm) => {
    const checkInData = {
      ...data,
      menteeId,
    };
    setLoading(true);
    await submitCheckIn(checkInData);
    console.log('checkInData', checkInData);
    onClose();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Monthly Check-In</h2>
          <button onClick={onClose} aria-label="Close">
            <img src={closeIcon} alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`mt-1 block w-full border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              General Updates and Feedback
            </label>
            <textarea
              {...register('generalUpdatesAndFeedback')}
              className={`mt-1 block w-full border ${
                errors.generalUpdatesAndFeedback
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.generalUpdatesAndFeedback && (
              <p className="text-red-500 text-xs mt-1">
                {errors.generalUpdatesAndFeedback.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Progress Towards Goals
            </label>
            <textarea
              {...register('progressTowardsGoals')}
              className={`mt-1 block w-full border ${
                errors.progressTowardsGoals
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.progressTowardsGoals && (
              <p className="text-red-500 text-xs mt-1">
                {errors.progressTowardsGoals.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Media Content Links
            </label>
            <p className="text-xs text-gray-500">
              Link to your media content. A minimum of three submissions are
              required.
            </p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mt-2">
                <input
                  {...register(`mediaContentLinks.${index}`)}
                  placeholder="Link"
                  className={`block w-full border ${
                    index > 2 ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                {index >= 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                    className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                append('');
              }}
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-500"
              disabled={fields.length >= 3}
            >
              Add Link
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                loading
                  ? 'bg-gray-400'
                  : isSuccess
                  ? 'bg-green-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring focus:ring-blue-500`}
            >
              {loading ? (
                <Loading />
              ) : isSuccess ? (
                'Submitted'
              ) : (
                'Submit Check-In'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyCheckInModal;
