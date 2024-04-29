import React, { useEffect, useState, useCallback } from 'react';
import EmailTemplate from './EmailTemplate';
import EmailHistory from './EmailHistory';
import axios from 'axios';

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  const fetchEmails = useCallback(() => {
    setIsRefreshing(true);
    axios
      .get('http://localhost:4000/api/v1/sent')
      .then((response) => {
        setEmails(response.data.recipient);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsRefreshing(true);
      });
  }, []);

  useEffect(fetchEmails, []);

  // useEffect(() => {
  //   // Fetch mentees from backend API
  //   // Replace with your actual API call
  //   fetch('/api/mentees')
  //     .then(async (response) => await response.json())
  //     .then((data) => {
  //       setMentees(data);
  //     });
  // }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission here
  // };

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/v1/healthcheck')
      .then((response) => {
        if (response.data.status === 'available') {
          setApiStatus('Connected');
        } else {
          setApiStatus('Disconnected');
        }
      })
      .catch((error) => {
        setApiStatus('Error');
        console.log('Error:', error);
      });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSent(true);
    e.preventDefault();
    const emailData = {
      sender: 'mayuraalahakoon@gmail.com',
      recipients: selectedMentees,
      subject,
      body,
    };

    try {
      const response = await fetch('http://localhost:4000/api/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMessage('Emails succesfuly sent');
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsSent(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 bg-white max-h-[500px] overflow-y-auto min-h-full min-w-full">
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
                          className="mt-4 block w-full rounded-md border-gray-300 shadow-sm"
                          onChange={(e) => {
                            switch (e.target.value) {
                              case 'allMentors':
                                setSelectedMentees(allMentorsEmails);
                                break;
                              case 'acceptedMentors':
                                setSelectedMentees(acceptMentorsEmails);
                                break;
                              case 'acceptedMentees':
                                setSelectedMentees(acceptedMenteesEmails);
                                break;
                              case 'rejectedMentees':
                                setSelectedMentees(rejectedMenteesEmails);
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
                      <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                      >
                        {setMessage && <p className="mt-4">{setMessage}</p>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-1/2 bg-gray-100 space-y-4 p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-500">
                  Email Preview here
                </h2>
                <div className="bg-white p-4 rounded shadow">
                  <EmailTemplate subject={subject} body={body} recipient={''} />
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
