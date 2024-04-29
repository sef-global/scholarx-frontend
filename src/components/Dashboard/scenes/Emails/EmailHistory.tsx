import React from 'react';

const EmailHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold mb-4">History</p>
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
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Opened
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sent Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Opened Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              mayuraalahakoon@gmail.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Congratulations🎉</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button className="px-2 py-2 bg-blue-500 text-white rounded">
                Resend
              </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Not Opened</td>
            <td className="px-6 py-4 whitespace-nowrap"> Failed </td>
            <td className="px-6 py-4 whitespace-nowrap"> - </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              mayuraalahakoon@gmail.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Congratulations🎉</td>
            <td className="px-6 py-4 whitespace-nowrap">Sent</td>
            <td className="px-6 py-4 whitespace-nowrap">Opened</td>
            <td className="px-6 py-4 whitespace-nowrap">16:58 PM</td>
            <td className="px-6 py-4 whitespace-nowrap">20.43 PM</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              mayuraalahakoon@gmail.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Congratulations🎉</td>
            <td className="px-6 py-4 whitespace-nowrap">Sent</td>
            <td className="px-6 py-4 whitespace-nowrap">Opened</td>
            <td className="px-6 py-4 whitespace-nowrap">16:58 PM</td>
            <td className="px-6 py-4 whitespace-nowrap">20.43 PM</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              mayuraalahakoon@gmail.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap">Congratulations🎉</td>
            <td className="px-6 py-4 whitespace-nowrap">Sent</td>
            <td className="px-6 py-4 whitespace-nowrap">Opened</td>
            <td className="px-6 py-4 whitespace-nowrap">16:58 PM</td>
            <td className="px-6 py-4 whitespace-nowrap">20.43 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmailHistory;
