import {
  useQuery,
  type QueryFunction,
  type QueryKey,
  useMutation,
  useQueryClient,
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
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<Mentee[], AxiosError>({
    initialData: [],
    queryKey: ['mentees'],
    queryFn: fetchMentees,
  });

  const {
    mutate: updateMenteeStatus,
    isSuccess,
    isPending,
    isError,
    error: updateError,
  } = useMutation({
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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentee'] });
    },
  });

  return {
    isLoading,
    isSuccess,
    updateError,
    isError,
    isPending,
    updateMenteeStatus,
    error,
    data,
  };
};
