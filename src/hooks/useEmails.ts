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

export const useEmails = () => {
  const mutation = useMutation({
    mutationFn: async (emailData: EmailData): Promise<SendEmailsResponse> => {
      const response = await axios.post(
        `${EMAILAPI_URL}/api/v1/send`,
        emailData
      );
      return response.data;
    },
  });

  const sendEmail = (
    formData: EmailData,
    { onSuccess, onError }: { onSuccess: () => void; onError: () => void }
  ) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: () => {
        onError();
      },
    });
  };

  const { isLoading, error, data } = useQuery<Email[], AxiosError>({
    queryKey: ['emails'],
    queryFn: fetchEmails,
  });

  return {
    isLoading,
    error,
    data,
    sendEmail,
  };
};
