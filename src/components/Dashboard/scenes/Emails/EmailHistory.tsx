import React from 'react';
import LoadingSVG from '../../../../assets/svg/LoadingSVG';
import { useFetchEmails } from '../../../../hooks/useFetchEmails';

const EmailHistory: React.FC<{ refreshCount: number }> = () => {
  const { data: emails, isLoading } = useFetchEmails();

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
