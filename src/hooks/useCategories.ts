import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';

const useCategories = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    initialData: [],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/categories`);
      return data.categories;
    },
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useCategories;
