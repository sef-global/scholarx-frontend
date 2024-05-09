import {
  useQuery,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../constants';
import { type Mentee } from '../types';

const fetchMentees: QueryFunction<Mentee[], QueryKey> = async () => {
  const response = await axios.get(`${API_URL}/mentors/mentees`, {
    withCredentials: true,
  });
  return response.data.mentees;
};

export const useMentees = () => {
  const { isLoading, error, data } = useQuery<Mentee[], AxiosError>({
    queryKey: ['mentees'],
    queryFn: fetchMentees,
  });

  return {
    isLoading,
    error,
    data,
  };
};
