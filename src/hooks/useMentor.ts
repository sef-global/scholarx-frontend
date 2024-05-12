import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentor } from '../types';

const useMentor = (mentorId: string | undefined) => {
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

  return {
    isLoading,
    error,
    data,
  };
};

export default useMentor;
