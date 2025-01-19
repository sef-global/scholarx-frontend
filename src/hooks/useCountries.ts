import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';

const useCountries = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['countries'],
    initialData: [],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/countries`);
      return data.data;
    },
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useCountries;
