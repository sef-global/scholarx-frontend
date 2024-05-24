import {
  useQuery,
  type QueryFunction,
  type QueryKey,
  useMutation,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../constants';
import { type Mentee } from '../types';
import { type ApplicationStatus } from '../enums';

const fetchMentees: QueryFunction<Mentee[], QueryKey> = async () => {
  const response = await axios.get(`${API_URL}/mentors/mentees`, {
    withCredentials: true,
  });
  return response.data.mentees;
};

export const useMentees = () => {
  const { isLoading, error, data } = useQuery<Mentee[], AxiosError>({
    initialData: [],
    queryKey: ['mentees'],
    queryFn: fetchMentees,
  });

  const { mutate: updateMenteeStatus } = useMutation({
    mutationFn: async ({
      menteeId,
      state,
    }: {
      menteeId: string;
      state: ApplicationStatus;
    }) => {
      await axios.put(
        `${API_URL}/mentees/${menteeId}/status`,
        {
          state,
        },
        { withCredentials: true }
      );
    },
  });

  return {
    isLoading,
    updateMenteeStatus,
    error,
    data,
  };
};
