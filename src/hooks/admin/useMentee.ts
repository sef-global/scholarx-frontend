import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../../constants';
import axios from 'axios';
import { type Mentee } from '../../types';

const useMentee = (menteeId: string | undefined) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['mentee', menteeId],
    initialData: null,
    enabled: !(menteeId == null),
    queryFn: async () => {
      if (menteeId != null) {
        const { data } = await axios.get(
          `${API_URL}/admin/mentees/${menteeId}`,
          { withCredentials: true }
        );
        return data.mentee as Mentee;
      }
    },
  });

  const { mutate: changeState } = useMutation({
    mutationFn: async (newState: string) => {
      if (menteeId != null) {
        const { data } = await axios.put(
          `${API_URL}/admin/mentees/${menteeId}/state`,
          {
            state: newState,
          }
        );
        return data;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['mentee', menteeId] });
    },
  });

  return {
    isLoading,
    error,
    data,
    changeState,
  };
};

export default useMentee;
