import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../constants';

import { MenteeCheckInForm } from '../types';

export const useSubmitCheckIn = () => {
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
