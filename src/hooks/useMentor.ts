import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type MentorApplication, type Mentor } from '../types';

const useMentor = (mentorId: string | null | undefined) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['mentor', mentorId],
    enabled: !(mentorId == null),
    queryFn: async () => {
      if (mentorId != null) {
        const { data } = await axios.get(`${API_URL}/mentors/${mentorId}`);
        return data.mentor as Mentor;
      }
    },
  });

  const { mutateAsync: updateAvailability } = useMutation({
    mutationFn: async (availability: boolean) => {
      if (mentorId != null) {
        const { data } = await axios.put(
          `${API_URL}/mentors/${mentorId}/availability`,
          {
            availability,
          },
          { withCredentials: true }
        );
        return data;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentor', mentorId] });
    },
  });

  const {
    mutateAsync: createMentorApplication,
    error: applicationError,
    isSuccess: applicationSuccess,
    isError: isApplicationError,
    isPending: isApplicationSubmitting,
  } = useMutation({
    mutationFn: async (data: MentorApplication) => {
      await axios.post(
        `${API_URL}/mentors`,
        {
          application: data,
          categoryId: data.category,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentor', mentorId] });
    },
  });

  return {
    isLoading,
    error,
    updateAvailability,
    createMentorApplication,
    applicationSuccess,
    isApplicationSubmitting,
    applicationError,
    isApplicationError,
    data,
  };
};

export default useMentor;
