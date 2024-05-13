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

  const { mutate: changeState } = useMutation({
    mutationFn: async (newState: string) => {
      if (mentorId != null) {
        const { data } = await axios.put(
          `${API_URL}/mentors/${mentorId}/state`,
          {
            state: newState,
          }
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
    data,
    changeState,
  };
};

export default useMentor;
