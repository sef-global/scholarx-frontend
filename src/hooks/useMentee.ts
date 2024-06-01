import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentee } from '../types';

const useMentee = (menteeId: string | undefined) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['mentee', menteeId],
    initialData: null,
    enabled: !(menteeId == null),
    queryFn: async () => {
      if (menteeId != null) {
        const { data } = await axios.get(`${API_URL}/mentees/${menteeId}`);
        return data.mentee as Mentee;
      }
    },
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useMentee;
