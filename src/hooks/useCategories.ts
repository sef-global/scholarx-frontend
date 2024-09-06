import { useInfiniteQuery } from '@tanstack/react-query';
import { API_URL } from '../constants';
import axios from 'axios';
import { type Category } from '../types';

interface CategoriesResponse {
  items: Category[];
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
}

const fetchCategories = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: Array<string | number | null>;
}): Promise<CategoriesResponse> => {
  const [pageSize] = queryKey as [number];
  const response = await axios.get<CategoriesResponse>(
    `${API_URL}/categories?pageNumber=${pageParam}&pageSize=${pageSize}`
  );
  return response.data;
};

const useCategories = (pageNumber = 1, pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: [pageNumber, pageSize],
    queryFn: fetchCategories,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length < pageSize) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

export default useCategories;
