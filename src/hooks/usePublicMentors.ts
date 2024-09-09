import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../constants';
import { type Mentor } from '../types';

interface MentorsResponse {
  items: Mentor[];
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
}

const fetchPublicMentors = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: Array<string | number | null>;
}): Promise<MentorsResponse> => {
  const [, category, pageSize] = queryKey;
  let url = `${API_URL}/mentors?pageNumber=${pageParam}&pageSize=${
    pageSize ?? ''
  }`;
  if (category != null) {
    url += `&categoryId=${category}`;
  }
  const response = await axios.get<MentorsResponse>(url, {
    withCredentials: true,
  });
  return response.data;
};

export const usePublicMentors = (categoryId: string | null, pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['public-mentors', categoryId, pageSize],
    queryFn: fetchPublicMentors,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length < pageSize) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};
