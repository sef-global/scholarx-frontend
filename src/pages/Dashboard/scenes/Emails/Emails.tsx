import React, { useEffect, useState, useCallback } from 'react';
import EmailTemplate from './EmailTemplate';
import EmailHistory from './EmailHistory';
import axios from 'axios';
import CheckButton from './CheckButton';
import { EMAILAPI_URL } from '../../../../constants';

const Emails: React.FC = () => {
  const [mentees, setMentees] = useState([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [view, setView] = useState('sent');
  const [showRefresh, setShowRefresh] = useState(false);
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [emails, setEmails] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [select, setSelect] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchEmails = useCallback(() => {
    axios
      .get(`${EMAILAPI_URL}/api/v1/sent`)
      .then((response) => {
        setEmails(response.data.recipient);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(fetchEmails, []);

  const checkApiStatus = () => {
    setIsLoading(true);
    axios
      .get(`${EMAILAPI_URL}/api/v1/healthcheck`)
      .then((response) => {
        setTimeout(() => {
          if (response.data.status === 'available') {
            setApiStatus('Connected');
          } else {
            setApiStatus('Disconnected');
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setApiStatus('Error');
          setMessage(`Error : ${(error as Error).message}`);
        }, 1000);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };
  useEffect(() => {
    checkApiStatus();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailData = {
      sender: 'mayuraalahakoon@gmail.com',
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
      console.log(response);
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
      }, 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <div>
      <div className="container mx-auto p-4 bg-white max-h-[800px] overflow-y-auto min-h-full min-w-full">
        <h1 className="text-2xl font-medium my-4">Send Emails</h1>
        <hr className="my-4" />
        <p className="mb-4 text-lg font-bold">
          Email API Status:{' '}
          <span
            className={
              apiStatus === 'Connected' ? 'text-green-500' : 'text-red-500'
            }
          >
            {apiStatus}
          </span>
          <CheckButton isLoading={isLoading} checkApiStatus={checkApiStatus} />
        </p>
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
                          onChange={(e) => {
                            switch (e.target.value) {
                              case 'allMentors':
                                setSelectedMentees(allMentorsEmails);
                                setSelect('Mentor');
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
                          }}
                        >
                          <option value="">Select recipient group</option>
                          <option value="allMentors">All Mentors</option>
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
                                <svg
                                  aria-hidden="true"
                                  className="inline w-5 h-5 text-gray-200 animate-spin fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                                <span className="sr-only">Loading...</span>
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
