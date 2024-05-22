import {
  useQuery,
  type QueryFunction,
  type QueryKey,
  useMutation,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { EMAILAPI_URL } from '../constants';
import { type Email, type EmailData, type SendEmailsResponse } from '../types';

const fetchEmails: QueryFunction<Email[], QueryKey> = async () => {
  const response = await axios.get(`${EMAILAPI_URL}/api/v1/sent`);
  return response.data.emails;
};

const sendEmail = async (emailData: EmailData): Promise<SendEmailsResponse> => {
  const response = await axios.post(`${EMAILAPI_URL}/api/v1/send`, emailData);
  return response.data;
};

export const useEmails = () => {
  const useSendEmail = () => {
    const mutation = useMutation({
      mutationFn: sendEmail,
    });

    return mutation;
  };

  const { isLoading, error, data } = useQuery<Email[], AxiosError>({
    queryKey: ['emails'],
    queryFn: fetchEmails,
  });

  const mutation = useSendEmail();

  return {
    isLoading,
    error,
    data,
    mutation,
    isPending: mutation.status === 'pending',
    responseMessage: mutation.data?.message,
  };
};
