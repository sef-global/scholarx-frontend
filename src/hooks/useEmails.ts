import {
  useQuery,
  type QueryFunction,
  type QueryKey,
  useMutation,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { EMAILAPI_URL } from '../constants';
import {
  type MutationData,
  type Email,
  type EmailData,
  type SendEmailsResponse,
} from '../types';

const fetchEmails: QueryFunction<Email[], QueryKey> = async () => {
  const response = await axios.get(`${EMAILAPI_URL}/api/v1/sent`);
  return response.data.emails;
};

const sendEmail = async (emailData: EmailData): Promise<SendEmailsResponse> => {
  const response = await axios.post(`${EMAILAPI_URL}/api/v1/send`, emailData);
  return response.data;
};

const useSendEmail = () => {
  const mutation = useMutation({
    mutationFn: sendEmail,
  });

  return {
    mutation,
    isLoading: mutation.status === 'pending',
    responseMessage: mutation.data?.message,
  };
};

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

export { useEmails, useSendEmail };
