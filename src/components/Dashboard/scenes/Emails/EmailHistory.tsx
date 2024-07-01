import type React from 'react';
import Loading from '../../../../assets/svg/Loading';
import { useEmails } from '../../../../hooks/useEmails';

function getUsername(email: string) {
  const emailParts = email.split('@');
  return emailParts[0];
}

const EmailHistory: React.FC = () => {
  const { data: emails, isLoading } = useEmails();

  return (
    <div className="container mx-auto p-4 bg-white max-h-[500px] overflow-y-auto min-w-fit min-h-fit">
      <div className="flex flex-col items-center justify-center">
        <span role="img" aria-label="mailbox" className="text-4xl">
          {emails != null && emails.length > 0 ? '📬' : '📭'}
        </span>
        <p className="text-2xl font-bold mb-4">Mail Box</p>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : emails != null && emails.length > 0 ? (
          <table className="divide-y divide-gray-200 shadow-sm rounded-lg overflow-y-scroll">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 tracking-wider">
                <th className="px-2 py-1 whitespace-nowrap w-1/5 md:w-1/5">
                  Subject
                </th>
                <th className="px-2 py-1 whitespace-nowrap truncate overflow-hidden w-1/5 md:w-1/5">
                  Recipient
                </th>
                <th className="px-2 py-1 whitespace-nowrap w-1/5 md:w-1/5">
                  Sent Status
                </th>
                <th className="px-2 py-1 whitespace-nowrap w-1/5 md:w-1/5">
                  Open Status
                </th>
                <th className="px-2 py-1 whitespace-nowrap w-1/5 md:w-1/5">
                  Sent Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((email, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 whitespace-nowrap text-sm truncate overflow-hidden w-full md:w-2/6 text-center">
                    {email.subject.split(' ').slice(0, 4).join(' ') +
                      (email.subject.split(' ').length > 4 ? '...' : '')}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm w-full md:w-1/6 text-center">
                    {getUsername(email.recipients)}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm justify-center items-center w-full md:w-1/6 text-center">
                    {email.status}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm w-full md:w-1/6 text-center">
                    {email.opened}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-sm w-full md:w-1/6 text-center">
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
