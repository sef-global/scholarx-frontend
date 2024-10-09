import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Tooltip from '../Tooltip';
import OpenIcon from '../../assets/svg/Icons/OpenIcon';
import {
  menteeTermsAgreementModalSchema,
  mentorTermsAgreementModalSchema,
} from '../../schemas';

type MentorFormData = z.infer<typeof mentorTermsAgreementModalSchema>;
type MenteeFormData = z.infer<typeof menteeTermsAgreementModalSchema>;

interface TermsAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: (data: MentorFormData | MenteeFormData) => void;
  isMentor: boolean;
  guideUrl: string;
}

const TermsAgreementModal: React.FC<TermsAgreementModalProps> = ({
  isOpen,
  onClose,
  onAgree,
  isMentor,
  guideUrl,
}) => {
  const schema = isMentor
    ? mentorTermsAgreementModalSchema
    : menteeTermsAgreementModalSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: isMentor
      ? { agreed: false, canCommit: false }
      : { agreed: false, consentGiven: false },
  });

  const onSubmit = (data: MentorFormData | MenteeFormData) => {
    if (isValid) {
      onAgree(data);
    } else {
      console.error('Form is invalid. Errors:', errors);
    }
  };

  if (!isOpen) return null;

  const guideType = isMentor ? 'Mentor' : 'Mentee';
  const title = isMentor
    ? 'One Last Step to Join as a ScholarX Mentor'
    : 'ScholarX Mentee Terms and Privacy';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-full md:max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <form className="text-gray-800" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-600">
              <span className="inline-block sm:inline">{title}</span>
            </h2>

            <div className="flex items-center relative">
              <p className="text-md font-semibold mt-4 mb-1 text-gray-900">
                ScholarX {guideType} Guide
              </p>
              <div className="flex items-center justify-center absolute left-[14.2rem] top-[18.5px]">
                <Tooltip content={`Open ${guideType} Guide`} isVisible={true}>
                  <a href={guideUrl} target="_blank" rel="noreferrer">
                    <OpenIcon />
                  </a>
                </Tooltip>
              </div>
            </div>

            <div className="sm:h-[30vh] md:h-[35vh] overflow-y-auto mb-4 border border-gray-200 rounded mt-1">
              <iframe
                src={`${guideUrl}/preview?rm=minimal`}
                width="100%"
                height="100%"
              ></iframe>
            </div>

            {!isMentor && (
              <>
                <p className="text-md font-semibold text-gray-900">
                  Privacy Statement
                </p>
                <p>
                  Sustainable Foundation Education assures that your video
                  submission will be used exclusively for application evaluation
                  purposes. We are committed to protecting your privacy and will
                  not use your video for any other activities, such as general
                  AI training or public distribution. Your personal information
                  and video content will be handled with the utmost
                  confidentiality.
                </p>
              </>
            )}

            <div className="space-y-2 mt-5">
              <label className="flex items-top space-x-2">
                <input
                  type="checkbox"
                  {...register('agreed')}
                  className="form-checkbox h-4 w-4 text-blue-600 flex-shrink-0 mt-1"
                />
                <span className="text-md">
                  I have read and agree to the ScholarX {guideType} Guide
                </span>
              </label>
              {errors.agreed && (
                <p className="text-red-500 text-sm ml-6">
                  {errors.agreed.message}
                </p>
              )}

              <label className="flex items-top space-x-2">
                <input
                  type="checkbox"
                  {...register(isMentor ? 'canCommit' : 'consentGiven')}
                  className="form-checkbox h-4 w-4 text-blue-600 flex-shrink-0 mt-1"
                />
                <span className="text-md">
                  {isMentor
                    ? 'Are you able to commit to a period of 6 months for the program? (We expect a minimum of 6 calls with a mentee in a span of 6 month period)'
                    : 'I grant Sustainable Foundation Education permission to use my video submission solely for the internal evaluation of my application to ScholarX.'}
                </span>
              </label>
              {(errors.canCommit ?? errors.consentGiven) && (
                <p className="text-red-500 text-sm ml-6">
                  {errors.canCommit?.message ?? errors.consentGiven?.message}
                </p>
              )}
            </div>
          </div>

          <div className="px-6 py-3 flex justify-end rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Agree and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsAgreementModal;
