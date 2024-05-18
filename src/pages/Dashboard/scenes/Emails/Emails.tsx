import React, { useEffect, useState } from 'react';
import EmailTemplate from '../../../../components/Dashboard/scenes/Emails/EmailTemplate';
import EmailHistory from '../../../../components/Dashboard/scenes/Emails/EmailHistory';
import { EMAILAPI_URL, EMAILAPI_SENDER } from '../../../../constants';
import LoadingSmallSVG from '../../../../assets/svg/LoadingSmallSVG';

const Emails: React.FC = () => {
  const [mentees, setMentees] = useState([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [view, setView] = useState('sent');
  const [showRefresh, setShowRefresh] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [select, setSelect] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailData = {
      sender: `${EMAILAPI_SENDER}`,
      recipients: selectedMentees,
      subject,
      body,
    };
    setIsLoading(true);
    try {
      const response = await fetch(`${EMAILAPI_URL}api/v1/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }
      setMessage('Success: Emails sent!');
    } catch (error) {
      setMessage(`Error : ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'allMentors':
        setSelectedMentees(allMentorsEmails);
        setSelect('Mentor');
        break;
      case 'allMentees':
        setSelectedMentees(allMenteesEmails);
        setSelect('Mentees');
        break;
      case 'acceptedMentors':
        setSelectedMentees(acceptMentorsEmails);
        setSelect('Mentor');
        break;
      case 'acceptedMentees':
        setSelectedMentees(acceptedMenteesEmails);
        setSelect('Mentees');
        break;
      case 'rejectedMentees':
        setSelectedMentees(rejectedMenteesEmails);
        setSelect('Mentees');
        break;
      default:
        setSelectedMentees([]);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 bg-white max-h-[800px] overflow-y-auto min-h-full min-w-full">
        <h1 className="text-2xl font-medium my-4">Send Emails</h1>
        <hr className="my-4" />
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setView('sent');
              setShowRefresh(false);
            }}
            className="px-8 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Sent
          </button>
          <button
            onClick={() => {
              setView('history');
              setShowRefresh(true);
            }}
            className="px-8 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            History
          </button>
        </div>
        <hr className="my-4" />
        {view === 'sent' ? (
          <>
            <div className="flex space-x-6">
              <div className="w-2/3 space-y-4 p-6 rounded-lg  bg-gray-100 shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-500">
                  Write Email here
                </h2>
                <div className="bg-white p-4 rounded shadow">
                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-gray-700">Subject:</span>
                        <input
                          type="text"
                          value={subject}
                          placeholder="Write subject here"
                          onChange={(e) => {
                            setSubject(e.target.value);
                          }}
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
                          value={selectedMentees}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setSelectedMentees(e.target.value.split(','));
                          }}
                          placeholder="Enter recipient emails, separated by commas"
                          className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Body:</span>
                        <textarea
                          value={body}
                          placeholder="Write body message here"
                          onChange={(e) => {
                            setBody(e.target.value);
                          }}
                          className="mt-2 px-4 py-4 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </label>
                      <div>
                        {isLoading ? (
                          <button
                            type="submit"
                            className="mt-4 x-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                          >
                            <div className="flex justify-center items-center h-5 px-6 py-2">
                              Sending...
                              <>
                                <LoadingSmallSVG />
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
              <div className="w-1/2 bg-gray-100 space-y-4 p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-500">
                  Email Preview here
                </h2>
                <div className="bg-white p-4 rounded shadow">
                  <EmailTemplate
                    subject={subject}
                    body={body}
                    recipient={select}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <EmailHistory refreshCount={refreshCount} />
          </>
        )}
      </div>
    </div>
  );
};

export default Emails;
