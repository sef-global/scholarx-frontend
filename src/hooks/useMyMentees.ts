import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentee } from '../types';

const useMyMentees = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['mentor'],
    initialData: null,
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/mentors/mentees`, {
        withCredentials: true,
      });
      return data.mentees as Mentee[];
    },
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useMyMentees;
