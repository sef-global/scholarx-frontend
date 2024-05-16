import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { EMAILAPI_URL } from '../../../../constants';
import LoadingSVG from '../../../../assets/svg/LoadingSVG';
import { type Email } from '../../../../types';

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
              <LoadingSVG />
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
