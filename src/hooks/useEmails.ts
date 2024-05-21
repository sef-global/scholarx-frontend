import {
  useQuery,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { EMAILAPI_URL } from '../constants';
import { type Email, type EmailData, type SendEmailsResponse } from '../types';

const fetchEmails: QueryFunction<Email[], QueryKey> = async () => {
  const response = await axios.get(`${EMAILAPI_URL}/api/v1/sent`);
  return response.data.emails;
};

// const sendEmails = async (emailData: any) => {
//   return {
//     mutationFn: async () => {
//       try {
//         const response = await axios.post(
//           `${EMAILAPI_URL}/api/v1/send`,
//           emailData
//         );

//         if (response.status !== 201) {
//           throw new Error(`HTTP error: ${response.statusText}`);
//         }
//         return response.data;
//       } catch (error) {
//         throw new Error(`Error sending email: ${error.message}`);
//       }
//     },
//   };
// };

const useEmails = () => {
  const { isLoading, error, data } = useQuery<Email[], AxiosError>({
    queryKey: ['emails'],
    queryFn: fetchEmails,
  });

  return {
    isLoading,
    error,
    data,
  };
};

export { useEmails };
