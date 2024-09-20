import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants';

import { Mentee, MenteeCheckInForm } from '../types';

interface CheckIn {
  id: string;
  menteeId: string;
  title: string;
  date: string;
  links: string[];
  mentorChecked: boolean;
  mentorCheckedDate: string;
  mentorFeedback?: string;
  generalUpdates?: string;
  progressTowardsGoals?: string;
  menteeDetails: Mentee;
}

const useSubmitCheckIn = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: submitCheckIn,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: MenteeCheckInForm) => {
      await axios.post(`${API_URL}/mentees/checkin`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['menteeCheckIns'] });
    },
  });

  return {
    submitCheckIn,
    isSuccess,
    isError,
    error,
  };
};

const useMonthlyCheckIns = (menteeId: string) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<CheckIn[], AxiosError>({
    queryKey: ['menteeCheckIns', menteeId],
    queryFn: async () => {
      if (menteeId != null) {
        try {
          const { data } = await axios.get(
            `${API_URL}/mentees/checkin/${menteeId}`,
            {
              withCredentials: true,
            }
          );
          return data.checkIns as CheckIn[];
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            void queryClient.invalidateQueries({ queryKey: ['currentUser'] });
          }
          throw error;
        }
      }
      return [];
    },
    enabled: menteeId != null,
    initialData: undefined,
  });

  return { isLoading, error, data };
};

export { useSubmitCheckIn, useMonthlyCheckIns };
