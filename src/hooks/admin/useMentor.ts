import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../../constants';
import axios from 'axios';
import { type Mentor } from '../../types';

const useMentor = (mentorId: string | undefined) => {
  const queryClient = useQueryClient();

  const { isFetching, error, data } = useQuery({
    queryKey: ['mentor', mentorId],
    initialData: null,
    enabled: !(mentorId == null),
    queryFn: async () => {
      if (mentorId != null) {
        const { data } = await axios.get(
          `${API_URL}/admin/mentors/${mentorId}`,
          { withCredentials: true }
        );
        return data.mentor as Mentor;
      }
    },
  });

  const {
    mutate: changeState,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationFn: async (newState: string) => {
      if (mentorId != null) {
        const { data } = await axios.put(
          `${API_URL}/admin/mentors/${mentorId}/state`,
          {
            state: newState,
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
    isFetching,
    error,
    data,
    changeState,
    isSuccess,
    isError,
    isPending,
  };
};

export default useMentor;
