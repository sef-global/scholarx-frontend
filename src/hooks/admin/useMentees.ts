import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { API_URL } from '../../constants';
import axios, { type AxiosError } from 'axios';
import { type Mentee } from '../../types';
import { type ApplicationStatus } from '../../enums';

interface MenteeStatus {
  menteeId: string;
  status: ApplicationStatus;
}

interface MenteeResponse {
  items: Mentee[];
  message: string;
  pageNumber: number;
  pageSize: number;
  totalItemCount: number;
}

type MenteesQueryKey = ['admin-mentees', string | null, number];

const fetchMentees = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<MenteesQueryKey, number>): Promise<MenteeResponse> => {
  const [, menteeStatus, pageSize] = queryKey;
  let url = `${API_URL}/admin/mentees/applications?pageNumber=${pageParam}&pageSize=${pageSize}`;
  if (menteeStatus !== null || menteeStatus !== '') {
    url += `&status=${menteeStatus}`;
  }
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

const updateMenteeStatus = async ({ menteeId, status }: MenteeStatus) => {
  const response = await axios.put(
    `${API_URL}/admin/mentees/${menteeId}/status`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};

const useMentees = (menteeStatus: string | null, pageSize = 10) => {
  const queryClient = useQueryClient();

  const infiniteQueryOptions: UseInfiniteQueryOptions<
    MenteeResponse,
    AxiosError,
    InfiniteData<MenteeResponse, number>,
    MenteeResponse,
    MenteesQueryKey,
    number
  > = {
    queryKey: ['admin-mentees', menteeStatus, pageSize],
    queryFn: fetchMentees,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= Math.ceil(lastPage.totalItemCount / lastPage.pageSize)
        ? nextPage
        : undefined;
    },
    initialPageParam: 1,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(infiniteQueryOptions);

  const { mutateAsync: updateStatus } = useMutation<
    unknown,
    AxiosError,
    MenteeStatus
  >({
    mutationFn: updateMenteeStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin-mentees'] });
    },
  });

  const mentees = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    data: mentees,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    updateStatus,
  };
};

export default useMentees;
