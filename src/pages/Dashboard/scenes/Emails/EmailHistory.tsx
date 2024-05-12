import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { EMAILAPI_URL } from '../../../../constants';

interface Email {
  recipients: string;
  subject: string;
  status: string;
  opened: boolean;
  sentTime: string;
}

const EmailHistory: React.FC<{ refreshCount: number }> = ({ refreshCount }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmails = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get(`${EMAILAPI_URL}/api/v1/sent`)
        .then((response) => {
          setEmails(
            Array.isArray(response.data.emails) ? response.data.emails : []
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }, 1000);
  }, []);
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails, refreshCount]);

  return (
    <div className="container mx-auto p-4 bg-white max-h-[800px] overflow-y-auto min-h-full min-w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mb-4">History</p>
        <button
          onClick={fetchEmails}
          className="px-8 py-1 m-3 text-white bg-red-300 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 flex justify-center items-center"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <>
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <span role="img" aria-label="empty mailbox" className="text-6xl">
              📭
            </span>
            <p className="text-lg text-gray-600">No mails</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opened
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((email, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {email.recipients}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {email.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {email.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {email.opened}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(email.sentTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmailHistory;