import React, { useState } from 'react';
import EmailHistory from '../../../../components/Dashboard/scenes/Emails/EmailHistory';
import { EMAILAPI_SENDER } from '../../../../constants';
import Loading from '../../../../assets/svg/Loading';
import { useSendEmail } from '../../../../hooks/useEmails';
import { type EmailData } from '../../../../types';

const Emails: React.FC = () => {
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [view, setView] = useState('sent');
  const [select, setSelect] = useState('');
  const [message, setMessage] = useState('');
  const sendEmailMutation = useSendEmail();

  const [formData, setFormData] = useState<EmailData>({
    sender: EMAILAPI_SENDER,
    recipients: [],
    subject: '',
    body: '',
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailMutation.mutation.mutate(formData, {
      onSuccess: () => {
        setMessage('Email sent successfully');
      },
      onError: () => {
        setMessage('Error sending email');
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRecipientsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      recipients: value.split(','),
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`Selected: ${e.target.value}`);
    switch (e.target.value) {
      case 'allMentors':
        setSelect('Mentor');
        break;
      case 'allMentees':
        setSelect('Mentees');
        break;
      case 'acceptedMentors':
        setSelect('Mentor');
        break;
      case 'acceptedMentees':
        setSelect('Mentees');
        break;
      case 'rejectedMentees':
        setSelect('Mentees');
        break;
      default:
        setSelectedMentees([]);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 bg-white max-h-[800px] overflow-y-auto min-h-full min-w-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-medium my-4">Send Emails</h1>
          <button
            onClick={() => {
              setView('sent');
            }}
            className="px-8 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Sent
          </button>
          <button
            onClick={() => {
              setView('history');
            }}
            className="px-8 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            History
          </button>
        </div>
        <hr className="my-4" />
        {view === 'sent' ? (
          <>
            <div className="flex flex-col space-y-2">
              <div className="p-6 rounded-lg  bg-gray-100 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold mb-2 text-blue-500">
                    Write Email here
                  </h2>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-gray-700">Subject:</span>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          placeholder="Write subject here"
                          onChange={handleInputChange}
                          className="mt-1 px-4 py-4 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Recipients:</span>
                        <select
                          className="mt-4 block w-full p-3 rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-gray-700"
                          onChange={handleSelectChange}
                        >
                          <option value="">Select recipient group</option>
                          <option value="allMentors">All Mentors</option>
                          <option value="allMentees">All Mentees</option>
                          <option value="acceptedMentors">
                            Accepted Mentors
                          </option>
                          <option value="acceptedMentees">
                            Accepted Mentees
                          </option>
                          <option value="rejectedMentees">
                            Rejected Mentees
                          </option>
                        </select>
                        <textarea
                          name="recipients"
                          value={formData.recipients.join(',')}
                          onChange={handleRecipientsChange}
                          placeholder="Enter recipient emails, separated by commas"
                          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Body:</span>
                        <textarea
                          name="body"
                          value={formData.body}
                          placeholder="Write body message here"
                          onChange={handleInputChange}
                          className="mt-2 px-4 py-4 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </label>
                      <div>
                        {sendEmailMutation.isLoading ? (
                          <button
                            type="submit"
                            className="mt-4 x-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                          >
                            <div className="flex justify-center items-center h-5 px-6 py-2">
                              <>
                                <Loading />
                              </>
                            </div>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                          >
                            Send
                          </button>
                        )}
                        {message.length > 0 && (
                          <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md my-3">
                            {message}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmailHistory />
        )}
      </div>
    </div>
  );
};

export default Emails;
