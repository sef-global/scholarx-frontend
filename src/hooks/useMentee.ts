import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentee } from '../types';

const useMentee = (menteeId?: string | undefined) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['mentee', menteeId],
    initialData: null,
    enabled: !(menteeId == null),
    queryFn: async () => {
      if (menteeId != null) {
        const { data } = await axios.get(`${API_URL}/mentees/${menteeId}`, {
          withCredentials: true,
        });
        return data.mentee as Mentee;
      }
    },
  });

  const { mutateAsync: revokeApplication, isPending: isRevoking } = useMutation(
    {
      mutationFn: async () => {
        const response = await axios.put(
          `${API_URL}/mentees/revoke-application`,
          null,
          {
            withCredentials: true,
          }
        );
        return response.data;
      },
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    }
  );

  return {
    isLoading,
    error,
    data,
    revokeApplication,
    isRevoking,
  };
};

export default useMentee;
