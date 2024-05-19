import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Mentee } from '../types';

const useMyApplications = (type: 'mentee' | 'mentor') => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['mentor'],
    initialData: null,
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/me/applications?type=${type}`,
        {
          withCredentials: true,
        }
      );

      return data.applications as Mentee[];
    },
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useMyApplications;
