import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MenteeCheckInSchema } from '../../schemas';
import { useSubmitCheckIn } from '../../hooks/useSubmitCheckIn';
import closeIcon from '../../assets/svg/closeIcon.svg';
import CloseIcon from '../../assets/svg/Icons/CloseIcon';
import Loading from '../../assets/svg/Loading';

type MenteeCheckInForm = z.infer<typeof MenteeCheckInSchema>;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthlyCheckInModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
  menteeId: string;
}> = ({ onClose, isOpen, menteeId }) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenteeCheckInForm>({
    resolver: zodResolver(MenteeCheckInSchema),
    defaultValues: {
      month: '',
      progressTowardsGoals: '',
      generalUpdatesAndFeedback: '',
      mediaContentLinks: [],
    },
  });

  const [mediaLinks, setMediaLinks] = useState<string[]>([]);

  const handleAddLink = () => {
    setMediaLinks([...mediaLinks, '']);
    setValue('mediaContentLinks', [...mediaLinks, '']);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = mediaLinks.filter((_, i) => i !== index);
    setMediaLinks(newLinks);
    setValue('mediaContentLinks', newLinks);
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = mediaLinks.map((link, i) => (i === index ? value : link));
    setMediaLinks(newLinks);
    setValue('mediaContentLinks', newLinks);
  };

  const { submitCheckIn } = useSubmitCheckIn();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: MenteeCheckInForm) => {
    const checkInData = {
      ...data,
      mediaLinks: mediaLinks.filter((link) => link.trim() !== ''),
      menteeId,
    };
    setLoading(true);
    try {
      await submitCheckIn(checkInData);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-full overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Monthly Check-In</h2>
            <button onClick={onClose} aria-label="Close">
              <img src={closeIcon} alt="Close" className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <p className="text-xs text-gray-500">
                Select the month for which you are submitting the progress.
              </p>
              <select
                {...register('month', { required: 'Month is required' })}
                className={`mt-1 block w-full border ${
                  errors.month ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select a month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.month.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                General Updates and Feedback
              </label>
              <p className="text-xs text-gray-500">
                Provide any general updates or feedback you have.
              </p>
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
              <p className="text-xs text-gray-500">
                Provide updates on your progress towards your goals.
              </p>
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
              <p className="text-xs text-gray-500"></p>
              <p className="text-xs text-gray-500">
                Provide links to any relevant media content. Maximum of 3 links
                in per check-in.
              </p>
              {mediaLinks.map((link, index) => (
                <div key={index} className="flex items-center mt-1">
                  <input
                    value={link}
                    onChange={(e) => {
                      handleLinkChange(index, e.target.value);
                    }}
                    placeholder="Media Link"
                    className={`block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      errors.mediaContentLinks
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {index >= 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveLink(index);
                      }}
                      className="ml-2 inline-flex items-center px-1 py-1 border border-transparent text-xs font-medium rounded-md bg-red-100 hover:bg-red-200 focus:outline-none focus:ring"
                    >
                      <CloseIcon />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLink}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-500"
              >
                Add Link
              </button>
              {errors.mediaContentLinks && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mediaContentLinks[0]?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700
                focus:outline-none focus:ring focus:ring-blue-500"
              >
                {loading ? (
                  <div className="inline-flex items-center justify-center w-6 h-6">
                    <Loading />
                  </div>
                ) : (
                  'Submit'
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
    </>
  );
};

export default MonthlyCheckInModal;
