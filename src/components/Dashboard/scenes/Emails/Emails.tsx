import React, { useState } from 'react';
import EmailTemplate from './EmailTemplate';
import EmailHistory from './EmailHistory';

const Emails: React.FC = () => {
  const [mentees, setMentees] = useState([]);
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [view, setView] = useState('sent');

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

  return (
    <div>
      <div className="container mx-auto p-4 bg-white min-h-full min-w-full">
        <h1 className="text-2xl font-medium my-4">Send Emails</h1>
        <hr className="my-4" />
        <p className="mb-4 text-lg font-bold">
          Email API Status: <span className="text-green-500">Connected</span>
        </p>
        <div className="flex space-x-2">
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
            <div className="flex space-x-6">
              <div className="w-2/3 space-y-4 p-6 rounded-lg  bg-gray-100 shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-500">
                  Write Email here
                </h2>
                <div className="bg-white p-4 rounded shadow">
                  <form>
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
                        <input
                          type="email"
                          value={selectedMentees}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
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
                      <input
                        type="submit"
                        value="Send"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                      />
                    </div>
                  </form>
                  <hr className="my-4" />
                  <div className="w-full mt-6 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-2 text-blue-500">
                      Email Sending Status:
                    </h2>
                    <div className="bg-white p-4 rounded shadow">
                      <p>Live updates will appear here...</p>
                    </div>
                  </div>
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
            <EmailHistory />
          </>
        )}
      </div>
    </div>
  );
};

export default Emails;
