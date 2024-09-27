import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants';

import {
  MenteeCheckInForm,
  MentorFeedbackForm,
  MonthlyCheckIn,
} from '../types';

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

  const { isLoading, error, data, refetch } = useQuery<
    MonthlyCheckIn[],
    AxiosError
  >({
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
          return data.checkIns as MonthlyCheckIn[];
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

  return { isLoading, error, data, refetch };
};

const useMentorFeedback = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: submitMentorFeedback,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data: MentorFeedbackForm) => {
      await axios.put(`${API_URL}/mentees/checking/feedback`, data, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentorCheckIns'] });
    },
  });

  return {
    submitMentorFeedback,
    isSuccess,
    isError,
    error,
  };
};

export { useSubmitCheckIn, useMonthlyCheckIns, useMentorFeedback };
