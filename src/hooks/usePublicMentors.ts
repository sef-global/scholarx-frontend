import {
  useQuery,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { API_URL } from '../constants';
import { type MentorCardType } from '../types';

const fetchPublicMentors: QueryFunction<MentorCardType[], QueryKey> = async ({
  queryKey,
}) => {
  const [, category]: [string, string] = queryKey as [string, string];
  let url = `${API_URL}/mentors`;
  if (category !== '' && category != null) {
    url += `?categoryId=${category}`;
  }
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data.mentors;
};

export const usePublicMentors = (categoryId?: string) => {
  const { isLoading, error, data } = useQuery<MentorCardType[], AxiosError>({
    queryKey: ['public-mentors', categoryId],
    queryFn: fetchPublicMentors,
  });

  return {
    isLoading,
    error,
    data,
  };
};
