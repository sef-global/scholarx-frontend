import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentor } from '../types';

const useMentor = (mentorId: string | undefined) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['mentor', mentorId],
    initialData: null,
    enabled: !(mentorId == null),
    queryFn: async () => {
      if (mentorId != null) {
        const { data } = await axios.get(`${API_URL}/mentors/${mentorId}`);
        return data.mentor as Mentor;
      }
    },
  });

  const { mutate: updateAvailability } = useMutation({
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

  return {
    isLoading,
    error,
    updateAvailability,
    data,
  };
};

export default useMentor;
