import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const termsSchema = z.object({
  agreed: z.boolean().refine((val) => val, {
    message: 'You must agree to the ScholarX Mentee/Mentor Guide 2024',
  }),
  consentGiven: z.boolean().refine((val) => val, {
    message: 'You must give consent to proceed',
  }),
});

type TermsFormData = z.infer<typeof termsSchema>;

interface TermsAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: (data: TermsFormData) => void;
}

const TermsAgreementModal: React.FC<TermsAgreementModalProps> = ({
  isOpen,
  onClose,
  onAgree,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TermsFormData>({
    resolver: zodResolver(termsSchema),
    mode: 'onChange',
    defaultValues: {
      agreed: false,
      consentGiven: false,
    },
  });

  const onSubmit = (data: TermsFormData) => {
    if (isValid) {
      console.log('Form is valid. Submitting data:', data);
      onAgree(data);
    } else {
      console.log('Form is invalid. Errors:', errors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-full md:max-w-4xl w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-bold mb-4">
              ScholarX Mentee Guide 2024
            </h2>
            <div className="h-96 overflow-y-auto mb-4 p-4 border border-gray-200 rounded bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Introduction</h3>
              <p className="mb-5">
                Welcome to ScholarX! This guide is designed to help you navigate
                through the ScholarX mentoring program, ensuring you make the
                most out of this valuable opportunity.
              </p>

              <h3 className="text-lg font-semibold mb-2">What is ScholarX?</h3>
              <p className="mb-5">
                ScholarX is a 6-month mentoring program designed by the
                Sustainable Education Foundation to connect Sri Lankan
                undergraduate students with global experts from academia and
                industry. This program aims to enrich students&apos; academic
                and professional journey, providing valuable guidance and
                opportunities for personal and career growth.
              </p>

              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <ul className="list-disc list-inside mb-5">
                <li>
                  <strong>Initiate Contact:</strong> Once matched, your mentor
                  will send the first email. Promptly respond and arrange the
                  first meeting.
                  <br />
                  <em>
                    If you don’t receive a mail within 1 week of matching a
                    mentor, let us know to check with the mentor.
                  </em>
                </li>
                <li>
                  <strong>Establish Ground Rules:</strong> Discuss and set
                  expectations, including the frequency of meetings and
                  communication methods.
                </li>
                <li>
                  <strong>Preferred Platforms:</strong>
                  <ul className="list-disc list-inside ml-5">
                    <li>Zoom</li>
                    <li>Google Meet</li>
                    <li>Skype</li>
                    <li>Messenger</li>
                  </ul>
                </li>
                <li>
                  <strong>Preparation:</strong>
                  <ul className="list-disc list-inside ml-5">
                    <li>Prepare questions for your mentor.</li>
                    <li>
                      Bring necessary resources (e.g., CVs, research papers).
                    </li>
                    <li>Complete any tasks assigned by your mentor.</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Mentoring Sessions</h3>
              <p className="mb-2">
                <strong>Focus Areas:</strong>
              </p>
              <ul className="list-disc list-inside mb-5 ml-5">
                <li>Learn through reflection on your mentor’s experiences.</li>
                <li>Follow recommended online courses and certifications.</li>
                <li>
                  Seek guidance on international competitions and scholarships.
                </li>
                <li>Discuss professional tools and methods.</li>
                <li>
                  General career guidance and project collaboration if possible.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Checkpoints</h3>
              <ul className="list-disc list-inside mb-5">
                <li>
                  <strong>First Meeting:</strong> Ensure your mentor contacts
                  you and schedules the first meeting.
                </li>
                <li>
                  <strong>Monthly Check-ins:</strong> Submit monthly updates on
                  your progress{' '}
                  <a href="https://forms.gle/eXchAtQPvh5xad3P7">
                    <u>via the provided Google form.</u>
                  </a>
                </li>
                <li>
                  <strong>Public Sharing:</strong> Make at least 3 media
                  submissions during the 6-month period. Include links in the
                  monthly check-ins.
                  <ul className="list-disc list-inside ml-5">
                    <li>
                      <strong>Types of Media:</strong>
                    </li>
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Written: Blogs on personal websites, Medium Blogspot.
                      </li>
                      <li>Video: YouTube, Facebook.</li>
                      <li>Audio: Anchor, YouTube, podcasts.</li>
                    </ul>
                  </ul>
                </li>
                <li>
                  <strong>Social Media:</strong> Share your experience using
                  hashtags #SEF and #ScholarX.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Etiquette</h3>
              <ul className="list-disc list-inside mb-5">
                <li>
                  <strong>Commitment:</strong> Adhere to scheduled meetings and
                  inform your mentor in advance if you need to reschedule.
                </li>
                <li>
                  <strong>Proactivity:</strong> Actively seek feedback and
                  advice.
                </li>
                <li>
                  <strong>Mutual Respect:</strong> Remember, mentorship is a
                  two-way relationship. Be open to learning and sharing ideas.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Conclusion</h3>
              <p>
                A concluding ceremony will round off the program, with a date to
                be determined. Maintaining contact with your mentor after the
                program is at their discretion.
                <br />
                For any questions, please contact the Program Manager at
                sustainableedufoundation@gmail.com.
              </p>
            </div>

            <div className="space-y-2 mt-8">
              <label className="flex items-top space-x-2">
                <input
                  type="checkbox"
                  {...register('agreed')}
                  className="form-checkbox h-4 w-4 text-blue-600 flex-shrink-0 mt-1"
                />
                <span className="text-md">
                  I have read and agree to the ScholarX Mentee/Mentor Guide 2024
                </span>
              </label>
              {errors.agreed && (
                <p className="text-red-500 text-sm">{errors.agreed.message}</p>
              )}

              <label className="flex items-top space-x-2">
                <input
                  type="checkbox"
                  {...register('consentGiven')}
                  className="form-checkbox h-4 w-4 text-blue-600 flex-shrink-0 mt-1"
                />
                <span className="text-md">
                  I grant Sustainable Foundation Education permission to use my
                  video submission solely for the internal evaluation of my
                  application to ScholarX.
                </span>
              </label>
              {errors.consentGiven && (
                <p className="text-red-500 text-sm">
                  {errors.consentGiven.message}
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
