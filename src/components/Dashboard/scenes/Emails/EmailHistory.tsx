import React from 'react';
import LoadingSVG from '../../../../assets/svg/Loading';
import { useEmails } from '../../../../hooks/useEmails';

const EmailHistory: React.FC = () => {
  const { data: emails, isLoading } = useEmails();

  return (
    <div className="container mx-auto p-4 bg-white max-h-[800px] overflow-y-auto min-h-full min-w-full">
      <div className="flex flex-col items-center justify-center ">
        <span role="img" aria-label="mailbox" className="text-4xl">
          {emails != null && emails.length > 0 ? '📬' : '📭'}
        </span>
        <p className="text-2xl font-bold mb-4">Mail Box</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSVG />
          </div>
        ) : emails != null && emails.length > 0 ? (
          <table className="w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider w-1/5">
                  Recipient
                </th>
                <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider w-1/5">
                  Subject
                </th>
                <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider w-1/5">
                  Sent Status
                </th>
                <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider w-1/5">
                  Open Status
                </th>
                <th className="px-6 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 tracking-wider w-1/5">
                  Sent Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {emails.map((email, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/5">
                    {email.recipients}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/5">
                    {email.subject}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/5">
                    {email.status}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/5">
                    {email.opened}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200 w-1/5">
                    {new Date(email.sentTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg text-gray-600">No mails</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailHistory;
